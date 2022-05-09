

import React, { useRef } from 'react'
import { HashRouter, Switch, Route, Link } from "react-router-dom"
import { ButtonPage } from './components/core/buttons/ButtonPage'
import { ButtonGroupPage } from './components/core/buttons/ButtonGroupPage'
import { PanelPage } from './components/core/panels/PanelPage'
import { AccordionPage } from './components/core/panels/AccordionPage'
import { ScrollPanelPage } from './components/core/panels/ScrollPanelPage'
import { TabPanePage } from './components/core/panels/TabPanePage'
import { FieldsetPage } from './components/core/panels/FieldsetPage'
import { ElevationPage } from './components/core/variables/ElevationPage'
import { BadgeAndTagPage } from './components/misc/BadgeAndTagPage'
import { TagPage } from './components/misc/TagPage'
import { ScratchPage } from './components/ScratchPage'
import { GenerateSchemePage } from './components/GenerateSchemePage'
import { HomePage } from './components/HomePage'
import { ViewportSensorPage } from './components/sensors/ViewportSensorPage'
import { ResizeSensorPage } from './components/sensors/ResizeSensorPage'
import { CheckboxPage } from './components/core/form/CheckboxPage'
import { InputTextPage } from './components/core/form/InputTextPage'
import { PasswordInputPage } from './components/core/form/PasswordInputPage'
import { InputFiltersPage } from './components/core/form/InputFiltersPage'
import { TextAreaPage } from './components/core/form/TextAreaPage'
import { FileInputPage } from './components/core/form/FileInputPage'
import { DropdownPage } from './components/core/form/DropdownPage'
import { AlertDialogPage } from './components/core/overlay/AlertDialogPage'
import { NavbarPage } from './components/core/overlay/NavbarPage'
import { DialogPage } from './components/core/overlay/DialogPage'
import { PopoverPage } from './components/core/overlay/PopoverPage'
import { MessagePage } from './components/core/overlay/MessagePage'
import { Navbar } from "norseu/core/overlay";
import { Button } from "norseu/core/buttons";
import { Panel, ScrollPanel } from "norseu/core/panels";
import { Position, Scheme, Orientation, Elevation, InputFilters } from "norseu/core/variables";
import { LinearLayout } from 'norseu/layouts'

import { LinearLayoutPage } from './components/layouts/LinearLayoutPage'
import { ResizeSensor } from 'norseu/sensors'
import './index.css'

