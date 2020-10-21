
import React from "react"
import { Panel } from 'ronuse-react-ui/core/panels'
import { Button } from 'ronuse-react-ui/core/buttons'
import { Elevation, Scheme } from "ronuse-react-ui/core/variables"

export class PanelPage extends React.Component {

    state = {

    }

    // TODO chage alerts to taost component
    onCollapse(event) {
        alert("The Panel has been collapsed"); 
    }

    onExpand(event) {
        alert("The Panel has been expanded");
    }

    render() {
        return (
            <Panel scheme={Scheme.SKELETON} exemptedComponents={[]} className="r-r-margin-20px">
                <h1>Panel</h1>

                <h3>Basic</h3>
                <Panel>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vulputate dolor neque, 
                    vel porta sem tincidunt ut. Pellentesque lacinia orci quis sagittis tincidunt. 
                    Proin viverra varius orci, at blandit mauris feugiat vitae. Aliquam elit nisi, 
                    molestie ac maximus eget, aliquet nec tortor. Pellentesque bibendum ante vel risus efficitur volutpat.</p>
                </Panel>

                <h3>Basic With Elevation</h3>
                <Panel elevation={Elevation.EIGHT}>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vulputate dolor neque, 
                    vel porta sem tincidunt ut. Pellentesque lacinia orci quis sagittis tincidunt. 
                    Proin viverra varius orci, at blandit mauris feugiat vitae. Aliquam elit nisi, 
                    molestie ac maximus eget, aliquet nec tortor. Pellentesque bibendum ante vel risus efficitur volutpat.</p>
                </Panel>

                <h3>Title Only</h3>
                <Panel title="Title">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vulputate dolor neque, 
                    vel porta sem tincidunt ut. Pellentesque lacinia orci quis sagittis tincidunt. 
                    Proin viverra varius orci, at blandit mauris feugiat vitae. Aliquam elit nisi, 
                    molestie ac maximus eget, aliquet nec tortor. Pellentesque bibendum ante vel risus efficitur volutpat.</p>
                </Panel>

                <h3>Collapsible With Title</h3>
                <Panel title="Title" collapsible expanded>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vulputate dolor neque, 
                    vel porta sem tincidunt ut. Pellentesque lacinia orci quis sagittis tincidunt. 
                    Proin viverra varius orci, at blandit mauris feugiat vitae. Aliquam elit nisi, 
                    molestie ac maximus eget, aliquet nec tortor. Pellentesque bibendum ante vel risus efficitur volutpat.</p>
                </Panel>

                <h3>Skeleton Panel</h3>
                <Panel scheme={Scheme.SKELETON}>
                    <p>When the type of panel is set to skeleton rather than applying the skeleton effect 
                        to the main panel the type is relayed down to the child components for application.
                    </p>
                    <br/>

                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vulputate dolor neque, 
                    vel porta sem tincidunt ut. Pellentesque lacinia orci quis sagittis tincidunt. 
                    Proin viverra varius orci, at blandit mauris feugiat vitae. Aliquam elit nisi, 
                    molestie ac maximus eget, aliquet nec tortor. Pellentesque bibendum ante vel risus efficitur volutpat.</p>
                    <br/>

                    <Button text="Hello World" scheme={Scheme.PRIMARY}/>
                    
                </Panel>

                <h3>Events</h3>
                <Panel title="onCollapse, onExpand Events" onExpand={this.onExpand} onCollapse={this.onCollapse} collapsible expanded>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vulputate dolor neque, 
                    vel porta sem tincidunt ut. Pellentesque lacinia orci quis sagittis tincidunt. 
                    Proin viverra varius orci, at blandit mauris feugiat vitae. Aliquam elit nisi, 
                    molestie ac maximus eget, aliquet nec tortor. Pellentesque bibendum ante vel risus efficitur volutpat.</p>
                </Panel>

            </Panel>
        )
    }

}
