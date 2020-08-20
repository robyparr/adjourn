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

    notice = 'Upload successfully deleted.'

    respond_to do |format|
      format.html do
        flash[:notice] = notice
        redirect_to uploads_url
      end
      format.json do
        render json: { message: notice }
      end
    end
  end

  def presigned_url
    upload = agendum.uploads.new(presign_params.merge(user: current_user))
    if upload.valid?
      render json: {
        key: upload.storage_key,
        url: upload.presigned_url(:put),
        headers: upload.upload_headers
      }
    else
      render json: upload.errors.full_messages, status: :unprocessable_entity
    end
  end

  def download
    upload = current_user.uploads.find(params[:id])
    redirect_to upload.url
  end

  private

  def agendum
    @agendum ||= current_user.agenda.find(params[:id])
  end

  def presign_params
    params.permit(
      :filename,
      :content_type,
      :file_size,
    )
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
