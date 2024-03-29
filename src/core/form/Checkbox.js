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
import { DOMUtils, BoolUtils, ObjUtils } from "../../utils";

class CheckboxComponent extends BaseComponent {

	static defaultProps = {
		scheme: null,
		label: null,
		id: null,
		name: null,
		required: false,
		align: Alignment.LEFT,
		checkStates: [
			{
				value: "un-checked",
				icon: null,
				scheme: null,
				checked: false
			},
			{
				value: "checked",
				icon: "fa fa-check",
				scheme: null,
				checked: true
			}
		],
		checked: false,
		checkedIndex: -1,
		style: null,
		className: null,
		disabled: false,
		readOnly: false,
		nostyle: false,
		selfManaged: false,
		onChange: null,
		onMouseDown: null
	}

	static propTypes = {
		scheme: PropTypes.string,
		label: PropTypes.any,
		id: PropTypes.string,
		name: PropTypes.string,
		required: PropTypes.bool,
		align: PropTypes.string,
		checkStates: PropTypes.array,
		checked: PropTypes.bool,
		checkedIndex: PropTypes.number,
		style: PropTypes.object,
		className: PropTypes.string,
		disabled: PropTypes.bool,
		readOnly: PropTypes.bool,
		nostyle: PropTypes.bool,
		selfManaged: PropTypes.bool,
		onChange: PropTypes.func,
		onMouseDown: PropTypes.func
	}

	constructor(props) {
		super(props);

		this.boxRef = React.createRef(null);
		this.id = this.state.id; 
		if (!this.id) { 
			this.id = DOMUtils.UniqueElementId();
		}
	}

	resolveForwardRef(extraValues) {
		super.resolveForwardRef({
			value: () => this.state.checkedIndex > -1 && this.state.checkStates[this.state.checkedIndex].checked,
			focus: () => {
				if (this.boxRef) {
					this.boxRef.current.focus()
				};
			}
		});
	}

	componentWillReceiveProps(nextProps) {
		if (this.state.selfManaged) {
			super.componentWillReceiveProps(nextProps);
			return;
		}
		let _nextProps = ObjUtils.clone(nextProps, [ "checkedIndex" ]);
		this.setState(_nextProps);
	}

	onChange(event, checkedIndex) {
		checkedIndex += 1;
		const checkStatesSize = this.state.checkStates.length;
		if (checkedIndex >= checkStatesSize) {
			checkedIndex = 0;
		}
		if (!this.state.selfManaged) {
			this.state.checkedIndex = checkedIndex;
			this.setState({
				checkedIndex: checkedIndex
			});
			if (this.elementRef.current && checkStatesSize > 0) {
				this.elementRef.current.checked = this.state.checkStates[checkedIndex].checked;
			}
		}
		let checkState = this.state.checkStates[checkedIndex] ;
		if (this.state.onChange) {
			this.state.onChange({
				event: event,
				checked: checkState.checked,
				value: checkState.value,
				checkedIndex: checkedIndex,
				ref: this.state.forwardRef
			});
		}
	}

	renderInput(checked) {
		if (!this.state.name) {
			return;
		}

		let element = <input type="checkbox"
			ref={this.elementRef}
			id={this.id} 
			name={this.state.name} 
			required={this.state.required}
			disabled={this.state.readOnly}
			defaultChecked={checked.checked}
			{...this.state.eventProps}
		/>;
		return element;
	}

