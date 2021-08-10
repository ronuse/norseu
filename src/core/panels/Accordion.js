
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
import { BoolUtils, DOMUtils, ObjUtils } from "../../utils";
import { Orientation, Scheme, Alignment } from "../variables/";
import { Button } from "../buttons";
import { Panel } from "./Panel"
import { rrFireAfterPageloadComplete } from "../../sensors"
import { CSSTransition } from 'react-transition-group';


export class AccordionPanel extends Component {

	static defaultProps = {
		id: null,
		style: null,
		className: null,
		header: null,
		disabled: false,
		scheme: null,
		contentClassName: null,
		headerClassName: null,
		contentStyle: null,
		headerStyle: null,
		noicon: false,
		nonCollapsible: false,
		noheader: false,
		nodivier: false,
		ref: null
	}

	static propTypes = {
		id: PropTypes.string,
		style: PropTypes.object,
		className: PropTypes.string,
		header: PropTypes.string,
		disabled: PropTypes.bool,
		scheme: PropTypes.string,
		contentClassName: PropTypes.string,
		headerClassName: PropTypes.string,
		contentStyle: PropTypes.object,
		headerStyle: PropTypes.object,
		noicon: PropTypes.bool,
		nonCollapsible: PropTypes.bool,
		noheader: PropTypes.bool,
		nodivier: PropTypes.bool,
		ref: PropTypes.any
	}

}

class AccordionComponent extends Component {

	static defaultProps = {
		id: null,
		style: null,
		className: null,
		collapseIcon: 'fa-angle-down',
		expandIcon: 'fa-angle-right',
		safely: null,
		activeIndex: 0,
		alwaysRenderAllPanel: false,
		multiple: false,
		onTabCollapse: null,
		onTabExpand: null,
		onTabChange: null,
		borderless: false,
		elevation: null,
		forwardRef: null
	}

	static propTypes = {
		id: PropTypes.string,
		style: PropTypes.object,
		className: PropTypes.string,
		collapseIcon: PropTypes.string,
		expandIcon: PropTypes.string,
		safely: PropTypes.bool,
		activeIndex: PropTypes.any,
		alwaysRenderAllPanel: PropTypes.bool,
		multiple: PropTypes.bool,
		onTabCollapse: PropTypes.func,
		onTabExpand: PropTypes.func,
		onTabChange: PropTypes.func,
		borderless: PropTypes.bool,
		elevation: PropTypes.string,
		forwardRef: PropTypes.any
	}

