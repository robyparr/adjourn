# typed: true
class Upload < ApplicationRecord
  include JsonExportable
  include ContentTypes

  attr_accessor :system_upload

  belongs_to :user
  belongs_to :uploadable, polymorphic: true

  before_destroy :delete_file

  validates :file_size, numericality: {
    greater_than: 500.bytes,
    less_than: 20.megabytes,
    message: 'Must be between 500 bytes and 20 megabytes'
  }, unless: :system_upload
  validates :content_type, inclusion: { in: CONTENT_TYPES }, unless: :system_upload

  scope :listable, -> { where(uploadable_type: ['Agendum']) }

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

  def download_path
    "/uploads/#{id}/download"
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

  def storage_object
    return @storage_object if @storage_object.present?

    storage_bucket = Aws::S3::Resource.new.bucket(ENV['AWS_S3_BUCKET'])
    @storage_object = storage_bucket.object storage_key
  end

  def file_ext
    return if filename.blank?

    File.extname T.must(filename)
  end

  def file_basename
    return if filename.blank?

    File.basename T.must(filename), file_ext
  end

  def generate_storage_key
    uuid = SecureRandom.uuid
    upload_type = uploadable.class.to_s.parameterize.underscore
    self.storage_key = "#{user.id}/#{upload_type}_uploads/#{uploadable.id}/#{file_basename}-#{uuid}#{file_ext}"
  end
end
