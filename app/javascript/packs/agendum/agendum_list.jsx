import React from 'react';

// Controls
import Agendum from './agendum';

// Utils
import _ from 'lodash';

/*
 * Create a list of Agendum.
 */
const AgendumList = (props) => {

    /* 
        Agendums will be placed into each array,
        each of which will be rendered into a separate
        HTML column. This helps to solve the spacing
        issue when a single item in a column has a very
        long length.
    */
    var columns = [
        [],
        [],
        []
    ];

    var nextColumn = 0;

    const getNextColumnIndex = (lastColumn) => {
        if (lastColumn == columns.length - 1) {
            return 0;
        }

        return ++lastColumn;
    };

    props.agenda.forEach((agendum, i) => {
        const jsx = (
            <Agendum agendum={agendum}
                key={agendum.id}
                meetingID={props.meetingID}
                handleAgendumAddRemove={props.handleAgendumAddRemove} />
        );

        columns[nextColumn].push(jsx);
        nextColumn = getNextColumnIndex(nextColumn);
    });

    /* Add new Agendum item */
    columns[nextColumn].push(
        <div className="print-hide" key={new Date()}>
            <Agendum
                meetingID={props.meetingID}
                handleAgendumAddRemove={props.handleAgendumAddRemove} />
        </div>
    );

    return(
        <div className="row">
            <div className="col m4 print-full-width">
                { columns[0] }
            </div>
            <div className="col m4 print-full-width">
                { columns[1] }
            </div>
            <div className="col m4 print-full-width">
                { columns[2] }
            </div>
        </div>
    );
}

export default AgendumList;