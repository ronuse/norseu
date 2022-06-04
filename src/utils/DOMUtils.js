
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

let uniqueElementIdsCount = 0;

export class DOMUtils {

	static getBrowser() {
		if(!this.browser) {
			let matched = this.resolveUserAgent();
			this.browser = {};

			if (matched.browser) {
				this.browser[matched.browser] = true;
				this.browser['version'] = matched.version;
			}
			if (this.browser['chrome']) {
				this.browser['webkit'] = true;
			} else if (this.browser['webkit']) {
				this.browser['safari'] = true;
			}
		}

		return this.browser;
	}

	static resolveUserAgent() {
		let ua = navigator.userAgent.toLowerCase();
		let match = /(chrome)[ ]([\w.]+)/.exec(ua) ||
			/(webkit)[ ]([\w.]+)/.exec(ua) ||
			/(opera)(?:.*version|)[ ]([\w.]+)/.exec(ua) ||
			/(msie) ([\w.]+)/.exec(ua) ||
			(ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua)) ||
			[];

		return {
			browser: match[1] || "",
			version: match[2] || "0"
		};
	}

	static UniqueElementId() {
		return 'ronuse-auto-id-' + (uniqueElementIdsCount++)
	}

	static matchStyles(sourceElement, targetElements, styleKeys) {
		if (!sourceElement || !targetElements || !styleKeys || 
			!targetElements.length || !styleKeys.length || 
			targetElements.length < 1 || styleKeys.length < 1) return;

		function convertToCamelCase(styleKey) {
			if (styleKey.indexOf("-") < 0) return styleKey;
			let newStyleKey = "";
			for (let index = 0; index < styleKey.length; index++) {
				let ch = styleKey[index];
				if (ch === '-') {
					if (index+1 < styleKey.length) {
						newStyleKey += styleKey[++index].toUpperCase();
					}
					continue;
				}
				newStyleKey += ch;
			}
			return newStyleKey;
		}

		styleKeys.forEach(styleKey => {
			const styleProp = window.getComputedStyle(sourceElement, null).getPropertyValue(styleKey);
			targetElements.forEach(targetElement => {
				if (!targetElement.style) targetElement.style = {};
				targetElement.style[convertToCamelCase(styleKey)] = styleProp;
			});
		});
	}

	static hasClass(el, className) {
		if (el) {
			if (el.classList) {
				return el.classList.contains(className);
			} else {
				return new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
			} 
		}
	}
	
	static addClass(el, className) {
		if (el && className) {
			if (el.classList) {
				el.classList.add(className);
			} else {
				el.className += ' ' + className;
			}
		}
	}

	static removeClass(el, className) {
		if (el && className) {
			if (el.classList) {
				el.classList.remove(className);
			} else {
				el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
			} 
		}
	}

	static isElement(obj) {
		return (typeof HTMLElement === "object" ? obj instanceof HTMLElement :
			obj && typeof obj === "object" && obj !== null && obj.nodeType === 1 && typeof obj.nodeName === "string"
		);
	}

	static appendChild(element, target) {
		if (this.isElement(target)) {
			target.appendChild(element);
		} else if (target && target.el && target.el.nativeElement) {
			target.el.nativeElement.appendChild(element);
		} else {
			throw new Error('AppendChild: Cannot append ' + target + ' to ' + element);
		}
	}

	static addClasses(element, className) {
		if (element && className) {
			if (element.classList) {
				let styles = className.split(' ');
				for (let index = 0; index < styles.length; index++) {
					element.classList.add(styles[index]);
				}

			} else {
				let styles = className.split(' ');
				for (let index = 0; index < styles.length; index++) {
					element.className += ' ' + styles[index];
				}
			}
		}
	}

	static getViewport() {
		let win = window,
			d = document,
			e = d.documentElement,
			g = d.getElementsByTagName('body')[0],
			w = win.innerWidth || e.clientWidth || g.clientWidth,
			h = win.innerHeight || e.clientHeight || g.clientHeight;

		return {width: w, height: h};
	}

	static getDocumentScrollTop() {
		let doc = document.documentElement;
		return (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0);
	}

	static getDocumentScrollLeft() {
		let doc = document.documentElement;
		return (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0);
	}

	static getElementOffset(element) {
		if (!element) {
			return {
				top: 'auto',
				left: 'auto'
			};
		}
		let rect = element.getBoundingClientRect();
		return {
			top: rect.top + (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0),
			left: rect.left + (window.pageXOffset || document.documentElement.scrollLeft || document.body.scrollLeft || 0),
		};
		
	}

	static absolutePositionRelatively(element, target) {
		if (!element || !target) return;
		let elementDimensions = element.offsetParent ? { width: element.offsetWidth, height: element.offsetHeight } : this.getHiddenElementDimensions(element);
		let targetOuterWidth = target.offsetWidth;
		let targetOuterHeight = target.offsetHeight;
		let elementOuterWidth = elementDimensions.width;
		let elementOuterHeight = elementDimensions.height;
		let targetOffset = target.getBoundingClientRect();
		let windowScrollTop = this.getDocumentScrollTop();
		let windowScrollLeft = this.getDocumentScrollLeft();
		let viewport = this.getViewport();
		let top, left;

		if (targetOffset.top + targetOuterHeight + elementOuterHeight > viewport.height) {
			top = targetOffset.top + windowScrollTop - elementOuterHeight;
			if(top < 0) top = windowScrollTop;
			element.style.transformOrigin = 'bottom'; top -= 3;
		} else {
			top = targetOuterHeight + targetOffset.top + windowScrollTop;
			element.style.transformOrigin = 'top'; top += 3;
		}
		if (targetOffset.left + targetOuterWidth + elementOuterWidth > viewport.width) {
			//left = targetOffset.left;
			left = Math.max(0, targetOffset.left + windowScrollLeft + targetOuterWidth - elementOuterWidth);
			left -= 4;
		} else {
			left = targetOffset.left + windowScrollLeft; left += 1;
		}
		element.style.top = top + 'px';
		element.style.left = left + 'px';
	}

	static querySelector(element, selector) {
		if (!element) return null;
		return element.querySelector(selector);
	}

	static getElementParents(element, parents = []) {
		return element['parentNode'] ? this.getElementParents(element.parentNode, parents.concat([element.parentNode])) : parents;
	}

	static getScrollableParents(element) {
		let scrollableParents = [];
		if (!element) return scrollableParents;

		let elementParents = this.getElementParents(element);
		const scrollRegex = /(auto|scroll)/;
		const checkIfScrolable = (node) => {
			let cssStyleDeclaration = window['getComputedStyle'](node, null);
			return scrollRegex.test(cssStyleDeclaration.getPropertyValue('overflow')) || 
				scrollRegex.test(cssStyleDeclaration.getPropertyValue('overflowX')) || 
				scrollRegex.test(cssStyleDeclaration.getPropertyValue('overflowY'));
		};
		for (let elementParent of elementParents) {
			let scrollSelectors = elementParent.nodeType === 1 && elementParent.dataset['scrollselectors'];
			if (scrollSelectors) {
				let selectors = scrollSelectors.split(',');
				for (let selector of selectors) {
					let el = this.querySelector(elementParent, selector);
					if (el && checkIfScrolable(el)) scrollableParents.push(el);
				}
			}
			if (elementParent.nodeType !== 9 && checkIfScrolable(elementParent)) {
				scrollableParents.push(elementParent);
			}
		}
		return scrollableParents;
	}

	static ScrollHandler_(element, listener) {
		let scrollableParents = !element ? [] : this.getScrollableParents(element);

		const attachScrollListerner = () => {
			for (let index = 0; index < scrollableParents.length; index++) {
				scrollableParents[index].addEventListener('scroll', listener);
			}
		}

		const detachScrollListerner = () => {
			if (!scrollableParents || scrollableParents.length === 0) return;
			for (let index = 0; index < scrollableParents.length; index++) {
				scrollableParents[index].removeEventListener('scroll', listener);
			}
		}

		return {
			attach: attachScrollListerner,
			detach: detachScrollListerner
		};
	}

	static ScrollHandler = this.ScrollHandler_;

	static BaseZIndexes = {
		menu: 1000,
		overlay: 1000,
		modal: 1001,
		tooltip: 10001,
		toast: 10002
	}

	static ZIndexHandler_() {
		let zIndexes = [];

		const generateZIndex = (key, baseZIndex) => {
			baseZIndex = baseZIndex || this.BaseZIndexes[key];
			let lastZIndex = (zIndexes.length > 0) ? zIndexes[zIndexes.length - 1] || 999 : { key, value: baseZIndex };
			let newZIndex = lastZIndex.value + (lastZIndex.key === key ? 0 : baseZIndex) + 1;
			zIndexes.push({ key, value: newZIndex });
			return newZIndex;
		}
	
		const getCurrentZIndex = () => {
			return zIndexes.length > 0 ? zIndexes[zIndexes.length - 1].value : 0;
		}
		
		return {
			get: (key) => this.BaseZIndexes[key] || 999,
			set: (key, el, zIndex) => {
				if (el && el.style) {
					el.style.zIndex = String(generateZIndex(key, zIndex));
				}
			},
			remove: (key) => delete zIndexes[key],
			removeElementZIndex: (el) => {
				if (el) {
					const zIndex = this.ZIndexHandler.getElementZIndex(el);
					zIndexes = zIndexes.filter(item => item.value !== zIndex);
					el.style.zIndex = '';
				}
			},
			getElementZIndex: (el) => (el && el.style) ? parseInt(el.style.zIndex) || 0 : 0,
			getCurrentZIndex
		};
	}

	static ZIndexHandler = this.ZIndexHandler_();

}
