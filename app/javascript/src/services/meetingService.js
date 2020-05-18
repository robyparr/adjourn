import axios from 'axios'
import Utils from '../../utils'

export default {
  emailAttendees(meetingID) {
    return axios.post(`/meetings/${meetingID}/email_attendees`, {
      authenticity_token: Utils.getAuthenticityToken()
    }).then(response => response.data)
      .catch(response => response.data)
  },
}
