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
import { InputText } from "./InputText"
import { Popover } from "../overlay/Popover"

// TODO fix on drop down button click error
export class DropdownComponent extends BaseComponent {

    static defaultProps = {
        scheme: null,
        id: null,
        className: null,
        style: null,
        lazyLoad: false,
        editable: false,
        toggleIcon: "fa fa-angle-down",
        options: null,
        selectedOptionIndex: null,
        optionTemplate: null,
        popoverProps: null,
        inputTextRef: null,
        popOverRef: null,
        onSelectOption: null,
        onDropdownShow: null,
        onDropdownHide: null
    }

    static propTypes = {
        scheme: PropTypes.string,
        id: PropTypes.string,
        className: PropTypes.string,
        style: PropTypes.object,
        editable: PropTypes.bool,
        lazyLoad: PropTypes.bool,
        toggleIcon: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
        options: PropTypes.arrayOf(PropTypes.object),
        selectedOptionIndex: PropTypes.number,
        optionTemplate: PropTypes.func,
        popoverProps: PropTypes.object,
        inputTextRef: PropTypes.any,
        popOverRef: PropTypes.any,
        onSelectOption: PropTypes.func,
        onDropdownShow: PropTypes.func,
        onDropdownHide: PropTypes.func
    }

    constructor(props) {
        super(props, [ "onDropdownShow", "onDropdownHide" ]);
        this.state.popoverVisible = false;
        this.state.inputTextRef = React.createRef(this.state.inputTextRef);
        
        this.onDropdownShow = this.onDropdownShow.bind(this);
        this.onDropdownHide = this.onDropdownHide.bind(this);
        this.togglePopover = this.togglePopover.bind(this);
        this.onInputTextKeyDown = this.onInputTextKeyDown.bind(this);
    }

    resolveForwardRef(extraValues) {
        super.resolveForwardRef({
            getInternalElement: () => this.state.inputTextRef,
            value: () => {this.state.checkStates[this.state.selectedOptionIndex]; return this.state.checkStates[this.state.selectedOptionIndex].value},
            text: () => this.state.inputTextRef.current.value(),
            selectedOption: () => this.state.checkStates[this.state.selectedOptionIndex],
            focus: () => this.state.inputTextRef.current.focus(),
            inputTextRef: () => this.state.inputTextRef,
            popOverRef: () => this.state.popOverRef
        });
    }

    componentWillReceiveProps(nextProps) {

    }

    componentDidUpdate(prevProps) {
        
    }

    selectPreviousOption(event) {
        if (!this.state.editable && !this.state.popoverVisible && event.altKey) {
            this.togglePopover(event, true);
            return;
        }
        if (this.state.selectedOptionIndex > 0) {
            this.setState({ selectedOptionIndex: this.state.selectedOptionIndex-1 });
            if (this.state.onSelectOption) this.state.onSelectOption({ event, option: this.state.options[this.state.selectedOptionIndex-1] });
            this.state.inputTextRef.current.getInternalElement().current.value = this.state.options[this.state.selectedOptionIndex-1].label;
        }
        event.preventDefault();
    }

    selectNextOption(event) {
        if (!this.state.editable && !this.state.popoverVisible && event.altKey) {
            this.togglePopover(event, true);
            return;
        }
        if (this.state.selectedOptionIndex < this.state.options.length-1) {
            this.setState({ selectedOptionIndex: this.state.selectedOptionIndex+1 });
            if (this.state.onSelectOption) this.state.onSelectOption({ event, option: this.state.options[this.state.selectedOptionIndex+1] });
            this.state.inputTextRef.current.getInternalElement().current.value = this.state.options[this.state.selectedOptionIndex+1].label;
        }
        event.preventDefault();
    }

    onInputTextKeyDown(event) {
        switch (event.which) {
            case 40: // down
                this.selectNextOption(event);
                break;

            case 38: // up
                this.selectPreviousOption(event);
                break;

            case 32: // space
            case 13: // enter
                if (!this.state.editable || (this.state.popoverVisible && event.which == 13)) {
                    this.togglePopover(event, true);
                    event.preventDefault();
                }
                break;
            
            case 27: // escape
            case 9:  // tab
                if (this.state.popoverVisible) {
                    this.togglePopover(event, true);
                }
                break;
        }
    }

