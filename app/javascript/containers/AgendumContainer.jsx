import React from 'react';
import { connect } from 'react-redux';

import Agendum from '../components/meeting/agendum/Agendum';
import { addAgendum, updateAgendum, deleteAgendum } from '../actions/agenda';

const AgendumContainer = ({
    agendum,
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
            isExistingAgendum={isExistingAgendum}
            onAgendumChange={(partialAgendum) => updateAgendum(agendum.id, partialAgendum)}
            onAgendumDelete={deleteAgendum} />
    );
};

const mapStateToProps = state => {
    return {};
};

export default connect(
    mapStateToProps,
    { addAgendum, updateAgendum, deleteAgendum }
)(AgendumContainer);