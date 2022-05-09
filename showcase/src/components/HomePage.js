
import React from "react"
import { Button, ButtonGroup } from 'norseu/core/buttons'
import { Scheme, Alignment, Orientation, FilePreviewType } from "norseu/core/variables";
import { LinearLayout } from "norseu/layouts";
import { Message, Navbar } from "norseu/core/overlay";
import { Link } from "react-router-dom";
import { ResizeSensor } from "norseu/sensors";
import { CompaniesUsingNorseu } from "../utils/companies_using_norseu"
import { Panel, ScrollPanel, TabPane, TabPanel, Fieldset, Accordion, AccordionPanel } from "norseu/core/panels";
import { InputText, Checkbox, Dropdown, FileInput, TextArea } from "norseu/core/form";

export class HomePage extends React.Component {

    state = {
        previewScheme: Scheme.PRIMARY
    }

	constructor(props) {
		super(props)
        this.dropDownOptions = [
            { label: "Nigeria", value: "NG", icon: "https://cdn.countryflags.com/thumbs/nigeria/flag-3d-round-250.png" },
            { label: "Ghana", value: "GH", icon: "https://cdn.countryflags.com/thumbs/ghana/flag-3d-round-250.png" },
            { label: "Egypt", value: "EGY", icon: "https://cdn.countryflags.com/thumbs/egypt/flag-3d-round-250.png" },
            { label: "South Africa", value: "SA", icon: "https://cdn.countryflags.com/thumbs/south-africa/flag-3d-round-250.png" },
            { label: "Sudan", value: "SD", icon: "https://cdn.countryflags.com/thumbs/sudan/flag-3d-round-250.png" },
            { label: "Togo", value: "TG", icon: "https://cdn.countryflags.com/thumbs/togo/flag-3d-round-250.png" },
            { label: "Kenya", value: "KY", icon: "https://cdn.countryflags.com/thumbs/kenya/flag-3d-round-250.png" }
        ];
    }

    buildLandingHeroCard(title, desc, icon, route, style) {
        return (
            <a className="landing-hero-card" href={route} style={style}>
                {icon}
                <span className="title">{title}</span>
                <span className="desc">{desc}</span>
            </a>
        )
    }

    buildFeatureCard(icon, title, desc) {
        return (
            <div className="landing-feature-card">
                {icon}
                <span className="title">{title}</span>
                <span className="desc">{desc}</span>
            </div>
        )
    }

    loremIpsum() {
        return `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam placerat libero eget elit facilisis, vitae aliquam massa maximus. 
        Phasellus pulvinar libero metus, quis congue erat ultricies eget. Donec sodales arcu nisi, quis rutrum ex aliquam sit amet. 
        Nulla luctus ligula non felis sodales consectetur. Vivamus bibendum est dolor, at volutpat tortor scelerisque sit amet. 
        Donec id justo quis metus pellentesque dictum et nec risus. Ut eu laoreet est, at mollis felis. Cras nec nisl vel lectus vehicula venenatis. 
        Pellentesque elementum dui vel egestas molestie. Phasellus lacus quam, volutpat sit amet gravida a, euismod eu magna. 
        Sed imperdiet volutpat nunc non iaculis.`;
    }

