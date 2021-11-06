
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
import ReactDOM from 'react-dom';
import React, { Component } from 'react';
import { ObjUtils, BoolUtils, DOMUtils } from "../../utils";
import { Position, Scheme } from "../variables";
import { Portal } from "./Portal"
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { BaseComponent } from '../BaseComponent';
import { MessageComponent } from './Message';
 
let messageIdCount = 0;

export class ToastComponent extends BaseComponent {

	static defaultProps = {
		scheme: Scheme.PRIMARY,
        id: null,
		className: null,
		style: null,
		transitionOptions: null,
		baseZIndex: null,
		position: Position.TOP_RIGHT,
		sticky: false,
		lifetime: 3000,
		fill: false,
		isToast: false,
		container: null,

        onRemove: null,
        onShow: null,
        onHide: null
	};

	static propTypes = {
		scheme: PropTypes.string,
        id: PropTypes.string,
		className: PropTypes.string,
		style: PropTypes.object,
		transitionOptions: PropTypes.object,
		baseZIndex: PropTypes.number,
		position: PropTypes.string,
		sticky: PropTypes.string,
		lifetime: PropTypes.number,
		fill: PropTypes.bool,
		isToast: PropTypes.bool,
		container: PropTypes.any,

        onRemove: PropTypes.func,
        onShow: PropTypes.func,
        onHide: PropTypes.func
	};

	constructor(props) {
		super(props);

		this.id = this.state.id; 
		if (!this.id) this.id = DOMUtils.UniqueElementId();
		this.state.messagesProps = [];
		this.show = this.show.bind(this);
		this.clear = this.clear.bind(this);
		this.onClose = this.onClose.bind(this);
        this.onEntered = this.onEntered.bind(this);
        this.onExited = this.onExited.bind(this);
	}

	resolveForwardRef(extraValues) {
		super.resolveForwardRef({
			show: this.show,
			clear: this.clear
		});
	}

	show(props) {
		if (!props) return;

		let newMessagesProps;
		//console.log("show", this.state.messagesProps);
		if (Array.isArray(props)) {
			let messagesPropsLength = this.state.messagesProps.length;
			for (let index = 0; index < props.length; index++) {
				props[index].id = messageIdCount++;
				newMessagesProps = [...this.state.messagesProps, ...props];
			}
		} else {
			//console.log(this.state)
			props.key = "toast-key-0";
			newMessagesProps = this.state.messagesProps ? [...this.state.messagesProps, props] : [value];
		}
		this.state.messagesProps.length === 0 && DOMUtils.ZIndexHandler.set('toast', this.container, this.props.baseZIndex);
		this.setState({ messagesProps: newMessagesProps });
    }

    clear() {
        DOMUtils.ZIndexHandler.clear(this.container);
		this.setState({ messagesProps: [] });
    }

	onClose(event, messageProp) {
		//console.log("onClose", this.state.messagesProps);
		let newMessagesProps = this.state.messagesProps.filter(message => message.id !== messageProp.id);
		this.setState({ messagesProps: newMessagesProps });

        if (this.props.onRemove) {
            this.props.onRemove(messageProp);
        }
    }

    onEntered() {
        this.props.onShow && this.props.onShow();
    }

    onExited() {
        this.state.messagesProps.length === 0 && DOMUtils.ZIndexHandler.removeElementZIndex(this.container);
        this.props.onHide && this.props.onHide();
    }

    componentWillUnmount() {
        DOMUtils.ZIndexHandler.removeElementZIndex(this.container);
    }

	render() {
		if (this.state.position === Position.CENTER) this.state.position = Position.CENTER_TOP;
		if (this.state.position === Position.BOTTOM) this.state.position = Position.CENTER_BOTTOM;
		let className = classNames('r-r-toast r-r-toast-position-' + this.state.position, this.state.className);
		//console.log("MESSAGE-REF", this.state.messagesProps);

		return (
            <div ref={(el) => { this.container = el; }} id={this.id} className={className} style={this.state.style}>
                {/* <TransitionGroup> */}
                    {
                        this.state.messagesProps.map((messageProp) => {
                            const messageRef = React.createRef();

                            return (
                                <MessageComponent isToast ref={messageRef} {...messageProp} extraData={messageProp} onClick={this.state.onClick} onClose={this.onClose} />
                            )
                        })
                    }
                {/* </TransitionGroup> */}
            </div>
        );
    }

}

export const Toast = React.forwardRef((props, ref) => <ToastComponent {...props} forwardRef={ref} />);