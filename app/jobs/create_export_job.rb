class CreateExportJob < ApplicationJob
  def perform(export_id)
    export = User::Export.find export_id
    if export.create_json_export!
      export.complete!
    else
      export.error!
    end
  end
end
