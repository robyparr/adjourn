import React from 'react';

// Controls
import AgendumContainer from '../../../containers/AgendumContainer';

/*
* Create a list of Agendums.
*/
const Agenda = (props) => {
  return(
    <div className="agenda">
      {props.agenda.map(agendum => (
        <AgendumContainer key={agendum.id} agendum={agendum} />
      ))}

      <AgendumContainer />
    </div>
  );
}

export default Agenda;
