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

import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Scheme, Alignment } from "../variables";
import { ObjUtils, BoolUtils, DOMUtils, InputFilter } from "../../utils";
import { InputText } from "./InputText"

export class PasswordInputComponent extends Component {

    static defaultProps = {
        toggleMask: false,
        toggleIcons: {
            show: 'fa fa-eye',
            hide: 'fa fa-eye-slash'
        },
        onShow: null,
        onHide: null,
        forwardRef: null
    }

    static propTypes = {
        toggleMask: PropTypes.bool,
        toggleIcons: PropTypes.object,
        onShow: PropTypes.func,
        onHide: PropTypes.func,
        forwardRef: PropTypes.any
    }

    constructor(props) {
        super(props);
        this.state = {
            hidden: true  
        };
    }

    renderToggleIcon() {
        if (!this.props.toggleMask || !this.props.toggleIcons) {
            return;
        }
        let icon = this.state.hidden ? this.props.toggleIcons.show : this.props.toggleIcons.hide;
        const isString = BoolUtils.isTypeOfAny(icon, ["string"]);
        const onClick = (e) => {
            this.setState({
                hidden: !this.state.hidden
            });
        };
        if (isString) {
            icon += ' r-r-cursor-pointer';
            return <i className={icon} onClick={onClick}/>
        }
        const relayProps = ObjUtils.clone(icon.props);
        relayProps.onClick = onClick;
        relayProps.className = classNames(relayProps.className, 'r-r-cursor-pointer');
        return React.cloneElement(icon, relayProps);
    }

    render() {
        const type = this.state.hidden ? 'password' : 'text';
        const icon = this.renderToggleIcon();
        const relayProps = ObjUtils.findDiffKeys(this.props, PasswordInputComponent.defaultProps);

        return (
            <InputText {...relayProps} ref={this.props.forwardRef} type={type} rightIcon={icon}/>
        );
    }

}

export const PasswordInput = React.forwardRef((props, ref) => <PasswordInputComponent {...props} forwardRef={ref} />);