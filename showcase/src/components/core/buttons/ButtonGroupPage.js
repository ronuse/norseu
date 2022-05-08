
import React from "react";
import { Panel, TabPane, TabPanel } from 'norseu/core/panels';
import { Button, ButtonGroup } from 'norseu/core/buttons';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Scheme, Alignment, Orientation } from "norseu/core/variables";

export class ButtonGroupPage extends React.Component {

    state = {
        pageSource: ''
    }

    loadPageSource() {
        fetch("https://raw.githubusercontent.com/ronuse/norseu/main/showcase/src/components/core/buttons/ButtonGroupPage.js")
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
            <Panel className="norseu-padding-left-right-20px">
                <Panel title="Horizontal" expanded collapsible borderless>
                    <h5>Basic</h5>
                    <ButtonGroup>
                        <Button icon="fa fa-folder-open" text="Open"/>
                        <Button icon="fa fa-times" text="Close"/>
                        <Button icon="fa fa-door-open" text="Exit"/>
                    </ButtonGroup>
                    <h5>Skeleton</h5>
                    <ButtonGroup scheme={Scheme.SKELETON}>
                        <Button icon="fa fa-folder-open" text="Open"/>
                        <Button icon="fa fa-times" text="Close"/>
                        <Button icon="fa fa-door-open" text="Exit"/>
                    </ButtonGroup>
                    <h5>With scheme</h5>
                    <ButtonGroup scheme={Scheme.PRIMARY}>
                        <Button icon="fa fa-folder-open" text="Open"/>
                        <Button icon="fa fa-times" text="Close"/>
                        <Button icon="fa fa-door-open" text="Exit"/>
                    </ButtonGroup>
                    <h5>With individual scheme</h5>
                    <ButtonGroup>
                        <Button scheme={Scheme.PRIMARY} icon="fa fa-folder-open" text="Open"/>
                        <Button scheme={Scheme.SECONDARY} icon="fa fa-times" text="Close"/>
                        <Button scheme={Scheme.SUCCESS} icon="fa fa-door-open" text="Exit"/>
                    </ButtonGroup>
                    <h5>Fill</h5>
                    <ButtonGroup fill>
                        <Button scheme={Scheme.PRIMARY} icon="fa fa-folder-open" alignIcon={Alignment.CENTER} text="Open"/>
                        <Button scheme={Scheme.PRIMARY} icon="fa fa-times" alignIcon={Alignment.CENTER} text="Close"/>
                        <Button scheme={Scheme.PRIMARY} icon="fa fa-door-open" alignIcon={Alignment.CENTER} text="Exit"/>
                    </ButtonGroup>
                    <h5>Icon only</h5>
                    <ButtonGroup scheme={Scheme.PRIMARY}>
                        <Button icon="fa fa-folder-open"/>
                        <Button icon="fa fa-times"/>
                        <Button icon="fa fa-door-open"/>
                    </ButtonGroup>
                </Panel>
                <Panel title="Vertical" expanded collapsible borderless>
                    <h5>Basic</h5>
                    <ButtonGroup direction={Orientation.VERTICAL}>
                        <Button icon="fa fa-folder-open" text="Open"/>
                        <Button icon="fa fa-times" text="Close"/>
                        <Button icon="fa fa-door-open" text="Exit"/>
                    </ButtonGroup>
                    <h5>Skeleton</h5>
                    <ButtonGroup direction={Orientation.VERTICAL} scheme={Scheme.SKELETON}>
                        <Button icon="fa fa-folder-open" text="Open"/>
                        <Button icon="fa fa-times" text="Close"/>
                        <Button icon="fa fa-door-open" text="Exit"/>
                    </ButtonGroup>
                    <h5>With scheme</h5>
                    <ButtonGroup direction={Orientation.VERTICAL} scheme={Scheme.PRIMARY}>
                        <Button icon="fa fa-folder-open" text="Open"/>
                        <Button icon="fa fa-times" text="Close"/>
                        <Button icon="fa fa-door-open" text="Exit"/>
                    </ButtonGroup>
                    <h5>With individual scheme</h5>
                    <ButtonGroup direction={Orientation.VERTICAL}>
                        <Button scheme={Scheme.PRIMARY} icon="fa fa-folder-open" text="Open"/>
                        <Button scheme={Scheme.SECONDARY} icon="fa fa-times" text="Close"/>
                        <Button scheme={Scheme.SUCCESS} icon="fa fa-door-open" text="Exit"/>
                    </ButtonGroup>
                    <h5>Fill</h5>
                    <ButtonGroup direction={Orientation.VERTICAL} fill>
                        <Button scheme={Scheme.PRIMARY} icon="fa fa-folder-open" alignIcon={Alignment.CENTER} text="Open"/>
                        <Button scheme={Scheme.PRIMARY} icon="fa fa-times" alignIcon={Alignment.CENTER} text="Close"/>
                        <Button scheme={Scheme.PRIMARY} icon="fa fa-door-open" alignIcon={Alignment.CENTER} text="Exit"/>
                    </ButtonGroup>
                    <h5>Icon only</h5>
                    <ButtonGroup direction={Orientation.VERTICAL} scheme={Scheme.PRIMARY}>
                        <Button icon="fa fa-folder-open"/>
                        <Button icon="fa fa-times"/>
                        <Button icon="fa fa-door-open"/>
                    </ButtonGroup>
                </Panel>
            </Panel>
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
                <h1>ButtonGroup</h1>

                <Panel className="norseu-padding-left-right-20px">
                    <SyntaxHighlighter language="javascript" style={prism} className={"norseu-showcase-code"}>
                        {`import { ButtonGroup } from 'norseu/buttons/ButtonGroup'`}
                    </SyntaxHighlighter>
                </Panel>
                
                {this.renderInteractiveEditor()}
                {this.renderSampleComponents()}
                {this.renderDocumentation()}

            </div>
        )
    }

}