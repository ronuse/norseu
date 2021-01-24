
import React from "react";
import { Panel, TabPane, TabPanel } from '@ronuse/react-ui/core/panels';
import { Tag } from '@ronuse/react-ui/core/misc';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Scheme } from "@ronuse/react-ui/core/variables/Stylers";
import { Alignment } from "@ronuse/react-ui/core/variables";

export class TagPage extends React.Component {

    state = {
        pageSource: ';'
    }

    loadPageSource() {
        fetch("https://raw.githubusercontent.com/ronuse/@ronuse/react-ui/main/showcase/src/components/misc/TagPage.js")
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
                            {`<Tag text="Click Me" />`}
                        </SyntaxHighlighter>
                    </TabPanel>
                    <TabPanel title="Generated Source (HTML)" icon="fa fa-code">
                        <SyntaxHighlighter language="jsx" style={prism} className={"r-r-showcase-code"} >
                            {`<Tag text="Click Me" />`}
                        </SyntaxHighlighter>
                    </TabPanel>
                </TabPane>
            </Panel>
        )
    }

    renderSampleComponents() {
        let customIcon1 = <img alt="ronuse-react-ui" src="https://avatars3.githubusercontent.com/u/14879387?s=12" style={{borderRadius:"50%"}}/>;
        let customIcon2 = <img alt="ronuse-react-ui" src="https://avatars3.githubusercontent.com/u/69908664?s=12" style={{borderRadius:"50%"}}/>;

        return (
            <Panel className="r-r-padding-left-right-20px">
                <p>Click the X button to remove the tag</p>

                <Panel title="Removable Basic Tags" expanded collapsible borderless>
                    <Tag scheme={Scheme.SECONDARY} text="Click Me" removable/>
                    <Tag scheme={Scheme.SECONDARY} icon="fa fa-user-circle" text="View Profile"  removable/>
                    <Tag scheme={Scheme.SECONDARY} icon={customIcon1} text="Custom Icon"  removable/>
                    <Tag scheme={Scheme.SECONDARY} rightIcon={customIcon2} text="RIght Custom Icon"  removable/>
                    <Tag scheme={Scheme.SECONDARY} icon="fa fa-pencil" text="Edit" alignIcon={Alignment.RIGHT}  removable/>
                    <Tag scheme={Scheme.SECONDARY} icon="fa fa-user-circle" rightIcon="fa fa-arrow-right" text="Update Profile" removable />
                    <Tag scheme={Scheme.SECONDARY} icon="fa fa-user-circle" rightIcon="fa fa-arrow-right" text="Update Profile" alignIcon={Alignment.RIGHT} />
                    <Tag scheme={Scheme.SECONDARY} icon="fa fa-user-circle" text="Disabled" disabled/>
                </Panel>

                <Panel title="Tags with Scheme" expanded collapsible borderless removable>
                    <Tag scheme={Scheme.SKELETON} text="Skeleton" removable/>
                    <Tag scheme={Scheme.STATELESS} icon="fa fa-exclamation" text="Stateless" removable/>
                    <Tag scheme={Scheme.PRIMARY} icon="fa fa-circle" text="Primary" removable/>
                    <Tag scheme={Scheme.SECONDARY} icon="fa fa-square" text="Secondary" removable/>
                    <Tag scheme={Scheme.SUCCESS} icon="fa fa-check" text="Success" removable/>
                    <Tag scheme={Scheme.INFO} icon="fa fa-bell" text="Info" removable/>
                    <Tag scheme={Scheme.WARNING} icon="fa fa-warning" text="Warning" removable/>
                    <Tag scheme={Scheme.DANGER} icon="fa fa-times" text="Danger" removable/>
                </Panel>

                <Panel title="Disabled Tags with Scheme" expanded collapsible borderless>
                    <Tag scheme={Scheme.SKELETON} text="Skeleton" disabled/>
                    <Tag scheme={Scheme.STATELESS} icon="fa fa-exclamation" text="Stateless" disabled/>
                    <Tag scheme={Scheme.PRIMARY} icon="fa fa-circle" text="Primary" disabled/>
                    <Tag scheme={Scheme.SECONDARY} icon="fa fa-square" text="Secondary" disabled/>
                    <Tag scheme={Scheme.SUCCESS} icon="fa fa-check" text="Success" disabled/>
                    <Tag scheme={Scheme.INFO} icon="fa fa-bell" text="Info" disabled/>
                    <Tag scheme={Scheme.WARNING} icon="fa fa-warning" text="Warning" disabled/>
                    <Tag scheme={Scheme.DANGER} icon="fa fa-times" text="Danger" disabled/>
                </Panel>

                <Panel title="Fill Tag With Text And Icon Alignment" expanded collapsible borderless>
                    <Tag text="Click Me" alignText={Alignment.CENTER} fill/>
                    <Tag scheme={Scheme.SKELETON} fill/>
                    <Tag scheme={Scheme.STATELESS} alignText={Alignment.LEFT} rightIcon="fa fa-exclamation" text="Stateless" fill/>
                    <Tag scheme={Scheme.PRIMARY} alignText={Alignment.RIGHT} rightIcon="fa fa-circle" text="Primary" fill/>
                    <Tag scheme={Scheme.SECONDARY} alignText={Alignment.LEFT} rightIcon="fa fa-square" text="Secondary" fill/>
                    <Tag scheme={Scheme.SUCCESS} alignText={Alignment.CENTER} icon="fa fa-check" alignIcon={Alignment.LEFT} rightIcon="fa fa-check" text="Success" fill/>
                    <Tag scheme={Scheme.INFO} alignText={Alignment.RIGHT} icon="fa fa-bell" alignIcon={Alignment.RIGHT}  rightIcon="fa fa-bell" text="Info" fill/>
                    <Tag scheme={Scheme.WARNING} alignText={Alignment.LEFT} icon="fa fa-warning" alignIcon={Alignment.LEFT} rightIcon="fa fa-warning" text="Warning" fill/>
                    <Tag scheme={Scheme.DANGER} alignText={Alignment.RIGHT} icon="fa fa-times" alignIcon={Alignment.LEFT} rightIcon="fa fa-times" text="Danger" fill/>
                </Panel>
                
                <Panel title="Rounded Tags" expanded collapsible borderless>
                    <Tag text="Click Me" rounded/>
                    <Tag scheme={Scheme.SKELETON} rounded/>
                    <Tag scheme={Scheme.STATELESS} icon="fa fa-exclamation" text="Stateless" rounded/>
                    <Tag scheme={Scheme.PRIMARY} icon="fa fa-circle" text="Primary" rounded/>
                    <Tag scheme={Scheme.SECONDARY} icon="fa fa-square" text="Secondary" rounded/>
                    <Tag scheme={Scheme.SUCCESS} icon="fa fa-check" text="Success" rounded/>
                    <Tag scheme={Scheme.INFO} icon="fa fa-bell" text="Info" rounded/>
                    <Tag scheme={Scheme.WARNING} icon="fa fa-warning" text="Warning" rounded/>
                    <Tag scheme={Scheme.DANGER} icon="fa fa-times" text="Danger" rounded/>
                </Panel>
                
                <Panel title="Raised Tags" expanded collapsible borderless>
                    <Tag text="Click Me" raised/>
                    <Tag scheme={Scheme.SKELETON} raised/>
                    <Tag scheme={Scheme.STATELESS} icon="fa fa-exclamation" text="Stateless" raised/>
                    <Tag scheme={Scheme.PRIMARY} icon="fa fa-circle" text="Primary" raised/>
                    <Tag scheme={Scheme.SECONDARY} icon="fa fa-square" text="Secondary" raised/>
                    <Tag scheme={Scheme.SUCCESS} icon="fa fa-check" text="Success" raised/>
                    <Tag scheme={Scheme.INFO} icon="fa fa-bell" text="Info" raised/>
                    <Tag scheme={Scheme.WARNING} icon="fa fa-warning" text="Warning" raised/>
                    <Tag scheme={Scheme.DANGER} icon="fa fa-times" text="Danger" raised/>
                </Panel>
                
                <Panel title="Outlined Tags" expanded collapsible borderless>
                    <Tag text="Click Me" textonly outlined/>
                    <Tag scheme={Scheme.SKELETON} textonly outlined/>
                    <Tag scheme={Scheme.STATELESS} icon="fa fa-exclamation" text="Stateless" textonly outlined/>
                    <Tag scheme={Scheme.PRIMARY} icon="fa fa-circle" text="Primary" textonly outlined/>
                    <Tag scheme={Scheme.SECONDARY} icon="fa fa-square" text="Secondary" textonly outlined/>
                    <Tag scheme={Scheme.SUCCESS} icon="fa fa-check" text="Success" textonly outlined/>
                    <Tag scheme={Scheme.INFO} icon="fa fa-bell" text="Info" textonly outlined/>
                    <Tag scheme={Scheme.WARNING} icon="fa fa-warning" text="Warning" textonly outlined/>
                    <Tag scheme={Scheme.DANGER} icon="fa fa-times" text="Danger" textonly outlined/>
                </Panel>
                
                <Panel title="Outlined With Over Filled Tags" expanded collapsible borderless>
                    <Tag text="Click Me" outlined/>
                    <Tag scheme={Scheme.SKELETON} outlined/>
                    <Tag scheme={Scheme.STATELESS} icon="fa fa-exclamation" text="Stateless" outlined/>
                    <Tag scheme={Scheme.PRIMARY} icon="fa fa-circle" text="Primary" outlined/>
                    <Tag scheme={Scheme.SECONDARY} icon="fa fa-square" text="Secondary" outlined/>
                    <Tag scheme={Scheme.SUCCESS} icon="fa fa-check" text="Success" outlined/>
                    <Tag scheme={Scheme.INFO} icon="fa fa-bell" text="Info" outlined/>
                    <Tag scheme={Scheme.WARNING} icon="fa fa-warning" text="Warning" outlined/>
                    <Tag scheme={Scheme.DANGER} icon="fa fa-times" text="Danger" outlined/>
                </Panel>
                
                <Panel title="Text Only Tags" expanded collapsible borderless>
                    <Tag text="Click Me" textonly/>
                    <Tag scheme={Scheme.SKELETON} textonly/>
                    <Tag scheme={Scheme.STATELESS} icon="fa fa-exclamation" text="Stateless" textonly/>
                    <Tag scheme={Scheme.PRIMARY} icon="fa fa-circle" text="Primary" textonly/>
                    <Tag scheme={Scheme.SECONDARY} icon="fa fa-square" text="Secondary" textonly/>
                    <Tag scheme={Scheme.SUCCESS} icon="fa fa-check" text="Success" textonly/>
                    <Tag scheme={Scheme.INFO} icon="fa fa-bell" text="Info" textonly/>
                    <Tag scheme={Scheme.WARNING} icon="fa fa-warning" text="Warning" textonly/>
                    <Tag scheme={Scheme.DANGER} icon="fa fa-times" text="Danger" textonly/>
                </Panel>
                
                <Panel title="Raised Text Only Tags" expanded collapsible borderless>
                    <Tag text="Click Me" textonly raised/>
                    <Tag scheme={Scheme.SKELETON} raised/>
                    <Tag scheme={Scheme.STATELESS} icon="fa fa-exclamation" text="Stateless" textonly raised/>
                    <Tag scheme={Scheme.PRIMARY} icon="fa fa-circle" text="Primary" textonly raised/>
                    <Tag scheme={Scheme.SECONDARY} icon="fa fa-square" text="Secondary" textonly raised/>
                    <Tag scheme={Scheme.SUCCESS} icon="fa fa-check" text="Success" textonly raised/>
                    <Tag scheme={Scheme.INFO} icon="fa fa-bell" text="Info" textonly raised/>
                    <Tag scheme={Scheme.WARNING} icon="fa fa-warning" text="Warning" textonly raised/>
                    <Tag scheme={Scheme.DANGER} icon="fa fa-times" text="Danger" textonly raised/>
                </Panel>
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
                <h1>Tag</h1>

                <Panel className="r-r-padding-left-right-20px">
                    <SyntaxHighlighter language="javascript" style={prism} className={"r-r-showcase-code"}>
                        {`import { Tag } from '@ronuse/react-ui/core/misc'`}
                    </SyntaxHighlighter>
                </Panel>
                
                {this.renderInteractiveEditor()}
                {this.renderSampleComponents()}
                {this.renderDocumentation()}

            </div>
        )
    }

}