

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
import { Navbar } from "@ronuse/react-ui/core/overlay";
import { Button } from "@ronuse/react-ui/core/buttons";
import { Panel, ScrollPanel } from "@ronuse/react-ui/core/panels";
import { Position, Scheme, Orientation, Elevation, InputFilters } from "@ronuse/react-ui/core/variables";
import { LinearLayout } from '@ronuse/react-ui/layouts'

import { LinearLayoutPage } from './components/layouts/LinearLayoutPage'
import './index.css'

const App = () => {
    const componentDocumentationPanel = useRef(null);
    
    return (
        <HashRouter>
            <LinearLayout orientation={Orientation.VERTICAL} style={{height: "100%"}}>
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
                    <ScrollPanel style={{flex: 1, height: "100%"}} ref={componentDocumentationPanel}>
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
                    </ScrollPanel>
                </LinearLayout>
            </LinearLayout>
        </HashRouter>
    )
}

export default App
