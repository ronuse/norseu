
import React from "react";
import { Panel, TabPane, TabPanel, Accordion, AccordionPanel } from 'norseu/core/panels';
import { Button } from 'norseu/core/buttons';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Scheme } from "norseu/core/variables/Stylers";
import { Position, Orientation, Elevation, InputFilters } from "norseu/core/variables";
import { LinearLayout } from "norseu/layouts";
import { PasswordInput, InputText, Checkbox } from "norseu/core/form";
import { Message, showMessage, showMessages } from "norseu/core/overlay";
import { getTextBetweenLine, copyToClipboard, getSourceInEditorR } from "../../../utils/helpers"

export class MessagePage extends React.Component {

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

        this.messagesDiv1 = React.createRef();
        this.message1 = React.createRef();
        this.previewPanel1 = React.createRef();
    }
    
    loadPageSource() {
        fetch("https://raw.githubusercontent.com/ronuse/ronuse-react-ui/main/showcase/src/components/core/overlay/MessagePage.js")
        .then(response => response.text())
        .then(data => this.setState({
            pageSource : data,
        }))
		.catch(error => { throw error});
    }

    getSourcesWithinLine(from, to) {
        const sourceSlice = getTextBetweenLine(this.state.pageSource, from, to, true);
        return sourceSlice;
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
                            <i className="fa fa-copy" onClick={(e) => {copyToClipboard(source1)}}></i>
                        </div>
                        <span className="left">Basic</span>
                    </div>
                    <Accordion borderless multiple activeIndex={[0]}>
                        <AccordionPanel noheader nodivier className="norseu-showcase-component-page-preview">
                            <div className="norseu-preview-messages">
                                <Message icon={"fa fa-circle"} scheme={Scheme.PRIMARY} description={"Primary Message description"} fill sticky/>
                                <Message icon={"fa fa-square"} scheme={Scheme.SECONDARY} description={"Secondary Message secondary"} fill sticky/>
                                <Message icon={"fa fa-check"} scheme={Scheme.SUCCESS} description={"Success Message success"} fill sticky/>
                                <Message icon={"fa fa-exclamation"} scheme={Scheme.INFO} description={"Info Message info"} fill sticky/>
                                <Message icon={"fa fa-check"} scheme={Scheme.WARNING} description={"Warning Message warning"} fill sticky/>
                                <Message icon={"fa fa-times"} scheme={Scheme.DANGER} description={"Danger Message danger"} fill sticky/>
                            </div>
                        </AccordionPanel>
                        {getSourceInEditorR(source1, this.previewPanel1)}
                    </Accordion>
                </Panel>

                <Panel borderless elevation={Elevation.ONE}>
                    <div className="accordion-controlled-header-buttons">
                        <div className="right">
                            <i className="fa fa-code" onClick={(e) => {this.previewPanel1.current.toggle()}}></i>
                            <i className="fa fa-copy" onClick={(e) => {copyToClipboard(source1)}}></i>
                        </div>
                        <span className="left">Other Properties</span>
                    </div>
                    <Accordion borderless multiple activeIndex={[0]}>
                        <AccordionPanel noheader nodivier className="norseu-showcase-component-page-preview">
                            <div className="norseu-display-flex">
                                <Button text="Show Basic Message" icon="fa fa-clone fa-flip-vertical" scheme={Scheme.PRIMARY} 
									onClick={(e) => {
										showMessage({
											container: this.messagesDiv1.current,
											title: "Ronuse Message Component",
											description: "Show a message and attach to any container of choice",
											style: {  marginTop: "5px" }
										});
									}} />

                                <Button text="Show Sticky Message" icon="fa fa-clone fa-flip-vertical" scheme={Scheme.PRIMARY} 
									onClick={(e) => {
										showMessage({
											sticky: true,
											container: this.messagesDiv1.current,
											title: "Sticky Message",
											description: "This does not close automatically, click the close button to close",
											style: {  marginTop: "5px" }
										});
									}} />

                                <Button text="Show Fill Message" icon="fa fa-clone fa-flip-vertical" scheme={Scheme.PRIMARY} 
									onClick={(e) => {
										showMessage({
											fill: true,
											container: this.messagesDiv1.current,
											title: "Fill Message",
											description: "This type of messages fills the width of the parent container, fill=true",
											style: {  marginTop: "5px" }
										});
									}} />

                                <Button text="Show Multiple Messages" icon="fa fa-clone fa-flip-vertical" scheme={Scheme.PRIMARY}
									onClick={(e) => {
										const messagesProps = {
											sticky: true,
											fill: true,
											container: this.messagesDiv1.current,
											style: {  marginTop: "5px" },
										};
										if (this.messages) this.messages.closeAll();
										this.messages = showMessages([
											{
												scheme: Scheme.PRIMARY,
												title: "Primary Message",
												description: "This is a message part of multiple messages",
												...messagesProps
											},
											{
												scheme: Scheme.SUCCESS,
												title: "Success Message",
												description: "This is a message part of multiple messages",
												...messagesProps
											},
											{
												scheme: Scheme.WARNING,
												title: "Warning Message",
												description: "This is a message part of multiple messages",
												...messagesProps
											},
											{
												scheme: Scheme.DANGER,
												title: "Danger Message",
												description: "This is a message part of multiple messages",
												...messagesProps
											}
										]);
									}} />

                                <Button text="Close All Multiple Messages" icon="fa fa-clone fa-flip-vertical" scheme={Scheme.PRIMARY} 
									onClick={(e) => this.messages ? this.messages.closeAll() : null} />
                            </div>
							<div ref={this.messagesDiv1}></div>
                        </AccordionPanel>
                        {getSourceInEditorR(source1, this.previewPanel1)}
                    </Accordion>
                </Panel>

                <Panel borderless elevation={Elevation.ONE}>
                    <div className="accordion-controlled-header-buttons">
                        <div className="right">
                            <i className="fa fa-code" onClick={(e) => {this.previewPanel1.current.toggle()}}></i>
                            <i className="fa fa-copy" onClick={(e) => {copyToClipboard(source1)}}></i>
                        </div>
                        <span className="left">Custom Message Content</span>
                    </div>
                    <Accordion borderless multiple activeIndex={[0]}>
                        <AccordionPanel noheader nodivier className="norseu-showcase-component-page-preview">
                            <div className="norseu-display-flex">
								<Message ref={this.message1} icon={null} scheme={Scheme.SECONDARY} description={
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
											<Button text="Close" onClick={(e) => this.message1.current.close(e)}/>
											<Button scheme={Scheme.SUCCESS} text="Submit" onClick={(e) => this.message1.current.close(e)}/>
										</div>
									</div>
								} sticky/>
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
                <h1>Message</h1>

                <Panel className="norseu-p-20px" elevation={Elevation.ONE}>
                    <SyntaxHighlighter language="javascript" style={prism} className={"norseu-showcase-code"}>
                        {`import { Message } from 'norseu/core/overlay'`}
                    </SyntaxHighlighter>
                </Panel>
                
                {this.renderSampleComponents()}
                {this.renderDocumentation()}

            </div>
        )
    }

}