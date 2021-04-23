
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

    static ZIndexHandler_() {

        const BaseZIndexes = {
            menu: 1000,
            overlay: 1000,
            modal: 1001,
            tooltip: 10001
        }
        let zIndexes = [];

        const generateZIndex = (key, baseZIndex) => {
            baseZIndex = baseZIndex || BaseZIndexes[key];
            let lastZIndex = (zIndexes.length > 0) ? zIndexes[zIndexes.length - 1] || 999 : { key, value: baseZIndex };
            let newZIndex = lastZIndex.value + (lastZIndex.key === key ? 0 : baseZIndex) + 1;
            zIndexes.push({ key, value: newZIndex });
            return newZIndex;
        }
    
        const getCurrentZIndex = () => {
            return zIndexes.length > 0 ? zIndexes[zIndexes.length - 1].value : 0;
        }
        
        return {
            get: (key) => getZIndex(key),
            set: (key, el, zIndex) => {
                if (el && el.style) {
                    el.style.zIndex = String(generateZIndex(key, zIndex));
                }
            },
            remove: (key) => delete zIndexes[key],
            removeElementZIndex: (el) => {
                if (el) {
                    const zIndex = ZIndexHandler.getZIndex(el);
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
