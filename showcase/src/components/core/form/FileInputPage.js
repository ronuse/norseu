
import React from "react";
import { Panel, TabPane, TabPanel, Accordion, AccordionPanel } from '@ronuse/react-ui/core/panels';
import { Button } from '@ronuse/react-ui/core/buttons';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Scheme } from "@ronuse/react-ui/core/variables/Stylers";
import { Alignment, Orientation, Elevation, FilePreviewType } from "@ronuse/react-ui/core/variables";
import { LinearLayout } from "@ronuse/react-ui/layouts";
import { PasswordInput, InputText, FileInput } from "@ronuse/react-ui/core/form";
import { getTextBetweenLine, copyToClipboard, getSourceInEditorR } from "../../../utils/helpers"

export class FileInputPage extends React.Component {

    state = {
        pageSource: ''
    }

    constructor(props) {
        super(props)

        this.previewPanel1 = React.createRef();
        this.previewPanel2 = React.createRef();
    }
    
    loadPageSource() {
        fetch("https://raw.githubusercontent.com/ronuse/ronuse-react-ui/main/showcase/src/components/core/form/FileInputPage.js")
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
                            <i className="fa fa-code" onClick={(e) => {this.previewPanel1.current.toggle()}}></i>
                            <i className="fa fa-copy" onClick={(e) => {copyToClipboard(source1)}}></i>
                        </div>
                        <span className="left">Basic</span>
                    </div>
                    <Accordion borderless multiple activeIndex={[0]}>
                        <AccordionPanel noheader nodivier className="r-r-showcase-component-page-preview">
                            <div className="r-r-display-flex sppai">
                                <FileInput scheme={Scheme.PRIMARY}
									default={"https://i.pinimg.com/originals/4e/aa/b6/4eaab69fcf8d928738072cd355a980db.jpg"}
									/*fileExtensions={["png", "jpg", "jpeg", "JPG", "PNG", "JPEG"]}*/
									previewType={FilePreviewType.IMAGE}/>
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
                        <span className="left">Custom Preview Type</span>
                    </div>
                    <Accordion borderless multiple activeIndex={[0]}>
                        <AccordionPanel noheader nodivier className="r-r-showcase-component-page-preview">
                            <div className="r-r-display-flex sppai" style={{ flexDirection: "column" }}>
								<div>
									<span style={{ fontWeight: "bold" }}>FilePreviewType.NONE</span>
									<FileInput scheme={Scheme.PRIMARY}
										fileExtensions={["png", "jpg", "jpeg"]}
										previewType={FilePreviewType.NONE}/>
								</div>

								<div>
									<span style={{ fontWeight: "bold" }}>FilePreviewType.IMAGE</span>
									<FileInput scheme={Scheme.PRIMARY} style={{ borderRadius: "100px" }}
										default={"https://i1.sndcdn.com/artworks-dPQoalo9P0AVBekC-3l4WaQ-t500x500.jpg"}
										fileExtensions={["png", "jpg", "jpeg"]}
										previewType={FilePreviewType.IMAGE}/>
										<span>Click so select new image</span>
								</div>
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
                <h1>FileInput</h1>

                <Panel className="r-r-padding-20px" elevation={Elevation.ONE}>
                    <SyntaxHighlighter language="javascript" style={prism} className={"r-r-showcase-code"}>
                        {`import { FileInput } from '@ronuse/react-ui/core/form''`}
                    </SyntaxHighlighter>
                </Panel>
                
                {this.renderSampleComponents()}
                {this.renderDocumentation()}

            </div>
        )
    }

}