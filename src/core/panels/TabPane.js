
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
import { BoolUtils, DOMUtils } from "../../utils";
import { Orientation, Scheme, Alignment } from "../variables/";
import { Button } from "../buttons";
import { Panel } from "./Panel"


export class TabPanel extends Component {

	static defaultProps = {
		title: null,
		alignTitle: Alignment.CENTER,
		icon: null,
		alignIcon: Alignment.LEFT,
		disabled: false,
		rightIcon: null,
		scheme: null,
		contentClassName: null,
		headerClassName: null,
		contentStyle: null,
		headerStyle: null
	}

	static propTypes = {
		title: PropTypes.string,
		alignTitle: PropTypes.string,
		icon: PropTypes.string,
		alignIcon: PropTypes.string,
		disabled: PropTypes.bool,
		rightIcon: PropTypes.string,
		scheme: PropTypes.string,
		contentClassName: PropTypes.string,
		headerClassName: PropTypes.string,
		contentStyle: PropTypes.object,
		headerStyle: PropTypes.object
	}

}


export class TabPane extends Component {

	static defaultProps = {
		id: null,
		style: null,
		className: null,
		safely: null,
		alignNavigator: Alignment.TOP,
		activeTabIndex: 0,
		renderActiveTabOnly: false,
		onTabChange: null
	}

	static propTypes = {
		id: PropTypes.string,
		style: PropTypes.object,
		className: PropTypes.string,
		safely: PropTypes.bool,
		alignNavigator: PropTypes.string,
		activeTabIndex: PropTypes.number,
		renderActiveTabOnly: PropTypes.bool,
		onTabChange: PropTypes.func
	}

	constructor(props) {
		super(props);
		if (!this.props.onTabChange) {
			this.state = {
				activeTabIndex: this.props.activeTabIndex
			};
		}

		this.id = this.props.id || DOMUtils.UniqueElementId();
	}

	getActiveTabIndex() {
		return this.props.onTabChange ? this.props.activeTabIndex : this.state.activeTabIndex;
	}

	isSelectedTab(index) {
		return (index === this.getActiveTabIndex());
	}

	onTabHeaderClick(event, tab, index) {
		if (!tab.props.disabled) {
			if (this.props.onTabChange) {
				this.props.onTabChange({event: event, index: index});

			} else {
				this.setState({
					activeTabIndex: index
				});
				
			}
		}

		event.preventDefault();
	}

	renderTabHeader(tab, index) {
		if (this.props.scheme === Scheme.SKELETON) {
			return (
				<Button scheme={Scheme.SKELETON}/>
			)
		}

		const selectedTab = this.isSelectedTab(index);
		const id = this.id + '-header-' + index;
		const ariaControls = this.id + '-content-' + index;
		const tabIndex = tab.props.disabled ? null : '0';
		const fill = BoolUtils.equalsAny(this.props.alignNavigator, [Alignment.LEFT, Alignment.RIGHT]) ? true : null;
		const className = classNames('r-r-tab-button', {
			'r-r-tab-button-top': this.props.alignNavigator.startsWith(Alignment.BOTTOM),
			'active': selectedTab,
			'r-r-disabled': tab.props.disabled
		}, 
		(this.props.alignNavigator.startsWith(Alignment.BOTTOM) ? `r-r-tab-button-top-${tab.props.scheme}` : `r-r-tab-button-${tab.props.scheme}`),
		tab.props.headerClassName);

		return (
			<Button nostyle textonly className={className} onClick={(e)=> this.onTabHeaderClick(e, tab, index)} 
				alignText={tab.props.alignTitle}
				icon={tab.props.icon}
				alignIcon={tab.props.alignIcon} 
				rightIcon={tab.props.rightIcon}
				text={tab.props.title}
				scheme={tab.props.scheme}
				fill={fill}
				role="tab" aria-controls={ariaControls} aria-selected={selectedTab} tabIndex={tabIndex} id={id}
			/>
		)
	}

	renderTabHeaders() {
		return (
			React.Children.map(this.props.children, (tab, index) => {
				if (tab.type === TabPanel) {
					return this.renderTabHeader(tab, index);
				}
				return tab;
			})
		)
	}

	renderTabBar() {
		const headers = this.renderTabHeaders();
		const className = classNames('r-r-tabpane-navigator r-r-noselect', {
			'r-r-border-bottom-2px-grey1': this.props.alignNavigator === Alignment.TOP,
			'r-r-border-top-2px-grey1': this.props.alignNavigator === Alignment.BOTTOM,
			'r-r-display-flex-justify-center':  BoolUtils.equalsAny(this.props.alignNavigator, [Alignment.CENTER, Alignment.TOP_CENTER, Alignment.BOTTOM_CENTER]),
			'r-r-display-flex-justify-flex-end':  BoolUtils.equalsAny(this.props.alignNavigator, [Alignment.TOP_RIGHT, Alignment.BOTTOM_RIGHT])
		});
		let leftRightClassName = BoolUtils.equalsAny(this.props.alignNavigator, [Alignment.LEFT, Alignment.RIGHT]) ? 'r-r-tabpane-navigator-width-max-content' : '';

		return (
			<div className={className} borderless>
				<div className={leftRightClassName}>{headers}</div>
			</div>
		)
	}

	renderTabContent(tab, index) {
		const selectedTab = this.isSelectedTab(index);
		const className = classNames({'r-r-display-none': !selectedTab}, tab.props.contentClassName);
		const id = this.id + '-content-' + index;
		const ariaLabelledBy = this.id + '-header-' + index;
		const sanitizedScheme = this.props.scheme === Scheme.SKELETON ? Scheme.SKELETON : '';
		
		return (
			<Panel id={id} aria-labelledby={ariaLabelledBy} aria-hidden={!selectedTab} className={className}
				style={tab.props.contentStyle} scheme={sanitizedScheme} role="tabpanel" borderless safely={this.props.safely}>
				{tab.props.children}
			</Panel>
		)
	}

	renderContent() {
		const contents = React.Children.map(this.props.children, (tab, index) => {
			if (tab.type !== TabPanel) {
				return null;
			}
			if (!this.props.renderActiveTabOnly || this.isSelectedTab(index)) {
				return this.renderTabContent(tab,index);
			}
		});

		return (
			<div className="r-r-tabpane-content">
				{contents}
			</div>
		)
	}

	render() {
		const className = classNames('r-r-tabpane', {
			'r-r-display-flex': BoolUtils.equalsAny(this.props.alignNavigator, [Alignment.LEFT, Alignment.RIGHT])
		}, this.props.className);
		const tabNavBelow = this.props.alignNavigator === Alignment.RIGHT || this.props.alignNavigator.startsWith(Alignment.BOTTOM);
		const tabBar = this.renderTabBar();
		const content = this.renderContent(); 

		return (
			<div id={this.props.id} className={className} style={this.props.style}>
				{ tabNavBelow ? '' : tabBar}
				{content}
				{ tabNavBelow ? tabBar : '' }
			</div>
		)
	}

}
