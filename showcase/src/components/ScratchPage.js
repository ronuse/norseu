
import React from "react"
import { Button } from 'ronuse-react-ui/core/buttons'
import { Panel } from "ronuse-react-ui/core/panels/Panel";
import { Scheme, Alignment } from "ronuse-react-ui/core/variables";

export class ScratchPage extends React.Component {

    state = {

    }

    removeRippleStylesAndEffect(element) {
        element.style["border-radius"] = '0';
        element.style["background"] = 'rgba(255, 255, 255, 0.0)';
        element.style["top"] = '0px';
        element.style["left"] = '0px';
        element.style["width"] = "100%";
        element.style["height"] = "100%";
        element.classList.remove("r-r-ripple-effect");
    }

    animateRipple(event) {
        let target = event.target;
        let targetParent = event.target.parentNode;

        var positionInfo = target.getBoundingClientRect();
        var posX = positionInfo.left;
        var posY = positionInfo.top;
        var buttonWidth = positionInfo.width;
        var buttonHeight =  positionInfo.height;

        if(buttonWidth >= buttonHeight) {
            buttonHeight = buttonWidth;
        }
        
        var x = event.pageX - posX - buttonWidth / 2;
        var y = event.pageY - posY - buttonHeight / 2;
        
        this.removeRippleStylesAndEffect(target);
        target.style["border-radius"] = '50%';
        target.style["background"] = 'rgba(255, 255, 255, 0.4)';
        console.log(x + "-" + y);
        target.style["width"] = "100px";
        target.style["height"] = "100px";
        target.style["top"] = y + 'px';
        target.style["left"] = x + 'px';
        target.classList.add("r-r-ripple-effect");
        setTimeout(function(remFunc) {
            remFunc(target);
        }, 500, this.removeRippleStylesAndEffect);
    }

    render() {
        var icon = this.state.buttonIcon ? this.state.buttonIcon : "fa fa-plus";
        return (
            <div className="r-r-showcase-component-page">
                <h1>Construct A Component Here</h1>
                
                <div className="r-r-accordion">
                    <div className="r-r-accordion-tab">
                        <Button className="r-r-accordion-tab-header" icon="r-r-accordion-tab-header-icon fa fa-angle-down" 
                                alignText={Alignment.LEFT} 
                                text={"Hello"} 
                        borderless link fill/>

                        <Panel className="r-r-accordion-tab-panel">
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor 
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        </Panel>
                    </div>
                    <hr className="r-r-accordion-divider"/>

                    <div className="r-r-accordion-tab">
                        <div className="r-r-accordion-tab-header">
                            <Button className="r-r-accordion-tab-header-button" icon="r-r-accordion-tab-header-icon fa fa-angle-down" 
                                alignText={Alignment.LEFT} text="Section 2" fill/>
                        </div>
                        <Panel className="r-r-accordion-tab-panel">
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor 
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        </Panel>
                    </div>
                    <hr className="r-r-accordion-divider"/>

                    <div className="r-r-accordion-tab">
                        <div className="r-r-accordion-tab-header">
                            <Button className="r-r-accordion-tab-header-button" icon="r-r-accordion-tab-header-icon fa fa-angle-down" 
                                alignText={Alignment.LEFT} text="Section 3" fill/>
                        </div>
                        <Panel className="r-r-accordion-tab-panel">
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor 
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        </Panel>
                    </div>
                    <hr className="r-r-accordion-divider"/>

                    <div className="r-r-accordion-tab">
                        <div className="r-r-accordion-tab-header">
                            <Button className="r-r-accordion-tab-header-button" icon="r-r-accordion-tab-header-icon fa fa-angle-down" 
                                alignText={Alignment.LEFT} text="Section 4" fill/>
                        </div>
                        <Panel className="r-r-accordion-tab-panel">
                            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor 
                                incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
                                exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                        </Panel>
                    </div>
                </div>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <div onClick={()=>{}} style={{position:"relative",backgroundColor:"black",margin:"20px",color:"white",width:"220px",height:"120px"}}>
                    <span onClick={(e)=>this.animateRipple(e)} className="r-r-ripple r-r-noselect"/>
                </div>
            </div>
        )
    }
}
