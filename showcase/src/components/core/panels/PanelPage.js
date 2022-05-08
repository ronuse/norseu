
import React from "react"
import { Panel, TabPane, TabPanel } from 'norseu/core/panels'
import { Button } from 'norseu/core/buttons'
import { Elevation, Scheme } from "norseu/core/variables"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';

export class PanelPage extends React.Component {

    state = {
        pageSource: ''
    }

    loadPageSource() {
        fetch("https://raw.githubusercontent.com/ronuse/norseu/main/showcase/src/components/core/panels/PanelPage.js")
        .then(response => response.text())
        .then(data => this.setState({pageSource : data}))
		.catch(error => { throw error});
    }

    // TODO chage alerts to taost component
    onCollapse(event) {
        alert("The Panel has been collapsed"); 
    }

    onExpand(event) {
        alert("The Panel has been expanded");
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
                <Panel style={{padding:"20px"}} borderless>
                    <h3>Basic</h3>
                    <Panel>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vulputate dolor neque, 
                        vel porta sem tincidunt ut. Pellentesque lacinia orci quis sagittis tincidunt. 
                        Proin viverra varius orci, at blandit mauris feugiat vitae. Aliquam elit nisi, 
                        molestie ac maximus eget, aliquet nec tortor. Pellentesque bibendum ante vel risus efficitur volutpat.</p>
                    </Panel>

                    <h3>Basic With Elevation</h3>
                    <Panel elevation={Elevation.ONE}>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vulputate dolor neque, 
                        vel porta sem tincidunt ut. Pellentesque lacinia orci quis sagittis tincidunt. 
                        Proin viverra varius orci, at blandit mauris feugiat vitae. Aliquam elit nisi, 
                        molestie ac maximus eget, aliquet nec tortor. Pellentesque bibendum ante vel risus efficitur volutpat.</p>
                    </Panel>

                    <h3>Title Only</h3>
                    <Panel title="Title">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vulputate dolor neque, 
                        vel porta sem tincidunt ut. Pellentesque lacinia orci quis sagittis tincidunt. 
                        Proin viverra varius orci, at blandit mauris feugiat vitae. Aliquam elit nisi, 
                        molestie ac maximus eget, aliquet nec tortor. Pellentesque bibendum ante vel risus efficitur volutpat.</p>
                    </Panel>

                    <h3>Collapsible With Title</h3>
                    <Panel title="Title" collapsible expanded>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vulputate dolor neque, 
                        vel porta sem tincidunt ut. Pellentesque lacinia orci quis sagittis tincidunt. 
                        Proin viverra varius orci, at blandit mauris feugiat vitae. Aliquam elit nisi, 
                        molestie ac maximus eget, aliquet nec tortor. Pellentesque bibendum ante vel risus efficitur volutpat.</p>
                    </Panel>

                    <h3>Skeleton Panel</h3>
                    <Panel scheme={Scheme.SKELETON}>
                        <Panel>
                            <p>When the type of panel is set to skeleton rather than applying the skeleton effect 
                                to the main panel the type is relayed down to the child components for application.
                            </p>
                        </Panel>
                        <br/>

                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vulputate dolor neque, 
                        vel porta sem tincidunt ut. Pellentesque lacinia orci quis sagittis tincidunt. 
                        Proin viverra varius orci, at blandit mauris feugiat vitae. Aliquam elit nisi, 
                        molestie ac maximus eget, aliquet nec tortor. Pellentesque bibendum ante vel risus efficitur volutpat.
                        <br/>

                        <Button text="Hello World" scheme={Scheme.PRIMARY}/>

                        <Button icon="fa fa-check" scheme={Scheme.PRIMARY} rounded/>
                        <Button icon="fa fa-check" scheme={Scheme.PRIMARY} rounded/>
                        <Button icon="fa fa-check" scheme={Scheme.PRIMARY} rounded/>
                        <Button icon="fa fa-check" scheme={Scheme.PRIMARY} rounded/>
                        <Button icon="fa fa-check" scheme={Scheme.PRIMARY} rounded/>
                        <Button icon="fa fa-check" scheme={Scheme.PRIMARY} rounded/>

                        <br/><br/>
                        <div>
                            Hello World
                            <br/><br/>
                            <Button icon="fa fa-check"/>
                            <div>
                                This is inner div but better still this should also be skeletoned
                                <br/><br/><br/>
                                <p>This is inner div but better still this should also be skeletoned</p>
                                <br/><br/>
                                <Button text="we good" icon="fa fa-check"/>
                            </div>
                        </div>
                        
                    </Panel>

                    <h3>Events</h3>
                    <Panel title="onCollapse, onExpand Events" onExpand={this.onExpand} onCollapse={this.onCollapse} collapsible expanded>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vulputate dolor neque, 
                        vel porta sem tincidunt ut. Pellentesque lacinia orci quis sagittis tincidunt. 
                        Proin viverra varius orci, at blandit mauris feugiat vitae. Aliquam elit nisi, 
                        molestie ac maximus eget, aliquet nec tortor. Pellentesque bibendum ante vel risus efficitur volutpat.</p>
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
                <h1>Panel</h1>

                <Panel borderless>
                    <SyntaxHighlighter language="javascript" style={prism} className={"norseu-showcase-code"}>
                        {`import { Panel } from 'norseu/core/panels'`}
                    </SyntaxHighlighter>
                </Panel>
                
                {this.renderInteractiveEditor()}
                {this.renderSampleComponents()}
                {this.renderDocumentation()}

            </div>
        )
    }

}
