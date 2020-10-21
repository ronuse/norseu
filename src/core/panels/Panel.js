
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
import { Button } from "../buttons"
import { Scheme } from "../variables"
import { BoolUtils, ObjUtils, DOMUtils } from "../utils/"
import { Elevation } from "../variables/"
import { CSSTransition } from 'react-transition-group';

export class Panel extends Component {

    static defaultProps = {
        id: null,
        title: null,
        scheme: null,
        safely: null,
        collapsible: null,
        expanded: null,
        expandIcon: "fa fa-plus",
        collapseIcon: "fa fa-minus",
        onCollapse: null,
        onExpand: null,
        onToggle: null,
        elevation: Elevation.NONE,
        exemptedComponents: []
    }

    static propTypes = {
        id: PropTypes.string,
        title: PropTypes.string,
        scheme: PropTypes.string,
        safely: PropTypes.bool,
        collapsible: PropTypes.bool,
        expanded: PropTypes.bool,
        expandIcon: PropTypes.string,
        collapseIcon: PropTypes.string,
        onCollapse: PropTypes.func,
        onExpand: PropTypes.func,
        onToggle: PropTypes.func,
        elevation: PropTypes.string,
        exemptedComponents: PropTypes.arrayOf(Component)
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

    renderHeader(expanded) {
        if (this.props.title || this.props.collapsible) {
            const toggleIcon = expanded ? this.props.collapseIcon : this.props.expandIcon;

            return (
                <div className="r-r-panel-title">
                    <span className="r-r-panel-title-text r-r-loading r-r-skeleton" aria-label={this.id + '-header'}>{this.props.title}</span>
                    {this.props.collapsible ? <Button scheme={this.props.scheme} rounded textonly icon={toggleIcon} onClick={this.toggle} className="r-r-panel-toggle-button" /> : ''}
                    
                </div>
            );
        }
    }

    renderContent(expanded) {
        const id = this.id + '-content';
        let children = this.props.children.length === 0 || this.props.scheme != Scheme.SKELETON ? 
                        this.props.children : 
                        React.Children.map(this.props.children, child => {

            let isExemptedComponent = BoolUtils.equalsAny(child.type, this.props.exemptedComponents);
            if (isExemptedComponent) {
                return child;
            }
            let isPanelComponent = BoolUtils.equalsAny(child.type, [Panel]);
            let relayProps = { className: !isPanelComponent
                ? "r-r-loading r-r-skeleton" : "", 
                scheme: this.props.scheme
            };
            if (isPanelComponent) {
                relayProps.safely = this.props.safely;
                relayProps.exemptedComponents = this.props.exemptedComponents;
            }
            if (React.isValidElement(child) && child.props.scheme !== undefined && this.props.safely) {
                return React.cloneElement(child, relayProps);

            }
            if (!this.props.safely) {
                return React.cloneElement(child, relayProps)

            }
            console.log("safely");
            return child;
        });
        
        return (
            <CSSTransition classNames="transition-dropdown" timeout={{enter: 500, exit: 450}} in={expanded} unmountOnExit>
                <div className="r-r-panel-content" aria-hidden={!expanded} role="region" id={id} aria-labelledby={this.id + '-header'}>
                    {children}
                </div>
            </CSSTransition>
        );
    }

    render() {
        let className = classNames('r-r-panel r-r-component', this.props.elevation, {
            'r-panel-collapsible': this.props.collapsible
        }, this.props.className);
        let expanded = this.isExpanded();
        let header = this.renderHeader(expanded);
        let content = this.renderContent(expanded);
        let componentProps = ObjUtils.findDiffKeys(this.props, Panel.defaultProps);
        ObjUtils.replaceEntry(componentProps, "className", className);

        return (
            <div className={className} {...componentProps} >
                {header}
                {content}
            </div>
        )
    }

}
