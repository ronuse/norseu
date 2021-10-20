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
import { DOMUtils, ObjUtils, BoolUtils } from "../../utils";
import { Scheme, Alignment, FilePreviewType } from "../variables";
import { BaseComponent } from "../BaseComponent";

export class FileInputComponent extends BaseComponent {

	static defaultProps = {
		scheme: null,
        id: null,
		name: null,
		label: null,
        noDefaultLabel: false,
		inputId: null,
		fileExtensions: null,
		previewType: "none",
		className: null,
		style: null,
        forwardRef: null,
        elementRef: null,
        fill: false,
        default: null,
        disablePreviewClick: false,
        multiple: false,
        customItemTemplate: null,
		onFilesSelected: null,
		onCompleteDialog: null,
		onCancelDialog: null,
	}

	static propTypes = {
		scheme: PropTypes.string,
        id: PropTypes.string,
		name: PropTypes.string,
		label: PropTypes.string,
        noDefaultLabel: PropTypes.bool,
		inputId: PropTypes.string,
		fileExtensions: PropTypes.arrayOf(PropTypes.string),
		previewType: PropTypes.string,
		className: PropTypes.string,
		style: PropTypes.object,
        forwardRef: PropTypes.any,
        elementRef: PropTypes.any,
        fill: PropTypes.bool,
        default: PropTypes.any,
        disablePreviewClick: PropTypes.bool,
        multiple: PropTypes.bool,
		customItemTemplate: PropTypes.func,
		onFilesSelected: PropTypes.func,
		onCompleteDialog: PropTypes.func,
		onCancelDialog: PropTypes.func,
	}

	constructor(props) {
		super(props);
		if (!this.props.onToggle) {
			this.state = {
				expanded: this.props.expanded
			};
		}

		this.id = this.props.id || DOMUtils.UniqueElementId();
		this.changePreview = this.changePreview.bind(this);
		this.onChangeHandler = this.onChangeHandler.bind(this);
		this.onPreviewClickHandler = this.onPreviewClickHandler.bind(this);
	}

	resolveForwardRef(extraValues) {
		super.resolveForwardRef({
			values: () => this.elementRef.files,
			value: () => ((this.elementRef.files && this.elementRef.files.len) ? event.target.files[0] : null),
			changePreview: this.changePreview,
			//toggle: this.togglePopover,
			/*showDropDown: () => { if (!this.state.popoverVisible) { this.togglePopover(event, true); } },
			hideDropDown: () => { if (this.state.popoverVisible) { this.togglePopover(event, true); } }*/
		});
	}

	componentDidMount() {

	}

	componentDidUpdate(prevProps) {

	}

	componentWillUnmount() {

	}

	getSpecificStyling() {
		if (!this.state.previewType) return {};
		if (this.state.previewType === FilePreviewType.IMAGE) {
			return {
				background: `url(${this.state.default})`
			};
		}
		return {};
	}

	formatAcceptedFileExtensions() {
		if (!this.state.fileExtensions) return "";
		return this.state.fileExtensions.reduce((accumulator, fileExtension, index, fileExtensions) => {
			let sanitizedFileExtension = "";
			if (fileExtension.indexOf(".") !== 0) { sanitizedFileExtension += "."; }
			sanitizedFileExtension += fileExtension;
			if (index < fileExtensions.length-1) { sanitizedFileExtension += ","; }
            return accumulator + sanitizedFileExtension;
        }, "");
	}

	onPreviewClickHandler(event) {
		if (this.state.disablePreviewClick || !this.elementRef || !this.elementRef.current) return;
		this.elementRef.current.click();
	}

	changePreview(url) {
		if (this.compoundRef && this.state.previewType !== FilePreviewType.NONE) {
			if (this.state.previewType === FilePreviewType.IMAGE) {
				this.compoundRef.style.background = `url(${url})`;
			}
		}
	}

	onChangeHandler(event) {
		if (!event.target || !event.target.files || event.target.files.length == 0) {
			if (this.state.onCancelDialog) this.state.onCancelDialog({ event });
		}
		if (this.state.onCompleteDialog) this.state.onCompleteDialog({ event });
		this.changePreview(URL.createObjectURL(event.target.files[0]));
		if (this.state.onFilesSelected) this.state.onFilesSelected({ event, files: event.target.files });
	}

	render() {
		const scheme = this.state.scheme;
		const className = classNames('r-r-fileinput', `r-r-fileinput-preview-type-${this.state.previewType}`, 
				(this.state.previewType !== FilePreviewType.NONE)
				? `${scheme} ${scheme}-border-2px ${scheme}-border-hover ${scheme}-border-2px-focus ${scheme}-border-3px-focus-box-shadow`
				: null, {
            'r-r-skeleton': this.state.scheme === Scheme.SKELETON,
            /*'r-r-margin-bottom-7px': alignLabel === Alignment.TOP,
            'r-r-margin-top-7px': alignLabel === Alignment.BOTTOM,
            'r-r-margin-right-7px': alignLabel === Alignment.LEFT,
            'r-r-margin-left-7px': alignLabel === Alignment.RIGHT,*/
        }, this.state.className); 
		const specificStyling = this.getSpecificStyling();
		const cursor = this.state.disablePreviewClick ? "initial" : "pointer";
		const style = { cursor, ...specificStyling, ...this.state.style };
		const supportedFileExtension = this.formatAcceptedFileExtensions();

		return (
			<div tabIndex="0" ref={(el) => this.compoundRef = el} className={className} style={style} onClick={this.onPreviewClickHandler}>
				<input ref={this.elementRef} 
					name={this.state.name} 
					style={ {display: "none"} } 
					type="file" 
					id={this.state.id} 
					accept={supportedFileExtension}
					onChange={this.onChangeHandler}/>
			</div>
		)
	}

}

export const FileInput = React.forwardRef((props, ref) => <FileInputComponent {...props} forwardRef={ref} />);

