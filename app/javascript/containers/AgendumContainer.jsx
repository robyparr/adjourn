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
            isExistingAgendum={isExistingAgendum}
            onAgendumChange={(partialAgendum) => updateAgendum(agendum.id, partialAgendum)}
            onAgendumSelect={setSelectedAgendum}
            onAgendumDelete={deleteAgendum}
            onFileUpload={addAgendumUpload} />
    );
};

const mapStateToProps = (state, ownProps) => {
    return {};
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