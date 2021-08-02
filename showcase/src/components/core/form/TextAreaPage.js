
import React from "react";
import { Panel, TabPane, TabPanel, Accordion, AccordionPanel } from '@ronuse/react-ui/core/panels';
import { Button } from '@ronuse/react-ui/core/buttons';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Scheme } from "@ronuse/react-ui/core/variables/Stylers";
import { Alignment, Orientation, Elevation } from "@ronuse/react-ui/core/variables";
import { LinearLayout } from "@ronuse/react-ui/layouts";
import { InputText, TextArea } from "@ronuse/react-ui/core/form";
import { getTextBetweenLine, copyToClipboard } from "../../../utils/helpers"

export class TextAreaPage extends React.Component {

    state = {
        pageSource: '',
        resizeOrientation: Orientation.NONE,
        alignLabel: Alignment.TOP,
        alignHelpLabel: Alignment.BOTTOM
    }
    
    loadPageSource() {
        fetch("https://raw.githubusercontent.com/ronuse/ronuse-react-ui/main/showcase/src/components/core/form/TextAreaPage.js")
        .then(response => response.text())
        .then(data => this.setState({
            pageSource : data,
        }));
    }

    getSourceWithinLine(from, to) {
        const sourceSlice = getTextBetweenLine(this.state.pageSource, from, to, true);
        return sourceSlice;
    }

