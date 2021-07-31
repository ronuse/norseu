
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
import ReactDOM from 'react-dom';
import classNames from 'classnames';
import React, { Component } from 'react';
import { ObjUtils, BoolUtils, DOMUtils } from "../../utils";
import { Alignment, Position } from "../variables";
import { Portal } from "./Portal"
import { Dialog } from "./Dialog"
import { CSSTransition } from 'react-transition-group';
import { Button } from "../buttons"

export function alertDialog(props) {
    let container = props.container || document.body;

    let alertDialogWrapper = document.createDocumentFragment();
    DOMUtils.appendChild(alertDialogWrapper, container);
    props = {...props, ...{isVisible: props.isVisible === undefined ? true : props.isVisible}};
    let alertDialogEl = React.createElement(AlertDialog, props);
    ReactDOM.render(alertDialogEl, alertDialogWrapper);

    let updateConfirmDialog = (newProps) => {
        props = { ...props, ...newProps };
        ReactDOM.render(React.cloneElement(alertDialogEl, props), alertDialogWrapper);
    };

    return {
        _destroy: () => {
            ReactDOM.unmountComponentAtNode(alertDialogWrapper);
        },
        show: () => {
            updateConfirmDialog({ isVisible: true, onHide: () => {
                updateConfirmDialog({ isVisible: false });
            }});
        },
        hide: () => {
            updateConfirmDialog({ isVisible: false });
        },
        update: (newProps) => {
            updateConfirmDialog(newProps);
        }
    }
};

export function loadingDialog(params, props) {
    const loadingIcon = props.loadingIcon || "fas fa-spinner fa-pulse";
    const dialog = alertDialog({
        icon: loadingIcon,
        confirmLabel: null
    });
    if (ObjUtils.isFunction(props.onLoading)) {
        props.onLoading(params, dialog);
    }
    return dialog;
};

export const AlertDialogEvent = {
    Confirm: "confirm", 
    Cancel: "cancel"
};
 
export class AlertDialog extends Component {

    static defaultProps = {
        isVisible: false,
        message: null,
        icon: null,
        confirmLabel: "OK",
        cancelLabel: null,
        confirmRef: null,
        cancelRef: null,
        confirmIcon: null,
        cancelClassName: null,
        confirmScheme: null,
        cancelScheme: null,
        container: null,
        dismissableModal: false,
        alignFooter: Alignment.RIGHT,
        footerElements: null,
        
        onConfirm: null,
        onCancel: null,
        onHide: null
    };

    static propTypes = {
        isVisible: PropTypes.bool,
        icon: PropTypes.any,
        message: PropTypes.any,
        confirmRef: PropTypes.any,
        cancelRef: PropTypes.any,
        confirmLabel: PropTypes.string,
        cancelLabel: PropTypes.string,
        confirmIcon: PropTypes.string,
        cancelIcon: PropTypes.string,
        confirmScheme: PropTypes.string,
        cancelScheme: PropTypes.string,
        container: PropTypes.any,
        dismissableModal: PropTypes.bool,
        alignFooter: PropTypes.string,
        footerElements: PropTypes.any,

        onConfirm: PropTypes.func,
        onCancel: PropTypes.func,
        onHide: PropTypes.func
    };

    constructor(props) {
        super(props);
        this.state = {
            visible: props.isVisible
        };

        this.confirm = this.confirm.bind(this);
        this.cancel = this.cancel.bind(this);
        this.resolve = this.resolve.bind(this);
    }

    confirm(event) {
        if (!this.props.onConfirm || !this.props.onConfirm(event)) {
            this.resolve(AlertDialogEvent.Confirm);
        }
    }

    cancel(event) {
        if (!this.props.onCancel || !this.props.onCancel(event)) {
            this.resolve(AlertDialogEvent.Cancel);
        }
    }

    resolve(result) {
        this.setState({ visible: false }, () => {
            if (this.props.onHide) {
                this.props.onHide(result);
            }
        });
    }

    componentDidUpdate(prevProps) {
        if (prevProps.visible !== this.props.visible) {
            this.setState({ visible: this.props.visible });
        }
    }

    renderIcon(hasMessage) {
        if (!this.props.icon) {
            return;
        }

        const isString = BoolUtils.isTypeOfAny(this.props.icon, ["string"]);
        if (isString) {
            return <i className={`r-r-dialog-content-icon r-r-dialog-content-icon-str ${this.props.icon} ${!hasMessage ? 'r-r-margin-1-5rem' : ''}`} />;
        }
        const relayProps = ObjUtils.clone(this.props.icon.props);
        relayProps.className = classNames('r-r-dialog-content-icon', (!hasMessage ? 'r-r-margin-1-5rem' : null), relayProps.className);
        return React.cloneElement(this.props.icon, relayProps);
    }

    renderControl() {
        const confirmButton = this.props.confirmLabel || this.props.confirmIcon 
                                ? <Button ref={this.props.confirmRef} text={this.props.confirmLabel} icon={this.props.confirmIcon} scheme={this.props.confirmScheme} onClick={this.confirm}/> 
                                : null;
        const cancelButton = this.props.cancelLabel || this.props.cancelIcon  
                                ? <Button ref={this.props.cancelRef} text={this.props.cancelLabel} icon={this.props.cancelIcon} scheme={this.props.cancelScheme} onClick={this.cancel}/> 
                                : null;
        return (
            <div className={`r-r-alert-dialog-footer r-r-alert-dialog-footer-${this.props.alignFooter}`}>
                {cancelButton}
                {confirmButton}
                {this.props.footerElements}
            </div>
        );
    }

    renderElement() {
        const className = classNames('r-r-alert-dialog', this.props.className);
        const icon = this.renderIcon(!!this.props.message);
        const dialogProps = ObjUtils.findDiffKeys(this.props, AlertDialog.defaultProps);
        const message = ObjUtils.selectJSXElement(this.props.message, this.props);
        const controls = this.renderControl();

        return (
            <Dialog {...dialogProps} dismissableModal={this.props.dismissableModal} noHeader isVisible={this.state.visible} className={className} onHide={this.resolve}>
                <div className="r-r-alert-dialog-content">
                    {icon}
                    {message}
                </div>
                {controls}
            </Dialog>
        )
    }

    render() {
        const element = this.renderElement();
        return <Portal child={element} container={this.props.container} visible/>;
    }
}
