import React, { Component } from 'react';

import marked from 'marked';
import TextareaAutosize from 'react-autosize-textarea';

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

    /**
     * Handles activation of edit mode.
     * Calls this.props.onEditModeChanged(true);
     */
    handleEditModeActivation = () => {
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
    handleDisplayModeActivation = () => {
        if (!this.state.isEditing) return;

        this.setState({ isEditing: false });

        if (this.props.onEditModeChanged) {
            this.props.onEditModeChanged(false);
        }
    }

    /**
     * Handles editor value changes.
     */
    handleValueChanged = (e) => {
        this.setState({ value: e.target.value });
    }

    /**
     * Select's all text within the editor when
     * it's focused.
     */
    handleEditorFocused = (e) => {
        e.target.select();
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
    handleEditorSubmitted = (e) => {
        if (this.state.multilineEditor && e.shiftKey && e.key == 'Enter') {
            this.handleDisplayModeActivation();
        } else if (!this.state.multilineEditor && e.key == 'Enter') {
            this.handleDisplayModeActivation();
        } else {
            return;
        }

        if (this.props.onChange != null) {
            this.props.onChange(this.props.name, e.target.value)
        }
    }

    render() {
        var component;

        // Determine whether to render an editor or just the value.
        if (!this.state.isEditing) { // Value
            if (this.props.renderMarkdown) {
                component = (
                    <this.state.displayElement 
                        className={"markdown-body " + this.props.className}
                        onClick={this.handleEditModeActivation}
                        dangerouslySetInnerHTML={{ __html: marked(this.state.value) }}>
                    </this.state.displayElement>
                );
            } else {
                component = (
                    <this.state.displayElement onClick={this.handleEditModeActivation}
                        className={this.props.className}>
                        {this.state.value}
                    </this.state.displayElement>
                );
            }
        } else { // Editor
            if (this.state.multilineEditor) {
                component = (
                    <TextareaAutosize
                        className={this.props.className}
                        onBlur={this.handleDisplayModeActivation}
                        onChange={this.handleValueChanged}
                        onKeyPress={this.handleEditorSubmitted}
                        onFocus={this.handleEditorFocused}
                        autoFocus={true}
                        value={this.state.value} />
                );
            } else {
                component = (
                    <input 
                        type="text"
                        className={this.props.className}
                        value={this.state.value} 
                        onBlur={this.handleDisplayModeActivation}
                        onChange={this.handleValueChanged}
                        onKeyUp={this.handleEditorSubmitted}
                        onFocus={this.handleEditorFocused}
                        autoFocus={true} />
                );
            }
        }

        return <div>{component}</div>;
    }
}