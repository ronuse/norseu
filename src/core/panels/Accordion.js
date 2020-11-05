
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
import { BoolUtils, DOMUtils } from "../../utils";
import { Direction, Scheme, Alignment } from "../variables/";
import { Button } from "../buttons";
import { Panel } from "./Panel"


export class AccordionPanel extends Component {

    static defaultProps = {
        title: null,
        disabled: false,
        scheme: null,
        contentClassName: null,
        headerClassName: null,
        contentStyle: null,
        headerStyle: null
    }

    static propTypes = {
        title: PropTypes.string,
        disabled: PropTypes.bool,
        scheme: PropTypes.string,
        contentClassName: PropTypes.string,
        headerClassName: PropTypes.string,
        contentStyle: PropTypes.object,
        headerStyle: PropTypes.object
    }

}


export class Accordion extends Component {

    static defaultProps = {
        id: null,
        style: null,
        className: null,
        safely: null,
        alignNavigator: Alignment.TOP,
        activeTabIndex: 0,
        renderActiveTabOnly: false,
        onTabChange: null
    }

    static propTypes = {
        id: PropTypes.string,
        style: PropTypes.object,
        className: PropTypes.string,
        safely: PropTypes.bool,
        alignNavigator: PropTypes.string,
        activeTabIndex: PropTypes.number,
        renderActiveTabOnly: PropTypes.bool,
        onTabChange: PropTypes.func
    }

    constructor(props) {
        super(props);
        if (!this.props.onTabChange) {
            this.state = {
                activeTabIndex: this.props.activeTabIndex
            };
        }

        this.id = this.props.id || DOMUtils.UniqueElementId();
    }

    getActiveTabIndex() {
        return this.props.onTabChange ? this.props.activeTabIndex : this.state.activeTabIndex;
    }

    isSelectedTab(index) {
        return (index === this.getActiveTabIndex());
    }

    render() {
        return (
            <div className="r-r-accordion">
                    <div className="r-r-accordion-tab">
                        <div className="r-r-accordion-tab-header">
                            <Button className="r-r-accordion-tab-header-button" icon="r-r-accordion-tab-header-icon fa fa-angle-down" 
                                alignText={Alignment.LEFT} text="Section 1" fill/>
                        </div>
                        <Panel className="r-r-accordion-tab-panel">
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor 
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        </Panel>
                    </div>
                    <hr className="r-r-accordion-divider"/>

                    <div className="r-r-accordion-tab">
                        <div className="r-r-accordion-tab-header">
                            <Button className="r-r-accordion-tab-header-button" icon="r-r-accordion-tab-header-icon fa fa-angle-down" 
                                alignText={Alignment.LEFT} text="Section 2" fill/>
                        </div>
                        <Panel className="r-r-accordion-tab-panel">
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor 
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        </Panel>
                    </div>
                    <hr className="r-r-accordion-divider"/>

                    <div className="r-r-accordion-tab">
                        <div className="r-r-accordion-tab-header">
                            <Button className="r-r-accordion-tab-header-button" icon="r-r-accordion-tab-header-icon fa fa-angle-down" 
                                alignText={Alignment.LEFT} text="Section 3" fill/>
                        </div>
                        <Panel className="r-r-accordion-tab-panel">
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor 
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        </Panel>
                    </div>
                    <hr className="r-r-accordion-divider"/>

                    <div className="r-r-accordion-tab">
                        <div className="r-r-accordion-tab-header">
                            <Button className="r-r-accordion-tab-header-button" icon="r-r-accordion-tab-header-icon fa fa-angle-down" 
                                alignText={Alignment.LEFT} text="Section 4" fill/>
                        </div>
                        <Panel className="r-r-accordion-tab-panel">
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor 
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        </Panel>
                    </div>
                </div>
        )
    }

}