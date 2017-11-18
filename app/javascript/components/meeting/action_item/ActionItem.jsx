import React, { Component } from 'react';

// Controls
import Dialog  from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import InlineEdit from '../../common/InlineEdit';

// Utils
import axios from 'axios';
import Utils from 'utils';

/*
 * A single Action Item.
 */
export default class ActionItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isEditing: false,
            delete: false
        };
    }

    onFieldEditModeChange = (isEditMode) => this.setState({ isEditing: isEditMode });
    onFieldChange = (field, value) => this.props.onActionItemChange({ [field]: value });

    render() {
        const titleWrapperStyles = {
            display: 'block',
            marginBottom: 8
        };

        if (!this.props.isExistingItem) {
            return (
                <li className="collection-item checkbox grey lighten-4 print-hide">
                    <span className="title font-size-20" style={titleWrapperStyles}>
                        <InlineEdit
                            onChange={this.onFieldChange}
                            onEditModeChanged={this.onFieldEditModeChange}
                            displayElement="p"
                            value="New Item"
                            placeholder="New Item"
                            singleClickToEdit={true}
                            name="title" />
                    </span>
                </li>
            );
        }

        var descriptionValue = this.props.actionItem.description
            || "Click here to add a description.";

        var descriptionClass = "margin-top-none margin-bottom-none "
            + (this.props.actionItem.description ? "" : "print-hide");

        return(
            <li className="collection-item checkbox">
                {!this.state.isEditing &&
                    <a className="secondary-content delete-link"
                        onClick={() => this.setState({ delete: true })}>
                        
                        <i className="material-icons">delete</i>
                    </a>
                }

                <span className="checkbox">
                    <input type="checkbox"
                        id={`item-done-${this.props.actionItem.id}`}
                        checked={this.props.actionItem.done}
                        onChange={(e) => this.onFieldChange('done', e.target.checked)} />
                    <label htmlFor={`item-done-${this.props.actionItem.id}`}></label>
                </span>

                <span className="title font-size-20" style={titleWrapperStyles}>
                    <InlineEdit
                        onChange={this.onFieldChange}
                        onEditModeChanged={this.onFieldEditModeChange}
                        displayElement={"span"}
                        value={this.props.actionItem.title}
                        placeholder="Item Title"
                        name="title" />
                </span>

                <InlineEdit
                    className={descriptionClass}
                    name="description"
                    onChange={this.onFieldChange}
                    onEditModeChanged={this.onFieldEditModeChange}
                    value={descriptionValue}
                    placeholder="Item Description"
                    multilineEditor={true}
                    renderMarkdown={true} />

                <Dialog
                    actions={[
                        <FlatButton
                            label="Yes"
                            primary={true}
                            onTouchTap={() => this.props.onActionItemDelete(this.props.actionItem.id)} />,
                        <FlatButton 
                            label="No"
                            primary={true}
                            onTouchTap={() => this.setState({ delete: false })} />
                    ]}
                    modal={false}
                    open={this.state.delete}>
                        Are you sure you want to remove this action item?
                </Dialog>
            </li>
        );
    }
}