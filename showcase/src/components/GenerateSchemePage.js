
import React from "react";
import { Panel, TabPane, TabPanel, Fieldset, Accordion, AccordionPanel, ScrollPanel } from '@ronuse/react-ui/core/panels';
import { Button, ButtonGroup } from '@ronuse/react-ui/core/buttons';
import { InputText, Checkbox } from '@ronuse/react-ui/core/form';
import { LinearLayout } from '@ronuse/react-ui/layouts';
import { Tag } from '@ronuse/react-ui/core/misc';
import { Scheme, Alignment, Orientation } from "@ronuse/react-ui/core/variables";
import { SchemeBuilder } from '../utils/generate_scheme_css.mjs';
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/mode-json";
import "ace-builds/src-noconflict/theme-xcode";

export class GenerateSchemePage extends React.Component {

    state = {
        name: 'new-scheme',
        baseColor: '#243447',
        textColor: 'white',
        altColors: [],
        disableSave: false,
        everythingIsImportant: true,
        embedSchemeOption: true,
        activeTabIndex: 0,
        rawCss: ""
    }

    constructor(props) {
        super(props);
        this.injectedStyleElement = null;
    }

    injectCss(generatedCss) {
        if (this.injectedStyleElement !== null) {
            document.getElementsByTagName('head')[0].removeChild(this.injectedStyleElement);
        }
        if (!generatedCss || generatedCss === "") {
            return;
        }
        this.injectedStyleElement = document.createElement('style');
        this.injectedStyleElement.type = 'text/css';
        this.injectedStyleElement.innerHTML = generatedCss;
        document.getElementsByTagName('head')[0].appendChild(this.injectedStyleElement);
    }

    renderPreviewComponents() {
        let customIcon1 = <img alt="ronuse-react-ui" src="https://avatars3.githubusercontent.com/u/14879387?s=16" style={{borderRadius:"50%"}}/>;
        
        return (
            <ScrollPanel scheme={this.state.name} style={{maxHeight: "70vh", padding: "20px"}} hideScrollBarX>
                <Button scheme={this.state.name} text="Click me"/>
                <Button scheme={this.state.name} text="Click me" fill/>
                <Button scheme={this.state.name} text="Click me" rounded/>
                <Button scheme={this.state.name} text="Click me" raised/>
                <Button scheme={this.state.name} text="Click me" outlined/>
                <Button scheme={this.state.name} text="Click me" textonly/>
                <Button scheme={this.state.name} text="Click me" raised textonly/>
                <br/><br/>

                <Button scheme={this.state.name} icon="fa fa-circle"/>
                <Button scheme={this.state.name} icon="fa fa-warning" rounded/>
                <Button scheme={this.state.name} icon="fa fa-square" outlined/>
                <Button scheme={this.state.name} icon="fa fa-bell" textonly raised/>
                <Button scheme={this.state.name} icon="fa fa-times" rounded textonly/>

                <Button scheme={this.state.name} icon={customIcon1}/>
                <Button scheme={this.state.name} icon="fa fa-facebook-square"/>
                <Button scheme={this.state.name} icon="fa fa-google" rounded outlined/>
                <Button scheme={this.state.name} icon="fa fa-instagram"/>
                <Button scheme={this.state.name} icon="fa fa-twitter" textonly raised/>
                <Button scheme={this.state.name} icon="fa fa-linkedin"/>
                <Button scheme={this.state.name} icon="fa fa-skype"/>
                <br/><br/>

                <ButtonGroup scheme={this.state.name}>
                    <Button icon="fa fa-folder-open" text="Open"/>
                    <Button icon="fa fa-times" text="Close"/>
                    <Button icon="fa fa-sign-out" text="Exit"/>
                </ButtonGroup>
                <br/><br/>

                <TabPane>
                    <TabPanel scheme={this.state.name} title="Panel 1"></TabPanel>
                    <TabPanel scheme={this.state.name} title="Panel 2"></TabPanel>
                    <TabPanel scheme={this.state.name} title="Panel 3"></TabPanel>
                    <TabPanel scheme={this.state.name} title="Panel 4"></TabPanel>
                </TabPane>

                <Fieldset scheme={this.state.name} legend="Header" expanded collapsible>
                    {"Hello World"}
                </Fieldset>
                <br/><br/>

                <Accordion scheme={this.state.name} >
                    <AccordionPanel title={<React.Fragment><i class="fa fa-user-o r-r-margin-right-5px"/>User</React.Fragment>}>
                        {"Panel 1"}
                    </AccordionPanel>
                    <AccordionPanel title={<React.Fragment><i class="fa fa-gear r-r-margin-right-5px"/>Settings</React.Fragment>}>
                        {"Panel 2"}
                    </AccordionPanel>
                    <AccordionPanel title={<React.Fragment><i class="fa fa-search r-r-margin-right-5px"/>Search Profiles<i class="fa fa-eye r-r-margin-left-5px"/></React.Fragment>}>
                         {"Panel 3"}
                    </AccordionPanel>
                </Accordion>
                <br/><br/>

                <InputText scheme={this.state.name} placeholder="Enter you text here"/>
                <InputText style={{marginLeft:"20px"}} scheme={this.state.name} placeholder="Enter you text here" flushed/>
                <br/><br/>

                <Checkbox scheme={this.state.name} label="Check box" checked/>
                <br/><br/>

                <Tag scheme={this.state.name} icon="fa fa-exclamation" text="Stateless" removable/>
                <Tag scheme={this.state.name} icon="fa fa-circle" text="Primary" outlined/>
                <Tag scheme={this.state.name} icon="fa fa-square" text="Secondary" rounded/>
                <Tag scheme={this.state.name} icon="fa fa-bell" text="Info" textonly outlined/>
                <Tag scheme={this.state.name} icon="fa fa-warning" text="Warning" raised textonly/>
                <br/><br/>

            </ScrollPanel>
        )
    }

