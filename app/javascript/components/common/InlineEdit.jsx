import React, { Component } from 'react';

import marked from 'marked';
import Editor from 'tui-editor';

/**
* Provides inline editing ability.
* props.value will be displayed using whatever element
* is passed in through props.displayElement.
*
* When clicked, an <input /> or <textarea></textarea>
* will be displayed (depending on the multilineEditor prop)
* to allow editing of props.value.
*
* Example:
*
* <InlineEdit displayElement="h1" value="example" />
*
* This will display <h1>example</h1> which will turn into
* <input type="text" value="example" /> when clicked.
*/
export default class InlineEdit extends Component {
  constructor(props) {
    super(props);
    marked.setOptions({ sanitize: true });

    this.state = {
      displayElement: props.displayElement || 'p',
      multilineEditor: props.multilineEditor || false,
      isEditing: props.isEditing || false,
      value: props.value
    };
  }

  componentDidUpdate() {
    if (this.state.isEditing && this.state.multilineEditor && !this.editor) {
      this.editor = new Editor({
        el:               this.refs.tuiEditor,
        initialValue:     this.state.value,
        usageStatistics:  false,
        previewtype:      'tab',
        events: {
          change: () => {
            this.setState({ value: this.editor.getMarkdown() });
          }
        },
        toolbarItems: [
          'heading',  'bold',       'italic', 'strike', 'divider',
          'hr',       'quote',      'divider',
          'ul',       'ol',         'divider',
          'table',    'link',       'divider',
          'code',     'codeblock',
        ]
      });

      document.addEventListener('keypress', this.handleEditorKeypress);
    }
  }

  /**
  * Handles activation of edit mode.
  * Calls this.props.onEditModeChanged(true);
  */
  onEditModeActivated = () => {
    if (this.state.isEditing) return;

    this.setState({ isEditing: true });

    if (this.props.onEditModeChanged) {
      this.props.onEditModeChanged(true);
    }
  }

  /**
  * Handles activation of display mode.
  * Calls this.props.onEditModeChanged(false);
  */
  onDisplayModeActivated = () => {
    if (!this.state.isEditing) return;

    this.setState({ isEditing: false });

    if (this.props.onEditModeChanged) {
      this.props.onEditModeChanged(false);
    }

    this.editor = null;
    document.removeEventListener('keypress', this.handleEditorKeypress);
  }

  /**
  * Handles submission of the editor.
  *
  * Editors will be submitted onBlur or can be manually
  * submitted by pressing Enter for the single line editor
  * or Shift + Enter for the multiline editor.
  *
  * Upon submission, InlineEdit emits an event by calling
  * props.onChange(fieldName, fieldValue)
  */
  onEditorSubmit = (e) => {
    if (e.type === 'keypress') {
      if (!this.state.multilineEditor && e.key == 'Enter') {
        this.onDisplayModeActivated();
      } else {
        return;
      }
    } else if (e.type === 'blur') {
      this.onDisplayModeActivated();
    }

    if (this.props.onChange != null && this.state.value != this.props.value) {
      this.props.onChange(this.props.name, e.target.value)
    }
  }

  submitEditor = () => {
    this.onDisplayModeActivated();
    if (this.props.onChange != null && this.state.value != this.props.value) {
      this.props.onChange(this.props.name, this.state.value)
    }
  }

  handleEditorKeypress = (e) => {
    if (this.refs.tuiEditor.contains(e.target) && e.shiftKey && e.key == 'Enter') {
      e.preventDefault();
      this.submitEditor();
    }
  }

  renderEditorElement = () => {
    const props = {
      className: this.props.className,
      onBlur: this.onEditorSubmit,
      onChange: (e) => this.setState({ value: e.target.value }),
      onKeyPress: this.onEditorSubmit,
      onFocus: (e) => e.target.select(),
      autoFocus: true,
      value: this.state.value,
      placeholder: this.props.placeholder
    };

    if (this.state.multilineEditor) {
      return (
        <div className="text-right">
          <div className="text-left" ref="tuiEditor"></div>
          <button
              className="button outline w-full mt-2"
              onClick={this.submitEditor}>
            Save
          </button>
        </div>
      );
    } else {
      return <input type="text" {...props} />;
    }
  }

  renderMarkdownDisplayElement = (props) => {
    props['dangerouslySetInnerHTML'] = { __html: marked(this.state.value) };
    props['className'] += " markdown-body";

    return <this.state.displayElement {...props} />;
  }

  renderDisplayElement = () => {
    const props = { className: this.props.className || "" };

    if (this.props.singleClickToEdit || screen.width <= 992) {
      props['onClick'] = this.onEditModeActivated;
    } else {
      props['onDoubleClick'] = this.onEditModeActivated;
    }

    if (this.props.renderMarkdown) {
      return this.renderMarkdownDisplayElement(props);
    }

    return (
      <this.state.displayElement {...props}>
        {this.state.value}
      </this.state.displayElement>
      );
    }

    render() {
      if (this.state.isEditing) {
        return this.renderEditorElement();
      }
      return this.renderDisplayElement();
    }
  }
