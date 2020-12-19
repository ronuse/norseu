
import React from "react";
import { Panel, TabPane, TabPanel } from 'ronuse-react-ui/core/panels';
import { Checkbox } from 'ronuse-react-ui/core/form';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Scheme } from "ronuse-react-ui/core/variables/Stylers";
import { Alignment } from "ronuse-react-ui/core/variables";

export class CheckboxPage extends React.Component {

    state = {
        pageSource: '',
        checked: true,
        checked2: false,
        alignCheckBox: Alignment.LEFT,
        multiStateValue2: "Minus",
        multiStateValue3: "Yes",
        multiStateValue5: "Primary"
    }

    loadPageSource() {
        fetch("https://raw.githubusercontent.com/ronuse/ronuse-react-ui/main/showcase/src/components/core/form/CheckboxPage.js")
        .then(response => response.text())
        .then(data => this.setState({pageSource : data}));
    }

    renderInteractiveEditor() {
        return (
            <Panel className="r-r-padding-left-right-20px">
                <h3>Component Generator</h3>
                <TabPane activeTabIndex={0}>
                    <TabPanel title="Designer" icon="fa fa-eye">
                        
                    </TabPanel>
                    <TabPanel title="Generated Source (React)" icon="fa fa-code">
                        <SyntaxHighlighter language="jsx" style={prism} className={"r-r-showcase-code"} >
                            {`<Button text="Click Me" />`}
                        </SyntaxHighlighter>
                    </TabPanel>
                    <TabPanel title="Generated Source (HTML)" icon="fa fa-code">
                        <SyntaxHighlighter language="jsx" style={prism} className={"r-r-showcase-code"} >
                            {`<Button text="Click Me" />`}
                        </SyntaxHighlighter>
                    </TabPanel>
                </TabPane>
            </Panel>
        )
    }

    checkStates2() {
        return [
            {
                value: "Minus",
                icon: "fa fa-minus",
                scheme: null,
                checked: true
            },
            {
                value: "Plus",
                icon: "fa fa-plus",
                scheme: null,
                checked: true
            }
        ]
    }

    checkStates3() {
        return [
            {
                value: "Yes",
                icon: "fa fa-thumbs-o-up",
                scheme: null,
                checked: true
            },
            {
                value: "No",
                icon: "fa fa-thumbs-o-down",
                scheme: null,
                checked: false
            },
            {
                value: "Maybe",
                icon: "fa fa-hand-paper-o",
                scheme: null,
                checked: "kinda"
            }
        ]
    }

    checkStates5() {
        return [
            {
                value: "Secondary",
                icon: "fa fa-circle",
                scheme: Scheme.SECONDARY,
                checked: true
            },
            {
                value: "Success",
                icon: "fa fa-circle",
                scheme: Scheme.SUCCESS,
                checked: true
            },
            {
                value: "Info",
                icon: "fa fa-circle",
                scheme: Scheme.INFO,
                checked: true
            },
            {
                value: "Warning",
                icon: "fa fa-circle",
                scheme: Scheme.WARNING,
                checked: true
            },
            {
                value: "Danger",
                icon: "fa fa-circle",
                scheme: Scheme.DANGER,
                checked: true
            }
        ]
    }

