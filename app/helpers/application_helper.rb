module ApplicationHelper

  def gravatar_url(email, size = 64)
    hashed_email = Digest::MD5.hexdigest(email.strip.downcase)
    "https://www.gravatar.com/avatar/#{hashed_email}.jpg?s=#{size}&d=mm"
  end
end
