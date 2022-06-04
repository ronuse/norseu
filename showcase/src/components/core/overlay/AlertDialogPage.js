
import React from "react";
import { Panel, TabPane, TabPanel, Accordion, AccordionPanel } from 'norseu/core/panels';
import { Button } from 'norseu/core/buttons';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Scheme } from "norseu/core/variables/Stylers";
import { Position, Orientation, Elevation, InputFilters, Alignment } from "norseu/core/variables";
import { LinearLayout } from "norseu/layouts";
import { PasswordInput, InputText, Checkbox } from "norseu/core/form";
import { AlertDialog, alertDialog, loadingDialog } from "norseu/core/overlay";
import Helpers from "../../../utils/Helpers"

export class AlertDialogPage extends React.Component {

    state = {
        pageSource: '',
        showBasic: false,
        showOverflow: false,
        showMaximizable: false,
        showWithoutModal: false,
        showWithPosition: false,
        showWithoutHeaderAndFooter: false,
        dialogPosition: Position.LEFT,
        alignNavigator: Alignment.RIGHT
    }

    constructor(props) {
        super(props)
        this.state = { 
            pageSource: '',
            visible: false,
            nbVisible: false,
            cobVisible: false,
            wiVisible: false
        };

        this.previewPanel1 = React.createRef();
        this.previewPanel2 = React.createRef();
        this.previewPanel3 = React.createRef();

        this.onConfirm = this.onConfirm.bind(this);
        this.onCancel = this.onCancel.bind(this);
    }
    
    loadPageSource() {
        fetch("https://raw.githubusercontent.com/ronuse/ronuse-react-ui/main/showcase/src/components/core/overlay/AlertDialogPage.js")
        .then(response => response.text())
        .then(data => this.setState({
            pageSource : data,
        }))
		.catch(error => { throw error});
    }

    getSourcesWithinLine(from, to) {
        const sourceSlice = Helpers.getSourceInEditorR(this.state.pageSource, from, to, true);
        return sourceSlice;
    }

    onConfirm() {
        console.log("Alert confirm"); // TODO: use toast
    }

    onCancel() {
        console.log("Alert cancel"); // TODO: use toast
    }

    basicText() {
        return <p>You email address has been verified. <br/>Now you can proceed to updating your profile and <br/>adding new friends</p>;
    }

