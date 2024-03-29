
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
import { ObjUtils, BoolUtils } from "../../utils";
import { Scheme, Alignment } from "../variables";

export class Tag extends Component {

	static defaultProps = {
		text: null,
		alignText: Alignment.CENTER,
		icon: null,
		alignIcon: Alignment.LEFT,
		rightIcon: null,
		tooltip: null,
		tooltipProps: null,
		scheme: null,
		removable: null,
		removeIcon: 'fa fa-times',
		raised: null,
		rounded: null,
		borderless: null,
		textOnly: null,
		outlined: null,
		fill: false,
		nostyle: false,
		fillIcon: null
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
		removable: PropTypes.bool,
		removeIcon: PropTypes.string,
		raised: PropTypes.bool,
		rounded: PropTypes.bool,
		borderless: PropTypes.bool,
		textOnly: PropTypes.bool,
		outlined: PropTypes.bool,
		fill: PropTypes.bool,
		nostyle: PropTypes.bool,
		fillIcon: PropTypes.bool
	}

	componentDidMount() {

	}

	componentDidUpdate(prevProps) {

	}

	componentWillUnmount() {

	}

	removeComponent(event) {
		let target = event.target.parentNode;
		let targetParent = event.target.parentNode.parentNode;

		if (targetParent && target) {
			targetParent.removeChild(target);
		}
	}

	renderIcon() {
		if (!this.props.icon || this.props.scheme == Scheme.SKELETON) {
			return null;
		}

		let isString = BoolUtils.isTypeOfAny(this.props.icon, ["string"]);
		if (!isString && !React.isValidElement(this.props.icon)) {
			return null;
		}
		let className = classNames('norseu-tag-icon', isString ? this.props.icon : this.props.icon.props.className, {
			'norseu-float-center': this.props.alignIcon === Alignment.CENTER,
			'norseu-m-right-5px': this.props.rightIcon && (BoolUtils.equalsAny(this.props.alignIcon, [ Alignment.RIGHT, Alignment.TOP_RIGHT, Alignment.BOTTOM_RIGHT]) || 
									BoolUtils.equalsAny(this.props.alignText, [ Alignment.RIGHT, Alignment.TOP_RIGHT, Alignment.BOTTOM_RIGHT])),
			'norseu-float-left': this.props.alignIcon === Alignment.LEFT,
			'norseu-float-right': this.props.alignIcon === Alignment.RIGHT,
			'norseu-width-100-percent': this.props.fillIcon
		});
		if (!isString) {
			var relayProps = ObjUtils.clone(this.props.icon.props);
			relayProps.className = className;
			return React.cloneElement(this.props.icon, relayProps);
		}
		return <i className={className}></i>;
	}

	renderRightIcon() {
		if (!this.props.rightIcon || this.props.scheme == Scheme.SKELETON) {
			return null;
		}

		let isString = BoolUtils.isTypeOfAny(this.props.rightIcon, ["string"]);
		if (!isString && !React.isValidElement(this.props.rightIcon)) {
			return null;
		}
		let className = classNames('norseu-tag-icon', isString ? this.props.rightIcon : this.props.rightIcon.props.className, {
			'norseu-float-right': this.props.fill
		});
		if (!isString) {
			var relayProps = ObjUtils.clone(this.props.rightIcon.props);
			relayProps.className = className;
			return React.cloneElement(this.props.rightIcon, relayProps);
		}
		return <i className={className}></i>;
	}

	renderRemoveIcon() {
		if (!this.props.removeIcon || this.props.scheme == Scheme.SKELETON) {
			return null;
		}

		let isString = BoolUtils.isTypeOfAny(this.props.removeIcon, ["string"]);
		if (!isString && !React.isValidElement(this.props.removeIcon)) {
			return null;
		}
		let className = classNames('norseu-tag-icon norseu-tag-remove-icon', isString ? this.props.removeIcon : this.props.removeIcon.props.className);
		if (!isString) {
			var relayProps = ObjUtils.clone(this.props.removeIcon.props);
			relayProps.className = className;
			relayProps.onClick = this.removeComponent;
			return React.cloneElement(this.props.removeIcon, relayProps);
		}
		return <i className={className} onClick={this.removeComponent}/>;
	}

