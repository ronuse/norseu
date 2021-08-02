
import React from "react";
import { Panel, TabPane, TabPanel, Accordion, AccordionPanel } from '@ronuse/react-ui/core/panels';
import { Button } from '@ronuse/react-ui/core/buttons';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Scheme } from "@ronuse/react-ui/core/variables/Stylers";
import { Position, Orientation, Elevation, InputFilters } from "@ronuse/react-ui/core/variables";
import { LinearLayout } from "@ronuse/react-ui/layouts";
import { PasswordInput, InputText, Checkbox } from "@ronuse/react-ui/core/form";
import { Popup } from "@ronuse/react-ui/core/overlay";
import { getTextBetweenLine, copyToClipboard, getSourceInEditorR } from "../../../utils/helpers"

export class PopupPage extends React.Component {

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
    }
    
    loadPageSource() {
        fetch("https://raw.githubusercontent.com/ronuse/ronuse-react-ui/main/showcase/src/components/core/overlay/PopupPage.js")
        .then(response => response.text())
        .then(data => this.setState({
            pageSource : data,
        }));
    }

    getSourceWithinLine(from, to) {
        const sourceSlice = getTextBetweenLine(this.state.pageSource, from, to, true);
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
    
    renderFooter(name) {
        return (
            <div>
                <Button text="Cancel" icon="fa fa-times" textonly scheme={Scheme.DANGER} onClick={() => this.setState({[`${name}`]: false})} />
                <Button text="Continue" icon="fa fa-check" scheme={Scheme.PRIMARY} onClick={() => this.setState({[`${name}`]: false})}/>
            </div>
        )
    }

    onHide(name) {
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

                                <Popup header="Basic" isVisible={this.state.showBasic} onHide={(e) => this.onHide('showBasic')} footer={this.renderFooter('showBasic')}>
                                    {this.basicText()} 
                                </Popup>
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
                                <Button text="Maximizable" icon="fa fa-clone fa-flip-vertical" scheme={Scheme.PRIMARY} onClick={() => this.setState({showMaximizable: true})} />
                                <Button text="Without Modal" icon="fa fa-clone fa-flip-vertical" scheme={Scheme.PRIMARY} onClick={() => this.setState({showWithoutModal: true})} />
                                <Button text="Without Header And Footer" icon="fa fa-clone fa-flip-vertical" scheme={Scheme.PRIMARY} onClick={() => this.setState({showWithoutHeaderAndFooter: true})} />
                                
                                <Popup header="Maximizable" maximizable isVisible={this.state.showMaximizable} onHide={(e) => this.onHide('showMaximizable')} footer={this.renderFooter('showMaximizable')}>
                                    {this.overflowText()} 
                                </Popup>

                                <Popup header="Without Modal" noOverlay isVisible={this.state.showWithoutModal} onHide={(e) => this.onHide('showWithoutModal')} footer={this.renderFooter('showWithoutModal')}>
                                    {this.basicText()} 
                                </Popup>

                                <Popup header="Without Header And Footer" noHeader isVisible={this.state.showWithoutHeaderAndFooter} onHide={(e) => this.onHide('showWithoutHeaderAndFooter')}>
                                    {this.basicText()} 
                                </Popup>
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
                                <select onChange={(e)=>{this.setState({ dialogPosition: e.target.value} )}}>
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

                                <Popup header={`Position ${this.state.dialogPosition}`} position={this.state.dialogPosition} isVisible={this.state.showWithPosition} onHide={(e) => this.onHide('showWithPosition')} footer={this.renderFooter('showWithPosition')}>
                                    {this.basicText()} 
                                </Popup>
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
                <h1>Popup</h1>

                <Panel className="r-r-padding-20px" elevation={Elevation.ONE}>
                    <SyntaxHighlighter language="javascript" style={prism} className={"r-r-showcase-code"}>
                        {`import { Popup } from '@ronuse/react-ui/core/overlay'`}
                    </SyntaxHighlighter>
                </Panel>
                
                {this.renderSampleComponents()}
                {this.renderDocumentation()}

            </div>
        )
    }

}