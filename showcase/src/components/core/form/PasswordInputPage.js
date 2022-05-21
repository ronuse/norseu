
import React from "react";
import { Panel, TabPane, TabPanel, Accordion, AccordionPanel } from 'norseu/core/panels';
import { Button } from 'norseu/core/buttons';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Scheme } from "norseu/core/variables/Stylers";
import { Alignment, Orientation, Elevation, InputFilters } from "norseu/core/variables";
import { LinearLayout } from "norseu/layouts";
import { PasswordInput, InputText } from "norseu/core/form";
import { getTextBetweenLine, copyToClipboard, getSourceInEditorR } from "../../../utils/helpers"

export class PasswordInputPage extends React.Component {

    state = {
        pageSource: ''
    }

    constructor(props) {
        super(props)

        this.previewPanel1 = React.createRef();
        this.previewPanel2 = React.createRef();
    }
    
    loadPageSource() {
        fetch("https://raw.githubusercontent.com/ronuse/ronuse-react-ui/main/showcase/src/components/core/form/PasswordInputPage.js")
        .then(response => response.text())
        .then(data => this.setState({
            pageSource : data,
        }))
		.catch(error => { throw error});
    }

    getSourcesWithinLine(from, to) {
        const sourceSlice = getTextBetweenLine(this.state.pageSource, from, to, true);
        return sourceSlice;
    }

    renderSampleComponents() {
        const source1 = this.getSourcesWithinLine(49);
        const source2 = this.getSourcesWithinLine(67, 75);

        return (
            <React.Fragment>
                <Panel borderless elevation={Elevation.ONE}>
                    <div className="accordion-controlled-header-buttons">
                        <div className="right">
                            <i className="fa fa-code" onClick={(e) => {this.previewPanel1.current.toggle()}}></i>
                            <i className="fa fa-copy" onClick={(e) => {copyToClipboard(source1)}}></i>
                        </div>
                        <span className="left">Basic</span>
                    </div>
                    <Accordion borderless multiple activeIndex={[0]}>
                        <AccordionPanel noheader nodivier className="norseu-showcase-component-page-preview">
                            <div className="norseu-display-flex sppai">
                                <PasswordInput scheme={Scheme.PRIMARY}/>
                            </div>
                        </AccordionPanel>
                        {getSourceInEditorR(source1, this.previewPanel1)}
                    </Accordion>
                </Panel>
                
                <Panel borderless elevation={Elevation.ONE} style={{marginTop: "0px"}}>
                    <div className="accordion-controlled-header-buttons">
                        <div className="right">
                            <i className="fa fa-code" onClick={(e) => {this.previewPanel2.current.toggle()}}></i>
                            <i className="fa fa-copy" onClick={(e) => {copyToClipboard(source2)}}></i>
                        </div>
                        <span className="left">With toggle</span>
                    </div>
                    <Accordion borderless multiple activeIndex={[0]}>
                        <AccordionPanel noheader nodivier className="norseu-showcase-component-page-preview">
                            <div className="norseu-display-flex sppai">
                                <PasswordInput scheme={Scheme.PRIMARY} placeholder="Toggle mask" toggleMask/>
                                <PasswordInput scheme={Scheme.PRIMARY} placeholder="Custom toggle mask" toggleMask toggleIcons={{
                                    show: 'fa fa-door-open',
                                    hide: 'fa fa-door-closed'
                                }}/>
                                <PasswordInput scheme={Scheme.PRIMARY} inputStyle={{paddingRight: "60px"}} placeholder="Custom toggle mask" toggleMask toggleIcons={{
                                    show: <span className="norseu-pill norseu-secondary">Show</span>,
                                    hide: <span className="norseu-pill norseu-secondary">Hide</span>
                                }}/>
                            </div>
                        </AccordionPanel>
                        {getSourceInEditorR(source2, this.previewPanel2)}
                    </Accordion>
                </Panel>
            </React.Fragment>
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
                <h1>PasswordInput</h1>

                <Panel className="norseu-p-20px" elevation={Elevation.ONE}>
                    <SyntaxHighlighter language="javascript" style={prism} className={"norseu-showcase-code"}>
                        {`import { PasswordInput } from 'norseu/core/form''`}
                    </SyntaxHighlighter>
                </Panel>
                
                {this.renderSampleComponents()}
                {this.renderDocumentation()}

            </div>
        )
    }

}