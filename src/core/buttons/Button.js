
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
import { ObjUtils, BoolUtils } from "../../utils";
import { Scheme, Alignment } from "../variables/";

export class Button extends Component {

    static defaultProps = {
        text: null,
        alignText: Alignment.CENTER,
        icon: null,
        alignIcon: Alignment.LEFT,
        rightIcon: null,
        tooltip: null,
        tooltipProps: null,
        scheme: null,
        link: null,
        raised: null,
        rounded: null,
        borderless: null,
        textonly: null,
        outlined: null,
        fill: false,
        nostyle: false,
        fillIcon: null,
        ref: null
    }

    static propTypes = {
        text: PropTypes.string,
        alignText: PropTypes.string,
        icon: PropTypes.any,
        alignIcon: PropTypes.string,
        rightIcon: PropTypes.any,
        tooltip: PropTypes.string,
        tooltipProps: PropTypes.object,
        scheme: PropTypes.string,
        link: PropTypes.bool,
        raised: PropTypes.bool,
        rounded: PropTypes.bool,
        borderless: PropTypes.bool,
        textonly: PropTypes.bool,
        outlined: PropTypes.bool,
        fill: PropTypes.bool,
        nostyle: PropTypes.bool,
        fillIcon: PropTypes.bool,
        ref: PropTypes.any
    }

    constructor(props) {
        super(props);
        this.state = ObjUtils.clone(this.props);

        if (this.state.ref && this.state.ref.current !== undefined) {
            this.state.ref.current = this;
        }
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps) {

    }

    componentWillUnmount() {

    }

    renderIcon() {
        if (!this.state.icon || this.state.scheme == Scheme.SKELETON) {
            return null;
        }

        let isString = BoolUtils.isTypeOfAny(this.state.icon, ["string"]);
        if (!isString && !React.isValidElement(this.state.icon)) {
            throw new Error("Only string or a valid react element is expected as the checkbox label");
        }
        let className = classNames('r-r-button-icon', isString ? this.state.icon : this.state.icon.props.className, {
            'r-r-margin-right-15px': this.state.rightIcon && (BoolUtils.equalsAny(this.state.alignIcon, [ Alignment.RIGHT, Alignment.TOP_RIGHT, Alignment.BOTTOM_RIGHT]) || 
                                    BoolUtils.equalsAny(this.state.alignText, [ Alignment.RIGHT, Alignment.TOP_RIGHT, Alignment.BOTTOM_RIGHT])),
            'r-r-float-left': this.state.alignIcon === Alignment.LEFT,
            'r-r-float-right': this.state.alignIcon === Alignment.RIGHT,
            'r-r-float-center': this.state.alignIcon === Alignment.CENTER,
            'r-r-width-100-percent': this.state.fillIcon
        });
        if (!isString) {
            var relayProps = ObjUtils.clone(this.state.icon.props);
            className = classNames(className, relayProps.className);
            relayProps.className = className;
            return React.cloneElement(this.state.icon, relayProps);
        }
        return <i className={className}></i>;
    }

    renderRightIcon() {
        if (!this.state.rightIcon || this.state.scheme == Scheme.SKELETON) {
            return null;
        }

        let isString = BoolUtils.isTypeOfAny(this.state.rightIcon, ["string"]);
        if (!isString && !React.isValidElement(this.state.rightIcon)) {
            return null;
        }
        let className = classNames('r-r-button-icon', isString ? this.state.rightIcon : this.state.rightIcon.props.className, {
            'r-r-float-right': this.state.fill
        });
        if (!isString) {
            var relayProps = ObjUtils.clone(this.state.rightIcon.props);
            relayProps.className = className;
            return React.cloneElement(this.state.rightIcon, relayProps);
        }
        return <i className={className}></i>;
    }

