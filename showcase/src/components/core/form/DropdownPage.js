
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
        this.dropDownOptionsNumbers = [];
        for (let num = 0; num < 1000; num++) {
            this.dropDownOptionsNumbers.push({ label: `Number ${num}`, value: num});
        }
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
                                <Dropdown options={this.dropDownOptions}/>
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
                        <span className="left">Properties</span>
                    </div>
                    <Accordion borderless multiple activeIndex={[0]}>
                        <AccordionPanel noheader nodivier className="r-r-showcase-component-page-preview">
                            <div className="r-r-display-flex-column">
                                <p className="prop-desc-1">
                                    <h4>lazyLoad</h4>
                                    The property <code>lazyLoad</code> allow the dropdown to render the options in pages instead of at once. This is most useful 
                                    when the option list is very long
                                </p>
                                <Dropdown scheme={Scheme.PRIMARY} lazyLoad options={this.dropDownOptionsNumbers} selectedOptionIndex={0}/>

                                <p className="prop-desc-1">
                                    <h4>editable</h4>
                                    A dropdown property can be set to editable, this make searching or changing the options and state of the dropdown 
                                    possible. If the event <code>onDropdownInputChange</code> is set, the event will be invoked with the new value of 
                                    the dropdown input.
                                </p>
                                <Dropdown scheme={Scheme.PRIMARY} editable options={this.dropDownOptions} selectedOptionIndex={0}/>
                            </div>
                        </AccordionPanel>
                        {getSourceInEditorR(source2, this.previewPanel2)}
                    </Accordion>
                </Panel>

                <Panel borderless elevation={Elevation.ONE}>
                    <div className="accordion-controlled-header-buttons">
                        <div className="right">
                            <i className="fa fa-code" onClick={(e) => {this.previewPanel1.current.toggle()}}></i>
                            <i className="fa fa-copy" onClick={(e) => {copyToClipboard(source1)}}></i>
                        </div>
                        <span className="left">Schemes</span>
                    </div>
                    <Accordion borderless multiple activeIndex={[0]}>
                        <AccordionPanel noheader nodivier className="r-r-showcase-component-page-preview">
                            <div className="r-r-display-flex sppai">
                                <Dropdown scheme={Scheme.SKELETON} options={this.dropDownOptions} placeholder={"Skeleton"}/>
                                <Dropdown scheme={Scheme.PRIMARY} options={this.dropDownOptions} placeholder={"Primary"}/>
                                <Dropdown scheme={Scheme.SECONDARY} options={this.dropDownOptions} placeholder={"Secondary"}/>
                                <Dropdown scheme={Scheme.SUCCESS} options={this.dropDownOptions} placeholder={"Success"}/>
                                <Dropdown scheme={Scheme.WARNING} options={this.dropDownOptions} placeholder={"Warning"}/>
                                <Dropdown scheme={Scheme.INFO} options={this.dropDownOptions} placeholder={"Info"}/>
                                <Dropdown scheme={Scheme.DANGER} options={this.dropDownOptions} placeholder={"Danger"}/>
                            </div>
                        </AccordionPanel>
                        {getSourceInEditorR(source1, this.previewPanel1)}
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