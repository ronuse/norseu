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
import { DOMUtils, BoolUtils, ObjUtils } from "../../utils";
import { Scheme, Alignment } from "../variables";

export class Checkbox extends Component {

    static defaultProps = {
        scheme: null,
        label: null,
        id: null,
        name: null,
        required: false,
        align: Alignment.LEFT,
        checkStates: [
            {
                value: "un-checked",
                icon: null,
                scheme: null,
                checked: false
            },
            {
                value: "checked",
                icon: "fa fa-check",
                scheme: null,
                checked: true
            }
        ],
        checked: false,
        checkedIndex: -1,
        style: null,
        className: null,
        disabled: false,
        readOnly: false,
        nostyle: false,
        selfManaged: false,
        onChange: null,
        onMouseDown: null
    }

    static propTypes = {
        scheme: PropTypes.string,
        label: PropTypes.string,
        id: PropTypes.string,
        name: PropTypes.string,
        required: PropTypes.bool,
        align: PropTypes.string,
        checkStates: PropTypes.array,
        checked: PropTypes.bool,
        checkedIndex: PropTypes.number,
        style: PropTypes.string,
        className: PropTypes.string,
        disabled: PropTypes.bool,
        readOnly: PropTypes.bool,
        nostyle: PropTypes.bool,
        selfManaged: PropTypes.bool,
        onChange: PropTypes.func,
        onMouseDown: PropTypes.func
    }

    constructor(props) {
        super(props);
        this.state = {
            checkedIndex: this.props.checkedIndex
        };

        this.id = this.props.id; 
        if (!this.id && this.props.label) { 
            this.id = DOMUtils.UniqueElementId();
        }
    }

    componentDidMount() {

    }

    componentDidUpdate(prevProps) {

    }

    componentWillUnmount() {

    }

    onChange(event, checkedIndex) {
        checkedIndex += 1;
        const checkStatesSize = this.props.checkStates.length;
        if (checkedIndex >= checkStatesSize) {
            checkedIndex = 0;
        }
        if (!this.props.selfManaged) {
            this.setState({
                checkedIndex: checkedIndex
            })
        }
        let checkState = this.props.checkStates[checkedIndex] ;
        if (this.props.onChange) {
            this.props.onChange({
                event: event,
                checked: checkState.checked,
                value: checkState.value,
                checkedIndex: checkedIndex
            });
        }
    }

    renderInput(checked) {
        if (!this.props.name) {
            return;
        }

        let element = <input type="checkbox" 
            id={this.id} 
            name={this.props.name} 
            required={this.props.required}
            disabled={this.props.readOnly}
            defaultChecked={checked.checked}
        />;
        return element;
    }

    renderBox(checkedIndex, checked) {
        let scheme = checked.scheme || this.props.scheme;
        let className = classNames(
            (scheme && checked.icon) ? `${scheme} ${scheme}-border-2px` : null,
            (scheme && !checked.icon) ? `${scheme}-border-hover` : null, 
            (scheme && this.props.scheme ? `${scheme}-border-2px-focus ${scheme}-border-3px-focus-box-shadow` : null), {
            'r-r-skeleton r-r-loading': this.props.scheme === Scheme.SKELETON,
            'r-r-checkbox-box': !this.props.nostyle,
            'r-r-margin-right-10px': BoolUtils.equalsAny(this.props.align, [Alignment.LEFT, Alignment.CENTER]),
            'r-r-margin-left-10px': BoolUtils.equalsAny(this.props.align, [Alignment.RIGHT]),
            'r-r-margin-bottom-10px': BoolUtils.equalsAny(this.props.align, [Alignment.TOP, Alignment.TOP_LEFT, Alignment.TOP_CENTER, Alignment.TOP_RIGHT]),
            'r-r-margin-top-10px': BoolUtils.equalsAny(this.props.align, [Alignment.BOTTOM, Alignment.BOTTOM_LEFT, Alignment.BOTTOM_CENTER, Alignment.BOTTOM_RIGHT]),
            'r-r-align-self-center': this.props.align === Alignment.TOP_CENTER || this.props.align === Alignment.BOTTOM_CENTER,
            'r-r-align-self-flex-end': this.props.align === Alignment.TOP_RIGHT || this.props.align === Alignment.BOTTOM_RIGHT
        });
        let icon = checked.icon ? <i className={checked.icon}/> : null;

        return (
            <div tabIndex="1" className={className} onClick={(e) => {
                    this.onChange(e, checkedIndex, checked);
                }} onMouseDown={this.props.onMouseDown} 
                aria-checked={checked.checked}>

                {icon}
            </div>
        )
    }

    renderLabel() {
        if (!this.props.label) {
            return;
        }
        let isString = BoolUtils.isTypeOfAny(this.props.label, ["string"]);
        if (!isString && !React.isValidElement(this.props.label)) {
            throw new Error("Only string or a valid react element is expected as the checkbox label");
        }

        let className = classNames({
            'r-r-skeleton r-r-loading': this.props.scheme === Scheme.SKELETON
        }, 'r-r-checkbox-label'); 
        if (isString) {
            return (
                <label className={className} htmlFor={this.id}>{this.props.label}</label>
            )
        }
        var relayProps = ObjUtils.clone(this.props.label.props);
        relayProps.className += ' ' + className;
        return React.cloneElement(this.props.label, relayProps);
    }

    getCheckStatesIndex() {
        const checkStatesSize = this.props.checkStates.length;
        let checkedIndex = this.props.checkedIndex;
        if (this.state.checkedIndex !== undefined) {
            checkedIndex = this.state.checkedIndex;
        }
        checkedIndex = checkedIndex == -1 ? (this.props.checked ? 1 : 0) : checkedIndex;
        if (checkedIndex >= checkStatesSize) {
            checkedIndex = 0;
        }
        return checkedIndex;
    }

    render() {
        let checkedIndex = this.getCheckStatesIndex();
        let checked = this.props.checkStates[checkedIndex] ;
        let className = classNames({
            'r-r-checkbox': !this.props.nostyle,
            'r-r-disabled r-r-noselect': !this.props.nostyle && this.props.disabled,
            'r-r-readonly': !this.props.nostyle && this.props.readOnly,
            'r-r-flex-direction-row-reverse': !this.props.align.startsWith(Alignment.BOTTOM) && !this.props.align.startsWith(Alignment.TOP) && 
                                                BoolUtils.equalsAny(this.props.align, [Alignment.RIGHT]),
            'r-r-flex-direction-column': this.props.align.startsWith(Alignment.TOP),
            'r-r-flex-direction-column-reverse': this.props.align.startsWith(Alignment.BOTTOM)
        }, 'r-r-checkbox-theme', this.props.className);
        let input = this.renderInput(checked);
        let box = this.renderBox(checkedIndex, checked);
        let label = this.renderLabel();

        return (
            <div className={className} style={this.props.style}>
                    {input}
                    {box}
                    {label}
                </div>
        )
    }

}