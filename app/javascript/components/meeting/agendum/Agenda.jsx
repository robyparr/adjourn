import React from 'react';

// Controls
import AgendumContainer from '../../../containers/AgendumContainer';

/*
 * Create a list of Agendums.
 */
const Agenda = (props) => {

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

    props.agenda.forEach((agendum) => {
        columns[nextColumn].push(
            <AgendumContainer
                key={agendum.id}
                agendum={agendum} />
        );
        nextColumn = getNextColumnIndex(nextColumn);
    });

    /* Add new Agendum item */
    columns[nextColumn].push(
        <div className="print-hide" key={new Date()}>
            <AgendumContainer />
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

export default Agenda;