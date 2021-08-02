
import React from "react";
import { Panel, TabPane, TabPanel } from '@ronuse/react-ui/core/panels';
import { Button } from '@ronuse/react-ui/core/buttons';
import { Tag } from '@ronuse/react-ui/core/misc';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Scheme } from "@ronuse/react-ui/core/variables/Stylers";
import { Alignment } from "@ronuse/react-ui/core/variables";

export class BadgeAndTagPage extends React.Component {

    state = {
        pageSource: ''
    }

    loadPageSource() {
        fetch("https://raw.githubusercontent.com/ronuse/@ronuse/react-ui/main/showcase/src/components/misc/BadgeAndTagPage.js")
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
        let icon9 = <span className="r-r-badge r-r-secondary r-r-no-border">9</span>;
        let tagWarning = <span className="r-r-tag r-r-warning">warning</span>;
        let pillDanger = <span className="r-r-pill r-r-danger">danger</span>;
        let customTag = (<div style={{marginTop:"6px"}}>
                <Tag scheme={Scheme.INFO} icon="fa fa-square" text="Info" outlined/>
                <Tag scheme={Scheme.PRIMARY} icon="fa fa-square" text="Primary" outlined/>
                <Tag scheme={Scheme.DANGER} icon="fa fa-square" text="Danger" outlined/>
        
        </div>);

        return (
            <div>
                <Panel className="r-r-padding-left-right-20px">
                    <Panel contentClassName="r-r-padding-left-right-20px" title="Badge">
                        <h5>Badges with Scheme</h5>
                        <div className="r-r-flex r-r-showcase-badges">
                            <span className="r-r-badge">1</span>
                            <span className="r-r-badge r-r-primary">9</span>
                            <span className="r-r-badge r-r-secondary">4</span>
                            <span className="r-r-badge r-r-success">99+</span>
                            <span className="r-r-badge r-r-warning">20</span>
                            <span className="r-r-badge r-r-info">5</span>
                            <span className="r-r-badge r-r-danger">3</span>
                        </div>
                        
                        <h5>Outlined Badges</h5>
                        <div className="r-r-flex r-r-showcase-badges">
                            <span className="r-r-badge r-r-skeleton">3</span>
                            <span className="r-r-badge r-r-primary-border-1px">9</span>
                            <span className="r-r-badge r-r-secondary-border-1px">4</span>
                            <span className="r-r-badge r-r-success-border-1px">99+</span>
                            <span className="r-r-badge r-r-warning-border-1px">20</span>
                            <span className="r-r-badge r-r-info-border-1px">5</span>
                            <span className="r-r-badge r-r-danger-border-1px">3</span>
                        </div>

                        <h5>Sizes</h5>
                        <div className="r-r-flex r-r-showcase-badges">
                            <span className="r-r-badge r-r-warning r-r-size-s">20</span>
                            <span className="r-r-badge r-r-info r-r-size-m">99+</span>
                            <span className="r-r-badge r-r-danger r-r-size-l">33</span>
                            <span className="r-r-badge r-r-primary r-r-size-lx">69</span>
                            <span className="r-r-badge r-r-success r-r-size-lxx">41</span>
                        </div>
                    </Panel>

                    <Panel contentClassName="r-r-padding-left-right-20px" title="Tag">
                    <h5>Tags with Scheme</h5>
                        <div className="r-r-flex r-r-showcase-badges">
                            <span className="r-r-tag">Default</span>
                            <span className="r-r-tag r-r-primary">primary</span>
                            <span className="r-r-tag r-r-secondary">secondary</span>
                            <span className="r-r-tag r-r-success">success</span>
                            <span className="r-r-tag r-r-warning">warning</span>
                            <span className="r-r-tag r-r-info">info</span>
                            <span className="r-r-tag r-r-danger">danger</span>
                        </div>
                        
                        <h5>Outlined Tags</h5>
                        <div className="r-r-flex r-r-showcase-badges">
                            <span className="r-r-tag r-r-skeleton">primary</span>
                            <span className="r-r-tag r-r-primary-border-1px">primary</span>
                            <span className="r-r-tag r-r-secondary-border-1px">secondary</span>
                            <span className="r-r-tag r-r-success-border-1px">success</span>
                            <span className="r-r-tag r-r-warning-border-1px">warning</span>
                            <span className="r-r-tag r-r-info-border-1px">info</span>
                            <span className="r-r-tag r-r-danger-border-1px">danger</span>
                        </div>
                    </Panel>

                    <Panel contentClassName="r-r-padding-left-right-20px" title="Pill">
                    <h5>Pills with Scheme</h5>
                        <div className="r-r-flex r-r-showcase-badges">
                            <span className="r-r-pill">Default</span>
                            <span className="r-r-pill r-r-primary">primary</span>
                            <span className="r-r-pill r-r-secondary">secondary</span>
                            <span className="r-r-pill r-r-success">success</span>
                            <span className="r-r-pill r-r-warning">warning</span>
                            <span className="r-r-pill r-r-info">info</span>
                            <span className="r-r-pill r-r-danger">danger</span>
                        </div>
                        
                        <h5>Outlined Pills</h5>
                        <div className="r-r-flex r-r-showcase-badges">
                            <span className="r-r-pill r-r-skeleton">primary</span>
                            <span className="r-r-pill r-r-primary-border-1px">primary</span>
                            <span className="r-r-pill r-r-secondary-border-1px">secondary</span>
                            <span className="r-r-pill r-r-success-border-1px">success</span>
                            <span className="r-r-pill r-r-warning-border-1px">warning</span>
                            <span className="r-r-pill r-r-info-border-1px">info</span>
                            <span className="r-r-pill r-r-danger-border-1px">danger</span>
                        </div>
                    </Panel>

                    <Panel contentClassName="r-r-padding-left-right-20px" title="With Other Components">
                        <TabPane activeTabIndex={0}>
                            <TabPanel scheme={Scheme.INFO} icon="fa fa-eye" title="Preview">
                                <h5>As Button Icons</h5>
                                <Button scheme={Scheme.PRIMARY} text="Messages" icon={icon9} />
                                <Button scheme={Scheme.INFO} text="Emails" icon={icon9} alignIcon={Alignment.RIGHT} />
                                <Button scheme={Scheme.WARNING} text="Type" icon={tagWarning} outlined />
                                <Button scheme={Scheme.DANGER} text="Error" icon={pillDanger} alignIcon={Alignment.RIGHT} outlined rounded/>
                                <Button text="Tags" rightIcon={customTag} scheme={Scheme.SECONDARY} outlined/>

                                <h5>Positioned</h5>
                                <div className="r-r-flex">
                                    <div className="r-r-badge-overlay">
                                        <span className="r-r-badge r-r-primary r-r-no-border">1</span>
                                        <Button icon="fa fa-bell" scheme={Scheme.PRIMARY} outlined textonly rounded/>
                                    </div>
                                    <div className="r-r-badge-overlay">
                                        <span className="r-r-badge r-r-warning r-r-no-border" style={{bottom:"0"}}>2</span>
                                        <Button icon="fa fa-bell" scheme={Scheme.WARNING} outlined textonly rounded/>
                                    </div>
                                    <div className="r-r-badge-overlay">
                                        <span className="r-r-badge r-r-info r-r-no-border" style={{right:"0",top:"0"}}>3</span>
                                        <Button icon="fa fa-bell" scheme={Scheme.INFO} outlined textonly rounded/>
                                    </div>
                                    <div className="r-r-badge-overlay">
                                        <span className="r-r-badge r-r-danger r-r-no-border" style={{right:"0",bottom:"0"}}>4</span>
                                        <Button icon="fa fa-bell" scheme={Scheme.DANGER} outlined textonly rounded/>
                                    </div>
                                </div>
                            </TabPanel>
                            <TabPanel scheme={Scheme.INFO} icon="fa fa-code" title="Source">
                                <SyntaxHighlighter language="jsx" style={prism} className={"r-r-showcase-code"} >
                                    {`let icon9 = <span className="r-r-badge r-r-secondary r-r-no-border">9</span>;
let tagWarning = <span className="r-r-tag r-r-warning">warning</span>;
let pillDanger = <span className="r-r-pill r-r-danger">danger</span>;

return (
    <div>
        <Button scheme={Scheme.PRIMARY} text="Messages" icon={icon9} />
        <Button scheme={Scheme.INFO} text="Emails" icon={icon9} alignIcon={Alignment.RIGHT} />
        <Button scheme={Scheme.WARNING} text="Type" icon={tagWarning} outlined />
        <Button scheme={Scheme.DANGER} text="Error" icon={pillDanger} alignIcon={Alignment.RIGHT} outlined rounded/>

        <div className="r-r-flex">
            <div className="r-r-badge-overlay">
                <span className="r-r-badge r-r-primary r-r-no-border">1</span>
                <Button icon="fa fa-bell" scheme={Scheme.PRIMARY} outlined textonly rounded/>
            </div>
            <div className="r-r-badge-overlay">
                <span className="r-r-badge r-r-warning r-r-no-border" style={{bottom:"0"}}>2</span>
                <Button icon="fa fa-bell" scheme={Scheme.WARNING} outlined textonly rounded/>
            </div>
            <div className="r-r-badge-overlay">
                <span className="r-r-badge r-r-info r-r-no-border" style={{right:"0",top:"0"}}>3</span>
                <Button icon="fa fa-bell" scheme={Scheme.INFO} outlined textonly rounded/>
            </div>
            <div className="r-r-badge-overlay">
                <span className="r-r-badge r-r-danger r-r-no-border" style={{right:"0",bottom:"0"}}>4</span>
                <Button icon="fa fa-bell" scheme={Scheme.DANGER} outlined textonly rounded/>
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
                <h1>Badge, Tag and Pill</h1>

                <Panel className="r-r-padding-left-right-20px">
                    <SyntaxHighlighter language="javascript" style={prism} className={"r-r-showcase-code"}>
                        {`import '@ronuse/react-ui/style.css'`}
                    </SyntaxHighlighter>
                </Panel>
                
                {this.renderInteractiveEditor()}
                {this.renderSampleComponents()}
                {this.renderDocumentation()}

            </div>
        )
    }

}
