

import React from 'react'
import { HashRouter, Switch, Route } from "react-router-dom"
import { ButtonsPage } from './components/core/ButtonsPage'
import { ScratchPage } from './components/ScratchPage'
import './index.css'

const App = () => {
    return (
        <HashRouter>
            <Switch>
                <Route exact path="/button" component={ButtonsPage}/>
                <Route exact path="/" component={ScratchPage}/>
            </Switch>
        </HashRouter>
    )
}

export default App
