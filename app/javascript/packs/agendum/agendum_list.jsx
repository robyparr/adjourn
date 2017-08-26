import React from 'react';

// Controls
import Agendum from './agendum';

// Utils
import _ from 'lodash';

/*
 * Create a list of Agendum.
 */
const AgendumList = (props) => {
    return(
        <div className="row">
            {
                props.agenda.map((agendum) => {
                    return(
                        <div className="col m4 print-full-width" key={agendum.id}>
                            <Agendum agendum={agendum}
                                meetingID={props.meetingID}
                                handleAgendumAddRemove={props.handleAgendumAddRemove} />
                        </div>
                    );
                })
            }
            {/* Add new Agendum item */}
            <div className="col m4 print-hide">
                <Agendum key={new Date()}
                    meetingID={props.meetingID}
                    handleAgendumAddRemove={props.handleAgendumAddRemove} />
            </div>
        </div>
    );
}

export default AgendumList;