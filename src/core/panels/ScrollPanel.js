
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
import { Button } from "../buttons";
import { Panel } from "./Panel"
import { Scheme } from "../variables";
import { BoolUtils, ObjUtils, DOMUtils } from "../../utils";
import { Elevation } from "../variables";
import { CSSTransition } from 'react-transition-group';

export class ScrollPanelComponent extends Component {

	static defaultProps = {
		scheme: null,
		elevation: null,
		className: null,
		alwaysScroll: false,
		alwaysScrollX: false,
		alwaysScrollY: false,
		hideScrollBars: false,
		hideScrollBarX: false,
		hideScrollBarY: false,
		isForm: false,
		onSubmit: null,
		forwardRef: null
	}

	static propTypes = {
		scheme: PropTypes.string,
		elevation: PropTypes.string,
		className: PropTypes.string,
		alwaysScroll: PropTypes.bool,
		alwaysScrollX: PropTypes.bool,
		alwaysScrollY: PropTypes.bool,
		hideScrollBars: PropTypes.bool,
		hideScrollBarX: PropTypes.bool,
		hideScrollBarY: PropTypes.bool,
		isForm: PropTypes.bool,
		onSubmit: PropTypes.func,
		forwardRef: PropTypes.any
	}

	constructor(props) {
		super(props);
		this.elementRef = React.createRef(this.props.forwardRef);
	}

	resolveForwardRef() {
		let ref = this.props.forwardRef;
		if (ref) {
			if (typeof ref === 'function') {
				ref(this.elementRef.current);
			} else {
				ref.current = this.elementRef.current;
			}
		}
	}

	componentDidMount() {
		this.resolveForwardRef();
	}

	componentDidUpdate(prevProps) {

	}

	componentWillUnmount() {

	}

	render() {
		let componentProps = ObjUtils.findDiffKeys(this.props, ScrollPanelComponent.defaultProps);
		let className = classNames('norseu-scrollpanel', (this.props.scheme ? `${this.props.scheme}-scrollpanel` : null), this.props.elevation, {
			'norseu-skeleton': this.props.scheme === Scheme.SKELETON,
			'norseu-scrollpanel-always-show-scrollbars': this.props.alwaysScroll,
			'norseu-scrollpanel-always-show-scrollbar-x': this.props.alwaysScrollX,
			'norseu-scrollpanel-always-show-scrollbar-y': this.props.alwaysScrollY,
			'norseu-scrollpanel-hidden-scrollbar-x': this.props.hideScrollBars || this.props.hideScrollBarX,
			'norseu-scrollpanel-hidden-scrollbar-y': this.props.hideScrollBars || this.props.hideScrollBarY
		}, this.props.className);

		return (this.props.isForm
			? <form ref={this.elementRef} className={className} {...componentProps} onSubmit={this.props.onSubmit}/>
			: <div ref={this.elementRef} className={className} {...componentProps} />
		)
	}

}

export const ScrollPanel = React.forwardRef((props, ref) => <ScrollPanelComponent {...props} forwardRef={ref} />);
