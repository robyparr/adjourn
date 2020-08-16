class UploadsController < ApplicationController
  def index
    @uploads = current_user.uploads.includes(uploadable: :meeting).listable.page(params[:page])
    @storage_used = current_user.uploads.listable.sum(:file_size)
  end

  def upload
    upload = agendum.uploads.build(upload_params.merge(user: agendum.user))

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
    upload =
      agendum.uploads.new(
        filename: params[:filename],
        content_type: params[:file_type],
        user: current_user,
      )

    render json: {
      key: upload.storage_key,
      url: upload.presigned_url(:put),
      headers: upload.upload_headers
    }
  end

  def download
    upload = current_user.uploads.find(params[:id])
    redirect_to upload.url
  end

  private

  def agendum
    @agendum ||= current_user.agenda.find(params[:id])
  end

  def upload_params
    params.require(:upload).permit(
      :storage_key,
      :filename,
      :content_type,
      :file_size,
    )
  end
end
