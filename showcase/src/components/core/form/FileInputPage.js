
import React from "react";
import { Panel, TabPane, TabPanel, Accordion, AccordionPanel } from 'norseu/core/panels';
import { Button } from 'norseu/core/buttons';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Scheme } from "norseu/core/variables/Stylers";
import { Alignment, Orientation, Elevation, FilePreviewType } from "norseu/core/variables";
import { LinearLayout } from "norseu/layouts";
import { ObjUtils } from "norseu/utils";
import { PasswordInput, InputText, FileInput } from "norseu/core/form";
import { getTextBetweenLine, copyToClipboard, getSourceInEditorR } from "../../../utils/helpers"

export class FileInputPage extends React.Component {

    state = {
        pageSource: ''
    }

    constructor(props) {
        super(props)

        this.previewPanels = [
			React.createRef(),
			React.createRef(),
			React.createRef()
		];
    }
    
    loadPageSource() {
        fetch("https://raw.githubusercontent.com/ronuse/ronuse-react-ui/main/showcase/src/components/core/form/FileInputPage.js")
        .then(response => response.text())
        .then(data => this.setState({
            pageSource : data,
        }))
		.catch(error => { throw error});
    }

    getSourceWithinLine(from, to) {
        const sourceSlice = getTextBetweenLine(this.state.pageSource, from, to, true);
        return sourceSlice;
    }

