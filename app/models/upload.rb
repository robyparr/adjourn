class Upload < ApplicationRecord
  belongs_to :agendum
  before_destroy :delete_file

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

  


  #has_attached_file :attachment

  # validates_attachment_content_type :attachment, content_type: [
  #   /\Aimage\/.*\z/,
  #   'application/pdf',
  #   'application/vnd.ms-powerpoint',
  #   'application/rtf',
  #   'application/msword',
  #   'application/vnd.ms-excel',
  #   'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  #   'application/zip',
  #   'application/x-7z-compressed'
  # ]
end
