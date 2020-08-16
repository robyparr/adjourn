class ExportsController < ApplicationController
  def index
    @exports = current_user.exports
  end

  def create
    User::Export.generate current_user.id
    redirect_to exports_url, notice: 'Your export is being generated.'
  end

  def download
    export = current_user.exports.find(params[:id])
    redirect_to FileStorageService.presigned_url(:get, export.storage_key)
  end
end
