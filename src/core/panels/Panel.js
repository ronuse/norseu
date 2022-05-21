
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
import { Scheme } from "../variables";
import { BoolUtils, ObjUtils, DOMUtils } from "../../utils";
import { Elevation } from "../variables/";
import { CSSTransition } from 'react-transition-group';
import { TabPane } from "./TabPane";
import { Checkbox } from '../form';
import { BaseComponent } from '../BaseComponent';

export class Panel extends BaseComponent {

	static defaultProps = {
		id: null,
		title: null,
		scheme: null,
		safely: null,
		collapsible: null,
		expanded: null,
		borderless: null,
		expandIcon: "fa fa-plus",
		collapseIcon: "fa fa-minus",
		contentClassName: null,
		headerClassName: null,
		contentStyle: null,
		headerStyle: null,
		onCollapse: null,
		contentRef: null,
		headerRef: null,
		onExpand: null,
		onToggle: null,
		isForm: false,
		onSubmit: null,
		elevation: Elevation.NONE,
		exemptedComponents: [],
		ignoreChildrenOf: [
			"select",
			"span",
			"p"
		]
	}

	static propTypes = {
		id: PropTypes.string,
		title: PropTypes.any,
		scheme: PropTypes.string,
		safely: PropTypes.bool,
		collapsible: PropTypes.bool,
		expanded: PropTypes.bool,
		borderless: PropTypes.bool,
		expandIcon: PropTypes.string,
		collapseIcon: PropTypes.string,
		contentClassName: PropTypes.string,
		headerClassName: PropTypes.string,
		contentStyle: PropTypes.object,
		headerStyle: PropTypes.object,
		onCollapse: PropTypes.func,
		contentRef: PropTypes.any,
		headerRef: PropTypes.any,
		onExpand: PropTypes.func,
		onToggle: PropTypes.func,
		isForm: PropTypes.bool,
		onSubmit: PropTypes.func,
		elevation: PropTypes.string,
		exemptedComponents: PropTypes.arrayOf(Component),
		ignoreChildrenOf: PropTypes.array
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

	resolveForwardRef(extraValues) {
		super.resolveForwardRef({
			toggle: this.toggle,
			getContentRef: () => this.props.contentRef,
			getHeaderRef: () => this.props.headerRef
		});
	}

	componentWillUnmount() {

	}

	isExpanded() {
		return this.props.collapsible ? (this.props.onToggle ? this.props.expanded : this.state.expanded) : true;
	}

	renderHeader(expanded) {
		if (this.props.title || this.props.collapsible) {
			const toggleIcon = expanded ? this.props.collapseIcon : this.props.expandIcon;
			let className = classNames('norseu-panel-header-text', {
				'norseu-skeleton': this.props.scheme === Scheme.SKELETON
			}, this.props.headerClassName);

			return (
				<div ref={this.props.headerRef} className="norseu-panel-header">
					<span className={className} aria-label={this.id + '-header'} style={this.props.headerStyle}>{this.props.title}</span>
					{this.props.collapsible ? <Button scheme={this.props.scheme} rounded textOnly icon={toggleIcon} onClick={this.toggle} className="norseu-panel-toggle-button" /> : ''}
					
				</div>
			);
		}
	}

	getWithChildrenSkeletonAdded(element, skeletonize) {
		if (!this.props.safely && (element.props && element.props.children) && !skeletonize) {
			let isPanelComponent = BoolUtils.equalsAny(element.type, [Panel, TabPane, Checkbox]);
			let subChildren = isPanelComponent ? element.props.children : React.Children.map(element.props.children, child => {
				if (React.isValidElement(child)) {
					let skeletonize = BoolUtils.equalsAny(child.type, this.props.ignoreChildrenOf);
					child = this.getWithChildrenSkeletonAdded(child, skeletonize);
					var childRelayProps = ObjUtils.clone(child.props);
					childRelayProps.className = classNames(childRelayProps.className, {
						'norseu-skeleton': !child.props.children || skeletonize
					});
					childRelayProps.scheme = Scheme.SKELETON;
					return React.cloneElement(child, childRelayProps);
				}
				return <span className={'norseu-skeleton'}>{child}</span>;
			});
			var subRelayProps = ObjUtils.clone(element.props);
			subRelayProps.children = subChildren;
			if (isPanelComponent) {
				subRelayProps.scheme = Scheme.SKELETON;
			}
			return React.cloneElement(element, subRelayProps);
		}
		return element;
	}

	renderContent(expanded) {
		const id = this.id + '-content';
		let children = this.props.children.length === 0 || this.props.scheme != Scheme.SKELETON ? 
						this.props.children : 
						React.Children.map(this.props.children, child => {

			let isExemptedComponent = BoolUtils.equalsAny(child.type, this.props.exemptedComponents);
			if (isExemptedComponent || (!child.type && this.props.safely)) {
				return child;
			}
			let skeletonize = BoolUtils.equalsAny(child.type, this.props.ignoreChildrenOf);
			child = this.getWithChildrenSkeletonAdded(child, skeletonize);
			let isPanelComponent = BoolUtils.equalsAny(child.type, [Panel, TabPane, Checkbox]);
			var relayProps = ObjUtils.clone(child.props);
			relayProps.className = classNames('norseu-overflow-hidden', {
										"norseu-skeleton" : (!isPanelComponent && (!child.props || !child.props.children)) || skeletonize
									}, relayProps.className);
			relayProps.scheme = this.props.scheme;
			if (isPanelComponent) {
				relayProps.safely = this.props.safely;
				relayProps.exemptedComponents = this.props.exemptedComponents;
			}
			if (React.isValidElement(child) && child.props.scheme !== undefined && this.props.safely) {
				return React.cloneElement(child, relayProps);

			}
			if (!this.props.safely) {
				if (React.isValidElement(child)) {
					return React.cloneElement(child, relayProps);
				}
				return null;

			}
			return child;
		});
		let className = classNames('norseu-panel-content', this.props.contentClassName);
		const contentElement =  this.props.isForm  
			? (<form ref={this.props.contentRef} onSubmit={this.props.onSubmit} className={className} aria-hidden={!expanded} role="region" id={id} aria-labelledby={this.id + '-header'} 
					style={this.props.contentStyle}>
					{children}
				</form>)
			: (<div ref={this.props.contentRef} className={className} aria-hidden={!expanded} role="region" id={id} aria-labelledby={this.id + '-header'} style={this.props.contentStyle}>
					{children}
				</div>)
		
		return (
			<CSSTransition classNames="transition-dropdown" timeout={{enter: 500, exit: 450}} in={expanded} unmountOnExit>
				{contentElement}
			</CSSTransition>
		);
	}

	render() {
		let className = classNames('norseu-panel', this.props.elevation, {
			'norseu-border-1px-radius-5px': !this.props.borderless,
			'r-panel-collapsible': this.props.collapsible
		}, this.props.className);
		let expanded = !this.props.children ? false : this.isExpanded();
		let header = this.renderHeader(expanded);
		let content = !this.props.children ? '' : this.renderContent(expanded);

		return (
			<div ref={this.elementRef} id={this.props.id} className={className} style={this.props.style}>
				{header}
				{content}
			</div>
		)
	}

}
