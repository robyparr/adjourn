if Rails.env.development?
  email = "roby.parr@gmail.com".freeze
  unless User.exists? email: email
    User.create(
      email: email,
      password: "password",
      password_confirmation: "password",
      confirmed_at: Time.zone.now
    )

    puts "User '#{email}' created."
  end
end