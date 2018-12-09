class UploadsController < ApplicationController
  before_action :set_agendum, only: %i(upload presigned_url)

  def index
    @uploads = current_user.uploads.includes(agendum: :meeting).page(params[:page])
    @storage_used = current_user.uploads.sum(:file_size)
  end

  def upload
    upload = @agendum.uploads.build(upload_params.merge(user: @agendum.user))

    if upload.save
      render json: upload
    else
      render json: upload.errors.full_messages, status: :unprocessable_entity
    end
  end

  def destroy
    upload = current_user.uploads.find(params[:id])
    upload.destroy

    flash[:notice] = "Upload successfully deleted."
    redirect_to uploads_url
  end

  def presigned_url
    storage_key = Upload.storage_key(@agendum, params[:filename])
    headers = Upload.upload_headers(params[:filename], params[:file_type])
    url = Upload.presigned_url(:put, storage_key, headers)
    render json: { key: storage_key, url: url, headers: headers }
  end

  def download
    upload = current_user.uploads.find(params[:id])
    redirect_to upload.url
  end

  private

  def set_agendum
    @agendum = current_user.agenda.find(params[:id])
  end

  def upload_params
    params.require(:upload).permit(
      :storage_key, :filename, :content_type,
      :file_size
    )
  end
end