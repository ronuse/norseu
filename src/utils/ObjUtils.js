

export class ObjUtils {

	static setValues(main, copyFrom, fields) {
		fields.forEach(field => {
			main[field] = copyFrom[field];
		});
		return main;
	}

	static copyFields(original, supplement) {
		if (!original || !supplement) {
			return {};
		}
		Object.keys(supplement).forEach(key => {
			original.setProperty(key, supplement[key]);
		});
		return original;
	}

	static styleObjToCSSText(style) {
		if (!style) return "";
		return Object.entries(style).map(([k, v]) => {
			k = k.replace(/[A-Z]/g, match => `-${match.toLowerCase()}`);
			return `${k}:${v}`;
		}).join(';');
	}

	static findDiffKeys(obj1, obj2, exclusions = ["eventProps", "forwardRef"]) {
		if (!obj1 || !obj2) {
			return {};
		}

		return Object.keys(obj1).filter(key => !obj2.hasOwnProperty(key)).reduce((result, current) => {
			if (!exclusions.includes(current)) result[current] = obj1[current];
			return result;
		}, {});
	}

	static removeKeys(obj1, keys) {
		for (let key of keys) {
			delete obj1[key];
		}
	}

	static replaceEntry(obj, key, newValue) {
		var oldValue = obj[key];

		obj[key] = newValue;
		return oldValue;
	}

	static clone(obj, excludes) {
		var clone = {};

		if (!obj) { return clone; }
		Object.keys(obj).map((key) => {
			if (!excludes || excludes.indexOf(key) == -1) {
				clone[key] = obj[key];
			}
		});
		return clone;
	}

	static cloneOnly(obj, selection) {
		var clone = {};

		if (!obj || !selection) { return clone; }
		Object.keys(obj).map((key) => {
			if (selection.indexOf(key) > -1) {
				clone[key] = obj[key];
			}
		});
		return clone;
	}

	static conditionalClone(obj, conditionCallback) {
		var clone = {};

		if (!obj) { return clone; }
		Object.keys(obj).map((key) => {
			if (conditionCallback(key) === true) {
				clone[key] = obj[key];
			}
		});
		return clone;
	}

	static extractEventProps(obj, excludes) {
		excludes = excludes || [];
		return this.conditionalClone(obj, (key) => excludes.indexOf(key) === -1 && key.startsWith("on") && key[2] != undefined && key[2] == key[2].toUpperCase());
	}

	static typeOf(obj) {
		return typeof obj;
	}

	static isFunction(obj) {
		return !!(obj && obj.constructor && obj.call && obj.apply);
	}

	static selectJSXElement(obj, ...params) {
		return this.isFunction(obj) ? obj(...params) : obj;
	}

	static expandStringTemplate(valueMap, unprocessed) {
		let value = "";
		let teamplateValue = "";
		let openedTemplate = false;
		for (let index = 0; index < unprocessed.length; index++) {
			const ch = unprocessed[index];
			if (ch == '{') {
				openedTemplate = true;
				continue;
			}
			if (ch == '}') {
				value += valueMap[teamplateValue] || "";
				openedTemplate = false;
				teamplateValue = "";
				continue;
			};
			if (openedTemplate) {
				teamplateValue += ch;
			} else {
				value += ch;
			}
		}
	  return value;
	}

	/**
	 * Format bytes as human-readable text.
	 * 
	 * @param bytes Number of bytes.
	 * @param si True to use metric (SI) units, aka powers of 1000. False to use 
	 *           binary (IEC), aka powers of 1024.
	 * @param dp Number of decimal places to display.
	 * 
	 * @return Formatted string.
	 *///https://stackoverflow.com/questions/10420352/converting-file-size-in-bytes-to-human-readable-string/10420404
	static humanFileSize(bytes, si=false, dp=1) {
		const thresh = si ? 1000 : 1024;
	  
		if (Math.abs(bytes) < thresh) {
		  return bytes + ' B';
		}
	  
		const units = si 
		  ? ['kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'] 
		  : ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'];
		let u = -1;
		const r = 10**dp;
	  
		do {
		  bytes /= thresh;
		  ++u;
		} while (Math.round(Math.abs(bytes) * r) / r >= thresh && u < units.length - 1);
	  
	  
		return bytes.toFixed(dp) + ' ' + units[u];
	  }

}
