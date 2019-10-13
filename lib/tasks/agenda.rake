namespace :agenda do
  desc "Copy user_id from meeting to upload."
  task set_positions: :environment do
    puts "Updating agenda positions for #{Meeting.count} meetings..."

    Meeting.find_each do |meeting|
      ActiveRecord::Base.transaction do
        agenda = Agendum.where(meeting_id: meeting.id).order(created_at: :asc)
        agenda.each do |agendum|
          agendum.update! position: agendum.send(:next_position)
        end
        print '.'
      end
    end

    puts "\nComplete."
  end

end
