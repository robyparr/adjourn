class Upload < ApplicationRecord
  include JsonExportable

  belongs_to :user
  belongs_to :uploadable, polymorphic: true

  before_destroy :delete_file

  scope :uploads_size_total, ->(user) { user.uploads.sum(:file_size) }

  def storage_key
    super || generate_storage_key
  end

  def presigned_url(method)
    options =
      if method == :get
        { expires_in: 5.minutes.to_i }
      else
        upload_headers symbolize: true
      end

    storage_object.presigned_url method, options
  end

  def upload_headers(symbolize: false)
    headers =
      {
        "Content-Disposition" => "inline; filename=\"#{filename}\"",
        "Content-Type" => content_type
      }

    if symbolize
      headers.map { |k, v| [k.parameterize.underscore, v] }.to_h
    else
      headers
    end
  end

  def url
    presigned_url :get
  end

  def upload_file_and_save!(file_path)
    transaction do
      file_uploaded = storage_object.upload_file(file_path)
      raise RuntimeError unless file_uploaded

      save!
    end
  end

  private

  def rejected_attributes_for_json_export
    super + %w[
      storage_key
    ]
  end

  def extra_attributes_for_json_export
    {
      base64_encoded_file: base64_encoded_file
    }
  end

  def base64_encoded_file
    file = URI.open(url).read
    Base64.encode64 file
  end

  def delete_file
    storage_object.delete
  end

  def storage_bucket
    return @storage_bucket if @storage_bucket.present?

    s3 = Aws::S3::Resource.new
    @storage_bucket = s3.bucket(ENV['AWS_S3_BUCKET'])
  end

  def storage_object
    storage_bucket.object storage_key
  end

  def file_ext
    File.extname filename
  end

  def file_basename
    File.basename filename, file_ext
  end

  def generate_storage_key
    uuid = SecureRandom.uuid
    self.storage_key = "#{user.id}/agendum_uploads/#{uploadable.id}/#{file_basename}-#{uuid}#{file_ext}"
  end
end
