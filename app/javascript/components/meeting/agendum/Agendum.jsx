import React, { Component } from 'react';

// Controls
import InlineEdit from '../../common/InlineEdit';

import Dropzone from 'react-dropzone';

/*
* A single Agendum.
*/
export default class Agendum extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false
    }
  }

  onFieldEditModeChange = (isEditMode) => this.setState({ isEditing: isEditMode })
  onFieldChange = (field, value) => this.props.onAgendumChange({ [field]: value });

  onNewAgendumTitleChange = (e) => {
    if (e.key === 'Enter') {
      this.props.onAgendumChange({ [e.target.name]: e.target.value });
      e.target.value = '';
    }
  }

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
        <div className="card agendum">
          <div className="card-content">
            <span className="card-title" id="new_title">
              <input type="text"
                onKeyUp={this.onNewAgendumTitleChange}
                placeholder="New Agendum"
                name="title" />
            </span>
          </div>
        </div>
      );
    }

    // If we've made it this far, this is an "existing" agendum.
    const descriptionValue = this.props.agendum.description || "Click here to add a description.";

    return(
      <div className={`card agendum ${this.props.agendum.selected ? "selected" : ""}`}
        onClick={() => this.props.onAgendumSelect(this.props.agendum.id)}>

        <div className="card-head">
          <span className="card-title" id={`${this.props.agendum.id}_title`}>
            <InlineEdit
              onChange={this.onFieldChange}
              onEditModeChanged={this.onFieldEditModeChange}
              value={this.props.agendum.title}
              placeholder="Agendum Title"
              name="title" />
          </span>

          {!this.state.isEditing &&
            <div className="card-actions">
              <button>
                <i className="fa fa-trash"
                  data-modal={`.confirm-agendum-delete-${this.props.agendum.id}`}>
                </i>
              </button>
            </div>
          }
        </div>

        <Dropzone
          onDrop={(files) => this.props.onFileUpload(this.props.agendum.id, files)}
          className="card-content"
          disableClick={true}
          activeClassName="dropzone">
          <InlineEdit
            className="w-full"
            onChange={this.onFieldChange}
            value={descriptionValue}
            placeholder="Agendum Description"
            onEditModeChanged={this.onFieldEditModeChange}
            name="description"
            multilineEditor={true}
            singleClickToEdit={!this.props.agendum.description}
            renderMarkdown={true} />
        </Dropzone>

        <div className={`modal confirm-agendum-delete-${this.props.agendum.id}`}>
          <div className="title">Are you sure?</div>
          <div className="modal-content">
            Are you sure you want to remove this agendum?
          </div>
          <div className="modal-footer">
            <a href="#"
                data-close-modal={`.confirm-agendum-delete-${this.props.agendum.id}`}>
              No
            </a>
            <button className="button ml-4"
                onClick={() => this.props.onAgendumDelete(this.props.agendum.id)}>
              Yes
            </button>
          </div>
        </div>
      </div>
    );
  }
}
