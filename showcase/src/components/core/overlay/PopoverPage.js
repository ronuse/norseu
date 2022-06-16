
import React from "react";
import { Panel, TabPane, TabPanel, Accordion, AccordionPanel } from '@ronuse/norseu/core/panels';
import { Button } from '@ronuse/norseu/core/buttons';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Scheme } from "@ronuse/norseu/core/variables/Stylers";
import { Position, Orientation, Elevation, InputFilters } from "@ronuse/norseu/core/variables";
import { LinearLayout } from "@ronuse/norseu/layouts";
import { PasswordInput, InputText, Checkbox } from "@ronuse/norseu/core/form";
import { Popover } from "@ronuse/norseu/core/overlay";
import Helpers from "../../../utils/Helpers"

export class PopoverPage extends React.Component {

    state = {
        pageSource: '',
        showBasic: false,
        showOverflow: false,
        showMaximizable: false,
        showWithoutModal: false,
        showWithPosition: false,
        showWithoutHeaderAndFooter: false,
        dialogPosition: Position.LEFT
    }

    constructor(props) {
        super(props)

        this.previewPanel1 = React.createRef();
        this.previewPanel2 = React.createRef();
        this.previewPanel3 = React.createRef();
        this.emailRef = React.createRef();
    }
    
    loadPageSource() {
        fetch("https://raw.githubusercontent.com/ronuse/ronuse-react-ui/main/showcase/src/components/core/overlay/PopoverPage.js")
        .then(response => response.text())
        .then(data => this.setState({
            pageSource : data,
        }))
		.catch(error => { throw error});
    }

    getSourcesWithinLine(from, to) {
        const sourceSlice = Helpers.getTextBetweenLine(this.state.pageSource, from, to, true);
        return sourceSlice;
    }

    basicText() {
        return `
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
            labore et dolore magna aliqua. Morbi tempus iaculis urna id. Ut ornare lectus 
            sit amet est placerat in egestas. Sit amet mauris commodo quis imperdiet massa. 
            Dictum sit amet justo donec enim diam vulputate ut pharetra.
        `;
    }

    overflowText() {
        let text = this.basicText();
        for (let index = 0; index < 20; index++) {
            text += ' ' + this.basicText();
        }
        return text;
    }
    
    formControls(onClick) {
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
                    <Button text="Close" onClick={onClick}/>
                    <Button scheme={Scheme.SUCCESS} text="Submit" onClick={onClick}/>
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
                                <Button text="Show Basic" icon="fa fa-clone fa-flip-vertical" scheme={Scheme.PRIMARY} onClick={(e) => this.popover1 && this.popover1.toggle(e)} />
                                <Popover ref={(el) => this.popover1 = el}>
                                    <div style={{ backgroundColor: "white", width: "200px", padding: "20px" }}>
                                        {this.basicText()} 
                                    </div>
                                </Popover>
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
                        <span className="left">Dismisable</span>
                    </div>
                    <Accordion borderless multiple activeIndex={[0]}>
                        <AccordionPanel noheader nodivier className="norseu-showcase-component-page-preview">
                            <div className="norseu-display-flex-column">
                                <p className="prop-desc-1">
                                    Prevent dismissing the pop over when clicked out side the popover. The popover can be toggled by 
                                    only clicking the toggle button.
                                </p>
                                <Button text="Show Popover" icon="fa fa-clone fa-flip-vertical" scheme={Scheme.PRIMARY} onClick={(e) => this.popover2 && this.popover2.toggle(e)} />
                                <Popover ref={(el) => this.popover2 = el} dismissable={false}>
                                    <div style={{ backgroundColor: "white", width: "200px", padding: "20px" }}>
                                        {this.basicText()} 
                                    </div>
                                </Popover>
                            </div>
                        </AccordionPanel>
                        {Helpers.getSourceInEditorR(source2, this.previewPanel2)}
                    </Accordion>
                </Panel>
                
                <Panel borderless elevation={Elevation.ONE}>
                    <div className="accordion-controlled-header-buttons">
                        <div className="right">
                            <i className="fa fa-code" onClick={(e) => {this.previewPanel2.current.toggle()}}></i>
                            <i className="fa fa-copy" onClick={(e) => {Helpers.copyToClipboard(source1)}}></i>
                        </div>
                        <span className="left">Focus and trapping</span>
                    </div>
                    <Accordion borderless multiple activeIndex={[0]}>
                        <AccordionPanel noheader nodivier className="norseu-showcase-component-page-preview">
                            <div className="norseu-display-flex-column">
                                <p className="prop-desc-1">
                                    <h4>Focus an element when popover show or hide</h4>
                                    Set the element that recieve focus when the popover is shown using the <code>onOpenFocusRef</code>, 
                                    also an element can receive when the popover is out of the DOm by passing the <code>onCloseFocusRef</code> prop.
                                </p>
                                <Button ref={this.btn1} text="Show Popover" icon="fa fa-clone fa-flip-vertical" scheme={Scheme.PRIMARY} onClick={(e) => this.popover3 && this.popover3.toggle(e)} />
                                <Popover ref={(el) => this.popover3 = el} onOpenFocusRef={this.emailRef} onCloseFocusRef={this.btn1}>
                                    <div style={{ backgroundColor: "white", padding: "20px" }}>
                                        {this.formControls((e) => this.popover3 && this.popover3.toggle(e))} 
                                    </div>
                                </Popover>

                                <p className="prop-desc-1">
                                    <h4>Trapping focus in Popover</h4>
                                    Focus can also be trapped within the pop over and close the popover when the user click the button on the form. 
                                    Specify the <code>trapFocus</code> and <code>onOpenFocusRef</code> prop to trap a focus, if focus is trapped in the 
                                    popover the dialog is non dismissable, excpt using the toggle.
                                </p>
                                <Button text="Show Popover" icon="fa fa-clone fa-flip-vertical" scheme={Scheme.PRIMARY} onClick={(e) => this.popover4 && this.popover4.toggle(e)} />
                                <Popover ref={(el) => this.popover4 = el} onOpenFocusRef={this.emailRef} trapFocus>
                                    <div style={{ backgroundColor: "white", padding: "20px" }}>
                                        {this.formControls((e) => this.popover4 && this.popover4.toggle(e))} 
                                    </div>
                                </Popover>
                            </div>
                        </AccordionPanel>
                        {Helpers.getSourceInEditorR(source2, this.previewPanel2)}
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
                <h1>Popover</h1>

                <Panel className="norseu-p-20px" elevation={Elevation.ONE}>
                    <SyntaxHighlighter language="javascript" style={prism} className={"norseu-showcase-code"}>
                        {`import { Popover } from '@ronuse/norseu/core/overlay'`}
                    </SyntaxHighlighter>
                </Panel>
                
                {this.renderSampleComponents()}
                {this.renderDocumentation()}

            </div>
        )
    }

}