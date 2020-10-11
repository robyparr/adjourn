import axios from 'axios'
import Utils from '../../utils'

export default {
  emailAttendees(meetingID) {
    const params = { authenticity_token: Utils.getAuthenticityToken() }
    return axios.post(`/meetings/${meetingID}/attendees/email`, params)
      .then(response => response.data)
      .catch(response => response.data)
  },

  fetchLinks(meeting) {
    return axios.get(`/meetings/${meeting.id}/links`)
      .then(response => response.data)
      .catch(response => response.data)
  },

  createMeetingLink(meeting, link) {
    const params = {
      authenticity_token: Utils.getAuthenticityToken(),
      link: link
    }
    return axios.post(`/meetings/${meeting.id}/links`, params)
      .then(response => response.data)
      .catch(response => response.data)
  },

  destroyMeetingLink(link) {
    return axios({
      url: `/links/${link.id}`,
      method: 'DELETE',
      data: { authenticity_token: Utils.getAuthenticityToken() }
    })
      .then(response => response.data)
      .catch(response => response.data)
  },
}
