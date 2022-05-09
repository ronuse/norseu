
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
import { BaseComponent } from "../BaseComponent";
import { ObjUtils, BoolUtils } from "../../utils";
import { Scheme, Alignment } from "../variables/";

class ButtonComponent extends BaseComponent {

	static defaultProps = {
		text: null,
		alignText: Alignment.CENTER,
		icon: null,
		alignIcon: Alignment.LEFT,
		rightIcon: null,
		tooltip: null,
		tooltipProps: null,
		scheme: null,
		link: null,
		raised: null,
		rounded: null,
		borderless: null,
		textonly: null,
		outlined: null,
		fill: false,
		nostyle: false,
		fillIcon: null,
		fillOnHover: false
	}

	static propTypes = {
		text: PropTypes.string,
		alignText: PropTypes.string,
		icon: PropTypes.any,
		alignIcon: PropTypes.string,
		rightIcon: PropTypes.any,
		tooltip: PropTypes.string,
		tooltipProps: PropTypes.object,
		scheme: PropTypes.string,
		link: PropTypes.bool,
		raised: PropTypes.bool,
		rounded: PropTypes.bool,
		borderless: PropTypes.bool,
		textonly: PropTypes.bool,
		outlined: PropTypes.bool,
		fill: PropTypes.bool,
		nostyle: PropTypes.bool,
		fillIcon: PropTypes.bool,
		fillOnHover: PropTypes.bool
	}

	constructor(props) {
		super(props);

        this.onButtonClick = this.onButtonClick.bind(this);
	}

	componentWillUnmount() {

	}

	renderIcon() {
		if (!this.state.icon || this.state.scheme == Scheme.SKELETON) {
			return null;
		}

		let isString = BoolUtils.isTypeOfAny(this.state.icon, ["string"]);
		if (!isString && !React.isValidElement(this.state.icon)) {
			throw new Error("Only string or a valid react element is expected as the checkbox label");
		}
		let className = classNames('norseu-button-icon', isString ? this.state.icon : this.state.icon.props.className, {
			'norseu-float-center': this.state.alignIcon === Alignment.CENTER,
			'norseu-margin-right-15px': this.state.rightIcon && (BoolUtils.equalsAny(this.state.alignIcon, [ Alignment.RIGHT, Alignment.TOP_RIGHT, Alignment.BOTTOM_RIGHT]) || 
									BoolUtils.equalsAny(this.state.alignText, [ Alignment.RIGHT, Alignment.TOP_RIGHT, Alignment.BOTTOM_RIGHT])),
			'norseu-float-left': this.state.alignIcon === Alignment.LEFT,
			'norseu-float-right': this.state.alignIcon === Alignment.RIGHT,
			'norseu-width-100-percent': this.state.fillIcon
		});
		if (!isString) {
			var relayProps = ObjUtils.clone(this.state.icon.props);
			className = classNames(className, relayProps.className);
			relayProps.className = className;
			if (!relayProps.key) relayProps.key = "button-left-icon";
			return React.cloneElement(this.state.icon, relayProps);
		}
		return <i key={"button-left-icon"} className={className}></i>;
	}

	renderRightIcon() {
		if (!this.state.rightIcon || this.state.scheme == Scheme.SKELETON) {
			return null;
		}

		let isString = BoolUtils.isTypeOfAny(this.state.rightIcon, ["string"]);
		if (!isString && !React.isValidElement(this.state.rightIcon)) {
			return null;
		}
		let className = classNames('norseu-button-icon', isString ? this.state.rightIcon : this.state.rightIcon.props.className, {
			'norseu-float-right': this.state.fill
		});
		if (!isString) {
			var relayProps = ObjUtils.clone(this.state.rightIcon.props);
			relayProps.className = className;
			if (!relayProps.key) relayProps.key = "button-right-icon";
			return React.cloneElement(this.state.rightIcon, relayProps);
		}
		return <i key={"button-right-icon"} className={className}></i>;
	}

	renderText() {
		if (!this.state.text || this.state.scheme == Scheme.SKELETON) {
			return null;
		}

		let className = classNames({
			'norseu-float-center': this.state.alignText === Alignment.CENTER,
			'norseu-margin-left-15px': this.state.icon && BoolUtils.equalsAny(this.state.alignIcon, [ Alignment.LEFT, Alignment.CENTER, Alignment.TOP_LEFT, Alignment.BOTTOM_LEFT ]),
			'norseu-margin-right-15px': (this.state.icon && BoolUtils.equalsAny(this.state.alignIcon, [ Alignment.RIGHT, Alignment.TOP_RIGHT, Alignment.BOTTOM_RIGHT]) || this.state.rightIcon),
			'norseu-float-left': this.state.alignText === Alignment.LEFT,
			'norseu-float-right': this.state.alignText === Alignment.RIGHT
		})
		return <span key={"button-text"} className={className}>{this.state.text}</span>;
	}

