namespace :after_party do
  desc 'Deployment task: migrate_uploads'
  task migrate_uploads: :environment do
    puts "Running deploy task 'migrate_uploads'"

    # Put your task implementation HERE.
    Upload.where('agendum_id IS NOT NULL').find_each do |upload|
      upload.update uploadable_type: 'Agendum', uploadable_id: upload.agendum_id
    end

    # Update task as completed.  If you remove the line below, the task will
    # run with every deploy (or every time you call after_party:run).
    AfterParty::TaskRecord
      .create version: AfterParty::TaskRecorder.new(__FILE__).timestamp
  end
end
