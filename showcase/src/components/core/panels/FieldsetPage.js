
import React from "react"
import { Panel, TabPane, TabPanel, Fieldset } from 'norseu/core/panels'
import { Button } from 'norseu/core/buttons'
import { Elevation, Scheme } from "norseu/core/variables"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';

export class FieldsetPage extends React.Component {

    state = {
        pageSource: ''
    }

    loadPageSource() {
        fetch("https://raw.githubusercontent.com/ronuse/norseu/main/showcase/src/components/core/panels/FieldsetPage.js")
        .then(response => response.text())
        .then(data => this.setState({pageSource : data}))
		.catch(error => { throw error});
    }

    // TODO chage alerts to taost component
    onCollapse(event) {
        alert("The Fieldset has been collapsed"); 
    }

    onExpand(event) {
        alert("The Fieldset has been expanded");
    }

    renderInteractiveEditor() {
        return (
            <Panel className="norseu-p-left-right-20px">
                <h3>Component Generator</h3>
                <TabPane activeTabIndex={0}>
                    <TabPanel title="Designer" icon="fa fa-eye">
                        
                    </TabPanel>
                    <TabPanel title="Generated Source (React)" icon="fa fa-code">
                        <SyntaxHighlighter language="jsx" style={prism} className={"norseu-showcase-code"} >
                            {`<Button text="Click Me" />`}
                        </SyntaxHighlighter>
                    </TabPanel>
                    <TabPanel title="Generated Source (HTML)" icon="fa fa-code">
                        <SyntaxHighlighter language="jsx" style={prism} className={"norseu-showcase-code"} >
                            {`<Button text="Click Me" />`}
                        </SyntaxHighlighter>
                    </TabPanel>
                </TabPane>
            </Panel>
        )
    }

    text1() {
        return (
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vulputate dolor neque, 
                vel porta sem tincidunt ut. Pellentesque lacinia orci quis sagittis tincidunt. 
                Proin viverra varius orci, at blandit mauris feugiat vitae. Aliquam elit nisi, 
                molestie ac maximus eget, aliquet nec tortor. Pellentesque bibendum ante vel risus efficitur volutpat.</p>
        )
    }

    renderSampleComponents() {
        let customIcon1 = <img alt="ronuse-react-ui" src="https://avatars3.githubusercontent.com/u/14879387?s=16" style={{borderRadius:"50%"}}/>;
        let customLegend = <Button scheme={Scheme.PRIMARY} icon={customIcon1} text="Custom Legend" />

        return (
            <div>
                <Panel className="norseu-p-left-right-20px">
                    <h3>Basic</h3>
                    <Fieldset legend="Header">
                        {this.text1()}
                    </Fieldset>

                    <h3>Collapsible with scheme</h3>
                    <Fieldset legend="Header" scheme={Scheme.INFO} expanded collapsible>
                        {this.text1()}
                    </Fieldset>

                    <h3>Borderless</h3>
                    <Fieldset scheme={Scheme.WARNING} legend="Legend" borderless expanded collapsible>
                        {this.text1()}
                    </Fieldset>

                    <h3>Skeleton</h3>
                    <Fieldset scheme={Scheme.SKELETON} legend="Header" elevation={Elevation.SIX} expanded collapsible>
                        {this.text1()}
                    </Fieldset>

                    <h3>With custom legend</h3>
                    <Fieldset scheme={Scheme.DANGER} legend={customLegend} elevation={Elevation.SIX} expanded collapsible>
                        {this.text1()}
                    </Fieldset>
                    
                    <h3>Events</h3>
                    <Fieldset legend="Header" onExpand={this.onExpand} onCollapse={this.onCollapse} expanded collapsible>
                        {this.text1()}
                    </Fieldset>
                </Panel>
            </div>
        )
    }

    renderDocumentation() {
        if (this.state.pageSource === '') {
            this.loadPageSource();
        }
        
        return (
            <Panel className="norseu-p-left-right-20px norseu-p-bottom-20px">
                <TabPane activeTabIndex={0}>
                    <TabPanel scheme={Scheme.INFO} title="Documentation" icon="fa fa-book">
                        <h2>Properties</h2>
                        <h2>CSS</h2>
                    </TabPanel>
                    <TabPanel scheme={Scheme.SUCCESS} title="Page Source" icon="fa fa-code">
                        <SyntaxHighlighter language="jsx" style={prism} className={"norseu-showcase-code"} >
                            {this.state.pageSource}
                        </SyntaxHighlighter>
                    </TabPanel>
                </TabPane>
                
            </Panel>
        )
    }

    render() {
        return (
            <div className="norseu-showcase-component-page">
                <h1>Panel</h1>

                <Panel borderless>
                    <SyntaxHighlighter language="javascript" style={prism} className={"norseu-showcase-code"}>
                        {`import { Fieldset } from 'norseu/core/panels'`}
                    </SyntaxHighlighter>
                </Panel>
                
                {this.renderInteractiveEditor()}
                {this.renderSampleComponents()}
                {this.renderDocumentation()}

            </div>
        )
    }

}
