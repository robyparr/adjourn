import React, { Component } from 'react';

import Utils from '../../../utils';

export default class Assignees extends Component {
  constructor(props) {
    super(props);

    this.state = {
      assignedIDs:  props.assignedIDs || [],
      selectorOpen: false,
    };
  }

  onBlurSelector = (e) => {
    if (this.state.selectorOpen && !Utils.isDescendantOf(this.refs.selector, e.target)) {
      this.closeSelector();
    }
  }

  openSelector = () => {
    this.setState({ selectorOpen: true })
    document.addEventListener('click', this.onBlurSelector);
  }
  closeSelector = () => {
    this.setState({ selectorOpen: false });
    document.removeEventListener('click', this.onBlurSelector);
  }

  onAttendeeSelected = (attendee) => {
    let assignedIDs = null;

    if (this.state.assignedIDs.includes(attendee.id)) {
      this.props.onUnassignFromActionItem(attendee.email);
      assignedIDs = this.state.assignedIDs.filter(attendeeID => attendeeID !== attendee.id)
    } else {
      this.props.onAssignToActionItem(attendee.email);
      assignedIDs = [...this.state.assignedIDs, attendee.id]
    }

    this.setState({ assignedIDs: assignedIDs });
  }

  renderSingleAssignee = (assigneeID) => {
    let assignee = this.props.attendees.find(attendee => attendee.id === assigneeID);

    return(
      <div onClick={this.openSelector} className="media">
        <img src={Utils.getGravatarUrl(assignee.email, { size: 24 })} className="avatar" />
        <div className="media-text">
          {assignee.email}
        </div>
      </div>
    )
  }

  renderMultipleAssignees = (assigneeIDs) => {
    let assignees      = this.props.attendees.filter(attendee => assigneeIDs.includes(attendee.id));
    let assigneeEmails = assignees.map(assignee => assignee.email).join(', ');

    return(
      <div onClick={this.openSelector} className="media" title={assigneeEmails}>
        {assignees.map(assignee => (
          <img key={assignee.id} src={Utils.getGravatarUrl(assignee.email, { size: 24 })} className="avatar" />
        ))}
        <div className="media-text">
          {assignees.length} assignees
        </div>
      </div>
    )
  }

  renderAssigneeSelector = () => {
    return(
      <div className="selector" ref="selector">
        <div className="header">
          <span>Select an attendee to assign to the action item.</span>
        </div>
        <ul>
          {this.props.attendees.map(attendee => {
            const className = this.state.assignedIDs.includes(attendee.id) ? 'selected' : '';

            return (
              <li key={attendee.id} className={className} onClick={() => this.onAttendeeSelected(attendee)}>
                <div className="media">
                  <img src={Utils.getGravatarUrl(attendee.email, { size: 24 })} className="avatar" />
                  <div className="media-text">{attendee.email}</div>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    )
  }

  render() {
    let selectedAssignees = (
      <div onClick={this.openSelector}>
        No assignees
      </div>
    );

    if (this.state.assignedIDs.length == 1) {
      selectedAssignees = this.renderSingleAssignee(this.state.assignedIDs[0]);
    } else if (this.state.assignedIDs.length > 1) {
      selectedAssignees = this.renderMultipleAssignees(this.state.assignedIDs);
    }

    return (
      <div className="assignees">
        <div className="selected-assignees">
          {selectedAssignees}
        </div>
        {this.state.selectorOpen && this.renderAssigneeSelector()}
      </div>
    )
  }
}