    renderSampleComponents() {
        const sources = [
			this.getSourceWithinLine(63, 67),
			this.getSourceWithinLine(84, 149),
			this.getSourceWithinLine(167, 186)
		];

        return (
            <React.Fragment>
                <Panel borderless elevation={Elevation.ONE}>
                    <div className="accordion-controlled-header-buttons">
                        <div className="right">
                            <i className="fa fa-code" onClick={(e) => {this.previewPanels[0].current.toggle()}}></i>
                            <i className="fa fa-copy" onClick={(e) => {copyToClipboard(sources[0])}}></i>
                        </div>
                        <span className="left">Basic</span>
                    </div>
                    <Accordion borderless multiple activeIndex={[0]}>
                        <AccordionPanel noheader nodivier className="norseu-showcase-component-page-preview">
                            <div className="norseu-display-flex sppai">
                                <FileInput scheme={Scheme.PRIMARY}
									defaultFileUrl={"https://i.pinimg.com/originals/4e/aa/b6/4eaab69fcf8d928738072cd355a980db.jpg"}
									fileExtensions={["png", "jpg", "jpeg", "JPG", "PNG", "JPEG"]}
									label={"Select"}
									previewType={FilePreviewType.IMAGE}/>
                            </div>
                        </AccordionPanel>
                        {getSourceInEditorR(sources[0], this.previewPanels[0])}
                    </Accordion>
                </Panel>
                
                <Panel borderless elevation={Elevation.ONE} style={{marginTop: "0px"}}>
                    <div className="accordion-controlled-header-buttons">
                        <div className="right">
                            <i className="fa fa-code" onClick={(e) => {this.previewPanels[1].current.toggle()}}></i>
                            <i className="fa fa-copy" onClick={(e) => {copyToClipboard(sources[1])}}></i>
                        </div>
                        <span className="left">Preview Types</span>
                    </div>
                    <Accordion borderless multiple activeIndex={[0]}>
                        <AccordionPanel noheader nodivier className="norseu-showcase-component-page-preview">
                            <div className="norseu-display-flex sppai" style={{ flexDirection: "row" }}>
								<div>
									<span style={{ fontWeight: "bold" }}>FilePreviewType.NONE</span>
									<FileInput scheme={Scheme.PRIMARY} style={{ minWidth: "200px", minHeight: "200px" }}
										previewType={FilePreviewType.NONE}/>
								</div>

								<div>
									<span style={{ fontWeight: "bold" }}>FilePreviewType.IMAGE</span>
									<FileInput scheme={Scheme.PRIMARY} previewItemScheme={Scheme.PRIMARY}
										previewItemStyle={{ borderRadius: "100px" }}
										defaultFileUrl={"https://i1.sndcdn.com/artworks-dPQoalo9P0AVBekC-3l4WaQ-t500x500.jpg"}
										fileExtensions={["png", "jpg", "jpeg"]}
										label={"Select"}
										previewType={FilePreviewType.IMAGE} multiple noBorder/>
										<span>Click to select new image(s)</span>
								</div>

								<div>
									<span style={{ fontWeight: "bold" }}>FilePreviewType.VIDEO</span>
									<FileInput scheme={Scheme.PRIMARY} previewItemScheme={Scheme.SECONDARY}
										defaultFileUrl={"https://file-examples-com.github.io/uploads/2017/04/file_example_MP4_480_1_5MG.mp4"}
										fileExtensions={["mp4", "mpeg", "mov"]}
										label={"Select"}
										previewType={FilePreviewType.VIDEO} multiple noBorder/>
										<span>Click to select new video(s)</span>
								</div>

								<div>
									<span style={{ fontWeight: "bold" }}>FilePreviewType.AUDIO</span>
									<FileInput scheme={Scheme.PRIMARY}
										defaultFileUrl={"https://file-examples-com.github.io/uploads/2017/11/file_example_MP3_700KB.mp3"}
										fileExtensions={["mp3", "wav"]}
										label={"Select"}
										previewType={FilePreviewType.AUDIO} multiple noBorder/>
										<span>Click to select new audio(s)</span>
								</div>

								<div>
									<span style={{ fontWeight: "bold" }}>FilePreviewType.PDF</span>
									<FileInput scheme={Scheme.PRIMARY} previewItemScheme={Scheme.SECONDARY}
										defaultFileUrl={"https://file-examples-com.github.io/uploads/2017/10/file-sample_150kB.pdf"}
										fileExtensions={["pdf"]}
										label={"Select"}
										previewType={FilePreviewType.PDF} multiple noBorder/>
										<span>Click to select new pdf(s)</span>
								</div>

								<div>
									<span style={{ fontWeight: "bold" }}>FilePreviewType.TEXT</span>
									<FileInput scheme={Scheme.PRIMARY} previewItemScheme={Scheme.SECONDARY}
										defaultFileUrl={"https://file-examples-com.github.io/uploads/2017/02/file_example_JSON_1kb.json"}
										fileExtensions={["txt", "js", "h", "c", "cpp"]}
										label={"Select"}
										previewType={FilePreviewType.TEXT} multiple noBorder/>
										<span>Click to select new text file(s)</span>
								</div>

								<div>
									<span style={{ fontWeight: "bold" }}>FilePreviewType.BINARY</span>
									<FileInput scheme={Scheme.PRIMARY}
										defaultFileUrl={"https://file-examples-com.github.io/uploads/2017/02/zip_2MB.zip"}
										previewType={FilePreviewType.BINARY} multiple noBorder/>
										<span>Click to select any file(s)</span>
								</div>
                            </div>
                        </AccordionPanel>
                        {getSourceInEditorR(sources[1], this.previewPanels[1])}
                    </Accordion>
                </Panel>

                <Panel borderless elevation={Elevation.ONE}>
                    <div className="accordion-controlled-header-buttons">
                        <div className="right">
                            <i className="fa fa-code" onClick={(e) => {this.previewPanels[3].current.toggle()}}></i>
                            <i className="fa fa-copy" onClick={(e) => {copyToClipboard(sources[2])}}></i>
                        </div>
                        <span className="left">Custom FilePreviewType</span>
                    </div>
                    <Accordion borderless multiple activeIndex={[0]}>
                        <AccordionPanel noheader nodivier className="norseu-showcase-component-page-preview">
                            <div className="norseu-display-flex sppai">
								<span>click or drag a file into the panel to add file</span>
                                <FileInput scheme={Scheme.SECONDARY} style={{ width: "100%", minHeight: "100px" }}
									previewType={FilePreviewType.CUSTOM}
									previewPanelClassName={"norseu-fileinput-custom"}
									customItemTemplate={(url, name, size, type) => {
										let previewElement = null;
										if (type && type.includes("image")) previewElement = <img src={url} />;
										if (type && type.includes("video")) previewElement = <video controls><source src={url}/></video>;
										return (
											<div id={`el-${name}`}>
												{previewElement}
												<span>{name}</span>
												<span>{ObjUtils.humanFileSize(size)}</span>
												<Button text="Remove" scheme={Scheme.DANGER} 
													onClick={(e)=> {
														e.rruiRef.current.getInternalElement().current.parentNode.parentNode.removeChild(
															e.rruiRef.current.getInternalElement().current.parentNode
														);
														e.stopPropagation();
													}}/>
											</div>
										);
									}} multiple allowFileDrag/>
                            </div>
                        </AccordionPanel>
                        {getSourceInEditorR(sources[2], this.previewPanels[3])}
                    </Accordion>
                </Panel>
            </React.Fragment>
        )
    }

    renderDocumentation() {        
        return (
            <LinearLayout className="norseu-panel norseu-padding-20px" elevation={Elevation.ONE} orientation={Orientation.VERTICAL}>
                <span className="norseu-showcase-doc-title">Documentation</span>
				If an element is clickable do not forget to stop propagation at the end of the element on cliick 
				event.stopPropagation()
            </LinearLayout>
        )
    }

    render() {
        if (this.state.pageSource === '') {
            this.loadPageSource();
        }

        return (
            <div className="norseu-showcase-component-page">
                <h1>FileInput</h1>

                <Panel className="norseu-padding-20px" elevation={Elevation.ONE}>
                    <SyntaxHighlighter language="javascript" style={prism} className={"norseu-showcase-code"}>
                        {`import { FileInput } from 'norseu/core/form''`}
                    </SyntaxHighlighter>
                </Panel>
                
                {this.renderSampleComponents()}
                {this.renderDocumentation()}

            </div>
        )
    }

}