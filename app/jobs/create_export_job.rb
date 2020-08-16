class CreateExportJob < ApplicationJob
  def perform(export_id)
    export = User::Export.find export_id
    export.create_json_export!
    export.complete!
  rescue
    export.error!
  end
end
