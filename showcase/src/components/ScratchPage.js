
import React from "react"

export class ScratchPage extends React.Component {
    render() {
        return (
            <div style={{margin:"20px"}}>
                <h2>Buttton</h2>

               <br/><br/>Disabled &nbsp;&nbsp;&nbsp;
               <button className="r-r-disabled r-r-button">
                   Hello World
               </button>

                <br/><br/>No Border &nbsp;&nbsp;&nbsp;
                <button className="r-r-button r-r-no-border">
                    Hello World
                    <i class="fa fa-check r-r-margin-left-7px"></i>
                </button>

               <br/><br/>Icon, pos = left &nbsp;&nbsp;&nbsp;
               <button className="r-r-button">
                   <i class="fa fa-check r-r-margin-right-7px"></i>
                   Hello World
               </button>

                <br/><br/>Icon, pos = right &nbsp;&nbsp;&nbsp;
                <button className="r-r-button">
                    Hello World
                    <i class="fa fa-arrow-right r-r-margin-left-7px"></i>
                </button>

                <br/><br/>Icon, Raised No Border &nbsp;&nbsp;&nbsp;
                <button className="r-r-button r-r-no-border r-r-button-raised-border">
                    Hello World
                    <i class="fa fa-check r-r-margin-left-7px"></i>
                </button>

                <br/><br/>Icon, Raised Border &nbsp;&nbsp;&nbsp;
                <button className="r-r-button r-r-button-raised-border">
                    Hello World
                    <i class="fa fa-check r-r-margin-left-7px"></i>
                </button>

                <br/><br/>Icon, Spread Surround Border &nbsp;&nbsp;&nbsp;
                <button className="r-r-button test-border-spread">
                    Hello Surrounding Worlds
                    <i class="fa fa-check r-r-margin-left-7px"></i>
                </button>

                <br/><br/>Icon, Round Border, two icons &nbsp;&nbsp;&nbsp;
                <button className="r-r-button r-r-button-rounded-border">
                    <i class="fa fa-user-circle-o r-r-margin-right-7px"></i>
                    Hello World
                    <i class="fa fa-check r-r-margin-left-7px"></i>
                </button>

                <br/><br/>Icon, Round Raised Border &nbsp;&nbsp;&nbsp;
                <button className="r-r-button r-r-button-rounded-border r-r-button-raised-border">
                    Hello World
                    <i class="fa fa-check r-r-margin-left-7px"></i>
                </button>

                <br/><br/>Icon only &nbsp;&nbsp;&nbsp;
                <button className="r-r-button">
                    <i class="fa fa-check"></i>
                </button>

                <br/><br/>Round Icon only &nbsp;&nbsp;&nbsp;
                <button className="r-r-button r-r-button-rounded-border">
                    <i class="fa fa-user-circle"></i>
                </button> &nbsp;&nbsp;
                <button className="r-r-button r-r-button-rounded-border">
                    <i class="fa fa-search"></i>
                </button> &nbsp;&nbsp;
                <button className="r-r-button r-r-button-rounded-border">
                    <i class="fa fa-check"></i>
                </button> &nbsp;&nbsp;
                <button className="r-r-button r-r-button-rounded-border">
                    <i class="fa fa-bell"></i>
                </button> &nbsp;&nbsp;
                <button className="r-r-button r-r-button-rounded-border r-r-button-theme">
                    <i class="fa fa-sign-out"></i>
                </button>

            </div>
        )
    }
}