	renderBox(checkedIndex, checked) {
		let scheme = checked.scheme || this.state.scheme;
		let className = classNames(
			(scheme && checked.icon) ? `${scheme} ${scheme}-border-2px` : null,
			(scheme && !checked.icon) ? `${scheme}-border-hover` : null, 
			(scheme && this.state.scheme ? `${scheme}-border-2px-focus ${scheme}-border-3px-focus-box-shadow` : null), {
			'norseu-skeleton': this.state.scheme === Scheme.SKELETON,
			'norseu-checkbox-box': !this.state.nostyle,
			'norseu-m-right-10px': BoolUtils.equalsAny(this.state.align, [Alignment.LEFT, Alignment.CENTER]),
			'norseu-m-left-10px': BoolUtils.equalsAny(this.state.align, [Alignment.RIGHT]),
			'norseu-m-bottom-10px': BoolUtils.equalsAny(this.state.align, [Alignment.TOP, Alignment.TOP_LEFT, Alignment.TOP_CENTER, Alignment.TOP_RIGHT]),
			'norseu-m-top-10px': BoolUtils.equalsAny(this.state.align, [Alignment.BOTTOM, Alignment.BOTTOM_LEFT, Alignment.BOTTOM_CENTER, Alignment.BOTTOM_RIGHT]),
			'norseu-align-self-center': this.state.align === Alignment.TOP_CENTER || this.state.align === Alignment.BOTTOM_CENTER,
			'norseu-align-self-flex-start': this.state.align === Alignment.TOP_LEFT || this.state.align === Alignment.BOTTOM_LEFT,
			'norseu-align-self-flex-end': this.state.align === Alignment.TOP_RIGHT || this.state.align === Alignment.BOTTOM_RIGHT
		});
		let icon = checked.icon ? <i className={checked.icon}/> : null;

		return (
			<div tabIndex="1" ref={this.boxRef} className={className} onClick={(e) => {
					this.onChange(e, checkedIndex, checked);
				}} onMouseDown={(e) => this.state.onMouseDown ? this.state.onMouseDown(e, this.state.forwardRef) : undefined} 
				aria-checked={checked.checked}>

				{icon}
			</div>
		)
	}

	renderLabel() {
		if (!this.state.label) {
			return;
		}
		let isString = BoolUtils.isTypeOfAny(this.state.label, ["string"]);
		if (!isString && !React.isValidElement(this.state.label)) {
			throw new Error("Only string or a valid react element is expected as the checkbox label");
		}

		let className = classNames({
			'norseu-skeleton': this.state.scheme === Scheme.SKELETON
		}, 'norseu-checkbox-label'); 
		if (isString) {
			return (
				<label className={className} htmlFor={this.id}>{this.state.label}</label>
			)
		}
		var relayProps = ObjUtils.clone(this.state.label.props);
		className = classNames(className, relayProps.className);
		relayProps.className = className;
		return React.cloneElement(this.state.label, relayProps);
	}

	getCheckStatesIndex() {
		const checkStatesSize = this.state.checkStates.length;
		let checkedIndex = this.state.checkedIndex;
		checkedIndex = checkedIndex == -1 ? (this.state.checked ? 1 : 0) : checkedIndex;
		if (checkedIndex >= checkStatesSize) {
			checkedIndex = 0;
		}
		return checkedIndex;
	}

	render() {
		let checkedIndex = this.getCheckStatesIndex();
		if (!this.state.checkedIndex) this.state.checkedIndex = checkedIndex;
		let checked = this.state.checkStates[checkedIndex] ;
		let className = classNames({
			'norseu-checkbox': !this.state.nostyle,
			'norseu-disabled norseu-noselect': !this.state.nostyle && this.state.disabled,
			'norseu-readOnly': !this.state.nostyle && this.state.readOnly,
			'norseu-flex-direction-row-reverse': !this.state.align.startsWith(Alignment.BOTTOM) && !this.state.align.startsWith(Alignment.TOP) && 
												BoolUtils.equalsAny(this.state.align, [Alignment.RIGHT]),
			'norseu-flex-direction-column': this.state.align.startsWith(Alignment.TOP),
			'norseu-flex-direction-column-reverse': this.state.align.startsWith(Alignment.BOTTOM)
		}, 'norseu-checkbox-theme', this.state.className);
		let input = this.renderInput(checked);
		let box = this.renderBox(checkedIndex, checked);
		let label = this.renderLabel();

		return (
			<div className={className} style={this.state.style}>
					{input}
					{box}
					{label}
				</div>
		)
	}

}

export const Checkbox = React.forwardRef((props, ref) => <CheckboxComponent forwardRef={ref} {...props} />);