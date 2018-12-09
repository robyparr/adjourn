namespace :uploads do
  desc "Copy user_id from meeting to upload."
  task migrate_user_id: :environment do
    uploads = Upload.all
    puts "Migrating #{uploads.count} uploads..."

    ActiveRecord::Base.transaction do
      uploads.each do |upload|
        upload.user = upload.agendum.meeting.user
        upload.save
        print "."
      end
    end

    puts " Complete."
  end

end