	constructor(props) {
		super(props);
		if (!this.props.onTabChange) {
			this.state = {
				activeIndex: this.props.activeIndex
			};
		}

		this.id = this.props.id || DOMUtils.UniqueElementId();
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

	isActiveIndex(index) {
		const activeIndex = this.props.onTabChange ? this.props.activeIndex : this.state.activeIndex;
		return (this.props.multiple || Array.isArray(activeIndex)) ? (activeIndex && activeIndex.indexOf(index) >= 0) : activeIndex === index;
	}

	onPanelHeaderClick(component, event, panel, index) {
		if (!panel.props.disabled) {
			const isToggled = component.isActiveIndex(index);
			let newActiveIndex = null;

			if(component.props.multiple) {
				let indexes = (component.props.onTabChange ? component.props.activeIndex : component.state.activeIndex) || [];
				if (isToggled) {
					indexes = indexes.filter(i => i !== index);
				} else {
					indexes = [...indexes, index];
				}
				newActiveIndex = indexes;
			} else {
				newActiveIndex = isToggled ? null : index;
			}

			let callback = isToggled ? component.props.onTabCollapse : component.props.onTabExpand;
			if (callback) {
				callback({event: event, index: index});
			}
			if (component.props.onTabChange) {
				component.props.onTabChange({
					event: event,
					index: newActiveIndex
				})
			} else {
				component.setState({
					activeIndex: newActiveIndex
				});
			}
		}
	}

	renderAccordionPanelHeader(panel, index, childrenCount, isToggled) {
		const ariaControls = `${this.id}-content-${index}`;
		const id = `${this.id}-header-${index}`;
		const scheme = (panel.props.scheme ? panel.props.scheme : this.props.scheme);
		const className = classNames('r-r-accordion-tab-header', panel.props.headerClassName, scheme,
			(panel.props.scheme) ? `${scheme}-border-1px-hover` : null,
			(panel.props.scheme) ? `${scheme}-border-3px-focus-box-shadow` : null, {
			'r-r-disabled': panel.props.disabled,
		});
		const arrowIcon = isToggled ? this.props.collapseIcon : this.props.expandIcon;

		return (
			<div className={className} style={panel.props.headerStyle} //href={`#${ariaControls}`}
				role="tab" aria-controls={ariaControls} aria-expanded={isToggled} id={id}
				onClick={(e)=> !panel.props.nonCollapsible ? this.onPanelHeaderClick(this, e, panel, index) : null}>
					{!panel.props.noicon ? <i className={`r-r-accordion-tab-header-icon fa ${arrowIcon}`}></i>: null}
					{panel.props.header}
			</div>
		)
	}

	renderAccordionPanelContent(panel, isToggled) {
		const renderPanel = isToggled || this.props.alwaysRenderAllPanel;
		if (!renderPanel) {
			//return null;
		}
		const scheme = (panel.props.scheme ? panel.props.scheme : this.props.scheme);
		const className = classNames('r-r-accordion-tab-panel', panel.props.contentClassName, {
			
		});
		return (
			<CSSTransition classNames="transition-dropdown" timeout={{enter: 500, exit: 450}} in={isToggled} unmountOnExit>
				<Panel safely={this.props.safely} scheme={scheme} className={className} style={panel.props.contentStyle} borderless>
					{panel.props.children}
				</Panel>
			</CSSTransition>
		)
	}

	renderAccordionPanel(panel, index, childrenCount) {
		const isToggled = this.isActiveIndex(index);
		const panelContent = this.renderAccordionPanelContent(panel, isToggled);
		const panelHeader = !panel.props.noheader ? this.renderAccordionPanelHeader(panel, index, childrenCount, isToggled) : null;
		const className = classNames('r-r-accordion-tab', panel.props.className);
		const headerDivider = (index < childrenCount-1 || (isToggled)) && !panel.props.noheader && !panel.props.nodivier ? <hr className="r-r-accordion-divider"/> : null;
		const contentDivider = (isToggled && index < childrenCount-1) && !panel.props.nodivier ? <hr className="r-r-accordion-divider"/> : null;
		if (panel.props.forwardRef) {
			panel.props.forwardRef.current = {
				toggle: (e) => this.onPanelHeaderClick(this, e, panel, index)
			}
		}
		
		return (
			<div id={panel.props.id} className={className} style={panel.props.style}>
				{panelHeader}
				{headerDivider}

				{panelContent}
				{contentDivider}
			</div>
		)
	}

	renderAccordionPanels() {
		const childrenCount = this.props.children.length;
		return React.Children.map(this.props.children, (panel, index) => {
			if (panel.type !== AccordionPanel) {
				throw new Error("ronuse-react-ui.Accordion: Invalid child of Accordion component expecting AccordionPanel only, found '" + panel.type + "'");
			}
			return this.renderAccordionPanel(panel, index, childrenCount);
		});
	}

	render() {
		const className = classNames('r-r-accordion', this.props.elevation,  this.props.className, (this.props.scheme) ? `${this.props.scheme}-border-1px` : null, {
			'r-r-no-border' : this.props.borderless
		});
		const content = this.renderAccordionPanels(); 

		return (
			<div ref={this.elementRef} id={this.props.id} className={className} style={this.props.style}>
				{content}
			</div>
		)
	}

}

export const Accordion = React.forwardRef((props, ref) => <AccordionComponent {...props} forwardRef={ref} />);
