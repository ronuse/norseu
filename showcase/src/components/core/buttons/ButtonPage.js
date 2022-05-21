
import { Button } from "norseu/core/buttons";
import { Accordion, AccordionPanel, Panel } from "norseu/core/panels";
import { Alignment, Elevation, Scheme } from "norseu/core/variables";
import React from "react"
import { StyleCreator } from "norseu/utils";
import { buildComponentPage, copyToClipboard, getSourceInEditorR } from "../../../utils/helpers";

export class ButtonPage extends React.Component {

    state = { pageSource: '', showSourceDialog: false }
    cssMap = [

    ];
    properties = [
        { name: "text", type: "string", default: "", description: "The label to show in the button" },
        { name: "alignText", type: <a href='/p/components/core/variables/alignment'>Alignment</a>, default: <a href='/p/components/core/variables/alignment#center'>Alignment.CENTER</a>, description: "The label alignment if text specified" },
        { name: "icon", type: "string|element", default: "", description: "Button icon, can be Font Awesome icon class name or valid react element" },
        { name: "alignIcon", type: <a href='/p/components/core/variables/alignment'>Alignment</a>, default: <a href='/p/components/core/variables/alignment#left'>Alignment.LEFT</a>, description: "The button icon position" },
        { name: "rightIcon", type: "string|element", default: "", description: "Button right icon, can be Font Awesome icon class name or valid react element" },
        //{ name: "tooltip", type: "string", default: "", description: "The label to show in the button" },
        //{ name: "tooltipProps", type: "object", default: "{}", description: "The label to show in the button" },
        { name: "scheme", type: <a href='/p/components/core/variables/scheme'>Scheme</a>, default: "null", description: "Set the button appearance according to scheme" },
        { name: "link", type: "string", default: "null", description: "If set to true the element will render as a link (a)" },
        { name: "raised", type: "boolean", default: "false", description: "Add shadow to the button for raise effect" },
        { name: "rounded", type: "boolean", default: "false", description: "Make the button perfectly round" },
        { name: "borderless", type: "boolean", default: "false", description: "Remove the button border" },
        { name: "textOnly", type: "boolean", default: "false", description: "Remove the button border and the fill effect" },
        { name: "outlined", type: "boolean", default: "false", description: "Remove the fill effect" },
        { name: "fill", type: "boolean", default: "false", description: "Make the button width match the parent width" },
        { name: "nostyle", type: "boolean", default: "false", description: "Only render the button element without any css/style property" },
        { name: "fillIcon", type: "boolean", default: "false", description: "Make the button size match the specified icon" },
        { name: "fillOnHover", type: "boolean", default: "false", description: "if the button is outlined, fill the button background color on cursor hover" },
    ];

    constructor(props) {
        super(props)
        this.previewPanels = React.createRef();
        this.previewPanels.current = [];
    }

    componentDidMount() {
        console.log("COMPONENT", this.previewPanels, this.accOne)
    }

