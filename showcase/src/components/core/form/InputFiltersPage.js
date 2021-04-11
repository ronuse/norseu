
import React from "react";
import { Panel, TabPane, TabPanel, Accordion, AccordionPanel } from '@ronuse/react-ui/core/panels';
import { Button } from '@ronuse/react-ui/core/buttons';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Scheme } from "@ronuse/react-ui/core/variables/Stylers";
import { Alignment, Orientation, Elevation } from "@ronuse/react-ui/core/variables";
import { LinearLayout } from "@ronuse/react-ui/layouts";

export class InputFiltersPage extends React.Component {

    state = { }

    renderSampleComponents() {

        function copyCode() {
            
        }

        return (
            <Panel borderless elevation={Elevation.ONE}>
                <div className="accordion-controlled-header-buttons">
                    <i className="fa fa-code" id='ifp-view-code'></i>
                    <i className="fa fa-copy" onClick={copyCode}></i>
                </div>
                <Accordion borderless multiple activeIndex={[0, 1]}>
                    <AccordionPanel noheader>
                        Hello World
                    </AccordionPanel>
                    <AccordionPanel noheader onHeaderClickRefId={'ifp-view-code'}>
                        <SyntaxHighlighter language="javascript" style={prism} className={"r-r-showcase-code"}>
                            {`import { Tag } from '@ronuse/react-ui/core/misc'`}
                        </SyntaxHighlighter>
                    </AccordionPanel>
                </Accordion>
            </Panel>
        )
    }

    renderDocumentation() {
        if (this.state.pageSource === '') {
            this.loadPageSource();
        }
        
        return (
            <LinearLayout className="r-r-panel r-r-padding-20px" elevation={Elevation.ONE} orientation={Orientation.VERTICAL}>
                <span className="r-r-showcase-doc-title">Documentation</span>
            </LinearLayout>
        )
    }

    render() {
        return (
            <div className="r-r-showcase-component-page">
                <h1>Tagl</h1>

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