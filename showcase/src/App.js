

import React from 'react'
import { HashRouter, Switch, Route } from "react-router-dom"
import { ButtonPage } from './components/core/buttons/ButtonPage'
import { ButtonGroupPage } from './components/core/buttons/ButtonGroupPage'
import { PanelPage } from './components/core/panels/PanelPage'
import { TabPanePage } from './components/core/panels/TabPanePage'
import { ElevationPage } from './components/core/variables/ElevationPage'
import { BadgeAndTagPage } from './components/misc/BadgeAndTagPage'
import { TagPage } from './components/misc/TagPage'
import { ScratchPage } from './components/ScratchPage'
import './index.css'

const App = () => {
    return (
        <HashRouter>
            <Switch>
                <Route exact path="/" component={ScratchPage}/>

                <Route exact path="/core/buttons/button" component={ButtonPage}/>
                <Route exact path="/core/buttons/buttongroup" component={ButtonGroupPage}/>

                <Route exact path="/core/panels/panel" component={PanelPage}/>
                <Route exact path="/core/panels/tabpane" component={TabPanePage}/>
                
                <Route exact path="/core/variables/elevation" component={ElevationPage}/>
                <Route exact path="/core/misc/tag" component={TagPage}/>

                <Route exact path="/misc/badgeandtag" component={BadgeAndTagPage}/>
            </Switch>
        </HashRouter>
    )
}

export default App
