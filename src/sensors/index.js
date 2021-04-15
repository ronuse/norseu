
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

 export { ViewportSensor } from "./ViewportSensor"
 export { ResizeSensor } from "./ResizeSensor"

 /* On Page Load Complete */
const __onPageLoadedCallbacks = [];
window.onload = (event) => {
    for (const __onPageLoadedCallback of __onPageLoadedCallbacks) {
        __onPageLoadedCallback.callback(event, __onPageLoadedCallback.data);
    }
};
export const rrFireAfterPageloadComplete = (cb, data) => {
    __onPageLoadedCallbacks.push({ data: data, callback: cb});
}

/* Resize Sensor */
const __resizeCallbacks = [];
const __onResizeCallback = (event) => {
    const dimension = {
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
        event: event
    }
    for (const __resizeCallback of __resizeCallbacks) {
        __resizeCallback.callback(dimension, __resizeCallback.data);
    }
};
window.addEventListener('resize', __onResizeCallback);
export const rrAttachToResizeListener = (cb, data) => {
    __resizeCallbacks.push({ data: data, callback: cb});
}
// Match Div Dimensions
export const rrattachToResizeAdaptor = (params) => {
    rrAttachToResizeListener(function(dimension, data) {
        if (!data.dimension || !data.main || !data.adapters) {
            return;
        }
        const adaptWidth = data.dimension.indexOf('width') > -1;
        const adaptHeight = data.dimension.indexOf('height') > -1;
        const widthDifference = data.widthDifference ? data.widthDifference : 0;
        const heightDifference = data.heightDifference ? data.heightDifference : 0;
        for (const adapter of data.adapters) {
            let width = data.main.width();
            let height = data.main.height();
            width = width <= 0 && data.alternateMain ? data.alternateMain.width() : width;
            height = height <= 0 && data.alternateMain ? data.alternateMain.height() : width;
            if (adaptWidth) {
                adapter.width((width - widthDifference));
            }
            if (adaptHeight) {
                adapter.height((height - heightDifference));
            }
        }
    }, params);
}

/* High level Operations */
const rrReFireBasis = () => {
    rrFireAfterPageloadComplete(__onResizeCallback, null);
}
rrReFireBasis();