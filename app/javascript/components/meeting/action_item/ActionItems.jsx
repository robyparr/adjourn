import React from 'react';

// Controls
import ActionItemContainer from '../../../containers/ActionItemContainer';

/*
* Create a list of Action Items.
*/
const ActionItems = (props) => {
  return(
    <ul className="list action-item-list" style={{ borderWidth: 0 }}>
      {props.actionItems.map((item, index) => {
        return(
          <ActionItemContainer
            key={item.id}
            actionItem={item}
            index={index} />
          );
        })
      }

      {/* Add new Action Item */}
      <ActionItemContainer key={new Date()} />
    </ul>
  );
};

export default ActionItems;
