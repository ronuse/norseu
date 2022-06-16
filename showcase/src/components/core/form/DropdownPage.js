
import React from "react";
import { Panel, TabPane, TabPanel, Accordion, AccordionPanel } from '@ronuse/norseu/core/panels';
import { Button } from '@ronuse/norseu/core/buttons';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { prism } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { Scheme } from "@ronuse/norseu/core/variables/Stylers";
import { Alignment, Orientation, Elevation, InputFilters } from "@ronuse/norseu/core/variables";
import { LinearLayout } from "@ronuse/norseu/layouts";
import { Dropdown, InputText } from "@ronuse/norseu/core/form";
import Helpers from "../../../utils/Helpers"

export class DropdownPage extends React.Component {

	
	dropDownOptions = [
		{ label: "Nigeria", value: "NG", icon: "https://cdn.countryflags.com/thumbs/nigeria/flag-3d-round-250.png" },
		{ label: "Ghana", value: "GH", icon: "https://cdn.countryflags.com/thumbs/ghana/flag-3d-round-250.png" },
		{ label: "Egypt", value: "EGY", icon: "https://cdn.countryflags.com/thumbs/egypt/flag-3d-round-250.png" },
		{ label: "South Africa", value: "SA", icon: "https://cdn.countryflags.com/thumbs/south-africa/flag-3d-round-250.png" },
		{ label: "Sudan", value: "SD", icon: "https://cdn.countryflags.com/thumbs/sudan/flag-3d-round-250.png" },
		{ label: "Togo", value: "TG", icon: "https://cdn.countryflags.com/thumbs/togo/flag-3d-round-250.png" },
		{ label: "Kenya", value: "KY", icon: "https://cdn.countryflags.com/thumbs/kenya/flag-3d-round-250.png" }
	];

	state = { 
		pageSource: '',
		showSourceDialog: false,
		countriesOption: this.dropDownOptions
	}
    cssMap = [

    ];
    properties = [
        { name: "scheme", type: <a href='#/p/components/core/variables/scheme'>Scheme</a>, default: "null", description: "Set the dropdown appearance according to scheme" },
        { name: "id", type: "string", default: null, description: "Set the internal element id" },
        { name: "className", type: "string", default: null, description: "CSS classes to apply to the component" },
        { name: "style", type: "object", default: null, description: "CSS Style to apply to the component" },
        { name: "editable", type: "boolean", default: false, description: "Make the dropdown input editable" },
        { name: "toggleIcon", type: "string|element", default: false, description: "Set the icon that toggle the dropdown, can be Font Awesome icon class name or valid react element" },
        { name: "options", type: "object", default: null, description: "Array list of option/objects to render in the dropdown. Each option should have label, value and icon field." },
        { name: "selectable", type: "boolean", default: true, description: "If false the dropdown option won't be selectable" },
        { name: "selectedOptionIndex", type: "number", default: null, description: "Set the default option index that is selected" },
        { name: "optionMap", type: "object", default: null, description: "The option map should be provided to map the required dropdown fields from the options" },
        { name: "optionTemplate", type: "function", default: null, description: "If this function is set, it ll be invoked to build the dropdown item view instead of default view" },
        { name: "popoverProps", type: "object", default: null, description: "The props to relay to the dropdown popover" },
        { name: "inputTextRef", type: "object", default: null, description: "React ref for the dropdown InputeText component" },
        { name: "popOverRef", type: "object", default: null, description: "React ref for the dropdown PopOver component" },
        { name: "matchTargetSize", type: "boolean", default: false, description: "If true the popover width will match the width of the dropdown input" },
        { name: "onSearch", type: "function", default: false, description: "This callback will be invoked if the dropdown input value changes" },
        { name: "onSelectOption", type: "function", default: false, description: "This callback will be invoked if a dropdown option was selected" },
        { name: "onDropdownShow", type: "function", default: false, description: "This callback will be invoked when the dropdown popover is added to DOM" },
        { name: "onDropdownHide", type: "function", default: false, description: "This callback will be invoked when the dropdown popover is removed from DOM" },
    ];
    refMap = [
        { name: "getInternalElement()", type: "function", description: "Returns the actual internal element of the component, which is InputText" },
        { name: "value()", type: "function", description: "Returns the currently selected option value" },
        { name: "text()", type: "function", description: "Returns the InputText active text value" },
        { name: "selectedOption()", type: "function", description: "Returns the currently selected option" },
        { name: "focus()", type: "function", description: "Send focus to the component" },
        { name: "inputTextRef()", type: "function", description: "Returns the internal inpute text component" },
        { name: "popOverRef()", type: "function", description: "Returns the internal popover component" },
        { name: "toggle(e, ignoreEditable)", type: "function", description: "Toggle the popover visibility. If ignoreEditable is true the toggle will fire even if the target is the input text" },
        { name: "showDropDown(e)", type: "function", description: "Make the popover visisble if it not visible" },
        { name: "hideDropDown(e)", type: "function", description: "Make the popover invisible if it is visible" },
    ];

