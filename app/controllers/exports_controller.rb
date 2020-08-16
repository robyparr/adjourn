class ExportsController < ApplicationController
  def index
    @exports = current_user.exports
  end

  def create
    User::Export.generate current_user.id
    redirect_to exports_url, notice: 'Your export is being generated.'
  end

  def destroy
    export = current_user.exports.find params[:id]
    export.destroy

    redirect_to exports_url, notice: 'Export successfully deleted.'
  end

  def download
    export = current_user.exports.find(params[:id])
    redirect_to export.download_url
  end
end
