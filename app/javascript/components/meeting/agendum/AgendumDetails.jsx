import React from 'react';

import AgendumNotes from '../agendum_note/AgendumNotes';

const AgendumDetails = ({ agendum, agendumNotes, agendumUploads }) => {
  if (!agendum) {
    return (
      <p className="padding-sides-default">
        Select an agendum to see details.
      </p>
    );
  }

  return (
    <div className="agendum-details padding-sides-default padding-bottom-default">
      <h5 className="bold">{agendum.title}</h5>

      {agendumUploads.length > 0 &&
        <div>
          <h5 className="sub-header">Uploads</h5>
          <ul>
            {agendumUploads.map(upload =>
              <li key={upload.id}>
                <a href={`/uploads/${upload.id}/download`}>{upload.filename}</a>
              </li>
            )}
          </ul>
        </div>
      }
      <h5 className="sub-header">Agendum Notes</h5>
      <AgendumNotes
        agendumID={agendum.id}
        notes={agendumNotes} />
    </div>
  );
};

export default AgendumDetails;