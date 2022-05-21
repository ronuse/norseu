
import React from "react";
import { Panel, TabPane, TabPanel } from 'norseu/core/panels';
import { Button } from 'norseu/core/buttons';
import { Tag } from 'norseu/core/misc';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Scheme } from "norseu/core/variables/Stylers";
import { Alignment } from "norseu/core/variables";

export class BadgeAndTagPage extends React.Component {

    state = {
        pageSource: ''
    }

    loadPageSource() {
        fetch("https://raw.githubusercontent.com/ronuse/norseu/main/showcase/src/components/misc/BadgeAndTagPage.js")
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
        let icon9 = <span className="norseu-badge norseu-secondary norseu-no-border">9</span>;
        let tagWarning = <span className="norseu-tag norseu-warning">warning</span>;
        let pillDanger = <span className="norseu-pill norseu-danger">danger</span>;
        let customTag = (<div style={{marginTop:"6px"}}>
                <Tag scheme={Scheme.INFO} icon="fa fa-square" text="Info" outlined/>
                <Tag scheme={Scheme.PRIMARY} icon="fa fa-square" text="Primary" outlined/>
                <Tag scheme={Scheme.DANGER} icon="fa fa-square" text="Danger" outlined/>
        
        </div>);

        return (
            <div>
                <Panel className="norseu-p-left-right-20px">
                    <Panel contentClassName="norseu-p-left-right-20px" title="Badge">
                        <h5>Badges with Scheme</h5>
                        <div className="norseu-flex norseu-showcase-badges">
                            <span className="norseu-badge">1</span>
                            <span className="norseu-badge norseu-primary">9</span>
                            <span className="norseu-badge norseu-secondary">4</span>
                            <span className="norseu-badge norseu-success">99+</span>
                            <span className="norseu-badge norseu-warning">20</span>
                            <span className="norseu-badge norseu-info">5</span>
                            <span className="norseu-badge norseu-danger">3</span>
                        </div>
                        
                        <h5>Outlined Badges</h5>
                        <div className="norseu-flex norseu-showcase-badges">
                            <span className="norseu-badge norseu-skeleton">3</span>
                            <span className="norseu-badge norseu-primary-border-1px">9</span>
                            <span className="norseu-badge norseu-secondary-border-1px">4</span>
                            <span className="norseu-badge norseu-success-border-1px">99+</span>
                            <span className="norseu-badge norseu-warning-border-1px">20</span>
                            <span className="norseu-badge norseu-info-border-1px">5</span>
                            <span className="norseu-badge norseu-danger-border-1px">3</span>
                        </div>

                        <h5>Sizes</h5>
                        <div className="norseu-flex norseu-showcase-badges">
                            <span className="norseu-badge norseu-warning norseu-size-s">20</span>
                            <span className="norseu-badge norseu-info norseu-size-m">99+</span>
                            <span className="norseu-badge norseu-danger norseu-size-l">33</span>
                            <span className="norseu-badge norseu-primary norseu-size-lx">69</span>
                            <span className="norseu-badge norseu-success norseu-size-lxx">41</span>
                        </div>
                    </Panel>

                    <Panel contentClassName="norseu-p-left-right-20px" title="Tag">
                    <h5>Tags with Scheme</h5>
                        <div className="norseu-flex norseu-showcase-badges">
                            <span className="norseu-tag">Default</span>
                            <span className="norseu-tag norseu-primary">primary</span>
                            <span className="norseu-tag norseu-secondary">secondary</span>
                            <span className="norseu-tag norseu-success">success</span>
                            <span className="norseu-tag norseu-warning">warning</span>
                            <span className="norseu-tag norseu-info">info</span>
                            <span className="norseu-tag norseu-danger">danger</span>
                        </div>
                        
                        <h5>Outlined Tags</h5>
                        <div className="norseu-flex norseu-showcase-badges">
                            <span className="norseu-tag norseu-skeleton">primary</span>
                            <span className="norseu-tag norseu-primary-border-1px">primary</span>
                            <span className="norseu-tag norseu-secondary-border-1px">secondary</span>
                            <span className="norseu-tag norseu-success-border-1px">success</span>
                            <span className="norseu-tag norseu-warning-border-1px">warning</span>
                            <span className="norseu-tag norseu-info-border-1px">info</span>
                            <span className="norseu-tag norseu-danger-border-1px">danger</span>
                        </div>
                    </Panel>

                    <Panel contentClassName="norseu-p-left-right-20px" title="Pill">
                    <h5>Pills with Scheme</h5>
                        <div className="norseu-flex norseu-showcase-badges">
                            <span className="norseu-pill">Default</span>
                            <span className="norseu-pill norseu-primary">primary</span>
                            <span className="norseu-pill norseu-secondary">secondary</span>
                            <span className="norseu-pill norseu-success">success</span>
                            <span className="norseu-pill norseu-warning">warning</span>
                            <span className="norseu-pill norseu-info">info</span>
                            <span className="norseu-pill norseu-danger">danger</span>
                        </div>
                        
                        <h5>Outlined Pills</h5>
                        <div className="norseu-flex norseu-showcase-badges">
                            <span className="norseu-pill norseu-skeleton">primary</span>
                            <span className="norseu-pill norseu-primary-border-1px">primary</span>
                            <span className="norseu-pill norseu-secondary-border-1px">secondary</span>
                            <span className="norseu-pill norseu-success-border-1px">success</span>
                            <span className="norseu-pill norseu-warning-border-1px">warning</span>
                            <span className="norseu-pill norseu-info-border-1px">info</span>
                            <span className="norseu-pill norseu-danger-border-1px">danger</span>
                        </div>
                    </Panel>

                    <Panel contentClassName="norseu-p-left-right-20px" title="With Other Components">
                        <TabPane activeTabIndex={0}>
                            <TabPanel scheme={Scheme.INFO} icon="fa fa-eye" title="Preview">
                                <h5>As Button Icons</h5>
                                <Button scheme={Scheme.PRIMARY} text="Messages" icon={icon9} />
                                <Button scheme={Scheme.INFO} text="Emails" icon={icon9} alignIcon={Alignment.RIGHT} />
                                <Button scheme={Scheme.WARNING} text="Type" icon={tagWarning} outlined />
                                <Button scheme={Scheme.DANGER} text="Error" icon={pillDanger} alignIcon={Alignment.RIGHT} outlined rounded/>
                                <Button text="Tags" rightIcon={customTag} scheme={Scheme.SECONDARY} outlined/>

                                <h5>Positioned</h5>
                                <div className="norseu-flex">
                                    <div className="norseu-badge-overlay">
                                        <span className="norseu-badge norseu-primary norseu-no-border">1</span>
                                        <Button icon="fa fa-bell" scheme={Scheme.PRIMARY} outlined textOnly rounded/>
                                    </div>
                                    <div className="norseu-badge-overlay">
                                        <span className="norseu-badge norseu-warning norseu-no-border" style={{bottom:"0"}}>2</span>
                                        <Button icon="fa fa-bell" scheme={Scheme.WARNING} outlined textOnly rounded/>
                                    </div>
                                    <div className="norseu-badge-overlay">
                                        <span className="norseu-badge norseu-info norseu-no-border" style={{right:"0",top:"0"}}>3</span>
                                        <Button icon="fa fa-bell" scheme={Scheme.INFO} outlined textOnly rounded/>
                                    </div>
                                    <div className="norseu-badge-overlay">
                                        <span className="norseu-badge norseu-danger norseu-no-border" style={{right:"0",bottom:"0"}}>4</span>
                                        <Button icon="fa fa-bell" scheme={Scheme.DANGER} outlined textOnly rounded/>
                                    </div>
                                </div>
                            </TabPanel>
                            <TabPanel scheme={Scheme.INFO} icon="fa fa-code" title="Source">
                                <SyntaxHighlighter language="jsx" style={prism} className={"norseu-showcase-code"} >
                                    {`let icon9 = <span className="norseu-badge norseu-secondary norseu-no-border">9</span>;
let tagWarning = <span className="norseu-tag norseu-warning">warning</span>;
let pillDanger = <span className="norseu-pill norseu-danger">danger</span>;

return (
    <div>
        <Button scheme={Scheme.PRIMARY} text="Messages" icon={icon9} />
        <Button scheme={Scheme.INFO} text="Emails" icon={icon9} alignIcon={Alignment.RIGHT} />
        <Button scheme={Scheme.WARNING} text="Type" icon={tagWarning} outlined />
        <Button scheme={Scheme.DANGER} text="Error" icon={pillDanger} alignIcon={Alignment.RIGHT} outlined rounded/>

        <div className="norseu-flex">
            <div className="norseu-badge-overlay">
                <span className="norseu-badge norseu-primary norseu-no-border">1</span>
                <Button icon="fa fa-bell" scheme={Scheme.PRIMARY} outlined textOnly rounded/>
            </div>
            <div className="norseu-badge-overlay">
                <span className="norseu-badge norseu-warning norseu-no-border" style={{bottom:"0"}}>2</span>
                <Button icon="fa fa-bell" scheme={Scheme.WARNING} outlined textOnly rounded/>
            </div>
            <div className="norseu-badge-overlay">
                <span className="norseu-badge norseu-info norseu-no-border" style={{right:"0",top:"0"}}>3</span>
                <Button icon="fa fa-bell" scheme={Scheme.INFO} outlined textOnly rounded/>
            </div>
            <div className="norseu-badge-overlay">
                <span className="norseu-badge norseu-danger norseu-no-border" style={{right:"0",bottom:"0"}}>4</span>
                <Button icon="fa fa-bell" scheme={Scheme.DANGER} outlined textOnly rounded/>
            </div>
        </div>
    </div>
)`}
                                </SyntaxHighlighter>
                            </TabPanel>
                        </TabPane>
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
                <h1>Badge, Tag and Pill</h1>

                <Panel className="norseu-p-left-right-20px">
                    <SyntaxHighlighter language="javascript" style={prism} className={"norseu-showcase-code"}>
                        {`import 'norseu/style.css'`}
                    </SyntaxHighlighter>
                </Panel>
                
                {this.renderInteractiveEditor()}
                {this.renderSampleComponents()}
                {this.renderDocumentation()}

            </div>
        )
    }

}
