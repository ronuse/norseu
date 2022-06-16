
import React from "react";
import { Panel, TabPane, TabPanel, Accordion, AccordionPanel } from '@ronuse/norseu/core/panels';
import { Button } from '@ronuse/norseu/core/buttons';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Scheme } from "@ronuse/norseu/core/variables/Stylers";
import { Position, Orientation, Elevation, InputFilters } from "@ronuse/norseu/core/variables";
import { LinearLayout } from "@ronuse/norseu/layouts";
import { PasswordInput, InputText, Checkbox } from "@ronuse/norseu/core/form";
import { Navbar } from "@ronuse/norseu/core/overlay";
import Helpers from "../../../utils/Helpers"

export class NavbarPage extends React.Component {

    state = {
        pageSource: '',
        showBasic: false,
        showOverflow: false,
        showFullScreen: false,
        showWithoutModal: false,
        showWithPosition: false,
        showCollapsibleModal: false,
        navbarPosition: Position.LEFT
    }

    constructor(props) {
        super(props)
        this.previewPanel1 = React.createRef();
        this.previewPanel2 = React.createRef();
        this.previewPanel3 = React.createRef();
        this.emailRef = React.createRef();
    }
    
    loadPageSource() {
        fetch("https://raw.githubusercontent.com/ronuse/ronuse-react-ui/main/showcase/src/components/core/overlay/DialogPage.js")
        .then(response => response.text())
        .then(data => this.setState({
            pageSource : data,
        }))
		.catch(error => { throw error});
    }

    getSourcesWithinLine(from, to) {
        const sourceSlice = Helpers.Helpers.getSourceInEditorR(this.state.pageSource, from, to, true);
        return sourceSlice;
    }

    navbarControls(key) {
        return (
            <div style={{margin: "20px", display: "flex", flexDirection: "column"}}>
                <span style={{fontWeight: 600}}>Select your option</span>
                <div style={{marginTop: "10px", display: "flex", flexDirection: "column"}}>
                    <span>Email</span>
                    <InputText ref={this.emailRef} scheme={Scheme.PRIMARY} placeholder="Enter your email address"/>
                </div>
                <div style={{marginTop: "10px", display: "flex", flexDirection: "column"}}>
                    <span>Password</span>
                    <PasswordInput scheme={Scheme.PRIMARY} placeholder="Enter your email address"/>
                </div>
                <div style={{marginTop: "10px"}}>
                    <Checkbox scheme={Scheme.PRIMARY} label="Stay Signed in"/>
                </div>
                <div style={{marginTop: "15px"}}>
                    <Button text="Close" onClick={(e) => this.onHide(key)}/>
                    <Button scheme={Scheme.SUCCESS} text="Submit" onClick={(e) => this.onHide(key)}/>
                </div>
            </div>
        );
    }

    onHide(name) {
        this.setState({
            [`${name}`]: false
        });
    }

