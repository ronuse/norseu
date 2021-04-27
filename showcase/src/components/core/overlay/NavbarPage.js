
import React from "react";
import { Panel, TabPane, TabPanel, Accordion, AccordionPanel } from '@ronuse/react-ui/core/panels';
import { Button } from '@ronuse/react-ui/core/buttons';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Scheme } from "@ronuse/react-ui/core/variables/Stylers";
import { Position, Orientation, Elevation, InputFilters } from "@ronuse/react-ui/core/variables";
import { LinearLayout } from "@ronuse/react-ui/layouts";
import { PasswordInput, InputText, Checkbox } from "@ronuse/react-ui/core/form";
import { Navbar } from "@ronuse/react-ui/core/overlay";
import { getTextBetweenLine, copyToClipboard, getSourceInEditorR } from "../../../utils/helpers"

export class NavbarPage extends React.Component {

    state = {
        pageSource: '',
        showBasic: true,
        showOverflow: false,
        showFullScreen: false,
        showWithoutModal: false,
        showWithPosition: false,
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
        }));
    }

    getSourceWithinLine(from, to) {
        const sourceSlice = getTextBetweenLine(this.state.pageSource, from, to, true);
        return sourceSlice;
    }

    navbarControls(key) {
        return (
            <div style={{margin: "20px", display: "flex", flexDirection: "column"}}>
                <span style={{fontWeight: 600}}>Select your option</span>
                <div style={{marginTop: "10px"}}>
                    <span>Email</span>
                    <InputText scheme={Scheme.PRIMARY} ref={this.emailRef} placeholder="Enter your email address"/>
                </div>
                <div style={{marginTop: "10px"}}>
                    <span>Password</span>
                    <PasswordInput scheme={Scheme.PRIMARY} placeholder="Enter your email address"/>
                </div>
                <div style={{marginTop: "10px"}}>
                    <Checkbox label="Stay Signed in"/>
                </div>
                <div style={{marginTop: "15px"}}>
                    <Button text="Close" onClick={(e) => this.onHide(key)}/>
                    <Button scheme={Scheme.SUCCESS} text="Submit" onClick={(e) => this.onHide(key)}/>
                </div>
            </div>
        );
    }

    onHide(name) {
        console.log(this.emailRef.current.focus);
        this.setState({
            [`${name}`]: false
        });
    }

    renderSampleComponents() {
        const source1 = this.getSourceWithinLine(100, 106);
        const source2 = this.getSourceWithinLine(128, 138);
        const source3 = this.getSourceWithinLine(171, 173);

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
                            <div className="r-r-display-flex">
                                <Button text="Show Basic" icon="fa fa-clone fa-flip-vertical" scheme={Scheme.PRIMARY} onClick={() => this.setState({showBasic: true})} />

                                <Navbar onOpenFocusRef={this.emailRef} isVisible={this.state.showBasic} onHide={(e) => this.setState({showBasic: false})}>
                                    {this.navbarControls("showBasic")} 
                                </Navbar>
                            </div>
                        </AccordionPanel>
                        {getSourceInEditorR(source1, this.previewPanel1)}
                    </Accordion>
                </Panel>

                <Panel borderless elevation={Elevation.ONE}>
                    <div className="accordion-controlled-header-buttons">
                        <div className="right">
                            <i className="fa fa-code" onClick={(e) => {this.previewPanel2.current.toggle()}}></i>
                            <i className="fa fa-copy" onClick={(e) => {copyToClipboard(source1)}}></i>
                        </div>
                        <span className="left">Other Properties</span>
                    </div>
                    <Accordion borderless multiple activeIndex={[0]}>
                        <AccordionPanel noheader nodivier className="r-r-showcase-component-page-preview">
                            <div className="r-r-display-flex">
                                <Button text="Fullscreen" icon="fa fa-clone fa-flip-vertical" scheme={Scheme.PRIMARY} onClick={() => this.setState({showFullScreen: true})} />
                                <Button text="Without Modal" icon="fa fa-clone fa-flip-vertical" scheme={Scheme.PRIMARY} onClick={() => this.setState({showWithoutModal: true})} />
                                
                                <Navbar header="Maximizable" fullScreen isVisible={this.state.showFullScreen} onHide={(e) => this.setState({showFullScreen: false})}>
                                    {this.navbarControls()} 
                                </Navbar>

                                <Navbar header="Without Modal" noOverlay isVisible={this.state.showWithoutModal} onHide={(e) => this.setState({showWithoutModal: false})}>
                                    {this.navbarControls()} 
                                </Navbar>
                            </div>
                        </AccordionPanel>
                        {getSourceInEditorR(source2, this.previewPanel2)}
                    </Accordion>
                </Panel>
                
                <Panel borderless elevation={Elevation.ONE}>
                    <div className="accordion-controlled-header-buttons">
                        <div className="right">
                            <i className="fa fa-code" onClick={(e) => {this.previewPanel3.current.toggle()}}></i>
                            <i className="fa fa-copy" onClick={(e) => {copyToClipboard(source1)}}></i>
                        </div>
                        <span className="left">Position TODO change select below to ronuse select Component</span>
                    </div>
                    <Accordion borderless multiple activeIndex={[0]}>
                        <AccordionPanel noheader nodivier className="r-r-showcase-component-page-preview">
                            <div className="r-r-display-flex">
                                <select onChange={(e)=>{this.setState({ navbarPosition: e.target.value} )}}>
                                    <option value={Position.LEFT}>{"LEFT"}</option>
                                    <option value={Position.RIGHT}>{"RIGHT"}</option>
                                    <option value={Position.TOP}>{"TOP"}</option>
                                    <option value={Position.CENTER}>{"CENTER"}</option>
                                    <option value={Position.TOP_CENTER}>{"TOP_CENTER"}</option>
                                    <option value={Position.TOP_LEFT}>{"TOP_LEFT"}</option>
                                    <option value={Position.TOP_RIGHT}>{"TOP_RIGHT"}</option>
                                    <option value={Position.BOTTOM}>{"BOTTOM"}</option>
                                    <option value={Position.BOTTOM_LEFT}>{"BOTTOM_LEFT"}</option>
                                    <option value={Position.BOTTOM_RIGHT}>{"BOTTOM_RIGHT"}</option>
                                    <option value={Position.BOTTOM_CENTER}>{"BOTTOM_CENTER"}</option>
                                </select>
                                <Button text="Show" icon="fa fa-clone fa-flip-vertical" scheme={Scheme.PRIMARY} onClick={() => this.setState({showWithPosition: true})} />

                                <Navbar position={this.state.navbarPosition} isVisible={this.state.showWithPosition} onHide={(e) => this.setState({showWithPosition: false})}>
                                    {this.navbarControls()} 
                                </Navbar>
                            </div>
                        </AccordionPanel>
                        {getSourceInEditorR(source3, this.previewPanel3)}
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
                <h1>Navbar</h1>

                <Panel className="r-r-padding-20px" elevation={Elevation.ONE}>
                    <SyntaxHighlighter language="javascript" style={prism} className={"r-r-showcase-code"}>
                        {`import { Navbar } from '@ronuse/react-ui/core/overlay'`}
                    </SyntaxHighlighter>
                </Panel>
                
                {this.renderSampleComponents()}
                {this.renderDocumentation()}

            </div>
        )
    }

}