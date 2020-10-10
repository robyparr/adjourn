# typed: false
class User::Export < ApplicationRecord
  EXPIRES_AFTER_DAYS = 7

  belongs_to :user
  has_one :upload, as: :uploadable, dependent: :destroy

  validates :status, presence: true

  enum status: {
    'processing' => 'processing',
    'complete' => 'complete',
    'error' => 'error',
  }

  scope :expired, -> { where("NOW() >= created_at + INTERVAL '? day'", EXPIRES_AFTER_DAYS) }

  def start_processing
    update status: 'processing'
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
          user: exporter.user,
          system_upload: true,
        )

      upload.upload_file_and_save! tempfile.path
    end
  end

  def download_url
    upload.url
  end

  def expires_at
    created_at + EXPIRES_AFTER_DAYS.days
  end

  def expired?
    expires_at <= Time.zone.now
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
