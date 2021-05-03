
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
import React, { Component } from 'react';
import { Orientation } from '../core/variables';
import { ObjUtils } from "../utils";

export class ResizeSensor extends Component {

    static defaultProps = {
        minDimension: null,
        maxDimension: null,
        onDimensionChange: null
    }

    static propTypes = {
        minDimension: PropTypes.object,
        maxDimension: PropTypes.object,
        onDimensionChange: PropTypes.func
    }

    constructor(props) {
        super();
        this.state = {
            renderChildren: this.shouldRenderChildren(props.minDimension, props.maxDimension, document.documentElement.clientWidth, document.documentElement.clientHeight)
        };        
    }

    componentDidMount() {
        this.documentResizeListener = (event) => {
            const width = document.documentElement.clientWidth;
            const height = document.documentElement.clientHeight;
            if (this.props.onDimensionChange) {
                this.props.onDimensionChange({
                    event: event,
                    dimension: {width: width, height: height}
                });
            }
            this.setState({renderChildren: this.shouldRenderChildren(this.props.minDimension, this.props.maxDimension, width, height)});
        }

        window.addEventListener('resize', this.documentResizeListener);
    }

    componentWillUnmount() {
        if (this.documentResizeListener) {
            window.removeEventListener('resize', this.documentResizeListener);
            this.documentResizeListener = null;
        }
    }

    shouldRenderChildren(minDimension, maxDimension, screenWidth, screenHeight) {
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

    render() {
        let childrenProps = ObjUtils.clone(this.props, ["children", "minDimension", "minDimension", "onDimensionChange"]);
        const children = !this.state.renderChildren ? null : React.Children.map(this.props.children, child => {
            if (React.isValidElement(child)) {
                return React.cloneElement(child, {...child.props, ...childrenProps});
            }
            return child;
          });

        return (
            <React.Fragment>
                {(this.state.renderChildren) ? children : null}
            </React.Fragment>
        )
    }

}