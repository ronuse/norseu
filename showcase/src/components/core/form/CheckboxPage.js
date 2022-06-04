
import React from "react";
import { Accordion, AccordionPanel, Panel } from 'norseu/core/panels';
import { Checkbox, Dropdown } from 'norseu/core/form';
import { Scheme } from "norseu/core/variables/Stylers";
import Helpers from "../../../utils/Helpers";
import { Alignment } from "norseu/core/variables";

export class CheckboxPage extends React.Component {

    state = { pageSource: '', showSourceDialog: false }
    cssMap = [

    ];
    properties = [
        { name: "scheme", type: <a href='#/p/components/core/variables/scheme'>Scheme</a>, default: "null", description: "Set the check box appearance according to scheme" },
        { name: "label", type: "string", default: null, description: "The label to show in the button" },
        { name: "id", type: "string", default: null, description: "Set the internal input (type checkbox) element id" },
        { name: "name", type: "string", default: null, description: "Set the internal input (type checkbox) element name" },
        { name: "required", type: "boolean", default: false, description: "Make the internal input (type checkbox) element required" },
        { name: "align", type: <a href='#/p/components/core/variables/alignment'>Alignment</a>, default: <a href='#/p/components/core/variables/alignment#left'>Alignment.LEFT</a>, description: "The position to place the check box relative to it label" },
        { name: "checkStates", type: "object", default: [
			[{
				value: "un-checked",
				icon: null,
				scheme: null,
				checked: false
			},
			{
				value: "checked",
				icon: "fa fa-check",
				scheme: null,
				checked: true
			}]
		], description: "The check states that the checkbox renders on change. norseu checkbox support more than two states" },
        { name: "checked", type: "boolean", default: false, description: "If set to true the second checkStates will be applied" },
        { name: "checkedIndex", type: "number", default: -1, description: "The checkbox check state, default is first state" },
        { name: "style", type: "object", default: null, description: "CSS Style to apply to the checkbox compount element" },
        { name: "className", type: "string", default: null, description: "CSS classes to apply to the checkbox compount element" },
        { name: "disabled", type: "boolean", default: false, description: "Disable the element, prevents it from receiving pointer event" },
        { name: "readOnly", type: "boolean", default: false, description: "Disable the element, prevents it from receiving pointer event but the appearance remains" },
        { name: "nostyle", type: "boolean", default: false, description: "Only render the element excluding any css/style property" },
        { name: "selfManaged", type: "boolean", default: false, description: "Manually manage the checkedIndex state of the checkbox" },
        { name: "onChange", type: "function", default: null, description: "The callback that is invoked when the checbox check state changed" },
        { name: "onMouseDown", type: "function", default: null, description: "The callback that is invoked when checkbox is cliked" },
    ];
    refMap = [
        { name: "value()", type: "function", description: "Get currently active/selected state of the checkbox" },
        { name: "setValue(value)", type: "function", description: "Set the value of the component internal HTML element" },
        { name: "focus()", type: "function", description: "Send focus to the checkbox component" },
        { name: "getInternalElement()", type: "function", description: "Get the react reference to the internal element" },
        { name: "getState()", type: "function", description: "Get the current state of the component" },
        { name: "setState()", type: "function", description: "Change the component state" },
    ]

    constructor(props) {
        super(props);
        this.willUnmount = false;
        this.previewPanels = React.createRef();
        this.previewPanels.current = [];
    }

    componentWillUnmount() {
        this.willUnmount = true;
    }

