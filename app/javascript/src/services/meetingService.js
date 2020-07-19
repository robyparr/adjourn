import axios from 'axios'
import Utils from '../../utils'

export default {
  emailAttendees(meetingID) {
    const params = { authenticity_token: Utils.getAuthenticityToken() }
    return axios.post(`/meetings/${meetingID}/attendees/email`, params)
      .then(response => response.data)
      .catch(response => response.data)
  },
}
