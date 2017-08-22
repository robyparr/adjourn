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
        <div className="row">
            {
                props.actionItems.map((item) => {
                    return(
                        <div className="col m4" key={item.id}>
                            <ActionItem item={item}
                                meetingID={props.meetingID}
                                handleActionItemAddRemove={props.handleActionItemAddRemove} />
                        </div>
                    );
                })
            }
            {/* Add new Action Item */}
            <div className="col m4">
                <ActionItem key={new Date()}
                    meetingID={props.meetingID}
                    handleActionItemAddRemove={props.handleActionItemAddRemove} />
            </div>
        </div>
    );
}

export default ActionItems;