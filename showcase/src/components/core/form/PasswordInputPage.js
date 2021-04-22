
import React from "react";
import { Panel, TabPane, TabPanel, Accordion, AccordionPanel } from '@ronuse/react-ui/core/panels';
import { Button } from '@ronuse/react-ui/core/buttons';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Scheme } from "@ronuse/react-ui/core/variables/Stylers";
import { Alignment, Orientation, Elevation, InputFilters } from "@ronuse/react-ui/core/variables";
import { LinearLayout } from "@ronuse/react-ui/layouts";
import { PasswordInput, InputText } from "@ronuse/react-ui/core/form";
import { getTextBetweenLine, copyToClipboard, getSourceInEditorR } from "../../../utils/helpers"

export class PasswordInputPage extends React.Component {

    state = {
        pageSource: ''
    }
    
    loadPageSource() {
        fetch("https://raw.githubusercontent.com/ronuse/ronuse-react-ui/main/showcase/src/components/core/form/PasswordInputPage.js")
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
        const source1 = this.getSourceWithinLine(49);
        const source2 = this.getSourceWithinLine(67, 75);

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
                                <PasswordInput scheme={Scheme.PRIMARY}/>
                            </div>
                        </AccordionPanel>
                        {getSourceInEditorR(source1, 'ifp-view-code')}
                    </Accordion>
                </Panel>
                
                <Panel borderless elevation={Elevation.ONE} style={{marginTop: "0px"}}>
                    <div className="accordion-controlled-header-buttons">
                        <div className="right">
                            <i className="fa fa-code" id='ifp-view-code2'></i>
                            <i className="fa fa-copy" onClick={(e) => {copyToClipboard(source2)}}></i>
                        </div>
                        <span className="left">With toggle</span>
                    </div>
                    <Accordion borderless multiple activeIndex={[0]}>
                        <AccordionPanel noheader nodivier className="r-r-showcase-component-page-preview">
                            <div className="r-r-display-flex sppai">
                                <PasswordInput scheme={Scheme.PRIMARY} placeholder="Toggle mask" toggleMask/>
                                <PasswordInput scheme={Scheme.PRIMARY} placeholder="Custom toggle mask" toggleMask toggleIcons={{
                                    show: 'fa fa-door-open',
                                    hide: 'fa fa-door-closed'
                                }}/>
                                <PasswordInput scheme={Scheme.PRIMARY} inputStyle={{paddingRight: "60px"}} placeholder="Custom toggle mask" toggleMask toggleIcons={{
                                    show: <span className="r-r-pill r-r-secondary">Show</span>,
                                    hide: <span className="r-r-pill r-r-secondary">Hide</span>
                                }}/>
                            </div>
                        </AccordionPanel>
                        {getSourceInEditorR(source2, 'ifp-view-code2')}
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
                <h1>PasswordInput</h1>

                <Panel className="r-r-padding-20px" elevation={Elevation.ONE}>
                    <SyntaxHighlighter language="javascript" style={prism} className={"r-r-showcase-code"}>
                        {`import { PasswordInput } from '@ronuse/react-ui/core/form''`}
                    </SyntaxHighlighter>
                </Panel>
                
                {this.renderSampleComponents()}
                {this.renderDocumentation()}

            </div>
        )
    }

}