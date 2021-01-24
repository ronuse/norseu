
import React from "react"
import { Panel, TabPane, TabPanel } from '@ronuse/react-ui/core/panels'
import { Button } from '@ronuse/react-ui/core/buttons'
import { Alignment, Scheme } from "@ronuse/react-ui/core/variables"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';

export class TabPanePage extends React.Component {

    state = {
        pageSource: '',
        activeTabIndex: 0,
        alignNavigator: Alignment.TOP
    }

    loadPageSource() {
        fetch("https://raw.githubusercontent.com/ronuse/@ronuse/react-ui/main/showcase/src/components/core/panels/TabPanePage.js")
        .then(response => response.text())
        .then(data => this.setState({pageSource : data}));
    }

    text1() {
        return (
            <p>Mauris ultrices placerat mauris, tempus ornare ligula sagittis at. Vestibulum aliquam id libero sit amet ultrices. 
            Phasellus at tempus ex, quis fringilla nisi. Donec euismod euismod nisl, ut scelerisque ipsum. Orci varius natoque 
            penatibus et magnis dis parturient montes, nascetur ridiculus mus. Ut nulla ligula, laoreet vitae molestie sit amet, 
            dapibus at nisi. </p>
        )
    }

    text2() {
        return (
            <p>In id pulvinar turpis, et pharetra dui. Aliquam rhoncus condimentum nisi id elementum. Aenean vel efficitur nulla, eget porttitor nulla. 
            Etiam suscipit magna ac ex feugiat fringilla. Nam tincidunt orci sapien. Nam quis diam ut orci sollicitudin iaculis. 
            Nulla ut justo porttitor, commodo diam eu, fringilla urna. Ut eget faucibus augue. Quisque id ligula vel turpis feugiat aliquet eget ac 
            justo.</p>
        )
    }

