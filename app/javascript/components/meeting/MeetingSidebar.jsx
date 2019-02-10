import React from 'react';

import ActionItemsContainer from '../../containers/ActionItemsContainer';
import AttendeesContainer from '../../containers/AttendeesContainer';
import AgendumDetailsContainer from '../../containers/AgendumDetailsContainer';

export default class MeetingSidebar extends React.Component {

  SIDEBAR_TABS = {
    attendees: {
      title: 'Attendees',
      content: <AttendeesContainer />
    },
    actionItems: {
      title: 'Action Items',
      content: <ActionItemsContainer />
    },
    agendumDetails: {
      title: 'Agendum Details',
      content: <AgendumDetailsContainer />
    }
  };

  constructor(props) {
    super(props);

    this.state = {
      selectedTab: 'attendees',
      active: false
    }
  }

  selectTab(tab) {
    this.setState({
      selectedTab: tab,
      active: true
    });
  }

  tabTitle() {
    return this.SIDEBAR_TABS[this.state.selectedTab].title;
  }

  tabContent() {
    return this.SIDEBAR_TABS[this.state.selectedTab].content;
  }

  withSelectedTabClass(tabValue, otherClasses) {
    if (this.state.selectedTab === tabValue) {
      return otherClasses + ' selected';
    }

    return otherClasses;
  }

  withActiveClass(addActiveClass, otherClasses) {
    if (addActiveClass) {
      return otherClasses + ' active';
    }

    return otherClasses;
  }

  render() {
    return(
      <div>
        {this.state.active &&
          <div className="meeting-sidebar-overlay"
              onClick={() => this.setState({ active: false })}>
            &nbsp;
          </div>
        }

        <div className={this.withActiveClass(this.state.active, "column lg3 meeting-sidebar")}>
          <div className="row tabs">
            <div id="attendees-tab"
                className={this.withSelectedTabClass('attendees', "tab column sm4")}
                onClick={() => this.selectTab('attendees')}>
              <i className="material-icons">people</i>
            </div>
            <div id="action-items-tab"
                className={this.withSelectedTabClass('actionItems', "tab column sm4")}
                onClick={() => this.selectTab('actionItems')}>
              <i className="material-icons">check</i>
            </div>
            <div id="agendum-details-tab"
                className={this.withSelectedTabClass('agendumDetails', "tab column sm4")}
                onClick={() => this.selectTab('agendumDetails')}>
              <i className="material-icons">book</i>
            </div>
          </div>
          <div className="row">
            <div className="column sm12 py-5 pl-4">
              <h5>{this.tabTitle()}</h5>
            </div>
          </div>
          <div className="row">
            <div className="column sm12">
              {this.tabContent()}
            </div>
          </div>
        </div>
      </div>
    );
  }
};
