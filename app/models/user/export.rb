class User::Export < ApplicationRecord
  belongs_to :user
  has_one :upload, as: :uploadable, dependent: :destroy

  validates :status, presence: true

  enum status: {
    'processing' => 'processing',
    'complete' => 'complete',
    'error' => 'error',
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

  def create_json_export!(exporter_class: UserExporter)
    exporter = exporter_class.new(user_id)
    filename_and_extension = ['user-export', '.json']

    with_tempfile(filename_and_extension) do |tempfile|
      tempfile.write exporter.to_json
      tempfile.rewind

      upload =
        build_upload(
          filename: filename_and_extension.join,
          content_type: 'application/json',
          user: exporter.user
        )

      upload.upload_file_and_save! tempfile.path
    end

  end

  def download_url
    upload.url
  end

  private

  def with_tempfile(filename, &block)
    tempfile = Tempfile.new(filename)
    block.call tempfile
  ensure
    tempfile.close
    tempfile.unlink
  end
end
