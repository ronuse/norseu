
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
import { Elevation } from "../variables/";
import { CSSTransition } from 'react-transition-group';
import { TabPane } from "./TabPane";

export class Fieldset extends Component {

	static defaultProps = {
		id: null,
		legend: null,
		scheme: null,
		safely: null,
		collapsible: null,
		expanded: null,
		borderless: null,
		expandIcon: "fa fa-plus",
		collapseIcon: "fa fa-minus",
		contentClassName: null,
		onCollapse: null,
		onExpand: null,
		onToggle: null,
		elevation: Elevation.NONE
	}

	static propTypes = {
		id: PropTypes.string,
		legend: PropTypes.string,
		scheme: PropTypes.string,
		safely: PropTypes.bool,
		collapsible: PropTypes.bool,
		expanded: PropTypes.bool,
		borderless: PropTypes.bool,
		expandIcon: PropTypes.string,
		collapseIcon: PropTypes.string,
		contentClassName: PropTypes.string,
		onCollapse: PropTypes.func,
		onExpand: PropTypes.func,
		onToggle: PropTypes.func,
		elevation: PropTypes.string,
	}

	constructor(props) {
		super(props);
		if (!this.props.onToggle) {
			this.state = {
				expanded: this.props.expanded
			};
		}

		this.toggle = this.toggle.bind(this);
		this.id = this.props.id || DOMUtils.UniqueElementId();
	}

	toggle(event) {
		if (this.props.collapsible) {
			const expanded = this.props.onToggle ? this.props.expanded : this.state.expanded;

			if (expanded) {
				if (!this.props.onToggle) {
					this.setState({expanded: false});
				}
				if (this.props.onCollapse) {
					this.props.onCollapse(event);
				}
			} else {
				if (!this.props.onToggle) {
					this.setState({expanded: true});
				}		
				if (this.props.onExpand) {
					this.props.onExpand(event);
				}
			}

			if (this.props.onToggle) {
				this.props.onToggle({
					event: event,
					value: !expanded
				});
			}
		}

		event.preventDefault();
	}

	componentDidMount() {

	}

	componentDidUpdate(prevProps) {

	}

	componentWillUnmount() {

	}

	isExpanded() {
		return this.props.collapsible ? (this.props.onToggle ? this.props.expanded : this.state.expanded) : true;
	}

	renderLengend(expanded) {
		if (!this.props.legend && !this.props.collapsible) {
			return
		}

		let isString = BoolUtils.isTypeOfAny(this.props.legend, ["string"]);
		if (!isString && !React.isValidElement(this.props.legend)) {
			return null;
		}

		const toggleIcon = (this.props.collapsible ? (expanded ? this.props.collapseIcon : this.props.expandIcon) : null);
		let className = classNames('r-r-fieldset-legend', {
			'r-r-skeleton': this.props.scheme === Scheme.SKELETON,
			'r-r-noselect r-r-no-pointer-event': !this.props.collapsible
		}, this.props.headerClassName);
		if (!isString) {
			var relayProps = ObjUtils.clone(this.props.legend.props);
			relayProps.className = className;
			relayProps.scheme = this.props.scheme === Scheme.SKELETON ? this.props.scheme : relayProps.scheme;
			relayProps.onClick = this.toggle;
			return <legend>{React.cloneElement(this.props.legend, relayProps)}</legend>;
		}
		return (
			<legend>
				<Button onClick={this.toggle} scheme={this.props.scheme} className={className} icon={toggleIcon} text={this.props.legend}/>
			</legend>
		);
	}

	renderContent(expanded) {
		const id = this.id + '-panel';
		let className = classNames('r-r-fieldset-content', this.props.contentClassName);

		return (
			<CSSTransition classNames="transition-dropdown" timeout={{enter: 500, exit: 450}} in={expanded} unmountOnExit>
				<Panel safely={this.props.safely} scheme={this.props.scheme} className={className} id={id} borderless>
					{this.props.children}
				</Panel>
			</CSSTransition>
		)
	}

	render() {
		let expanded = !this.props.children ? false : this.isExpanded();
		let className = classNames('r-r-fieldset', this.props.elevation, 
			((this.props.scheme && !this.props.borderless)? `${this.props.scheme}-border-1px` : null), {
			'r-panel-collapsible': this.props.collapsible,
		}, this.props.className);
		let legend = this.renderLengend(expanded);
		let content = !this.props.children ? '' : this.renderContent(expanded);

		return (
			<fieldset id={this.props.id} className={className} style={this.props.style}>
				{legend}
				{content}
			</fieldset>
		)
	}

}

