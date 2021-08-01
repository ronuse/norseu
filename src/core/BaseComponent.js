
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
import { ObjUtils, BoolUtils } from "../utils";
import { Scheme, Alignment } from "./variables/";
 
export class BaseComponent extends Component {

    static defaultProps = {
        forwardRef: null,
        elementRef: null
    }

    static propTypes = {
        forwardRef: PropTypes.any,
        elementRef: PropTypes.any
    }

    constructor(props, ignoreList) {
        super(props);
        this.state = ObjUtils.clone(this.props, ignoreList);
        this.elementRef = React.createRef(this.props.elementRef);
        this.state.eventProps = ObjUtils.extractEventProps(this.props); // TODO ignore the event captured by the component itself
    }

    resolveForwardRef(extraValues) {
        let ref = this.props.forwardRef;
        if (ref) {
            const refValue = {
                value: () => this.elementRef.current.value,
                focus: () => { if (this.elementRef) { this.elementRef.current.focus() }; },
                getInternalElement: () => this.elementRef,
                getState: () => this.state,
                setState: (state) => this.setState(state),
                ...extraValues
            };
            if (typeof ref === 'function') {
                ref(refValue);
            } else {
                ref.current = refValue;
            }
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState(nextProps);
    }

    componentDidMount() {
        this.resolveForwardRef({});
    }

    componentDidUpdate(prevProps) {
        this.resolveForwardRef({});
    }
    
}
