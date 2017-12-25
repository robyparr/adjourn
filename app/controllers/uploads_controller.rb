class UploadsController < ApplicationController
  before_action :set_agendum

  def upload
    upload = @agendum.uploads.build(upload_params)
    if upload.save
      render json: upload
    else
      render json: upload.errors.full_messages, status: :unprocessable_entity
    end
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
    @agendum = current_user.agenda.find(params[:agenda_id])
  end

  def upload_params
    params.require(:upload).permit(
      :storage_key, :filename, :content_type,
      :file_size
    )
  end
end