    buildAlternateColorPanels(alternateColors) {
        let alternateColorsView = [];

        for (let index = 0; index < alternateColors.length; index++) {
            let alternateColor = alternateColors[index]
            alternateColor.index = index;
            alternateColorsView.push(
            <Panel title={
                    <React.Fragment>
                        <i className="fa fa-times" style={{color: "red", cursor: "pointer"}} onClick={(e) => { 
                            alternateColors.splice(alternateColor.index, 1);
                            this.setState(this.state);
                         }}/>
                        <span style={{marginLeft: "10px"}}>{alternateColor.name}</span>
                    </React.Fragment>
                } collapsible expanded style={{marginLeft: "20px"}}>
                <InputText style={{flex: 1}} scheme={Scheme.PRIMARY} defaultValue={alternateColor.name} label="Name" alignLabel={Alignment.TOP} onChange={(e) => {
                    this.state.altColors[alternateColor.index].name = e.target.value;
                    this.setState({
                        altColors: this.state.altColors
                    })
                }}/>
                <InputText style={{flex: 1}} scheme={Scheme.PRIMARY} label="Color Value" alignLabel={Alignment.TOP}
                    leftIcon={<span style={{color: alternateColor.value}} className="fa fa-circle"/>}
                    defaultValue={alternateColor.value} onChange={(e)=> {
                    this.state.altColors[alternateColor.index].value = e.target.value;
                    this.setState({
                        altColors: this.state.altColors
                    })
                }}/>
                <Checkbox scheme={Scheme.PRIMARY} 
                    label="Generate supplement styles" checked={alternateColor.generateSupplement} 
                    onChange={e => {
                        this.state.altColors[alternateColor.index].generateSupplement = e.checked;
                        this.setState({
                            altColors: this.state.altColors
                        })
                }}/>
            </Panel>)
        }
        return alternateColorsView;
    }