    buildDocumentation() {
        let customIcon1 = <img alt="ronuse-react-ui" src="https://avatars3.githubusercontent.com/u/14879387?s=16" style={{borderRadius:"50%"}}/>;
        let customIcon2 = <img alt="ronuse-react-ui" src="https://avatars3.githubusercontent.com/u/69908664?s=16" style={{borderRadius:"50%"}}/>;
        let customIcon3 = <img alt="ronuse-react-ui" src="https://avatars3.githubusercontent.com/u/14879387?s=100"/>;

        return (
            <React.Fragment>
                <Panel borderless style={{ marginTop: 40 }}>
                    <span className="norseu-showcase-component-page-preview-title">Basic</span>
                    <Accordion borderless multiple activeIndex={[0]} ref={this.accOne}>
                        <AccordionPanel noheader nodivier className="norseu-showcase-component-page-preview">
                            <Button text="Click Me" />
                            <Button icon="fa fa-user-circle" text="View Profile" />
                            <Button icon={customIcon1} text="Custom Icon" />
                            <Button rightIcon={customIcon2} text="RIght Custom Icon" />
                            <Button icon="fa fa-pencil" text="Edit" alignIcon={Alignment.RIGHT} />
                            <Button icon="fa fa-user-circle" rightIcon="fa fa-arrow-right" text="Update Profile" />
                            <Button icon="fa fa-user-circle" rightIcon="fa fa-arrow-right" text="Update Profile" alignIcon={Alignment.RIGHT} />
                            <Button icon="fa fa-user-circle" text="Disabled" disabled/>
                            <Button scheme={Scheme.PRIMARY} rightIcon="fa fa-external-link-alt" text="Link" href="https://github.com/ronuse/ronuse-react-ui" link/>
                            
                            <div className="norseu-showcase-component-page-preview-buttons">
                                <i className="fa fa-code" onClick={(e) => this.previewPanels.current[0].toggle()}></i>
                                <i className="fa fa-copy" onClick={(e) => {copyToClipboard(this.state.pageSource, [[57, 65]])}}></i>
                            </div>
                        </AccordionPanel>
                        {getSourceInEditorR(this.state.pageSource, (ref) => this.previewPanels.current[0] = ref, [[57, 65]])}
                    </Accordion>
                </Panel>

                <Panel borderless style={{ marginTop: 40 }}>
                    <span className="norseu-showcase-component-page-preview-title">Schemes</span>
                    <Accordion borderless multiple activeIndex={[0]}>
                        <AccordionPanel noheader nodivier className="norseu-showcase-component-page-preview">
                            <p class="documentation-p">
                                The appearance of a button can be customized according to a scheme. The schem property can be null or any of 
                                the supoorted <a href="/p/components/core/variables/scheme">scheme</a>. 
                                If the available scheme does not satisfy your need you can create a scheme on the <a href="/p/theming/schemedesigner">Scheme Designer</a>.
                            </p>
                            <Button scheme={Scheme.SKELETON} text="Skeleton" />
                            <Button scheme={Scheme.STATELESS} text="Stateless"/>
                            <Button scheme={Scheme.PRIMARY} text="Primary"/>
                            <Button scheme={Scheme.SECONDARY} text="Secondary"/>
                            <Button scheme={Scheme.SUCCESS} text="Success"/>
                            <Button scheme={Scheme.INFO} text="Info"/>
                            <Button scheme={Scheme.WARNING} text="Warning"/>
                            <Button scheme={Scheme.DANGER} text="Danger"/>
                            <Button scheme={Scheme.DARK} text="Dark"/>
                            <Button scheme={Scheme.LIGHT} text="Light"/>
                            
                            <div className="norseu-showcase-component-page-preview-buttons">
                                <i className="fa fa-code" onClick={(e) => this.previewPanels.current[1].toggle()}></i>
                                <i className="fa fa-copy" onClick={(e) => {copyToClipboard(this.state.pageSource, [[85, 94]])}}></i>
                            </div>
                        </AccordionPanel>
                        {getSourceInEditorR(this.state.pageSource, (ref) => this.previewPanels.current[1] = ref, [[85, 94]])}
                    </Accordion>
                </Panel>

                <Panel borderless style={{ marginTop: 40 }}>
                    <span className="norseu-showcase-component-page-preview-title">Disabled</span>
                    <Accordion borderless multiple activeIndex={[0]}>
                        <AccordionPanel noheader nodivier className="norseu-showcase-component-page-preview">
                            <p class="documentation-p">
                                Button can be put in a disabled state, which will prevent it from receiving any pointer-events.
                            </p>
                            <Button scheme={Scheme.SKELETON} text="Skeleton" disabled/>
                            <Button scheme={Scheme.STATELESS} text="Stateless" disabled/>
                            <Button scheme={Scheme.PRIMARY} text="Primary" disabled/>
                            <Button scheme={Scheme.SECONDARY} text="Secondary" disabled/>
                            <Button scheme={Scheme.SUCCESS} text="Success" disabled/>
                            <Button scheme={Scheme.INFO} text="Info" disabled/>
                            <Button scheme={Scheme.WARNING} text="Warning" disabled/>
                            <Button scheme={Scheme.DANGER} text="Danger" disabled/>
                            <Button scheme={Scheme.DARK} text="Dark" disabled/>
                            <Button scheme={Scheme.LIGHT} text="Light" disabled/>
                            
                            <div className="norseu-showcase-component-page-preview-buttons">
                                <i className="fa fa-code" onClick={(e) => this.previewPanels.current[2].toggle()}></i>
                                <i className="fa fa-copy" onClick={(e) => {copyToClipboard(this.state.pageSource, [[112, 121]])}}></i>
                            </div>
                        </AccordionPanel>
                        {getSourceInEditorR(this.state.pageSource, (ref) => this.previewPanels.current[2] = ref, [[112, 121]])}
                    </Accordion>
                </Panel>

                <Panel borderless style={{ marginTop: 40 }}>
                    <span className="norseu-showcase-component-page-preview-title">Fill Button With Icon Alignments</span>
                    <Accordion borderless multiple activeIndex={[0]}>
                        <AccordionPanel noheader nodivier className="norseu-showcase-component-page-preview">
                            <p class="documentation-p"></p>
                            <Button text="Click Me" alignText={Alignment.CENTER} fill/>
                            <Button scheme={Scheme.SKELETON} fill/>
                            <Button scheme={Scheme.STATELESS} alignText={Alignment.LEFT} rightIcon="fa fa-exclamation" text="Stateless" fill/>
                            <Button scheme={Scheme.PRIMARY} alignText={Alignment.RIGHT} rightIcon="fa fa-circle" text="Primary" fill/>
                            <Button scheme={Scheme.SECONDARY} alignText={Alignment.LEFT} rightIcon="fa fa-square" text="Secondary" fill/>
                            <Button scheme={Scheme.SUCCESS} alignText={Alignment.CENTER} icon="fa fa-check" alignIcon={Alignment.LEFT} rightIcon="fa fa-check" text="Success" fill/>
                            <Button scheme={Scheme.INFO} alignText={Alignment.RIGHT} icon="fa fa-bell" alignIcon={Alignment.RIGHT}  rightIcon="fa fa-bell" text="Info" fill/>
                            <Button scheme={Scheme.WARNING} alignText={Alignment.LEFT} icon="fa fa-info" alignIcon={Alignment.LEFT} rightIcon="fa fa-info" text="Warning" fill/>
                            <Button scheme={Scheme.DANGER} alignText={Alignment.RIGHT} icon="fa fa-times" alignIcon={Alignment.LEFT} rightIcon="fa fa-times" text="Danger" fill/>
                            <Button scheme={Scheme.DARK} alignText={Alignment.RIGHT} icon="fa fa-circle" alignIcon={Alignment.LEFT} rightIcon="fa fa-times" text="Dark" fill/>
                            <Button scheme={Scheme.LIGHT} alignText={Alignment.RIGHT} icon="fa fa-circle" alignIcon={Alignment.LEFT} rightIcon="fa fa-times" text="Light" fill/>
                            
                            <div className="norseu-showcase-component-page-preview-buttons">
                                <i className="fa fa-code" onClick={(e) => this.previewPanels.current[3].toggle()}></i>
                                <i className="fa fa-copy" onClick={(e) => {copyToClipboard(this.state.pageSource, [[137, 147]])}}></i>
                            </div>
                        </AccordionPanel>
                        {getSourceInEditorR(this.state.pageSource, (ref) => this.previewPanels.current[3] = ref, [[137, 147]])}
                    </Accordion>
                </Panel>

                <Panel borderless style={{ marginTop: 40 }}>
                    <span className="norseu-showcase-component-page-preview-title">Rounded Buttons</span>
                    <Accordion borderless multiple activeIndex={[0]}>
                        <AccordionPanel noheader nodivier className="norseu-showcase-component-page-preview">
                            <p class="documentation-p"></p>
                            <Button text="Click Me" rounded/>
                            <Button scheme={Scheme.SKELETON} rounded/>
                            <Button scheme={Scheme.STATELESS} icon="fa fa-exclamation" text="Stateless" rounded/>
                            <Button scheme={Scheme.PRIMARY} icon="fa fa-circle" text="Primary" rounded/>
                            <Button scheme={Scheme.SECONDARY} icon="fa fa-square" text="Secondary" rounded/>
                            <Button scheme={Scheme.SUCCESS} icon="fa fa-check" text="Success" rounded/>
                            <Button scheme={Scheme.INFO} icon="fa fa-bell" text="Info" rounded/>
                            <Button scheme={Scheme.WARNING} icon="fa fa-info" text="Warning" rounded/>
                            <Button scheme={Scheme.DANGER} icon="fa fa-times" text="Danger" rounded/>
                            <Button scheme={Scheme.DARK} icon="fa fa-circle" text="Dark" rounded/>
                            <Button scheme={Scheme.LIGHT} icon="fa fa-circle" text="Light" rounded/>
                            
                            <div className="norseu-showcase-component-page-preview-buttons">
                                <i className="fa fa-code" onClick={(e) => this.previewPanels.current[4].toggle()}></i>
                                <i className="fa fa-copy" onClick={(e) => {copyToClipboard(this.state.pageSource, [[163, 173]])}}></i>
                            </div>
                        </AccordionPanel>
                        {getSourceInEditorR(this.state.pageSource, (ref) => this.previewPanels.current[4] = ref, [[163, 173]])}
                    </Accordion>
                </Panel>

                <Panel borderless style={{ marginTop: 40 }}>
                    <span className="norseu-showcase-component-page-preview-title">Raised Buttons</span>
                    <Accordion borderless multiple activeIndex={[0]}>
                        <AccordionPanel noheader nodivier className="norseu-showcase-component-page-preview">
                            <p class="documentation-p"></p>
                            <Button text="Click Me" raised/>
                            <Button scheme={Scheme.SKELETON} raised/>
                            <Button scheme={Scheme.STATELESS} icon="fa fa-exclamation" text="Stateless" raised/>
                            <Button scheme={Scheme.PRIMARY} icon="fa fa-circle" text="Primary" raised/>
                            <Button scheme={Scheme.SECONDARY} icon="fa fa-square" text="Secondary" raised/>
                            <Button scheme={Scheme.SUCCESS} icon="fa fa-check" text="Success" raised/>
                            <Button scheme={Scheme.INFO} icon="fa fa-bell" text="Info" raised/>
                            <Button scheme={Scheme.WARNING} icon="fa fa-info" text="Warning" raised/>
                            <Button scheme={Scheme.DANGER} icon="fa fa-times" text="Danger" raised/>
                            <Button scheme={Scheme.DARK} icon="fa fa-circle" text="Dark" raised/>
                            <Button scheme={Scheme.LIGHT} icon="fa fa-circle" text="Light" raised/>
                            
                            <div className="norseu-showcase-component-page-preview-buttons">
                                <i className="fa fa-code" onClick={(e) => this.previewPanels.current[5].toggle()}></i>
                                <i className="fa fa-copy" onClick={(e) => {copyToClipboard(this.state.pageSource, [[189, 199]])}}></i>
                            </div>
                        </AccordionPanel>
                        {getSourceInEditorR(this.state.pageSource, (ref) => this.previewPanels.current[5] = ref, [[189, 199]])}
                    </Accordion>
                </Panel>

                <Panel borderless style={{ marginTop: 40 }}>
                    <span className="norseu-showcase-component-page-preview-title">Outlined Buttons</span>
                    <Accordion borderless multiple activeIndex={[0]}>
                        <AccordionPanel noheader nodivier className="norseu-showcase-component-page-preview">
                            <p class="documentation-p"></p>
                            <Button text="Click Me" outlined/>
                            <Button scheme={Scheme.SKELETON} outlined/>
                            <Button scheme={Scheme.STATELESS} icon="fa fa-exclamation" text="Stateless" outlined/>
                            <Button scheme={Scheme.PRIMARY} icon="fa fa-circle" text="Primary" outlined/>
                            <Button scheme={Scheme.SECONDARY} icon="fa fa-square" text="Secondary" outlined/>
                            <Button scheme={Scheme.SUCCESS} icon="fa fa-check" text="Success" outlined/>
                            <Button scheme={Scheme.INFO} icon="fa fa-bell" text="Info" outlined/>
                            <Button scheme={Scheme.WARNING} icon="fa fa-info" text="Warning" outlined/>
                            <Button scheme={Scheme.DANGER} icon="fa fa-times" text="Danger" outlined/>
                            <Button scheme={Scheme.DARK} icon="fa fa-circle" text="Dark" outlined/>
                            <Button scheme={Scheme.LIGHT} icon="fa fa-circle" text="Light" outlined/>
                            
                            <div className="norseu-showcase-component-page-preview-buttons">
                                <i className="fa fa-code" onClick={(e) => this.previewPanels.current[6].toggle()}></i>
                                <i className="fa fa-copy" onClick={(e) => {copyToClipboard(this.state.pageSource, [[215, 225]])}}></i>
                            </div>
                        </AccordionPanel>
                        {getSourceInEditorR(this.state.pageSource, (ref) => this.previewPanels.current[6] = ref, [[215, 225]])}
                    </Accordion>
                </Panel>

                <Panel borderless style={{ marginTop: 40 }}>
                    <span className="norseu-showcase-component-page-preview-title">Outlined With Over Filled Buttons</span>
                    <Accordion borderless multiple activeIndex={[0]}>
                        <AccordionPanel noheader nodivier className="norseu-showcase-component-page-preview">
                            <p class="documentation-p"></p>
                            <Button text="Click Me" outlined fillOnHover/>
                            <Button scheme={Scheme.SKELETON} outlined fillOnHover/>
                            <Button scheme={Scheme.STATELESS} icon="fa fa-exclamation" text="Stateless" outlined fillOnHover/>
                            <Button scheme={Scheme.PRIMARY} icon="fa fa-circle" text="Primary" outlined fillOnHover/>
                            <Button scheme={Scheme.SECONDARY} icon="fa fa-square" text="Secondary" outlined fillOnHover/>
                            <Button scheme={Scheme.SUCCESS} icon="fa fa-check" text="Success" outlined fillOnHover/>
                            <Button scheme={Scheme.INFO} icon="fa fa-bell" text="Info" outlined fillOnHover/>
                            <Button scheme={Scheme.WARNING} icon="fa fa-info" text="Warning" outlined fillOnHover/>
                            <Button scheme={Scheme.DANGER} icon="fa fa-times" text="Danger" outlined fillOnHover/>
                            <Button scheme={Scheme.DARK} icon="fa fa-circle" text="Dark" outlined fillOnHover/>
                            <Button scheme={Scheme.LIGHT} icon="fa fa-circle" text="Light" outlined fillOnHover/>
                            
                            <div className="norseu-showcase-component-page-preview-buttons">
                                <i className="fa fa-code" onClick={(e) => this.previewPanels.current[7].toggle()}></i>
                                <i className="fa fa-copy" onClick={(e) => {copyToClipboard(this.state.pageSource, [[241, 251]])}}></i>
                            </div>
                        </AccordionPanel>
                        {getSourceInEditorR(this.state.pageSource, (ref) => this.previewPanels.current[7] = ref, [[241, 251]])}
                    </Accordion>
                </Panel>

                <Panel borderless style={{ marginTop: 40 }}>
                    <span className="norseu-showcase-component-page-preview-title">Text Only</span>
                    <Accordion borderless multiple activeIndex={[0]}>
                        <AccordionPanel noheader nodivier className="norseu-showcase-component-page-preview">
                            <p class="documentation-p"></p>
                            <Button text="Click Me" textOnly/>
                            <Button scheme={Scheme.SKELETON} textOnly/>
                            <Button scheme={Scheme.STATELESS} icon="fa fa-exclamation" text="Stateless" textOnly/>
                            <Button scheme={Scheme.PRIMARY} icon="fa fa-circle" text="Primary" textOnly/>
                            <Button scheme={Scheme.SECONDARY} icon="fa fa-square" text="Secondary" textOnly/>
                            <Button scheme={Scheme.SUCCESS} icon="fa fa-check" text="Success" textOnly/>
                            <Button scheme={Scheme.INFO} icon="fa fa-bell" text="Info" textOnly/>
                            <Button scheme={Scheme.WARNING} icon="fa fa-info" text="Warning" textOnly/>
                            <Button scheme={Scheme.DANGER} icon="fa fa-times" text="Danger" textOnly/>
                            <Button scheme={Scheme.DARK} icon="fa fa-circle" text="Dark" textOnly/>
                            <Button scheme={Scheme.LIGHT} icon="fa fa-circle" text="Light" textOnly/>
                            
                            <div className="norseu-showcase-component-page-preview-buttons">
                                <i className="fa fa-code" onClick={(e) => this.previewPanels.current[8].toggle()}></i>
                                <i className="fa fa-copy" onClick={(e) => {copyToClipboard(this.state.pageSource, [[267, 277]])}}></i>
                            </div>
                        </AccordionPanel>
                        {getSourceInEditorR(this.state.pageSource, (ref) => this.previewPanels.current[8] = ref, [[267, 277]])}
                    </Accordion>
                </Panel>

                <Panel borderless style={{ marginTop: 40 }}>
                    <span className="norseu-showcase-component-page-preview-title">Raised Text Only Buttons</span>
                    <Accordion borderless multiple activeIndex={[0]}>
                        <AccordionPanel noheader nodivier className="norseu-showcase-component-page-preview">
                            <p class="documentation-p"></p>
                            <Button text="Click Me" textOnly raised/>
                            <Button scheme={Scheme.SKELETON} textOnly raised/>
                            <Button scheme={Scheme.STATELESS} icon="fa fa-exclamation" text="Stateless" textOnly raised/>
                            <Button scheme={Scheme.PRIMARY} icon="fa fa-circle" text="Primary" textOnly raised/>
                            <Button scheme={Scheme.SECONDARY} icon="fa fa-square" text="Secondary" textOnly raised/>
                            <Button scheme={Scheme.SUCCESS} icon="fa fa-check" text="Success" textOnly raised/>
                            <Button scheme={Scheme.INFO} icon="fa fa-bell" text="Info" textOnly raised/>
                            <Button scheme={Scheme.WARNING} icon="fa fa-info" text="Warning" textOnly raised/>
                            <Button scheme={Scheme.DANGER} icon="fa fa-times" text="Danger" textOnly raised/>
                            <Button scheme={Scheme.DARK} icon="fa fa-circle" text="Dark" textOnly raised/>
                            <Button scheme={Scheme.LIGHT} icon="fa fa-circle" text="Light" textOnly raised/>
                            
                            <div className="norseu-showcase-component-page-preview-buttons">
                                <i className="fa fa-code" onClick={(e) => this.previewPanels.current[9].toggle()}></i>
                                <i className="fa fa-copy" onClick={(e) => {copyToClipboard(this.state.pageSource, [[293, 303]])}}></i>
                            </div>
                        </AccordionPanel>
                        {getSourceInEditorR(this.state.pageSource, (ref) => this.previewPanels.current[9] = ref, [[293, 303]])}
                    </Accordion>
                </Panel>

                <Panel borderless style={{ marginTop: 40 }}>
                    <span className="norseu-showcase-component-page-preview-title">Icon Button</span>
                    <Accordion borderless multiple activeIndex={[0]}>
                        <AccordionPanel noheader nodivier className="norseu-showcase-component-page-preview">
                            <p class="documentation-p"></p>
                            <Button icon="fa fa-user-circle" />
                            <Button scheme={Scheme.SKELETON} icon="fa fa-user" />
                            <Button scheme={Scheme.PRIMARY} icon="fa fa-circle"/>
                            <Button scheme={Scheme.SECONDARY} icon="fa fa-square"/>
                            <Button scheme={Scheme.SUCCESS} icon="fa fa-check"/>
                            <Button scheme={Scheme.INFO} icon="fa fa-bell"/>
                            <Button scheme={Scheme.WARNING} icon="fa fa-info"/>
                            <Button scheme={Scheme.DANGER} icon="fa fa-times"/>
                            <Button scheme={Scheme.DARK} icon="fa fa-times"/>
                            <Button scheme={Scheme.LIGHT} icon="fa fa-times"/>
                            
                            <div className="norseu-showcase-component-page-preview-buttons">
                                <i className="fa fa-code" onClick={(e) => this.previewPanels.current[10].toggle()}></i>
                                <i className="fa fa-copy" onClick={(e) => {copyToClipboard(this.state.pageSource, [[319, 328]])}}></i>
                            </div>
                        </AccordionPanel>
                        {getSourceInEditorR(this.state.pageSource, (ref) => this.previewPanels.current[10] = ref, [[319, 328]])}
                    </Accordion>
                </Panel>

                <Panel borderless style={{ marginTop: 40 }}>
                    <span className="norseu-showcase-component-page-preview-title">Round Icon Button</span>
                    <Accordion borderless multiple activeIndex={[0]}>
                        <AccordionPanel noheader nodivier className="norseu-showcase-component-page-preview">
                            <p class="documentation-p"></p>
                            <Button icon="fa fa-user-circle" rounded/>
                            <Button icon={customIcon3} style={{width:"37px",height:"35px"}} fillIcon rounded/>
                            <Button scheme={Scheme.SKELETON} icon="fa fa-user" rounded/>
                            <Button scheme={Scheme.PRIMARY} icon="fa fa-circle" rounded/>
                            <Button scheme={Scheme.SECONDARY} icon="fa fa-square" rounded/>
                            <Button scheme={Scheme.SUCCESS} icon="fa fa-check" rounded/>
                            <Button scheme={Scheme.INFO} icon="fa fa-bell" rounded/>
                            <Button scheme={Scheme.WARNING} icon="fa fa-info" rounded/>
                            <Button scheme={Scheme.DANGER} icon="fa fa-times" rounded/>
                            <Button scheme={Scheme.DARK} icon="fa fa-times" rounded/>
                            <Button scheme={Scheme.LIGHT} icon="fa fa-times" rounded/>
                            
                            <div className="norseu-showcase-component-page-preview-buttons">
                                <i className="fa fa-code" onClick={(e) => this.previewPanels.current[11].toggle()}></i>
                                <i className="fa fa-copy" onClick={(e) => {copyToClipboard(this.state.pageSource, [[344, 354]])}}></i>
                            </div>
                        </AccordionPanel>
                        {getSourceInEditorR(this.state.pageSource, (ref) => this.previewPanels.current[11] = ref, [[344, 354]])}
                    </Accordion>
                </Panel>

                <Panel borderless style={{ marginTop: 40 }}>
                    <span className="norseu-showcase-component-page-preview-title">Round and Outlined Icon Button</span>
                    <Accordion borderless multiple activeIndex={[0]}>
                        <AccordionPanel noheader nodivier className="norseu-showcase-component-page-preview">
                            <p class="documentation-p"></p>
                            <Button icon="fa fa-user-circle" rounded outlined/>
                            <Button scheme={Scheme.SKELETON} icon="fa fa-user" rounded outlined/>
                            <Button scheme={Scheme.PRIMARY} icon="fa fa-circle" rounded outlined/>
                            <Button scheme={Scheme.SECONDARY} icon="fa fa-square" rounded outlined/>
                            <Button scheme={Scheme.SUCCESS} icon="fa fa-check" rounded outlined/>
                            <Button scheme={Scheme.INFO} icon="fa fa-bell" rounded outlined/>
                            <Button scheme={Scheme.WARNING} icon="fa fa-info" rounded outlined/>
                            <Button scheme={Scheme.DANGER} icon="fa fa-times" rounded outlined/>
                            <Button scheme={Scheme.DARK} icon="fa fa-times" rounded outlined/>
                            <Button scheme={Scheme.LIGHT} icon="fa fa-info" rounded outlined/>
                            
                            <div className="norseu-showcase-component-page-preview-buttons">
                                <i className="fa fa-code" onClick={(e) => this.previewPanels.current[12].toggle()}></i>
                                <i className="fa fa-copy" onClick={(e) => {copyToClipboard(this.state.pageSource, [[370, 379]])}}></i>
                            </div>
                        </AccordionPanel>
                        {getSourceInEditorR(this.state.pageSource, (ref) => this.previewPanels.current[12] = ref, [[370, 379]])}
                    </Accordion>
                </Panel>

                <Panel borderless style={{ marginTop: 40 }}>
                    <span className="norseu-showcase-component-page-preview-title">Round Text Only Icon Button</span>
                    <Accordion borderless multiple activeIndex={[0]}>
                        <AccordionPanel noheader nodivier className="norseu-showcase-component-page-preview">
                            <p class="documentation-p"></p>
                            <Button icon="fa fa-user-circle" rounded textOnly/>
                            <Button scheme={Scheme.SKELETON} icon="fa fa-user" rounded textOnly/>
                            <Button scheme={Scheme.PRIMARY} icon="fa fa-circle" rounded textOnly/>
                            <Button scheme={Scheme.SECONDARY} icon="fa fa-square" rounded textOnly/>
                            <Button scheme={Scheme.SUCCESS} icon="fa fa-check" rounded textOnly/>
                            <Button scheme={Scheme.INFO} icon="fa fa-bell" rounded textOnly/>
                            <Button scheme={Scheme.WARNING} icon="fa fa-info" rounded textOnly/>
                            <Button scheme={Scheme.DANGER} icon="fa fa-times" rounded textOnly/>
                            <Button scheme={Scheme.DARK} icon="fa fa-info" rounded textOnly/>
                            <Button scheme={Scheme.LIGHT} icon="fa fa-times" rounded textOnly/>
                            
                            <div className="norseu-showcase-component-page-preview-buttons">
                                <i className="fa fa-code" onClick={(e) => this.previewPanels.current[13].toggle()}></i>
                                <i className="fa fa-copy" onClick={(e) => {copyToClipboard(this.state.pageSource, [[395, 404]])}}></i>
                            </div>
                        </AccordionPanel>
                        {getSourceInEditorR(this.state.pageSource, (ref) => this.previewPanels.current[13] = ref, [[395, 404]])}
                    </Accordion>
                </Panel>

                <Panel borderless style={{ marginTop: 40 }}>
                    <span className="norseu-showcase-component-page-preview-title">Social Icon Buttons</span>
                    <Accordion borderless multiple activeIndex={[0]}>
                        <AccordionPanel noheader nodivier className="norseu-showcase-component-page-preview">
                            <p class="documentation-p"></p>
                            <Button scheme={Scheme.WARNING} icon={customIcon2}/>
                            <Button scheme={Scheme.PRIMARY} icon="fab fa-facebook-square"/>
                            <Button scheme={Scheme.SECONDARY} icon="fab fa-twitter"/>
                            <Button scheme={Scheme.SUCCESS} icon="fab fa-google"/>
                            <Button scheme={Scheme.INFO} icon="fab fa-instagram"/>
                            <Button scheme={Scheme.WARNING} icon="fab fa-linkedin"/>
                            <Button scheme={Scheme.DANGER} icon="fab fa-skype"/>
                            <Button scheme={Scheme.DARK} icon="fab fa-linkedin"/>
                            <Button scheme={Scheme.LIGHT} icon="fab fa-skype"/>
                            <br/>
                            <Button scheme={Scheme.WARNING} icon={customIcon2} rounded/>
                            <Button scheme={Scheme.PRIMARY} icon="fab fa-facebook-square" rounded/>
                            <Button scheme={Scheme.SECONDARY} icon="fab fa-twitter" rounded/>
                            <Button scheme={Scheme.SUCCESS} icon="fab fa-google" rounded/>
                            <Button scheme={Scheme.INFO} icon="fab fa-instagram" rounded/>
                            <Button scheme={Scheme.WARNING} icon="fab fa-linkedin" rounded/>
                            <Button scheme={Scheme.DANGER} icon="fab fa-skype" rounded/>
                            <Button scheme={Scheme.DARK} icon="fab fa-linkedin" rounded/>
                            <Button scheme={Scheme.LIGHT} icon="fab fa-skype" rounded/>
                            <br/>
                            <Button scheme={Scheme.WARNING} icon={customIcon2} rounded outlined/>
                            <Button scheme={Scheme.PRIMARY} icon="fab fa-facebook-square" rounded outlined/>
                            <Button scheme={Scheme.SECONDARY} icon="fab fa-twitter" rounded outlined/>
                            <Button scheme={Scheme.SUCCESS} icon="fab fa-google" rounded outlined/>
                            <Button scheme={Scheme.INFO} icon="fab fa-instagram" rounded outlined/>
                            <Button scheme={Scheme.WARNING} icon="fab fa-linkedin" rounded outlined/>
                            <Button scheme={Scheme.DANGER} icon="fab fa-skype" rounded outlined/>
                            <Button scheme={Scheme.DARK} icon="fab fa-linkedin" rounded outlined/>
                            <Button scheme={Scheme.LIGHT} icon="fab fa-skype" rounded outlined/>
                            <br/>
                            <Button scheme={Scheme.WARNING} icon={customIcon2} textOnly rounded/>
                            <Button scheme={Scheme.PRIMARY} icon="fab fa-facebook-square" textOnly rounded/>
                            <Button scheme={Scheme.SECONDARY} icon="fab fa-twitter" textOnly rounded/>
                            <Button scheme={Scheme.SUCCESS} icon="fab fa-google" textOnly rounded/>
                            <Button scheme={Scheme.INFO} icon="fab fa-instagram" textOnly rounded/>
                            <Button scheme={Scheme.WARNING} icon="fab fa-linkedin" textOnly rounded/>
                            <Button scheme={Scheme.DANGER} icon="fab fa-skype" textOnly rounded/>
                            <Button scheme={Scheme.DARK} icon="fab fa-linkedin" textOnly rounded/>
                            <Button scheme={Scheme.LIGHT} icon="fab fa-skype" textOnly rounded/>
                            
                            <div className="norseu-showcase-component-page-preview-buttons">
                                <i className="fa fa-code" onClick={(e) => this.previewPanels.current[14].toggle()}></i>
                                <i className="fa fa-copy" onClick={(e) => {copyToClipboard(this.state.pageSource, [[420, 458]])}}></i>
                            </div>
                        </AccordionPanel>
                        {getSourceInEditorR(this.state.pageSource, (ref) => this.previewPanels.current[14] = ref, [[420, 458]])}
                    </Accordion>
                </Panel>

                <Panel borderless style={{ marginTop: 40 }}>
                    <span className="norseu-showcase-component-page-preview-title">Template</span>
                    <Accordion borderless multiple activeIndex={[0]}>
                        <AccordionPanel noheader nodivier className="norseu-showcase-component-page-preview">
                            <p class="documentation-p"></p>
                            <Button scheme={Scheme.PRIMARY} style={{ padding: 0, border: "none" }}>
                                <i className="fab fa-twitter" style={{ padding: 10, marginRight: 20, backgroundColor: "#2a7cd1" }}/>
                                <span style={{ marginRight: 20 }}>Twitter</span>
                            </Button>
                            <Button scheme={Scheme.SECONDARY} style={{ padding: 0, border: "none" }}>
                                <i className="fab fa-discord" style={{ padding: 10, marginRight: 20, backgroundColor: "#bbbcc4" }}/>
                                <span style={{ marginRight: 20 }}>Discord</span>
                            </Button>
                            <Button scheme={Scheme.SUCCESS} style={{ padding: 0, border: "none" }}>
                                <i className="fab fa-google" style={{ padding: 10, marginRight: 20, backgroundColor: "#159993" }}/>
                                <span style={{ marginRight: 20 }}>Google</span>
                            </Button>
                            <Button scheme={Scheme.INFO} style={{ padding: 0, border: "none" }}>
                                <i className="fab fa-twitch" style={{ padding: 10, marginRight: 20, backgroundColor: "#6029cf" }}/>
                                <span style={{ marginRight: 20 }}>Twitch</span>
                            </Button>
                            <Button scheme={Scheme.WARNING} style={{ padding: 0, border: "none" }}>
                                <i className="fab fa-slack" style={{ padding: 10, marginRight: 20, backgroundColor: "#cf8e11" }}/>
                                <span style={{ marginRight: 20 }}>Slack</span>
                            </Button>
                            <Button scheme={Scheme.DANGER} style={{ padding: 0, border: "none" }}>
                                <i className="fab fa-youtube" style={{ padding: 10, marginRight: 20, backgroundColor: "#c22939" }}/>
                                <span style={{ marginRight: 20 }}>Youtube</span>
                            </Button>
                            <Button scheme={Scheme.DARK} style={{ padding: 0, border: "none" }}>
                                <i className="fab fa-amazon" style={{ padding: 10, marginRight: 20, backgroundColor: "grey" }}/>
                                <span style={{ marginRight: 20 }}>Amazon</span>
                            </Button>
                            <Button scheme={Scheme.LIGHT} style={{ padding: 0, border: "none" }}>
                                <i className="fab fa-linkedin" style={{ padding: 10, marginRight: 20, backgroundColor: "#e1e1e3" }}/>
                                <span style={{ marginRight: 20 }}>Linkedin</span>
                            </Button>
                            <Button style={{ padding: 0, border: "none", backgroundColor: "#003BDC" }}>
                                <span style={{ padding: 10, marginRight: 20, backgroundColor: "#698ff5" }}>{customIcon2}</span>
                                <span style={{ marginRight: 20, color: "white" }}>Ronuse</span>
                            </Button>
                            <Button scheme={Scheme.SECONDARY} style={{ padding: 0, border: "none" }}>
                                <i className="fab fa-ethereum" style={{ padding: 10, marginLeft: 10, marginRight: 10 }}/>
                                <span style={{ marginRight: 20 }}>Pay with Ethereum</span>
                            </Button>
                            <Button scheme={Scheme.PRIMARY} style={{ padding: 0, border: "none" }}>
                                <i className="fab fa-paypal" style={{ padding: 10, marginLeft: 10, marginRight: 10 }}/>
                                <span style={{ marginRight: 20 }}>Pay with Paypal</span>
                            </Button>
                            <Button scheme={Scheme.DARK} style={{ padding: 0, border: "none" }}>
                                <span style={{ marginLeft: 20 }}>Checkout with Apple Pay</span>
                                <i className="fab fa-apple" style={{ padding: 10, marginRight: 10 }}/>
                            </Button>
                            <br/>
                            <Button scheme={Scheme.DARK} style={{ padding: 0, border: "none" }}>
                                <i className="fab fa-apple" style={{ padding: 12, marginLeft: 10, marginRight: 10, fontSize: "30px" }}/>
                                <div style={{ marginRight: 20, display: "flex", flexDirection: "column", textAlign: "start" }}>
                                    <span>Download on the</span>
                                    <span style={{ fontSize: "20px" }}>App Store</span>
                                </div>
                            </Button>
                            <Button scheme={Scheme.DARK} style={{ padding: 0, border: "none" }}>
                                <i className="fab fa-google-play" style={{ padding: 12, marginLeft: 10, marginRight: 10, fontSize: "30px" }}/>
                                <div style={{ marginRight: 20, display: "flex", flexDirection: "column", textAlign: "start" }}>
                                    <span>GET IT ON</span>
                                    <span style={{ fontSize: "20px" }}>Google Play</span>
                                </div>
                            </Button>

                            <div className="norseu-showcase-component-page-preview-buttons">
                                <i className="fa fa-code" onClick={(e) => this.previewPanels.current[15].toggle()}></i>
                                <i className="fa fa-copy" onClick={(e) => {copyToClipboard(this.state.pageSource, [[474, 536]])}}></i>
                            </div>
                        </AccordionPanel>
                        {getSourceInEditorR(this.state.pageSource, (ref) => this.previewPanels.current[15] = ref, [[474, 536]])}
                    </Accordion>
                </Panel>
            </React.Fragment>
        );
    }

    render() {
        /*console.log("NORSEU.LOG", StyleCreator.generateSchemeBasicCss({
            name: "dark",
            textColor: "white",
            baseColor: "#000000"
        }));
        console.log("NORSEU.LOG", StyleCreator.transSchemeColorCss("#000000", ".3"))*/
        return buildComponentPage(this, {
            title: "Button",
            import_statement: "import { Button } from 'norseu/core/buttons'",
            properties: this.properties,
            css_map: this.cssMap,
            documentation: this.buildDocumentation(),
            page_source: this.state.pageSource,
            show_dialog: this.state.showSourceDialog,
            source_url: "https://raw.githubusercontent.com/ronuse/norseu/main/showcase/src/components/core/buttons/ButtonPage.js"
        });
    }
}