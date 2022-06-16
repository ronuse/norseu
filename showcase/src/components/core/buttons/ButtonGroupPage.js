
import React from "react";
import { Accordion, Panel, AccordionPanel, TabPanel } from '@ronuse/norseu/core/panels';
import { Button, ButtonGroup } from '@ronuse/norseu/core/buttons';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Scheme, Alignment, Orientation } from "@ronuse/norseu/core/variables";
import Helpers from "../../../utils/Helpers";

export class ButtonGroupPage extends React.Component {

    state = { pageSource: '', showSourceDialog: false }
    cssMap = [

    ];
    properties = [
        { name: "fill", type: "boolean", default: "false", description: "Make the button group width match the parent width, the button group children will also receive the fill prop" },
        { name: "orientation", type: <a href='#/p/components/core/variables/orientation'>Orientation</a>, default: <a href='#/p/components/core/variables/orientation#horizontal'>Orientation.HORIZONTAL</a>, description: "The label to show in the button" },
        { name: "scheme", type: <a href='#/p/components/core/variables/scheme'>Scheme</a>, default: "null", description: "Set each button group child appearance according to scheme if it does not have it own scheme" },
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
                            <ButtonGroup>
                                <Button icon="fa fa-folder-open" text="Open"/>
                                <Button icon="fa fa-times" text="Close"/>
                                <Button icon="fa fa-door-open" text="Exit"/>
                            </ButtonGroup>
                            
                            <div className="norseu-showcase-component-page-preview-buttons">
                                <i className="fa fa-code" onClick={(e) => this.previewPanels.current[0].toggle()}></i>
                                <i className="fa fa-copy" onClick={(e) => {Helpers.copyToClipboard(this.state.pageSource, [[48, 52]])}}></i>
                            </div>
                        </AccordionPanel>
                        {Helpers.getSourceInEditorR(this.state.pageSource, (ref) => this.previewPanels.current[0] = ref, [[48, 52]])}
                    </Accordion>
                </Panel>
                
                <Panel borderless style={{ marginTop: 40 }}>
                    <span className="norseu-showcase-component-page-preview-title">Skeleton</span>
                    <Accordion borderless multiple activeIndex={[0]}>
                        <AccordionPanel noheader nodivier className="norseu-showcase-component-page-preview">
                            <ButtonGroup scheme={Scheme.SKELETON}>
                                <Button icon="fa fa-folder-open" text="Open"/>
                                <Button icon="fa fa-times" text="Close"/>
                                <Button icon="fa fa-door-open" text="Exit"/>
                            </ButtonGroup>
                            
                            <div className="norseu-showcase-component-page-preview-buttons">
                                <i className="fa fa-code" onClick={(e) => this.previewPanels.current[1].toggle()}></i>
                                <i className="fa fa-copy" onClick={(e) => {Helpers.copyToClipboard(this.state.pageSource, [[67, 71]])}}></i>
                            </div>
                        </AccordionPanel>
                        {Helpers.getSourceInEditorR(this.state.pageSource, (ref) => this.previewPanels.current[1] = ref, [[67, 71]])}
                    </Accordion>
                </Panel>
                
                <Panel borderless style={{ marginTop: 40 }}>
                    <span className="norseu-showcase-component-page-preview-title">With scheme</span>
                    <Accordion borderless multiple activeIndex={[0]}>
                        <AccordionPanel noheader nodivier className="norseu-showcase-component-page-preview">
                            <ButtonGroup scheme={Scheme.PRIMARY}>
                                <Button icon="fa fa-folder-open" text="Open"/>
                                <Button icon="fa fa-times" text="Close"/>
                                <Button icon="fa fa-door-open" text="Exit"/>
                            </ButtonGroup>
                            
                            <div className="norseu-showcase-component-page-preview-buttons">
                                <i className="fa fa-code" onClick={(e) => this.previewPanels.current[2].toggle()}></i>
                                <i className="fa fa-copy" onClick={(e) => {Helpers.copyToClipboard(this.state.pageSource, [[86, 90]])}}></i>
                            </div>
                        </AccordionPanel>
                        {Helpers.getSourceInEditorR(this.state.pageSource, (ref) => this.previewPanels.current[2] = ref, [[86, 90]])}
                    </Accordion>
                </Panel>
                
                <Panel borderless style={{ marginTop: 40 }}>
                    <span className="norseu-showcase-component-page-preview-title">With individual scheme</span>
                    <Accordion borderless multiple activeIndex={[0]}>
                        <AccordionPanel noheader nodivier className="norseu-showcase-component-page-preview">
                            <ButtonGroup>
                                <Button scheme={Scheme.PRIMARY} icon="fa fa-folder-open" text="Open"/>
                                <Button scheme={Scheme.SECONDARY} icon="fa fa-times" text="Close"/>
                                <Button scheme={Scheme.SUCCESS} icon="fa fa-door-open" text="Exit"/>
                            </ButtonGroup>
                            
                            <div className="norseu-showcase-component-page-preview-buttons">
                                <i className="fa fa-code" onClick={(e) => this.previewPanels.current[3].toggle()}></i>
                                <i className="fa fa-copy" onClick={(e) => {Helpers.copyToClipboard(this.state.pageSource, [[105, 109]])}}></i>
                            </div>
                        </AccordionPanel>
                        {Helpers.getSourceInEditorR(this.state.pageSource, (ref) => this.previewPanels.current[3] = ref, [[105, 109]])}
                    </Accordion>
                </Panel>
                
                <Panel borderless style={{ marginTop: 40 }}>
                    <span className="norseu-showcase-component-page-preview-title">Fill</span>
                    <Accordion borderless multiple activeIndex={[0]}>
                        <AccordionPanel noheader nodivier className="norseu-showcase-component-page-preview">
                            <ButtonGroup fill>
                                <Button scheme={Scheme.PRIMARY} icon="fa fa-folder-open" alignIcon={Alignment.CENTER} text="Open"/>
                                <Button scheme={Scheme.PRIMARY} icon="fa fa-times" alignIcon={Alignment.CENTER} text="Close"/>
                                <Button scheme={Scheme.PRIMARY} icon="fa fa-door-open" alignIcon={Alignment.CENTER} text="Exit"/>
                            </ButtonGroup>
                            
                            <div className="norseu-showcase-component-page-preview-buttons">
                                <i className="fa fa-code" onClick={(e) => this.previewPanels.current[4].toggle()}></i>
                                <i className="fa fa-copy" onClick={(e) => {Helpers.copyToClipboard(this.state.pageSource, [[124, 128]])}}></i>
                            </div>
                        </AccordionPanel>
                        {Helpers.getSourceInEditorR(this.state.pageSource, (ref) => this.previewPanels.current[4] = ref, [[124, 128]])}
                    </Accordion>
                </Panel>
                
                <Panel borderless style={{ marginTop: 40 }}>
                    <span className="norseu-showcase-component-page-preview-title">Horizontal Alignment</span>
                    <Accordion borderless multiple activeIndex={[0]}>
                        <AccordionPanel noheader nodivier className="norseu-showcase-component-page-preview">
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
                                <ButtonGroup direction={Orientation.HORIZONTAL}>
                                    <Button icon="fa fa-folder-open" text="Open"/>
                                    <Button icon="fa fa-times" text="Close"/>
                                    <Button icon="fa fa-door-open" text="Exit"/>
                                </ButtonGroup>
                                <ButtonGroup direction={Orientation.HORIZONTAL}>
                                    <Button scheme={Scheme.PRIMARY} icon="fa fa-folder-open" text="Open"/>
                                    <Button scheme={Scheme.SECONDARY} icon="fa fa-times" text="Close"/>
                                    <Button scheme={Scheme.SUCCESS} icon="fa fa-door-open" text="Exit"/>
                                </ButtonGroup>
                                <ButtonGroup direction={Orientation.HORIZONTAL} scheme={Scheme.PRIMARY}>
                                    <Button icon="fa fa-folder-open"/>
                                    <Button icon="fa fa-times"/>
                                    <Button icon="fa fa-door-open"/>
                                </ButtonGroup>
                            </div>
                            <ButtonGroup direction={Orientation.HORIZONTAL} fill>
                                <Button scheme={Scheme.PRIMARY} icon="fa fa-folder-open" alignIcon={Alignment.CENTER} text="Open"/>
                                <Button scheme={Scheme.PRIMARY} icon="fa fa-times" alignIcon={Alignment.CENTER} text="Close"/>
                                <Button scheme={Scheme.PRIMARY} icon="fa fa-door-open" alignIcon={Alignment.CENTER} text="Exit"/>
                            </ButtonGroup>
                            
                            <div className="norseu-showcase-component-page-preview-buttons">
                                <i className="fa fa-code" onClick={(e) => this.previewPanels.current[5].toggle()}></i>
                                <i className="fa fa-copy" onClick={(e) => {Helpers.copyToClipboard(this.state.pageSource, [[144, 158], [160, 164]])}}></i>
                            </div>
                        </AccordionPanel>
                        {Helpers.getSourceInEditorR(this.state.pageSource, (ref) => this.previewPanels.current[5] = ref, [[144, 158], [160, 164]])}
                    </Accordion>
                </Panel>
                
                <Panel borderless style={{ marginTop: 40 }}>
                    <span className="norseu-showcase-component-page-preview-title">Vertical Alignment</span>
                    <Accordion borderless multiple activeIndex={[0]}>
                        <AccordionPanel noheader nodivier className="norseu-showcase-component-page-preview">
                            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
                                <ButtonGroup direction={Orientation.VERTICAL}>
                                    <Button icon="fa fa-folder-open" text="Open"/>
                                    <Button icon="fa fa-times" text="Close"/>
                                    <Button icon="fa fa-door-open" text="Exit"/>
                                </ButtonGroup>
                                <ButtonGroup direction={Orientation.VERTICAL}>
                                    <Button scheme={Scheme.PRIMARY} icon="fa fa-folder-open" text="Open"/>
                                    <Button scheme={Scheme.SECONDARY} icon="fa fa-times" text="Close"/>
                                    <Button scheme={Scheme.SUCCESS} icon="fa fa-door-open" text="Exit"/>
                                </ButtonGroup>
                                <ButtonGroup direction={Orientation.VERTICAL} scheme={Scheme.PRIMARY}>
                                    <Button icon="fa fa-folder-open"/>
                                    <Button icon="fa fa-times"/>
                                    <Button icon="fa fa-door-open"/>
                                </ButtonGroup>
                            </div>
                            <ButtonGroup direction={Orientation.VERTICAL} fill>
                                <Button scheme={Scheme.PRIMARY} icon="fa fa-folder-open" alignIcon={Alignment.CENTER} text="Open"/>
                                <Button scheme={Scheme.PRIMARY} icon="fa fa-times" alignIcon={Alignment.CENTER} text="Close"/>
                                <Button scheme={Scheme.PRIMARY} icon="fa fa-door-open" alignIcon={Alignment.CENTER} text="Exit"/>
                            </ButtonGroup>
                            
                            <div className="norseu-showcase-component-page-preview-buttons">
                                <i className="fa fa-code" onClick={(e) => this.previewPanels.current[6].toggle()}></i>
                                <i className="fa fa-copy" onClick={(e) => {Helpers.copyToClipboard(this.state.pageSource, [[180, 194], [196, 200]])}}></i>
                            </div>
                        </AccordionPanel>
                        {Helpers.getSourceInEditorR(this.state.pageSource, (ref) => this.previewPanels.current[6] = ref, [[180, 194], [196, 200]])}
                    </Accordion>
                </Panel>
            </React.Fragment>
        );
    }

    render() {
        return Helpers.buildComponentPage(this, {
            title: "ButtonGroup",
            import_statement: "import { ButtonGroup  } from '@ronuse/norseu/core/buttons'",
            properties: this.properties,
            css_map: this.cssMap,
            ref_map: this.refMap,
            documentation: this.buildDocumentation(),
            page_source: this.state.pageSource,
            show_dialog: this.state.showSourceDialog,
            source_url: "https://raw.githubusercontent.com/ronuse/norseu/main/showcase/src/components/core/buttons/ButtonGroupPage.js"
        });
    }

}