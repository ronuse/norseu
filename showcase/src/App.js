

import React from 'react'
import { HashRouter, Switch, Route } from "react-router-dom"
import { ButtonPage } from './components/core/buttons/ButtonPage'
import { PanelPage } from './components/core/panels/PanelPage'
import { ScratchPage } from './components/ScratchPage'
import './index.css'

const App = () => {
    return (
        <HashRouter>
            <Switch>
                <Route exact path="/core/buttons/button" component={ButtonPage}/>
                <Route exact path="/core/panels/panel" component={PanelPage}/>
                <Route exact path="/" component={ScratchPage}/>
            </Switch>
        </HashRouter>
    )
}

export default App
