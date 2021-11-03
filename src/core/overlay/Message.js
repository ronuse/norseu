
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

export function showMessage(props) {
	let container = props.container || document.body;
	console.log("SHOW-MESSAGE", props.container, props);

	let messageComponentWrapper = document.createDocumentFragment();
	DOMUtils.appendChild(messageComponentWrapper, container);
	let messageComponent = React.createElement(MessageComponent, props);
	ReactDOM.render(messageComponent, messageComponentWrapper);

	let updateConfirmDialog = (newProps) => {
		props = { ...props, ...newProps };
		ReactDOM.render(React.cloneElement(messageComponent, props), messageComponentWrapper);
	};

	return {
		close: () => {
			ReactDOM.unmountComponentAtNode(messageComponentWrapper);
		},
		update: (newProps) => {
			updateConfirmDialog(newProps);
		}
	}
};

export function showMessages(messagesProps) {
	const messages = messagesProps.map(messageProp => {
		return showMessage(messageProp);
	});

	return {
		messages: () =>  { return messages; },
		closeAll: () =>  { messages.forEach(message => message.close()); },
		closeAt: (index) =>  { messages[index].close(); },
		updateAll: (newProps) => { messages.forEach(message => message.update(newProps)); },
		updateAt: (index, newProps) =>  { messages[index].update(newProps); }
	}
};
 
export class MessageComponent extends BaseComponent {

	static defaultProps = {
		scheme: Scheme.PRIMARY,
        id: null,
		className: null,
		style: null,
		icon: "fa fa-exclamation-circle",
		title: null,
		description: null,
		extraData: null,
		notClosable: false,
		sticky: false,
		lifetime: 3000,
		fill: false,
		isToast: false,
		container: null,

		onClose: null,
		onClick: null
	};

	static propTypes = {
		scheme: PropTypes.string,
        id: PropTypes.string,
		className: PropTypes.string,
		style: PropTypes.object,
		icon: PropTypes.any,
		title: PropTypes.any,
		description: PropTypes.any,
		extraData: PropTypes.any,
		notClosable: PropTypes.bool,
		sticky: PropTypes.string,
		lifetime: PropTypes.number,
		fill: PropTypes.bool,
		isToast: PropTypes.bool,
		container: PropTypes.any,

        onClose: PropTypes.func,
        onClick: PropTypes.func
	};

	constructor(props) {
		super(props);

		this.onClick = this.onClick.bind(this);
		this.onClose = this.onClose.bind(this);
	}

	resolveForwardRef(extraValues) {
		super.resolveForwardRef({
			value: () => this.extraData,
			setValue: (value) => { this.extraData = value},
			close: this.onClose,
		});
	}

	componentDidMount() {
		this.resolveForwardRef({});
		if (!this.state.sticky) {
            this.timeout = setTimeout(() => {
                this.onClose(null);
            }, this.state.lifetime);
        }
	}

	componentWillUnmount() {

	}

	onClick(event) {
		if (this.state.onClick && !DOMUtils.hasClass(event.target, 'r-r-message-close-icon')) {
            this.state.onClick(event, this.state.extraData);
        }
	}

	onClose(event) {
		if (this.timeout) clearTimeout(this.timeout);
		if (this.state.onClose) {
			this.state.onClose(event, this.state.extraData);
		}
		if (!this.state.isToast && this.elementRef && this.elementRef.current) {
			this.elementRef.current.parentNode.removeChild(this.elementRef.current);
		}
	}

	renderCloseIcon() {
		if (this.state.notClosable) return null;
		return (
			<i className={"r-r-message-close-icon fa fa-times"} onClick={this.onClose}/>
		);
	}

	renderIcon() {
		if (!this.state.icon) return null;
		let isString = BoolUtils.isTypeOfAny(this.state.icon, ["string"]);
		if (!isString && !React.isValidElement(this.state.icon)) return null;
		let className = classNames('r-r-message-content-icon', isString ? this.state.icon : this.state.icon.props.className);
		if (!isString) {
			let relayProps = ObjUtils.clone(this.state.icon.props);
			relayProps.className = className;
			return React.cloneElement(this.state.icon, relayProps);
		}
		return <i className={className}/>
	}

	renderTitle() {
		if (!this.state.title) return null;
		let isString = BoolUtils.isTypeOfAny(this.state.title, ["string"]);
		if (!isString && !React.isValidElement(this.state.title)) return null;
		let className = classNames('r-r-message-message-title', isString ? null : this.state.title.props.className);
		if (!isString) {
			let relayProps = ObjUtils.clone(this.state.title.props);
			relayProps.className = className;
			return React.cloneElement(this.state.title, relayProps);
		}
		return <span className={className}>{this.state.title}</span>
	}

	renderDescription() {
		if (!this.state.description) return null;
		let isString = BoolUtils.isTypeOfAny(this.state.description, ["string"]);
		if (!isString && !React.isValidElement(this.state.description)) return null;
		let className = classNames('r-r-message-message-description', isString ? null : this.state.description.props.className);
		if (!isString) {
			let relayProps = ObjUtils.clone(this.state.description.props);
			relayProps.className = className;
			return React.cloneElement(this.state.description, relayProps);
		}
		return <span className={className}>{this.state.description}</span>
	}

	renderMessage() {
		const icon = this.renderIcon();
		const title = this.renderTitle();
		const description = this.renderDescription();

		return (
			<div className={"r-r-message-content"}>
				{icon}
				<div className={"r-r-message-message"}>
					{title}
					{description}
				</div>
			</div>
		)
	}

	render() {
        const className = classNames('r-r-message', `r-r-message-${this.state.scheme}`, {
			'r-r-width-auto': this.state.fill
        }, this.state.className);
		const closeIcon = this.renderCloseIcon();
		const message = this.renderMessage();
        const childElement = (
            <div ref={this.elementRef} className={className} style={this.state.style} role="alert" aria-live="assertive" aria-atomic="true" onClick={this.onClick}>
				{closeIcon}
				{message}
            </div>
        );
		return !this.state.container ? childElement : ReactDOM.createPortal(childElement, this.state.container);
    }

}

export const Message = React.forwardRef((props, ref) => <MessageComponent {...props} forwardRef={ref} />);