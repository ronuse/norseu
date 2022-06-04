
import React, { Component } from "react"
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button } from 'norseu/core/buttons'
import { Panel } from "norseu/core/panels/Panel";
import { Scheme, Alignment, Position, Orientation } from "norseu/core/variables";
import { InputText } from 'norseu/core/form';
import { Popover, Message, showMessage, Toast, Navbar } from 'norseu/core/overlay';
import { Tag } from 'norseu/core/misc'
import { ObjUtils, DOMUtils, BoolUtils } from "norseu/utils"
import ReactDOM from 'react-dom';
import { LinearLayout } from "norseu/layouts";
import { ScrollPanel } from "norseu/core/panels";
import { HashRouter, NavLink, Route, Switch } from "react-router-dom";
import { IntroductionPage } from "./IntroductionPage";
import { GenerateSchemePage } from "../GenerateSchemePage";
import { NavbarPage } from "../core/overlay/NavbarPage";
import { ResizeSensor } from "norseu/sensors";
import { UsedByPage } from "./UsedByPage";
import { ResourcesPage } from "./ResourcesPage";
import { ScratchPage } from "../ScratchPage";
import { ComponentsOverviewPage } from "./ComponentsOverviewPage";
import { ButtonPage } from "../core/buttons/ButtonPage";
import { createBrowserHistory } from "history";
import { DialogPage } from "../core/overlay/DialogPage";
import { ButtonGroupPage } from "../core/buttons/ButtonGroupPage";
import { CheckboxPage } from "../core/form/CheckboxPage";
import { DropdownPage } from "../core/form/DropdownPage";
import { FileInputPage } from "../core/form/FileInputPage";

const history = createBrowserHistory({forceRefresh:true});

export class IndexPage extends React.Component {

	state = {
		username: ""
	}
	
	constructor(props) {
        super(props);
        this.state.isWideScreen = this.props.isWideScreen;
        this.state.navbarIsVisible = this.state.isWideScreen;
        this.props.setOnNavbarChange && this.props.setOnNavbarChange((hide) => {
            if (hide !== undefined) {
                if (!hide && this.state.navbarIsVisible) this.setState({ navbarIsVisible: false, isWideScreen: false });
                if (hide && !this.state.navbarIsVisible) this.setState({ navbarIsVisible: true, isWideScreen: true });
                return;
            }
            this.setState({ navbarIsVisible: !this.state.navbarIsVisible});
        });
	}

    hidenavbar() {
        if (this.state.isWideScreen) return;
        this.setState({navbarIsVisible: !this.state.navbarIsVisible});
    }

