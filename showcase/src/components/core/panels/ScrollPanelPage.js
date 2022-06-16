
import React from "react"
import { Panel, TabPane, TabPanel, ScrollPanel } from '@ronuse/norseu/core/panels'
import { Button } from '@ronuse/norseu/core/buttons'
import { Elevation, Scheme } from "@ronuse/norseu/core/variables"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { LinearLayout } from "@ronuse/norseu/layouts";

export class ScrollPanelPage extends React.Component {

    state = {
        pageSource: ''
    }

    loadPageSource() {
        fetch("https://raw.githubusercontent.com/ronuse/norseu/main/showcase/src/components/core/panels/ScrollPanelPage.js")
        .then(response => response.text())
        .then(data => this.setState({pageSource : data}))
		.catch(error => { throw error});
    }

    // TODO chage alerts to taost component
    overflowText() {
        return `Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut 
        labore et dolore magna aliqua. Morbi tempus iaculis urna id. Ut ornare lectus 
        sit amet est placerat in egestas. Sit amet mauris commodo quis imperdiet massa. 
        Dictum sit amet justo donec enim diam vulputate ut pharetra. Sit amet porttitor 
        eget dolor morbi. Ultrices sagittis orci a scelerisque. Nisi scelerisque eu ultrices vitae. 
        Commodo odio aenean sed adipiscing diam donec adipiscing tristique risus. Donec pretium vulputate sapien nec. 
        A scelerisque purus semper eget duis at tellus at urna. 
        Dignissim convallis aenean et tortor at risus viverra adipiscing. 
        Sem fringilla ut morbi tincidunt augue interdum. Facilisis gravida 
        neque convallis a cras semper auctor neque vitae. Pellentesque habitant 
        morbi tristique senectus et netus. Orci dapibus ultrices in iaculis nunc 
        sed augue lacus viverra. Nulla facilisi morbi tempus iaculis. Felis eget 
        nunc lobortis mattis aliquam faucibus purus. Malesuada fames ac turpis egestas sed tempus.
         Tempus urna et pharetra pharetra massa massa ultricies mi. Ac feugiat sed lectus vestibulum mattis. 
         Sagittis nisl rhoncus mattis rhoncus urna neque viverra justo. Massa enim nec dui nunc mattis enim ut tellus. 
         Aliquet risus feugiat in ante metus dictum at tempor. Fusce id velit ut tortor pretium viverra suspendisse. 
         Posuere ac ut consequat semper. Sit amet luctus venenatis lectus magna fringilla urna 
         porttitor rhoncus. Lorem mollis aliquam ut porttitor leo a. Volutpat sed cras ornare arcu 
         dui vivamus arcu felis bibendum. Vitae turpis massa sed elementum tempus egestas sed sed risus. 
         At quis risus sed vulputate odio ut. Nisi vitae suscipit tellus mauris a diam maecenas sed enim. 
         Nec ullamcorper sit amet risus nullam. Vitae tempus quam pellentesque nec nam aliquam. 
         Molestie a iaculis at erat. Arcu felis bibendum ut tristique et egestas quis. 
         Volutpat lacus laoreet non curabitur gravida. Ante metus dictum at tempor commodo. 
         Vivamus at augue eget arcu. Quam vulputate dignissim suspendisse in. Nec dui nunc mattis enim ut tellus elementum.`;
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
            <div className="norseu-showcase-sample-component-div">
                <LinearLayout style={{padding:"20px"}} padding={60}>
                    <ScrollPanel style={{flex: 1, width:"400px", height:"300px"}} hideScrollBars>
                        <h3>Hidden Scrollbars</h3>
                        {this.overflowText()}
                    </ScrollPanel>

                    <ScrollPanel style={{flex: 1, width:"400px", height:"300px"}} isForm onSubmit={(e) => console.log("Yeah")}>
                        <h3>Auto Scrollbars</h3>
                        <div style={{width: "500px"}}>
                            {this.overflowText()}
                        </div>
						<Button text="Submit"/>
                    </ScrollPanel>
                    
                    <ScrollPanel style={{flex: 1, width:"400px", height:"300px"}} hideScrollBarX>
                        <h3>Hidden X-Axis Scrollbar</h3>
                        <div style={{width: "500px"}}>
                            {this.overflowText()}
                        </div>
                    </ScrollPanel>
                </LinearLayout>

                <LinearLayout style={{padding:"20px"}} padding={60}>
                    <ScrollPanel scheme={Scheme.PRIMARY} style={{flex: 1, width:"400px", height:"300px"}}>
                        <h3>Primary Scheme</h3>
                        {this.overflowText()}
                    </ScrollPanel>

                    <ScrollPanel scheme={Scheme.WARNING} style={{flex: 1, width:"400px", height:"300px"}}>
                        <h3>Warning Scheme</h3>
                        {this.overflowText()}
                    </ScrollPanel>
                    
                    <ScrollPanel scheme={Scheme.DANGER} style={{flex: 1, width:"400px", height:"300px"}}>
                        <h3>Danger Scheme</h3>
                        {this.overflowText()}
                    </ScrollPanel>
                </LinearLayout>
            </div>
        )
    }

    renderDocumentation() {
        if (this.state.pageSource === '') {
            this.loadPageSource();
        }
        
        return (
            <Panel className="norseu-p-left-right-20px">
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
                        {`import { Panel } from '@ronuse/norseu/core/panels'`}
                    </SyntaxHighlighter>
                </Panel>
                
                {this.renderInteractiveEditor()}
                {this.renderSampleComponents()}
                {this.renderDocumentation()}

            </div>
        )
    }

}
