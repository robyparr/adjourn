import React from 'react';

// Controls
import ActionItemContainer from '../../../containers/ActionItemContainer';

/*
* Create a list of Action Items.
*/
const ActionItems = (props) => {
  return(
    <ul className="list action-item-list">
      {props.actionItems.map((item) => {
        return(
          <ActionItemContainer
          key={item.id}
          actionItem={item} />
          );
        })
      }

      {/* Add new Action Item */}
      <ActionItemContainer key={new Date()} />
    </ul>
  );
};

export default ActionItems;
