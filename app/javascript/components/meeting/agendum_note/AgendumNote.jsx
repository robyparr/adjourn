import React, { Component } from 'react';

// Controls
import InlineEdit from '../../common/InlineEdit';
import Dialog  from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

/*
 * A single Agendum Note.
 */
export default class AgendumNote extends Component {

    constructor(props) {
        super(props);
        this.state = {
            delete: false,
            isEditing: false 
        };
    }

    onFieldEditModeChange = (isEditMode) => this.setState({ isEditing: isEditMode});
    onFieldChange = (field,  value) => this.props.onNoteChange({ [field]: value });

    render() {
        /* 
            At the end of the agendum note list (of "existing" notes)
            There will be a stripped down version of the AgendumNote
            component which allows you to set the content, thus creating
            a new note (which will then become an "existing" note).

            This section renders that stripped down component.
        */
        if (!this.props.isExistingNote) {
            return (
                <li className="collection-item grey lighten-4 grey-text print-hide">
                    <InlineEdit
                        onChange={this.onFieldChange}
                        onEditModeChanged={this.onFieldEditModeChange}
                        value="Add a new note..."
                        name="content"
                        className="grey-text"
                        multilineEditor={true}
                        renderMarkdown={true} />
                </li>
            );
        }

        return(
            <li className="collection-item grey lighten-4">
                {!this.state.isEditing &&
                    <a className="secondary-content delete-link" onClick={() => this.setState({ delete: true })}>
                        <i className="material-icons">delete</i>
                    </a>
                }

                <InlineEdit
                    onChange={this.onFieldChange}
                    onEditModeChanged={this.onFieldEditModeChange}
                    value={this.props.note.content}
                    name="content"
                    multilineEditor={true}
                    renderMarkdown={true} />

                <Dialog
                    actions={[
                        <FlatButton 
                            label="Yes"
                            primary={true}
                            onTouchTap={this.props.onNoteDelete} />,
                        <FlatButton 
                            label="No"
                            primary={true}
                            onTouchTap={() => this.setState({ delete: false })} />
                    ]}
                    modal={false}
                    open={this.state.delete}>
                        Are you sure you want to remove this note?
                </Dialog>
            </li>
        );
    }
}