
import React from "react"
import { Panel, TabPane, TabPanel } from 'norseu/core/panels'
import { Elevation, Scheme } from "norseu/core/variables"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';

export class ElevationPage extends React.Component {

    state = {
        pageSource: ''
    }

    loadPageSource() {
        fetch("https://raw.githubusercontent.com/ronuse/norseu/main/showcase/src/components/core/variables/ElevationPage.js")
        .then(response => response.text())
        .then(data => this.setState({pageSource : data}))
		.catch(error => { throw error});
    }

    renderInteractiveEditor() {
        return (
            <Panel className="norseu-padding-left-right-20px">
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

    renderSampleComponents() {
        return (
            <div>
                <Panel className="norseu-padding-left-right-20px" contentClassName="norseu-flex">
                    <Panel elevation={Elevation.ONE} className="norseu-showcase-elevation">
                        {Elevation.ONE}
                    </Panel>
                    
                    <Panel elevation={Elevation.TWO} className="norseu-showcase-elevation">
                        {Elevation.TWO}
                    </Panel>
                    
                    <Panel elevation={Elevation.THREE} className="norseu-showcase-elevation">
                        {Elevation.THREE}
                    </Panel>
                    
                    <Panel elevation={Elevation.FOUR} className="norseu-showcase-elevation">
                        {Elevation.FOUR}
                    </Panel>
                    
                    <Panel elevation={Elevation.FIVE} className="norseu-showcase-elevation">
                        {Elevation.FIVE}
                    </Panel>
                    
                    <Panel className="norseu-showcase-elevation norseu-elevation-6">
                        norseu-elevation-6
                    </Panel>
                    
                    <Panel className="norseu-showcase-elevation norseu-elevation-7">
                        norseu-elevation-7
                    </Panel>
                    
                    <Panel className="norseu-showcase-elevation norseu-elevation-8">
                        norseu-elevation-8
                    </Panel>
                    
                    <Panel className="norseu-showcase-elevation norseu-elevation-9">
                        norseu-elevation-9
                    </Panel>
                    
                    <Panel className="norseu-showcase-elevation norseu-elevation-10">
                        norseu-elevation-10
                    </Panel>
                    
                    <Panel className="norseu-showcase-elevation norseu-elevation-11">
                        norseu-elevation-11
                    </Panel>
                    
                    <Panel className="norseu-showcase-elevation norseu-elevation-12">
                        norseu-elevation-12
                    </Panel>
                    
                    <Panel className="norseu-showcase-elevation norseu-elevation-13">
                        norseu-elevation-13
                    </Panel>
                </Panel>
            </div>
        )
    }

    renderDocumentation() {
        if (this.state.pageSource === '') {
            this.loadPageSource();
        }
        
        return (
            <Panel className="norseu-padding-left-right-20px">
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
                <h1>Elevation</h1>

                <Panel className="norseu-padding-left-right-20px">
                    <SyntaxHighlighter language="javascript" style={prism} className={"norseu-showcase-code"}>
                        {`import { Elevation } from 'norseu/core/variables'`}
                    </SyntaxHighlighter>
                </Panel>
                
                {this.renderInteractiveEditor()}
                {this.renderSampleComponents()}
                {this.renderDocumentation()}

            </div>
        )
    }

}
