import React from 'react';

// Controls
import ActionItemContainer from '../../../containers/ActionItemContainer';

/*
 * Create a list of Action Items.
 */
const ActionItems = (props) => {
    const containerClass = "collection with-header margin-top-none "
        + (props.actionItems.length === 0 ? "print-hide" : "");

    return(
        <ul className={containerClass}>
            {props.actionItems.map((item) => {
                return(
                    <ActionItemContainer
                        key={item.id}
                        actionItem={item} />
                );
            })}

            {/* Add new Action Item */}
            <ActionItemContainer key={new Date()} />
        </ul>
    );
}

export default ActionItems;