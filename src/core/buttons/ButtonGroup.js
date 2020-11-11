
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
import { Direction } from "../variables/";

export class ButtonGroup extends Component {

    static defaultProps = {
        fill: null,
        direction: Direction.HORIZONTAL,
        scheme: null
    }

    static propTypes = {
        fill: PropTypes.bool,
        direction: PropTypes.string,
        scheme: PropTypes.string
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps) {

    }

    componentWillUnmount() {

    }

    prepareChildren() {
        if (!this.props.scheme && !this.props.fill) {
            return this.props.children;
        }

        let children = React.Children.map(this.props.children, child => {
            var relayProps = ObjUtils.clone(child.props);
            if (this.props.scheme && !relayProps.scheme) {
                relayProps.scheme = this.props.scheme;
            }
            if (this.props.fill) {
                relayProps.fill = true;
            }
            return React.cloneElement(child, relayProps);
        })
        return children;
    }

    render() {
        
        let className = classNames('r-r-button-group', {
            'r-r-flex-vertical': BoolUtils.equalsAny(this.props.direction, [Direction.VERTICAL]),
            'r-r-width-100-percent': this.props.fill
        }, this.props.className);
        let componentProps = ObjUtils.findDiffKeys(this.props, ButtonGroup.defaultProps);
        let children = this.prepareChildren();

        return (
            <div {...componentProps} className={className}>
                {children}
            </div>
        )
    }

}