# typed: false
class ExportsController < ApplicationController
  def index
    @exports = current_user.exports.order(:id)
  end

  def show
    @export = current_user.exports.find params[:id]
    render "exports/status_updates/#{@export.status}.js"
  end

  def create
    @export = current_user.exports.build
    @export.start_processing

    @notice = 'Your export is being generated.'
    respond_to do |format|
      format.html { redirect_to exports_url, notice: @notice }
      format.js do
        render :show
      end
    end
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
