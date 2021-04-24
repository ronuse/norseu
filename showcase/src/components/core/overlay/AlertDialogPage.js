
import React from "react";
import { Panel, TabPane, TabPanel, Accordion, AccordionPanel } from '@ronuse/react-ui/core/panels';
import { Button } from '@ronuse/react-ui/core/buttons';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Scheme } from "@ronuse/react-ui/core/variables/Stylers";
import { Position, Orientation, Elevation, InputFilters } from "@ronuse/react-ui/core/variables";
import { LinearLayout } from "@ronuse/react-ui/layouts";
import { PasswordInput, InputText, Checkbox } from "@ronuse/react-ui/core/form";
import { AlertDialog, alertDialog, loadingDialog } from "@ronuse/react-ui/core/overlay";
import { getTextBetweenLine, copyToClipboard, getSourceInEditorR } from "../../../utils/helpers"

export class AlertDialogPage extends React.Component {

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
        this.state = {
            visible: false
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
        }));
    }

    getSourceWithinLine(from, to) {
        const sourceSlice = getTextBetweenLine(this.state.pageSource, from, to, true);
        return sourceSlice;
    }

    onConfirm() {
        console.log("Alert confirm"); // TODO: use toast
    }

    onCancel() {
        console.log("Alert cancel"); // TODO: use toast
    }

    renderSampleComponents() {
        const source1 = this.getSourceWithinLine(82, 90);
        const source2 = this.getSourceWithinLine(110, 112);
        const source3 = this.getSourceWithinLine(87, 93);

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
                                <Button text="Confirm" icon="fa fa-check" scheme={Scheme.PRIMARY} onClick={()=>{
                                    alertDialog({
                                        message: <p>Are you sure you want to delete the email <br/><b>address@domain.com</b> from this account. You can always add another email.</p>,
                                        icon: "fa fa-trash-alt",
                                        confirmLabel: "Remove Email",
                                        cancelLabel: "Cancel",
                                        confirmScheme: Scheme.DANGER,
                                        onConfirm: this.onConfirm,
                                        onCancel: this.onCancel
                                    });
                                }} />
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
                        <span className="left">Using Alert Dialog Tag</span>
                    </div>
                    <Accordion borderless multiple activeIndex={[0]}>
                        <AccordionPanel noheader nodivier className="r-r-showcase-component-page-preview">
                            <div className="r-r-display-flex">
                                <Button text="Show" icon="fa fa-eye" scheme={Scheme.PRIMARY} onClick={() => this.setState({ visible: true })} />
                                <AlertDialog visible={this.state.visible} onHide={() => this.setState({ visible: false })} message={
                                    <p>You email address has been verified. <br/>Now you can proceed to updating your profile and adding new friends</p>
                                } onConfirm={this.onConfirm} onCancel={this.onCancel}/>
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
                <h1>AlertDialog</h1>

                <Panel className="r-r-padding-20px" elevation={Elevation.ONE}>
                    <SyntaxHighlighter language="javascript" style={prism} className={"r-r-showcase-code"}>
                        {`import { AlertDialogPage } from '@ronuse/react-ui/core/overlay'`}
                    </SyntaxHighlighter>
                </Panel>
                
                {this.renderSampleComponents()}
                {this.renderDocumentation()}

            </div>
        )
    }

}