    constructor(props) {
        super(props);
        this.willUnmount = false;
        this.dropdownRef = React.createRef();
        this.previewPanels = React.createRef();
        this.previewPanels.current = [];
    }

    componentWillUnmount() {
        this.willUnmount = true;
    }

    buildDocumentation() {
		const dropDownOptions = this.state.countriesOption;
		const dropDownOptionsNumbers = Array(1000).fill(null).map((_, index) => ({ label: `Number ${index+1}`, value: index+1 }));

        return (
            <React.Fragment>
                <Panel borderless style={{ marginTop: 40 }}>
                    <span className="norseu-showcase-component-page-preview-title">Basic</span>
                    <Accordion borderless multiple activeIndex={[0]}>
                        <AccordionPanel noheader nodivier className="norseu-showcase-component-page-preview">
                        	<p className="documentation-p"></p>
                            <Dropdown options={dropDownOptions}/>
                            
                            <div className="norseu-showcase-component-page-preview-buttons">
                                <i className="fa fa-code" onClick={(e) => this.previewPanels.current[0].toggle()}></i>
                                <i className="fa fa-copy" onClick={(e) => {Helpers.copyToClipboard(this.state.pageSource, [[16, 24], [91, 91]])}}></i>
                            </div>
                        </AccordionPanel>
                        {Helpers.getSourceInEditorR(this.state.pageSource, (ref) => this.previewPanels.current[0] = ref, [[16, 24], [91, 91]])}
                    </Accordion>
                </Panel>
				
                <Panel borderless style={{ marginTop: 40 }}>
                    <span className="norseu-showcase-component-page-preview-title">Schemes</span>
                    <Accordion borderless multiple activeIndex={[0]}>
                        <AccordionPanel noheader nodivier className="norseu-showcase-component-page-preview">
							<p className="documentation-p"></p>
							<div className="norseu-display-flex sppai">
								<Dropdown scheme={Scheme.SKELETON} options={dropDownOptions} placeholder={"Skeleton"}/>
								<Dropdown scheme={Scheme.PRIMARY} options={dropDownOptions} placeholder={"Primary"}/>
								<Dropdown scheme={Scheme.SECONDARY} options={dropDownOptions} placeholder={"Secondary"}/>
								<Dropdown scheme={Scheme.SUCCESS} options={dropDownOptions} placeholder={"Success"}/>
								<Dropdown scheme={Scheme.WARNING} options={dropDownOptions} placeholder={"Warning"}/>
								<Dropdown scheme={Scheme.INFO} options={dropDownOptions} placeholder={"Info"}/>
								<Dropdown scheme={Scheme.DANGER} options={dropDownOptions} placeholder={"Danger"}/>
								<Dropdown scheme={Scheme.DARK} options={dropDownOptions} placeholder={"Dark"}/>
								<Dropdown scheme={Scheme.LIGHT} options={dropDownOptions} placeholder={"Light"}/>
							</div>
                            
                            <div className="norseu-showcase-component-page-preview-buttons">
                                <i className="fa fa-code" onClick={(e) => this.previewPanels.current[1].toggle()}></i>
                                <i className="fa fa-copy" onClick={(e) => {Helpers.copyToClipboard(this.state.pageSource, [[16, 24], [108, 116]])}}></i>
                            </div>
                        </AccordionPanel>
                        {Helpers.getSourceInEditorR(this.state.pageSource, (ref) => this.previewPanels.current[1] = ref, [[16, 24], [108, 116]])}
                    </Accordion>
                </Panel>
				
                {/* <Panel borderless style={{ marginTop: 40 }}>
                    <span className="norseu-showcase-component-page-preview-title">Lazy Load</span>
                    <Accordion borderless multiple activeIndex={[0]}>
                        <AccordionPanel noheader nodivier className="norseu-showcase-component-page-preview">
							<p className="documentation-p">
								The property <code>lazyLoad</code> allow the dropdown to render the options in pages instead of at once. This is most useful 
								when the option list is very long
							</p>
                            <Dropdown scheme={Scheme.PRIMARY} lazyLoadFraction={10} options={dropDownOptionsNumbers} selectedOptionIndex={0}/>
                            
                            <div className="norseu-showcase-component-page-preview-buttons">
                                <i className="fa fa-code" onClick={(e) => this.previewPanels.current[0].toggle()}></i>
                                <i className="fa fa-copy" onClick={(e) => {Helpers.copyToClipboard(this.state.pageSource, [[57, 65]])}}></i>
                            </div>
                        </AccordionPanel>
                        {Helpers.getSourceInEditorR(this.state.pageSource, (ref) => this.previewPanels.current[0] = ref, [[57, 65]])}
                    </Accordion>
                </Panel> */}
				
                <Panel borderless style={{ marginTop: 40 }}>
                    <span className="norseu-showcase-component-page-preview-title">Editable</span>
                    <Accordion borderless multiple activeIndex={[0]}>
                        <AccordionPanel noheader nodivier className="norseu-showcase-component-page-preview">
							<p className="documentation-p">
								A dropdown property can be set to editable, this make searching or changing the options and state of the dropdown 
								possible. If the event <code>onDropdownInputChange</code> is set, the event will be invoked with the new value of 
								the dropdown input.
							</p>
                            <Dropdown scheme={Scheme.PRIMARY} editable options={dropDownOptions} selectedOptionIndex={0}/>
                            
                            <div className="norseu-showcase-component-page-preview-buttons">
                                <i className="fa fa-code" onClick={(e) => this.previewPanels.current[2].toggle()}></i>
                                <i className="fa fa-copy" onClick={(e) => {Helpers.copyToClipboard(this.state.pageSource, [[16, 24], [156, 156]])}}></i>
                            </div>
                        </AccordionPanel>
                        {Helpers.getSourceInEditorR(this.state.pageSource, (ref) => this.previewPanels.current[2] = ref, [[16, 24], [156, 156]])}
                    </Accordion>
                </Panel>
				
                <Panel borderless style={{ marginTop: 40 }}>
                    <span className="norseu-showcase-component-page-preview-title">Fill</span>
                    <Accordion borderless multiple activeIndex={[0]}>
                        <AccordionPanel noheader nodivier className="norseu-showcase-component-page-preview">
							<p className="documentation-p">
								By default the size of a drop down is 180px, if the drop down size is increased or decreased the drop down popover 
								does not adjust to the target size. To adjust the size of the popover to it target set the prop 
								value <code>matchTargetSize</code> to true.
							</p>
                            <Dropdown fill scheme={Scheme.PRIMARY} matchTargetSize options={dropDownOptions} selectedOptionIndex={0}/>
                            
                            <div className="norseu-showcase-component-page-preview-buttons">
                                <i className="fa fa-code" onClick={(e) => this.previewPanels.current[3].toggle()}></i>
                                <i className="fa fa-copy" onClick={(e) => {Helpers.copyToClipboard(this.state.pageSource, [[16, 24], [176, 176]])}}></i>
                            </div>
                        </AccordionPanel>
                        {Helpers.getSourceInEditorR(this.state.pageSource, (ref) => this.previewPanels.current[3] = ref, [[16, 24], [176, 176]])}
                    </Accordion>
                </Panel>
				
                <Panel borderless style={{ marginTop: 40 }}>
                    <span className="norseu-showcase-component-page-preview-title">Option Template</span>
                    <Accordion borderless multiple activeIndex={[0]}>
                        <AccordionPanel noheader nodivier className="norseu-showcase-component-page-preview">
							<div className="documentation-p">
								Each object in the <code>options</code> must should have the following keys.
								<ul>
									<li>icon</li>
									<li>label</li>
									<li>value</li>
								</ul>
								<code>icon</code> is optional. The keys are used to rendered the selected value from the dropdown.
								The way the option list is rendered can be changed by setting the <code>optionTemplate</code> value. But in the case 
								where a custom option template is set, if the option object does not have the following key that allow it 
								set the option value <code>icon, label, value</code>, a optionMap is needed to map the object key to 
								the needed keys. <br/><br/>
								Below is a sample list of options and the optionMap that map the keys in the options object to the required keys.<br/><br/>
								{Helpers.buildCodeBlock(this.state.pageSource, [[207, 215]])}
							</div>
                            <Dropdown editable scheme={Scheme.PRIMARY} selectedOptionIndex={0}
								options={[
									{ continent: "Africa", name: "Nigera", image: "https://cdn.countryflags.com/thumbs/nigeria/flag-3d-round-250.png" },
									{ continent: "Asia", name: "India", image: "https://cdn.countryflags.com/thumbs/india/flag-3d-round-250.png" }
								]}
								optionMap={{ 
									label: "{continent} - {name}",
									value: "name",
									icon: "image"
								}}
								optionTemplate={(county) => <span className="norseu-dropdown-popover-li-item"><img src={county.image}/>{county.continent} - {county.name}</span>}/>
                            
                            <div className="norseu-showcase-component-page-preview-buttons">
                                <i className="fa fa-code" onClick={(e) => this.previewPanels.current[4].toggle()}></i>
                                <i className="fa fa-copy" onClick={(e) => {Helpers.copyToClipboard(this.state.pageSource, [[206, 216]])}}></i>
                            </div>
                        </AccordionPanel>
                        {Helpers.getSourceInEditorR(this.state.pageSource, (ref) => this.previewPanels.current[4] = ref, [[206, 216]])}
                    </Accordion>
                </Panel>
				
                <Panel borderless style={{ marginTop: 40 }}>
                    <span className="norseu-showcase-component-page-preview-title">onSearch Event</span>
                    <Accordion borderless multiple activeIndex={[0]}>
                        <AccordionPanel noheader nodivier className="norseu-showcase-component-page-preview">
							<p className="documentation-p"></p>
                            <Dropdown editable scheme={this.state.tScheme || Scheme.PRIMARY} options={this.state.countriesOption} selectedOptionIndex={0}
								ref={this.dropdownRef}
								onSearch={(e) => {
									this.dropdownRef.current.showDropDown();
									this.dropdownRef.current.setState({
										options: this.dropDownOptions.filter(dropDownOption => e.target.value === "" || dropDownOption.label.startsWith(e.target.value))
									});
								}} />
                            
                            <div className="norseu-showcase-component-page-preview-buttons">
                                <i className="fa fa-code" onClick={(e) => this.previewPanels.current[5].toggle()}></i>
                                <i className="fa fa-copy" onClick={(e) => {Helpers.copyToClipboard(this.state.pageSource, [[16, 24], [232, 239]])}}></i>
                            </div>
                        </AccordionPanel>
                        {Helpers.getSourceInEditorR(this.state.pageSource, (ref) => this.previewPanels.current[5] = ref, [[16, 24], [232, 239]])}
                    </Accordion>
                </Panel>
            </React.Fragment>
        );
    }

    render() {
        return Helpers.buildComponentPage(this, {
            title: "Dropdown",
            import_statement: "import { Dropdown } from '@ronuse/norseu/core/form'",
            properties: this.properties,
            css_map: this.cssMap,
            ref_map: this.refMap,
            documentation: this.buildDocumentation(),
            page_source: this.state.pageSource,
            show_dialog: this.state.showSourceDialog,
            source_url: "https://raw.githubusercontent.com/ronuse/norseu/main/showcase/src/components/core/form/DropdownPage.js"
        });
    }

}