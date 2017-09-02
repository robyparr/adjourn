import React from 'react';

// Controls
import ActionItem from './action_item';

// Utils
import _ from 'lodash';

/*
 * Create a list of Action Items.
 */
const ActionItems = (props) => {

    return(
        <ul className="collection with-header margin-top-none">
            <li className="collection-header">
                <h5>Action Items</h5>
                <hr className="print-only" />
            </li>
            {
                props.actionItems.map((item) => {
                    return(
                        <ActionItem key={item.id}
                            item={item}
                            meetingID={props.meetingID}
                            handleActionItemAddRemove={props.handleActionItemAddRemove} />
                    );
                })
            }
            {/* Add new Action Item */}
            <ActionItem key={new Date()}
                meetingID={props.meetingID}
                handleActionItemAddRemove={props.handleActionItemAddRemove} />
        </ul>
    );
}

export default ActionItems;