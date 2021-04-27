
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
import { Portal } from "./Portal"
import { CSSTransition } from 'react-transition-group';
 
// TODO: update such that the overlay element does not remain in DOM after sidebar removed
export class NavbarComponent extends Component {

    static defaultProps = {
        isVisible: false,
        position: Position.LEFT,
        dismissableModal: true,
        noOverlay: false,
        className: null,
        style: null,
        modalClassName: null,
        modalStyle: null,
        fullScreen: false,
        forwardRef: null,
        modalRef: null,
        onOpenFocusRef: null,
        onCloseFocusRef: null,
        baseZIndex: null,
        transitionOptions: null,

        onShow: null,
        onHide: null
    };

    static propTypes = {
        isVisible: PropTypes.bool,
        position: PropTypes.string,
        dismissableModal: PropTypes.bool,
        noOverlay: PropTypes.bool,
        className: PropTypes.string,
        style: PropTypes.object,
        modalClassName: PropTypes.string,
        modalStyle: PropTypes.object,
        fullScreen: PropTypes.bool,
        forwardRef: PropTypes.any,
        modalRef: PropTypes.any,
        onOpenFocusRef: PropTypes.object,
        onCloseFocusRef: PropTypes.object,
        baseZIndex: PropTypes.number,
        transitionOptions: PropTypes.object,
        
        onShow: PropTypes.func,
        onHide: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.elementRef = React.createRef(this.props.forwardRef);
        this.modalRef = React.createRef(this.props.modalRef);

        this.onExit = this.onExit.bind(this);
        this.onClose = this.onClose.bind(this);
        this.onEnter = this.onEnter.bind(this);
        this.onExited = this.onExited.bind(this);
        this.onEntered = this.onEntered.bind(this);
        this.onModalClick = this.onModalClick.bind(this);
    }

    componentDidUpdate(prevProps, prevState) {
        
    }

    componentWillUnmount() {
        DOMUtils.ZIndexHandler.removeElementZIndex(this.modalRef.current);
    }

    onClose(event) {
        if (this.props.onHide) {
            this.props.onHide(event);
        }
        event.preventDefault();
    }
    
    onEnter() {
        DOMUtils.ZIndexHandler.set('modal', this.modalRef.current, this.props.baseZIndex);
        if ((!this.props.allowScroll || (this.props.fullScreen)) && !this.props.noOverlay) {
            DOMUtils.addClass(document.body, 'r-r-overflow-hidden');
        }
    }

    onEntered() {
        if (this.props.onShow) {
            this.props.onShow();
        }
        if (this.props.onOpenFocusRef && this.props.onOpenFocusRef.current && ObjUtils.isFunction(this.props.onOpenFocusRef.current.focus)) {
            this.props.onOpenFocusRef.current.focus();
        }
    }

    onExited() {
        DOMUtils.ZIndexHandler.removeElementZIndex(this.modalRef.current);
        if ((!this.props.allowScroll || (this.props.fullScreen)) && !this.props.noOverlay) {
            DOMUtils.removeClass(document.body, 'r-r-overflow-hidden');
        }
        if (this.props.onCloseFocusRef && this.props.onCloseFocusRef.current && ObjUtils.isFunction(this.props.onCloseFocusRef.current.focus)) {
            this.props.onCloseFocusRef.current.focus();
        }
        /*if (this.modalRef && this.modalRef.current && !this.props.noOverlay && !this.props.fullScreen) {
            this.modalRef.current.parentElement.removeChild(this.modalRef.current);
        }*/
    }

    onExit() {
    }

    onModalClick(event) {
        if (this.props.dismissableModal && !this.props.noOverlay && (this.modalRef && this.modalRef.current === event.target)) {
            this.onClose(event);
        }
    }

    render() {
        const modalClassName = classNames("r-r-sidebar-modal", {
            'r-r-component-overlay': !this.props.noOverlay,
            'r-r-sidebar-visible': this.props.isVisible
        }, this.props.modalClassName);
        const className = classNames('r-r-sidebar', {
            'r-r-fullscreen': this.props.fullScreen,
            'r-r-sidebar-left': !this.props.fullScreen && BoolUtils.equalsAny(this.props.position, [ Position.LEFT, Position.TOP_LEFT, Position.BOTTOM_LEFT]),
            'r-r-sidebar-right': !this.props.fullScreen && BoolUtils.equalsAny(this.props.position, [ Position.RIGHT, Position.TOP_RIGHT, Position.BOTTOM_RIGHT]),
            'r-r-sidebar-top': !this.props.fullScreen && BoolUtils.equalsAny(this.props.position, [ Position.TOP, Position.TOP_CENTER]),
            'r-r-sidebar-bottom': !this.props.fullScreen && BoolUtils.equalsAny(this.props.position, [ Position.BOTTOM, Position.BOTTOM_CENTER])
        }, this.props.className);
        let transitionTimeout = {
            enter: this.props.position === Position.CENTER ? 150 : 300,
            exit: this.props.position === Position.CENTER ? 150 : 300
        };

        return (
            <div ref={this.modalRef} className={modalClassName} style={this.props.modalStyle} onClick={this.onModalClick} role="complementary">
                <CSSTransition nodeRef={this.elementRef} classNames="r-r-sidebar" timeout={transitionTimeout} in={this.props.isVisible} options={this.props.transitionOptions}
                    unmountOnExit onEnter={this.onEnter} onEntered={this.onEntered} onExit={this.onExit} onExited={this.onExited}>
                    <div ref={this.elementRef} id={this.props.id} className={className} style={this.props.style}>
                        {this.props.children}
                    </div>
                </CSSTransition>
            </div>
        )
    }
}

export const Navbar = React.forwardRef((props, ref) => <NavbarComponent {...props} forwardRef={ref} />);