    buildPreviewComponentss() {
        return (
            <Panel style={{}} scheme={this.state.previewScheme}>
                <div style={{ display: "flex" }}>
                    <Panel title="Title" collapsible expanded style={{ flex: 1, marginRight: 20 }} contentStyle={{ padding: "20px 0px 10px 0px" }} scheme={this.state.previewScheme}>
                        <div style={{ display: "flex" }}>
                            <ButtonGroup direction={Orientation.VERTICAL} scheme={this.state.previewScheme}>
                                <Button icon="fa fa-folder-open" text="Open"/>
                                <Button icon="fa fa-times" text="Close"/>
                                <Button icon="fa fa-save" text="Save"/>
                                <Button icon="fa fa-door-open" text="Exit"/>
                            </ButtonGroup>
                            <div style={{ marginLeft: 20 }}>
                                <Button scheme={this.state.previewScheme} icon="fa fa-circle" text="Click me"/>
                                <Button scheme={this.state.previewScheme} icon="fa fa-circle" text="Click me" rounded/>
                                <Button scheme={this.state.previewScheme} icon="fa fa-circle" text="Click me" raised/>
                                <Button scheme={this.state.previewScheme} icon="fa fa-circle" text="Click me" textonly outlined/>
                                <Button scheme={this.state.previewScheme} icon="fa fa-circle" text="Click me" outlined fillOnHover/>
                                <Button scheme={this.state.previewScheme} icon="fa fa-circle" text="Click me" textonly/>
                                <Button scheme={this.state.previewScheme} icon="fa fa-circle" text="Click me" textonly raised/>
                                <Button scheme={this.state.previewScheme} icon="fa fa-circle"/>
                                <Button scheme={this.state.previewScheme} icon="fa fa-circle" rounded/>
                                <Button scheme={this.state.previewScheme} icon="fa fa-circle" rounded outlined/>
                                <Button scheme={this.state.previewScheme} icon="fa fa-circle" rounded textonly/>
                                <Button scheme={this.state.previewScheme} icon="fab fa-facebook-square"/>
                                <ButtonGroup scheme={this.state.previewScheme} style={{ marginTop: 20 }}>
                                    <Button icon="fa fa-folder-open" text="Open"/>
                                    <Button icon="fa fa-times" text="Close"/>
                                    <Button icon="fa fa-save" text="Save"/>
                                    <Button icon="fa fa-door-open" text="Exit"/>
                                </ButtonGroup>
                            </div>
                        </div>
                        <ScrollPanel scheme={this.state.previewScheme} style={{ height: 200, marginTop: 20 }}>
                            <p>{this.loremIpsum()} {this.loremIpsum()}</p>
                        </ScrollPanel>
                        <Accordion activeIndex={[1]} scheme={this.state.previewScheme} style={{ marginTop: 20 }}>
                            <AccordionPanel header="Title 1" disabled></AccordionPanel>
                            <AccordionPanel header="Title 2" contentStyle={{ padding: 20 }}>
                                {this.loremIpsum().substring(0, 300)}
                            </AccordionPanel>
                            <AccordionPanel header="Title 3" disabled></AccordionPanel>
                        </Accordion>
                    </Panel>
                    <TabPane activeTabIndex={0} renderActiveTabOnly style={{ flex: 1 }}>
                        <TabPanel title="Panel 1" contentStyle={{padding:"10px"}} scheme={this.state.previewScheme}>
                            <InputText placeholder="Placeholder" label={<label>Last name <span style={{color: "red"}}>*</span></label>} 
                                scheme={this.state.previewScheme}/>
                            <div style={{ display: "flex", marginTop: 20 }}>
                                <Checkbox scheme={this.state.previewScheme} label="Checked"/>
                                <Dropdown scheme={this.state.previewScheme} options={this.dropDownOptions} selectedOptionIndex={0} style={{ marginLeft: 20 }}/>
                            </div>
                            <Message icon={"fa fa-circle"} scheme={this.state.previewScheme} description={"Sample Message description"} fill sticky/>
                            <Fieldset legend="Legend" scheme={this.state.previewScheme} expanded collapsible style={{ marginTop: 30 }}>
                                <div style={{ display: "flex", alignItems: "flex-end" }}>
                                    <InputText style={{marginTop: "10px"}} scheme={this.state.previewScheme} label="First name" alignLabel={Alignment.TOP} floatLabel flushed outlined/>
                                    <FileInput scheme={this.state.previewScheme} previewItemScheme={this.state.previewScheme}
                                        previewItemStyle={{ borderRadius: "100px" }}
                                        defaultFileUrl={"https://i1.sndcdn.com/artworks-dPQoalo9P0AVBekC-3l4WaQ-t500x500.jpg"}
                                        fileExtensions={["png", "jpg", "jpeg"]}
                                        label={"Select"}
                                        previewType={FilePreviewType.IMAGE} multiple noBorder/>
                                    <TextArea scheme={this.state.previewScheme} placeholder="Scheme.PRIMARY" style={{ marginLeft: 20 }}/>
                                </div>
                                {this.loremIpsum()}
                            </Fieldset>
                        </TabPanel>
                        <TabPanel disabled title="Panel 2" contentStyle={{padding:"10px"}} scheme={this.state.previewScheme}>
                        </TabPanel>
                        <TabPanel disabled title="Panel 3" contentStyle={{padding:"10px"}} scheme={this.state.previewScheme}>
                        </TabPanel>
                    </TabPane>
                </div>
            </Panel>
        )
    }

