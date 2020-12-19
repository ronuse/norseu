
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
                    <input className="r-r-inputtext" placeholder=""/>
                <br/><br/>
                    <input className="r-r-inputtext r-r-dark-border-3px-focus-box-shadow r-r-dark-border-1px-focus r-r-dark-border-1px-hover" 
                    placeholder="Filled"/>
                <br/><br/>
                    <input className="r-r-inputtext r-r-disabled" 
                    placeholder="Disabled"/>
                <br/><br/>
                    <input className="r-r-inputtext r-r-inputtext-flushed
                                    r-r-dark-border-bottom-color-hover r-r-dark-border-bottom-color-focus" 
                    placeholder="Flushed"/>
                <br/><br/>
                    <input className="r-r-inputtext r-r-inputtext-outlined
                                    r-r-dark-border-3px-focus-box-shadow r-r-dark-border-1px-focus r-r-dark-border-1px-hover" 
                    placeholder="Outlined"/>
                <br/><br/>
                    <span style={{position: "relative", display: "inline-flex"}}>
                        <i class="fa fa-spinner fa-spin" style={{position: "absolute", alignSelf: "center", marginLeft: "12px"}}/>
                        <input className="r-r-inputtext r-r-info-border-3px-focus-box-shadow r-r-info-border-1px-focus r-r-info-border-1px-hover" 
                        placeholder="Amount" style={{paddingLeft: "35px"}}/>
                    </span>
                <br/><br/>
                    <span style={{position: "relative", display: "inline-flex"}}>
                        <i class="fa fa-spinner fa-pulse" style={{position: "absolute", alignSelf: "center", right: "12px", color: "#F64E60"}}/>
                        <input className="r-r-inputtext r-r-danger-border-3px-focus-box-shadow r-r-danger-border-1px-focus r-r-danger-border-1px-hover" 
                        placeholder="Amount" style={{paddingRight: "35px"}}/>
                    </span>
                <br/><br/>
                    <span style={{position: "relative", display: "inline-flex"}}>
                        <i class="fa fa-cog fa-spin" style={{position: "absolute", alignSelf: "center", marginLeft: "0px"}}/>
                        <i class="fa fa-spinner fa-pulse" style={{position: "absolute", alignSelf: "center", right: "0px"}}/>
                        <input className="r-r-inputtext r-r-inputtext-flushed r-r-dark-border-bottom-color-hover r-r-dark-border-bottom-color-focus" 
                        placeholder="Amount" style={{paddingLeft: "25px", paddingRight: "25px"}}/>
                    </span>
                <br/><br/>
                    <span>
                        <label hmmltFor="" style={{marginBottom: "7px"}}>Email</label>
                        <input className="r-r-inputtext r-r-dark-border-3px-focus-box-shadow r-r-dark-border-1px-focus r-r-dark-border-1px-hover" 
                        placeholder="Email"/>
                    </span>
                <br/><br/>
                    <span>
                        <input className="r-r-inputtext r-r-dark-border-3px-focus-box-shadow r-r-dark-border-1px-focus r-r-dark-border-1px-hover" 
                        placeholder="Email"/>
                        <br/><small style={{marginTop: "3px"}}>Enter your account email address</small>
                        <br/><label hmmltFor="" style={{marginTop: "7px", display: "inline-block"}}>Email</label>
                    </span>
                <br/><br/>
                    <span style={{display: "flex", flexDirection:"column", alignItems: "flex-start"}}>
                        <label hmmltFor="" style={{marginBottom: "7px"}}>Email</label>
                        <input className="r-r-inputtext r-r-primary-border-3px-focus-box-shadow 
                                            r-r-primary-border-1px-focus r-r-primary-border-1px-hover r-r-danger-border-1px" 
                        placeholder="Email"/>
                        <small style={{marginTop: "3px", color: "#F64E60"}}>Enter your account email address</small>
                    </span>
                <br/><br/>
                    <span className="r-r-floating-label">
                        <input className="r-r-inputtext r-r-primary-border-3px-focus-box-shadow 
                                            r-r-primary-border-1px-focus r-r-primary-border-1px-hover" 
                                            placeholder=" "/>
                        <label hmmltFor="" style={{marginBottom: "7px"}}>Fullname</label>
                    </span>
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
