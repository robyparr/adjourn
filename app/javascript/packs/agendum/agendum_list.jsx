import React from 'react';

// Controls
import Agendum from './agendum';

/*
 * Create a list of Agendum.
 */
const AgendumList = (props) => {
    return(
        <div>
            <div className="row">
                {
                    props.agenda.map((agendum, key) => {
                        return(
                            <div className="col m4" key={key}>
                                <Agendum agendum={agendum} />
                            </div>
                        );
                    })
                }
            </div>
            <div className="row">
                <div className="col m4">
                    <Agendum 
                        meetingID={props.meetingID}
                        handleNewAgendum={props.handleNewAgendum} />
                </div>
            </div>
        </div>
    );
}

export default AgendumList;