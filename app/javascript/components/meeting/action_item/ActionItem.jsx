import React, { Component } from 'react';

// Controls
import InlineEdit from '../../common/InlineEdit';

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

    onNewActionItemFieldChange = (e) => {
        if (e.key === 'Enter') {
            this.props.onActionItemChange({ [e.target.name]: e.target.value });
        }
    }

    render() {
        if (!this.props.isExistingItem) {
            return (
                <li>
                    <input
                        type="text"
                        onKeyUp={this.onNewActionItemFieldChange}
                        placeholder="New Item"
                        name="title" />
                </li>
            );
        }

        var descriptionValue = this.props.actionItem.description
            || "Click here to add a description.";

        return(
            <li>
                <div className="list-item-content">
                    <div className="flex">
                        <input type="checkbox"
                            id={`item-done-${this.props.actionItem.id}`}
                            checked={this.props.actionItem.done}
                            onChange={(e) => this.onFieldChange('done', e.target.checked)} />
                        <div className="flex flex-col mx-4">
                            <div className="font-semibold">
                                <InlineEdit
                                    onChange={this.onFieldChange}
                                    onEditModeChanged={this.onFieldEditModeChange}
                                    displayElement="span"
                                    value={this.props.actionItem.title}
                                    className="w-full"
                                    placeholder="Item Title"
                                    name="title" />
                            </div>

                            <div className="text-grey-darker">
                                <InlineEdit
                                    className="margin-top-none margin-bottom-none"
                                    name="description"
                                    onChange={this.onFieldChange}
                                    onEditModeChanged={this.onFieldEditModeChange}
                                    singleClickToEdit={!this.props.actionItem.description}
                                    value={descriptionValue}
                                    placeholder="Item Description"
                                    multilineEditor={true}
                                    className="w-full"
                                    renderMarkdown={true} />
                            </div>
                        </div>
                    </div>
                </div>
                <button className="list-floating-text">
                    <i className="fa fa-trash"
                            data-modal={`.confirm-aa-delete-${this.props.actionItem.id}`}>
                    </i>
                </button>
                <div className={`modal confirm-aa-delete-${this.props.actionItem.id}`}>
                    <div className="title">Are you sure?</div>
                    <div className="modal-content">
                        Are you sure you want to delete this action item?
                    </div>
                    <div className="modal-footer">
                        <a href="#"
                            data-close-modal={`.confirm-aa-delete-${this.props.actionItem.id}`}>No</a>
                        <button className="button ml-4"
                                onClick={() => this.props.onActionItemDelete(this.props.actionItem.id)}>
                            Yes
                        </button>
                    </div>
                </div>
            </li>
        );
    }
}