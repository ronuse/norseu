
import React from "react";
import { Panel, TabPane, TabPanel, Accordion, AccordionPanel } from 'norseu/core/panels';
import { Button } from 'norseu/core/buttons';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Scheme } from "norseu/core/variables/Stylers";
import { Alignment, Orientation, Elevation, InputFilters } from "norseu/core/variables";
import { LinearLayout } from "norseu/layouts";
import { InputText } from "norseu/core/form/InputText";
import Helpers from "../../../utils/Helpers"

export class InputFiltersPage extends React.Component {

    state = {
        pageSource: ''
    }
    
    loadPageSource() {
        fetch("https://raw.githubusercontent.com/ronuse/ronuse-react-ui/main/showcase/src/components/core/form/InputFiltersPage.js")
        .then(response => response.text())
        .then(data => this.setState({
            pageSource : data,
        }))
		.catch(error => { throw error});
    }

    getSourcesWithinLine(from, to) {
        const sourceSlice = Helpers.getTextBetweenLine(this.state.pageSource, from, to, true);
        return sourceSlice;
    }

    renderSampleComponents() {
        const source1 = this.getSourcesWithinLine(45, 80);

        return (
            <Panel borderless elevation={Elevation.ONE}>
                <div className="accordion-controlled-header-buttons">
                    <div className="right">
                        <i className="fa fa-code" id='ifp-view-code'></i>
                        <i className="fa fa-copy" onClick={(e) => {Helpers.copyToClipboard(source1)}}></i>
                    </div>
                </div>
                <Accordion borderless multiple activeIndex={[0]}>
                    <AccordionPanel noheader nodivier className="norseu-showcase-component-page-preview">
                        <div className="norseu-display-flex sppai">
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
                        <SyntaxHighlighter language="javascript" style={prism} className={"max-height-350px norseu-showcase-code"}>
                            {source1}
                        </SyntaxHighlighter>
                    </AccordionPanel>
                </Accordion>
            </Panel>
        )
    }

    renderDocumentation() {        
        return (
            <LinearLayout className="norseu-panel norseu-p-20px" elevation={Elevation.ONE} orientation={Orientation.VERTICAL}>
                <span className="norseu-showcase-doc-title">Documentation</span>
            </LinearLayout>
        )
    }

    render() {
        if (this.state.pageSource === '') {
            this.loadPageSource();
        }

        return (
            <div className="norseu-showcase-component-page">
                <h1>InputFilters</h1>

                <Panel className="norseu-p-20px" elevation={Elevation.ONE}>
                    <SyntaxHighlighter language="javascript" style={prism} className={"norseu-showcase-code"}>
                        {`import { InputFilters } from 'norseu/core/variables''`}
                    </SyntaxHighlighter>
                </Panel>
                
                {this.renderSampleComponents()}
                {this.renderDocumentation()}

            </div>
        )
    }

}