    getSelectedOption() {
        if (!this.state.options || this.state.selectedOptionIndex == null || 
            this.state.selectedOptionIndex < 0 || this.state.selectedOptionIndex >= this.state.options.length) {
            return null;
        }
        return this.state.options[this.state.selectedOptionIndex];
    }

    togglePopover(e, ignoreEditable) {
        if (!this.popover || (!ignoreEditable && this.state.editable && e.target === this.state.inputTextRef.current.getInternalElement().current)) return;
        return this.popover.toggle(e, this.compoundRef);
    }

    onDropdownHide() {
        this.state.popoverVisible = false;
        if (this.state.onDropdownHide) this.state.onDropdownHide();
    }

    onDropdownShow() {
        this.state.popoverVisible = true;
        if (this.state.onDropdownShow) this.state.onDropdownShow();
    }

    selectOption(e, index, option) {
        this.setState({ selectedOptionIndex: index });
        if (this.state.onSelectOption) this.state.onSelectOption({ event, option: this.state.options[index] });
        this.state.inputTextRef.current.getInternalElement().current.value = option.label;
        return this.togglePopover(e, false);
    }

    buildSingleOption(option) {
        let icon = option.icon;
        if (icon && BoolUtils.isTypeOfAny(icon, ["string"])) {
            icon = <img src={icon}></img>;
        }

        return (
            <span className="r-r-dropdown-popover-li-item">{icon}{option.label}</span>
        );
    }

    buildPopover() {
        if (!this.state.popoverProps) { this.state.popoverProps = {}; }
        this.state.popoverProps.className = classNames('r-r-dropdown-popover r-r-scrollpanel', 
            (this.props.scheme ? `${this.props.scheme}-scrollpanel` : null), 
            this.state.popoverProps.inputClassName);
        const listItems = [];
        if (this.state.options) {
            this.state.options.forEach((option, index) => {
                const isSelected = index === this.state.selectedOptionIndex;
                const className = classNames((this.state.scheme && isSelected ? this.state.scheme : null),
                    (this.state.scheme ? `${this.state.scheme}-bg-hover` : null), {
                    'default-style': !this.state.scheme
                });
                const optionElement = this.state.optionTemplate ? this.state.optionTemplate(option) : this.buildSingleOption(option);
                listItems.push(<li aria-label={option.label} role="option" 
                    aria-selected={isSelected} className={className} onClick={(e) => this.selectOption(e, index, option)}>
                        {optionElement}
                </li>);
            });
        }

        return (
            <Popover pointingArrowClassName="" {...this.state.popoverProps} ref={(el) => this.popover = el} 
                onOpenFocusRef={this.state.inputTextRef} 
                onCloseFocusRef={this.state.inputTextRef} 
                onShow={this.onDropdownShow} onHide={this.onDropdownHide}>
                <ul role="listbox" className="r-r-dropdown-popover-list">
                    {listItems}
                </ul>
            </Popover>
        );
    }

    render() {
        const selectedOption = this.getSelectedOption();
        const relayProps = ObjUtils.findDiffKeys(this.props, DropdownComponent.defaultProps);
        relayProps.className = classNames('r-r-dropdown-inputtext-panel', this.state.className, relayProps.className);
        relayProps.inputClassName = classNames('r-r-dropdown-inputtext', {
            'r-r-cursor-pointer': !this.state.editable,
        }, relayProps.inputClassName);
        relayProps.leftIcon = selectedOption ? (typeof selectedOption.icon === "string" ? <img src={selectedOption.icon}></img> : selectedOption.icon) : null;
        relayProps.defaultValue = selectedOption ? selectedOption.label : null;
        relayProps.style = { ...this.state.style, ...relayProps.style};
        relayProps.onKeyDown = this.onInputTextKeyDown;
        const popover = this.buildPopover();

        return (
            <React.Fragment>
                <InputText compoundRef={(el) => this.compoundRef = el} scheme={this.state.scheme} readOnly={!this.state.editable} {...relayProps} 
                    ref={this.state.inputTextRef} rightIcon={this.state.toggleIcon} onClick={(e) => {
                        this.togglePopover(e, false);
                    }}/>
                {popover}
            </React.Fragment>
        );
    }

}

export const Dropdown = React.forwardRef((props, ref) => <DropdownComponent {...props} forwardRef={ref} />);

