import React from 'react';

import axios from 'axios'

export default class Autocomplete extends React.Component {
  UP_ARROW_KEY_CODE = 38;
  DOWN_ARROW_KEY_CODE = 40;
  ENTER_KEY_CODE = 13;

  constructor(props) {
    super(props);

    this.state = {
      showResults: false,
      autocompleteResults: null,
      autocompleteText: '',
      selectedItem: null
    };
  }

  componentDidMount = () => {
    document.addEventListener('click', this.onComponentBlur);
    document.addEventListener('keyup', this.onHotkeyUsed)
  }

  componentWillUnmount = () => {
    document.removeEventListener('click', this.onComponentBlur);
    document.removeEventListener('keyup', this.onHotkeyUsed);
  }

  onComponentBlur = (e) => {
    if (e.target !== this.refs.autocomplete && !this.refs.resultList.contains(e.target)) {
      this.hideResults();
    }
  }

  onHotkeyUsed = (e) => {
    const eventIsForAllowedKeys = [
      this.UP_ARROW_KEY_CODE,
      this.DOWN_ARROW_KEY_CODE,
      this.ENTER_KEY_CODE
    ].includes(e.keyCode);

    if (!this.refs.self.contains(e.target) || !eventIsForAllowedKeys || !this.state.showResults) {
      return;
    }

    const maximumItemKey = this.state.autocompleteResults.length - 1;
    const shouldSelectFirstItem = this.state.selectedItem === null
      && e.keyCode === this.DOWN_ARROW_KEY_CODE;
    const shouldSelectNextItem = e.keyCode === this.DOWN_ARROW_KEY_CODE
      && this.state.selectedItem < maximumItemKey;
    const shouldSelectPreviousItem = e.keyCode === this.UP_ARROW_KEY_CODE
      && this.state.selectedItem > 0;
    const shouldSelectItem = e.keyCode === this.ENTER_KEY_CODE
      && this.state.selectedItem !== null;

    if (shouldSelectFirstItem) {
      this.setState({ selectedItem: 0 });
    } else if (shouldSelectNextItem) {
      this.setState({ selectedItem: this.state.selectedItem + 1 });
    } else if (shouldSelectPreviousItem) {
      this.setState({ selectedItem: this.state.selectedItem - 1 });
    } else if (shouldSelectItem) {
      const selectedAutocompleteItem = this.state.autocompleteResults[this.state.selectedItem];
      this.onAutocompleteItemSelect(selectedAutocompleteItem);
    }
  }

  onChange = (e) => {
    e.persist();

    this.setState({ autocompleteText: e.target.value });

    if (this.state.debounceTimeout !== null) {
      clearTimeout(this.state.debounceTimeout);
    }

    this.state.debounceTimeout = setTimeout(() => {
      this.callAutocompleteURL(this.state.autocompleteText)
    }, 500);
  }

  callAutocompleteURL = (autocompleteValue) => {
    axios({
      url: this.props.url(autocompleteValue),
      method: this.props.method,
    }).then((response) => {
      this.state.autocompleteResults = response.data;

      if (this.props.parseResponse && typeof this.props.parseResponse === 'function') {
        this.state.autocompleteResults = this.props.parseResponse(this.state.autocompleteResults);
      }

      this.showResults();
    });
  }

  showResults = () => {
    this.setState({ showResults: true });
  }

  hideResults = () => {
    this.setState({ showResults: false, selectedItem: null });
  }

  resetAutocomplete = () => {
    this.setState({
      autocompleteResults: null,
      autocompleteText: '',
      selectedItem: null
    });
    this.refs.autocomplete.focus();
  }

  onAutocompleteItemSelect = (item) => {
    this.props.onItemSelected(item);
    this.resetAutocomplete();
  }

  onEmptySubmit = () => {
    if(this.props.onEmptySubmit === null || typeof this.props.onEmptySubmit !== 'function') {
      return;
    }

    if (this.state.selectedItem === null) {
      this.props.onEmptySubmit(this.state.autocompleteText);
      this.resetAutocomplete();
    }
  }

  resultItemClasses = (i) => {
    const staticClasses = "list-item";
    var dynamicClasses = " ";

    if (this.state.selectedItem === i) {
      dynamicClasses += "selected";
    }

    return staticClasses + dynamicClasses
  }

  noResultsMessage = () => {
    var resultMessageFromFunction = null;
    if (this.props.noResultsMessage !== null && typeof this.props.noResultsMessage === 'function') {
      resultMessageFromFunction = this.props.noResultsMessage(this.state.autocompleteText);
    }

    return resultMessageFromFunction || "No results found."
  }

  onKeyUp = (e) => {
    if (this.props.onEmptySubmit === null || typeof this.props.onEmptySubmit !== 'function') {
      return;
    }

    if (e.keyCode === this.ENTER_KEY_CODE) {
      this.onEmptySubmit();
    }
  }

  render() {
    const resultListStyles = {};

    if (!this.state.showResults) {
      resultListStyles['display'] = 'none';
    }

    return (
      <div className="autocomplete" ref="self">
        <input type="text"
          id={this.props.id}
          type={this.props.type || 'search'}
          className={this.props.className}
          onChange={this.onChange}
          onClick={this.showResults}
          onKeyUp={this.onKeyUp}
          placeholder={this.props.placeholder}
          autoComplete="off"
          ref="autocomplete"
          value={this.state.autocompleteText} />

        <ul className={this.props.listClasses} ref="resultList" style={resultListStyles}>
          {this.state.autocompleteResults && this.state.autocompleteResults.map((item, i) => (
            <li className={this.resultItemClasses(i)}
                onClick={() => this.onAutocompleteItemSelect(item)}
                key={i}
                dangerouslySetInnerHTML={{ __html: this.props.renderItem(item) }}>
            </li>
          ))}

          {this.state.autocompleteResults && this.state.autocompleteResults.length ===  0 &&
            <li onClick={this.onEmptySubmit}>
              {this.noResultsMessage()}
            </li>
          }
        </ul>
      </div>
    );
  }
}
