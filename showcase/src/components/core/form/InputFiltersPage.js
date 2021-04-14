
import React from "react";
import { Panel, TabPane, TabPanel, Accordion, AccordionPanel } from '@ronuse/react-ui/core/panels';
import { Button } from '@ronuse/react-ui/core/buttons';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Scheme } from "@ronuse/react-ui/core/variables/Stylers";
import { Alignment, Orientation, Elevation, InputFilters } from "@ronuse/react-ui/core/variables";
import { LinearLayout } from "@ronuse/react-ui/layouts";
import { InputText } from "@ronuse/react-ui/core/form/InputText";
import { getTextBetweenLine } from "../../../utils/helpers"

export class InputFiltersPage extends React.Component {

    state = {
        pageSource: ''
    }
    
    loadPageSource() {
        fetch("https://raw.githubusercontent.com/ronuse/ronuse-react-ui/main/showcase/src/components/core/form/InputFiltersPage.js")
        .then(response => response.text())
        .then(data => this.setState({pageSource : data}));
    }

    getSourceWithinLine(from, to) {
        const sourceSlice = getTextBetweenLine(this.state.pageSource, from, to);
        return sourceSlice;
    }

    renderSampleComponents() {

        function copyCode() {
            
        }

        return (
            <Panel borderless elevation={Elevation.ONE}>
                <div className="accordion-controlled-header-buttons">
                    <i className="fa fa-code" id='ifp-view-code'></i>
                    <i className="fa fa-copy" onClick={copyCode}></i>
                </div>
                <Accordion borderless multiple activeIndex={[0]}>
                    <AccordionPanel noheader nodivier className="r-r-showcase-component-page-preview">
                        <div className="r-r-display-flex sppai">
                            <div>
                                <span>Alphabetic</span>
                                <InputText filter={InputFilters.ALPHA} />
                            </div>
                            <div>
                                <span>Alpha Numeric</span>
                                <InputText filter={InputFilters.ALPHANUM} />
                            </div>
                            <div>
                                <span>Positive Integers</span>
                                <InputText filter={InputFilters.POSITIVE_INT} />
                            </div>
                            <div>
                                <span>Integers</span>
                                <InputText filter={InputFilters.INT} />
                            </div>
                            <div>
                                <span>Positive Numbers</span>
                                <InputText filter={InputFilters.POSITIVE_NUMBER} />
                            </div>
                            <div>
                                <span>Numbers</span>
                                <InputText filter={InputFilters.NUMBERS} />
                            </div>
                            <div>
                                <span>Hexadecimals</span>
                                <InputText filter={InputFilters.HEX} />
                            </div>
                            <div>
                                <span>Email</span>
                                <InputText filter={InputFilters.EMAIL} />
                            </div>
                            <div>
                                <span>Money</span>
                                <InputText filter={InputFilters.MONEY} />
                            </div>
                        </div>
                    </AccordionPanel>
                    <AccordionPanel noheader nodivier onHeaderClickRefId={'ifp-view-code'}>
                        <SyntaxHighlighter language="javascript" style={prism} className={"max-height-350px r-r-showcase-code"}>
                            {this.getSourceWithinLine(44, 81)}
                        </SyntaxHighlighter>
                    </AccordionPanel>
                </Accordion>
            </Panel>
        )
    }

    renderDocumentation() {        
        return (
            <LinearLayout className="r-r-panel r-r-padding-20px" elevation={Elevation.ONE} orientation={Orientation.VERTICAL}>
                <span className="r-r-showcase-doc-title">Documentation</span>
            </LinearLayout>
        )
    }

    render() {
        if (this.state.pageSource === '') {
            this.loadPageSource();
        }

        return (
            <div className="r-r-showcase-component-page">
                <h1>InputFilters</h1>

                <Panel className="r-r-padding-20px" elevation={Elevation.ONE}>
                    <SyntaxHighlighter language="javascript" style={prism} className={"r-r-showcase-code"}>
                        {`import { Tag } from '@ronuse/react-ui/core/misc'`}
                    </SyntaxHighlighter>
                </Panel>
                
                {this.renderSampleComponents()}
                {this.renderDocumentation()}

            </div>
        )
    }

}