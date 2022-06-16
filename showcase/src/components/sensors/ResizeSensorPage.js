
import React from "react";
import { Panel, TabPane, TabPanel } from '@ronuse/norseu/core/panels';
import { Button } from '@ronuse/norseu/core/buttons';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Scheme } from "@ronuse/norseu/core/variables/Stylers";
import { Orientation } from "@ronuse/norseu/core/variables";
import { ResizeSensor } from "@ronuse/norseu/sensors";

export class ResizeSensorPage extends React.Component {

    state = {
        pageSource: '',
        dimension: {width: 0, height: 0}
    }

    loadPageSource() {
        fetch("https://raw.githubusercontent.com/ronuse/norseu/main/showcase/src/components/sensors/ResizeSensorPage.js")
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
                <ResizeSensor onDimensionChange={(e, dimension) => {
                    this.setState({ dimension })
                }}> 
                    <h3>Resize The window to see new value</h3>
                    <h2>Width {this.state.dimension.width}</h2>
                    <h2>Height {this.state.dimension.height}</h2>
                </ResizeSensor>
                
                <h3>The image below will be rendered if the screen width is greater than 500</h3>
                <ResizeSensor minDimension={{width: 500}}> 
                    <img style={{width: "300px"}} src="https://c.files.bbci.co.uk/12A9B/production/_111434467_gettyimages-1143489763.jpg"/>
                </ResizeSensor>
                
                <h3>The image below will be hidden if the screen is greater than 800</h3>
                <ResizeSensor maxDimension={{width: 800}}> 
                    <img style={{width: "300px"}} src="https://www.sciencemag.org/ps/default/files/styles/inline__450w__no_aspect/public/dogs_1280p_0.jpg?itok=4t_1_fSJ"/>
                </ResizeSensor>
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
                <h1>ViewportSensor</h1>

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