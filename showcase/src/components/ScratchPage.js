
import React from "react"
import { Button } from 'ronuse-react-ui/core/buttons'

export class ScratchPage extends React.Component {

    state = {

    }

    render() {
        var icon = this.state.buttonIcon ? this.state.buttonIcon : "fa fa-plus";
        return (
            <div style={{margin:"20px"}}>
                <h2>Panel Flex Box</h2>

                <Button icon={icon} onClick={(e)=> {
                    this.setState({buttonIcon: icon === "fa fa-plus" ? "fa fa-minus" : "fa fa-plus"});
                }} rounded textonly/>

                <div class="card" style={{width:"150px", height:"200px"}}> 
                    <div class="card__image r-r-loading" style={{marginTop:"10px", width:"150px", height:"100px"}}></div> 
                    <div class="card__title r-r-loading" style={{marginTop:"10px", width:"50px", height:"20px"}}></div> 
                    <div class="card__description r-r-loading" style={{marginTop:"10px", width:"130px", height:"30px"}}></div> 
                </div> 

                <div class="r-r-panel">
                    <div className="r-r-panel-title">
                        <span className="r-r-panel-title-text">Panel Title 1</span>

                        <Button rounded textonly icon={icon} onClick={(e)=> {
                            this.setState({buttonIcon: icon === "fa fa-plus" ? "fa fa-minus" : "fa fa-plus"});
                        }} />
                    </div>
                    
                    <div class="r-r-panel-content skeleton">
                        foldable Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
                cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
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
