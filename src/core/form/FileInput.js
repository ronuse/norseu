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

import ReactDOM from 'react-dom'
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
		previewType: FilePreviewType.IMAGE,
		className: null,
		style: null,
		previewPanelClassName: null,
		previewPanelStyle: null,
		previewItemScheme: null,
		previewItemClassName: null,
		previewItemStyle: null,
        forwardRef: null,
        elementRef: null,
        fill: false,
        defaultFileUrl: null,
        disablePreviewClick: false,
        multiple: false,
        noBorder: false,
        allowFileDrag: false,
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
		previewPanelClassName: PropTypes.string,
		previewPanelStyle: PropTypes.object,
		previewItemScheme: PropTypes.string,
		previewItemClassName: PropTypes.string,
		previewItemStyle: PropTypes.object,
        forwardRef: PropTypes.any,
        elementRef: PropTypes.any,
        fill: PropTypes.bool,
        defaultFileUrl: PropTypes.any,
        disablePreviewClick: PropTypes.bool,
        multiple: PropTypes.bool,
        noBorder: PropTypes.bool,
        allowFileDrag: PropTypes.bool,
		customItemTemplate: PropTypes.func,
		onFilesSelected: PropTypes.func,
		onCompleteDialog: PropTypes.func,
		onCancelDialog: PropTypes.func,
	}

	constructor(props) {
		super(props);
		this.id = this.props.id || DOMUtils.UniqueElementId();
		this.buildLabel = this.buildLabel.bind(this);
		this.onDropEvent = this.onDropEvent.bind(this);
		this.changePreview = this.changePreview.bind(this);
		this.onDropOverEvent = this.onDropOverEvent.bind(this);
		this.onChangeHandler = this.onChangeHandler.bind(this);
		this.onPreviewClickHandler = this.onPreviewClickHandler.bind(this);
	}

	resolveForwardRef(extraValues) {
		super.resolveForwardRef({
			values: () => this.elementRef.files,
			value: () => ((this.elementRef.files && this.elementRef.files.len) ? event.target.files[0] : null),
			changePreview: this.changePreview
		});
	}

	componentDidMount() {
		if (this.props.defaultFileUrl) {
			this.changePreview([this.props.defaultFileUrl], null, null, null);
		}
	}

	componentDidUpdate(prevProps) {

	}

	componentWillUnmount() {

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

	changePreview(urls, names, sizes, types) {
		if (urls && urls.length > 0 && this.compoundRef && this.state.previewType !== FilePreviewType.NONE) {
			this.compoundRef.style.background = `none`;
			const imputElementNode = this.elementRef.current;
			const scheme = this.state.previewItemScheme;
			const previewItems = [];
			let nodeClassName = classNames(this.state.previewItemClassName, 
				(scheme ? `${scheme} ${scheme}-border-2px ${scheme}-border-hover ${scheme}-border-2px-focus ${scheme}-border-3px-focus-box-shadow` : null));
			if (this.state.previewType === FilePreviewType.IMAGE) {
				nodeClassName += ` norseu-fileinput-preview-type-image`;
				urls.forEach(url => previewItems.push(<img key={url} className={nodeClassName} style={this.state.previewItemStyle} alt={url} src={url}/>));
			} else if (this.state.previewType === FilePreviewType.VIDEO) {
				nodeClassName += ` norseu-fileinput-preview-type-video`;
				urls.forEach(url => {
					previewItems.push(<video key={url} className={nodeClassName}style={this.state.previewItemStyle} controls>
							<source src={url}/> Your browser does not support the video tag.
						</video>);
				});
			} else if (this.state.previewType === FilePreviewType.AUDIO) {
				nodeClassName += ` norseu-fileinput-preview-type-audio`;
				urls.forEach(url => previewItems.push(<audio key={url} className={nodeClassName} style={this.state.previewItemStyle} controls>
							<source src={url}/> Your browser does not support the video tag.
						</audio>)
				);
			} else if (this.state.previewType === FilePreviewType.PDF || this.state.previewType === FilePreviewType.TEXT) {
				nodeClassName += ` norseu-fileinput-preview-type-pdf`;
				urls.forEach(url => previewItems.push(<iframe key={url} className={nodeClassName} style={this.state.previewItemStyle} src={url} frameBorder="0" />));
			} else if (this.state.previewType === FilePreviewType.BINARY || this.state.previewType === FilePreviewType.CUSTOM) {
				this.previewRef.style.flexDirection = "column";
				nodeClassName += ` norseu-fileinput-preview-type-binary`;
				urls.forEach((url, index) => {
					if (this.state.previewType === FilePreviewType.BINARY) {
						const name = (names) ? names[index] : "Unknown File " + index;
						const size =  (sizes) ? ObjUtils.humanFileSize(sizes[index]) : "0.00 kb";
						previewItems.push(<span key={url} className={nodeClassName} style={this.state.previewItemStyle}><i className="fa fa-file"></i> {name} ({size})</span>);
					} else if (this.state.previewType === FilePreviewType.CUSTOM && this.state.customItemTemplate) {
						previewItems.push(this.state.customItemTemplate(url, (names ? names[index] : null), (sizes ? sizes[index] : null), (types ? types[index] : null)));
					}
				});
			}
			ReactDOM.render(previewItems, this.previewRef);
		}
	}

	resolveSelectedFiles(files) {
		const urls = [];
		const names = [];
		const sizes = [];
		const types = [];
		for (const file of files) {
			urls.push(URL.createObjectURL(file));
			names.push(file.name);
			sizes.push(file.size);
			types.push(file.type);
		};
		this.changePreview(urls, names, sizes, types);
	}

	onChangeHandler(event) {
		if (!event.target || !event.target.files || event.target.files.length == 0) {
			if (this.state.onCancelDialog) this.state.onCancelDialog({ event });
			return;
		}
		if (this.state.onCompleteDialog) this.state.onCompleteDialog({ event });
		if (this.state.previewType !== FilePreviewType.NONE) {
			this.resolveSelectedFiles(event.target.files);
		}
		if (this.state.onFilesSelected) this.state.onFilesSelected({ event, files: event.target.files });
	}

	onDropOverEvent(event) {
		if (this.state.onDrop) this.state.onDropOver(event);
		event.preventDefault();
	}

	onDropEvent(event) {
		if (this.state.allowFileDrag && event.dataTransfer && event.dataTransfer.files) {
			this.resolveSelectedFiles(event.dataTransfer.files);
			event.preventDefault();
		}
		if (this.state.onDrop) this.state.onDrop(event);
	}

	buildLabel() {
		if (!this.state.label) return;
		let isString = BoolUtils.isTypeOfAny(this.state.label, ["string"]);
		let className = 'norseu-fileinput-label';
		if (!isString) {
			var relayProps = ObjUtils.clone(this.state.label.props);
			relayProps.className = className + " " + relayProps.className;
			return React.cloneElement(this.state.label, relayProps);
		}
		return <div className={className}>{this.state.label}</div>;
	}

	render() {
		const scheme = this.state.scheme;
		const className = classNames('norseu-fileinput', /*`norseu-fileinput-${this.state.previewType}`,*/
				(!this.state.noBorder)
				? `${scheme} ${scheme}-border-2px ${scheme}-border-hover ${scheme}-border-2px-focus ${scheme}-border-3px-focus-box-shadow`
				: null, {
            'norseu-skeleton': this.state.scheme === Scheme.SKELETON,
            'norseu-fileinput-no-default': this.state.defaultFileUrl
        }, this.state.className); 
		const previewClassName = classNames('norseu-fileinput-preview-panel', this.state.previewPanelClassName); 
		const label = this.buildLabel();
		const cursor = this.state.disablePreviewClick ? "initial" : "pointer";
		const style = { cursor, ...this.state.style };
		const supportedFileExtension = this.formatAcceptedFileExtensions();

		return (
			<div tabIndex="0" ref={(el) => this.compoundRef = el} className={className} style={style} onClick={this.onPreviewClickHandler} 
				onDragOver={this.onDropOverEvent} onDrop={this.onDropEvent}>

				<div ref={(el) => this.previewRef = el} className={previewClassName} style={this.state.previewPanelStyle}> </div>
				<input ref={this.elementRef} 
					name={this.state.name} 
					style={ {display: "none"} } 
					multiple={this.state.multiple ? "multiple" : ""}
					type="file" 
					id={this.state.id} 
					accept={supportedFileExtension}
					onChange={this.onChangeHandler}/>
				{label}
			</div>
		)
	}

}

export const FileInput = React.forwardRef((props, ref) => <FileInputComponent {...props} forwardRef={ref} />);