    renderSampleComponents() {
        const source1 = this.getSourcesWithinLine(100, 106);
        const source2 = this.getSourcesWithinLine(128, 138);
        const source3 = this.getSourcesWithinLine(171, 173);

        return (
            <React.Fragment>
                <Panel borderless elevation={Elevation.ONE}>
                    <div className="accordion-controlled-header-buttons">
                        <div className="right">
                            <i className="fa fa-code" onClick={(e) => {this.previewPanel1.current.toggle()}}></i>
                            <i className="fa fa-copy" onClick={(e) => {Helpers.copyToClipboard(source1)}}></i>
                        </div>
                        <span className="left">Basic</span>
                    </div>
                    <Accordion borderless multiple activeIndex={[0]}>
                        <AccordionPanel noheader nodivier className="norseu-showcase-component-page-preview">
                            <div className="norseu-display-flex">
                                <Button text="Show Basic" icon="fa fa-clone fa-flip-vertical" scheme={Scheme.PRIMARY} onClick={() => this.setState({showBasic: true})} />

                                <Navbar onOpenFocusRef={this.emailRef} isVisible={this.state.showBasic} onHide={(e) => this.setState({showBasic: false})}>
                                    {this.navbarControls("showBasic")} 
                                </Navbar>
                            </div>
                        </AccordionPanel>
                        {Helpers.getSourceInEditorR(source1, this.previewPanel1)}
                    </Accordion>
                </Panel>

                <Panel borderless elevation={Elevation.ONE}>
                    <div className="accordion-controlled-header-buttons">
                        <div className="right">
                            <i className="fa fa-code" onClick={(e) => {this.previewPanel2.current.toggle()}}></i>
                            <i className="fa fa-copy" onClick={(e) => {Helpers.copyToClipboard(source1)}}></i>
                        </div>
                        <span className="left">Other Properties</span>
                    </div>
                    <Accordion borderless multiple activeIndex={[0]}>
                        <AccordionPanel noheader nodivier className="norseu-showcase-component-page-preview">
                            <div className="norseu-display-flex">
                                <Button text="Fullscreen" icon="fa fa-clone fa-flip-vertical" scheme={Scheme.PRIMARY} onClick={() => this.setState({showFullScreen: true})} />
                                <Button text="Without Modal" icon="fa fa-clone fa-flip-vertical" scheme={Scheme.PRIMARY} onClick={() => this.setState({showWithoutModal: true})} />
                                <Button text="Toggle Responsive Navbar" icon="fa fa-clone fa-flip-vertical" scheme={Scheme.PRIMARY} onClick={() => this.setState({showCollapsibleModal: true})} />
                                
                                <Navbar header="Maximizable" fullScreen isVisible={this.state.showFullScreen} onHide={(e) => this.setState({showFullScreen: false})}>
                                    {this.navbarControls("showFullScreen")} 
                                </Navbar>

                                <Navbar header="Without Modal" noOverlay isVisible={this.state.showWithoutModal} onHide={(e) => this.setState({showWithoutModal: false})}>
                                    {this.navbarControls("showWithoutModal")} 
                                </Navbar>
                                
                                <Navbar noOverlay header="Maximizable" isVisible={this.state.showCollapsibleModal} onHide={(e) => this.setState({showCollapsibleModal: false})} 
                                    minDimension={{width: 500}}>
                                    <div style={{margin: "20px"}}>
                                        This side bar will be hidden if schreen less than 500. Click the toggle button to make it visible<br/>
                                        Reduce the screen size to make the toggle button visible or click the button below<br/>
                                        <Button text="Close" onClick={(e) => this.onHide("showCollapsibleModal")}/>
                                    </div>
                                </Navbar>
                            </div>
                        </AccordionPanel>
                        {Helpers.getSourceInEditorR(source2, this.previewPanel2)}
                    </Accordion>
                </Panel>
                
                <Panel borderless elevation={Elevation.ONE}>
                    <div className="accordion-controlled-header-buttons">
                        <div className="right">
                            <i className="fa fa-code" onClick={(e) => {this.previewPanel3.current.toggle()}}></i>
                            <i className="fa fa-copy" onClick={(e) => {Helpers.copyToClipboard(source1)}}></i>
                        </div>
                        <span className="left">Position TODO change select below to ronuse select Component</span>
                    </div>
                    <Accordion borderless multiple activeIndex={[0]}>
                        <AccordionPanel noheader nodivier className="norseu-showcase-component-page-preview">
                            <div className="norseu-display-flex">
                                <select onChange={(e)=>{this.setState({ navbarPosition: e.target.value} )}}>
                                    <option value={Position.LEFT}>{"LEFT"}</option>
                                    <option value={Position.RIGHT}>{"RIGHT"}</option>
                                    <option value={Position.TOP}>{"TOP"}</option>
                                    <option value={Position.BOTTOM}>{"BOTTOM"}</option>
                                </select>
                                <Button text="Show" icon="fa fa-clone fa-flip-vertical" scheme={Scheme.PRIMARY} onClick={() => this.setState({showWithPosition: true})} />

                                <Navbar position={this.state.navbarPosition} isVisible={this.state.showWithPosition} onHide={(e) => this.setState({showWithPosition: false})}>
                                    {this.navbarControls("showWithPosition")} 
                                </Navbar>
                            </div>
                        </AccordionPanel>
                        {Helpers.getSourceInEditorR(source3, this.previewPanel3)}
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
                <h1>Navbar</h1>

                <Panel className="norseu-p-20px" elevation={Elevation.ONE}>
                    <SyntaxHighlighter language="javascript" style={prism} className={"norseu-showcase-code"}>
                        {`import { Navbar } from '@ronuse/norseu/core/overlay'`}
                    </SyntaxHighlighter>
                </Panel>
                
                {this.renderSampleComponents()}
                {this.renderDocumentation()}

            </div>
        )
    }

}