	render() {
		let className = classNames(
			(this.state.scheme && !this.state.textonly && !this.state.outlined && !this.state.link) ? `${this.state.scheme}` : null, 
			(this.state.scheme && this.state.outlined) ? `${this.state.scheme}-border-1px` : null,
			(this.state.scheme && this.state.outlined && this.state.fillOnHover) ? `${this.state.scheme}-bg-hover` : null,
			(this.state.scheme && this.state.outlined && !this.state.textonly) ? `${this.state.scheme}-border-1px-bg-hover` : null,
			(this.state.scheme && (this.state.outlined || this.state.textonly || this.state.link)) ? `${this.state.scheme}-text` : null,
			(this.state.scheme && (!this.state.nostyle && this.state.scheme)) ? `${this.state.scheme}-border-3px-focus-box-shadow` : null, {
			'norseu-button': !this.state.nostyle,
			'norseu-button-vertical': BoolUtils.equalsAny(this.state.alignIcon, [Alignment.TOP, Alignment.BOTTOM]) && this.text,
			'norseu-disabled': !this.state.nostyle && this.state.disabled,
			'norseu-padding-left-right-20px': this.state.text,
			'norseu-width-100-percent norseu-display-block': this.state.fill,
			'norseu-button-rounded-border': !this.state.nostyle && this.state.rounded,
			'norseu-button-raised-border': !this.state.nostyle && this.state.raised,
			'norseu-button-textonly': !this.state.nostyle && (this.state.textonly || this.state.outlined),
			'norseu-no-background': !this.state.nostyle && (this.state.outlined || this.state.link),
			'norseu-no-box-shadow-active norseu-text-decoration-underline-hover': !this.state.nostyle && this.state.link,
			'norseu-no-border': !this.state.nostyle && (this.state.borderless || (this.state.textonly && !this.state.outlined) || this.state.link),
			
			'norseu-button-min-size norseu-skeleton': this.state.scheme === Scheme.SKELETON /*&& !(this.state.icon || this.state.rightIcon)*/,
			'norseu-button-min-size-icon-only norseu-skeleton': this.state.scheme === Scheme.SKELETON && (this.state.icon || this.state.rightIcon) && !this.state.text,

			'norseu-stateless': BoolUtils.equalsAny(this.state.scheme, [Scheme.STATELESS, Scheme.SKELETON]) && !this.state.link,
			'norseu-padding-0px': this.state.fillIcon
		}, 'norseu-button-theme', this.state.className);
		let icon = this.renderIcon();
		let rightIcon = this.renderRightIcon();
		let text = this.renderText();
		let iconPreText = BoolUtils.equalsAny(this.state.alignIcon, [ Alignment.CENTER, Alignment.LEFT, Alignment.TOP_LEFT, Alignment.BOTTOM_LEFT ]) ;
		let rightIconPreText = this.state.rightIcon && this.state.fill && this.state.rightIcon.indexOf('float-none') === -1 ;
		let componentProps = ObjUtils.findDiffKeys(this.state, ButtonComponent.defaultProps);
		if (!componentProps.children) {
			componentProps.children = [];
		}
		componentProps.children.push(iconPreText ? icon : '');
		componentProps.children.push(rightIconPreText ? rightIcon : '');
		componentProps.children.push(text);
		componentProps.children.push(iconPreText ? '' : icon);
		componentProps.children.push(rightIconPreText ? '' : rightIcon);

		let element = this.state.link || this.state.href ? <a ref={this.elementRef} {...this.state.eventProps} {...componentProps} className={className}/>
					  : <button ref={this.elementRef} {...this.state.eventProps} {...componentProps} className={className} onClick={this.onButtonClick}/>

		return element;
	}

	onButtonClick(event) {
		event.rruiRef = { current: this.getRefValue({}) };
		if (this.state.eventProps.onClick) this.state.eventProps.onClick(event);
	}

}

export const Button = React.forwardRef((props, ref) => <ButtonComponent {...props} forwardRef={ref} />);