
import React from "react"
import { Button } from 'ronuse-react-ui/core/buttons'
import { Alignment, Type } from "ronuse-react-ui/core/variables"

{/** Place the code below it, make the code bloack collapsible, integrate fa-icon search */}
export class ButtonsPage extends React.Component {
    render() {
        return (
            <div style={{margin:"20px"}}>would be on top of a resizable div component
                <h1>Button</h1>
                <br/>
                <code>{`
                    import { Button } from 'ronuse-react-ui/core/buttons'
                `}</code>
                <br/>
                <h3>Basic</h3>
                <Button text="Click Me" />
                <Button icon="fa fa-user-circle" text="View Profile" />
                <Button icon="fa fa-pencil" text="Edit" alignIcon={Alignment.RIGHT} />
                <Button icon="fa fa-user-circle" rightIcon="fa fa-arrow-right" text="Update Profile" />
                <Button icon="fa fa-user-circle" rightIcon="fa fa-arrow-right" text="Update Profile" alignIcon={Alignment.RIGHT} />
                <Button icon="fa fa-user-circle" text="Disabled" onClick={()=>{alert("yea")}} disabled/>
                <Button type={Type.PRIMARY} rightIcon="fa fa-external-link" text="Link" link/>

                <h3>Button with Type</h3>
                <Button type={Type.STATELESS} icon="fa fa-exclamation" text="Stateless"/>
                <Button type={Type.PRIMARY} icon="fa fa-circle" text="Primary"/>
                <Button type={Type.SECONDARY} icon="fa fa-square" text="Secondary"/>
                <Button type={Type.SUCCESS} icon="fa fa-check" text="Success"/>
                <Button type={Type.INFO} icon="fa fa-bell" text="Info"/>
                <Button type={Type.WARNING} icon="fa fa-warning" text="Warning"/>
                <Button type={Type.DANGER} icon="fa fa-times" text="Danger"/>
                
                <h3>Rounded Buttons</h3>
                <Button text="Click Me" rounded/>
                <Button type={Type.STATELESS} icon="fa fa-exclamation" text="Stateless" rounded/>
                <Button type={Type.PRIMARY} icon="fa fa-circle" text="Primary" rounded/>
                <Button type={Type.SECONDARY} icon="fa fa-square" text="Secondary" rounded/>
                <Button type={Type.SUCCESS} icon="fa fa-check" text="Success" rounded/>
                <Button type={Type.INFO} icon="fa fa-bell" text="Info" rounded/>
                <Button type={Type.WARNING} icon="fa fa-warning" text="Warning" rounded/>
                <Button type={Type.DANGER} icon="fa fa-times" text="Danger" rounded/>
                
                <h3>Raised Buttons</h3>
                <Button text="Click Me" raised/>
                <Button type={Type.STATELESS} icon="fa fa-exclamation" text="Stateless" raised/>
                <Button type={Type.PRIMARY} icon="fa fa-circle" text="Primary" raised/>
                <Button type={Type.SECONDARY} icon="fa fa-square" text="Secondary" raised/>
                <Button type={Type.SUCCESS} icon="fa fa-check" text="Success" raised/>
                <Button type={Type.INFO} icon="fa fa-bell" text="Info" raised/>
                <Button type={Type.WARNING} icon="fa fa-warning" text="Warning" raised/>
                <Button type={Type.DANGER} icon="fa fa-times" text="Danger" raised/>
                
                <h3>Outlined Buttons</h3>
                <Button text="Click Me" outlined/>
                <Button type={Type.STATELESS} icon="fa fa-exclamation" text="Stateless" outlined/>
                <Button type={Type.PRIMARY} icon="fa fa-circle" text="Primary" outlined/>
                <Button type={Type.SECONDARY} icon="fa fa-square" text="Secondary" outlined/>
                <Button type={Type.SUCCESS} icon="fa fa-check" text="Success" outlined/>
                <Button type={Type.INFO} icon="fa fa-bell" text="Info" outlined/>
                <Button type={Type.WARNING} icon="fa fa-warning" text="Warning" outlined/>
                <Button type={Type.DANGER} icon="fa fa-times" text="Danger" outlined/>
                
                <h3>Text Only Buttons</h3>
                <Button text="Click Me" textonly/>
                <Button type={Type.STATELESS} icon="fa fa-exclamation" text="Stateless" textonly/>
                <Button type={Type.PRIMARY} icon="fa fa-circle" text="Primary" textonly/>
                <Button type={Type.SECONDARY} icon="fa fa-square" text="Secondary" textonly/>
                <Button type={Type.SUCCESS} icon="fa fa-check" text="Success" textonly/>
                <Button type={Type.INFO} icon="fa fa-bell" text="Info" textonly/>
                <Button type={Type.WARNING} icon="fa fa-warning" text="Warning" textonly/>
                <Button type={Type.DANGER} icon="fa fa-times" text="Danger" textonly/>
                
                <h3>Raised Text Only Buttons</h3>
                <Button text="Click Me" textonly raised/>
                <Button type={Type.STATELESS} icon="fa fa-exclamation" text="Stateless" textonly raised/>
                <Button type={Type.PRIMARY} icon="fa fa-circle" text="Primary" textonly raised/>
                <Button type={Type.SECONDARY} icon="fa fa-square" text="Secondary" textonly raised/>
                <Button type={Type.SUCCESS} icon="fa fa-check" text="Success" textonly raised/>
                <Button type={Type.INFO} icon="fa fa-bell" text="Info" textonly raised/>
                <Button type={Type.WARNING} icon="fa fa-warning" text="Warning" textonly raised/>
                <Button type={Type.DANGER} icon="fa fa-times" text="Danger" textonly raised/>

                <h3>Icon Button</h3>
                <Button icon="fa fa-user-circle" />
                <Button type={Type.PRIMARY} icon="fa fa-circle"/>
                <Button type={Type.SECONDARY} icon="fa fa-square"/>
                <Button type={Type.SUCCESS} icon="fa fa-check"/>
                <Button type={Type.INFO} icon="fa fa-bell"/>
                <Button type={Type.WARNING} icon="fa fa-warning"/>
                <Button type={Type.DANGER} icon="fa fa-times"/>

                <h3>Round Icon Button</h3>
                <Button icon="fa fa-user-circle" rounded/>
                <Button type={Type.PRIMARY} icon="fa fa-circle" rounded/>
                <Button type={Type.SECONDARY} icon="fa fa-square" rounded/>
                <Button type={Type.SUCCESS} icon="fa fa-check" rounded/>
                <Button type={Type.INFO} icon="fa fa-bell" rounded/>
                <Button type={Type.WARNING} icon="fa fa-warning" rounded/>
                <Button type={Type.DANGER} icon="fa fa-times" rounded/>

                <h3>Round and Outlined Icon Button</h3>
                <Button icon="fa fa-user-circle" rounded outlined/>
                <Button type={Type.PRIMARY} icon="fa fa-circle" rounded outlined/>
                <Button type={Type.SECONDARY} icon="fa fa-square" rounded outlined/>
                <Button type={Type.SUCCESS} icon="fa fa-check" rounded outlined/>
                <Button type={Type.INFO} icon="fa fa-bell" rounded outlined/>
                <Button type={Type.WARNING} icon="fa fa-warning" rounded outlined/>
                <Button type={Type.DANGER} icon="fa fa-times" rounded outlined/>

                <h3>Round Text Only Icon Button</h3>
                <Button icon="fa fa-user-circle" rounded textonly/>
                <Button type={Type.PRIMARY} icon="fa fa-circle" rounded textonly/>
                <Button type={Type.SECONDARY} icon="fa fa-square" rounded textonly/>
                <Button type={Type.SUCCESS} icon="fa fa-check" rounded textonly/>
                <Button type={Type.INFO} icon="fa fa-bell" rounded textonly/>
                <Button type={Type.WARNING} icon="fa fa-warning" rounded textonly/>
                <Button type={Type.DANGER} icon="fa fa-times" rounded textonly/>
            </div>
        )
    }
}