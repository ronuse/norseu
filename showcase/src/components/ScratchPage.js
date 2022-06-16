
import React, { Component } from "react"
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Button } from '@ronuse/norseu/core/buttons'
import { Panel } from "@ronuse/norseu/core/panels/Panel";
import { Scheme, Alignment, Position } from "@ronuse/norseu/core/variables";
import { InputText } from '@ronuse/norseu/core/form';
import { Popover, Message, showMessage, Toast } from '@ronuse/norseu/core/overlay';
import { Tag } from '@ronuse/norseu/core/misc'
import { ObjUtils, DOMUtils, BoolUtils } from "@ronuse/norseu/utils"
import ReactDOM from 'react-dom';

let index = 0;
export class ScratchPage extends React.Component {

	state = {
		username: ""
	}
	
	constructor(props) {
		super(props);
		this.toast = React.createRef(null);
		this.containerRef = React.createRef(null);
	}

	render() {
		var icon = this.state.buttonIcon ? this.state.buttonIcon : "fa fa-plus";

		return (
			<React.Fragment>
				<div className="norseu-showcase-component-page">
					<h1>Construct A Component Here <i className="fas fa-bars" style={{float: "right", display: "none"}}></i></h1>
					<div ref={this.containerRef} className={"norseu-toast norseu-toast-top-center"}>
					</div>
					<Toast ref={this.toast}/>
					<Button text={"Show Toast"} onClick={(e) => {
						/*showMessage({
							container: this.containerRef.current,
							title: "Account Settings",
							description: "your account settings has been saved successfully"
						});*/
						//console.log(this.toast)
						this.toast.current.show([{ description: "your account settings has been saved successfully " +  ++index}])
					}}/>
				</div>
			</React.Fragment>
		)
	}
}
