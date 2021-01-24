
import React from "react";
import { Panel, TabPane, TabPanel, Fieldset, Accordion, AccordionPanel } from '@ronuse/react-ui/core/panels';
import { Button, ButtonGroup } from '@ronuse/react-ui/core/buttons';
import { InputText, Checkbox } from '@ronuse/react-ui/core/form';
import { Tag } from '@ronuse/react-ui/core/misc';
import { Scheme, Alignment } from "@ronuse/react-ui/core/variables/Stylers";
import { SchemeBuilder } from '../utils/generate_scheme_css.mjs';
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-css";
import "ace-builds/src-noconflict/theme-xcode";

export class GenerateSchemePage extends React.Component {

    state = {
        name: 'expostudy-blacky',
        baseColor: '#F5F8FA',
        textColor: '#293742',
        disableSave: false,
        generatedCss: "",
        everythingIsImportant: true,
        activeTabIndex: 0
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
            <React.Fragment>
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

            </React.Fragment>
        )
    }

    render() {
        this.injectCss(this.state.generatedCss);

        return (
            <div className="r-r-showcase-component-page">
                <h1>Scheme Builder</h1>
                
                <Panel className="r-r-padding-left-right-20px">
                    <InputText scheme={Scheme.PRIMARY} defaultValue={this.state.name}  label="Scheme name"alignLabel={Alignment.TOP}/>
                    <br/><br/>

                    <InputText scheme={Scheme.PRIMARY} label="Base color" alignLabel={Alignment.TOP}
                        defaultValue={this.state.baseColor}
                        onChange={(e)=>{
                            this.setState({
                                baseColor: e.target.value,
                                generatedCss: SchemeBuilder.generateSchemeCss(this.state.name, e.target.value, this.state.textColor, this.state.everythingIsImportant)
                            })
                        }}
                        leftIcon={<span style={{color: this.state.baseColor}} className="fa fa-circle"/>}/>
                    <br/><br/>

                    <InputText scheme={Scheme.PRIMARY} label="Text color" alignLabel={Alignment.TOP}
                        defaultValue={this.state.textColor}
                        onChange={(e)=>{
                            this.setState({
                                textColor: e.target.value,
                                generatedCss: SchemeBuilder.generateSchemeCss(this.state.name, this.state.baseColor, e.target.value, this.state.everythingIsImportant)
                            }); 
                        }}
                        leftIcon={<span style={{color: this.state.textColor}} className="fa fa-circle"/>}/>
                    <br/><br/>

                    <Checkbox scheme={Scheme.PRIMARY} 
                                label="Make everything important" checked={this.state.everythingIsImportant} 
                                onChange={e => this.setState({ everythingIsImportant: e.checked })}/>
                    <br/><br/>

                    {/*<Button text="Generate CSS" scheme={Scheme.SUCCESS} 
                        onClick={(e) => {
                            this.setState({
                                disableSave: false,
                                generatedCss: generateSchemeCss(this.state.name, this.state.baseColor, e.target.value, this.state.everythingIsImportant)
                            })
                        }}/> */}
                    <Button text="Copy Generated CSS" scheme={Scheme.SUCCESS} disabled={this.state.disableSave} 
                        onClick={(e) => {

                        }}/>
                    <Button text="Save Generated CSS" scheme={Scheme.SUCCESS} disabled={this.state.disableSave} 
                        onClick={(e) => {
                            
                        }}/>
                    <br/><br/>

                    <TabPane activeTabIndex={this.state.activeTabIndex} onTabChange={(e) => this.setState({ activeTabIndex: e.index })} renderActiveTabOnly>
                        <TabPanel title="Component Preview" icon="fa fa-eye">
                            {this.renderPreviewComponents()}
                        </TabPanel>
                        <TabPanel title="Generated CSS" icon="fa fa-book">
                            <AceEditor
                                style={{width: "100%"}}
                                mode="css"
                                theme="xcode"
                                name="generated-css-content"
                                value={this.state.generatedCss}
                                editorProps={{ $blockScrolling: true }}
                            />
                        </TabPanel>
                    </TabPane>
                </Panel>

            </div>
        )
    }

}