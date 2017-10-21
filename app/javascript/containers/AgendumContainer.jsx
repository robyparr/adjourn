import React from 'react';
import { connect } from 'react-redux';

import Agendum from '../components/meeting/agendum/Agendum';
import { addAgendum, updateAgendum, deleteAgendum } from '../actions/agenda';

const AgendumContainer = ({
    agendum,
    notes,
    addAgendum,
    updateAgendum,
    deleteAgendum
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
            onAgendumDelete={deleteAgendum} />
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
    { addAgendum, updateAgendum, deleteAgendum }
)(AgendumContainer);