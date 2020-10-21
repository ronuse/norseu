
import React from "react"
import { Panel } from 'ronuse-react-ui/core/panels'
import { Button } from 'ronuse-react-ui/core/buttons'
import { Alignment, Scheme } from "ronuse-react-ui/core/variables"

export class ButtonPage extends React.Component {
    render() {
        return (
            <Panel className="r-r-margin-20px">
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
                <Button scheme={Scheme.PRIMARY} rightIcon="fa fa-external-link" text="Link" link/>

                <h3>Button with Scheme</h3>
                <Button scheme={Scheme.SKELETON} text="Skeleton" />
                <Button scheme={Scheme.STATELESS} icon="fa fa-exclamation" text="Stateless"/>
                <Button scheme={Scheme.PRIMARY} icon="fa fa-circle" text="Primary"/>
                <Button scheme={Scheme.SECONDARY} icon="fa fa-square" text="Secondary"/>
                <Button scheme={Scheme.SUCCESS} icon="fa fa-check" text="Success"/>
                <Button scheme={Scheme.INFO} icon="fa fa-bell" text="Info"/>
                <Button scheme={Scheme.WARNING} icon="fa fa-warning" text="Warning"/>
                <Button scheme={Scheme.DANGER} icon="fa fa-times" text="Danger"/>

                <h3>Fill Button With Text And Icon Alignment</h3>
                <Button text="Click Me" alignText={Alignment.CENTER} fill/>
                <Button scheme={Scheme.SKELETON} fill/>
                <Button scheme={Scheme.STATELESS} alignText={Alignment.LEFT} rightIcon="fa fa-exclamation" text="Stateless" fill/>
                <Button scheme={Scheme.PRIMARY} alignText={Alignment.RIGHT} rightIcon="fa fa-circle" text="Primary" fill/>
                <Button scheme={Scheme.SECONDARY} alignText={Alignment.LEFT} rightIcon="fa fa-square" text="Secondary" fill/>
                <Button scheme={Scheme.SUCCESS} alignText={Alignment.CENTER} icon="fa fa-check" alignIcon={Alignment.LEFT} rightIcon="fa fa-check" text="Success" fill/>
                <Button scheme={Scheme.INFO} alignText={Alignment.RIGHT} icon="fa fa-bell" alignIcon={Alignment.RIGHT}  rightIcon="fa fa-bell" text="Info" fill/>
                <Button scheme={Scheme.WARNING} alignText={Alignment.LEFT} icon="fa fa-warning" alignIcon={Alignment.LEFT} rightIcon="fa fa-warning" text="Warning" fill/>
                <Button scheme={Scheme.DANGER} alignText={Alignment.RIGHT} icon="fa fa-times" alignIcon={Alignment.LEFT} rightIcon="fa fa-times" text="Danger" fill/>
                
                <h3>Rounded Buttons</h3>
                <Button text="Click Me" rounded/>
                <Button scheme={Scheme.SKELETON} rounded/>
                <Button scheme={Scheme.STATELESS} icon="fa fa-exclamation" text="Stateless" rounded/>
                <Button scheme={Scheme.PRIMARY} icon="fa fa-circle" text="Primary" rounded/>
                <Button scheme={Scheme.SECONDARY} icon="fa fa-square" text="Secondary" rounded/>
                <Button scheme={Scheme.SUCCESS} icon="fa fa-check" text="Success" rounded/>
                <Button scheme={Scheme.INFO} icon="fa fa-bell" text="Info" rounded/>
                <Button scheme={Scheme.WARNING} icon="fa fa-warning" text="Warning" rounded/>
                <Button scheme={Scheme.DANGER} icon="fa fa-times" text="Danger" rounded/>
                
                <h3>Raised Buttons</h3>
                <Button text="Click Me" raised/>
                <Button scheme={Scheme.SKELETON} raised/>
                <Button scheme={Scheme.STATELESS} icon="fa fa-exclamation" text="Stateless" raised/>
                <Button scheme={Scheme.PRIMARY} icon="fa fa-circle" text="Primary" raised/>
                <Button scheme={Scheme.SECONDARY} icon="fa fa-square" text="Secondary" raised/>
                <Button scheme={Scheme.SUCCESS} icon="fa fa-check" text="Success" raised/>
                <Button scheme={Scheme.INFO} icon="fa fa-bell" text="Info" raised/>
                <Button scheme={Scheme.WARNING} icon="fa fa-warning" text="Warning" raised/>
                <Button scheme={Scheme.DANGER} icon="fa fa-times" text="Danger" raised/>
                
                <h3>Outlined Buttons</h3>
                <Button text="Click Me" outlined/>
                <Button scheme={Scheme.SKELETON} outlined/>
                <Button scheme={Scheme.STATELESS} icon="fa fa-exclamation" text="Stateless" outlined/>
                <Button scheme={Scheme.PRIMARY} icon="fa fa-circle" text="Primary" outlined/>
                <Button scheme={Scheme.SECONDARY} icon="fa fa-square" text="Secondary" outlined/>
                <Button scheme={Scheme.SUCCESS} icon="fa fa-check" text="Success" outlined/>
                <Button scheme={Scheme.INFO} icon="fa fa-bell" text="Info" outlined/>
                <Button scheme={Scheme.WARNING} icon="fa fa-warning" text="Warning" outlined/>
                <Button scheme={Scheme.DANGER} icon="fa fa-times" text="Danger" outlined/>
                
                <h3>Text Only Buttons</h3>
                <Button text="Click Me" textonly/>
                <Button scheme={Scheme.SKELETON} textonly/>
                <Button scheme={Scheme.STATELESS} icon="fa fa-exclamation" text="Stateless" textonly/>
                <Button scheme={Scheme.PRIMARY} icon="fa fa-circle" text="Primary" textonly/>
                <Button scheme={Scheme.SECONDARY} icon="fa fa-square" text="Secondary" textonly/>
                <Button scheme={Scheme.SUCCESS} icon="fa fa-check" text="Success" textonly/>
                <Button scheme={Scheme.INFO} icon="fa fa-bell" text="Info" textonly/>
                <Button scheme={Scheme.WARNING} icon="fa fa-warning" text="Warning" textonly/>
                <Button scheme={Scheme.DANGER} icon="fa fa-times" text="Danger" textonly/>
                
                <h3>Raised Text Only Buttons</h3>
                <Button text="Click Me" textonly raised/>
                <Button scheme={Scheme.SKELETON} raised/>
                <Button scheme={Scheme.STATELESS} icon="fa fa-exclamation" text="Stateless" textonly raised/>
                <Button scheme={Scheme.PRIMARY} icon="fa fa-circle" text="Primary" textonly raised/>
                <Button scheme={Scheme.SECONDARY} icon="fa fa-square" text="Secondary" textonly raised/>
                <Button scheme={Scheme.SUCCESS} icon="fa fa-check" text="Success" textonly raised/>
                <Button scheme={Scheme.INFO} icon="fa fa-bell" text="Info" textonly raised/>
                <Button scheme={Scheme.WARNING} icon="fa fa-warning" text="Warning" textonly raised/>
                <Button scheme={Scheme.DANGER} icon="fa fa-times" text="Danger" textonly raised/>

                <h3>Icon Button</h3>
                <Button icon="fa fa-user-circle" />
                <Button scheme={Scheme.SKELETON} icon="fa fa-user" />
                <Button scheme={Scheme.PRIMARY} icon="fa fa-circle"/>
                <Button scheme={Scheme.SECONDARY} icon="fa fa-square"/>
                <Button scheme={Scheme.SUCCESS} icon="fa fa-check"/>
                <Button scheme={Scheme.INFO} icon="fa fa-bell"/>
                <Button scheme={Scheme.WARNING} icon="fa fa-warning"/>
                <Button scheme={Scheme.DANGER} icon="fa fa-times"/>

                <h3>Round Icon Button</h3>
                <Button icon="fa fa-user-circle" rounded/>
                <Button scheme={Scheme.SKELETON} icon="fa fa-user" rounded/>
                <Button scheme={Scheme.PRIMARY} icon="fa fa-circle" rounded/>
                <Button scheme={Scheme.SECONDARY} icon="fa fa-square" rounded/>
                <Button scheme={Scheme.SUCCESS} icon="fa fa-check" rounded/>
                <Button scheme={Scheme.INFO} icon="fa fa-bell" rounded/>
                <Button scheme={Scheme.WARNING} icon="fa fa-warning" rounded/>
                <Button scheme={Scheme.DANGER} icon="fa fa-times" rounded/>

                <h3>Round and Outlined Icon Button</h3>
                <Button icon="fa fa-user-circle" rounded outlined/>
                <Button scheme={Scheme.SKELETON} icon="fa fa-user" rounded outlined/>
                <Button scheme={Scheme.PRIMARY} icon="fa fa-circle" rounded outlined/>
                <Button scheme={Scheme.SECONDARY} icon="fa fa-square" rounded outlined/>
                <Button scheme={Scheme.SUCCESS} icon="fa fa-check" rounded outlined/>
                <Button scheme={Scheme.INFO} icon="fa fa-bell" rounded outlined/>
                <Button scheme={Scheme.WARNING} icon="fa fa-warning" rounded outlined/>
                <Button scheme={Scheme.DANGER} icon="fa fa-times" rounded outlined/>

                <h3>Round Text Only Icon Button</h3>
                <Button icon="fa fa-user-circle" rounded textonly/>
                <Button scheme={Scheme.SKELETON} icon="fa fa-user" rounded textonly/>
                <Button scheme={Scheme.PRIMARY} icon="fa fa-circle" rounded textonly/>
                <Button scheme={Scheme.SECONDARY} icon="fa fa-square" rounded textonly/>
                <Button scheme={Scheme.SUCCESS} icon="fa fa-check" rounded textonly/>
                <Button scheme={Scheme.INFO} icon="fa fa-bell" rounded textonly/>
                <Button scheme={Scheme.WARNING} icon="fa fa-warning" rounded textonly/>
                <Button scheme={Scheme.DANGER} icon="fa fa-times" rounded textonly/>
            </Panel>
        )
    }
}