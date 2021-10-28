
import React from "react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { AccordionPanel } from '@ronuse/react-ui/core/panels';

const __microSourceCache = {};

export const getTextBetweenLine = (source, from, to, trimLeadingTab) => {
    if (!source || source.length === 0) {
        return "";
    }
    const key = `${source.length}_${from}_${to}`;
    let result = __microSourceCache[key];
    if (result) {
        return result
    }
    result = "";
    const lines = source.split('\n');
    if (typeof to === "undefined") {
        to = from;
    }
    if (from <= 0) { from = 1; }
    from -= 1;
    if (to > lines.length) {
        to = lines.length-1;
    }
    let firstTab = "";
    while (from < to) {
        let line = lines[from];
        let index = 0;
        if (firstTab === "" && trimLeadingTab) {
			console.log(line);
            while (line[index] === ' ') {
                firstTab += ' ';
                index++;
            }
        }
        result += line.split(firstTab).join('') + (from === to-1 ? "" : "\n");
        from++;
    }
    __microSourceCache[key] = result;
    return result;
};

// https://stackoverflow.com/a/33928558/6626422
export const copyToClipboard = (text) => {
    if (window.clipboardData && window.clipboardData.setData) {
        return window.clipboardData.setData("Text", text);

    }
    else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
        var textarea = document.createElement("textarea");
        textarea.textContent = text;
        textarea.style.position = "fixed"; 
        document.body.appendChild(textarea);
        textarea.select();
        try {
            return document.execCommand("copy");
        } catch (ex) {
            console.warn("Copy to clipboard failed.", ex);
            return false;
        } finally {
            document.body.removeChild(textarea);
        }
    }
}

export const getSourceInEditorR = (source, panelForwardRef) => {
    return (
        <AccordionPanel noheader nodivier forwardRef={panelForwardRef}>
            <SyntaxHighlighter language="javascript" style={prism} className={"max-height-350px r-r-showcase-code"}>
                {source}
            </SyntaxHighlighter>
        </AccordionPanel>
    )
}