    renderSampleComponents() {
        const source1 = this.getSourceWithinLine(45, 80);

        return (
            <React.Fragment>
                <Panel borderless elevation={Elevation.ONE}>
                    <div className="accordion-controlled-header-buttons">
                        <div className="right">
                            <i className="fa fa-code" id='ifp-view-code'></i>
                            <i className="fa fa-copy" onClick={(e) => {copyToClipboard(source1)}}></i>
                        </div>
                        <span className="left">Basic</span>
                    </div>
                    <Accordion borderless multiple activeIndex={[0]}>
                        <AccordionPanel noheader nodivier className="r-r-showcase-component-page-preview">
                            <div className="r-r-display-flex sppai">
                                <TextArea/>
                                <TextArea disabled placeholder="disabled"/>
                                <TextArea readOnly placeholder="readOnly"/>
                                <TextArea flushed placeholder="flushed"/>
                                <TextArea defaultValue="This is the default value"/>
                                <TextArea fill placeholder="fill width and height"/>
                            </div>
                        </AccordionPanel>
                        <AccordionPanel noheader nodivier onHeaderClickRefId={'ifp-view-code'}>
                            <SyntaxHighlighter language="javascript" style={prism} className={"max-height-350px r-r-showcase-code"}>
                                {source1}
                            </SyntaxHighlighter>
                        </AccordionPanel>
                    </Accordion>
                </Panel>

                
                <Panel borderless elevation={Elevation.ONE}>
                    <div className="accordion-controlled-header-buttons">
                        <div className="right">
                            <i className="fa fa-code" id='ifp-view-code'></i>
                            <i className="fa fa-copy" onClick={(e) => {copyToClipboard(source1)}}></i>
                        </div>
                        <span className="left">Resize Orientation, Label and Help Label</span>
                    </div>
                    <Accordion borderless multiple activeIndex={[0]}>
                        <AccordionPanel noheader nodivier className="r-r-showcase-component-page-preview">
                            <div className="r-r-display-flex sppai">
                                <div>
                                    <h4>Resize Orientation</h4>
                                    <select onChange={(e)=>{this.setState({ resizeOrientation: e.target.value} )}}>
                                        <option value={Orientation.NONE}>{Orientation.NONE.toUpperCase()}</option>
                                        <option value={Orientation.HORIZONTAL}>{Orientation.HORIZONTAL.toUpperCase()}</option>
                                        <option value={Orientation.VERTICAL}>{Orientation.VERTICAL.toUpperCase()}</option>
                                        <option value={Orientation.HORIZONTAL_VERTICAL}>{Orientation.HORIZONTAL_VERTICAL.toUpperCase()}</option>
                                    </select><br/>
                                    <TextArea scheme={Scheme.PRIMARY} resizeOrientation={this.state.resizeOrientation}/>
                                </div>

                                <div>
                                    <h4>Label Alignment</h4>
                                    <select onChange={(e)=>{this.setState({ alignLabel: e.target.value} )}}>
                                        <option value={Alignment.TOP}>{Alignment.TOP.toUpperCase()}</option>
                                        <option value={Alignment.LEFT}>{Alignment.LEFT.toUpperCase()}</option>
                                        <option value={Alignment.RIGHT}>{Alignment.RIGHT.toUpperCase()}</option>
                                        <option value={Alignment.BOTTOM}>{Alignment.BOTTOM.toUpperCase()}</option>
                                    </select><br/>
                                    <TextArea scheme={Scheme.PRIMARY} label="Description" alignLabel={this.state.alignLabel}/>
                                </div>

                                <div>
                                    <h4>Help Label Alignment</h4>
                                    <select onChange={(e)=>{this.setState({ alignHelpLabel: e.target.value} )}}>
                                        <option value={Alignment.BOTTOM}>{Alignment.BOTTOM.toUpperCase()}</option>
                                        <option value={Alignment.TOP}>{Alignment.TOP.toUpperCase()}</option>
                                        <option value={Alignment.LEFT}>{Alignment.LEFT.toUpperCase()}</option>
                                        <option value={Alignment.RIGHT}>{Alignment.RIGHT.toUpperCase()}</option>
                                    </select><br/>
                                    <TextArea scheme={Scheme.DANGER} helpLabel="Your entered biography is invalid" alignHelpLabel={this.state.alignHelpLabel}/>
                                </div>

                                <div>
                                    <h4>Flushed Label</h4>
                                    <TextArea flushed floatLabel scheme={Scheme.PRIMARY} label="Description"/>
                                </div>
                            </div>
                        </AccordionPanel>
                        <AccordionPanel noheader nodivier onHeaderClickRefId={'ifp-view-code'}>
                            <SyntaxHighlighter language="javascript" style={prism} className={"max-height-350px r-r-showcase-code"}>
                                {source1}
                            </SyntaxHighlighter>
                        </AccordionPanel>
                    </Accordion>
                </Panel>

                <Panel borderless elevation={Elevation.ONE}>
                    <div className="accordion-controlled-header-buttons">
                        <div className="right">
                            <i className="fa fa-code" id='ifp-view-code'></i>
                            <i className="fa fa-copy" onClick={(e) => {copyToClipboard(source1)}}></i>
                        </div>
                        <span className="left">Schemes</span>
                    </div>
                    <Accordion borderless multiple activeIndex={[0]}>
                        <AccordionPanel noheader nodivier className="r-r-showcase-component-page-preview">
                            <div className="r-r-display-flex sppai">
                                <TextArea scheme={Scheme.PRIMARY} placeholder="Scheme.PRIMARY"/>
                                <TextArea scheme={Scheme.SECONDARY} placeholder="Scheme.SECONDARY"/>
                                <TextArea scheme={Scheme.SUCCESS} placeholder="Scheme.SUCCESS"/>
                                <TextArea scheme={Scheme.INFO} placeholder="Scheme.INFO"/>
                                <TextArea scheme={Scheme.WARNING} placeholder="Scheme.WARNING"/>
                                <TextArea scheme={Scheme.DANGER} placeholder="Scheme.DANGER"/>
                                <TextArea scheme={Scheme.SKELETON} placeholder="Scheme.SKELETON"/>
                            </div>
                        </AccordionPanel>
                        <AccordionPanel noheader nodivier onHeaderClickRefId={'ifp-view-code'}>
                            <SyntaxHighlighter language="javascript" style={prism} className={"max-height-350px r-r-showcase-code"}>
                                {source1}
                            </SyntaxHighlighter>
                        </AccordionPanel>
                    </Accordion>
                </Panel>
            </React.Fragment>
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
                <h1>TextArea</h1>

                <Panel className="r-r-padding-20px" elevation={Elevation.ONE}>
                    <SyntaxHighlighter language="javascript" style={prism} className={"r-r-showcase-code"}>
                        {`import { TextArea } from '@ronuse/react-ui/core/variables''`}
                    </SyntaxHighlighter>
                </Panel>
                
                {this.renderSampleComponents()}
                {this.renderDocumentation()}

            </div>
        )
    }

}