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
		lazyLoadFraction: -1,
		editable: false,
		toggleIcon: "fa fa-angle-down",
		options: null,
		selectable: true,
		selectedOptionIndex: null,
		optionMap: null,
		optionTemplate: null,
		popoverProps: null,
		inputTextRef: null,
		popOverRef: null,
		matchTargetSize: false,
		onSearch: null,
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
		lazyLoadFraction: PropTypes.number,
		toggleIcon: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
		options: PropTypes.arrayOf(PropTypes.object),
		selectable: PropTypes.bool,
		selectedOptionIndex: PropTypes.number,
		optionMap: PropTypes.object,
		optionTemplate: PropTypes.func,
		popoverProps: PropTypes.object,
		inputTextRef: PropTypes.any,
		popOverRef: PropTypes.any,
		matchTargetSize: PropTypes.bool,
		onSearch: PropTypes.func,
		onSelectOption: PropTypes.func,
		onDropdownShow: PropTypes.func,
		onDropdownHide: PropTypes.func
	}

	constructor(props) {
		super(props, [ "onDropdownShow", "onDropdownHide" ]);
		this.state.popoverVisible = false;
		this.state.inputTextRef = React.createRef(this.state.inputTextRef);
		this.state.popOverRef = React.createRef(this.state.popOverRef);
		
		this.onDropdownShow = this.onDropdownShow.bind(this);
		this.onDropdownHide = this.onDropdownHide.bind(this);
		this.togglePopover = this.togglePopover.bind(this);
		this.onInputTextKeyDown = this.onInputTextKeyDown.bind(this);
		this.onInputTextInput = this.onInputTextInput.bind(this);
		this.onInputTextStateChange = this.onInputTextStateChange.bind(this);
	}

	resolveForwardRef(extraValues) {
		super.resolveForwardRef({
			getInternalElement: () => this.state.inputTextRef,
			value: () => (this.state.options[this.state.selectedOptionIndex] ? this.state.options[this.state.selectedOptionIndex].value : null),
			text: () => this.state.inputTextRef.current.value(),
			selectedOption: () => (this.state.options && this.state.options.length > 0 ? this.state.options[this.state.selectedOptionIndex] : null),
			focus: () => this.state.inputTextRef.current.focus(),
			inputTextRef: () => this.state.inputTextRef,
			popOverRef: () => { current: this.popover },
			toggle: this.togglePopover,
			showDropDown: () => { if (!this.state.popoverVisible) { this.togglePopover(event, true); } },
			hideDropDown: () => { if (this.state.popoverVisible) { this.togglePopover(event, true); } },
		});
	}

	componentWillReceiveProps(nextProps) {

	}

	componentDidUpdate(prevProps) {
		
	}

	onInputTextStateChange(componentName, state) {
		this.setState(state);
	}

	selectPreviousOption(event) {
		if (!this.state.editable && !this.state.popoverVisible && event.altKey) {
			this.togglePopover(event, true);
			return;
		}
		if (this.state.selectedOptionIndex > 0) {
			this.setState({ selectedOptionIndex: this.state.selectedOptionIndex-1 });
			if (this.state.onSelectOption) this.state.onSelectOption({ event, option: this.state.options[this.state.selectedOptionIndex-1] });
			this.state.inputTextRef.current.getInternalElement().current.value = this.resolveOptionLabel(this.state.options[this.state.selectedOptionIndex-1]);
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
			this.state.inputTextRef.current.getInternalElement().current.value = this.resolveOptionLabel(this.state.options[this.state.selectedOptionIndex+1]);;
		}
		event.preventDefault();
	}

	onInputTextInput(event, ref) {
		if (event.target.value === "") { this.selectOption(null, -1, null); }
		if (this.state.onInput) this.state.onInput(event, ref);
		if (this.state.onSearch) this.state.onSearch(event, ref);
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

	resolveOptionLabel(selectedOption) {
		if (!selectedOption) return "";
		if (!this.state.optionMap || !this.state.optionMap.label) {
			return selectedOption.label ? selectedOption.label : "";
		}
		if (this.state.optionMap.label.indexOf('{') < 0) {
			return selectedOption[this.state.optionMap.label];
		}
		return ObjUtils.expandStringTemplate(selectedOption, this.state.optionMap.label);
	}

	resolveOptionIcon(selectedOption) {
		if (!selectedOption) return null;
		let icon = selectedOption.icon;
		if (this.state.optionMap && this.state.optionMap.icon) {
			icon = selectedOption[this.state.optionMap.icon];
		}
		return selectedOption ? (typeof icon === "string" ? <img src={icon}></img> : icon) : null;
	}

	selectOption(e, index, option) {
		this.setState({ selectedOptionIndex: index });
		if (index === -1) return;
		if (this.state.onSelectOption) this.state.onSelectOption({ event, option: this.state.options[index] });
		this.state.inputTextRef.current.getInternalElement().current.value = this.resolveOptionLabel(option);
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
			(this.state.scheme ? `${this.state.scheme}-scrollpanel` : null), 
			this.state.popoverProps.inputClassName);
		const listItems = [];
		if (this.state.options) {
			this.state.options.forEach((option, index) => {
				const isSelected = index === this.state.selectedOptionIndex;
				const className = classNames((this.state.scheme && isSelected ? this.state.scheme : null),
					(this.state.scheme && this.state.selectable ? `${this.state.scheme}-bg-hover` : null), {
					'default-style': !this.state.scheme
				}, option.className);
				const optionElement = this.state.optionTemplate ? this.state.optionTemplate(option) : this.buildSingleOption(option);
				listItems.push(<li aria-label={option.label} role="option" 
					aria-selected={isSelected} className={className} onClick={(e) => {
						if (!this.state.selectable) return;
						this.selectOption(e, index, option)
					}}>
						{optionElement}
				</li>);
			});
		}
		this.state.popoverProps.matchTargetSize = this.state.matchTargetSize;

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

	expandStringTemplate() {

	}

	render() {
		const selectedOption = this.getSelectedOption();
		const relayProps = ObjUtils.findDiffKeys(this.state, DropdownComponent.defaultProps);
		relayProps.className = classNames('r-r-dropdown-inputtext-panel', this.state.className, relayProps.className);
		relayProps.inputClassName = classNames('r-r-dropdown-inputtext', {
			'r-r-cursor-pointer': !this.state.editable,
		}, relayProps.inputClassName);
		relayProps.leftIcon = this.resolveOptionIcon(selectedOption);
		relayProps.defaultValue = this.resolveOptionLabel(selectedOption);
		relayProps.style = { ...this.state.style, ...relayProps.style};
		relayProps.onKeyDown = this.onInputTextKeyDown;
		relayProps.onInput = this.onInputTextInput;
		const popover = this.buildPopover();

		return (
			<React.Fragment>
				<InputText compoundRef={(el) => this.compoundRef = el} scheme={this.state.scheme} readOnly={!this.state.editable} {...relayProps} 
					onSetState={this.onInputTextStateChange}
					ref={this.state.inputTextRef} rightIcon={this.state.toggleIcon} onClick={(e) => {
						this.togglePopover(e, false);
					}}/>
				{popover}
			</React.Fragment>
		);
	}

}

export const Dropdown = React.forwardRef((props, ref) => <DropdownComponent {...props} forwardRef={ref} />);

