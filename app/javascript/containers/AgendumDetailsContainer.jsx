import React from 'react';
import { connect } from 'react-redux';

import AgendumDetails from '../components/meeting/agendum/AgendumDetails';

const AgendumDetailsContainer = ({ agendum, agendumNotes }) => {
    return (
        <AgendumDetails
            agendum={agendum}
            agendumNotes={agendumNotes} />
    );
};

const mapStateToProps = (state, ownProps) => {
    const selectedAgendum = state.agenda.find(it => it.selected);

    var notes = [];
    if (selectedAgendum) {
        notes = state.agendumNotes
            .filter(it => it.agendum_id === selectedAgendum.id);
    }

    return {
        agendum: selectedAgendum,
        agendumNotes: notes
    };
};

export default connect(
    mapStateToProps
)(AgendumDetailsContainer);