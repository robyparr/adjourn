import React from 'react';
import { connect } from 'react-redux';

import Agendum from '../components/meeting/agendum/Agendum';
import {
    addAgendum,
    updateAgendum,
    deleteAgendum,
    setSelectedAgendum
} from '../actions/agenda';

import { addAgendumUpload } from '../actions/agendumUploads';

const AgendumContainer = ({
    agendum,
    notes,
    addAgendum,
    updateAgendum,
    deleteAgendum,
    setSelectedAgendum,
    addAgendumUpload
}) => {
    const isExistingAgendum = agendum !== undefined;

    if (!isExistingAgendum) {
        return (
            <Agendum
                isExistingAgendum={isExistingAgendum}
                onAgendumChange={addAgendum} />
        );
    }

    return (
        <Agendum
            agendum={agendum}
            notes={notes}
            isExistingAgendum={isExistingAgendum}
            onAgendumChange={(partialAgendum) => updateAgendum(agendum.id, partialAgendum)}
            onAgendumSelect={setSelectedAgendum}
            onAgendumDelete={deleteAgendum}
            onFileUpload={addAgendumUpload} />
    );
};

const mapStateToProps = (state, ownProps) => {
    var notes = ownProps.agendum ?
        state
            .agendumNotes
            .filter(note => note.agendum_id === ownProps.agendum.id)
        : [];

    return { notes: notes };
};

export default connect(
    mapStateToProps,
    {
        addAgendum,
        updateAgendum,
        deleteAgendum,
        setSelectedAgendum,
        addAgendumUpload
    }
)(AgendumContainer);