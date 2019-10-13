import React from 'react';
import Sortable from 'react-sortablejs';

// Controls
import AgendumContainer from '../../../containers/AgendumContainer';

const Agenda = ({ agenda, meetingID, onSort }) => {
  const sortableOptions = {
    draggable: '.sortable',
    filter:    '.modal',
    animation: 150,
    easing:    'cubic-bezier(1, 0, 0, 1)'
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