const App = () => {
    const componentDocumentationPanel = useRef(null);
    
    return (
        <HashRouter>
            <ScrollPanel orientation={Orientation.VERTICAL} style={{ height: "100%" }}>
                <Navbar noOverlay isVisible={true} position={Position.TOP} className="top-navbar">
                    <div className="container">
                        <Link to="/" style={{ display: "flex", alignItems: "center", textDecoration: "none", color: "#666363" }}>
                            <img src="https://avatars.githubusercontent.com/u/58535737" style={{ width: 35, height: 35 }}/>
                            <ResizeSensor minDimension={{ width: 800 }}>
                                <span style={{ fontWeight: "bold", fontSize: "18px", marginLeft: 15 }}>norseu</span>
                            </ResizeSensor>
                        </Link>

                        <div className="to-navbar-links">
                            <Link to="/site/introduction">Introduction</Link>
                            <Link to="/components/">Components</Link>
                            <Link to="/site/theming">Theming</Link>
                            <Link to="/site/creator">Creator</Link>
                            <Link to="/schemes/">Schemes</Link>
                            <a href="https://github.com/ronuse/norseu" target="_blank">
                                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fill-rule="evenodd" clip-rule="evenodd" d="M15 0C6.7125 0 0 6.7125 0 15C0 21.6375 4.29375 27.2437 10.2563 29.2313C11.0063 29.3625 11.2875 28.9125 11.2875 28.5188C11.2875 28.1625 11.2688 26.9813 11.2688 25.725C7.5 26.4188 6.525 24.8062 6.225 23.9625C6.05625 23.5312 5.325 22.2 4.6875 21.8438C4.1625 21.5625 3.4125 20.8687 4.66875 20.85C5.85 20.8313 6.69375 21.9375 6.975 22.3875C8.325 24.6562 10.4812 24.0187 11.3438 23.625C11.475 22.65 11.8688 21.9937 12.3 21.6187C8.9625 21.2437 5.475 19.95 5.475 14.2125C5.475 12.5813 6.05625 11.2313 7.0125 10.1813C6.8625 9.80625 6.3375 8.26875 7.1625 6.20625C7.1625 6.20625 8.41875 5.8125 11.2875 7.74375C12.4875 7.40625 13.7625 7.2375 15.0375 7.2375C16.3125 7.2375 17.5875 7.40625 18.7875 7.74375C21.6562 5.79375 22.9125 6.20625 22.9125 6.20625C23.7375 8.26875 23.2125 9.80625 23.0625 10.1813C24.0188 11.2313 24.6 12.5625 24.6 14.2125C24.6 19.9688 21.0938 21.2437 17.7563 21.6187C18.3 22.0875 18.7688 22.9875 18.7688 24.3937C18.7688 26.4 18.75 28.0125 18.75 28.5188C18.75 28.9125 19.0312 29.3813 19.7812 29.2313C22.759 28.2259 25.3465 26.3121 27.1796 23.7592C29.0127 21.2063 29.9991 18.1429 30 15C30 6.7125 23.2875 0 15 0Z" fill="#666363"/>
                                </svg>
                            </a>
                            <a style={{ cursor: "pointer" }}>
                                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15 14.7587C13.4272 13.1854 12.3561 11.1811 11.922 8.99912C11.488 6.81719 11.7104 4.55555 12.5612 2.5C10.1353 2.97756 7.90699 4.16789 6.16124 5.91875C1.27999 10.8 1.27999 18.715 6.16124 23.5963C11.0437 28.4788 18.9575 28.4775 23.84 23.5963C25.5904 21.8507 26.7807 19.6229 27.2587 17.1975C25.2032 18.0482 22.9416 18.2705 20.7597 17.8365C18.5778 17.4024 16.5735 16.3314 15 14.7587Z" fill="#666363"/>
                                </svg>
                            </a>
                        </div>
                    </div>
                </Navbar>
                <LinearLayout style={{ flex: 1 }} ref={componentDocumentationPanel}>
                    <Switch>
                        <Route exact path="/" component={HomePage}/>
                        <Route exact path="/scratch" component={ScratchPage}/>
                        <Route exact path="/generate/scheme" component={GenerateSchemePage}/>

                        <Route exact path="/core/buttons/button" component={ButtonPage}/>
                        <Route exact path="/core/buttons/buttongroup" component={ButtonGroupPage}/>

                        <Route exact path="/core/panels/panel" component={PanelPage}/>
                        <Route exact path="/core/panels/tabpane" component={TabPanePage}/>
                        <Route exact path="/core/panels/fieldset" component={FieldsetPage}/>
                        <Route exact path="/core/panels/accordion" component={AccordionPage}/>
                        <Route exact path="/core/panels/scrollpanel" component={ScrollPanelPage}/>
                        
                        <Route exact path="/core/form/checkbox" component={CheckboxPage}/>
                        <Route exact path="/core/form/inputtext" component={InputTextPage}/>
                        <Route exact path="/core/form/passwordinput" component={PasswordInputPage}/>
                        <Route exact path="/core/form/inputfilterspage" component={InputFiltersPage}/>
                        <Route exact path="/core/form/dropdown" component={DropdownPage}/>
                        <Route exact path="/core/form/textareapage" component={TextAreaPage}/>
                        <Route exact path="/core/form/fileinput" component={FileInputPage}/>
                        
                        <Route exact path="/core/overlay/alertdialog" component={AlertDialogPage}/>
                        <Route exact path="/core/overlay/dialog" component={DialogPage}/>
                        <Route exact path="/core/overlay/navbar" component={NavbarPage}/>
                        <Route exact path="/core/overlay/popup" component={PopoverPage}/>
                        <Route exact path="/core/overlay/message" component={MessagePage}/>
                        
                        <Route exact path="/core/variables/elevation" component={ElevationPage}/>
                        <Route exact path="/core/misc/tag" component={TagPage}/>
                        <Route exact path="/misc/badgeandtag" component={BadgeAndTagPage}/>

                        <Route exact path="/layouts/linearlayout" component={LinearLayoutPage}/>

                        <Route exact path="/sensors/viewportsensor" component={(props) => <ViewportSensorPage scrollContainerRef={componentDocumentationPanel} {...props}/>}/>
                        <Route exact path="/sensors/resizesensor" component={ResizeSensorPage}/>
                    </Switch>
                </LinearLayout>
                <Panel style={{ marginBottom: 0, backgroundColor: "rgba(54, 153, 255, 0.1)", display: "flex", justifyContent: "center" }} contentClassName="footer">
                    <div style={{ display: "flex", alignItems: "center" }}>
                        <a href="https://ronuse.com" target="_blank" style={{ display: "flex", alignItems: "center", marginRight: 25 }}>
                            <img style={{ width: 25, marginRight: 5 }} src="https://avatars.githubusercontent.com/u/69908664"/>
                            <span style={{ fontSize: 15, fontWeight: "bold", color: "#003BDC" }}>Ronuse</span>
                        </a>
                        <span style={{ fontSize: 13 }}>© 2022, ronuse inc.</span>
                    </div>

                    <div>
                        <a href="https://ronuse.com" target="_blank" style={{ color: "#4F4F4F", fontSize: 25, marginRight: 20 }}><i className="fa fa-globe"/></a>
                        <a href="https://twitter.com/ronuse" target="_blank" style={{ color: "#4F4F4F", fontSize: 25, marginRight: 20 }}><i className="fab fa-twitter"/></a>
                        <a href="https://github.com/ronuse" target="_blank" style={{ color: "#4F4F4F", fontSize: 25, marginRight: 20 }}><i className="fab fa-github"/></a>
                        <a href="https://www.linkedin.com/company/ronuse" target="_blank" style={{ color: "#4F4F4F", fontSize: 25, marginRight: 0 }}><i className="fab fa-linkedin"/></a>
                    </div>
                </Panel>
            </ScrollPanel>
            {/**<LinearLayout orientation={Orientation.VERTICAL} style={{height: "100%"}}>
                <Navbar noOverlay position={Position.TOP} isVisible={true} style={{width: "100%", position: "relative", minHeight: "65px", backgroundColor: "red"}}>
                    
                </Navbar>
                <LinearLayout style={{flex: 1, maxHeight: "93%"}}>
                    <Navbar noOverlay position={Position.LEFT} isVisible={true} className="left-sidebar">
                        <ScrollPanel>
                            <section>
                                <span className="title">GENERAL</span>
                                <Link className="link" to="/scratch">ScratchPad</Link>
                                <Link className="link" to="/generate/scheme">Create Scheme</Link>
                            </section>

                            <section>
                                <span className="title">BUTTONS</span>
                                <Link className="link" to="/core/buttons/button">Button</Link>
                                <Link className="link" to="/core/buttons/buttongroup">ButtonGroup</Link>
                            </section>

                            <section>
                                <span className="title">Panels</span>
                                <Link className="link" to="/core/panels/panel">Panel</Link>
                                <Link className="link" to="/core/panels/tabpane">TabPane</Link>
                                <Link className="link" to="/core/panels/fieldset">Fieldset</Link>
                                <Link className="link" to="/core/panels/accordion">Accordion</Link>
                                <Link className="link" to="/core/panels/scrollpanel">ScrollPanel</Link>
                            </section>

                            <section>
                                <span className="title">Form</span>
                                <Link className="link" to="/core/form/checkbox">Checkbox</Link>
                                <Link className="link" to="/core/form/inputtext">InputText</Link>
                                <Link className="link" to="/core/form/passwordinput">PasswordInput</Link>
                                <Link className="link" to="/core/form/inputfilterspage">InputFilters</Link>
                                <Link className="link" to="/core/form/dropdown">Dropdown</Link>
                                <Link className="link" to="/core/form/textareapage">TextArea</Link>
                                <Link className="link" to="/core/form/fileinput">FileInput</Link>
                            </section>

                            <section>
                                <span className="title">Overlay</span>
                                <Link className="link" to="/core/overlay/alertdialog">Alert Dialog</Link>
                                <Link className="link" to="/core/overlay/dialog">Dialog</Link>
                                <Link className="link" to="/core/overlay/navbar">Navbar</Link>
                                <Link className="link" to="/core/overlay/popup">Popover</Link>
                                <Link className="link" to="/core/overlay/message">Message</Link>
                            </section>

                            <section>
                                <span className="title">Layouts</span>
                                <Link className="link" to="/layouts/linearlayout">LinearLayout</Link>
                            </section>

                            <section>
                                <span className="title">Sensors</span>
                                <Link className="link" to="/sensors/viewportsensor">ViewportSensor</Link>
                                <Link className="link" to="/sensors/resizesensor">ResizeSensor</Link>
                            </section>

                            <section>
                                <span className="title">Others</span>
                                <Link className="link" to="/core/variables/elevation">Elevation</Link>
                                <Link className="link" to="/core/misc/tag">Tag</Link>
                                <Link className="link" to="/misc/badgeandtag">Badge And Tag</Link>
                            </section>
                        </ScrollPanel>
                    </Navbar>
                </LinearLayout>
            </LinearLayout>**/}
        </HashRouter>
    )
}

export default App