    renderSampleComponents() {
        let checkStates2 = this.checkStates2();
        let checkStates3 = this.checkStates3();
        let checkStates5 = this.checkStates5();
        let customLabel = <label className="r-r-primary-text fa fa-book" > Schemed And Styled Text</label>;

        return (
            <Panel className="r-r-padding-left-right-20px">
                <Panel title="Basic" expanded collapsible borderless>
                    <Checkbox/><br/>
                    <Checkbox label="Default Uncheked"/><br/>
                    <Checkbox name="1-checkbox" label="Checked" checked={true}/><br/>
                    <Checkbox label="Disabled" checked={true} disabled/><br/>
                    <Checkbox label={this.state.checked ? "Checked - true" : "Checked - false"} checked={this.state.checked} 
                                onChange={e => this.setState({ checked: e.checked })} selfManaged/><br/>
                    <Checkbox name="readonly-checkbox" scheme={Scheme.PRIMARY} label="Read Only" readOnly checked/>
                </Panel>
                
                <Panel title="With Scheme" expanded collapsible borderless>
                    <Checkbox scheme={Scheme.INFO} label="Default Uncheked"/><br/>
                    <Checkbox scheme={Scheme.SUCCESS} label="Checked" checked={true}/><br/>
                    <Checkbox scheme={!this.state.checked2 ? Scheme.WARNING : Scheme.DANGER} 
                                label={!this.state.checked2 ? "Warning" : "Danger"} checked={this.state.checked2} 
                                onChange={e => this.setState({ checked2: e.checked })}/><br/>
                    <Checkbox scheme={Scheme.SECONDARY} label={customLabel} checked={true}/>
                </Panel>

                <Panel title="Skeleton" scheme={Scheme.SKELETON} expanded collapsible borderless>
                    <Checkbox scheme={Scheme.INFO} label="Default Uncheked"/><br/>
                    <Checkbox scheme={Scheme.SUCCESS} label="Checked" checked={true}/><br/>
                    <Checkbox scheme={!this.state.checked ? Scheme.WARNING : Scheme.DANGER} 
                                label={!this.state.checked ? "Warning" : "Danger"} checked={this.state.checked} 
                                onChange={e => this.setState({ checked: e.checked })} /><br/>
                </Panel>

                <Panel title="Change Checkbox Allignment, TODO change select below to ronuse select Component" expanded collapsible borderless>
                    <select onChange={(e)=>{this.setState({ alignCheckBox: e.target.value} )}}>
                        <option value={Alignment.LEFT}>{"LEFT"}</option>
                        <option value={Alignment.RIGHT}>{"RIGHT"}</option>
                        <option value={Alignment.TOP}>{"TOP"}</option>
                        <option value={Alignment.CENTER}>{"CENTER"}</option>
                        <option value={Alignment.TOP_CENTER}>{"TOP_CENTER"}</option>
                        <option value={Alignment.TOP_LEFT}>{"TOP_LEFT"}</option>
                        <option value={Alignment.TOP_RIGHT}>{"TOP_RIGHT"}</option>
                        <option value={Alignment.BOTTOM}>{"BOTTOM"}</option>
                        <option value={Alignment.BOTTOM_LEFT}>{"BOTTOM_LEFT"}</option>
                        <option value={Alignment.BOTTOM_RIGHT}>{"BOTTOM_RIGHT"}</option>
                        <option value={Alignment.BOTTOM_CENTER}>{"BOTTOM_CENTER"}</option>
                    </select><br/><br/>
                    <Checkbox scheme={Scheme.PRIMARY} label={`Align the checkbox ${this.state.alignCheckBox}`} align={this.state.alignCheckBox}/><br/>
                </Panel>

                <Panel title="Multiple States" expanded collapsible borderless>
                        <Checkbox scheme={Scheme.PRIMARY} label={`2 states: ${this.state.multiStateValue2}`} 
                            checkStates={checkStates2} 
                            checkedIndex={0} onChange={e => this.setState({ multiStateValue2: e.value })}/>
                        <br/>
                        <Checkbox scheme={Scheme.PRIMARY} label={`3 states: ${this.state.multiStateValue3}`} 
                            checkStates={checkStates3} 
                            checkedIndex={0} onChange={e => this.setState({ multiStateValue3: e.value })}/>
                        <br/>
                        <Checkbox scheme={Scheme.PRIMARY} label={`5 schemed states: ${this.state.multiStateValue5}`} 
                            checkStates={checkStates5} 
                            checkedIndex={0} onChange={e => this.setState({ multiStateValue5: e.value })}/>
                    <br/>
                </Panel>
            </Panel>
        )
    }

    renderDocumentation() {
        if (this.state.pageSource === '') {
            this.loadPageSource();
        }
        
        return (
            <Panel className="r-r-padding-left-right-20px">
                <TabPane activeTabIndex={0}>
                    <TabPanel title="Documentation" icon="fa fa-book">
                        <h2>Properties</h2>
                        <h2>CSS</h2>


                        Change alert and console to popups
                    </TabPanel>
                    <TabPanel title="Page Source" icon="fa fa-code">
                        <SyntaxHighlighter language="jsx" style={prism} className={"r-r-showcase-code"} >
                            {this.state.pageSource}
                        </SyntaxHighlighter>
                    </TabPanel>
                </TabPane>
                
            </Panel>
        )
    }

    render() {
        return (
            <div className="r-r-showcase-component-page">
                <h1>Checkbox</h1>

                <Panel className="r-r-padding-left-right-20px">
                    <SyntaxHighlighter language="javascript" style={prism} className={"r-r-showcase-code"}>
                        {`import { Checkbox } from 'ronuse-react-ui/core/form'`}
                    </SyntaxHighlighter>
                </Panel>
                
                {this.renderInteractiveEditor()}
                {this.renderSampleComponents()}
                {this.renderDocumentation()}

            </div>
        )
    }

}