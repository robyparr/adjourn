import React, { Component } from 'react';

// Controls
import InlineEdit from '../../common/InlineEdit';

/*
* A single Agendum Note.
*/
export default class AgendumNote extends Component {

  constructor(props) {
    super(props);
    this.state = {
      isEditing: false
    };
  }

  onFieldEditModeChange = (isEditMode) => this.setState({ isEditing: isEditMode});
  onFieldChange = (field,  value) => this.props.onNoteChange({ [field]: value });

  onNewNoteFieldChange = (e) => {
    if (e.key === 'Enter') {
      this.props.onNoteChange({ [e.target.name]: e.target.value });
    }
  }

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
        <li className="list-item">
          <input
            type="text"
            onKeyUp={this.onNewNoteFieldChange}
            placeholder="Add a new note..."
            name="content"
            className="w-full" />
        </li>
      );
    }

    return(
      <li className="list-item">
        <InlineEdit
          onChange={this.onFieldChange}
          onEditModeChanged={this.onFieldEditModeChange}
          value={this.props.note.content}
          placeholder="Agendum note"
          name="content"
          className="w-full mr-4"
          multilineEditor={true}
          renderMarkdown={true} />

        <button className="list-floating-text">
          <i className="fa fa-trash"
            data-modal={`.confirm-agendum-note-delete-${this.props.note.id}`}>
          </i>
        </button>

        <div className={`modal confirm-agendum-note-delete-${this.props.note.id}`}>
          <div className="title">Are you sure?</div>
          <div className="modal-content">
            Are you sure you want to remove this note?
          </div>
          <div className="modal-footer">
            <a href="#" data-close-modal={`.confirm-agendum-note-delete-${this.props.note.id}`}>
              No
            </a>
            <button className="button ml-4" onClick={this.props.onNoteDelete}>
              Yes
            </button>
          </div>
        </div>
      </li>
    );
  }
}