    render() {
        return (
            <LinearLayout orientation={Orientation.VERTICAL} className="landing" style={{ width: "100%" }}>
                <Panel contentClassName="landing-hero" style={{ width: "100%", backgroundColor: "rgba(54, 153, 255, 0.1)", margin: 0 }}>
                    <Panel contentClassName="landing-hero-text-panel" style={{ backgroundColor: "inherit", display: "flex", justifyContent: "center", flexDirection: "column" }}>
                        <span style={{ fontWeight: "bold", fontSize: "30px" }}>Say hello to <span style={{ color: "#3699FF" }}>norseu</span> React UI <br/>Framework</span>
                        <span style={{ marginTop: 15 }}>
                            A collection of simple, customizable and accessible react components library for building ambitious web applications.
                            Brought to you by <a href="https://ronuse.com" target="_blank">Ronuse</a>.
                        </span>
                        <Button scheme={Scheme.PRIMARY} text="Get Started" rightIcon="fa fa-arrow-right" style={{ marginLeft: 0, marginTop: 30 }} href="/#/site/introduction"/>
                    </Panel>

                    <ResizeSensor minDimension={{ width: 1180 }}>
                        <div style={{ marginLeft: "7rem", position: "relative" }}>
                            <div style={{ height: 400, width: 500, position: "absolute", display: "flex", flexWrap: "wrap", padding: 30 }}>
                                <div className="landing-hero-card" style={{ opacity: 0.4, marginTop: 50, marginLeft: 30 }}></div>
                                <div className="landing-hero-card" style={{ opacity: 0.4, marginTop: 50, marginLeft: 30 }}></div>
                                <div className="landing-hero-card" style={{ opacity: 0.4, marginTop: 0, marginLeft: 30 }}></div>
                                <div className="landing-hero-card" style={{ opacity: 0.4, marginTop: 0, marginLeft: 30 }}></div>
                            </div>
                            <Panel contentClassName="landing-hero-cards" style={{ backgroundColor: "transparent", position: "relative" }}>
                                {this.buildLandingHeroCard("Schemes", "Design ready schemes",
                                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_903_262)">
                                            <path d="M26.475 19.0556L29.6906 20.6644C30.1031 20.8706 30.1031 21.4594 29.6906 21.6656L15.5006 28.7625C15.3451 28.8401 15.1738 28.8805 15 28.8805C14.8262 28.8805 14.6549 28.8401 14.4994 28.7625L0.309376 21.6656C0.216679 21.6189 0.138775 21.5474 0.0843434 21.459C0.0299118 21.3706 0.0010904 21.2688 0.0010904 21.165C0.0010904 21.0612 0.0299118 20.9594 0.0843434 20.871C0.138775 20.7826 0.216679 20.7111 0.309376 20.6644L3.52688 19.0556L13.4963 24.0412C14.4431 24.5137 15.5588 24.5137 16.5038 24.0412L26.4731 19.0537L26.475 19.0556ZM14.4994 0.11812C14.6549 0.0405375 14.8262 0.000152588 15 0.000152588C15.1738 0.000152588 15.3451 0.0405375 15.5006 0.11812L29.6906 7.21312C29.7833 7.26014 29.861 7.3319 29.9154 7.42043C29.9697 7.50896 29.9985 7.61081 29.9985 7.71468C29.9985 7.81856 29.9697 7.92041 29.9154 8.00894C29.861 8.09747 29.7833 8.16922 29.6906 8.21625L15.5006 15.3094C15.3451 15.387 15.1738 15.4273 15 15.4273C14.8262 15.4273 14.6549 15.387 14.4994 15.3094L0.309376 8.21625C0.216188 8.16971 0.137807 8.09813 0.0830238 8.00954C0.0282406 7.92095 -0.000778198 7.81884 -0.000778198 7.71468C-0.000778198 7.61052 0.0282406 7.50842 0.0830238 7.41983C0.137807 7.33123 0.216188 7.25966 0.309376 7.21312L14.4994 0.11812Z" fill="#666363"/>
                                            <path d="M26.475 12.33L29.6906 13.9388C30.1031 14.145 30.1031 14.7338 29.6906 14.94L15.5006 22.035C15.3451 22.1126 15.1738 22.153 15 22.153C14.8262 22.153 14.6549 22.1126 14.4994 22.035L0.309377 14.94C0.21668 14.8933 0.138776 14.8217 0.084344 14.7333C0.0299124 14.645 0.001091 14.5432 0.001091 14.4394C0.001091 14.3356 0.0299124 14.2338 0.084344 14.1454C0.138776 14.057 0.21668 13.9855 0.309377 13.9388L3.52688 12.33L13.4963 17.3156C14.4431 17.7881 15.5588 17.7881 16.5038 17.3156L26.4731 12.33H26.475Z" fill="#666363"/>
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_903_262">
                                            <rect width="30" height="30" fill="white"/>
                                            </clipPath>
                                        </defs>
                                    </svg>,
                                    "/#/schemes/",                         
                                    { marginRight: 10 }
                                )}
                                <div>
                                    {this.buildLandingHeroCard("Theming", "Create your scheme",
                                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M9.375 2.49999C7.1375 3.93749 5.625 6.47499 5.625 9.37499C5.625 12.275 7.1375 14.8125 9.4125 16.25C5.575 16.25 2.5 13.175 2.5 9.37499C2.5 7.55163 3.22433 5.80295 4.51364 4.51363C5.80295 3.22432 7.55164 2.49999 9.375 2.49999V2.49999ZM23.8375 4.37499L25.625 6.16249L6.1625 25.625L4.375 23.8375L23.8375 4.37499ZM16.1125 7.41249L14.2625 6.24999L12.4625 7.49999L12.9875 5.37499L11.25 4.04999L13.4375 3.89999L14.1625 1.83749L15 3.87499L17.1625 3.91249L15.475 5.32499L16.1125 7.41249ZM11.9875 11.925L10.5375 11.0125L9.1375 11.9875L9.5625 10.3375L8.2 9.29999L9.9 9.18749L10.4625 7.57499L11.1 9.16249L12.8 9.19999L11.4875 10.2875L11.9875 11.925V11.925ZM23.75 16.875C23.75 18.6984 23.0257 20.447 21.7364 21.7364C20.447 23.0257 18.6984 23.75 16.875 23.75C15.35 23.75 13.9375 23.25 12.8 22.4125L22.4125 12.8C23.25 13.9375 23.75 15.35 23.75 16.875V16.875ZM18.25 25.1L21.7125 23.6625L21.4125 27.85L18.25 25.1V25.1ZM23.6625 21.725L25.1 18.2625L27.85 21.4375L23.6625 21.725V21.725ZM25.1 15.525L23.675 12.05L27.85 12.35L25.1 15.525ZM12.0375 23.6625L15.5 25.1L12.3375 27.8375L12.0375 23.6625Z" fill="#666363"/>
                                        </svg>,
                                        "/#/site/theming"
                                    )}
                                    {this.buildLandingHeroCard("Components", "30+ UI Components",
                                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M4.44125 23.6187L9.44125 26.1187C9.61478 26.2053 9.80606 26.2504 10 26.2504C10.1939 26.2504 10.3852 26.2053 10.5588 26.1187L15 23.8975L19.4413 26.1175C19.6144 26.2053 19.8057 26.2512 19.9999 26.2514C20.194 26.2517 20.3854 26.2062 20.5588 26.1187L25.5588 23.6187C25.9825 23.4062 26.25 22.9737 26.25 22.5V16.25C26.25 15.7762 25.9825 15.3437 25.5588 15.1312L21.25 12.9775V7.49999C21.25 7.02624 20.9825 6.59374 20.5588 6.38124L15.5587 3.88124C15.3851 3.79434 15.1936 3.7491 14.9994 3.7491C14.8052 3.7491 14.6137 3.79434 14.44 3.88124L9.44 6.38124C9.0175 6.59374 8.75 7.02624 8.75 7.49999V12.9775L4.44125 15.1325C4.23347 15.236 4.05869 15.3954 3.93657 15.5929C3.81445 15.7903 3.74984 16.0179 3.75 16.25V22.5C3.75 22.9737 4.0175 23.4062 4.44125 23.6187ZM10 15.1475L12.83 16.5625L9.18875 18.3837L6.35875 16.9687L10 15.1475ZM15 12.0225L18.75 10.1475V12.9775L15 14.8525V12.0225ZM22.83 16.5625L19.2275 18.3637L16.3975 16.9487L20 15.1475L22.83 16.5625ZM10 23.6025L9.9225 23.5637V20.8125L13.75 18.8975V21.7275L10 23.6025ZM20 23.6025V20.7725L23.75 18.8975V21.7275L20 23.6025ZM15 6.39749L17.83 7.81249L14.2275 9.61374L11.3975 8.19874L15 6.39749Z" fill="#666363"/>
                                        </svg>,
                                        "/#/components/"
                                    )}
                                    {this.buildLandingHeroCard("Font Awesome", "Font Awesome 5 Compatible",
                                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M26.6384 0H3.36164C1.51992 0 0 1.52004 0 3.36164V26.6384C0 28.4801 1.52004 30 3.36164 30H26.6384C28.4801 30 30 28.48 30 26.6384V3.36164C30 1.51992 28.48 0 26.6384 0ZM23.5982 19.0379C23.5982 19.3192 23.3571 19.4398 23.0759 19.5602C21.9575 20.0425 20.7589 20.4777 19.4732 20.4777C17.6719 20.4777 16.8348 19.3594 14.6719 19.3594C13.1116 19.3594 11.471 19.9219 10.1518 20.5179C10.0714 20.5581 9.99105 20.5581 9.91066 20.5982V23.6384C9.91066 23.7589 9.91066 23.8794 9.87059 23.9598V24.0402C9.7098 24.6027 9.1875 24.9977 8.59149 24.9977C7.83481 24.9977 7.23211 24.395 7.23211 23.6384V9C6.70981 8.59816 6.35496 7.96207 6.35496 7.23879C6.35496 6 7.3527 4.99559 8.59816 4.99559C9.83707 4.99559 10.8415 5.99332 10.8415 7.23879C10.8415 7.96207 10.52 8.59816 9.96434 9V10.2388C10.0848 10.1987 10.2054 10.1585 10.3259 10.0781C11.5648 9.55582 13.0446 9.12059 14.4442 9.12059C15.9643 9.12059 17.1629 9.5223 18.5223 10.0379C18.8036 10.1585 19.0848 10.1987 19.3996 10.1987C20.9196 10.1987 22.6004 9.12059 23.0023 9.12059C23.3237 9.12059 23.605 9.36164 23.605 9.64289V19.0379H23.5982Z" fill="#339AF0"/>
                                        </svg>,
                                        "https://fontawesome.com/"                                               
                                    )}
                                </div>
                                {this.buildLandingHeroCard("Open Source", "Open to contribution",
                                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M10.9762 9.10124C11.0634 9.01408 11.1326 8.9106 11.1797 8.79671C11.2269 8.68283 11.2512 8.56076 11.2512 8.43749C11.2512 8.31422 11.2269 8.19216 11.1797 8.07827C11.1326 7.96439 11.0634 7.86091 10.9762 7.77374C10.8891 7.68658 10.7856 7.61744 10.6717 7.57026C10.5578 7.52309 10.4358 7.49881 10.3125 7.49881C10.1892 7.49881 10.0672 7.52309 9.95328 7.57026C9.83939 7.61744 9.73591 7.68658 9.64875 7.77374L3.08625 14.3362C2.99894 14.4233 2.92967 14.5268 2.88241 14.6407C2.83515 14.7546 2.81082 14.8767 2.81082 15C2.81082 15.1233 2.83515 15.2454 2.88241 15.3593C2.92967 15.4732 2.99894 15.5767 3.08625 15.6637L9.64875 22.2262C9.82478 22.4023 10.0635 22.5012 10.3125 22.5012C10.5615 22.5012 10.8002 22.4023 10.9762 22.2262C11.1523 22.0502 11.2512 21.8114 11.2512 21.5625C11.2512 21.3135 11.1523 21.0748 10.9762 20.8987L5.07562 15L10.9762 9.10124ZM19.0237 9.10124C18.8477 8.92521 18.7488 8.68645 18.7488 8.43749C18.7488 8.18854 18.8477 7.94978 19.0237 7.77374C19.1998 7.59771 19.4385 7.49881 19.6875 7.49881C19.9365 7.49881 20.1752 7.59771 20.3512 7.77374L26.9137 14.3362C27.0011 14.4233 27.0703 14.5268 27.1176 14.6407C27.1648 14.7546 27.1892 14.8767 27.1892 15C27.1892 15.1233 27.1648 15.2454 27.1176 15.3593C27.0703 15.4732 27.0011 15.5767 26.9137 15.6637L20.3512 22.2262C20.1752 22.4023 19.9365 22.5012 19.6875 22.5012C19.4385 22.5012 19.1998 22.4023 19.0237 22.2262C18.8477 22.0502 18.7488 21.8114 18.7488 21.5625C18.7488 21.3135 18.8477 21.0748 19.0237 20.8987L24.9244 15L19.0237 9.10124Z" fill="#666363"/>
                                    </svg>,
                                    "https://github.com/ronuse/norseu",
                                    { marginLeft: 10 }
                                )}
                            </Panel>
                        </div>
                    </ResizeSensor>
                </Panel>

                <Panel style={{ marginTop: "50px", display: "flex", justifyContent: "center" }} contentClassName="max-width-1500px features-panel-content">
                    {this.buildFeatureCard(<svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="30" cy="30" r="30" fill="#3699FF"/>
                            <path d="M30 18.75C33.125 18.75 35.7812 19.8438 37.9688 22.0312C40.1562 24.2188 41.25 26.875 41.25 30H38.75C38.75 27.5625 37.9008 25.4946 36.2025 23.7963C34.505 22.0988 32.4375 21.25 30 21.25C28.5625 21.25 27.2188 21.5833 25.9687 22.25C24.7187 22.9167 23.6667 23.8333 22.8125 25H26.25V27.5H18.75V20H21.25V22.9375C22.3125 21.6042 23.6096 20.5729 25.1412 19.8438C26.6721 19.1146 28.2917 18.75 30 18.75ZM28.75 23.75H31.25V29.5L33 31.25L31.6875 33.4375L28.75 30.5V23.75ZM18.8125 31.25H21.375C21.625 33.1875 22.4221 34.8283 23.7663 36.1725C25.1096 37.5158 26.7188 38.3333 28.5938 38.625L30.0938 41.25C27.2188 41.25 24.6979 40.2967 22.5312 38.39C20.3646 36.4842 19.125 34.1042 18.8125 31.25ZM37.4688 45L37.0938 43.125C36.8437 43.0208 36.6096 42.9117 36.3913 42.7975C36.1721 42.6825 35.9479 42.5417 35.7188 42.375L33.9062 42.9375L32.6562 40.8125L34.0938 39.5625C34.0521 39.2917 34.0312 39.0208 34.0312 38.75C34.0312 38.4792 34.0521 38.2083 34.0938 37.9375L32.6562 36.6875L33.9062 34.5625L35.7188 35.125C35.9479 34.9583 36.1721 34.8175 36.3913 34.7025C36.6096 34.5883 36.8437 34.4792 37.0938 34.375L37.4688 32.5H39.9688L40.3438 34.375C40.5938 34.4792 40.8333 34.5987 41.0625 34.7337C41.2917 34.8696 41.5104 35.0208 41.7188 35.1875L43.5312 34.5625L44.7812 36.75L43.3438 38C43.3854 38.2708 43.4062 38.5312 43.4062 38.7812C43.4062 39.0312 43.3854 39.2917 43.3438 39.5625L44.7812 40.8125L43.5312 42.9375L41.7188 42.375C41.4896 42.5417 41.2658 42.6825 41.0475 42.7975C40.8283 42.9117 40.5938 43.0208 40.3438 43.125L39.9688 45H37.4688ZM38.7188 41.25C39.4062 41.25 39.995 41.0054 40.485 40.5163C40.9742 40.0263 41.2188 39.4375 41.2188 38.75C41.2188 38.0625 40.9742 37.4737 40.485 36.9837C39.995 36.4946 39.4062 36.25 38.7188 36.25C38.0312 36.25 37.4425 36.4946 36.9525 36.9837C36.4633 37.4737 36.2188 38.0625 36.2188 38.75C36.2188 39.4375 36.4633 40.0263 36.9525 40.5163C37.4425 41.0054 38.0312 41.25 38.7188 41.25Z" fill="white"/>
                        </svg>, "Managed",
                        "Some component logic are internally managed for you so you can concentrate on designing your web application."
                    )}
                    {this.buildFeatureCard(<svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="30" cy="30" r="30" fill="#3699FF"/>
                            <g clip-path="url(#clip0_909_181)">
                                <path d="M32.6344 16.9687C31.86 14.3437 28.14 14.3437 27.3656 16.9687L27.1781 17.6063C27.0624 17.9992 26.8602 18.3613 26.5864 18.666C26.3125 18.9707 25.9739 19.2102 25.5954 19.367C25.2169 19.5238 24.8082 19.5939 24.3991 19.5721C23.99 19.5503 23.591 19.4373 23.2312 19.2413L22.65 18.9225C20.2444 17.6137 17.6137 20.2444 18.9244 22.6481L19.2413 23.2312C20.0775 24.7688 19.2844 26.6831 17.6063 27.1781L16.9687 27.3656C14.3437 28.14 14.3437 31.86 16.9687 32.6344L17.6063 32.8219C17.9992 32.9376 18.3613 33.1398 18.666 33.4136C18.9707 33.6875 19.2102 34.0261 19.367 34.4046C19.5238 34.7831 19.5939 35.1918 19.5721 35.6009C19.5503 36.01 19.4373 36.409 19.2413 36.7687L18.9225 37.35C17.6137 39.7556 20.2444 42.3862 22.6481 41.0756L23.2312 40.7587C23.591 40.5627 23.99 40.4497 24.3991 40.4279C24.8082 40.4061 25.2169 40.4762 25.5954 40.633C25.9739 40.7898 26.3125 41.0293 26.5864 41.334C26.8602 41.6387 27.0624 42.0008 27.1781 42.3937L27.3656 43.0312C28.14 45.6562 31.86 45.6562 32.6344 43.0312L32.8219 42.3937C32.9376 42.0008 33.1398 41.6387 33.4136 41.334C33.6875 41.0293 34.0261 40.7898 34.4046 40.633C34.7831 40.4762 35.1918 40.4061 35.6009 40.4279C36.01 40.4497 36.409 40.5627 36.7687 40.7587L37.35 41.0775C39.7556 42.3862 42.3862 39.7556 41.0756 37.3519L40.7587 36.7687C40.5627 36.409 40.4497 36.01 40.4279 35.6009C40.4061 35.1918 40.4762 34.7831 40.633 34.4046C40.7898 34.0261 41.0293 33.6875 41.334 33.4136C41.6387 33.1398 42.0008 32.9376 42.3937 32.8219L43.0312 32.6344C45.6562 31.86 45.6562 28.14 43.0312 27.3656L42.3937 27.1781C42.0008 27.0624 41.6387 26.8602 41.334 26.5864C41.0293 26.3125 40.7898 25.9739 40.633 25.5954C40.4762 25.2169 40.4061 24.8082 40.4279 24.3991C40.4497 23.99 40.5627 23.591 40.7587 23.2312L41.0775 22.65C42.3862 20.2444 39.7556 17.6137 37.3519 18.9244L36.7687 19.2413C36.409 19.4373 36.01 19.5503 35.6009 19.5721C35.1918 19.5939 34.7831 19.5238 34.4046 19.367C34.0261 19.2102 33.6875 18.9707 33.4136 18.666C33.1398 18.3613 32.9376 17.9992 32.8219 17.6063L32.6344 16.9687ZM30 35.4938C28.543 35.4938 27.1456 34.9149 26.1153 33.8847C25.0851 32.8544 24.5063 31.457 24.5063 30C24.5063 28.543 25.0851 27.1456 26.1153 26.1153C27.1456 25.0851 28.543 24.5063 30 24.5063C31.4565 24.5063 32.8534 25.0849 33.8833 26.1148C34.9133 27.1447 35.4919 28.5416 35.4919 29.9981C35.4919 31.4547 34.9133 32.8515 33.8833 33.8815C32.8534 34.9114 31.4565 35.49 30 35.49V35.4938Z" fill="white"/>
                            </g>
                            <defs>
                                <clipPath id="clip0_909_181">
                                <rect width="30" height="30" fill="white" transform="translate(15 15)"/>
                                </clipPath>
                            </defs>
                        </svg>, "Composable and flexible",
                        "Components are built in such a way you can use a component or multiple component to create new UI elements."
                    )}
                    {this.buildFeatureCard(<svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="30" cy="30" r="30" fill="#3699FF"/>
                            <path d="M41.25 28.75H39.375V28.125H36.875V31.875H39.375V31.25H41.25V32.5C41.25 33.1875 40.6875 33.75 40 33.75H36.25C35.5625 33.75 35 33.1875 35 32.5V27.5C35 26.8125 35.5625 26.25 36.25 26.25H40C40.6875 26.25 41.25 26.8125 41.25 27.5V28.75ZM25 27.5V33.75H23.125V31.875H20.625V33.75H18.75V27.5C18.75 26.8125 19.3125 26.25 20 26.25H23.75C24.4375 26.25 25 26.8125 25 27.5ZM23.125 28.125H20.625V30H23.125V28.125ZM31.875 30C32.5625 30 33.125 30.5625 33.125 31.25V32.5C33.125 33.1875 32.5625 33.75 31.875 33.75H26.875V26.25H31.875C32.5625 26.25 33.125 26.8125 33.125 27.5V28.75C33.125 29.4375 32.5625 30 31.875 30ZM28.75 28.125V29.0625H31.25V28.125H28.75ZM31.25 30.9375H28.75V31.875H31.25V30.9375Z" fill="white"/>
                        </svg>, "Easy to use",
                        "norseu concentrate on ease of use, simply import a component and start using with no need for extensive setup."
                    )}
                    {this.buildFeatureCard(<svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="30" cy="30" r="30" fill="#3699FF"/>
                            <path d="M24.375 28.125C25.4105 28.125 26.25 27.2855 26.25 26.25C26.25 25.2145 25.4105 24.375 24.375 24.375C23.3395 24.375 22.5 25.2145 22.5 26.25C22.5 27.2855 23.3395 28.125 24.375 28.125Z" fill="white"/>
                            <path d="M30 25.3125C31.0355 25.3125 31.875 24.473 31.875 23.4375C31.875 22.402 31.0355 21.5625 30 21.5625C28.9645 21.5625 28.125 22.402 28.125 23.4375C28.125 24.473 28.9645 25.3125 30 25.3125Z" fill="white"/>
                            <path d="M35.625 28.125C36.6605 28.125 37.5 27.2855 37.5 26.25C37.5 25.2145 36.6605 24.375 35.625 24.375C34.5895 24.375 33.75 25.2145 33.75 26.25C33.75 27.2855 34.5895 28.125 35.625 28.125Z" fill="white"/>
                            <path d="M36.5625 33.75C37.598 33.75 38.4375 32.9105 38.4375 31.875C38.4375 30.8395 37.598 30 36.5625 30C35.527 30 34.6875 30.8395 34.6875 31.875C34.6875 32.9105 35.527 33.75 36.5625 33.75Z" fill="white"/>
                            <path d="M32.8125 38.4375C33.848 38.4375 34.6875 37.598 34.6875 36.5625C34.6875 35.527 33.848 34.6875 32.8125 34.6875C31.777 34.6875 30.9375 35.527 30.9375 36.5625C30.9375 37.598 31.777 38.4375 32.8125 38.4375Z" fill="white"/>
                            <path d="M30.5063 16.875C28.7405 16.8068 26.9792 17.0959 25.3279 17.7249C23.6766 18.354 22.1694 19.3099 20.8965 20.5356C19.6236 21.7612 18.6112 23.2312 17.9202 24.8575C17.2292 26.4839 16.8737 28.233 16.875 30C16.875 30.695 17.0352 31.3806 17.3433 32.0036C17.6514 32.6265 18.0991 33.17 18.6515 33.5918C19.2038 34.0136 19.8461 34.3023 20.5282 34.4354C21.2103 34.5685 21.9139 34.5425 22.5844 34.3594L23.6344 34.0688C24.0521 33.9547 24.4905 33.9387 24.9154 34.0219C25.3403 34.1051 25.7403 34.2852 26.0841 34.5484C26.428 34.8115 26.7065 35.1504 26.8978 35.5388C27.0892 35.9272 27.1884 36.3545 27.1875 36.7875V40.3125C27.1875 41.0584 27.4838 41.7738 28.0113 42.3012C28.5387 42.8287 29.2541 43.125 30 43.125C31.767 43.1263 33.5162 42.7708 35.1425 42.0798C36.7688 41.3888 38.2388 40.3765 39.4645 39.1036C40.6901 37.8307 41.6461 36.3234 42.2751 34.6721C42.9041 33.0208 43.1932 31.2595 43.125 29.4938C42.989 26.1906 41.6158 23.0594 39.2782 20.7218C36.9406 18.3842 33.8094 17.011 30.5063 16.875ZM38.1094 37.7906C37.0626 38.8866 35.804 39.7584 34.4099 40.3531C33.0159 40.9478 31.5156 41.2529 30 41.25C29.7514 41.25 29.5129 41.1512 29.3371 40.9754C29.1613 40.7996 29.0625 40.5611 29.0625 40.3125V36.7875C29.0625 35.5443 28.5686 34.352 27.6896 33.4729C26.8105 32.5939 25.6182 32.1 24.375 32.1C23.9537 32.1007 23.5344 32.1575 23.1281 32.2688L22.0781 32.5594C21.686 32.6645 21.2748 32.6778 20.8767 32.5984C20.4785 32.519 20.104 32.349 19.7821 32.1015C19.4603 31.854 19.1997 31.5356 19.0208 31.1712C18.8418 30.8068 18.7491 30.406 18.75 30C18.7488 28.4848 19.0538 26.985 19.6465 25.5905C20.2392 24.1961 21.1075 22.9358 22.1993 21.8851C23.2911 20.8345 24.5838 20.0152 26 19.4765C27.4162 18.9378 28.9266 18.6907 30.4406 18.75C33.2599 18.8968 35.9248 20.0828 37.921 22.079C39.9172 24.0752 41.1032 26.7401 41.25 29.5594C41.3145 31.0743 41.0693 32.5866 40.5293 34.0035C39.9893 35.4204 39.1658 36.7123 38.1094 37.8V37.7906Z" fill="white"/>
                        </svg>, "Schemability",
                        "Easily Generate scheme for your web application or for a component. Reference your scheme value on any component."
                    )}
                    {this.buildFeatureCard(<svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="30" cy="30" r="30" fill="#3699FF"/>
                            <path d="M30 30C33.4518 30 36.25 27.2018 36.25 23.75C36.25 20.2982 33.4518 17.5 30 17.5C26.5482 17.5 23.75 20.2982 23.75 23.75C23.75 27.2018 26.5482 30 30 30Z" stroke="white" stroke-width="2.5"/>
                            <path d="M35 35L37.8125 37.5L42.5 32.5M36.25 42.5H21.5825C21.228 42.5001 20.8775 42.4248 20.5543 42.279C20.2311 42.1333 19.9426 41.9205 19.708 41.6547C19.4733 41.389 19.2979 41.0764 19.1933 40.7376C19.0887 40.3989 19.0573 40.0418 19.1012 39.69L19.5887 35.785C19.7021 34.8778 20.143 34.0432 20.8285 33.4383C21.5141 32.8333 22.397 32.4996 23.3112 32.5H23.75L36.25 42.5Z" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>, "Accessibility",
                        "All the component are built with proper attribute and improving. The WAI-ARIA standards is followed to ensure accessibility."
                    )}
                    {this.buildFeatureCard(<svg width="60" height="60" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="30" cy="30" r="30" fill="#3699FF"/>
                            <path d="M28.125 31.25H19.375C19 31.25 18.75 31.5 18.75 31.875V40.625C18.75 41 19 41.25 19.375 41.25H28.125C28.5 41.25 28.75 41 28.75 40.625V31.875C28.75 31.5 28.5 31.25 28.125 31.25ZM27.5 40H20V32.5H27.5V40ZM28.125 18.75H19.375C19 18.75 18.75 19 18.75 19.375V28.125C18.75 28.5 19 28.75 19.375 28.75H28.125C28.5 28.75 28.75 28.5 28.75 28.125V19.375C28.75 19 28.5 18.75 28.125 18.75ZM27.5 27.5H20V20H27.5V27.5ZM40.625 18.75H31.875C31.5 18.75 31.25 19 31.25 19.375V28.125C31.25 28.5 31.5 28.75 31.875 28.75H40.625C41 28.75 41.25 28.5 41.25 28.125V19.375C41.25 19 41 18.75 40.625 18.75ZM40 27.5H32.5V20H40V27.5ZM40.625 35.625H36.875V31.875C36.875 31.5 36.625 31.25 36.25 31.25C35.875 31.25 35.625 31.5 35.625 31.875V35.625H31.875C31.5 35.625 31.25 35.875 31.25 36.25C31.25 36.625 31.5 36.875 31.875 36.875H35.625V40.625C35.625 41 35.875 41.25 36.25 41.25C36.625 41.25 36.875 41 36.875 40.625V36.875H40.625C41 36.875 41.25 36.625 41.25 36.25C41.25 35.875 41 35.625 40.625 35.625Z" fill="white"/>
                        </svg>, "Component Creator",
                        "Generate a ready to use component from the website and simply copy and paste in your project."
                    )}
                </Panel>

                <Panel style={{ marginTop: "50px", display: "flex", justifyContent: "center" }} contentClassName="max-width-1500px scheme-preview-panel">
                    <span style={{ fontSize: 30, fontWeight: "bold" }}>Schemes</span>
                    <span style={{ textAlign: "center" }}>
                        norseu support six scheme out of the box, you can customize your project with the available schemes
                        <br/>Click a scheme button below for preview
                    </span>
                    <ButtonGroup style={{ marginTop: 30 }}>
                        <Button scheme={Scheme.PRIMARY} text="Primary" onClick={() => this.setState({ previewScheme: Scheme.PRIMARY })}/>
                        <Button scheme={Scheme.SECONDARY} text="Secondary" onClick={() => this.setState({ previewScheme: Scheme.SECONDARY })}/>
                        <Button scheme={Scheme.SUCCESS} text="Success" onClick={() => this.setState({ previewScheme: Scheme.SUCCESS })}/>
                        <Button scheme={Scheme.INFO} text="Info" onClick={() => this.setState({ previewScheme: Scheme.INFO })}/>
                        <Button scheme={Scheme.WARNING} text="Warning" onClick={() => this.setState({ previewScheme: Scheme.WARNING })}/>
                        <Button scheme={Scheme.DANGER} text="Danger" onClick={() => this.setState({ previewScheme: Scheme.DANGER })}/>
                    </ButtonGroup>
                    <Panel>
                        {this.buildPreviewComponentss()}
                    </Panel>
                </Panel>

                <Panel style={{ marginTop: "70px", display: "flex", justifyContent: "center" }} contentClassName="max-width-1500px scheme-preview-panel">
                    <span style={{ fontSize: 30, fontWeight: "bold" }}>Used by</span>
                    <Panel style={{ marginTop: 40, marginBottom: 0 }} contentClassName="used-by-panel">
                        {CompaniesUsingNorseu.map(company_icon => {
                            return (
                                <div className="used-by-card">
                                    <img src={company_icon}/>
                                </div>
                            )
                        })}
                    </Panel>
                    <Link style={{ fontSize: 20 }} to="/used_by">View more</Link>
                </Panel>

                <Panel style={{ marginTop: "70px", display: "flex", justifyContent: "center" }} contentClassName="max-width-1500px scheme-preview-panel">
                    <span style={{ fontSize: 30, fontWeight: "bold" }}>Resources</span>
                    <Panel style={{ marginTop: 40, marginBottom: 0 }} contentClassName="used-by-panel">
                        <div style={{ display: "flex", width: "60vw" }}>
                            <Button scheme={Scheme.PRIMARY} text="Ronuse Figma Library" style={{ flex: 1, margin: 20, fontSize: 13, height: 30 }}
                                icon={<img style={{ width: 30 }} src="https://avatars.githubusercontent.com/u/69908664"/>}
                                href="https://www.linkedin.com/company/ronuse"/>
                            <Button scheme={Scheme.PRIMARY} text="Schemes" icon="fa fa-list" style={{ flex: 1, margin: 20, height: 30 }}
                                href="/#/schemes/"/>
                        </div>
                        <div style={{ display: "flex", width: "60vw" }}>
                            <Button scheme={Scheme.PRIMARY} text="Component Creator" icon="fa fa-plus-square" style={{ flex: 1, margin: 20, height: 30 }}
                                href="/#/site/creator"/>
                            <Button scheme={Scheme.PRIMARY} text="Ronuse Brands" style={{ flex: 1, margin: 20, fontSize: 13, height: 30 }}
                                icon={<img style={{ width: 30 }} src="https://avatars.githubusercontent.com/u/69908664"/>}
                                href="https://ronuse.com/brand"/>
                        </div>
                    </Panel>
                </Panel>
            </LinearLayout>
        )
    }
}
