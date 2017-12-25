import React, { Component } from 'react';

// Controls
import Dialog  from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

import InlineEdit from '../../common/InlineEdit';

import Dropzone from 'react-dropzone';

/*
 * A single Agendum.
 */
export default class Agendum extends Component {
    constructor(props) {
        super(props);
        this.state = {
            delete: false,
            isEditing: false
        }
    }

    onFieldEditModeChange = (isEditMode) => this.setState({ isEditing: isEditMode })
    onFieldChange = (field, value) => this.props.onAgendumChange({ [field]: value })

    render() {
        /* 
            At the end of the agenda list (of "existing" agendums)
            There will be a stripped down version of the Agendum
            component which allows you to set a title, thus creating
            a new agendum (which will then become and "existing" agendum).

            This section renders that stripped down component.
        */
        if (!this.props.isExistingAgendum) {
            return(
                <div className="card grey lighten-3">
                    <div className="card-content">
                        <span className="card-title" id="new_title">
                            <InlineEdit
                                onChange={this.onFieldChange}
                                onEditModeChanged={this.onFieldEditModeChange}
                                value="New Agendum"
                                placeholder="New Agendum"
                                singleClickToEdit={true}
                                name="title" />
                        </span>
                    </div>
                </div>
            );
        }

        // If we've made it this far, this is an "existing" agendum.
        const descriptionValue = this.props.agendum.description 
            || "Click here to add a description.";

        return(
            <div className={`card z-depth-3 ${this.props.agendum.selected ? "selected" : ""}`}
                onClick={() => this.props.onAgendumSelect(this.props.agendum.id)}>

                <Dropzone
                    className="card-content"
                    onDrop={(files) => this.props.onFileUpload(this.props.agendum.id, files)}
                    disableClick={true}
                    activeClassName="dropzone">

                    {!this.state.isEditing &&
                        <div className="right">
                            <a className="delete-link" onClick={() => this.setState({ delete: true })}>
                                <i className="material-icons">delete</i>
                            </a>
                        </div>
                    }
                    <span className="card-title" id={`${this.props.agendum.id}_title`}>
                        <InlineEdit
                            onChange={this.onFieldChange}
                            onEditModeChanged={this.onFieldEditModeChange}
                            value={this.props.agendum.title}
                            placeholder="Agendum Title"
                            name="title" />
                    </span>
                    
                    <InlineEdit
                        className={this.props.agendum.description ? "" : "print-hide"}
                        onChange={this.onFieldChange}
                        value={descriptionValue}
                        placeholder="Agendum Description"
                        onEditModeChanged={this.onFieldEditModeChange}
                        name="description"
                        multilineEditor={true}
                        singleClickToEdit={!this.props.agendum.description}
                        renderMarkdown={true} />
                </Dropzone>

                <Dialog
                    actions={[
                        <FlatButton 
                            label="Yes" 
                            primary={true} 
                            onTouchTap={() => this.props.onAgendumDelete(this.props.agendum.id)} />,
                        <FlatButton 
                        
                            label="No" 
                            primary={true} 
                            onTouchTap={() => this.setState({ delete: false })} />
                    ]}
                    modal={false}
                    open={this.state.delete}>
                        Are you sure you want to remove this agendum?
                </Dialog>
            </div>
        );
    }
}