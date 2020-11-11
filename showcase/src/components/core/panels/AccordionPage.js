
import React from "react";
import { Panel, TabPane, TabPanel } from 'ronuse-react-ui/core/panels';
import { Button } from 'ronuse-react-ui/core/buttons';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Scheme } from "ronuse-react-ui/core/variables/Stylers";
import { Alignment } from "ronuse-react-ui/core/variables";
import { Accordion, AccordionPanel } from "ronuse-react-ui/core/panels/Accordion";
import { ButtonGroup } from "ronuse-react-ui/core/buttons/ButtonGroup";

export class AccordionPage extends React.Component {

    state = {
        pageSource: '',
        activeIndex: null
    }

    loadPageSource() {
        fetch("https://raw.githubusercontent.com/ronuse/ronuse-react-ui/main/showcase/src/components/core/panels/AccordionPage.js")
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

    onClick(panelIndex) {
        let activeIndex = this.state.activeIndex ? [...this.state.activeIndex] : [];
        if (activeIndex.length === 0) {
            activeIndex.push(panelIndex);
        } else {
            const index = activeIndex.indexOf(panelIndex);
            if (index === -1) {
                activeIndex.push(panelIndex);
            } else {
                activeIndex.splice(index, 1);
            }
        }
        this.setState({ activeIndex: activeIndex });
    }

    renderSampleComponents() {
        return (
            <Panel className="r-r-padding-left-right-20px">
                <h3>Basic</h3>
                <Accordion activeIndex={[2]}>
                    <AccordionPanel title="Title 1">
                        {this.text1()}
                    </AccordionPanel>
                    <AccordionPanel title="Title 2">
                        {this.text2()}
                    </AccordionPanel>
                    <AccordionPanel title="Title 3">
                        {this.text3()}
                    </AccordionPanel>
                </Accordion>
                
                <h3>Multiple With schemes</h3>
                <Accordion scheme={Scheme.PRIMARY} activeIndex={[2]} multiple>
                    <AccordionPanel scheme={Scheme.SUCCESS} title="Title 1">
                        {this.text1()}
                    </AccordionPanel>
                    <AccordionPanel scheme={Scheme.WARNING} title="Title 2">
                        {this.text2()}
                    </AccordionPanel>
                    <AccordionPanel scheme={Scheme.DANGER} title="Title 3">
                        {this.text3()}
                    </AccordionPanel>
                </Accordion>
                
                <h3>Skeleton</h3>
                <Accordion scheme={Scheme.SKELETON} activeIndex={1}>
                    <AccordionPanel title="Title 1">
                        {this.text1()}
                    </AccordionPanel>
                    <AccordionPanel title="Title 2">
                        {this.text2()}
                    </AccordionPanel>
                    <AccordionPanel title="Title 3">
                        {this.text3()}
                    </AccordionPanel>
                </Accordion>
                
                <h3>Skeleton</h3>
                <Accordion scheme={Scheme.SKELETON} activeIndex={1}>
                    <AccordionPanel title="Title 1">
                        {this.text1()}
                    </AccordionPanel>
                    <AccordionPanel title="Title 2">
                        {this.text2()}
                    </AccordionPanel>
                    <AccordionPanel title="Title 3">
                        {this.text3()}
                    </AccordionPanel>
                </Accordion>

                <h3>Custom Logic and Header</h3>
                <ButtonGroup scheme={Scheme.SECONDARY} className="r-r-margin-bottom-20px">
                    <Button icon={`fa fa-${this.state.activeIndex && this.state.activeIndex.indexOf(0) > -1 ? 'plus' : 'minus'}`} text="Toggle Panel 1" onClick={() => this.onClick(0)}/>
                    <Button icon={`fa fa-${this.state.activeIndex && this.state.activeIndex.indexOf(1) > -1 ? 'plus' : 'minus'}`} text="Toggle Panel 2" onClick={() => this.onClick(1)}/>
                    <Button icon={`fa fa-${this.state.activeIndex && this.state.activeIndex.indexOf(2) > -1 ? 'plus' : 'minus'}`} text="Toggle Panel 3" onClick={() => this.onClick(2)}/>
                </ButtonGroup>
                
                <Accordion activeIndex={this.state.activeIndex} onTabChange={(e) => this.setState({ activeIndex: [e.index] })}>
                    <AccordionPanel title={<React.Fragment><i class="fa fa-user-o r-r-margin-right-5px"/>User</React.Fragment>}>
                        {this.text1()}
                    </AccordionPanel>
                    <AccordionPanel title={<React.Fragment><i class="fa fa-gear r-r-margin-right-5px"/>Settings</React.Fragment>}>
                        {this.text2()}
                    </AccordionPanel>
                    <AccordionPanel title={<React.Fragment><i class="fa fa-search r-r-margin-right-5px"/>Search Profiles<i class="fa fa-eye r-r-margin-left-5px"/></React.Fragment>}>
                        {this.text3()}
                    </AccordionPanel>
                </Accordion>

            </Panel>
        )
    }

    renderDocumentation() {
        if (this.state.pageSource === '') {
            this.loadPageSource();
        }
        
        return (
            <Panel className="r-r-padding-left-right-20px">
                <TabPane activeTabIndex={0}>
                    <TabPanel title="Documentation" icon="fa fa-book">
                        <h2>Properties</h2>
                        <h2>CSS</h2>
                    </TabPanel>
                    <TabPanel title="Page Source" icon="fa fa-code">
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
                <h1>Accordion</h1>

                <Panel className="r-r-padding-left-right-20px">
                    <SyntaxHighlighter language="javascript" style={prism} className={"r-r-showcase-code"}>
                        {`import { Accordion } from 'ronuse-react-ui/core/panels'`}
                    </SyntaxHighlighter>
                </Panel>
                
                {this.renderInteractiveEditor()}
                {this.renderSampleComponents()}
                {this.renderDocumentation()}

            </div>
        )
    }

}