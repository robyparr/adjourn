import Utils from '../../utils'
import axios from 'axios'

export default {
  uploadFiles(uploadsURL, files) {
    return files.map(file => {
      return new Promise(async (resolve) => {
        const presignResponse = await this.fetchPresignURL(`${uploadsURL}/presign`, file)
        await this.putToS3(presignResponse.data.url, file, presignResponse.data.headers )
        const uploadResponse = await this.createUpload(uploadsURL, presignResponse.data.key, file)

        resolve(uploadResponse)
      })
    })
  },

  fetchPresignURL(presignURL, file) {
    return axios.post(presignURL, {
      authenticity_token: Utils.getAuthenticityToken(),
      filename: file.name,
      file_type: file.type
    })
  },

  putToS3(s3URL, file, headers) {
    return axios.put(s3URL, file, { headers: headers })
  },

  createUpload(uploadsURL, storageKey, file) {
    return axios.post(uploadsURL, {
      authenticity_token: Utils.getAuthenticityToken(),
      upload: {
        storage_key: storageKey,
        filename: file.name,
        content_type: file.type,
        file_size: file.size,
      }
    })
  },
}
