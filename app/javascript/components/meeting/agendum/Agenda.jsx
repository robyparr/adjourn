import React from 'react';
import Sortable from 'react-sortablejs';

// Controls
import AgendumContainer from '../../../containers/AgendumContainer';

const Agenda = ({ agenda, meetingID, onSort }) => {
  const sortableOptions = {
    draggable: '.sortable',
    filter:    '.modal'
  };

  return(
    <Sortable className="agenda" onChange={order => onSort(meetingID, order)} options={sortableOptions}>
      {agenda.map(agendum => (
        <AgendumContainer key={agendum.id} agendum={agendum} />
      ))}

      <AgendumContainer />
    </Sortable>
  );
}

export default Agenda;
