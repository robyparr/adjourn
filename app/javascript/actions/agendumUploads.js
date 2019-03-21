import axios from 'axios';
import Utils from 'utils';

export const SET_MEETING_AGENDUM_UPLOADS = 'SET_MEETING_AGENDUM_UPLOADS';
export const RECEIVE_NEW_AGENDUM_UPLOAD = 'RECEIVE_NEW_AGENDUM_UPLOAD';

/**
* Set all the agendum uploads for the meeting.
*/
export function setMeetingAgendumUploads(uploads) {
  return {
    type: SET_MEETING_AGENDUM_UPLOADS,
    uploads
  };
}

export function receiveNewAgendumUpload(upload) {
  return {
    type: RECEIVE_NEW_AGENDUM_UPLOAD,
    upload
  };
}

export function addAgendumUpload(agendumID, files) {
  return function(dispatch, getState) {
    const uploadsURL = `/agenda/${agendumID}/uploads`;

    files.forEach(file => {
      var storageKey = '';

      axios.post(`${uploadsURL}/presign`, {
        authenticity_token: Utils.getAuthenticityToken(),
        filename: file.name,
        file_type: file.type
      })
      .then(response => {
        storageKey = response.data.key;
        var headers = response.data.headers;
        return axios.put(response.data.url, file, { headers: headers });
      })
      .then(response => {
        return axios.post(`${uploadsURL}`, {
          authenticity_token: Utils.getAuthenticityToken(),
          upload: {
            storage_key: storageKey,
            filename: file.name,
            content_type: file.type,
            file_size: file.size
          }
        });
      })
      .then(response => dispatch(receiveNewAgendumUpload(response.data)));
    });
  }
}