	render() {

		return (
            <HashRouter history={history}>
                <LinearLayout style={{ margin: 0, borderRadius: 0, width: "100%" }}>
                    <Navbar noOverlay={this.state.isWideScreen} className={`left-sidebar ${this.state.isWideScreen ? "wide" : ""}`} position={Position.LEFT} 
                        isVisible={this.state.navbarIsVisible} onHide={() => this.hidenavbar()}>
                        <ScrollPanel>
                            <section>
                                <span className="title">GENERAL</span>
                                <NavLink activeClassName="active" className="link" to="/p/introduction" onClick={() => this.hidenavbar()}>Introduction</NavLink>
                                {/* <NavLink activeClassName="active" className="link" to="/p/resources" onClick={() => this.hidenavbar()}>Resources</NavLink> */}
                                <NavLink activeClassName="active" className="link" to="/p/used_by" onClick={() => this.hidenavbar()}>Used By</NavLink>
                                {/* <NavLink activeClassName="active" className="link" to="/p/component_creator" onClick={() => this.hidenavbar()}>Component Creator</NavLink> */}
                                <NavLink activeClassName="active" className="link" to="/p/components_overview" onClick={() => this.hidenavbar()}>Components Overview</NavLink>
                                {/* <NavLink activeClassName="active" className="link" to="/scratch" onClick={() => this.hidenavbar()}>ScratchPad</NavLink> */}
                                {/* <NavLink activeClassName="active" className="link" to="/p/generate/scheme" onClick={() => this.hidenavbar()}>Create Scheme</NavLink> */}
                                
                                <span className="title">BUTTONS</span>
                                <NavLink activeClassName="active" className="link" to="/p/components/core/buttons/button" onClick={() => this.hidenavbar()}>Button</NavLink>
                                <NavLink activeClassName="active" className="link" to="/p/components/core/buttons/buttongroup" onClick={() => this.hidenavbar()}>Button Group</NavLink>
                                
                                <span className="title">FORM</span>
                                <NavLink activeClassName="active" className="link" to="/p/components/core/form/checkbox" onClick={() => this.hidenavbar()}>Checkbox</NavLink>
                                <NavLink activeClassName="active" className="link" to="/p/components/core/form/dropdown" onClick={() => this.hidenavbar()}>Dropdown</NavLink>
                                <NavLink activeClassName="active" className="link" to="/p/components/core/form/fileinput" onClick={() => this.hidenavbar()}>FileInput</NavLink>
                            </section>
                        </ScrollPanel>
                    </Navbar>
                    <ScrollPanel style={{ flex: 1, minHeight: "90vh" }}>
                            <Switch>
                                <Route exact path="/p/introduction" component={IntroductionPage}/>
                                {/* <Route exact path="/p/resources" component={ResourcesPage}/> */}
                                <Route exact path="/p/used_by" component={UsedByPage}/>
                                <Route exact path="/p/components_overview" component={ComponentsOverviewPage}/>
                                <Route exact path="/scratch" component={ScratchPage}/>

                                <Route exact path="/p/components/core/buttons/button" component={ButtonPage}/>
                                <Route exact path="/p/components/core/buttons/buttongroup" component={ButtonGroupPage}/>

                                <Route exact path="/p/components/core/form/checkbox" component={CheckboxPage}/>
                                <Route exact path="/p/components/core/form/dropdown" component={DropdownPage}/>
                                <Route exact path="/p/components/core/form/fileinput" component={FileInputPage}/>

                                <Route path="/p/generate/scheme" component={GenerateSchemePage}/>                                
                                {/* <Route exact path="/scratch" component={ScratchPage}/>
                                <Route exact path="/generate/scheme" component={GenerateSchemePage}/>
                                
                                <Route exact path="/components/core/form/inputtext" component={InputTextPage}/>
                                <Route exact path="/components/core/form/passwordinput" component={PasswordInputPage}/>
                                <Route exact path="/components/core/form/inputfilterspage" component={InputFiltersPage}/>
                                <Route exact path="/components/core/form/textareapage" component={TextAreaPage}/>


                                <Route exact path="/components/core/panels/panel" component={PanelPage}/>
                                <Route exact path="/components/core/panels/tabpane" component={TabPanePage}/>
                                <Route exact path="/components/core/panels/fieldset" component={FieldsetPage}/>
                                <Route exact path="/components/core/panels/accordion" component={AccordionPage}/>
                                <Route exact path="/components/core/panels/scrollpanel" component={ScrollPanelPage}/>
                                
                                <Route exact path="/components/core/overlay/alertdialog" component={AlertDialogPage}/>
                                <Route exact path="/components/core/overlay/dialog" component={DialogPage}/>
                                <Route exact path="/components/core/overlay/navbar" component={NavbarPage}/>
                                <Route exact path="/components/core/overlay/popup" component={PopoverPage}/>
                                <Route exact path="/components/core/overlay/message" component={MessagePage}/>
                                
                                <Route exact path="/components/core/variables/elevation" component={ElevationPage}/>
                                <Route exact path="/components/core/misc/tag" component={TagPage}/>
                                <Route exact path="/misc/badgeandtag" component={BadgeAndTagPage}/>

                                <Route exact path="/layouts/linearlayout" component={LinearLayoutPage}/>

                                <Route exact path="/sensors/viewportsensor" component={(props) => <ViewportSensorPage scrollContainerRef={componentDocumentationPanel} {...props}/>}/>
                                <Route exact path="/sensors/resizesensor" component={ResizeSensorPage}/> */}
                            </Switch>
                    </ScrollPanel>
                </LinearLayout>
            </HashRouter>
		)
	}
}
