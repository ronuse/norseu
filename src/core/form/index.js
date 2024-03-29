
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

import "./Form.css"
export { Checkbox } from "./Checkbox"
export { InputText } from "./InputText"
export { TextArea } from "./TextArea"
export { PasswordInput } from "./PasswordInput"
export { Dropdown } from "./Dropdown"
export { FileInput } from "./FileInput"

export function rruiBuildFormData(target, component)  {
	const formData = new FormData(target);
	for (let input of target.elements) {
		if (input.type === "checkbox") {
			formData.append(input.name, input.checked ? "on" : "off");
		}
	}
	return formData;
}

export function rruiFormDataToJson(formData) {
	const dataObject = {};
	formData.forEach(function (value, prop) {
		dataObject[prop] = value;
	});
	return dataObject;
}

export function rruiFormToJson(form) {
	return rruiFormDataToJson(rruiBuildFormData(form));
}
