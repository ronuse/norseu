
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
		allowScroll: false,
		minDimension: null,
		maxDimension: null,

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
		allowScroll: PropTypes.bool,
		minDimension: PropTypes.object,
		maxDimension: PropTypes.object,
		
		onShow: PropTypes.func,
		onHide: PropTypes.func
	};

	constructor(props) {
		super(props);
		this.state = {
			isVisible: this.props.isVisible && this.shouldShowNavbar(this.props.minDimension, this.props.maxDimension, document.documentElement.clientWidth, document.documentElement.clientHeight)
		}; 
		this.elementRef = React.createRef(this.props.forwardRef);

		this.onExit = this.onExit.bind(this);
		this.onClose = this.onClose.bind(this);
		this.onEnter = this.onEnter.bind(this);
		this.onExited = this.onExited.bind(this);
		this.onEntered = this.onEntered.bind(this);
		this.onModalClick = this.onModalClick.bind(this);
	}

	bindModalClickListener() {
		if (!this.modalClickListener) {
			this.modalClickListener = (event) => {
				this.onClose(event);
			};
			this.modal.addEventListener('click', this.modalClickListener);
		}
	}

	unbindModalClickListener() {
		if (this.modalClickListener) {
			this.modal.removeEventListener('click', this.modalClickListener);
			this.modalClickListener = null;
		}
	}

	enableOverlay() {
		if (this.props.noOverlay || this.modal) {
			return;
		}

		this.modal = document.createElement('div');
		this.modal.style.zIndex = String(DOMUtils.ZIndexHandler.getElementZIndex(this.elementRef.current) - 1);
		const modalClassName = classNames("norseu-navbar-modal norseu-component-overlay", this.props.modalClassName);
		DOMUtils.addClasses(this.modal, modalClassName);
		if (this.props.dismissableModal) {
			this.bindModalClickListener();
		}
		document.body.appendChild(this.modal);
	}

	disableOverlay() {
		if (this.props.noOverlay || !this.modal) {
			return;
		}
 
		this.unbindModalClickListener();
		document.body.removeChild(this.modal);
		this.modal = null;
	}

	componentDidMount() {
		if (this.props.minDimension || this.props.maxDimension) {
			this.documentResizeListener = (event) => {
				const width = document.documentElement.clientWidth;
				const height = document.documentElement.clientHeight;
				const shouldShowNavbar = this.props.isVisible && this.shouldShowNavbar(this.props.minDimension, this.props.maxDimension, width, height);
				if (this.state.isVisible !== shouldShowNavbar) {
					this.setState({isVisible: shouldShowNavbar});
				}
			}
			window.addEventListener('resize', this.documentResizeListener);
		}
	}

	shouldShowNavbar(minDimension, maxDimension, screenWidth, screenHeight) {
		if (!minDimension && !maxDimension) {
			return true;
		}
		if (minDimension) {
			if (minDimension.width !== undefined && minDimension.height !== undefined && minDimension.width < screenWidth && minDimension.height < screenHeight) {
				return true;
			} else if (minDimension.width !== undefined && minDimension.width < screenWidth) {
				return true;
			} else if (minDimension.height !== undefined && minDimension.height < screenHeight) {
				return true;
			}
		} else if (maxDimension) {
			if (maxDimension.width !== undefined && maxDimension.height !== undefined && maxDimension.width > screenWidth && maxDimension.height > screenHeight) {
				return true;
			} else if (maxDimension.width !== undefined && maxDimension.width > screenWidth) {
				return true;
			} else if (maxDimension.height !== undefined && maxDimension.height > screenHeight) {
				return true;
			}
		}
		return false;
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.isVisible !== undefined && this.state.isVisible !== nextProps.isVisible) {
			this.setState({isVisible: nextProps.isVisible});
		}
	}

	componentDidUpdate(prevProps, prevState) {
		
	}

	componentWillUnmount() {
		this.unbindModalClickListener();
		if (!this.props.fullScreen && !this.props.noOverlay) {
			this.disableOverlay();
		}
		DOMUtils.ZIndexHandler.removeElementZIndex(this.elementRef.current);
		if (this.documentResizeListener) {
			window.removeEventListener('resize', this.documentResizeListener);
			this.documentResizeListener = null;
		}
	}

	onClose(event) {
		if (this.props.onHide) {
			this.props.onHide(event);
		}
		event.preventDefault();
	}
	
	onEnter() {
		DOMUtils.ZIndexHandler.set('modal', this.elementRef.current, this.props.baseZIndex);
		if ((!this.props.allowScroll || (this.props.fullScreen)) && !this.props.noOverlay) {
			DOMUtils.addClass(document.body, 'norseu-overflow-hidden');
		}
		if (!this.props.fullScreen && !this.props.noOverlay) {
			this.enableOverlay();
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
		DOMUtils.ZIndexHandler.removeElementZIndex(this.elementRef.current);
		if ((!this.props.allowScroll || (this.props.fullScreen)) && !this.props.noOverlay) {
			DOMUtils.removeClass(document.body, 'norseu-overflow-hidden');
		}
		if (this.props.onCloseFocusRef && this.props.onCloseFocusRef.current && ObjUtils.isFunction(this.props.onCloseFocusRef.current.focus)) {
			this.props.onCloseFocusRef.current.focus();
		}
	}

	onExit() {
		if (!this.props.noOverlay) {
			this.disableOverlay();
		}
	}

	onModalClick(event) {
		
	}

	render() {
		const className = classNames('norseu-navbar', {
			'norseu-fullscreen': this.props.fullScreen,
			'norseu-navbar-left': !this.props.fullScreen && BoolUtils.equalsAny(this.props.position, [ Position.LEFT, Position.TOP_LEFT, Position.BOTTOM_LEFT]),
			'norseu-navbar-right': !this.props.fullScreen && BoolUtils.equalsAny(this.props.position, [ Position.RIGHT, Position.TOP_RIGHT, Position.BOTTOM_RIGHT]),
			'norseu-navbar-top': !this.props.fullScreen && BoolUtils.equalsAny(this.props.position, [ Position.TOP, Position.TOP_CENTER]),
			'norseu-navbar-bottom': !this.props.fullScreen && BoolUtils.equalsAny(this.props.position, [ Position.BOTTOM, Position.BOTTOM_CENTER])
		}, this.props.className);
		let transitionTimeout = {
			enter: this.props.position === Position.CENTER ? 150 : 300,
			exit: this.props.position === Position.CENTER ? 150 : 300
		};

		return (
			<CSSTransition nodeRef={this.elementRef} classNames="norseu-navbar" timeout={transitionTimeout} in={this.state.isVisible} options={this.props.transitionOptions}
				unmountOnExit onEnter={this.onEnter} onEntered={this.onEntered} onExit={this.onExit} onExited={this.onExited}>
				<div ref={this.elementRef} id={this.props.id} className={className} style={this.props.style}>
					{this.props.children}
				</div>
			</CSSTransition>
		)
	}
}

export const Navbar = React.forwardRef((props, ref) => <NavbarComponent {...props} forwardRef={ref} />);