
/**
 * MIT License
 * 
 * Copyright (c) 2021 Ronuse Agency, Adewale Azeez, Oyeleke Damilola.
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
import { ObjUtils, BoolUtils, DOMUtils } from "../../utils";
import { Position } from "../variables";
import { BaseComponent } from "../BaseComponent";
import { Portal } from "./Portal"
import { CSSTransition } from 'react-transition-group';

export const buildPopoverArrow = (position, color) => {

}

export const PopoverArrow = {
    
}
 
 export class PopoverComponent extends BaseComponent {

    static defaultProps = {
        dismissable: true,
        className: null,
        style: null,
        pointingArrowClassName: null,
        transitionOptions: null,
        onOpenFocusRef: null,
        onCloseFocusRef: null,
        baseZIndex: null,
        container: null,
        trapFocus: false,
        onShow: null,
        onHide: null,
    };

    static propTypes = {
        dismissable: PropTypes.bool,
        className: PropTypes.string,
        style: PropTypes.object,
        pointingArrowClassName: null,
        transitionOptions: PropTypes.object,
        onOpenFocusRef: PropTypes.object,
        onCloseFocusRef: PropTypes.object,
        baseZIndex: PropTypes.number,
        container: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
        trapFocus: PropTypes.bool,
        onShow: PropTypes.func,
        onHide: PropTypes.func,
    };

    constructor(props) {
        super(props);
        this.state.id = props.id;
        this.state.visible = false;

        this.toggle = this.toggle.bind(this);
        this.onEnter = this.onEnter.bind(this);
        this.onExit = this.onExit.bind(this);
        this.onExited = this.onExited.bind(this);
        this.onEntered = this.onEntered.bind(this);
        this.showPopover = this.showPopover.bind(this);
        this.hidePopover = this.hidePopover.bind(this);
        this.resolvePopoverStyle = this.resolvePopoverStyle.bind(this);
    }

    resolveForwardRef(extraValues) {
        super.resolveForwardRef({
            toggle: this.toggle
        });
    }

    componentDidMount() {
        super.componentDidMount();
        if (!this.state.id) {
            this.setState({ id: DOMUtils.UniqueElementId() });
        }
    }

    componentWillUnmount() {
        this.unbindDocumentClickListener();
        this.unbindScrollListener();
        DOMUtils.ZIndexHandler.removeElementZIndex(this.modal);
    }
    
    onEnter() {
        DOMUtils.ZIndexHandler.set('overlay', this.elementRef.current, this.props.baseZIndex);
        this.resolvePopoverStyle();
    }

    onEntered() {
        if (this.props.onOpenFocusRef && this.props.onOpenFocusRef.current && ObjUtils.isFunction(this.props.onOpenFocusRef.current.focus)) {
            this.props.onOpenFocusRef.current.focus();
        }
        this.bindDocumentClickListener();
        this.bindScrollListener();
        if (this.props.onShow) this.props.onShow();
    }

    onExit() {
        this.unbindDocumentClickListener();
        this.unbindScrollListener();
    }

    onExited() {
        DOMUtils.ZIndexHandler.removeElementZIndex(this.elementRef.current);
        if (this.props.onCloseFocusRef && this.props.onCloseFocusRef.current && ObjUtils.isFunction(this.props.onCloseFocusRef.current.focus)) {
            this.props.onCloseFocusRef.current.focus();
        }
        if (this.props.onHide) this.props.onHide();
    }

    isNotToggleElement(event) {
        return this.target && this.target != event.target && !(this.target.isSameNode(event.target) || this.target.contains(event.target)) ;
    }

    isOutsideClicked(target) {
        return this.elementRef && this.elementRef.current && !(this.elementRef.current.isSameNode(target) || this.elementRef.current.contains(target));
    }

    bindDocumentClickListener() {
        if (!this.documentClickListener && this.props.dismissable) {
            this.documentClickListener = (event) => {
                if (this.isNotToggleElement(event) && this.isOutsideClicked(event.target)) {
                    if (this.state.trapFocus && this.props.onOpenFocusRef && this.props.onOpenFocusRef.current && ObjUtils.isFunction(this.props.onOpenFocusRef.current.focus)) {
                        this.props.onOpenFocusRef.current.focus();
                        return;
                    }
                    this.hidePopover();
                }
            };
            document.addEventListener('click', this.documentClickListener);
        }
    }

    unbindDocumentClickListener() {
        if (this.documentClickListener) {
            document.removeEventListener('click', this.documentClickListener);
            this.documentClickListener = null;
        }
    }

    bindScrollListener() {
        if (!this.documentScrollHandler) {
            this.documentScrollHandler = DOMUtils.ScrollHandler(this.target, (event) => {
                if (this.state.visible) {
                    this.hidePopover();
                }
            });
            this.documentScrollHandler.attach();
        }
    }

    unbindScrollListener() {
        if (this.documentScrollHandler) {
            this.documentScrollHandler.detach();
        }
    }

    resolvePopoverStyle() {
        if (!this.target) return;
        DOMUtils.absolutePositionRelatively(this.elementRef.current, this.target);
        if (this.props.pointingArrowClassName) return;
        const targetOffset = DOMUtils.getElementOffset(this.target);
        const popoverOffset = DOMUtils.getElementOffset(this.elementRef.current);
        if (targetOffset.left > popoverOffset.left) {
            const arrowLeftOffset = targetOffset.left - popoverOffset.left - 10;
            this.elementRef.current.style.setProperty('--popoverArrowLeftOffset', `${arrowLeftOffset}px`);
        }
        if (targetOffset.top > popoverOffset.top) {
            DOMUtils.addClass(this.elementRef.current, 'r-r-popover-arrow-flipped');
        }
    }

    toggle(event, target) {
        if (!this.state.visible) {
            this.showPopover(event, target);
            return;
        }
        this.hidePopover(event, target);
    }

    showPopover(event, target) {
        this.target = target || event.currentTarget || event.target;
        if (this.state.visible) {
            this.resolvePopoverStyle();
            return;
        }
        this.setState({ visible: true }, () => {
            // overlay event listener
        });
    }

    hidePopover(event, target) {
        this.setState({ visible: false }, () => {
            // overlay event listener
        });
    }

    renderElement() {
        let className = classNames('r-r-popover', {
            'r-r-popover-arrow': this.props.pointingArrowClassName === null,
            'r-r-margin-top-0px': this.props.pointingArrowClassName !== null,
        }, this.props.pointingArrowClassName, this.props.className);

        return (
            <CSSTransition nodeRef={this.elementRef} classNames="r-r-popover" timeout={{ enter: 130, exit: 110 }} in={this.state.visible} options={this.props.transitionOptions}
                unmountOnExit onEnter={this.onEnter} onEntered={this.onEntered} onExited={this.onExited}>
                <div ref={this.elementRef} id={this.state.id} className={className} style={this.props.style}>
                    {this.props.children}
                </div>
            </CSSTransition>
        );
    }

    render() {
        const element = this.renderElement();
        return <Portal child={element} container={this.props.container} visible/>;
    }
}

export const Popover = React.forwardRef((props, ref) => <PopoverComponent {...props} forwardRef={ref} />);
