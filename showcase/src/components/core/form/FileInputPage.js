
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
import Helpers from "../../../utils/Helpers"

export class FileInputPage extends React.Component {

    state = { pageSource: '', showSourceDialog: false }
    cssMap = [

    ];
    properties = [
        { name: "text", type: "string", default: "", description: "The label to show in the button" },
    ];
    refMap = [
        { name: "value()", type: "function", description: "Returns the value of the component internal HTML element" },
        { name: "setValue(value)", type: "function", description: "Set the value of the component internal HTML element" },
        { name: "focus()", type: "function", description: "Send focus to the component" },
        { name: "getInternalElement()", type: "function", description: "Get the react reference to the internal element" },
        { name: "getState()", type: "function", description: "Get the current state of the component" },
        { name: "setState()", type: "function", description: "Change the component state" },
    ]

    constructor(props) {
        super(props);
        this.willUnmount = false;
        this.previewPanels = React.createRef();
        this.previewPanels.current = [];
    }

    componentWillUnmount() {
        this.willUnmount = true;
    }

    buildDocumentation() {
        return (
            <React.Fragment>
                <Panel borderless style={{ marginTop: 40 }}>
                    <span className="norseu-showcase-component-page-preview-title">Basic</span>
                    <Accordion borderless multiple activeIndex={[0]}>
                        <AccordionPanel noheader nodivier className="norseu-showcase-component-page-preview">
                            <p className="documentation-p"></p>
                            <FileInput scheme={Scheme.PRIMARY}
                                defaultFileUrl={"https://i.pinimg.com/originals/4e/aa/b6/4eaab69fcf8d928738072cd355a980db.jpg"}
                                fileExtensions={["png", "jpg", "jpeg", "JPG", "PNG", "JPEG"]}
                                label={"Select"}
                                previewType={FilePreviewType.IMAGE}/>
                            
                            <div className="norseu-showcase-component-page-preview-buttons">
                                <i className="fa fa-code" onClick={(e) => this.previewPanels.current[0].toggle()}></i>
                                <i className="fa fa-copy" onClick={(e) => {Helpers.copyToClipboard(this.state.pageSource, [[57, 65]])}}></i>
                            </div>
                        </AccordionPanel>
                        {Helpers.getSourceInEditorR(this.state.pageSource, (ref) => this.previewPanels.current[0] = ref, [[57, 65]])}
                    </Accordion>
                </Panel>

                <Panel borderless style={{ marginTop: 40 }}>
                    <span className="norseu-showcase-component-page-preview-title">Preview Types</span>
                    <Accordion borderless multiple activeIndex={[0]}>
                        <AccordionPanel noheader nodivier className="norseu-showcase-component-page-preview">
                            <p className="documentation-p"></p>
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
										defaultFileUrl={"https://file-examples.com/storage/feddb42d8762894ad9bbbb0/2017/04/file_example_MP4_480_1_5MG.mp4"}
										fileExtensions={["mp4", "mpeg", "mov"]}
										label={"Select"}
										previewType={FilePreviewType.VIDEO} multiple noBorder/>
										<span>Click to select new video(s)</span>
								</div>

								<div>
									<span style={{ fontWeight: "bold" }}>FilePreviewType.AUDIO</span>
									<FileInput scheme={Scheme.PRIMARY}
										defaultFileUrl={"https://file-examples.com/storage/feddb42d8762894ad9bbbb0/2017/11/file_example_MP3_700KB.mp3"}
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
                            
                            <div className="norseu-showcase-component-page-preview-buttons">
                                <i className="fa fa-code" onClick={(e) => this.previewPanels.current[0].toggle()}></i>
                                <i className="fa fa-copy" onClick={(e) => {Helpers.copyToClipboard(this.state.pageSource, [[57, 65]])}}></i>
                            </div>
                        </AccordionPanel>
                        {Helpers.getSourceInEditorR(this.state.pageSource, (ref) => this.previewPanels.current[0] = ref, [[57, 65]])}
                    </Accordion>
                </Panel>
            </React.Fragment>
        );
    }

    render() {
        return Helpers.buildComponentPage(this, {
            title: "FileInput",
            import_statement: "import { Button } from 'norseu/core/buttons'",
            properties: this.properties,
            css_map: this.cssMap,
            ref_map: this.refMap,
            documentation: this.buildDocumentation(),
            page_source: this.state.pageSource,
            show_dialog: this.state.showSourceDialog,
            source_url: "https://raw.githubusercontent.com/ronuse/norseu/main/showcase/src/components/core/form/FileInputPage.js"
        });
    }

}