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
      <h4>{agendum.title}</h4>

      {agendumUploads.length > 0 &&
        <div>
          <h6 className="mb-2">Uploads</h6>
          <ul className="list">
            {agendumUploads.map(upload =>
              <li key={upload.id}>
                <a href={`/uploads/${upload.id}/download`}>{upload.filename}</a>
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