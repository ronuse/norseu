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
import { Scheme, Alignment } from "../variables";
import { ObjUtils, BoolUtils, DOMUtils, InputFilter } from "../../utils";
import { rrAttachToResizeListener } from "../../sensors"

export class InputTextComponent extends BaseComponent {

    static defaultProps = {
        scheme: null,
        id: null,
        className: null,
        style: null,
        inputClassName: null,
        inputStyle: null,
        label: null,
        alignLabel: Alignment.LEFT,
        placeholder: "",
        helpLabel: null,
        alignHelpLabel: Alignment.BOTTOM,
        outlined: false,
        flushed: false,
        nostyle: false,
        leftIcon: null,
        rightIcon: null,
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
        type: "text",
        forwardRef: null,
        elementRef: null,
        fill: false
    }

    static propTypes = {
        scheme: PropTypes.string,
        id: PropTypes.string,
        className: PropTypes.string,
        style: PropTypes.object,
        inputClassName: PropTypes.string,
        inputStyle: PropTypes.object,
        label: PropTypes.any,
        alignLabel: PropTypes.string,
        placeholder: PropTypes.string,
        helpLabel: PropTypes.any,
        alignHelpLabel: PropTypes.string,
        outlined: PropTypes.bool,
        flushed: PropTypes.bool,
        nostyle: PropTypes.bool,
        leftIcon: PropTypes.any,
        rightIcon: PropTypes.any,
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
        type: PropTypes.string,
        forwardRef: PropTypes.any,
        elementRef: PropTypes.any,
        fill: PropTypes.bool
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
        let inputProps = ObjUtils.findDiffKeys(this.props, InputTextComponent.defaultProps);
        //inputProps = ObjUtils.removeKeys(inputProps, ['className', 'style']);
        let className = this.state.nostyle ? "" : classNames('r-r-inputtext',
            (this.state.scheme && this.state.flushed ? `${this.state.scheme}-border-bottom-color-hover` : null),
            (this.state.scheme && this.state.flushed ? `${this.state.scheme}-border-bottom-color-focus` : null),
            (this.state.scheme && !this.state.flushed ? `${this.state.scheme}-border-3px-focus-box-shadow` : null),
            (this.state.scheme && !this.state.flushed ? `${this.state.scheme}-border-1px-focus` : null),
            (this.state.scheme && !this.state.flushed ? `${this.state.scheme}-border-1px-hover` : null), {
            'r-r-max-width-100-percent': this.state.fill,
            'r-r-inputtext-outlined': this.state.outlined,
            'r-r-inputtext-flushed': this.state.flushed,
            'r-r-padding-left-0px': this.state.flushed && !this.state.leftIcon && !this.state.rightIcon,
            'r-r-disabled r-r-noselect': this.state.disabled,
            'r-r-skeleton': this.state.scheme === Scheme.SKELETON
        }, 'r-r-inputtext-theme', this.state.inputClassName);

        return <input ref={this.elementRef} className={className} 
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
        let className = classNames('r-r-inputtext-label', {
            'r-r-skeleton': this.state.scheme === Scheme.SKELETON,
            'r-r-margin-bottom-7px': alignLabel === Alignment.TOP,
            'r-r-margin-top-7px': alignLabel === Alignment.BOTTOM,
            'r-r-margin-right-7px': alignLabel === Alignment.LEFT,
            'r-r-margin-left-7px': alignLabel === Alignment.RIGHT && !this.state.floatLabel,
            'r-r-inputtext-label-flushed': this.state.flushed && this.state.outlined
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
        let className = classNames('r-r-inputtext-help-label', {
            'r-r-skeleton': this.state.scheme === Scheme.SKELETON,
            'r-r-margin-bottom-3px': alignHelpLabel === Alignment.TOP,
            'r-r-margin-top-3px': alignHelpLabel === Alignment.BOTTOM,
            'r-r-margin-right-3px': alignHelpLabel === Alignment.LEFT,
            'r-r-margin-left-3px': alignHelpLabel === Alignment.RIGHT && !this.state.floatLabel,
            'r-r-inputtext-label-flushed': this.state.flushed && this.state.outlined
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

    renderLeftIcon() {
        if (!this.state.leftIcon) {
            return [null, null];
        }

        let isString = BoolUtils.isTypeOfAny(this.state.leftIcon, ["string"]);
        if (!isString && !React.isValidElement(this.state.leftIcon)) {
            throw new Error("Only string or a valid react element is expected as the input left icon");
        }
        let className = classNames('r-r-inputtext-left-icon', 
            (isString ? this.state.leftIcon : null), {
            'r-r-skeleton': this.state.scheme === Scheme.SKELETON,
            'r-r-inputtext-left-icon-flushed': this.state.flushed && this.state.outlined
        }); 
        if (isString) {
            return [
                true, 
                <i className={className}/>
            ]
        }
        var relayProps = ObjUtils.clone(this.state.leftIcon.props);
        className = classNames(className, relayProps.className);
        relayProps.className = className;
        return [
            false, 
            React.cloneElement(this.state.leftIcon, relayProps)
        ];
    }

    renderRightIcon() {
        if (!this.state.rightIcon) {
            return [null, null];
        }

        let isString = BoolUtils.isTypeOfAny(this.state.rightIcon, ["string"]);
        if (!isString && !React.isValidElement(this.state.rightIcon)) {
            throw new Error("Only string or a valid react element is expected as the input left icon");
        }
        let className = classNames('r-r-inputtext-right-icon',
            (isString ? this.state.rightIcon : null), {
            'r-r-skeleton': this.state.scheme === Scheme.SKELETON,
            'r-r-inputtext-right-icon-flushed': this.state.flushed && this.state.outlined
        }, this.state.rightIcon); 
        if (isString) {
            return [
                true, 
                <i onClick={this.state.onClick} className={className}/>
            ]
        }
        var relayProps = ObjUtils.clone(this.state.rightIcon.props);
        className = classNames(className, relayProps.className);
        relayProps.className = className;
        if (!relayProps.onClick) {
            relayProps.onClick = this.state.onClick;
        }
        return [
            false, 
            React.cloneElement(this.state.rightIcon, relayProps)
        ];
    }

    render() {
        const className = classNames({
            'r-r-width-100-percent': this.state.fill,
            'r-r-floating-label': this.state.floatLabel,
        }, this.state.className);
        const alignLabel = (this.state.floatLabel) ? Alignment.RIGHT : this.state.alignLabel;
        let input = this.renderInput();
        const label = this.renderLabel(alignLabel);
        const helpLabel = this.renderHelpLabel(this.state.alignHelpLabel);
        let inputAndIcon = input;
        if (this.state.leftIcon || this.state.rightIcon) { // TODO there must be a better way to this this
            const [leftIconIsString, leftIcon] = this.renderLeftIcon();
            const [rightIconIsString, rightIcon] = this.renderRightIcon();
            var relayProps = ObjUtils.clone(input.props);
            if (!relayProps.style) {
                relayProps.style = {};
            }
            if (leftIconIsString !== null && !relayProps.style.paddingLeft) {
                relayProps.style.paddingLeft = this.state.flushed ? "25px" : "35px";
            }
            if (rightIconIsString !== null && !relayProps.style.paddingRight) {
                relayProps.style.paddingRight = this.state.flushed ? "25px" : "35px";
            }
            input = React.cloneElement(input, relayProps);
            inputAndIcon = <span className="r-r-inputtext-icon-pack">{leftIcon}{rightIcon} {input}</span>;
        }

        return (
            <span className={className} style={this.state.style}>
                {alignLabel === Alignment.LEFT && label ? label : null}
                {alignLabel === Alignment.TOP && label ? <React.Fragment>{label} <br/></React.Fragment> : null}

                {this.state.alignHelpLabel === Alignment.LEFT && helpLabel ? helpLabel : null}
                {this.state.alignHelpLabel === Alignment.TOP && helpLabel ? <React.Fragment>{helpLabel} <br/></React.Fragment> : null}

                {inputAndIcon}

                {alignLabel === Alignment.RIGHT && label ? label : null}
                {alignLabel === Alignment.BOTTOM && label ? <React.Fragment><br/> {label}</React.Fragment> : null}
                
                {this.state.alignHelpLabel === Alignment.RIGHT && helpLabel ? helpLabel : null}
                {this.state.alignHelpLabel === Alignment.BOTTOM && helpLabel ? <React.Fragment><br/> {helpLabel}</React.Fragment> : null}
            </span>
        )
    }

}

export const InputText = React.forwardRef((props, ref) => <InputTextComponent {...props} forwardRef={ref} />);