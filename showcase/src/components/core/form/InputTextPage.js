
import React from "react";
import { Panel, TabPane, TabPanel } from 'ronuse-react-ui/core/panels';
import { InputText } from 'ronuse-react-ui/core/form';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Scheme } from "ronuse-react-ui/core/variables/Stylers";
import { Alignment } from "ronuse-react-ui/core/variables";

export class InputTextPage extends React.Component {

    state = {
        pageSource: '',
        alignLabel: Alignment.TOP,
        alignLabel2: Alignment.TOP,
        alignHelpLabel: Alignment.BOTTOM
    }

    loadPageSource() {
        fetch("https://raw.githubusercontent.com/ronuse/ronuse-react-ui/main/showcase/src/components/core/form/InputTextPage.js")
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

    renderSampleComponents() {
        const customLabel1 = <label className="r-r-secondary-text fa fa-user" > Schemed And Styled Label</label>;
        const customLabel2 = <label>First name <span style={{color: "red"}}>*</span></label>;

        return (
            <Panel className="r-r-padding-left-right-20px">
                <Panel title="Basic" expanded collapsible borderless>
                    <InputText name="user-name"/>
                    <br/><br/>

                    <InputText placeholder="With placeholder"/>
                    <br/><br/>

                    <InputText placeholder="Outlined" outlined/>
                    <br/><br/>

                    <InputText placeholder="Flushed" flushed/>
                    <br/><br/>

                    <InputText placeholder="Outlined and Flushed" outlined flushed/>
                    <br/><br/>

                    <InputText placeholder="No Style" nostyle/>
                    <br/><br/>

                    <InputText placeholder="Disabled" disabled/>
                    <br/><br/>

                </Panel>

                
                <Panel title="With schemes" expanded collapsible borderless>

                    <InputText placeholder="Primary scheme" scheme={Scheme.PRIMARY}/>
                    <br/><br/>

                    <InputText placeholder="Secondary scheme" scheme={Scheme.SECONDARY}/>
                    <br/><br/>

                    <InputText placeholder="Success scheme" scheme={Scheme.SUCCESS} outlined/>
                    <br/><br/>

                    <InputText placeholder="info scheme" scheme={Scheme.INFO} flushed/>
                    <br/><br/>

                    <InputText placeholder="Warning scheme" scheme={Scheme.WARNING} outlined/>
                    <br/><br/>

                    <InputText placeholder="Danger scheme" scheme={Scheme.DANGER} outlined flushed/>
                    <br/><br/>

                </Panel>

                
                <Panel title="Label" expanded collapsible borderless>

                    <InputText placeholder="e.g. Damilola" scheme={Scheme.PRIMARY} label="First name"/>
                    <br/><br/>

                    <h5>Floating Label</h5>
                    <InputText style={{marginTop: "15px"}} scheme={Scheme.PRIMARY} label="First name" alignLabel={Alignment.TOP} floatLabel/>
                    <br/><br/>
                    
                    <InputText style={{marginTop: "10px"}} scheme={Scheme.PRIMARY} label="Last name" alignLabel={Alignment.TOP} floatLabel flushed outlined/>
                    <br/><br/>

                    <h5>Custom Label</h5>
                    <InputText scheme={Scheme.PRIMARY} label={customLabel1} alignLabel={Alignment.TOP}/>
                    <br/><br/>
                    
                    <InputText scheme={Scheme.PRIMARY} label={customLabel2} alignLabel={Alignment.TOP}/>
                    <br/><br/>

                    <h5>Change label alignment</h5>
                    <select onChange={(e)=>{this.setState({ alignLabel: e.target.value} )}}>
                        <option value={Alignment.TOP}>{"TOP"}</option>
                        <option value={Alignment.LEFT}>{"LEFT"}</option>
                        <option value={Alignment.RIGHT}>{"RIGHT"}</option>
                        <option value={Alignment.BOTTOM}>{"BOTTOM"}</option>
                    </select><br/><br/>
                    <InputText placeholder="alignLabel={Alignment.?}" scheme={Scheme.PRIMARY} label="Fullname" alignLabel={this.state.alignLabel}/>
                    <br/><br/>

                </Panel>

                
                <Panel title="Help Label" expanded collapsible borderless>

                    <InputText scheme={Scheme.PRIMARY} label="Username" alignLabel={Alignment.TOP} alignHelpLabel={Alignment.TOP} helpLabel="Enter your username to login to  your account"/>
                    <br/><br/>

                    <InputText scheme={Scheme.PRIMARY} label="Clear Password" 
                        alignLabel={Alignment.TOP} 
                        helpLabel={<React.Fragment><i className="fa fa-info"/> <small>Hint: The new password must at least seven characters long.</small><br/>
                                    <small>To make it stronger use upper and lower case letters, numbers and</small><br/>
                                    <small>symbol like !, $, &, ), @.</small></React.Fragment>}
                        style={{}}/>
                    <br/><br/>

                    <h5>Change label alignment</h5>
                    Label Alignment: <select onChange={(e)=>{this.setState({ alignLabel2: e.target.value} )}}>
                        <option value={Alignment.TOP}>{"TOP"}</option>
                        <option value={Alignment.LEFT}>{"LEFT"}</option>
                        <option value={Alignment.RIGHT}>{"RIGHT"}</option>
                        <option value={Alignment.BOTTOM}>{"BOTTOM"}</option>
                    </select><br/><br/>
                    Help Label Alignment: <select onChange={(e)=>{this.setState({ alignHelpLabel: e.target.value} )}}>
                        <option value={Alignment.BOTTOM}>{"BOTTOM"}</option>
                        <option value={Alignment.TOP}>{"TOP"}</option>
                        <option value={Alignment.LEFT}>{"LEFT"}</option>
                        <option value={Alignment.RIGHT}>{"RIGHT"}</option>
                    </select><br/><br/>
                    <InputText placeholder="alignLabel={Alignment.?}" scheme={Scheme.PRIMARY} 
                        label="Fullname" 
                        helpLabel="Enter your username to login to  your accout"
                        alignLabel={this.state.alignLabel2}
                        alignHelpLabel={this.state.alignHelpLabel}/>
                    <br/><br/>

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
                <h1>InputText</h1>

                <Panel className="r-r-padding-left-right-20px">
                    <SyntaxHighlighter language="javascript" style={prism} className={"r-r-showcase-code"}>
                        {`import { InputText } from 'ronuse-react-ui/core/form''`}
                    </SyntaxHighlighter>
                </Panel>
                
                {this.renderInteractiveEditor()}
                {this.renderSampleComponents()}
                {this.renderDocumentation()}

            </div>
        )
    }

}