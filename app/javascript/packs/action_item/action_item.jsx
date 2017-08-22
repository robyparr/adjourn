import React, { Component } from 'react';

// Controls
import Dialog  from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import InlineEdit from '../common/inline_edit';

// Utils
import axios from 'axios';
import Utils from 'utils';

/*
 * A single Action Item.
 */
export default class ActionItem extends Component {
    constructor(props) {
        super(props);
        this.state = this.getInitialState();
    }

    /*
     * The initial component state.
     */
    getInitialState = () => {
        return {
            isExisting: this.props.item != null,
            item: this.props.item || {},
            isEditing: false
        }
    }

    /*
     * Handle updating of the attribute of the item.
     */
    handleUpdate = (field, value) => {
        var meetingID = this.props.meetingID;
        var itemID = this.state.item.id;
        //var url = `/meetings/${meetingID}/agenda/`;

        var item = {};
        item[field] = value;
        item['id'] = Math.floor(Math.random() * 1000);

        if (!itemID) {
            this.setState(this.getInitialState());
            this.props.handleActionItemAddRemove(item, true);
        }
    }

    /*
     * Delete the item.
     */
    handleDeleteItem = () => {
        this.setState({ delete: false });
        this.props.handleActionItemAddRemove(this.state.item, false);
    }

    handleEditModeChanged = (isEditMode) => {
        this.setState({ isEditing: isEditMode });
    }

    render() {
        // Is this item an existing item or a new form?
        var isExisting = this.state.isExisting;

        // The card's CSS class
        var cardClass = `card ${isExisting ? "lighten-1" : "lighten-3"}`;

        // The prefix for element IDs
        var idPrefix = isExisting ? this.state.item.id : 'new';

        // The title value
        var titleValue = this.state.item.title ? 
            this.state.item.title
            : "New Item";


        var deleteDialogActions = [
            <FlatButton label="Yes" primary={true} onTouchTap={this.handleDeleteItem} />,
            <FlatButton label="No" primary={true} onTouchTap={() => this.setState({ delete: false })} />
        ];

        var deleteDialog = this.state.delete ? 
                <Dialog
                    actions={deleteDialogActions}
                    modal={false}
                    open={this.state.delete}>
                        Are you sure you want to remove this action item?
                </Dialog>
                : "";

        return(
            <div className={cardClass} onClick={this.handleNewItemClick}>
                <div className="card-content">
                    {isExisting && !this.state.isEditing &&
                        <div className="right">
                            <a className="delete-link" onClick={() => this.setState({ delete: true })}>
                                <i className="material-icons">delete</i>
                            </a>
                        </div>
                    }
                    <span className="card-title" id={`${idPrefix}_title`}>
                        <InlineEdit
                            onChange={this.handleUpdate}
                            onEditModeChanged={this.handleEditModeChanged}
                            value={titleValue}
                            name="title" />
                    </span>
                </div>

                {deleteDialog}
            </div>
        );
    }
}