
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

                <div inputId="" className="r-r-checkbox r-r-primary-border-hover">
                    
                </div>
                <br/>
                <div className="r-r-checkbox">
                    <div tabindex="1" inputId="check1" className="r-r-checkbox-box r-r-primary r-r-primary-border-1px-focus" 
                        aria-checked="false">
                        <i className="fa fa-check" />
                    </div>
                    <label for="check1">I accept terms and conditions</label>
                </div>
                
                <br/>
                <br/>
                <input type="checkbox" id="vehicle1" name="vehicle1" value="Bike"></input>
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