    renderSampleComponents() {
        const source1 = this.getSourcesWithinLine(89, 118);
        const source2 = this.getSourcesWithinLine(137);
        const source3 = this.getSourcesWithinLine(160, 166);

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
                                <Button text="Show Alert Dialog" icon="fa fa-check" scheme={Scheme.PRIMARY} onClick={()=>{
                                    alertDialog({
                                        message: <p>Are you sure you want to delete the email <br/><b>address@domain.com</b> from this account. <br/>You can always add another email.</p>,
                                        icon: "fa fa-trash-alt",
                                        confirmLabel: "Remove Email",
                                        cancelLabel: "Cancel",
                                        confirmScheme: Scheme.DANGER,
                                        onConfirm: this.onConfirm,
                                        onCancel: this.onCancel
                                    });
                                }} />
                                
                                <Button text="Show Loading Dialog" icon="fa fa-check" scheme={Scheme.PRIMARY} onClick={()=>{
                                    loadingDialog({}, {
                                        loadingIcon: "fas fa-spinner fa-pulse",
                                        onLoading: (params, dialog) => {
                                            console.log("Loading..."); // use toast
                                            setTimeout(function() {
                                                console.log("Loading complete..."); // use toast
                                                dialog.update({
                                                    message: "The upload is completed.",
                                                    icon: "fa fa-info",
                                                    confirmLabel: "Continue",
                                                    confirmScheme: Scheme.SUCCESS,
                                                    onConfirm: this.onConfirm
                                                });
                                            }, 1000*2);                                            
                                        }
                                    });
                                }} />
                            </div>
                        </AccordionPanel>
                        {Helpers.getSourceInEditorR(source1, this.previewPanel1)}
                    </Accordion>
                </Panel>
                
                <Panel borderless elevation={Elevation.ONE}>
                    <div className="accordion-controlled-header-buttons">
                        <div className="right">
                            <i className="fa fa-code" onClick={(e) => {this.previewPanel2.current.toggle()}}></i>
                            <i className="fa fa-copy" onClick={(e) => {Helpers.copyToClipboard(source2)}}></i>
                        </div>
                        <span className="left">Using Alert Dialog Tag</span>
                    </div>
                    <Accordion borderless multiple activeIndex={[0]}>
                        <AccordionPanel noheader nodivier className="norseu-showcase-component-page-preview">
                            <span>Footer Allignment </span>
                            <select onChange={(e)=>{this.setState({ alignNavigator: e.target.value} )}}>
                                <option value={Alignment.RIGHT}>{"RIGHT"}</option>
                                <option value={Alignment.CENTER}>{"CENTER"}</option>
                                <option value={Alignment.LEFT}>{"LEFT"}</option>
                            </select> TODO change select below to ronuse select Component
                            <div className="norseu-display-flex">
                                <Button text="Show" icon="fa fa-eye" scheme={Scheme.PRIMARY} onClick={() => this.setState({ visible: true })} />
                                <AlertDialog visible={this.state.visible} onHide={() => this.setState({ visible: false })} message={this.basicText()} 
                                    cancelLabel="Cancel" confirmScheme={Scheme.SUCCESS} cancelScheme={Scheme.DANGER} dismissableModal
                                    onConfirm={this.onConfirm} onCancel={this.onCancel} alignFooter={this.state.alignNavigator}/>
                            </div>
                        </AccordionPanel>
                        {Helpers.getSourceInEditorR(source2, this.previewPanel2)}
                    </Accordion>
                </Panel>
                
                <Panel borderless elevation={Elevation.ONE}>
                    <div className="accordion-controlled-header-buttons">
                        <div className="right">
                            <i className="fa fa-code" onClick={(e) => {this.previewPanel3.current.toggle()}}></i>
                            <i className="fa fa-copy" onClick={(e) => {Helpers.copyToClipboard(source3)}}></i>
                        </div>
                        <span className="left">Optional Properties</span>
                    </div>
                    <Accordion borderless multiple activeIndex={[0]}>
                        <AccordionPanel noheader nodivier className="norseu-showcase-component-page-preview">
                            <div className="norseu-display-flex">
                                <Button text="No Buttons"scheme={Scheme.PRIMARY} onClick={() => this.setState({ nbVisible: true })} />
                                <Button text="Cancel Button Only"scheme={Scheme.PRIMARY} onClick={() => this.setState({ cobVisible: true })} />
                                <Button text="With Icon"scheme={Scheme.PRIMARY} onClick={() => this.setState({ wiVisible: true })} />
                                <Button text="Cancel And Confirm Label Scheme"scheme={Scheme.PRIMARY} onClick={() => this.setState({ ccsVisible: true })} />

                                <AlertDialog visible={this.state.nbVisible} dismissableModal={true} onHide={() => this.setState({ nbVisible: false })} message={this.basicText()} confirmLabel={null}/>
                                <AlertDialog visible={this.state.cobVisible} onHide={() => this.setState({ cobVisible: false })} message={this.basicText()} confirmLabel={null}
                                    cancelLabel="Close"/>
                                <AlertDialog visible={this.state.wiVisible} icon="fa fa-print" onHide={() => this.setState({ wiVisible: false })} message={this.basicText()}
                                    cancelLabel="Cancel"/>
                                <AlertDialog visible={this.state.ccsVisible} icon="fa fa-wifi" onHide={() => this.setState({ ccsVisible: false })} message={this.basicText()}
                                    cancelLabel="Cancel" confirmScheme={Scheme.SUCCESS} cancelScheme={Scheme.DANGER}/>
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
                <h1>AlertDialog</h1>

                <Panel className="norseu-p-20px" elevation={Elevation.ONE}>
                    <SyntaxHighlighter language="javascript" style={prism} className={"norseu-showcase-code"}>
                        {`import { AlertDialog } from 'norseu/core/overlay'`}
                    </SyntaxHighlighter>
                </Panel>
                
                {this.renderSampleComponents()}
                {this.renderDocumentation()}

            </div>
        )
    }

}