    renderText() {
        if (!this.state.text || this.state.scheme == Scheme.SKELETON) {
            return null;
        }

        let className = classNames({
            'r-r-margin-left-15px': this.state.icon && BoolUtils.equalsAny(this.state.alignIcon, [ Alignment.LEFT, Alignment.CENTER, Alignment.TOP_LEFT, Alignment.BOTTOM_LEFT ]),
            'r-r-margin-right-15px': (this.state.icon && BoolUtils.equalsAny(this.state.alignIcon, [ Alignment.RIGHT, Alignment.TOP_RIGHT, Alignment.BOTTOM_RIGHT]) || this.state.rightIcon),
            'r-r-float-left': this.state.alignText === Alignment.LEFT,
            'r-r-float-right': this.state.alignText === Alignment.RIGHT,
            'r-r-float-center': this.state.alignText === Alignment.CENTER
        })
        return <span className={className}>{this.state.text}</span>;
    }

    render() {
        let className = classNames(
            (this.state.scheme && !this.state.textonly && !this.state.outlined && !this.state.link) ? `${this.state.scheme}` : null, 
            (this.state.scheme && this.state.outlined) ? `${this.state.scheme}-border-1px` : null,
            (this.state.scheme && this.state.outlined && !this.state.textonly) ? `${this.state.scheme}-border-1px-bg-hover` : null,
            (this.state.scheme && (this.state.outlined || this.state.textonly || this.state.link)) ? `${this.state.scheme}-text` : null,
            (this.state.scheme && (!this.state.nostyle && this.state.scheme)) ? `${this.state.scheme}-border-3px-focus-box-shadow` : null, {
            'r-r-button': !this.state.nostyle,
            'r-r-button-vertical': BoolUtils.equalsAny(this.state.alignIcon, [Alignment.TOP, Alignment.BOTTOM]) && this.text,
            'r-r-disabled': !this.state.nostyle && this.state.disabled,
            'r-r-padding-left-right-20px': this.state.text,
            'r-r-width-100-percent r-r-display-block': this.state.fill,
            'r-r-button-rounded-border': !this.state.nostyle && this.state.rounded,
            'r-r-button-raised-border': !this.state.nostyle && this.state.raised,
            'r-r-button-textonly': !this.state.nostyle && (this.state.textonly || this.state.outlined),
            'r-r-no-background r-r-text-decoration-underline-hover': !this.state.nostyle && this.state.link,
            'r-r-no-border': !this.state.nostyle && (this.state.borderless || (this.state.textonly && !this.state.outlined) || this.state.link),
            
            'r-r-button-min-size r-r-loading r-r-skeleton': this.state.scheme === Scheme.SKELETON /*&& !(this.state.icon || this.state.rightIcon)*/,
            'r-r-button-min-size-icon-only r-r-loading r-r-skeleton': this.state.scheme === Scheme.SKELETON && (this.state.icon || this.state.rightIcon) && !this.state.text,

            'r-r-stateless': BoolUtils.equalsAny(this.state.scheme, [Scheme.STATELESS, Scheme.SKELETON]) && !this.state.link,
            'r-r-padding-0px': this.state.fillIcon
        }, 'r-r-button-theme', this.state.className);
        let icon = this.renderIcon();
        let rightIcon = this.renderRightIcon();
        let text = this.renderText();
        let iconPreText = BoolUtils.equalsAny(this.state.alignIcon, [ Alignment.CENTER, Alignment.LEFT, Alignment.TOP_LEFT, Alignment.BOTTOM_LEFT ]) ;
        let rightIconPreText = this.state.rightIcon && this.state.fill && this.state.rightIcon.indexOf('float-none') === -1 ;
        let componentProps = ObjUtils.findDiffKeys(this.props, Button.defaultProps);
        if (!componentProps.children) {
            componentProps.children = [];
        }
        componentProps.children.push(iconPreText ? icon : '');
        componentProps.children.push(rightIconPreText ? rightIcon : '');
        componentProps.children.push(text);
        componentProps.children.push(iconPreText ? '' : icon);
        componentProps.children.push(rightIconPreText ? '' : rightIcon);

        let element = this.state.link ? <a ref={(el) => this.element = el} {...componentProps} className={className}/>
                      : <button ref={(el) => this.element = el} {...componentProps} className={className}/>

        return element;
    }

}
