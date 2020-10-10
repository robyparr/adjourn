# typed: false
module ApplicationHelper
  def page_title(default_title)
    # Idea for compacting array: https://stackoverflow.com/a/185980
    [content_for(:title),default_title].compact.join(" | ")
  end

  def gravatar_url(email, size = 64)
    hashed_email = Digest::MD5.hexdigest(email.strip.downcase)
    "https://www.gravatar.com/avatar/#{hashed_email}.jpg?s=#{size}&d=mm"
  end

  def formatted_date_time(date_time, user: current_user, with_time_zone: false)
    format_string = '%B %d, %Y %l:%M %p'
    format_string += ' %Z' if with_time_zone

    date_time.in_time_zone(user.time_zone).strftime(format_string)
  end

  def classes(classes)
    classes_array =
      classes.map do |item|
        case item
        when Array
          class_string, apply_class = item
          apply_class ? class_string : nil
        when Hash
          item
            .map { |class_string, apply_class| apply_class ? class_string : nil }
            .compact
            .join(' ')
        else
          item
        end
      end

    classes_array.compact.join(' ')
  end
end
