
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
import { Position } from "../variables/";
import { Portal } from "./Portal"
import { CSSTransition } from 'react-transition-group';
 
 export class DialogComponent extends Component {

    static defaultProps = {
        isVisible: false,
        position: Position.CENTER,
        dismissableModal: true,
        noOverlay: false,
        className: null,
        style: null,
        modalClassName: null,
        modalStyle: null,
        contentClassName: null,
        contentStyle: null,
        transitionOptions: null,
        allowScroll: false,
        maximizable: false,
        maximized: false,
        maximizeIcon: "fa fa-window-maximize",
        notClosable: false,
        closeIcon: "fa fa-times",
        noHeader: false,
        noFooter: false,
        onOpenFocusRef: null,
        onCloseFocusRef: null,
        baseZIndex: null,
        forwardRef: null,

        onShow: null,
        onHide: null,
        onMaximize: null
    };

    static propTypes = {
        isVisible: PropTypes.bool,
        position: PropTypes.string,
        dismissableModal: PropTypes.bool,
        noOverlay: PropTypes.bool,
        className: PropTypes.string,
        modalClassName: PropTypes.string,
        modalStyle: PropTypes.object,
        contentClassName: PropTypes.string,
        contentStyle: PropTypes.object,
        style: PropTypes.object,
        transitionOptions: PropTypes.object,
        allowScroll: PropTypes.bool,
        maximizable: PropTypes.bool,
        maximized: PropTypes.bool,
        maximizeIcon: PropTypes.string,
        notClosable: PropTypes.bool,
        closeIcon: PropTypes.string,
        noHeader: PropTypes.bool,
        noFooter: PropTypes.bool,
        onOpenFocusRef: PropTypes.object,
        onCloseFocusRef: PropTypes.object,
        baseZIndex: PropTypes.number,
        forwardRef: PropTypes.any,
        
        onShow: PropTypes.func,
        onHide: PropTypes.func,
        onMaximize: PropTypes.func,
    };

    constructor(props) {
        super(props);
        this.state = {
            id: props.id,
            modalVisible: props.isVisible,
            visible: false
        };

        if (!this.props.onMaximize) {
            this.state.maximized = props.maximized;
        }
        this.elementRef = React.createRef(this.props.forwardRef);

        this.onClose = this.onClose.bind(this);
        this.onEnter = this.onEnter.bind(this);
        this.onExited = this.onExited.bind(this);
        this.onEntered = this.onEntered.bind(this);
        this.onModalClick = this.onModalClick.bind(this);
        this.toggleMaximize = this.toggleMaximize.bind(this);
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
        if (!this.state.id) {
            this.setState({ id: DOMUtils.UniqueElementId() });
        }

        if (this.props.isVisible) {
            this.setState({ visible: true }, () => {
                DOMUtils.ZIndexHandler.set('modal', this.modal, this.props.baseZIndex);
            });
        }
        this.resolveForwardRef();
    }

    componentDidUpdate(prevProps) {
        if (this.props.isVisible && !this.state.modalVisible) {
            this.setState({ modalVisible: true }, () => {
                DOMUtils.ZIndexHandler.set('modal', this.modal, this.props.baseZIndex);
            });
        }

        if (this.props.isVisible !== this.state.visible && this.state.modalVisible) {
            this.setState({
                visible: this.props.isVisible
            });
        }
        if (prevProps.maximized !== this.props.maximized && this.props.onMaximize) {
            this.updateScrollOnMaximizable();
        }
    }

    componentWillUnmount() {
        DOMUtils.ZIndexHandler.removeElementZIndex(this.modal);
    }

    onClose(event) {
        if (this.props.onHide) {
            this.props.onHide(event);
        }
        event.preventDefault();
    }
    
    onEnter() {
        if ((!this.props.allowScroll || (this.props.maximizable && this.state.maximized)) && !this.props.noOverlay) {
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
        DOMUtils.ZIndexHandler.removeElementZIndex(this.modal);
        this.setState({ modalVisible: false });
        if ((!this.props.allowScroll || (this.props.maximizable && this.state.maximized)) && !this.props.noOverlay) {
            DOMUtils.removeClass(document.body, 'r-r-overflow-hidden');
        }
        if (this.props.onCloseFocusRef && this.props.onCloseFocusRef.current && ObjUtils.isFunction(this.props.onCloseFocusRef.current.focus)) {
            this.props.onCloseFocusRef.current.focus();
            console.log("On Exited Fous: ", this.props.onCloseFocusRef.current);
        }
    }

    onModalClick(event) {
        if (this.props.dismissableModal && !this.props.noOverlay && this.modal === event.target) {
            this.onClose(event);
        }
    }

    toggleMaximize(event) {
        let maximized = !this.state.maximized;

        if (this.props.onMaximize) {
            this.props.onMaximize({
                event: event,
                maximized
            });
        } else {
            this.setState({
                maximized
            }, this.updateScrollOnMaximizable);
        }
        event.preventDefault();
    }

    updateScrollOnMaximizable() {
        if (this.props.allowScroll) {
            let funcIdentifier = this.state.maximized ? 'addClass' : 'removeClass';
            DOMUtils[funcIdentifier](document.body, 'r-r-overflow-hidden');
        }
    }

    renderCloseButton() {
        if (this.props.notClosable) {
            return;
        }

        const isString = BoolUtils.isTypeOfAny(this.props.closeIcon, ["string"]);
        if (isString) {
            return <i className={`r-r-dialog-header-close-icon ${this.props.closeIcon}`} onClick={this.onClose}></i>;
        }
        const relayProps = ObjUtils.clone(this.props.closeIcon.props);
        relayProps.className = classNames('r-r-dialog-header-close-icon', relayProps.className);
        if (!relayProps.onClick) {
            relayProps.onClick = this.onClose;
        }
        return React.cloneElement(this.state.closeIcon, relayProps);
    }

    renderMaximizeButton() {
        if (!this.props.maximizable) {
            return;
        }

        const isString = BoolUtils.isTypeOfAny(this.props.maximizeIcon, ["string"]);
        if (isString) {
            const className = classNames('r-r-dialog-header-maximize-icon', { 
                'fa fa-window-maximize': !this.state.maximized, 
                'fa fa-window-minimize': this.state.maximized, 
            });
            return <i className={className} onClick={this.toggleMaximize}></i>;
        }
        const relayProps = ObjUtils.clone(this.props.maximizeIcon.props);
        relayProps.className = classNames('r-r-dialog-header-maximize-icon', relayProps.className);
        if (!relayProps.onClick) {
            relayProps.onClick = this.toggleMaximize;
        }
        return React.cloneElement(this.state.maximizeIcon, relayProps);
    }

    renderHeader() {
        if (!this.props.noHeader) {
            const closeIcon = this.renderCloseButton();
            const maximizeIcon = this.renderMaximizeButton();
            const icons = ObjUtils.selectJSXElement(this.props.icons, this.props);
            const header = ObjUtils.selectJSXElement(this.props.header, this.props);

            return (
                <div ref={el => this.headerEl = el} className="r-r-dialog-header" onMouseDown={this.onDragStart}>
                    <span id={this.state.id + '-header'} className="r-r-dialog-title">{header}</span>
                    <div className="r-r-dialog-header-right">
                        {icons}
                        {maximizeIcon}
                        {closeIcon}
                    </div>
                </div>
            );
        }

        return null;
    }

    renderContent() {
        let contentClassName = classNames('r-r-dialog-content', this.props.contentClassName);

        return (
            <div id={this.state.id + '-content'} ref={el => this.contentEl = el} className={contentClassName} style={this.props.contentStyle}>
                {this.props.children}
            </div>
        );
    }

    renderFooter() {
        const footer = ObjUtils.selectJSXElement(this.props.footer, this.props);
        return footer && <div ref={el => this.footerElement = el} className="r-r-dialog-footer">{footer}</div>
    }

    renderElement() {
        const className = classNames('r-r-dialog', this.props.className, {
            'r-r-dialog-maximized': this.state.maximized
        });
        const modalClassName = classNames('r-r-dialog-modal', {
            'r-r-component-overlay': !this.props.noOverlay,
            'r-r-dialog-visible': this.state.modalVisible
        }, `r-r-dialog-${this.props.position}`, this.props.modalClassName);
        let transitionTimeout = {
            enter: this.props.position === Position.CENTER ? 150 : 300,
            exit: this.props.position === Position.CENTER ? 150 : 300
        };
        const header = this.renderHeader();
        const content = this.renderContent();
        const footer = this.renderFooter();

        return (
            <div ref={(el) => this.modal = el} className={modalClassName} onClick={this.onModalClick}>
                <CSSTransition nodeRef={this.elementRef} classNames="r-r-dialog" timeout={transitionTimeout} in={this.state.visible} options={this.props.transitionOptions}
                    unmountOnExit onEnter={this.onEnter} onEntered={this.onEntered} onExited={this.onExited}>
                    <div ref={this.elementRef} id={this.state.id} className={className} style={this.props.style}
                        role="dialog" aria-labelledby={this.state.id + '-header'} aria-describedby={this.state.id + '-content'} aria-modal={this.props.modal}>
                        {header}
                        {content}
                        {footer}
                    </div>
                </CSSTransition>
            </div>
        );
    }

    render() {
        if (!this.state.modalVisible) {
            return null;
        }
        const element = this.renderElement();
        return <Portal child={element} container={this.props.container} visible/>;
    }
}

export const Dialog = React.forwardRef((props, ref) => <DialogComponent {...props} forwardRef={ref} />);