
import React from "react";
import { Accordion, AccordionPanel, Panel } from 'norseu/core/panels';
import Helpers from "../../../utils/Helpers";
import { Button } from "norseu/core/buttons";

export class PageTemplate extends React.Component {

    state = { pageSource: '', showSourceDialog: false }
    cssMap = [

    ];
    properties = [
        { name: "text", type: "string", default: "", description: "The label to show in the button" },
    ];
    refMap = [
        { name: "value()", type: "function", description: "Returns the value of the component internal HTML element" },
        { name: "setValue(value)", type: "function", description: "Set the value of the component internal HTML element" },
        { name: "focus()", type: "function", description: "Send focus to the component" },
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
        return (
            <React.Fragment>
                <Panel borderless style={{ marginTop: 40 }}>
                    <span className="norseu-showcase-component-page-preview-title">Basic</span>
                    <Accordion borderless multiple activeIndex={[0]}>
                        <AccordionPanel noheader nodivier className="norseu-showcase-component-page-preview">
                            <p className="documentation-p"></p>
                            <Button text="Click Me" />
                            <Button icon="fa fa-user-circle" text="View Profile" />
                            
                            <div className="norseu-showcase-component-page-preview-buttons">
                                <i className="fa fa-code" onClick={(e) => this.previewPanels.current[0].toggle()}></i>
                                <i className="fa fa-copy" onClick={(e) => {Helpers.copyToClipboard(this.state.pageSource, [[57, 65]])}}></i>
                            </div>
                        </AccordionPanel>
                        {Helpers.getSourceInEditorR(this.state.pageSource, (ref) => this.previewPanels.current[0] = ref, [[57, 65]])}
                    </Accordion>
                </Panel>
            </React.Fragment>
        );
    }

    render() {
        return Helpers.buildComponentPage(this, {
            title: "PageTemplate",
            import_statement: "import { Button } from 'norseu/core/buttons'",
            properties: this.properties,
            css_map: this.cssMap,
            ref_map: this.refMap,
            documentation: this.buildDocumentation(),
            page_source: this.state.pageSource,
            show_dialog: this.state.showSourceDialog,
            source_url: "https://raw.githubusercontent.com/ronuse/norseu/main/showcase/src/components/core/buttons/ButtonPage.js"
        });
    }

    /*
add toggle like in casava
create the casa scheme, purple and ligth purple #FB0E7D, #FFE7F2
remove !important from schem border classes
relay scheme from ResizeSensor and other to it children
    */

}