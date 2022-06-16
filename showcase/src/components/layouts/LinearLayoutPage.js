
import React from "react";
import { Panel, TabPane, TabPanel } from '@ronuse/norseu/core/panels';
import { Button } from '@ronuse/norseu/core/buttons';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Scheme } from "@ronuse/norseu/core/variables/Stylers";
import { Orientation } from "@ronuse/norseu/core/variables";
import { LinearLayout } from "@ronuse/norseu/layouts";

export class LinearLayoutPage extends React.Component {

    state = {
        pageSource: ''
    }

    loadPageSource() {
        fetch("https://raw.githubusercontent.com/ronuse/norseu/main/showcase/src/components/sensors/LinearLayoutPage.js")
        .then(response => response.text())
        .then(data => this.setState({pageSource : data}))
		.catch(error => { throw error});
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

    renderSampleComponents() {
        return (
            <Panel className="norseu-p-left-right-20px">

                <Panel title="Horizontal Orientation" expanded collapsible borderless>
                    <LinearLayout orientation={Orientation.HORIZONTAL} nofill>
                        <div style={{height: "100px", width: "150px", backgroundColor: "rgb(127, 127, 127)"}}> </div>
                        <div style={{height: "100px", width: "150px", backgroundColor: "rgb(192, 192, 192)"}}> </div>
                        <div style={{height: "100px", width: "150px", backgroundColor: "rgb(127, 127, 127)"}}> </div>
                    </LinearLayout>
                </Panel>

                <Panel title="Horizontal Orientation With 20px Padding 1" expanded collapsible borderless>
                    <LinearLayout orientation={Orientation.HORIZONTAL} padding={20} style={{backgroundColor: "rgb(103, 103, 103)"}} nofill>
                        <div style={{height: "100px", width: "150px", backgroundColor: "rgb(127, 127, 127)"}}> </div>
                    </LinearLayout>
                </Panel>

                <Panel title="Horizontal Orientation With 20px Padding 2" expanded collapsible borderless>
                    <LinearLayout orientation={Orientation.HORIZONTAL} padding={20} style={{backgroundColor: "rgb(103, 103, 103)"}} nofill>
                        <div style={{flex: 1, height: "100px", width: "150px", backgroundColor: "rgb(127, 127, 127)"}}> </div>
                        <div style={{flex: 1, height: "100px", width: "150px", backgroundColor: "rgb(192, 192, 192)"}}> </div>
                    </LinearLayout>
                </Panel>

                <Panel title="Horizontal Orientation With 20px Padding 3" expanded collapsible borderless>
                    <LinearLayout orientation={Orientation.HORIZONTAL} padding={20} style={{backgroundColor: "rgb(103, 103, 103)"}} nofill>
                        <div style={{flex: 1, height: "100px", width: "150px", backgroundColor: "rgb(127, 127, 127)"}}> </div>
                        <div style={{flex: 1, height: "100px", width: "150px", backgroundColor: "rgb(192, 192, 192)"}}> </div>
                        <div style={{flex: 1, height: "100px", width: "150px", backgroundColor: "rgb(127, 127, 127)"}}> </div>
                    </LinearLayout>
                </Panel>

                <Panel title="Horizontal Orientation With Fill and Each Child Flex Attribute" expanded collapsible borderless>
                    <LinearLayout orientation={Orientation.HORIZONTAL}>
                        <div style={{flex: 1, height: "100px", width: "150px", backgroundColor: "rgb(127, 127, 127)"}}> </div>
                        <div style={{flex: 1, height: "100px", width: "150px", backgroundColor: "rgb(192, 192, 192)"}}> </div>
                        <div style={{flex: 1, height: "100px", width: "150px", backgroundColor: "rgb(127, 127, 127)"}}> </div>
                    </LinearLayout>
                </Panel>

                <Panel title="Vertical Orientation" expanded collapsible borderless>
                    <LinearLayout orientation={Orientation.VERTICAL} nofill>
                        <div style={{height: "100px", width: "150px", backgroundColor: "rgb(127, 127, 127)"}}> </div>
                        <div style={{height: "100px", width: "150px", backgroundColor: "rgb(192, 192, 192)"}}> </div>
                        <div style={{height: "100px", width: "150px", backgroundColor: "rgb(127, 127, 127)"}}> </div>
                    </LinearLayout>
                </Panel>

                <Panel title="Vertical Orientation With 20px Padding 1" expanded collapsible borderless>
                    <LinearLayout orientation={Orientation.VERTICAL} padding={20} style={{backgroundColor: "rgb(103, 103, 103)"}} nofill>
                        <div style={{height: "100px", width: "150px", backgroundColor: "rgb(127, 127, 127)"}}> </div>
                    </LinearLayout>
                </Panel>

                <Panel title="Vertical Orientation With 20px Padding 2" expanded collapsible borderless>
                    <LinearLayout orientation={Orientation.VERTICAL} padding={20} style={{backgroundColor: "rgb(103, 103, 103)"}} nofill>
                        <div style={{height: "100px", width: "150px", backgroundColor: "rgb(127, 127, 127)"}}> </div>
                        <div style={{height: "100px", width: "150px", backgroundColor: "rgb(64, 64, 64)"}}> </div>
                    </LinearLayout>
                </Panel>

                <Panel title="Vertical Orientation With 20px Padding 3" expanded collapsible borderless>
                    <LinearLayout orientation={Orientation.VERTICAL} padding={20} style={{backgroundColor: "rgb(103, 103, 103)"}} nofill>
                        <div style={{height: "100px", width: "150px", backgroundColor: "rgb(127, 127, 127)"}}> </div>
                        <div style={{height: "100px", width: "150px", backgroundColor: "rgb(64, 64, 64)"}}> </div>
                        <div style={{height: "100px", width: "150px", backgroundColor: "rgb(127, 127, 127)"}}> </div>
                    </LinearLayout>
                </Panel>

                <Panel title="Vertical Orientation With Fill and Each Child Flex Attribute" expanded collapsible borderless>
                    <LinearLayout orientation={Orientation.VERTICAL}>
                        <div style={{flex: 1, height: "100px", width: "150px", backgroundColor: "rgb(127, 127, 127)"}}> </div>
                        <div style={{flex: 1, height: "100px", width: "150px", backgroundColor: "rgb(192, 192, 192)"}}> </div>
                        <div style={{flex: 1, height: "100px", width: "150px", backgroundColor: "rgb(127, 127, 127)"}}> </div>
                    </LinearLayout>
                </Panel>

            </Panel>
        )
    }

    renderDocumentation() {
        if (this.state.pageSource === '') {
            this.loadPageSource();
        }
        
        return (
            <Panel className="norseu-p-left-right-20px">
                <TabPane activeTabIndex={0}>
                    <TabPanel title="Documentation" icon="fa fa-book">

                        <h2>Properties</h2>
                        <h2>CSS</h2>
                    </TabPanel>
                    <TabPanel title="Page Source" icon="fa fa-code">
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
                <h1>Linear Layout</h1>

                <Panel className="norseu-p-left-right-20px">
                    <SyntaxHighlighter language="javascript" style={prism} className={"norseu-showcase-code"}>
                        {`import { ViewportSensor } from '@ronuse/norseu/sensors'`}
                    </SyntaxHighlighter>
                </Panel>
                
                {this.renderInteractiveEditor()}
                {this.renderSampleComponents()}
                {this.renderDocumentation()}

            </div>
        )
    }

}