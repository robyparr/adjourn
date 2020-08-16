class CreateExportJob < ApplicationJob
  def perform(export_id)
    export = User::Export.find export_id
    export.build_json_export
    export.complete!
  end
end
