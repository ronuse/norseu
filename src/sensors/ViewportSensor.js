
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
import { DOMUtils, ObjUtils } from "../utils/";

export class ViewportSensor extends Component {

    static defaultProps = {
        scrollContainerRef: null,
        onEnterViewport: null,
        onExitViewport: null,
        orientation: Orientation.HORIZONTAL_VERTICAL
    }

    static propTypes = {
        scrollContainerRef: PropTypes.any,
        onEnterViewport: PropTypes.func,
        onExitViewport: PropTypes.func,
        orientation: PropTypes.string
    }

    constructor() {
        super();
        this.state = {
            inViewport: false,
            renderChildren: false
        };
        this.attachScrollEvent = this.attachScrollEvent.bind(this);
    }

    attachScrollEvent(waitUntilDOMReady) {
        if (this.documentScrollListener) {
            return;
        }
        let scrollContainer = (this.props.scrollContainerRef && this.props.scrollContainerRef.current && ObjUtils.isFunction(this.props.scrollContainerRef.current.addEventListener)
                                ? this.props.scrollContainerRef.current : null);
        if (!scrollContainer) { 
            if (waitUntilDOMReady) { return; }
            scrollContainer = window;
        }
        this.documentScrollListener = (event) => {
            let inViewport = this.inViewport();
            if (inViewport) {
                if (!this.state.inViewport) {
                    let doRender = true;
                    if (this.props.onEnterViewport) {
                        doRender = this.props.onEnterViewport(event);
                    }
                    this.setState({inViewport: true, renderChildren: doRender});
                } 
            } else {
                if (this.state.inViewport) {
                    let doRender = true;
                    if (this.props.onExitViewport) {
                        doRender = !this.props.onExitViewport(event);
                    }
                    this.setState({inViewport: false, renderChildren: doRender});
                }
            }
        }

        scrollContainer.addEventListener('scroll', this.documentScrollListener);
    }

    componentDidUpdate(prevProps) {
        this.attachScrollEvent(true);
    }

    componentDidMount() {
        this.attachScrollEvent(true);
    }

    componentWillUnmount() {
        if (this.documentScrollListener) {
            const scrollContainer = (this.props.scrollContainerRef && this.props.scrollContainerRef.current && ObjUtils.isFunction(this.props.scrollContainerRef.current.addEventListener)
                                    ? this.props.scrollContainerRef.current : window);
            scrollContainer.removeEventListener('scroll', this.documentScrollListener);
            this.documentScrollListener = null;
        }
    }

    inViewport() {  
        let rect = this.container.getBoundingClientRect();    
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    render() {
        return (
            <div ref={(el) => this.container = el}>
                {(this.state.renderChildren) ? this.props.children : null}
            </div>
        )
    }

}