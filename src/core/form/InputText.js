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

import PropTypes from 'prop-types';
import classNames from 'classnames';
import React, { Component } from 'react';
import { ObjUtils, BoolUtils, DOMUtils, InputFilter } from "../../utils";
import { Scheme, Alignment } from "../variables";

export class InputText extends Component {

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
        filterKeyOnly: false
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
        filterKeyOnly: PropTypes.bool
    }

    constructor(props) {
        super(props);

        
        this.id = this.props.id; 
        if (!this.id && this.props.label) { 
            this.id = DOMUtils.UniqueElementId();
        }

        this.onInput = this.onInput.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps) {

    }

    componentWillUnmount() {

    }

    onInput(event) {
        let validatedValue = false;
        if (this.props.filter) {
            validatedValue = InputFilter.validate(event.target.value, this.props.filter)
        }

        if (this.props.onInput) {
            this.props.onInput(event);
        }
    }

    onKeyPress(event) {
        if (this.props.onKeyPress) {
            this.props.onKeyPress(event);
        }

        if (this.props.filter && !this.props.validateOnly) {
            InputFilter.onKeyPress(event, this.props.filter)
        }
    }

    renderInput() {
        const placeholder = (this.props.floatLabel) ? " " : this.props.placeholder;
        let inputProps = ObjUtils.findDiffKeys(this.props, InputText.defaultProps);
        let className = this.props.nostyle ? "" : classNames('r-r-inputtext', 
            (this.props.scheme && this.props.flushed ? `${this.props.scheme}-border-bottom-color-hover` : null),
            (this.props.scheme && this.props.flushed ? `${this.props.scheme}-border-bottom-color-focus` : null),
            (this.props.scheme && !this.props.flushed ? `${this.props.scheme}-border-3px-focus-box-shadow` : null),
            (this.props.scheme && !this.props.flushed ? `${this.props.scheme}-border-1px-focus` : null),
            (this.props.scheme && !this.props.flushed ? `${this.props.scheme}-border-1px-hover` : null), {
            'r-r-inputtext-outlined': this.props.outlined,
            'r-r-inputtext-flushed': this.props.flushed,
            'r-r-padding-left-0px': this.props.flushed && !this.props.leftIcon && !this.props.rightIcon,
            'r-r-disabled r-r-noselect': this.props.disabled,
            'r-r-skeleton r-r-loading': this.props.scheme === Scheme.SKELETON
        }, 'r-r-inputtext-theme', this.props.className);
        return <input {...inputProps} className={className} 
                    style={this.props.style} 
                    id={this.id} 
                    name={this.props.name} 
                    placeholder={placeholder}
                    required={this.props.required}
                    disabled={this.props.readOnly}
                    onInput={this.onInput} 
                    onKeyPress={this.onKeyPress}
                />
    }

    renderLabel(alignLabel) {
        if (!this.props.label) {
            return;
        }

        let isString = BoolUtils.isTypeOfAny(this.props.label, ["string"]);
        if (!isString && !React.isValidElement(this.props.label)) {
            throw new Error("Only string or a valid react element is expected as the input label");
        }
        let className = classNames('r-r-inputtext-label', {
            'r-r-skeleton r-r-loading': this.props.scheme === Scheme.SKELETON,
            'r-r-margin-bottom-7px': alignLabel === Alignment.TOP,
            'r-r-margin-top-7px': alignLabel === Alignment.BOTTOM,
            'r-r-margin-right-7px': alignLabel === Alignment.LEFT,
            'r-r-margin-left-7px': alignLabel === Alignment.RIGHT && !this.props.floatLabel,
            'r-r-inputtext-label-flushed': this.props.flushed && this.props.outlined
        }); 
        if (isString) {
            return (
                <label className={className} htmlFor={this.id}>{this.props.label}</label>
            )
        }
        var relayProps = ObjUtils.clone(this.props.label.props);
        relayProps.className = relayProps.className ? ' ' + className : className;;
        return (
            React.cloneElement(this.props.label, relayProps)
        );
    }

    renderHelpLabel(alignHelpLabel) {
        if (!this.props.helpLabel) {
            return;
        }

        let isString = BoolUtils.isTypeOfAny(this.props.helpLabel, ["string"]);
        if (!isString && !React.isValidElement(this.props.helpLabel)) {
            throw new Error("Only string or a valid react element is expected as the input help label");
        }
        let className = classNames('r-r-inputtext-help-label', {
            'r-r-skeleton r-r-loading': this.props.scheme === Scheme.SKELETON,
            'r-r-margin-bottom-3px': alignHelpLabel === Alignment.TOP,
            'r-r-margin-top-3px': alignHelpLabel === Alignment.BOTTOM,
            'r-r-margin-right-3px': alignHelpLabel === Alignment.LEFT,
            'r-r-margin-left-3px': alignHelpLabel === Alignment.RIGHT && !this.props.floatLabel,
            'r-r-inputtext-label-flushed': this.props.flushed && this.props.outlined
        }); 
        if (isString) {
            return (
                <small className={className}>{this.props.helpLabel}</small>
            )
        }
        var relayProps = ObjUtils.clone(this.props.helpLabel.props);
        relayProps.className = relayProps.className ? ' ' + className : className;;
        return (
            React.cloneElement(this.props.helpLabel, relayProps)
        );
    }

    renderLeftIcon() {
        if (!this.props.leftIcon) {
            return [null, null];
        }

        let isString = BoolUtils.isTypeOfAny(this.props.leftIcon, ["string"]);
        if (!isString && !React.isValidElement(this.props.leftIcon)) {
            throw new Error("Only string or a valid react element is expected as the input left icon");
        }
        let className = classNames('r-r-inputtext-left-icon', {
            'r-r-skeleton r-r-loading': this.props.scheme === Scheme.SKELETON,
            'r-r-inputtext-left-icon-flushed': this.props.flushed && this.props.outlined
        }, this.props.leftIcon); 
        if (isString) {
            return [
                true, 
                <i className={className}/>
            ]
        }
        var relayProps = ObjUtils.clone(this.props.leftIcon.props);
        relayProps.className = relayProps.className ? ' ' + className : className;;
        return [
            false, 
            React.cloneElement(this.props.leftIcon, relayProps)
        ];
    }

    renderRightIcon() {
        if (!this.props.rightIcon) {
            return [null, null];
        }

        let isString = BoolUtils.isTypeOfAny(this.props.rightIcon, ["string"]);
        if (!isString && !React.isValidElement(this.props.rightIcon)) {
            throw new Error("Only string or a valid react element is expected as the input left icon");
        }
        let className = classNames('r-r-inputtext-right-icon', {
            'r-r-skeleton r-r-loading': this.props.scheme === Scheme.SKELETON,
            'r-r-inputtext-right-icon-flushed': this.props.flushed && this.props.outlined
        }, this.props.rightIcon); 
        if (isString) {
            return [
                true, 
                <i className={className}/>
            ]
        }
        var relayProps = ObjUtils.clone(this.props.rightIcon.props);
        relayProps.className = relayProps.className ? ' ' + className : className;
        return [
            false, 
            React.cloneElement(this.props.rightIcon, relayProps)
        ];
    }

    render() {
        const className = classNames({
            'r-r-floating-label': this.props.floatLabel,
        });
        const alignLabel = (this.props.floatLabel) ? Alignment.RIGHT : this.props.alignLabel;
        let input = this.renderInput();
        const label = this.renderLabel(alignLabel);
        const helpLabel = this.renderHelpLabel(this.props.alignHelpLabel);
        let inputAndIcon = input;
        if (this.props.leftIcon || this.props.rightIcon) { // TODO there must be a better way to this this
            const [leftIconIsString, leftIcon] = this.renderLeftIcon();
            const [rightIconIsString, rightIcon] = this.renderRightIcon();
            var relayProps = ObjUtils.clone(input);
            relayProps.style = {};
            if (leftIconIsString !== null) {
                relayProps.style.paddingLeft = this.props.flushed ? "25px" : "35px";
            }
            if (rightIconIsString !== null) {
                relayProps.style.paddingRight = this.props.flushed ? "25px" : "35px";
            }
            input = React.cloneElement(input, relayProps);
            inputAndIcon = <span className="r-r-inputtext-icon-pack">{leftIcon}{rightIcon} {input}</span>;
        }

        return (
            <span className={className}>
                {alignLabel === Alignment.LEFT && label ? label : null}
                {alignLabel === Alignment.TOP && label ? <React.Fragment>{label} <br/></React.Fragment> : null}

                {this.props.alignHelpLabel === Alignment.LEFT && helpLabel ? helpLabel : null}
                {this.props.alignHelpLabel === Alignment.TOP && helpLabel ? <React.Fragment>{helpLabel} <br/></React.Fragment> : null}

                {inputAndIcon}

                {alignLabel === Alignment.RIGHT && label ? label : null}
                {alignLabel === Alignment.BOTTOM && label ? <React.Fragment><br/> {label}</React.Fragment> : null}
                
                {this.props.alignHelpLabel === Alignment.RIGHT && helpLabel ? helpLabel : null}
                {this.props.alignHelpLabel === Alignment.BOTTOM && helpLabel ? <React.Fragment><br/> {helpLabel}</React.Fragment> : null}
            </span>
        )
    }

}