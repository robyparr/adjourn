module ProfileHelper
  # Following three methods are to allow the use of some
  # devise forms loaded from non-devise controllers (specifically, the profile).
  # Source: https://stackoverflow.com/a/6393151
  def resource_name
    :user
  end

  def resource
    @resource ||= User.new
  end

  def devise_mapping
    @devise_mapping ||= Devise.mappings[:user]
  end
end
