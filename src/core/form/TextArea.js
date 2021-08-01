/**
 * MIT License
 * 
 * Copyright (c) 2020 Ronuse Agency, Adewale Azeez, Oyeleke Damilola.
 * 
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 * 
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { BaseComponent } from "../BaseComponent";
import { Scheme, Alignment, Orientation } from "../variables";
import { ObjUtils, BoolUtils, DOMUtils, InputFilter } from "../../utils";
import { rrAttachToResizeListener } from "../../sensors"

// TODO add fill
export class TextAreaComponent extends BaseComponent {

    static defaultProps = {
        scheme: null,
        id: null,
        className: null,
        style: null,
        label: null,
        alignLabel: Alignment.LEFT,
        placeholder: "",
        helpLabel: null,
        alignHelpLabel: Alignment.BOTTOM,
        flushed: false,
        nostyle: false,
        disabled: null,
        name: null,
        required: false,
        readOnly: false,
        floatLabel: false,
        filter: null,
        filterKeyOnly: false,
        onKeyPress: null,
        onInput: null,
        onPasteCapture: null,
        onFirstInput: null,
        defaultValue: "",
        forwardRef: null,
        elementRef: null,
        resizeOrientation: Orientation.HORIZONTAL_VERTICAL
    }

    static propTypes = {
        scheme: PropTypes.string,
        id: PropTypes.string,
        className: PropTypes.string,
        style: PropTypes.object,
        label: PropTypes.any,
        alignLabel: PropTypes.string,
        placeholder: PropTypes.string,
        helpLabel: PropTypes.any,
        alignHelpLabel: PropTypes.string,
        flushed: PropTypes.bool,
        nostyle: PropTypes.bool,
        disabled: PropTypes.bool,
        name: PropTypes.string,
        required: PropTypes.bool,
        readOnly: PropTypes.bool,
        floatLabel: PropTypes.bool,
        filter: PropTypes.string,
        filterKeyOnly: PropTypes.bool,
        onKeyPress: PropTypes.any,
        onInput: PropTypes.any,
        onPasteCapture: PropTypes.any,
        onFirstInput: PropTypes.any,
        defaultValue: PropTypes.string,
        forwardRef: PropTypes.any,
        elementRef: PropTypes.any,
        resizeOrientation: PropTypes.string
    }

    constructor(props) {
        super(props);

        this.id = this.state.id; 
        if (!this.id) { 
            this.id = DOMUtils.UniqueElementId();
        }

        this.onPasteCapture = this.onPasteCapture.bind(this);
        this.onInput = this.onInput.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
    }

    componentWillUnmount() {

    }

    onPasteCapture(event) {
        if (this.state.onPasteCapture) {
            this.state.onPasteCapture(event, this.state.forwardRef);
        }
    }

    onInput(event) {
        let validatedValue = false;
        let value = event.target.value;
        if (this.state.filter) {
            validatedValue = InputFilter.validate(value, this.state.filter)
        }

        if (this.state.onInput) {
            this.state.onInput(event, this.state.forwardRef);
        }
        if (this.state.onFirstInput && !this.state.hasValue) {
            this.state.hasValue = true;
            this.state.onFirstInput(event, this.state.forwardRef);
        }
        if (value.length == 0) {
            this.state.hasValue = false;
        }
    }

    onKeyPress(event) {
        if (this.state.onKeyPress) {
            this.state.onKeyPress(event, this.state.forwardRef);
        }

        if (this.state.filter && !this.state.validateOnly) {
            InputFilter.onKeyPress(event, this.state.filter)
        }
    }

    renderInput() {
        const placeholder = (this.state.floatLabel) ? " " : this.state.placeholder;
        let inputProps = ObjUtils.findDiffKeys(this.props, TextAreaComponent.defaultProps);
        //inputProps = ObjUtils.removeKeys(inputProps, ['className', 'style']);
        let className = classNames('r-r-textarea',
            (!this.state.nostyle && this.state.scheme && this.state.flushed ? `${this.state.scheme}-border-bottom-color-hover` : null),
            (!this.state.nostyle && this.state.scheme && this.state.flushed ? `${this.state.scheme}-border-bottom-color-focus` : null),
            (!this.state.nostyle && this.state.scheme && !this.state.flushed ? `${this.state.scheme}-border-3px-focus-box-shadow` : null),
            (!this.state.nostyle && this.state.scheme && !this.state.flushed ? `${this.state.scheme}-border-1px-focus` : null),
            (!this.state.nostyle && this.state.scheme && !this.state.flushed ? `${this.state.scheme}-border-1px-hover` : null), {
            'r-r-textarea-rz-h': this.state.resizeOrientation == Orientation.HORIZONTAL,
            'r-r-textarea-rz-v': this.state.resizeOrientation == Orientation.VERTICAL,
            'r-r-textarea-rz-none': this.state.resizeOrientation == Orientation.NONE,
            'r-r-textarea-flushed': !this.state.nostyle && this.state.flushed,
            'r-r-disabled r-r-noselect': !this.state.nostyle && this.state.disabled,
            'r-r-skeleton r-r-loading': !this.state.nostyle && this.state.scheme === Scheme.SKELETON
        }, 'r-r-textarea-theme', this.state.inputClassName);
        return <textarea ref={this.elementRef} className={className} 
                    style={this.state.inputStyle} 
                    id={this.id} 
                    type={this.state.type}
                    name={this.state.name} 
                    placeholder={placeholder}
                    required={this.state.required}
                    disabled={this.state.disabled}
                    readOnly={this.state.readOnly}
                    defaultValue={this.state.defaultValue}
                    {...this.state.eventProps}
                    onInput={this.onInput}
                    onKeyPress={this.onKeyPress}
                    onPasteCapture={this.onPasteCapture}
                />
    }

    renderLabel(alignLabel) {
        if (!this.state.label) {
            return;
        }

        let isString = BoolUtils.isTypeOfAny(this.state.label, ["string"]);
        if (!isString && !React.isValidElement(this.state.label)) {
            throw new Error("Only string or a valid react element is expected as the input label");
        }
        let className = classNames('r-r-textarea-label', {
            'r-r-skeleton r-r-loading': this.state.scheme === Scheme.SKELETON,
            'r-r-margin-bottom-7px': alignLabel === Alignment.TOP,
            'r-r-margin-top-7px': alignLabel === Alignment.BOTTOM,
            'r-r-margin-right-7px': alignLabel === Alignment.LEFT,
            'r-r-margin-left-7px': alignLabel === Alignment.RIGHT && !this.state.floatLabel,
            'r-r-textarea-label-flushed': this.state.flushed
        }); 
        if (isString) {
            return (
                <label className={className} htmlFor={this.id}>{this.state.label}</label>
            )
        }
        var relayProps = ObjUtils.clone(this.state.label.props);
        className = classNames(className, relayProps.className);
        relayProps.className = className;
        return (
            React.cloneElement(this.state.label, relayProps)
        );
    }

    renderHelpLabel(alignHelpLabel) {
        if (!this.state.helpLabel) {
            return;
        }

        let isString = BoolUtils.isTypeOfAny(this.state.helpLabel, ["string"]);
        if (!isString && !React.isValidElement(this.state.helpLabel)) {
            throw new Error("Only string or a valid react element is expected as the input help label");
        }
        let className = classNames('r-r-textarea-help-label', {
            'r-r-skeleton r-r-loading': this.state.scheme === Scheme.SKELETON,
            'r-r-margin-bottom-3px': alignHelpLabel === Alignment.TOP,
            'r-r-margin-top-3px': alignHelpLabel === Alignment.BOTTOM,
            'r-r-margin-right-3px': alignHelpLabel === Alignment.LEFT,
            'r-r-margin-left-3px': alignHelpLabel === Alignment.RIGHT && !this.state.floatLabel,
            'r-r-textarea-label-flushed': this.state.flushed
        }); 
        if (isString) {
            return (
                <small className={className}>{this.state.helpLabel}</small>
            )
        }
        var relayProps = ObjUtils.clone(this.state.helpLabel.props);
        className = classNames(className, relayProps.className);
        relayProps.className = className;
        return (
            React.cloneElement(this.state.helpLabel, relayProps)
        );
    }

    render() {
        const className = classNames({
            'r-r-floating-label': this.state.floatLabel,
        }, this.state.className);
        const alignLabel = (this.state.floatLabel) ? Alignment.RIGHT : this.state.alignLabel;
        let input = this.renderInput();
        const label = this.renderLabel(alignLabel);
        const helpLabel = this.renderHelpLabel(this.state.alignHelpLabel);
        let inputAndIcon = input;
        return (
            <div className={className} style={this.state.style}>
                {alignLabel === Alignment.LEFT && label ? label : null}
                {alignLabel === Alignment.TOP && label ? <React.Fragment>{label} <br/></React.Fragment> : null}

                {this.state.alignHelpLabel === Alignment.LEFT && helpLabel ? helpLabel : null}
                {this.state.alignHelpLabel === Alignment.TOP && helpLabel ? <React.Fragment>{helpLabel} <br/></React.Fragment> : null}

                {inputAndIcon}

                {alignLabel === Alignment.RIGHT && label ? label : null}
                {alignLabel === Alignment.BOTTOM && label ? <React.Fragment><br/> {label}</React.Fragment> : null}
                
                {this.state.alignHelpLabel === Alignment.RIGHT && helpLabel ? helpLabel : null}
                {this.state.alignHelpLabel === Alignment.BOTTOM && helpLabel ? <React.Fragment><br/> {helpLabel}</React.Fragment> : null}
            </div>
        )
    }

}

export const TextArea = React.forwardRef((props, ref) => <TextAreaComponent {...props} forwardRef={ref} />);