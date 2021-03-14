
import React from "react"
import { Button } from '@ronuse/react-ui/core/buttons'
import { Panel } from "@ronuse/react-ui/core/panels/Panel";
import { Scheme, Alignment } from "@ronuse/react-ui/core/variables";
import { InputText } from '@ronuse/react-ui/core/form';
import { Tag } from '@ronuse/react-ui/core/misc'

export class ScratchPage extends React.Component {

    state = {
        username: "",
        usernameScheme: Scheme.PRIMARY,
        usernameBorderClass: "",
        helpLabel: null
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

                Username: <span>{this.state.username}</span>
                <br/><br/>
                <InputText scheme={this.state.usernameScheme} className={this.state.usernameBorderClass}
                    value={this.state.username}
                    placeholder="Username" helpLabel={this.state.helpLabel} onChange={(e) => {
                        this.setState({
                            username: e.target.value,
                            usernameScheme: Scheme.PRIMARY,
                            usernameBorderClass: "",
                            helpLabel: null
                        })
                    }} />
                <br/><br/>
                <Button text="Sign in" scheme={Scheme.PRIMARY} onClick={(e) => {
                    if (this.state.username === "") {
                        this.setState({
                            usernameScheme: Scheme.SUCCESS,
                            usernameBorderClass: "r-r-success-border-1px",
                            helpLabel: <small className="r-r-success-text">username is required</small>
                        })
                    } else {
                        console.log(this.state.username);
                        this.setState({
                            username: e.target.value})
                    }
                }}/>
                <br/><br/>
                <br/><br/>

                <div className="r-r-scrollpanel" id="style-1" style={{backgroundColor: "grey", width: "400px", height: "400px"}}>
                    <Button text="Hello World"/><div style={{width: "600px"}}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Morbi tempus iaculis urna id. Ut ornare lectus sit amet est placerat in egestas. Sit amet mauris commodo quis imperdiet massa. Dictum sit amet justo donec enim diam vulputate ut pharetra. Sit amet porttitor eget dolor morbi. Ultrices sagittis orci a scelerisque. Nisi scelerisque eu ultrices vitae. Commodo odio aenean sed adipiscing diam donec adipiscing tristique risus. Donec pretium vulputate sapien nec. A scelerisque purus semper eget duis at tellus at urna.

Dignissim convallis aenean et tortor at risus viverra adipiscing. Sem fringilla ut morbi tincidunt augue interdum. Facilisis gravida neque convallis a cras semper auctor neque vitae. Pellentesque habitant morbi tristique senectus et netus. Orci dapibus ultrices in iaculis nunc sed augue lacus viverra. Nulla facilisi morbi tempus iaculis. Felis eget nunc lobortis mattis aliquam faucibus purus. Malesuada fames ac turpis egestas sed tempus. Tempus urna et pharetra pharetra massa massa ultricies mi. Ac feugiat sed lectus vestibulum mattis. Sagittis nisl rhoncus mattis rhoncus urna neque viverra justo. Massa enim nec dui nunc mattis enim ut tellus. Aliquet risus feugiat in ante metus dictum at tempor. Fusce id velit ut tortor pretium viverra suspendisse. Posuere ac ut consequat semper. Sit amet luctus venenatis lectus magna fringilla urna porttitor rhoncus. Lorem mollis aliquam ut porttitor leo a. Volutpat sed cras ornare arcu dui vivamus arcu felis bibendum.

Vitae turpis massa sed elementum tempus egestas sed sed risus. At quis risus sed vulputate odio ut. Nisi vitae suscipit tellus mauris a diam maecenas sed enim. Nec ullamcorper sit amet risus nullam. Vitae tempus quam pellentesque nec nam aliquam. Molestie a iaculis at erat. Arcu felis bibendum ut tristique et egestas quis. Volutpat lacus laoreet non curabitur gravida. Ante metus dictum at tempor commodo. Vivamus at augue eget arcu. Quam vulputate dignissim suspendisse in. Nec dui nunc mattis enim ut tellus elementum.
                </div></div>

                <br/><br/><br/>
                <div className="r-r-scrollpanel r-r-scrollpanel-primary" style={{backgroundColor: "grey", width: "400px", height: "400px"}}>
                    <Button text="Hello World"/><div style={{width: "600px"}}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Morbi tempus iaculis urna id. Ut ornare lectus sit amet est placerat in egestas. Sit amet mauris commodo quis imperdiet massa. Dictum sit amet justo donec enim diam vulputate ut pharetra. Sit amet porttitor eget dolor morbi. Ultrices sagittis orci a scelerisque. Nisi scelerisque eu ultrices vitae. Commodo odio aenean sed adipiscing diam donec adipiscing tristique risus. Donec pretium vulputate sapien nec. A scelerisque purus semper eget duis at tellus at urna.

Dignissim convallis aenean et tortor at risus viverra adipiscing. Sem fringilla ut morbi tincidunt augue interdum. Facilisis gravida neque convallis a cras semper auctor neque vitae. Pellentesque habitant morbi tristique senectus et netus. Orci dapibus ultrices in iaculis nunc sed augue lacus viverra. Nulla facilisi morbi tempus iaculis. Felis eget nunc lobortis mattis aliquam faucibus purus. Malesuada fames ac turpis egestas sed tempus. Tempus urna et pharetra pharetra massa massa ultricies mi. Ac feugiat sed lectus vestibulum mattis. Sagittis nisl rhoncus mattis rhoncus urna neque viverra justo. Massa enim nec dui nunc mattis enim ut tellus. Aliquet risus feugiat in ante metus dictum at tempor. Fusce id velit ut tortor pretium viverra suspendisse. Posuere ac ut consequat semper. Sit amet luctus venenatis lectus magna fringilla urna porttitor rhoncus. Lorem mollis aliquam ut porttitor leo a. Volutpat sed cras ornare arcu dui vivamus arcu felis bibendum.

Vitae turpis massa sed elementum tempus egestas sed sed risus. At quis risus sed vulputate odio ut. Nisi vitae suscipit tellus mauris a diam maecenas sed enim. Nec ullamcorper sit amet risus nullam. Vitae tempus quam pellentesque nec nam aliquam. Molestie a iaculis at erat. Arcu felis bibendum ut tristique et egestas quis. Volutpat lacus laoreet non curabitur gravida. Ante metus dictum at tempor commodo. Vivamus at augue eget arcu. Quam vulputate dignissim suspendisse in. Nec dui nunc mattis enim ut tellus elementum.
                </div></div>
                
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
