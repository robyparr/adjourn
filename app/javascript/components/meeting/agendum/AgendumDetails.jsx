import React from 'react';

import AgendumNotes from '../agendum_note/AgendumNotes';

const AgendumDetails = ({ agendum, agendumNotes }) => {
    if (!agendum) {
        return (
            <p className="padding-sides-default">
                Select an agendum to see details.
            </p>
        );
    }

    return (
        <div>
            <div className="padding-sides-default">
                <h5>{agendum.title}</h5>

                {agendum.uploads &&
                    <div>
                        <div className="bold">Uploads</div>
                        <ul>
                            {agendum.uploads.map(upload =>
                                <li key={upload.id}>
                                    <a href={`/meetings/${agendum.meeting_id}/agenda/${agendum.id}/uploads/${upload.id}/download`}>{upload.filename}</a>
                                </li>
                            )}
                        </ul>
                    </div>
                }
                <div className="bold">Agendum Notes</div>
            </div>
            <AgendumNotes
                agendumID={agendum.id}
                notes={agendumNotes} />
        </div>
    );
};

export default AgendumDetails;