    text3() {
        return (
            <p>Donec in vehicula neque. Etiam ornare lectus sed enim cursus, ut vestibulum nibh condimentum. Phasellus vestibulum vitae mauris quis 
            scelerisque. Curabitur vitae cursus est. Cras ac porta sapien. Aliquam quis mattis mauris. Praesent ut bibendum felis. 
            Nullam sagittis semper quam et maximus. Suspendisse faucibus erat felis, sit amet dignissim ex euismod quis. </p>
        )
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
                <Panel className="r-r-padding-left-right-20px">
                    <h3>Basic</h3>
                    <TabPane activeTabIndex={0} renderActiveTabOnly>
                        <TabPanel title="Panel 1" contentStyle={{padding:"10px"}}>
                            {this.text1()}
                            <br/><Button text="Click Me" />
                        </TabPanel>
                        <TabPanel title="Panel 2" contentStyle={{padding:"10px"}}>
                            {this.text2()}
                        </TabPanel>
                        <TabPanel title="Panel 3" contentStyle={{padding:"10px"}}>
                            {this.text3()}
                        </TabPanel>
                    </TabPane>
                </Panel>
                
                <Panel className="r-r-padding-left-right-20px">
                    <h3>Header with Icon</h3>
                    <TabPane activeTabIndex={0} renderActiveTabOnly>
                        <TabPanel title="Panel 1" contentStyle={{padding:"10px"}} icon="fa fa-eye">
                            {this.text1()}
                            <br/><Button text="Click Me" />
                        </TabPanel>
                        <TabPanel title="Panel 2" contentStyle={{padding:"10px"}} icon="fa fa-code">
                            {this.text2()}
                        </TabPanel>
                        <TabPanel title="Panel 3" contentStyle={{padding:"10px"}} icon="fa fa-user" rightIcon="fa fa-arrow-right">
                            {this.text3()}
                        </TabPanel>
                    </TabPane>
                </Panel>
                
                <Panel className="r-r-padding-left-right-20px">
                    <h3>Extra TabNavigator Elements</h3>
                    <TabPane activeTabIndex={0} renderActiveTabOnly>
                        <TabPanel title="Panel 1" contentStyle={{padding:"10px"}} icon="fa fa-eye">
                            {this.text1()}
                            <br/><Button text="Click Me" />
                        </TabPanel>
                        <TabPanel title="Panel 2" contentStyle={{padding:"10px"}} icon="fa fa-code">
                            {this.text2()}
                        </TabPanel>
                        <TabPanel title="Panel 3" contentStyle={{padding:"10px"}} icon="fa fa-user" rightIcon="fa fa-arrow-right">
                            {this.text3()}
                        </TabPanel>

                        <div className="r-r-flex" style={{alignItems:"center",float:"right"}}>
                            <input type="text" placeholder="" style={{height:"30px"}}/>
                            <Button scheme={Scheme.PRIMARY} text="Search"/>
                        </div>
                    </TabPane>
                </Panel>
                
                <Panel className="r-r-padding-left-right-20px">
                    <h3>TabPanel with Scheme</h3>
                    <TabPane activeTabIndex={0} renderActiveTabOnly>
                        <TabPanel title="Panel 1" contentStyle={{padding:"10px"}} icon="fa fa-eye" scheme={Scheme.PRIMARY}>
                            {this.text1()}
                            <br/><Button text="Click Me" />
                        </TabPanel>
                        <TabPanel title="Panel 2" contentStyle={{padding:"10px"}} icon="fa fa-code" scheme={Scheme.WARNING}>
                            {this.text2()}
                        </TabPanel>
                        <TabPanel title="Panel 3" contentStyle={{padding:"10px"}} icon="fa fa-user" rightIcon="fa fa-arrow-right"  scheme={Scheme.INFO}>
                            {this.text3()}
                        </TabPanel>
                        <TabPanel title="Panel 3" contentStyle={{padding:"10px"}} icon="fa fa-times"  scheme={Scheme.DANGER}>
                            {this.text2()}
                        </TabPanel>
                    </TabPane>
                </Panel>

                <Panel className="r-r-padding-left-right-20px">
                    <h3>Skeleton</h3>
                    <TabPane activeTabIndex={0} scheme={Scheme.SKELETON} renderActiveTabOnly>
                        <TabPanel title="Panel 1" contentStyle={{padding:"10px"}}>
                            {this.text1()}
                            <br/><Button text="Click Me" /> <Button text="Click Me" />
                            <br/><Button text="Click Me" /> <Button text="Click Me" />
                        </TabPanel>
                        <TabPanel title="Panel 2" contentStyle={{padding:"10px"}}>
                            {this.text2()}
                        </TabPanel>
                        <TabPanel title="Panel 3" contentStyle={{padding:"10px"}}>
                            {this.text3()}
                        </TabPanel>
                    </TabPane>
                </Panel>

                <Panel className="r-r-padding-left-right-20px">
                    <h3>Disabled tab</h3>
                    <TabPane activeTabIndex={0} renderActiveTabOnly>
                        <TabPanel title="Panel 1" contentStyle={{padding:"10px"}}>
                            {this.text1()}
                        </TabPanel>
                        <TabPanel title="Panel 2" contentStyle={{padding:"10px"}} disabled>
                            {this.text2()}
                        </TabPanel>
                        <TabPanel title="Panel 3" contentStyle={{padding:"10px"}}>
                            {this.text3()}
                        </TabPanel>
                    </TabPane>
                </Panel>

                <Panel className="r-r-padding-left-right-20px">
                    <h3>Custom Logic</h3>
                    <Button text="Switch to Panel 1" scheme={Scheme.INFO} onClick={() => this.setState({ activeTabIndex: 0 })} outlined/>
                    <Button text="Switch to Panel 2" scheme={Scheme.INFO} onClick={() => this.setState({ activeTabIndex: 1 })} outlined/>
                    <Button text="Switch to Panel 3" scheme={Scheme.INFO} onClick={() => this.setState({ activeTabIndex: 2 })} outlined/>
                    <TabPane activeTabIndex={this.state.activeTabIndex} onTabChange={(e) => this.setState({ activeTabIndex: e.index })} renderActiveTabOnly>
                        <TabPanel title="Panel 1" contentStyle={{padding:"10px"}}>
                            {this.text1()}
                        </TabPanel>
                        <TabPanel title="Panel 2" contentStyle={{padding:"10px"}}>
                            {this.text2()}
                        </TabPanel>
                        <TabPanel title="Panel 3" contentStyle={{padding:"10px"}}>
                            {this.text3()}
                        </TabPanel>
                        {/*<Button text="Extra Button"/>*/}
                    </TabPane>
                </Panel>
                
                <Panel className="r-r-padding-left-right-20px">
                    <h3>Tab Navigator Allignment, TODO change select below to ronuse select Component</h3>
                    <select onChange={(e)=>{this.setState({ alignNavigator: e.target.value} )}}>
                        <option value={Alignment.TOP}>{"TOP"}</option>
                        <option value={Alignment.CENTER}>{"CENTER"}</option>
                        <option value={Alignment.TOP_CENTER}>{"TOP_CENTER"}</option>
                        <option value={Alignment.TOP_LEFT}>{"TOP_LEFT"}</option>
                        <option value={Alignment.TOP_RIGHT}>{"TOP_RIGHT"}</option>
                        <option value={Alignment.BOTTOM}>{"BOTTOM"}</option>
                        <option value={Alignment.BOTTOM_LEFT}>{"BOTTOM_LEFT"}</option>
                        <option value={Alignment.BOTTOM_RIGHT}>{"BOTTOM_RIGHT"}</option>
                        <option value={Alignment.BOTTOM_CENTER}>{"BOTTOM_CENTER"}</option>
                        <option value={Alignment.LEFT}>{"LEFT"}</option>
                        <option value={Alignment.RIGHT}>{"RIGHT"}</option>
                    </select>
                    <TabPane activeTabIndex={0} alignNavigator={this.state.alignNavigator} renderActiveTabOnly>
                        <TabPanel scheme={Scheme.INFO} title="Panel 1" icon="fa fa-user" contentStyle={{padding:"10px"}}>
                            {this.text1()}
                        </TabPanel>
                        <TabPanel scheme={Scheme.SUCCESS} title="Panel 2" contentStyle={{padding:"10px"}}>
                            {this.text2()}
                        </TabPanel>
                        <TabPanel scheme={Scheme.WARNING} title="Panel 3" contentStyle={{padding:"10px"}}>
                            {this.text3()}
                        </TabPanel>
                    </TabPane>
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
            <div className="r-r-showcase-component-page" >
                <h1>TabPane</h1>

                <Panel borderless>
                    <SyntaxHighlighter language="javascript" style={prism} className={"r-r-showcase-code"}>
                        {`import { TabPane, TabPanel } from '@ronuse/react-ui/core/panels'`}
                    </SyntaxHighlighter>
                </Panel>

                {this.renderInteractiveEditor()}
                {this.renderSampleComponents()}
                {this.renderDocumentation()}

            </div>
        )
    }

}