	renderText() {
		if (!this.props.text && this.props.scheme != Scheme.SKELETON) {
			return null;
		}

		let className = classNames({
			'norseu-float-center': this.props.alignText === Alignment.CENTER,
			'norseu-m-left-5px': this.props.icon && BoolUtils.equalsAny(this.props.alignIcon, [ Alignment.LEFT, Alignment.TOP_LEFT, Alignment.BOTTOM_LEFT ]),
			'norseu-m-right-5px': (this.props.icon && BoolUtils.equalsAny(this.props.alignIcon, [ Alignment.RIGHT, Alignment.TOP_RIGHT, Alignment.BOTTOM_RIGHT]) || this.props.rightIcon),
			'norseu-float-left': this.props.alignText === Alignment.LEFT,
			'norseu-float-right': this.props.alignText === Alignment.RIGHT
		})
		return <span className={className}>{this.props.scheme === Scheme.SKELETON ? "Ronuse Tag" : this.props.text}</span>;
	}

	render() {
		let className = classNames((this.props.scheme && (!this.props.textOnly && !this.props.outlined && !this.props.link)) ? `${this.props.scheme}`: null, 
			(this.props.scheme && (this.props.outlined)) ? `${this.props.scheme}-border-1px`: null,
			(this.props.scheme && (this.props.outlined && !this.props.textOnly)) ? `${this.props.scheme}-bg-hover`: null,
			(this.props.scheme && (this.props.outlined || this.props.textOnly || this.props.link)) ? `${this.props.scheme}-text`: null,
			(this.props.scheme && (!this.props.nostyle)) ? `${this.props.scheme}-border-3px-focus-box-shadow`: null, {
			'norseu-tag': !this.props.nostyle,
			'norseu-button-vertical': BoolUtils.equalsAny(this.props.alignIcon, [Alignment.TOP, Alignment.BOTTOM]) && this.text,
			'norseu-disabled': !this.props.nostyle && this.props.disabled,
			'norseu-p-left-right-20px': this.props.text,
			'norseu-width-100-percent norseu-display-block': this.props.fill,
			'norseu-button-rounded-border': !this.props.nostyle && this.props.rounded,
			'norseu-button-raised-border': !this.props.nostyle && this.props.raised,
			'norseu-button-textOnly': !this.props.nostyle && (this.props.textOnly || this.props.outlined),
			'norseu-no-background norseu-text-decoration-underline-hover': !this.props.nostyle && this.props.link,
			'norseu-no-border': !this.props.nostyle && (this.props.borderless || (this.props.textOnly && !this.props.outlined) || this.props.link),
			
			'norseu-tag-min-size norseu-skeleton': this.props.scheme === Scheme.SKELETON /*&& !(this.props.icon || this.props.rightIcon)*/,
			'norseu-tag-min-size-icon-only norseu-skeleton': this.props.scheme === Scheme.SKELETON && (this.props.icon || this.props.rightIcon) && !this.props.text,

			'norseu-stateless': BoolUtils.equalsAny(this.props.scheme, [Scheme.STATELESS, Scheme.SKELETON]) && !this.props.link,
			'norseu-p-0px': this.props.fillIcon
		}, 'norseu-button-theme', this.props.className);
		let icon = this.renderIcon();
		let rightIcon = this.renderRightIcon();
		let removeIcon = this.props.removable ? this.renderRemoveIcon() : null;
		let text = this.renderText();
		let iconPreText = BoolUtils.equalsAny(this.props.alignIcon, [ Alignment.LEFT, Alignment.TOP_LEFT, Alignment.BOTTOM_LEFT ]) ;
		let componentProps = ObjUtils.findDiffKeys(this.props, Tag.defaultProps);
		if (!componentProps.children) {
			componentProps.children = [];
		}
		componentProps.children.push(this.props.removable ? removeIcon : '');
		componentProps.children.push(iconPreText ? icon : '');
		componentProps.children.push(this.props.fill ? rightIcon : '');
		componentProps.children.push(text);
		componentProps.children.push(iconPreText ? '' : icon);
		componentProps.children.push(this.props.fill ? '' : rightIcon);

		let element = <span ref={(el) => this.element = el} {...componentProps} className={className}/>

		return element;
	}

}
