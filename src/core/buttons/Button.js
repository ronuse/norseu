
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
import { ObjUtils, BoolUtils } from "../utils/";
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
        nostyle: false
    }

    static propTypes = {
        text: PropTypes.string,
        alignText: PropTypes.string,
        icon: PropTypes.string,
        alignIcon: PropTypes.string,
        rightIcon: PropTypes.string,
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
        nostyle: PropTypes.bool
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps) {

    }

    componentWillUnmount() {

    }

    renderIcon() {
        if (!this.props.icon || this.props.scheme == Scheme.SKELETON) {
            return null;
        }

        let className = classNames('r-r-button-icon', this.props.icon, {
            'r-r-margin-right-7px': this.props.rightIcon && (BoolUtils.equalsAny(this.props.alignIcon, [ Alignment.RIGHT, Alignment.TOP_RIGHT, Alignment.BOTTOM_RIGHT]) || 
                                    BoolUtils.equalsAny(this.props.alignText, [ Alignment.RIGHT, Alignment.TOP_RIGHT, Alignment.BOTTOM_RIGHT])),
            'r-r-float-left': this.props.alignIcon === Alignment.LEFT,
            'r-r-float-right': this.props.alignIcon === Alignment.RIGHT,
            'r-r-float-center': this.props.alignIcon === Alignment.CENTER
        });
        return <i className={className}></i>;
    }

    renderRightIcon() {
        if (!this.props.rightIcon || this.props.scheme == Scheme.SKELETON) {
            return null;
        }

        let className = classNames(this.props.rightIcon, {
            'r-r-float-right': this.props.fill
        });
        return <i className={className}></i>;
    }

    renderText() {
        if (!this.props.text || this.props.scheme == Scheme.SKELETON) {
            return null;
        }

        let className = classNames({
            'r-r-margin-left-7px': this.props.icon && BoolUtils.equalsAny(this.props.alignIcon, [ Alignment.LEFT, Alignment.TOP_LEFT, Alignment.BOTTOM_LEFT ]),
            'r-r-margin-right-7px': (this.props.icon && BoolUtils.equalsAny(this.props.alignIcon, [ Alignment.RIGHT, Alignment.TOP_RIGHT, Alignment.BOTTOM_RIGHT]) || this.props.rightIcon),
            'r-r-float-left': this.props.alignText === Alignment.LEFT,
            'r-r-float-right': this.props.alignText === Alignment.RIGHT,
            'r-r-float-center': this.props.alignText === Alignment.CENTER
        })
        return <span className={className}>{this.props.text}</span>;
    }

    render() {
        let className = classNames({
            'r-r-button': !this.props.nostyle,
            'r-r-button-vertical': BoolUtils.equalsAny(this.props.alignIcon, [Alignment.TOP, Alignment.BOTTOM]) && this.text,
            'r-r-disabled': !this.props.nostyle && this.props.disabled,
            'r-r-width-100-percent r-r-display-block': this.props.fill,
            'r-r-button-rounded-border': !this.props.nostyle && this.props.rounded,
            'r-r-button-raised-border': !this.props.nostyle && this.props.raised,
            'r-r-button-textonly': !this.props.nostyle && this.props.textonly || this.props.outlined,
            'r-r-no-background r-r-text-decoration-underline-hover': !this.props.nostyle && this.props.link,
            'r-r-no-border': !this.props.nostyle && this.props.borderless || this.props.textonly || this.props.link,

            'r-r-primary': this.props.scheme === Scheme.PRIMARY && !this.props.textonly && !this.props.outlined && !this.props.link,
            'r-r-secondary': this.props.scheme === Scheme.SECONDARY && !this.props.textonly && !this.props.outlined && !this.props.link,
            'r-r-success': this.props.scheme === Scheme.SUCCESS && !this.props.textonly && !this.props.outlined && !this.props.link,
            'r-r-info': this.props.scheme === Scheme.INFO && !this.props.textonly && !this.props.outlined && !this.props.link,
            'r-r-warning': this.props.scheme === Scheme.WARNING && !this.props.textonly && !this.props.outlined && !this.props.link,
            'r-r-danger': this.props.scheme === Scheme.DANGER && !this.props.textonly && !this.props.outlined && !this.props.link,
            
            'r-r-primary-text': this.props.scheme === Scheme.PRIMARY && (this.props.outlined || this.props.textonly || this.props.link),
            'r-r-secondary-text': this.props.scheme === Scheme.SECONDARY && (this.props.outlined || this.props.textonly || this.props.link),
            'r-r-success-text': this.props.scheme === Scheme.SUCCESS && (this.props.outlined || this.props.textonly || this.props.link),
            'r-r-info-text': this.props.scheme === Scheme.INFO && (this.props.outlined || this.props.textonly || this.props.link),
            'r-r-warning-text': this.props.scheme === Scheme.WARNING && (this.props.outlined || this.props.textonly || this.props.link),
            'r-r-danger-text': this.props.scheme === Scheme.DANGER && (this.props.outlined || this.props.textonly || this.props.link),
            
            'r-r-primary-border-1px': this.props.scheme === Scheme.PRIMARY && this.props.outlined,
            'r-r-secondary-border-1px': this.props.scheme === Scheme.SECONDARY && this.props.outlined,
            'r-r-success-border-1px': this.props.scheme === Scheme.SUCCESS && this.props.outlined,
            'r-r-info-border-1px': this.props.scheme === Scheme.INFO && this.props.outlined,
            'r-r-warning-border-1px': this.props.scheme === Scheme.WARNING && this.props.outlined,
            'r-r-danger-border-1px': this.props.scheme === Scheme.DANGER && this.props.outlined,
            
            'r-r-primary-border-1px-focus': !this.props.nostyle && this.props.scheme === Scheme.PRIMARY,
            'r-r-secondary-border-1px-focus': !this.props.nostyle && this.props.scheme === Scheme.SECONDARY,
            'r-r-success-border-1px-focus': !this.props.nostyle && this.props.scheme === Scheme.SUCCESS,
            'r-r-info-border-1px-focus': !this.props.nostyle && this.props.scheme === Scheme.INFO,
            'r-r-warning-border-1px-focus': !this.props.nostyle && this.props.scheme === Scheme.WARNING,
            'r-r-danger-border-1px-focus': !this.props.nostyle && this.props.scheme === Scheme.DANGER,
            'r-r-button-min-size r-r-loading r-r-skeleton': this.props.scheme === Scheme.SKELETON /*&& !(this.props.icon || this.props.rightIcon)*/,
            'r-r-button-min-size-icon-only r-r-loading r-r-skeleton': this.props.scheme === Scheme.SKELETON && (this.props.icon || this.props.rightIcon) && !this.props.text,

            'r-r-stateless': BoolUtils.equalsAny(this.props.scheme, [Scheme.STATELESS, Scheme.SKELETON]) && !this.props.link
        }, 'r-r-button-theme', this.props.className);
        let icon = this.renderIcon();
        let rightIcon = this.renderRightIcon();
        let text = this.renderText();
        let iconPreText = BoolUtils.equalsAny(this.props.alignIcon, [ Alignment.LEFT, Alignment.TOP_LEFT, Alignment.BOTTOM_LEFT ]) ;
        let componentProps = ObjUtils.findDiffKeys(this.props, Button.defaultProps);

        return (
            <button ref={(el) => this.element = el} {...componentProps} className={className}>
                { iconPreText ? icon : '' }
                { this.props.fill ? rightIcon : '' }
                { text }
                { iconPreText ? '' : icon }
                { this.props.fill ? '' : rightIcon }
            </button>
        )
    }

}
