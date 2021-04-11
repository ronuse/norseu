
import React from "react"
import { Button } from '@ronuse/react-ui/core/buttons'
import { Panel } from "@ronuse/react-ui/core/panels/Panel";
import { Scheme, Alignment } from "@ronuse/react-ui/core/variables";

export class HomePage extends React.Component {

    state = {
        
    }    

    render() {
        return (
            <Panel className="r-r-margin-20px">
                <Button scheme={Scheme.SECONDARY} className="r-r-margin-left-20px" rightIcon="fa fa-pencil" text="ScratchPad" onClick={(e) => {
                    this.props.history.push("/scratch");
                }}/>
                <Button scheme={Scheme.SUCCESS} className="r-r-margin-left-20px" rightIcon="fa fa-paint-brush" text="Create Scheme" onClick={(e) => {
                    this.props.history.push("/generate/scheme");
                }}/>
                <Panel className="r-r-margin-20px" title="Buttons">
                    <Button scheme={Scheme.PRIMARY} rightIcon="fa fa-external-link" text="Button" onClick={(e) => {
                        this.props.history.push("/core/buttons/button");
                    }}/>
                    <Button scheme={Scheme.PRIMARY} rightIcon="fa fa-external-link" text="ButtonGroup" onClick={(e) => {
                        this.props.history.push("/core/buttons/buttongroup");
                    }}/>
                </Panel>

                <Panel className="r-r-margin-20px" title="Panels">
                    <Button scheme={Scheme.PRIMARY} rightIcon="fa fa-external-link" text="Panel" onClick={(e) => {
                        this.props.history.push("/core/panels/panel");
                    }}/>
                    <Button scheme={Scheme.PRIMARY} rightIcon="fa fa-external-link" text="TabPane" onClick={(e) => {
                        this.props.history.push("/core/panels/tabpane");
                    }}/>
                    <Button scheme={Scheme.PRIMARY} rightIcon="fa fa-external-link" text="Fieldset" onClick={(e) => {
                        this.props.history.push("/core/panels/fieldset");
                    }}/>
                    <Button scheme={Scheme.PRIMARY} rightIcon="fa fa-external-link" text="Accordion" onClick={(e) => {
                        this.props.history.push("/core/panels/accordion");
                    }}/>
                    <Button scheme={Scheme.PRIMARY} rightIcon="fa fa-external-link" text="ScrollPanel" onClick={(e) => {
                        this.props.history.push("/core/panels/scrollpanel");
                    }}/>
                </Panel>

                <Panel className="r-r-margin-20px" title="Form">
                    <Button scheme={Scheme.PRIMARY} rightIcon="fa fa-external-link" text="Checkbox" onClick={(e) => {
                        this.props.history.push("/core/form/checkbox");
                    }}/>
                    <Button scheme={Scheme.PRIMARY} rightIcon="fa fa-external-link" text="InputText" onClick={(e) => {
                        this.props.history.push("/core/form/inputtext");
                    }}/>
                    <Button scheme={Scheme.PRIMARY} rightIcon="fa fa-external-link" text="InputFilters" onClick={(e) => {
                        this.props.history.push("/core/form/inputfilterspage");
                    }}/>
                </Panel>

                <Panel className="r-r-margin-20px" title="Others">
                    <Button scheme={Scheme.PRIMARY} rightIcon="fa fa-external-link" text="Elevation" onClick={(e) => {
                        this.props.history.push("/core/variables/elevation");
                    }}/>
                    <Button scheme={Scheme.PRIMARY} rightIcon="fa fa-external-link" text="Tag" onClick={(e) => {
                        this.props.history.push("/core/misc/tag");
                    }}/>
                    <Button scheme={Scheme.PRIMARY} rightIcon="fa fa-external-link" text="Badge And Tag" onClick={(e) => {
                        this.props.history.push("/misc/badgeandtag");
                    }}/>
                </Panel>

                <Panel className="r-r-margin-20px" title="Layouts">
                    <Button scheme={Scheme.PRIMARY} rightIcon="fa fa-external-link" text="LinearLayout" onClick={(e) => {
                        this.props.history.push("/layouts/linearlayout");
                    }}/>
                </Panel>

                <Panel className="r-r-margin-20px" title="Sensors">
                    <Button scheme={Scheme.PRIMARY} rightIcon="fa fa-external-link" text="ViewportSensor" onClick={(e) => {
                        this.props.history.push("/sensors/viewportsensor");
                    }}/>
                    <Button scheme={Scheme.PRIMARY} rightIcon="fa fa-external-link" text="ResizeSensor" onClick={(e) => {
                        this.props.history.push("/sensors/resizesensor");
                    }}/>
                </Panel>
            </Panel>
        )
    }
}
