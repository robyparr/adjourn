class Upload < ApplicationRecord
  belongs_to :agendum
  belongs_to :user

  before_destroy :delete_file

  scope :uploads_size_total, ->(user) { user.uploads.sum(:file_size) }

  def url
    Upload.presigned_url(:get, self.storage_key)
  end

  def delete_file
    s3 = Aws::S3::Resource.new
    object = s3.bucket(ENV['AWS_S3_BUCKET']).object(self.storage_key)
    object.delete
  end

  class << self
    def storage_key(agendum, filename)
      file_ext = File.extname(filename)
      file_basename = File.basename(filename, file_ext)
      uuid = SecureRandom.uuid
      "#{agendum.user.id}/agendum_uploads/#{agendum.id}/#{file_basename}-#{uuid}#{file_ext}"
    end

    def presigned_url(method, storage_key, headers = nil)
      s3 = Aws::S3::Resource.new
      object = s3.bucket(ENV['AWS_S3_BUCKET']).object(storage_key)
      object.presigned_url(method, symbolize_headers(headers))
    end

    def upload_headers(filename, file_type)
      {
        "Content-Disposition" => "inline; filename=\"#{filename}\"",
        "Content-Type" => file_type
      }
    end

    def symbolize_headers(raw_headers)
      return {} if raw_headers.nil?
      raw_headers.map { |k, v| [k.parameterize.underscore, v] }.to_h
    end
  end
end
