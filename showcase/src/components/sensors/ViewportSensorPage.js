
import React from "react";
import { Panel, TabPane, TabPanel } from 'norseu/core/panels';
import { Button } from 'norseu/core/buttons';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Scheme } from "norseu/core/variables/Stylers";
import { Orientation } from "norseu/core/variables";
import { ViewportSensor } from "norseu/sensors";

export class ViewportSensorPage extends React.Component {

    static defaultProps = {
        scrollContainerRef: null
    }

    state = {
        pageSource: ''
    }

    constructor(props) {
        super(props);
    }

    loadPageSource() {
        fetch("https://raw.githubusercontent.com/ronuse/norseu/main/showcase/src/components/sensors/ViewportSensorPage.js")
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

    //TODO change to popup
    onEnterViewport(event) {
        console.log("ViewportSensor: Entered the view port");
        return true;
    }

    onExitViewport(event) {
        console.log("ViewportSensor: Exit the view port");
        return false;
    }

    renderSampleComponents() {
        return (
            <Panel className="norseu-p-left-right-20px">
                <Panel> 
                    
                    <h4>Scroll to right to load the image</h4>
                    <div style={{
                        display: "flex",
                        minWidth: "120vw",
                        flexFlow: "row-reverse"
                    }}>
                        <p>padding</p>
                        <ViewportSensor style={{float:"right"}} direction={Orientation.HORIZONTAL} scrollContainerRef={this.props.scrollContainerRef}>
                            <img src="https://avatars3.githubusercontent.com/u/69908664?s=500"/>
                        </ViewportSensor>
                    </div>
                    
                    <h4>Scroll down to the to load the video below.</h4>
                    <div style={{height:"120vh"}}/>
                    
                    <ViewportSensor direction={Orientation.VERTICAL} onEnterViewport={this.onEnterViewport} onExitViewport={this.onExitViewport} scrollContainerRef={this.props.scrollContainerRef}>
                        <iframe width="100%" height="720" src="https://www.youtube.com/embed/aSLZFdqwh7E" 
                            frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowFullScreen>
                        </iframe>
                    </ViewportSensor>
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
                        Can be used to defer rendering if no event listener is specified<br/>
                        
                        If onEnterViewport return true the children will be rendered if it return false the children will 
                        not be rendered on leaving the view port.<br/>
                        
                        If onExitViewport return false the children will not be removed from DOM when it exit the view port , if it return true the children will 
                        be removed from DOM on leaving the view port.<br/>

                        The ViewportSensor with direction HORIZONTAL will be good for carousels, or flex box with overflow items<br/>

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
                        {`import { ViewportSensor } from 'norseu/sensors'`}
                    </SyntaxHighlighter>
                </Panel>
                
                {this.renderInteractiveEditor()}
                {this.renderSampleComponents()}
                {this.renderDocumentation()}

            </div>
        )
    }

}