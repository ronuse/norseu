

import React, { useRef } from 'react'
import { HashRouter, Switch, Route, NavLink, BrowserRouter } from "react-router-dom"
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
import { IndexPage } from './components/pages/IndexPage'
import { Navbar } from "@ronuse/norseu/core/overlay";
import { Button } from "@ronuse/norseu/core/buttons";
import { Panel, ScrollPanel } from "@ronuse/norseu/core/panels";
import { Position, Scheme, Orientation, Elevation, InputFilters } from "@ronuse/norseu/core/variables";
import { LinearLayout } from '@ronuse/norseu/layouts'

import { LinearLayoutPage } from './components/layouts/LinearLayoutPage'
import { ResizeSensor } from '@ronuse/norseu/sensors'
import './index.css'

const App = () => {
    const componentDocumentationPanel = useRef(null);
    const currentNavbarCbEvent = React.useRef(null);
    const [ showCurrentNavbarButton, setShowCurrentNavbarButton ] = React.useState(false);
    const isWideScreen = (window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth) > 1000;
    const isSinglePage = (window.location.hash === "#/" || window.location.pathname === "/");

    function buildCompoundComponent(...children) {
        if (!isSinglePage) return <Panel style={{ height: "100%", margin: 0 }} contentStyle={{ height: "100%", display: "flex", flexDirection: "column" }}>{children}</Panel>
        return <ScrollPanel style={{ height: "100%" }}>{children}</ScrollPanel>
    }

    function setOnNavbarChange(cb) {
        setShowCurrentNavbarButton(true);
        currentNavbarCbEvent.current = cb;
    }
    
    return (
        <HashRouter forceRefresh>
            {buildCompoundComponent(<Navbar key="header" noOverlay isVisible={true} position={Position.TOP} className="top-navbar" style={{ borderBottom: "solid #F4F1F1 1px" }}>
                <div className="container">
                    <NavLink to="/" style={{ display: "flex", alignItems: "center", textDecoration: "none", color: "#666363" }}>
                        <img src="https://avatars.githubusercontent.com/u/58535737" style={{ width: 35, height: 35 }}/>
                        <ResizeSensor minDimension={{ width: 800 }}>
                            <span style={{ fontWeight: "bold", fontSize: "18px", marginLeft: 15 }}>norseu</span>
                        </ResizeSensor>
                    </NavLink>

                    <div className="to-navbar-links">
                        <ResizeSensor maxDimension={{ width: 1000 }} onDimensionChange={(_, dimension) => {
                            if (dimension.width <= 1000) {
                                currentNavbarCbEvent.current && currentNavbarCbEvent.current(false);
                            } else {
                                currentNavbarCbEvent.current && currentNavbarCbEvent.current(true);
                            }
                        }}>
                            {!isSinglePage
                                ? <Button icon="fa fa-bars" scheme={Scheme.PRIMARY} onClick={() => currentNavbarCbEvent.current && currentNavbarCbEvent.current()} />
                                : null
                            }
                        </ResizeSensor>
                        <ResizeSensor minDimension={{ width: 1000 }} obeyIf={!isSinglePage}>
                            <NavLink activeClassName="active" to="/p/introduction">Introduction</NavLink>
                            <NavLink activeClassName="active" to="/p/components_overview">Components</NavLink>
                            <NavLink activeClassName="active" to="/p/theming">Theming</NavLink>
                            <NavLink activeClassName="active" to="/p/creator">Creator</NavLink>
                            <NavLink activeClassName="active" to="/schemes/">Schemes</NavLink>
                            <a href="https://github.com/ronuse/norseu" target="_blank" style={{ display: "flex", alignItems: "center" }}>
                                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path fillRule="evenodd" clipRule="evenodd" d="M15 0C6.7125 0 0 6.7125 0 15C0 21.6375 4.29375 27.2437 10.2563 29.2313C11.0063 29.3625 11.2875 28.9125 11.2875 28.5188C11.2875 28.1625 11.2688 26.9813 11.2688 25.725C7.5 26.4188 6.525 24.8062 6.225 23.9625C6.05625 23.5312 5.325 22.2 4.6875 21.8438C4.1625 21.5625 3.4125 20.8687 4.66875 20.85C5.85 20.8313 6.69375 21.9375 6.975 22.3875C8.325 24.6562 10.4812 24.0187 11.3438 23.625C11.475 22.65 11.8688 21.9937 12.3 21.6187C8.9625 21.2437 5.475 19.95 5.475 14.2125C5.475 12.5813 6.05625 11.2313 7.0125 10.1813C6.8625 9.80625 6.3375 8.26875 7.1625 6.20625C7.1625 6.20625 8.41875 5.8125 11.2875 7.74375C12.4875 7.40625 13.7625 7.2375 15.0375 7.2375C16.3125 7.2375 17.5875 7.40625 18.7875 7.74375C21.6562 5.79375 22.9125 6.20625 22.9125 6.20625C23.7375 8.26875 23.2125 9.80625 23.0625 10.1813C24.0188 11.2313 24.6 12.5625 24.6 14.2125C24.6 19.9688 21.0938 21.2437 17.7563 21.6187C18.3 22.0875 18.7688 22.9875 18.7688 24.3937C18.7688 26.4 18.75 28.0125 18.75 28.5188C18.75 28.9125 19.0312 29.3813 19.7812 29.2313C22.759 28.2259 25.3465 26.3121 27.1796 23.7592C29.0127 21.2063 29.9991 18.1429 30 15C30 6.7125 23.2875 0 15 0Z" fill="#666363"/>
                                </svg>
                            </a>
                            <a style={{ cursor: "pointer", display: "flex", alignItems: "center" }}>
                                <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M15 14.7587C13.4272 13.1854 12.3561 11.1811 11.922 8.99912C11.488 6.81719 11.7104 4.55555 12.5612 2.5C10.1353 2.97756 7.90699 4.16789 6.16124 5.91875C1.27999 10.8 1.27999 18.715 6.16124 23.5963C11.0437 28.4788 18.9575 28.4775 23.84 23.5963C25.5904 21.8507 26.7807 19.6229 27.2587 17.1975C25.2032 18.0482 22.9416 18.2705 20.7597 17.8365C18.5778 17.4024 16.5735 16.3314 15 14.7587Z" fill="#666363"/>
                                </svg>
                            </a>
                        </ResizeSensor>
                        {isSinglePage
                            ? [ 
                                    
                                ]
                            :null
                        }
                        
                    </div>
                </div>
                </Navbar>,
                <LinearLayout key="content" style={{ flex: 1, overflow: "auto" }} ref={componentDocumentationPanel}>
                    <Switch>
                        <Route exact path="/" component={HomePage}/>
                        <Route path="/p" component={props => <IndexPage setOnNavbarChange={setOnNavbarChange} isWideScreen={isWideScreen} {...props}/>}/>
                    </Switch>
                </LinearLayout>,
                <Panel key="footer" style={{ marginBottom: 0, backgroundColor: "rgba(54, 153, 255, 0.1)", display: "flex", justifyContent: "center", marginTop: 0 }} contentClassName="footer">
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
            )}
        </HashRouter>
    )
}

export default App
