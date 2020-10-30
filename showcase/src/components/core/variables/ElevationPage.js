
import React from "react"
import { Panel, TabPane, TabPanel } from 'ronuse-react-ui/core/panels'
import { Button } from 'ronuse-react-ui/core/buttons'
import { Elevation, Scheme } from "ronuse-react-ui/core/variables"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';

export class ElevationPage extends React.Component {

    state = {
        pageSource: ''
    }

    loadPageSource() {
        fetch("https://raw.githubusercontent.com/ronuse/ronuse-react-ui/main/showcase/src/components/core/variables/ElevationPage.js")
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
        return (
            <div>
                <Panel className="r-r-padding-left-right-20px" contentClassName="r-r-flex">
                    <Panel elevation={Elevation.ONE} className="r-r-showcase-elevation">
                        {Elevation.ONE}
                    </Panel>
                    
                    <Panel elevation={Elevation.TWO} className="r-r-showcase-elevation">
                        {Elevation.TWO}
                    </Panel>
                    
                    <Panel elevation={Elevation.THREE} className="r-r-showcase-elevation">
                        {Elevation.THREE}
                    </Panel>
                    
                    <Panel elevation={Elevation.FOUR} className="r-r-showcase-elevation">
                        {Elevation.FOUR}
                    </Panel>
                    
                    <Panel elevation={Elevation.FIVE} className="r-r-showcase-elevation">
                        {Elevation.FIVE}
                    </Panel>
                    
                    <Panel className="r-r-showcase-elevation r-r-elevation-6">
                        r-r-elevation-6
                    </Panel>
                    
                    <Panel className="r-r-showcase-elevation r-r-elevation-7">
                        r-r-elevation-7
                    </Panel>
                    
                    <Panel className="r-r-showcase-elevation r-r-elevation-8">
                        r-r-elevation-8
                    </Panel>
                    
                    <Panel className="r-r-showcase-elevation r-r-elevation-9">
                        r-r-elevation-9
                    </Panel>
                    
                    <Panel className="r-r-showcase-elevation r-r-elevation-10">
                        r-r-elevation-10
                    </Panel>
                    
                    <Panel className="r-r-showcase-elevation r-r-elevation-11">
                        r-r-elevation-11
                    </Panel>
                    
                    <Panel className="r-r-showcase-elevation r-r-elevation-12">
                        r-r-elevation-12
                    </Panel>
                    
                    <Panel className="r-r-showcase-elevation r-r-elevation-13">
                        r-r-elevation-13
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
            <Panel className="r-r-padding-left-right-20px">
                <TabPane activeTabIndex={0}>
                    <TabPanel scheme={Scheme.INFO} title="Documentation" icon="fa fa-book">
                        <h2>Properties</h2>
                        <h2>CSS</h2>
                    </TabPanel>
                    <TabPanel scheme={Scheme.SUCCESS} title="Page Source" icon="fa fa-code">
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
                <h1>Elevation</h1>

                <Panel className="r-r-padding-left-right-20px">
                    <SyntaxHighlighter language="javascript" style={prism} className={"r-r-showcase-code"}>
                        {`import { Elevation } from 'ronuse-react-ui/core/variables'`}
                    </SyntaxHighlighter>
                </Panel>
                
                {this.renderInteractiveEditor()}
                {this.renderSampleComponents()}
                {this.renderDocumentation()}

            </div>
        )
    }

}
