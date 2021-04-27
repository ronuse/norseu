

import React from 'react'
import { HashRouter, Switch, Route } from "react-router-dom"
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
import { AlertDialogPage } from './components/core/overlay/AlertDialogPage'
import { NavbarPage } from './components/core/overlay/NavbarPage'
import { DialogPage } from './components/core/overlay/DialogPage'

import { LinearLayoutPage } from './components/layouts/LinearLayoutPage'
import './index.css'

const App = () => {
    return (
        <HashRouter>
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
                
                <Route exact path="/core/overlay/alertdialog" component={AlertDialogPage}/>
                <Route exact path="/core/overlay/dialog" component={DialogPage}/>
                <Route exact path="/core/overlay/navbar" component={NavbarPage}/>
                
                <Route exact path="/core/variables/elevation" component={ElevationPage}/>
                <Route exact path="/core/misc/tag" component={TagPage}/>
                <Route exact path="/misc/badgeandtag" component={BadgeAndTagPage}/>

                <Route exact path="/layouts/linearlayout" component={LinearLayoutPage}/>

                <Route exact path="/sensors/viewportsensor" component={ViewportSensorPage}/>
                <Route exact path="/sensors/resizesensor" component={ResizeSensorPage}/>
            </Switch>
        </HashRouter>
    )
}

export default App
