
import { DOMUtils } from "./DOMUtils"

export class InputFilter {

	static DEFAULT_FILTER = {
		ALPHA: /[a-z_]/i,
		ALPHANUM: /[a-z0-9_]/i,
		POSITIVE_INT: /[\d]/,
		INT: /[\d\-]/,
		POSITIVE_NUMBER: /[\d\.]/,
		NUMBER: /[\d\-\.]/,
		HEX: /[0-9a-f]/i,
		EMAIL: /[a-z0-9_\.\-@]/i,
		MONEY: /[\d\.\s,]/
	};

	static SPECIAL_KEYS = {
		ESC: 27,
		TAB: 9,
		RETURN: 13,
		BACKSPACE: 8,
		DELETE: 46
	};

	static isNavKeyPress(event) {
		let key = event.keyCode;

		return (key >= 33 && key <= 40) || key === InputFilter.SPECIAL_KEYS.RETURN || key === InputFilter.SPECIAL_KEYS.TAB || key === InputFilter.SPECIAL_KEYS.ESC;
	}

	static isSpecialKey(event) {
		let key = event.keyCode;

		return key === 9 || key === 13 || key === 27 || key === 16 || key === 17 ||(key >= 18 && key <= 20) ||
			(DOMUtils.getBrowser().opera && !event.shiftKey && (key === 8 || (key >= 33 && key <= 35) || (key >= 36 && key <= 39) || (key >= 44 && key <= 45)));
	}

	static getKey(event) {
		return event.keyCode || event.charCode;
	}

	static getCharCode(event) {
		return event.charCode || event.keyCode || event.which;
	}

	static onKeyPress(event, filter) {
		const regex = InputFilter.DEFAULT_FILTER[filter]? InputFilter.DEFAULT_FILTER[filter] : filter;
		const browser = DOMUtils.getBrowser();

		if (event.altKey || event.ctrlKey) {
			return;
		}
		const key = this.getKey(event);
		if (browser.mozilla && (this.isNavKeyPress(event) || (key === InputFilter.SPECIAL_KEYS.DELETE && event.charCode === 0) || key === InputFilter.SPECIAL_KEYS.BACKSPACE)) {
			return;
		}

		const c = this.getCharCode(event);
		const cc = String.fromCharCode(c);

		if (browser.mozilla && (this.isSpecialKey(event) || !cc)) {
			return;
		}

		if (!regex.test(cc)) {
			event.preventDefault();
		}
	}
	
	static validate(value, filter) {
		return !value || !filter || filter.test(value);
	}

}