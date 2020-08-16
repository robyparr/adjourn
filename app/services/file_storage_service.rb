module FileStorageService
  def self.upload_file(file_path, storage_key:)
    service_client.object(storage_key).upload_file file_path
  end

  def self.storage_key(filename:, type:, type_id:, user_id:)
    file_ext = File.extname(filename)
    file_basename = File.basename(filename, file_ext)
    uuid = SecureRandom.uuid

    "#{user_id}/#{type}/#{type_id}/#{file_basename}-#{uuid}#{file_ext}"
  end

  def self.presigned_url(method, storage_key, headers = nil)
    object = service_client.object(storage_key)
    object.presigned_url(
      method,
      {}
    )
  end

  private

  def self.service_client
    s3 = Aws::S3::Resource.new
    s3.bucket ENV['AWS_S3_BUCKET']
  end
end
