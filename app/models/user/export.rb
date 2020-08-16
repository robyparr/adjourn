class User::Export < ApplicationRecord
  belongs_to :user

  validates :status, presence: true

  enum status: {
    'processing' => 'processing',
    'complete' => 'complete'
  }

  class << self
    def generate(user_id)
      export = create user_id: user_id, status: 'processing'
      export.start_processing
    end
  end

  def start_processing
    CreateExportJob.perform_later id
  end

  def build_json_export(exporter: UserExporter)
    json = exporter.new(self).to_json
    tempfile = Tempfile.new(['user-export', '.json'])
    tempfile.write json
    tempfile.rewind

    storage_key =
      FileStorageService.storage_key(
        filename: tempfile.path,
        type:     'user_upload',
        type_id:  user_id,
        user_id:  user_id,
      )
    update_attribute :storage_key, storage_key

    FileStorageService.upload_file tempfile.path, storage_key: storage_key
  ensure
    tempfile.close
    tempfile.unlink
  end
end
