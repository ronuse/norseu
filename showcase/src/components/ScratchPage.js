
import React from "react"
import { Button } from 'ronuse-react-ui/core/buttons'
import { Panel } from "ronuse-react-ui/core/panels/Panel";
import { Scheme } from "ronuse-react-ui/core/variables";

export class ScratchPage extends React.Component {

    openCity(evt, cityName) {
        var i, tabcontent, tablinks;
        tabcontent = document.getElementsByClassName("r-r-tab-panel");
        for (i = 0; i < tabcontent.length; i++) {
            tabcontent[i].style.display = "none";
        }
        tablinks = document.getElementsByClassName("r-r-tab-button");
        for (i = 0; i < tablinks.length; i++) {
            tablinks[i].className = tablinks[i].className.replace(" active", "");
        }
        console.log(document.getElementById(cityName).type)
        document.getElementById(cityName).style.display = "block";
        evt.currentTarget.className += " active";
        }

    state = {

    }

    render() {
        var icon = this.state.buttonIcon ? this.state.buttonIcon : "fa fa-plus";
        return (
            <div style={{margin:"20px"}}>
                <Panel scheme={Scheme.SKELETON}>
                    <Button text={"Top Button"}/>
                    <p>
                        Hello World Hello World Hello World Hello World,<br/>
                        Hello World Hello World Hello World Hello World,<br/>
                        Hello World Hello World Hello World Hello World,<br/>
                        Hello World Hello World Hello World Hello World, <br/>
                    </p><br/>
                    <Button text={"Button 1"}/>
                    <Button text={"Button 2"}/>
                    <Button text={"Button 3"}/>
                </Panel>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <h2>Panel Flex Box</h2>

                <Button icon={icon} onClick={(e)=> {
                    this.setState({buttonIcon: icon === "fa fa-plus" ? "fa fa-minus" : "fa fa-plus"});
                }} rounded textonly/>

                <div>
                    <Panel style={{borderBottom:"1px solid #D8E1E8"}} borderless>
                        <Button nostyle className="r-r-tab-button" scheme={Scheme.PRIMARY} onClick={(e)=>{ this.openCity(e, 'London')}} icon="fa fa-user" rightIcon="fa fa-search" text="London" textonly/>
                        <Button nostyle className="r-r-tab-button" scheme={Scheme.PRIMARY} onClick={(e)=>{ this.openCity(e, 'Paris')}} icon="fa fa-user" text="Paris" textonly/>
                        <Button nostyle className="r-r-tab-button" scheme={Scheme.PRIMARY} onClick={(e)=>{ this.openCity(e, 'Tokyo')}} icon="fa fa-user" text="Tokyo" textonly/>
                    </Panel>
                    <Panel id="London" className="r-r-tab-panel active" scheme={Scheme.PRIMARY} borderless>
                        <h3>London</h3>
                        <p>London is the capital of England.</p>
                    </Panel>
                    <Panel id="Paris" className="r-r-tab-panel" scheme={Scheme.PRIMARY} borderless>
                        <h3>Paris</h3>
                        <p>Paris is the capital of France.</p> 
                    </Panel>
                    <Panel id="Tokyo" className="r-r-tab-panel" scheme={Scheme.PRIMARY} borderless>
                        <h3>Tokyo</h3>
                        <p>Tokyo is the capital of Japan.</p> 
                    </Panel>
                </div>

                <div style={{display:"flex"}}>
                    <Panel style={{marginRight:"15px"}} borderless>
                        <Button fill nostyle className="r-r-tab-button" scheme={Scheme.PRIMARY} onClick={(e)=>{ this.openCity(e, 'London-1')}} icon="fa fa-user" rightIcon="fa fa-search" text="London" textonly/>
                        <Button fill nostyle className="r-r-tab-button" scheme={Scheme.PRIMARY} onClick={(e)=>{ this.openCity(e, 'Paris-1')}} icon="fa fa-user" text="Paris France" textonly/>
                        <Button fill nostyle className="r-r-tab-button" scheme={Scheme.PRIMARY} onClick={(e)=>{ this.openCity(e, 'Tokyo-1')}} icon="fa fa-user" text="Tokyo" textonly/>
                    </Panel>
                    <Panel id="London-1" className="r-r-tab-panel active" scheme={Scheme.PRIMARY} borderless>
                        <h3>London</h3>
                        <p>London is the capital of England.</p>
                        <p>London is the capital of England.</p>
                        <p>London is the capital of England.</p>
                        <p>London is the capital of England.</p>
                        <p>London is the capital of England.</p>
                        <p>London is the capital of England.</p>
                        <p>London is the capital of England.</p>
                        <p>London is the capital of England.</p>
                        <p>London is the capital of England.</p>
                        <p>London is the capital of England.</p>
                        <p>London is the capital of England.</p>
                        <p>London is the capital of England.</p>
                        <p>London is the capital of England.</p>
                        <p>London is the capital of England.</p>
                    </Panel>
                    <Panel id="Paris-1" className="r-r-tab-panel" scheme={Scheme.PRIMARY} borderless>
                        <h3>Paris</h3>
                        <p>Paris is the capital of France.</p> 
                    </Panel>
                    <Panel id="Tokyo-1" className="r-r-tab-panel" scheme={Scheme.PRIMARY} borderless>
                        <h3>Tokyo</h3>
                        <p>Tokyo is the capital of Japan.</p> 
                    </Panel>
                    <div>
                        if not tabpanel add to button
                    </div>
                </div>
                
                <h2>Flex Box</h2>
                <div class="r-r-flex">
                    {/** <Div class="r-r-div"> Elem 1 </Div> */}
                    <div class="r-r-div r-r-elevation-1"> Elem 1 </div>
                    <div class="r-r-div r-r-elevation-1"> Elem 2 </div>
                    <div class="r-r-div r-r-elevation-1"> Elem 3 </div>
                    <div class="r-r-div r-r-elevation-1"> Elem 4 </div>
                </div>

                <h2>Elevation</h2>
                <div class="r-r-flex">
                    <div style={{width: "100px", height: "100px"}} class="r-r-div r-r-flex-tmp r-r-elevation-1"> Elevation 1 </div>
                    <div style={{width: "100px", height: "100px"}} class="r-r-div r-r-flex-tmp r-r-elevation-2"> Elevation 2 </div>
                    <div style={{width: "100px", height: "100px"}} class="r-r-div r-r-flex-tmp r-r-elevation-3"> Elevation 3 </div>
                    <div style={{width: "100px", height: "100px"}} class="r-r-div r-r-flex-tmp r-r-elevation-4"> Elevation 4 </div>
                    <div style={{width: "100px", height: "100px"}} class="r-r-div r-r-flex-tmp r-r-elevation-5"> Elevation 5 </div>
                    <div style={{width: "100px", height: "100px"}} class="r-r-div r-r-flex-tmp r-r-elevation-6"> Elevation 6 </div>
                    <div style={{width: "100px", height: "100px"}} class="r-r-div r-r-flex-tmp r-r-elevation-7"> Elevation 7 </div>
                    <div style={{width: "100px", height: "100px"}} class="r-r-div r-r-flex-tmp r-r-elevation-8"> Elevation 8 </div>
                    <div style={{width: "100px", height: "100px"}} class="r-r-div r-r-flex-tmp r-r-elevation-9"> Elevation 9 </div>
                    <div style={{width: "100px", height: "100px"}} class="r-r-div r-r-flex-tmp r-r-elevation-10"> Elevation 10 </div>
                    <div style={{width: "100px", height: "100px"}} class="r-r-div r-r-flex-tmp r-r-elevation-11"> Elevation 11 </div>
                    <div style={{width: "100px", height: "100px"}} class="r-r-div r-r-flex-tmp r-r-elevation-12"> Elevation 12 </div>
                    <div style={{width: "100px", height: "100px"}} class="r-r-div r-r-flex-tmp r-r-elevation-13"> Elevation 13 </div>
                </div>
            </div>
        )
    }
}
