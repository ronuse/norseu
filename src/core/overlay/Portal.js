
/**
 * MIT License
 * 
 * Copyright (c) 2021 Ronuse Agency, Adewale Azeez, Oyeleke Damilola.
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

import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import { Component } from 'react';

export class Portal extends Component {

	static defaultProps = {
		child: null,
		container: null,
		visible: false
	};

	static propTypes = {
		child: PropTypes.any,
		container: PropTypes.oneOfType([PropTypes.object, PropTypes.string]),
		visible: PropTypes.bool
	}; 

	constructor(props) {
		super(props);

		this.state = {
			hasdom: props.visible
		};
	}

	isDOMReady() {
		return (typeof window !== 'undefined' && window.document && window.document.createElement);
	}

	componentDidMount() {
		if (this.isDOMReady() && !this.state.hasdom) {
			this.setState({ hasdom: true });
		}
	}

	render() {
		if (this.props.child && this.state.hasdom) {
			const container = this.props.container || document.body;
			return container === 'self' ? this.props.child : ReactDOM.createPortal(this.props.child, container);
		}

		return null;
	}

}