    buildDocumentation() {
        let twoCheckStates = [
            {
                value: "Minus",
                icon: "fa fa-minus",
                scheme: null,
                checked: true
            },
            {
                value: "Plus",
                icon: "fa fa-plus",
                scheme: null,
                checked: true
            }
        ];
        let threeCheckStates = [
            {
                value: "Yes",
                icon: "fa fa-thumbs-up",
                scheme: null,
                checked: true
            },
            {
                value: "No",
                icon: "fa fa-thumbs-down",
                scheme: null,
                checked: false
            },
            {
                value: "Maybe",
                icon: "fa fa-hand-paper",
                scheme: null,
                checked: "kinda"
            }
        ];
        let fiveCheckStates = [
            {
                value: "Secondary",
                icon: "fa fa-circle",
                scheme: Scheme.SECONDARY,
                checked: true
            },
            {
                value: "Success",
                icon: "fa fa-circle",
                scheme: Scheme.SUCCESS,
                checked: true
            },
            {
                value: "Info",
                icon: "fa fa-circle",
                scheme: Scheme.INFO,
                checked: true
            },
            {
                value: "Warning",
                icon: "fa fa-circle",
                scheme: Scheme.WARNING,
                checked: true
            },
            {
                value: "Danger",
                icon: "fa fa-circle",
                scheme: Scheme.DANGER,
                checked: true
            }
        ];
        let alignDropdownOptions = [
			{ label: "Alignment.LEFT", value: Alignment.LEFT },
			{ label: "Alignment.RIGHT", value: Alignment.RIGHT },
			{ label: "Alignment.TOP", value: Alignment.TOP },
			{ label: "Alignment.CENTER", value: Alignment.CENTER },
			{ label: "Alignment.TOP_CENTER", value: Alignment.TOP_CENTER },
			{ label: "Alignment.TOP_LEFT", value: Alignment.TOP_LEFT },
			{ label: "Alignment.TOP_RIGHT", value: Alignment.TOP_RIGHT },
			{ label: "Alignment.BOTTOM", value: Alignment.BOTTOM },
			{ label: "Alignment.BOTTOM_LEFT", value: Alignment.BOTTOM_LEFT },
			{ label: "Alignment.BOTTOM_RIGHT", value: Alignment.BOTTOM_RIGHT },
			{ label: "Alignment.BOTTOM_CENTER", value: Alignment.BOTTOM_CENTER },
		];

        return (
            <React.Fragment>
                <Panel borderless style={{ marginTop: 40 }}>
                    <span className="norseu-showcase-component-page-preview-title">Basic</span>
                    <Accordion borderless multiple activeIndex={[0]}>
                        <AccordionPanel noheader nodivier className="norseu-showcase-component-page-preview">
                            <Checkbox/><br/>
                            <Checkbox label="Default Uncheked"/><br/>
                            <Checkbox name="1-checkbox" label="Checked" checked={true}/><br/>
                            <Checkbox label="Disabled" checked={true} disabled/><br/>
                            <Checkbox label={this.state.checked ? "Checked - true" : "Checked - false"} checked={this.state.checked} 
                                onChange={e => this.setState({ checked: e.checked })} selfManaged/><br/>
                            <Checkbox name="readOnly-checkbox" scheme={Scheme.PRIMARY} label="Read Only" readOnly checked/>
                            <Checkbox name="readOnly-checkbox" scheme={Scheme.PRIMARY} label={"Hello World".repeat(20)} checked/>
                            
                            <div className="norseu-showcase-component-page-preview-buttons">
                                <i className="fa fa-code" onClick={(e) => this.previewPanels.current[0].toggle()}></i>
                                <i className="fa fa-copy" onClick={(e) => {Helpers.copyToClipboard(this.state.pageSource, [[154, 161]])}}></i>
                            </div>
                        </AccordionPanel>
                        {Helpers.getSourceInEditorR(this.state.pageSource, (ref) => this.previewPanels.current[0] = ref, [[154, 161]])}
                    </Accordion>
                </Panel>
                
                <Panel borderless style={{ marginTop: 40 }}>
                    <span className="norseu-showcase-component-page-preview-title">Scheme</span>
                    <Accordion borderless multiple activeIndex={[0]}>
                        <AccordionPanel noheader nodivier className="norseu-showcase-component-page-preview">
                            <Checkbox scheme={Scheme.SKELETON} label="Skeleton" checked={true}/><br/>
                            <Checkbox scheme={Scheme.PRIMARY} label="Primary" checked={true}/><br/>
                            <Checkbox scheme={Scheme.SECONDARY} label="Secondary" checked={true}/><br/>
                            <Checkbox scheme={Scheme.SUCCESS} label="Success" checked={true}/><br/>
                            <Checkbox scheme={!this.state.checked2 ? Scheme.WARNING : Scheme.DANGER} 
                                label={!this.state.checked2 ? "Warning" : "Danger"} checked={this.state.checked2} 
                                onChange={e => this.setState({ checked2: e.checked })}/><br/>
                            <Checkbox scheme={Scheme.DARK} label={<label className="norseu-info-text fa fa-book"> Dark</label>} checked={true}/><br/>
                            <Checkbox scheme={Scheme.LIGHT} label="Light" checked={true}/><br/>
                            
                            <div className="norseu-showcase-component-page-preview-buttons">
                                <i className="fa fa-code" onClick={(e) => this.previewPanels.current[1].toggle()}></i>
                                <i className="fa fa-copy" onClick={(e) => {Helpers.copyToClipboard(this.state.pageSource, [[176, 184]])}}></i>
                            </div>
                        </AccordionPanel>
                        {Helpers.getSourceInEditorR(this.state.pageSource, (ref) => this.previewPanels.current[1] = ref, [[176, 184]])}
                    </Accordion>
                </Panel>
                
                <Panel borderless style={{ marginTop: 40 }}>
                    <span className="norseu-showcase-component-page-preview-title">Checkbox Alignment</span>
                    <Accordion borderless multiple activeIndex={[0]}>
                        <AccordionPanel noheader nodivier className="norseu-showcase-component-page-preview">
                            <Dropdown options={alignDropdownOptions} selectedOptionIndex={0} onSelectOption={(e) => this.setState({ align: e.option.value } )}/>
                            <br/>
                            <Checkbox scheme={Scheme.PRIMARY} label={`Align the checkbox ${this.state.align || "left"}`} align={this.state.align}/>

                            <div className="norseu-showcase-component-page-preview-buttons">
                                <i className="fa fa-code" onClick={(e) => this.previewPanels.current[2].toggle()}></i>
                                <i className="fa fa-copy" onClick={(e) => {Helpers.copyToClipboard(this.state.pageSource, [[134, 146], [199, 201]])}}></i>
                            </div>
                        </AccordionPanel>
                        {Helpers.getSourceInEditorR(this.state.pageSource, (ref) => this.previewPanels.current[2] = ref, [[134, 146], [199, 201]])}
                    </Accordion>
                </Panel>
                
                <Panel borderless style={{ marginTop: 40 }}>
                    <span className="norseu-showcase-component-page-preview-title">Multiple State</span>
                    <Accordion borderless multiple activeIndex={[0]}>
                        <AccordionPanel noheader nodivier className="norseu-showcase-component-page-preview">
                            <Checkbox scheme={Scheme.PRIMARY} label={`2 states: ${this.state.multiStateValue2 || twoCheckStates[0].value}`} 
                                checkStates={twoCheckStates} 
                                checkedIndex={0} onChange={e => this.setState({ multiStateValue2: e.value })}/>
                            <br/>
                            <Checkbox scheme={Scheme.PRIMARY} label={`3 states: ${this.state.multiStateValue3 || threeCheckStates[0].value}`} 
                                checkStates={threeCheckStates} 
                                checkedIndex={0} onChange={e => this.setState({ multiStateValue3: e.value })}/>
                            <br/>
                            <Checkbox scheme={Scheme.PRIMARY} label={`5 schemed states: ${this.state.multiStateValue5 || fiveCheckStates[0].value}`} 
                                checkStates={fiveCheckStates} 
                                checkedIndex={0} onChange={e => this.setState({ multiStateValue5: e.value })}/>

                            <div className="norseu-showcase-component-page-preview-buttons">
                                <i className="fa fa-code" onClick={(e) => this.previewPanels.current[3].toggle()}></i>
                                <i className="fa fa-copy" onClick={(e) => {Helpers.copyToClipboard(this.state.pageSource, [[68, 133], [216, 226]])}}></i>
                            </div>
                        </AccordionPanel>
                        {Helpers.getSourceInEditorR(this.state.pageSource, (ref) => this.previewPanels.current[3] = ref, [[68, 133], [216, 226]])}
                    </Accordion>
                </Panel>
            </React.Fragment>
        );
    }

    render() {
        return Helpers.buildComponentPage(this, {
            title: "Checkbox",
            import_statement: "import { Checkbox } from 'norseu/core/form'",
            properties: this.properties,
            css_map: this.cssMap,
            ref_map: this.refMap,
            documentation: this.buildDocumentation(),
            page_source: this.state.pageSource,
            show_dialog: this.state.showSourceDialog,
            source_url: "https://raw.githubusercontent.com/ronuse/norseu/main/showcase/src/components/core/form/CheckboxPage.js"
        });
    }

}