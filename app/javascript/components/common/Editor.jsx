import React, { Component } from 'react';

import TUIEditor from 'tui-editor';

export default class Editor extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: props.value
    };
  }

  componentDidMount = () => this.renderEditor();

  renderEditor = () => {
    if (this.editor) return;

    this.editor = new TUIEditor({
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

  submitEditor = () => {
    if (this.props.onEditorSubmitted) {
      this.props.onEditorSubmitted(this.state.value);
    }
  }

  handleEditorKeypress = (e) => {
    if (this.refs.tuiEditor.contains(e.target) && e.shiftKey && e.key == 'Enter') {
      e.preventDefault();
      this.submitEditor();
    }
  }

  render() {
    return(
      <div className="text-right">
        <div className="text-left" ref="tuiEditor"></div>
        <button
            className="button outline w-full mt-2"
            onClick={this.submitEditor}>
          Save
        </button>
      </div>
    );
  }
}