    render() {
        const generatedCss = SchemeBuilder.generateSchemeCss(this.state);
        this.injectCss(generatedCss);
        const alternateColorsView = this.buildAlternateColorPanels(this.state.altColors);

        return (
            <div className="r-r-showcase-component-page" style={{backgroundColor: "white"}}>
                <h1>Scheme Builder</h1>
                <LinearLayout padding={20}>
                    <Panel style={{flex: 0.4}}>
                        <LinearLayout padding={20}>
                            <InputText style={{flex: 1}} scheme={Scheme.PRIMARY} defaultValue={this.state.name} label="Scheme name" alignLabel={Alignment.TOP} onChange={(e) => {
                                this.setState({
                                    name: e.target.value
                                })
                            }}/>
                        </LinearLayout>
                        <LinearLayout padding={20}>
                            <InputText style={{flex: 1}} scheme={Scheme.PRIMARY} label="Base color" alignLabel={Alignment.TOP}
                                leftIcon={<span style={{color: this.state.baseColor}} className="fa fa-circle"/>}
                                defaultValue={this.state.baseColor} onChange={(e)=>{
                                this.setState({
                                    baseColor: e.target.value
                                })
                            }}/>

                            <InputText style={{flex: 1}} scheme={Scheme.PRIMARY} label="Text color" alignLabel={Alignment.TOP}
                                leftIcon={<span style={{color: this.state.textColor}} className="fa fa-circle"/>}
                                defaultValue={this.state.textColor} onChange={(e)=>{
                                this.setState({
                                    textColor: e.target.value
                                });
                            }}/>
                        </LinearLayout>

                        <LinearLayout orientation={Orientation.VERTICAL}>
                            <Checkbox scheme={Scheme.PRIMARY} style={{marginLeft: "20px"}}
                                label="Add scheme option in css" checked={this.state.embedSchemeOption} 
                                onChange={e => {
                                    this.setState({ 
                                        embedSchemeOption: e.checked 
                                    })
                            }}/>
                            <Checkbox scheme={Scheme.PRIMARY} style={{marginLeft: "20px"}}
                                label="Make everything important" checked={this.state.everythingIsImportant} 
                                onChange={e => {
                                    this.setState({ 
                                        everythingIsImportant: e.checked 
                                    })
                            }}/>
                            <Button text="Load Existing Scheme Options" scheme={Scheme.SUCCESS} disabled={this.state.disableSave}   style={{marginLeft: "20px"}} 
                                onClick={(e) => {
                                    let state = prompt("Show dialog to accept the option text");
                                    this.setState(JSON.parse(state))
                            }}/>
                            <Button text="Add Alternative Color" scheme={Scheme.SUCCESS} disabled={this.state.disableSave} style={{marginLeft: "20px"}} 
                                onClick={(e) => {
                                    this.state.altColors.push({
                                        index: this.state.altColors.length,
                                        name: "alt-color-" + this.state.altColors.length,
                                        value: "green",
                                        generateSupplement: false
                                    });
                                    this.setState({ 
                                        altColors: this.state.altColors
                                    })
                            }}/>
                            Raw Css
                            <textarea defaultValue={this.state.rawCss} onChange={(e) => {
                                this.setState({ 
                                    rawCss: e.target.value
                                })
                            }}>

                            </textarea>
                            {alternateColorsView}
                        </LinearLayout>
                    </Panel>
                    <Panel style={{flex: 1}}>
                        <TabPane activeTabIndex={this.state.activeTabIndex} onTabChange={(e) => this.setState({ activeTabIndex: e.index })} renderActiveTabOnly>
                            <TabPanel title="Component Preview" icon="fa fa-eye">
                                {this.renderPreviewComponents()}
                            </TabPanel>
                            <TabPanel title="Generated CSS" icon="fa fa-book">
                                <AceEditor ref={(el) => this.cssEditor = el}
                                    style={{width: "100%"}}
                                    mode="css"
                                    theme="xcode"
                                    name="generated-css-content"
                                    value={generatedCss}
                                    editorProps={{ $blockScrolling: true }}
                                />
                            </TabPanel>
                            <TabPanel title="Scheme Options" icon="fa fa-book">
                                <AceEditor ref={(el) => this.cssEditor = el}
                                    style={{width: "100%"}}
                                    mode="json"
                                    theme="xcode"
                                    name="generated-scheme-state"
                                    value={JSON.stringify(this.state, null, "\t")}
                                    editorProps={{ $blockScrolling: true }}
                                />
                            </TabPanel>
                        </TabPane>
                    </Panel>
                </LinearLayout>

            </div>
        )
    }

}