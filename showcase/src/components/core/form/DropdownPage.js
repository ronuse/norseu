
import React from "react";
import { Panel, TabPane, TabPanel, Accordion, AccordionPanel } from '@ronuse/react-ui/core/panels';
import { Button } from '@ronuse/react-ui/core/buttons';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Scheme } from "@ronuse/react-ui/core/variables/Stylers";
import { Alignment, Orientation, Elevation, InputFilters } from "@ronuse/react-ui/core/variables";
import { LinearLayout } from "@ronuse/react-ui/layouts";
import { Dropdown, InputText } from "@ronuse/react-ui/core/form";
import { getTextBetweenLine, copyToClipboard, getSourceInEditorR } from "../../../utils/helpers"

export class DropdownPage extends React.Component {

    state = {
        pageSource: ''
    }

    constructor(props) {
        super(props)

        this.previewPanel1 = React.createRef();
        this.previewPanel2 = React.createRef();
        this.dropDownOptions = [
            { label: "Nigeria", value: "NG", icon: "https://cdn.countryflags.com/thumbs/nigeria/flag-3d-round-250.png" },
            { label: "Ghana", value: "GH", icon: "https://cdn.countryflags.com/thumbs/ghana/flag-3d-round-250.png" },
            { label: "Egypt", value: "EGY", icon: "https://cdn.countryflags.com/thumbs/egypt/flag-3d-round-250.png" },
            { label: "South Africa", value: "SA", icon: "https://cdn.countryflags.com/thumbs/south-africa/flag-3d-round-250.png" },
            { label: "Sudan", value: "SD", icon: "https://cdn.countryflags.com/thumbs/sudan/flag-3d-round-250.png" },
            { label: "Togo", value: "TG", icon: "https://cdn.countryflags.com/thumbs/togo/flag-3d-round-250.png" },
            { label: "Kenya", value: "KY", icon: "https://cdn.countryflags.com/thumbs/kenya/flag-3d-round-250.png" }
        ];
    }
    
    loadPageSource() {
        fetch("https://raw.githubusercontent.com/ronuse/ronuse-react-ui/main/showcase/src/components/core/form/DropdownPage.js")
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
                                <Dropdown scheme={Scheme.WARNING} onSelectOption={(e) => {console.log(e.option)}} options={this.dropDownOptions} selectedOptionIndex={1}/>
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
                        <AccordionPanel noheader nodivier className="r-r-showcase-component-page-preview">
                            <div className="r-r-display-flex-column">
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
                <h1>Dropdown</h1>

                <Panel className="r-r-padding-20px" elevation={Elevation.ONE}>
                    <SyntaxHighlighter language="javascript" style={prism} className={"r-r-showcase-code"}>
                        {`import { Dropdown } from '@ronuse/react-ui/core/form''`}
                    </SyntaxHighlighter>
                </Panel>
                
                {this.renderSampleComponents()}
                {this.renderDocumentation()}

            </div>
        )
    }

}