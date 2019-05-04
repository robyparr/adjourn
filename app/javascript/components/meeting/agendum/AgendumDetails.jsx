import React from 'react';

import AgendumNotes from '../agendum_note/AgendumNotes';

const AgendumDetails = ({ agendum, agendumNotes, agendumUploads }) => {
  if (!agendum) {
    return (
      <p className="px-4">
        Select an agendum to see details.
      </p>
    );
  }

  const determinefileIcon = upload => upload.content_type.includes('image') ? 'fa-image' : 'fa-file';
  const humanizedFileSize = upload => (upload.file_size / 1024).toFixed(2);

  return (
    <div className="agendum-details px-4 pb-4">
      <h4>{agendum.title}</h4>

      {agendumUploads.length > 0 &&
        <div>
          <h6 className="mb-2">Uploads</h6>
          <ul className="list">
            {agendumUploads.map(upload =>
              <li className="list-item" key={upload.id}>
                <div className="media">
                  <i className={`fa ${determinefileIcon(upload)} fa-lg`}></i>
                  <div className="media-text">
                    <a href={`/uploads/${upload.id}/download`}>{upload.filename}</a>
                    <span className="text-grey">{humanizedFileSize(upload)} KB</span>
                  </div>
                </div>
              </li>
            )}
          </ul>
        </div>
      }
      <h6 className="mt-4 mb-2">Agendum Notes</h6>
      <AgendumNotes
        agendumID={agendum.id}
        notes={agendumNotes} />
    </div>
  );
};

export default AgendumDetails;
