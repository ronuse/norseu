
import React from "react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { AccordionPanel, Panel, ScrollPanel, TabPane, TabPanel } from 'norseu/core/panels';
import { LinearLayout } from "norseu/layouts";
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Scheme } from "norseu/core/variables";
import { Dialog } from "norseu/core/overlay";

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
			//console.log(line);
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

function getSourcesWithinLine(source, sourceParts) {
    let sourceSlice = "";
    for (let index = 0; index < sourceParts.length; index++) {
        let sourcePart = sourceParts[index];
        sourceSlice += getTextBetweenLine(source, sourcePart[0], sourcePart[1], true);
        if (index < sourceParts.length-1) sourceSlice += "\n\n...\n\n";
    }
    
    return sourceSlice;
}

// https://stackoverflow.com/a/33928558/6626422
export const copyToClipboard = (text, from, to) => {
    text = getSourcesWithinLine(text, from, to);
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

export const getSourceInEditorR = (source, panelForwardRef, sourceParts) => {
    return (
        <AccordionPanel noheader nodivier name="Yes" forwardRef={panelForwardRef}>
            <ScrollPanel>
                <SyntaxHighlighter language="javascript" style={dracula} className={"max-height-350px norseu-m-0px norseu-showcase-code"}>
                    {getSourcesWithinLine(source, sourceParts)}
                </SyntaxHighlighter>
            </ScrollPanel>
        </AccordionPanel>
    )
}

function selectPropDefaultRenderer(type, value) {
    if (type === "string" && value !== 'null') return `'${value}'`;
    return value;
}

function buildCssTable(cssMap) {
    return null
}

function buildPropsTable(properties) {
    if (!properties) return;
    return (
        <table>
            <thead>
                <tr>
                    <td>Prop</td>
                    <td>Description</td>
                </tr>
            </thead>
            <tbody>
                {properties.map((property, index) => {
                    return (
                        <tr key={index}>
                            <td><code className="inline-code">{property.name}</code></td>
                            <td>
                                <span style={{ fontWeight: 700 }}>
                                    <span style={{ opacity: 0.6 }}>type: </span>{property.type} | <span style={{ opacity: 0.6 }}>default: </span>
                                    {selectPropDefaultRenderer(property.type, property.default)}
                                </span><br/>
                                <p style={{ marginTop: 5 }}>{property.description}</p>
                            </td>
                        </tr>
                    );
                })}
            </tbody>
            
        </table>
    );
}

function loadPageSource(sourceUrl, cb) {
    if (!sourceUrl) {
        cb("");
        return;
    }
    fetch(sourceUrl)
        .then(response => response.text())
        .then(data => cb(data))
        .catch(error => { throw error; });
}

export function buildComponentPage(component, options) {

    if (!options.page_source || options.page_source === "") {
        loadPageSource(options.source_url, (data) => {
            //console.log("NORSEU.SOURCE", data);
            component.setState({ pageSource : data });
        });
    }

    return (
        <Panel className="norseu-showcase-component-page">
            <h1>{options.title}</h1>

            <LinearLayout style={{ flexWrap: "wrap", padding: 0 }}>
                <Panel style={{ flex: 1, width: "-webkit-fill-available" }}>
                    <Panel style={{ border: "1px solid #E0E0E0", padding: 20 }}>
                        <SyntaxHighlighter language="javascript" className={"norseu-showcase-code no-margin"} style={dracula}>
                            {options.import_statement}
                        </SyntaxHighlighter>
                    </Panel>
                    {options.documentation}
                </Panel>

                <TabPane style={{ flex: 1 }} scheme={Scheme.PRIMARY}>
                    <TabPanel title="Props" contentStyle={{ padding: "10px" }}>{buildPropsTable(options.properties)}</TabPanel>
                    {/* <TabPanel title="CSS" contentStyle={{ padding: "10px" }}>{buildCssTable(options.css_map)}</TabPanel> */}
                    <TabPanel title="Page Source" onClick={() => component.setState({ showSourceDialog : true })}>
                        <Dialog header={options.title + " Page Source"} maximizable isVisible={options.show_dialog} onHide={() => component.setState({ showSourceDialog : false })}>
                            <ScrollPanel style={{ height: "100%", maxHeight: "100%" }}>
                                <SyntaxHighlighter language="jsx" className={"norseu-showcase-code no-margin norseu-popupcode"} style={dracula}>
                                    {options.page_source}
                                </SyntaxHighlighter>
                            </ScrollPanel>
                        </Dialog>
                    </TabPanel>
                </TabPane>
            </LinearLayout>

        </Panel>
    );
}

