
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
import { Orientation, Overflow, Elevation } from '../core/variables';
import { ObjUtils, BoolUtils } from "../utils";

export class LinearLayout extends Component {

    static defaultProps = {
        orientation: Orientation.HORIZONTAL,
        padding: null,
        overflow: Overflow.Scroll,
        nofill: false,
        wrap: false,
        elevation: Elevation.NONE
    }

    static propTypes = {
        orientation: PropTypes.string,
        padding: PropTypes.number,
        overflow: PropTypes.string,
        nofill: PropTypes.bool,
        wrap: PropTypes.bool,
        elevation: PropTypes.string
    }

    constructor() {
        super();        
    }

    componentDidMount() {
        
    }

    componentWillUnmount() {
        
    }

    render() {
        let componentProps = ObjUtils.findDiffKeys(this.props, LinearLayout.defaultProps);
        let className = classNames('r-r-linear-layout', this.props.elevation, {
            'r-r-layout-horizontal': this.props.orientation !== Orientation.VERTICAL,
            'r-r-layout-vertical': this.props.orientation === Orientation.VERTICAL,
            'r-r-width-max-content': this.props.nofill,
            'r-r-flex-wrap': this.props.wrap
        }, this.props.className);
        let childrenSize = this.props.children ? this.props.children.length : 0;
        let children = !this.props.padding || !this.props.children ? this.props.children : React.Children.map(this.props.children, (child, index) => {
            if (React.isValidElement(child)) {
                var childRelayProps = ObjUtils.clone(child.props);
                if (!childRelayProps.style) {
                    childRelayProps.style = {};
                }
                childRelayProps.style.margin = this.props.padding;
                if (index == 0 && childrenSize > 1) {
                    if (this.props.orientation === Orientation.VERTICAL) {
                        childRelayProps.style.marginBottom = 0;
                    } else {
                        childRelayProps.style.marginRight = 0;
                    }
                } else if (index+1 === childrenSize && childrenSize > 2) {
                    if (this.props.orientation === Orientation.VERTICAL) {
                        childRelayProps.style.marginTop = 0;
                    } else {
                        childRelayProps.style.marginLeft = 0;
                    }
                }
                return React.cloneElement(child, childRelayProps);
            }
            return child;
        });

        return (
            <div ref={(el) => this.container = el} {...componentProps} className={className}>
                {children}
            </div>
        )
    }

}