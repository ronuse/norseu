
import React from "react"
import { Panel, TabPane, TabPanel } from '@ronuse/react-ui/core/panels'
import { Button } from '@ronuse/react-ui/core/buttons'
import { Alignment, Scheme } from "@ronuse/react-ui/core/variables"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';

export class ButtonPage extends React.Component {

    state = {
        pageSource: ''
    }

    loadPageSource() {
        fetch("https://raw.githubusercontent.com/ronuse/@ronuse/react-ui/main/showcase/src/components/core/buttons/ButtonPage.js")
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
        let customIcon1 = <img alt="ronuse-react-ui" src="https://avatars3.githubusercontent.com/u/14879387?s=16" style={{borderRadius:"50%"}}/>;
        let customIcon2 = <img alt="ronuse-react-ui" src="https://avatars3.githubusercontent.com/u/69908664?s=16" style={{borderRadius:"50%"}}/>;
        let customIcon3 = <img alt="ronuse-react-ui" src="https://avatars3.githubusercontent.com/u/14879387?s=100"/>;

        return (
            <Panel className="r-r-padding-left-right-20px">
                <Panel title="Basic" expanded collapsible borderless>
                    <Button text="Click Me" />
                    <Button icon="fa fa-user-circle" text="View Profile" />
                    <Button icon={customIcon1} text="Custom Icon" />
                    <Button rightIcon={customIcon2} text="RIght Custom Icon" />
                    <Button icon="fa fa-pencil" text="Edit" alignIcon={Alignment.RIGHT} />
                    <Button icon="fa fa-user-circle" rightIcon="fa fa-arrow-right" text="Update Profile" />
                    <Button icon="fa fa-user-circle" rightIcon="fa fa-arrow-right" text="Update Profile" alignIcon={Alignment.RIGHT} />
                    <Button icon="fa fa-user-circle" text="Disabled" disabled/>
                    <Button scheme={Scheme.PRIMARY} rightIcon="fa fa-external-link-alt" text="Link" href="https://github.com/ronuse/ronuse-react-ui" link/>
                </Panel>

                <Panel title="Buttons with Scheme" expanded collapsible borderless>
                    <Button scheme={Scheme.SKELETON} text="Skeleton" />
                    <Button scheme={Scheme.STATELESS} icon="fa fa-exclamation" text="Stateless"/>
                    <Button scheme={Scheme.PRIMARY} icon="fa fa-circle" text="Primary"/>
                    <Button scheme={Scheme.SECONDARY} icon="fa fa-square" text="Secondary"/>
                    <Button scheme={Scheme.SUCCESS} icon="fa fa-check" text="Success"/>
                    <Button scheme={Scheme.INFO} icon="fa fa-bell" text="Info"/>
                    <Button scheme={Scheme.WARNING} icon="fa fa-warning" text="Warning"/>
                    <Button scheme={Scheme.DANGER} icon="fa fa-times" text="Danger"/>
                </Panel>

                <Panel title="Disabled Buttons with Scheme" expanded collapsible borderless>
                    <Button scheme={Scheme.SKELETON} text="Skeleton" disabled/>
                    <Button scheme={Scheme.STATELESS} icon="fa fa-exclamation" text="Stateless" disabled/>
                    <Button scheme={Scheme.PRIMARY} icon="fa fa-circle" text="Primary" disabled/>
                    <Button scheme={Scheme.SECONDARY} icon="fa fa-square" text="Secondary" disabled/>
                    <Button scheme={Scheme.SUCCESS} icon="fa fa-check" text="Success" disabled/>
                    <Button scheme={Scheme.INFO} icon="fa fa-bell" text="Info" disabled/>
                    <Button scheme={Scheme.WARNING} icon="fa fa-warning" text="Warning" disabled/>
                    <Button scheme={Scheme.DANGER} icon="fa fa-times" text="Danger" disabled/>
                </Panel>

                <Panel title="Fill Button With Text And Icon Alignment" expanded collapsible borderless>
                    <Button text="Click Me" alignText={Alignment.CENTER} fill/>
                    <Button scheme={Scheme.SKELETON} fill/>
                    <Button scheme={Scheme.STATELESS} alignText={Alignment.LEFT} rightIcon="fa fa-exclamation" text="Stateless" fill/>
                    <Button scheme={Scheme.PRIMARY} alignText={Alignment.RIGHT} rightIcon="fa fa-circle" text="Primary" fill/>
                    <Button scheme={Scheme.SECONDARY} alignText={Alignment.LEFT} rightIcon="fa fa-square" text="Secondary" fill/>
                    <Button scheme={Scheme.SUCCESS} alignText={Alignment.CENTER} icon="fa fa-check" alignIcon={Alignment.LEFT} rightIcon="fa fa-check" text="Success" fill/>
                    <Button scheme={Scheme.INFO} alignText={Alignment.RIGHT} icon="fa fa-bell" alignIcon={Alignment.RIGHT}  rightIcon="fa fa-bell" text="Info" fill/>
                    <Button scheme={Scheme.WARNING} alignText={Alignment.LEFT} icon="fa fa-warning" alignIcon={Alignment.LEFT} rightIcon="fa fa-warning" text="Warning" fill/>
                    <Button scheme={Scheme.DANGER} alignText={Alignment.RIGHT} icon="fa fa-times" alignIcon={Alignment.LEFT} rightIcon="fa fa-times" text="Danger" fill/>
                </Panel>
                
                <Panel title="Rounded Buttons" expanded collapsible borderless>
                    <Button text="Click Me" rounded/>
                    <Button scheme={Scheme.SKELETON} rounded/>
                    <Button scheme={Scheme.STATELESS} icon="fa fa-exclamation" text="Stateless" rounded/>
                    <Button scheme={Scheme.PRIMARY} icon="fa fa-circle" text="Primary" rounded/>
                    <Button scheme={Scheme.SECONDARY} icon="fa fa-square" text="Secondary" rounded/>
                    <Button scheme={Scheme.SUCCESS} icon="fa fa-check" text="Success" rounded/>
                    <Button scheme={Scheme.INFO} icon="fa fa-bell" text="Info" rounded/>
                    <Button scheme={Scheme.WARNING} icon="fa fa-warning" text="Warning" rounded/>
                    <Button scheme={Scheme.DANGER} icon="fa fa-times" text="Danger" rounded/>
                </Panel>
                
                <Panel title="Raised Buttons" expanded collapsible borderless>
                    <Button text="Click Me" raised/>
                    <Button scheme={Scheme.SKELETON} raised/>
                    <Button scheme={Scheme.STATELESS} icon="fa fa-exclamation" text="Stateless" raised/>
                    <Button scheme={Scheme.PRIMARY} icon="fa fa-circle" text="Primary" raised/>
                    <Button scheme={Scheme.SECONDARY} icon="fa fa-square" text="Secondary" raised/>
                    <Button scheme={Scheme.SUCCESS} icon="fa fa-check" text="Success" raised/>
                    <Button scheme={Scheme.INFO} icon="fa fa-bell" text="Info" raised/>
                    <Button scheme={Scheme.WARNING} icon="fa fa-warning" text="Warning" raised/>
                    <Button scheme={Scheme.DANGER} icon="fa fa-times" text="Danger" raised/>
                </Panel>
                
                <Panel title="Outlined Buttons" expanded collapsible borderless>
                    <Button text="Click Me" textonly outlined/>
                    <Button scheme={Scheme.SKELETON} textonly outlined/>
                    <Button scheme={Scheme.STATELESS} icon="fa fa-exclamation" text="Stateless" textonly outlined/>
                    <Button scheme={Scheme.PRIMARY} icon="fa fa-circle" text="Primary" textonly outlined/>
                    <Button scheme={Scheme.SECONDARY} icon="fa fa-square" text="Secondary" textonly outlined/>
                    <Button scheme={Scheme.SUCCESS} icon="fa fa-check" text="Success" textonly outlined/>
                    <Button scheme={Scheme.INFO} icon="fa fa-bell" text="Info" textonly outlined/>
                    <Button scheme={Scheme.WARNING} icon="fa fa-warning" text="Warning" textonly outlined/>
                    <Button scheme={Scheme.DANGER} icon="fa fa-times" text="Danger" textonly outlined/>
                </Panel>
                
                <Panel title="Outlined With Over Filled Buttons" expanded collapsible borderless>
                    <Button text="Click Me" outlined/>
                    <Button scheme={Scheme.SKELETON} outlined fillOnHover/>
                    <Button scheme={Scheme.STATELESS} icon="fa fa-exclamation" text="Stateless" outlined fillOnHover/>
                    <Button scheme={Scheme.PRIMARY} icon="fa fa-circle" text="Primary" outlined fillOnHover/>
                    <Button scheme={Scheme.SECONDARY} icon="fa fa-square" text="Secondary" outlined fillOnHover/>
                    <Button scheme={Scheme.SUCCESS} icon="fa fa-check" text="Success" outlined fillOnHover/>
                    <Button scheme={Scheme.INFO} icon="fa fa-bell" text="Info" outlined fillOnHover/>
                    <Button scheme={Scheme.WARNING} icon="fa fa-warning" text="Warning" outlined fillOnHover/>
                    <Button scheme={Scheme.DANGER} icon="fa fa-times" text="Danger" outlined fillOnHover/>
                </Panel>
                
                <Panel title="Text Only Buttons" expanded collapsible borderless>
                    <Button text="Click Me" textonly/>
                    <Button scheme={Scheme.SKELETON} textonly/>
                    <Button scheme={Scheme.STATELESS} icon="fa fa-exclamation" text="Stateless" textonly/>
                    <Button scheme={Scheme.PRIMARY} icon="fa fa-circle" text="Primary" textonly/>
                    <Button scheme={Scheme.SECONDARY} icon="fa fa-square" text="Secondary" textonly/>
                    <Button scheme={Scheme.SUCCESS} icon="fa fa-check" text="Success" textonly/>
                    <Button scheme={Scheme.INFO} icon="fa fa-bell" text="Info" textonly/>
                    <Button scheme={Scheme.WARNING} icon="fa fa-warning" text="Warning" textonly/>
                    <Button scheme={Scheme.DANGER} icon="fa fa-times" text="Danger" textonly/>
                </Panel>
                
                <Panel title="Raised Text Only Buttons" expanded collapsible borderless>
                    <Button text="Click Me" textonly raised/>
                    <Button scheme={Scheme.SKELETON} raised/>
                    <Button scheme={Scheme.STATELESS} icon="fa fa-exclamation" text="Stateless" textonly raised/>
                    <Button scheme={Scheme.PRIMARY} icon="fa fa-circle" text="Primary" textonly raised/>
                    <Button scheme={Scheme.SECONDARY} icon="fa fa-square" text="Secondary" textonly raised/>
                    <Button scheme={Scheme.SUCCESS} icon="fa fa-check" text="Success" textonly raised/>
                    <Button scheme={Scheme.INFO} icon="fa fa-bell" text="Info" textonly raised/>
                    <Button scheme={Scheme.WARNING} icon="fa fa-warning" text="Warning" textonly raised/>
                    <Button scheme={Scheme.DANGER} icon="fa fa-times" text="Danger" textonly raised/>
                </Panel>

                <Panel title="Icon Button" expanded collapsible borderless>
                    <Button icon="fa fa-user-circle" />
                    <Button scheme={Scheme.SKELETON} icon="fa fa-user" />
                    <Button scheme={Scheme.PRIMARY} icon="fa fa-circle"/>
                    <Button scheme={Scheme.SECONDARY} icon="fa fa-square"/>
                    <Button scheme={Scheme.SUCCESS} icon="fa fa-check"/>
                    <Button scheme={Scheme.INFO} icon="fa fa-bell"/>
                    <Button scheme={Scheme.WARNING} icon="fa fa-warning"/>
                    <Button scheme={Scheme.DANGER} icon="fa fa-times"/>
                </Panel>

                <Panel title="Round Icon Button" expanded collapsible borderless>
                    <Button icon="fa fa-user-circle" rounded/>
                    <Button icon={customIcon3} style={{width:"37px",height:"35px"}} fillIcon rounded/>
                    <Button scheme={Scheme.SKELETON} icon="fa fa-user" rounded/>
                    <Button scheme={Scheme.PRIMARY} icon="fa fa-circle" rounded/>
                    <Button scheme={Scheme.SECONDARY} icon="fa fa-square" rounded/>
                    <Button scheme={Scheme.SUCCESS} icon="fa fa-check" rounded/>
                    <Button scheme={Scheme.INFO} icon="fa fa-bell" rounded/>
                    <Button scheme={Scheme.WARNING} icon="fa fa-warning" rounded/>
                    <Button scheme={Scheme.DANGER} icon="fa fa-times" rounded/>
                </Panel>

                <Panel title="Round and Outlined Icon Button" expanded collapsible borderless>
                    <Button icon="fa fa-user-circle" rounded outlined/>
                    <Button scheme={Scheme.SKELETON} icon="fa fa-user" rounded outlined/>
                    <Button scheme={Scheme.PRIMARY} icon="fa fa-circle" rounded outlined/>
                    <Button scheme={Scheme.SECONDARY} icon="fa fa-square" rounded outlined/>
                    <Button scheme={Scheme.SUCCESS} icon="fa fa-check" rounded outlined/>
                    <Button scheme={Scheme.INFO} icon="fa fa-bell" rounded outlined/>
                    <Button scheme={Scheme.WARNING} icon="fa fa-warning" rounded outlined/>
                    <Button scheme={Scheme.DANGER} icon="fa fa-times" rounded outlined/>
                </Panel>

                <Panel title="Round Text Only Icon Button" expanded collapsible borderless>
                    <Button icon="fa fa-user-circle" rounded textonly/>
                    <Button scheme={Scheme.SKELETON} icon="fa fa-user" rounded textonly/>
                    <Button scheme={Scheme.PRIMARY} icon="fa fa-circle" rounded textonly/>
                    <Button scheme={Scheme.SECONDARY} icon="fa fa-square" rounded textonly/>
                    <Button scheme={Scheme.SUCCESS} icon="fa fa-check" rounded textonly/>
                    <Button scheme={Scheme.INFO} icon="fa fa-bell" rounded textonly/>
                    <Button scheme={Scheme.WARNING} icon="fa fa-warning" rounded textonly/>
                    <Button scheme={Scheme.DANGER} icon="fa fa-times" rounded textonly/>
                </Panel>

                <Panel title="Social Icon Buttons" expanded collapsible borderless>
                    <Button scheme={Scheme.WARNING} icon={customIcon2}/>
                    <Button scheme={Scheme.PRIMARY} icon="fa fa-facebook-square"/>
                    <Button scheme={Scheme.SECONDARY} icon="fa fa-twitter"/>
                    <Button scheme={Scheme.SUCCESS} icon="fa fa-google"/>
                    <Button scheme={Scheme.INFO} icon="fa fa-instagram"/>
                    <Button scheme={Scheme.WARNING} icon="fa fa-linkedin"/>
                    <Button scheme={Scheme.DANGER} icon="fa fa-skype"/>
                    <br/>
                    <Button scheme={Scheme.WARNING} icon={customIcon2} rounded/>
                    <Button scheme={Scheme.PRIMARY} icon="fa fa-facebook-square" rounded/>
                    <Button scheme={Scheme.SECONDARY} icon="fa fa-twitter" rounded/>
                    <Button scheme={Scheme.SUCCESS} icon="fa fa-google" rounded/>
                    <Button scheme={Scheme.INFO} icon="fa fa-instagram" rounded/>
                    <Button scheme={Scheme.WARNING} icon="fa fa-linkedin" rounded/>
                    <Button scheme={Scheme.DANGER} icon="fa fa-skype" rounded/>
                    <br/>
                    <Button scheme={Scheme.WARNING} icon={customIcon2} rounded outlined/>
                    <Button scheme={Scheme.PRIMARY} icon="fa fa-facebook-square" rounded outlined/>
                    <Button scheme={Scheme.SECONDARY} icon="fa fa-twitter" rounded outlined/>
                    <Button scheme={Scheme.SUCCESS} icon="fa fa-google" rounded outlined/>
                    <Button scheme={Scheme.INFO} icon="fa fa-instagram" rounded outlined/>
                    <Button scheme={Scheme.WARNING} icon="fa fa-linkedin" rounded outlined/>
                    <Button scheme={Scheme.DANGER} icon="fa fa-skype" rounded outlined/>
                    <br/>
                    <Button scheme={Scheme.WARNING} icon={customIcon2} textonly rounded/>
                    <Button scheme={Scheme.PRIMARY} icon="fa fa-facebook-square" textonly rounded/>
                    <Button scheme={Scheme.SECONDARY} icon="fa fa-twitter" textonly rounded/>
                    <Button scheme={Scheme.SUCCESS} icon="fa fa-google" textonly rounded/>
                    <Button scheme={Scheme.INFO} icon="fa fa-instagram" textonly rounded/>
                    <Button scheme={Scheme.WARNING} icon="fa fa-linkedin" textonly rounded/>
                    <Button scheme={Scheme.DANGER} icon="fa fa-skype" textonly rounded/>
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
                <h1>Button</h1>

                <Panel borderless>
                    <SyntaxHighlighter language="javascript" style={prism} className={"r-r-showcase-code"}>
                        {`import { Button } from '@ronuse/react-ui/core/buttons'`}
                    </SyntaxHighlighter>
                </Panel>

                {this.renderInteractiveEditor()}
                {this.renderSampleComponents()}
                {this.renderDocumentation()}
            </div>
        )
    }
}