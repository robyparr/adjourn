# typed: false
module JsonExportable
  extend ActiveSupport::Concern

  def attributes_for_json_export
    attributes
      .except(*rejected_attributes_for_json_export)
      .merge(extra_attributes_for_json_export)
  end

  def rejected_attributes_for_json_export
    %w[
      user_id
      encrypted_password
      reset_password_token
      confirmation_token
      refresh_token
      meeting_id
      agendum_id
      google_account_id
    ]
  end

  def extra_attributes_for_json_export
    {}
  end
end
