
import React from "react";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { AccordionPanel, Panel, ScrollPanel, TabPane, TabPanel } from 'norseu/core/panels';
import { LinearLayout } from "norseu/layouts";
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Scheme } from "norseu/core/variables";
import { Dialog } from "norseu/core/overlay";

export default class Helpers {

    static __microSourceCache = {};

    static getTextBetweenLine = (source, from, to, trimLeadingTab) => {
        if (!source || source.length === 0) {
            return "";
        }
        const key = `${source.length}_${from}_${to}`;
        let result = Helpers.__microSourceCache[key];
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
        Helpers. __microSourceCache[key] = result;
        return result;
    };

    static getSourcesWithinLine(source, sourceParts) {
        let sourceSlice = "";
        for (let index = 0; index < sourceParts.length; index++) {
            let sourcePart = sourceParts[index];
            sourceSlice += Helpers.getTextBetweenLine(source, sourcePart[0], sourcePart[1], true);
            if (index < sourceParts.length-1) sourceSlice += "\n\n...\n\n";
        }
        
        return sourceSlice;
    }

    // https://stackoverflow.com/a/33928558/6626422
    static copyToClipboard = (text, from, to) => {
        text = Helpers.getSourcesWithinLine(text, from, to);
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
    
    static buildCodeBlock(source, sourceParts) {
        return (
            <ScrollPanel>
                <SyntaxHighlighter language="javascript" style={dracula} className={"max-height-350px norseu-m-0px norseu-showcase-code"}>
                    {Helpers.getSourcesWithinLine(source, sourceParts)}
                </SyntaxHighlighter>
            </ScrollPanel>
        );
    }

    static getSourceInEditorR = (source, panelForwardRef, sourceParts) => {
        return (
            <AccordionPanel noheader nodivier name="Yes" forwardRef={panelForwardRef}>
                {Helpers.buildCodeBlock(source, sourceParts)}
            </AccordionPanel>
        )
    }

    static selectPropDefaultRenderer(component, type, value) {
        if (type === "string" && value !== 'null') return `'${value}'`;
        if (type === "boolean") return (value ? "true" : "false");
        if (type === "object" || type === "array") {
            value = JSON.stringify(value, null, 4);
            let key = value.substring(0, 10);

            function switchState() {
                let state = {};
                state[key] = !component.state[key];
                component.setState(state);
            }

            return <React.Fragment>
                <a onClick={switchState} style={{ cursor: "pointer" }}>view</a>
                <Dialog contentClassName="norseu-scrollpanel" header={`Default Value`} maximizable isVisible={component.state[key]} onHide={switchState}>
                    <SyntaxHighlighter language="javascript" className={"norseu-showcase-code no-margin norseu-popupcode"} style={dracula}>
                        {value}
                    </SyntaxHighlighter>
                </Dialog>
            </React.Fragment>;
        }
        return value;
    }

    static buildPropsTable(component, properties) {
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
                                        {Helpers.selectPropDefaultRenderer(component, property.type, property.default)}
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

    static buildCssTable(cssMap) {
        return null
    }

    static buildRefTable(name, refMap) {
        if (!refMap) return;
        return (
            <React.Fragment>
                <h3>Example</h3>
                <SyntaxHighlighter language="jsx" className={"norseu-showcase-code no-margin"} style={dracula}>
                    {`<${name} ref={this.component}></${name}>\n...\nthis.component.current.${refMap[0].name}`}
                </SyntaxHighlighter>
                <h3>Values</h3>
                <table>
                    <thead>
                        <tr>
                            <td>Name</td>
                            <td>Value</td>
                        </tr>
                    </thead>
                    <tbody>
                        {refMap.map((property, index) => {
                            return (
                                <tr key={index}>
                                    <td><code className="inline-code">{property.name}</code></td>
                                    <td>
                                        <span style={{ fontWeight: 700 }}>
                                            <span style={{ opacity: 0.6 }}>type: </span>{property.type}
                                        </span><br/>
                                        <p style={{ marginTop: 5 }}>{property.description}</p>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                    
                </table>
            </React.Fragment>
        );
    }

    static loadPageSource(sourceUrl, cb) {
        if (!sourceUrl) {
            cb("");
            return;
        }
        fetch(sourceUrl)
            .then(response => response.text())
            .then(data => cb(data))
            .catch(error => { console.error(error); });
    }

    static buildComponentPage(component, options) {

        if (!options.page_source || options.page_source === "") {
            Helpers.loadPageSource(options.source_url, (data) => {
                if (component.willUnmount) return;
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
                        <TabPanel title="Props" contentStyle={{ padding: "10px" }}>{Helpers.buildPropsTable(component, options.properties)}</TabPanel>
                        {/* <TabPanel title="CSS" contentStyle={{ padding: "10px" }}>{Helpers.buildCssTable(options.css_map)}</TabPanel> */}
                        <TabPanel title="ref" contentStyle={{ padding: "10px" }}>{Helpers.buildRefTable(options.title, options.ref_map)}</TabPanel>
                        <TabPanel title="Page Source" onClick={() => component.setState({ showSourceDialog : true })}>
                            <Dialog contentClassName="norseu-scrollpanel" header={options.title + " Page Source"} maximizable isVisible={options.show_dialog} onHide={() => component.setState({ showSourceDialog : false })}>
                                <SyntaxHighlighter language="jsx" className={"norseu-showcase-code no-margin norseu-popupcode"} style={dracula}>
                                    {options.page_source}
                                </SyntaxHighlighter>
                            </Dialog>
                        </TabPanel>
                    </TabPane>
                </LinearLayout>
    
            </Panel>
        );
    }

}

