
/**
 * MIT License
 * 
 * Copyright (c) 2022 Ronuse Agency, Adewale Azeez, Oyeleke Damilola.
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

export class StyleCreator {

    //https://stackoverflow.com/a/5624139/6626422
    static rgbToHex(r, g, b) {
        return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1);
    }

    //https://stackoverflow.com/a/5624139/6626422
    static hexToRgb(hex) {
        var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
            hex = hex.replace(shorthandRegex, function(m, r, g, b) {
            return r + r + g + g + b + b;
        });
        var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
                r: parseInt(result[1], 16),
                g: parseInt(result[2], 16),
                b: parseInt(result[3], 16)
            } : null;
    }

    static transSchemeColorCss(color, opacity) {
        const rgb = StyleCreator.hexToRgb(color);
        return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${opacity})`;
    }
    
    static generateSchemeBasicCss(options) {
        let transValue3 = StyleCreator.transSchemeColorCss(options.baseColor, ".3");
        let transValue7 = StyleCreator.transSchemeColorCss(options.baseColor, ".7");

        return `/* style.css */\n`
            + `.norseu-${options.name} { color: ${options.textColor}; border: 1px solid ${options.baseColor}; background-color: ${options.baseColor}; }\n`
            + `.norseu-${options.name}-text { color: ${options.baseColor}; }`
            + `.norseu-${options.name}-border-color { border-color: ${options.baseColor}; }`
            + `.norseu-${options.name}-border-bottom-color-hover:hover { border-bottom-color: ${options.baseColor}; }`
            + `.norseu-${options.name}-border-bottom-color-focus:focus { border-bottom-color: ${options.baseColor}; }\n`
            + `.norseu-${options.name}-border-bottom-color { border-bottom-color: ${options.baseColor}; }\n`
            + `.norseu-${options.name}-border-top-color { border-top-color: ${options.baseColor}; }\n`
            + `.norseu-${options.name}-border-1px { border: 1px solid ${options.baseColor} !important; }\n`
            + `.norseu-${options.name}-border-2px { border: 2px solid ${options.baseColor} !important; }\n`
            + `.norseu-${options.name}-border-hover:hover { border-color: ${options.baseColor}; }\n`
            + `.norseu-${options.name}-bg-hover:hover { color: ${options.textColor}; background-color: ${options.baseColor}; }\n`
            + `.norseu-${options.name}-border-1px-hover:hover { z-index: 99; border: 1px solid ${options.baseColor} !important; }\n`
            + `.norseu-${options.name}-border-1px-focus:focus { z-index: 99; border: 1px solid ${options.baseColor} !important; }\n`
            + `.norseu-${options.name}-border-2px-focus:focus { z-index: 99; border: 2px solid ${options.baseColor} !important; }\n`
            + `.norseu-${options.name}-border-3px-box-shadow { z-index: 99; box-shadow: 0 0 0 3px ${transValue3}; -webkit-box-shadow: 0 0 0 3px ${transValue3}; -moz-box-shadow: 0 0 0 3px ${transValue3}; }\n`
            + `.norseu-${options.name}-border-3px-focus-box-shadow:focus { z-index: 99; box-shadow: 0 0 0 3px ${transValue3}; -webkit-box-shadow: 0 0 0 3px ${transValue3}; -moz-box-shadow: 0 0 0 3px ${transValue3}; }\n`
            + `/* Panel.css */\n`
            + `.norseu-${options.name}-scrollpanel::-webkit-scrollbar-thumb { background-color: ${options.baseColor}; }\n`
            + `.tab-button-hover-norseu-${options.name}:hover { color: ${options.baseColor}; border-bottom: 2px solid ${options.baseColor} !important; }\n`
            + `.tab-button-norseu-${options.name}.active { border-bottom: 2px solid ${options.baseColor} !important; }\n`
            + `/* Overlay.css */\n`
            + `.norseu-message-norseu-${options.name} { background-color: ${transValue7}; border-left: 5px solid ${options.baseColor}; color: ${options.textColor}; }\n`
            ;
    }

}