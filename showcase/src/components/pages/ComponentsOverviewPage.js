
import React from "react"
import { Panel } from "norseu/core/panels/Panel";
import { CompaniesUsingNorseu } from "../../utils/companies_using_norseu"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

export class ComponentsOverviewPage extends React.Component {

	static Components = {
		"Core": {
			"Buttons": [
				{ label: "Button", href: "/p/components/core/buttons/button" },
				{ label: "ButtonGroup", href: "/p/components/core/buttons/buttongroup" }
			],
			"Form": [
				{ label: "Checkbox", href: "/components/form/checkbox" },
				{ label: "Dropdown", href: "/components/buttons/dropdown" }
			]
		},
		"Utilities": {
			"Sensors": [
				{ label: "ResizeSensor", href: "/components/sensors/resizesensor" },
				{ label: "ViewportSensor", href: "/components/buttons/viewportsensor" }
			],
			"Functions": [
				{ label: "buildFormData", href: "/components/functions/buildformdata" },
				{ label: "getFileDetails", href: "/components/functions/getfiledetails" }
			]
		}
	};

	render() {

		return (
			<Panel className="norseu-showcase-component-page">
				<h1>Components Overview</h1>
				<span>All components and utililites provided by norseu</span>
				
				<div className="components-overview">
					{Object.keys(ComponentsOverviewPage.Components).map(group => {
						return (
							<div className="sections">
								<span className="title">{group}</span>
								<div className="list">
									{Object.keys(ComponentsOverviewPage.Components[group]).map(section => {
										return (
											<div className="section">
												<span className="title">{section}</span>
												{ComponentsOverviewPage.Components[group][section].map(item => <a href={item.href}>{item.label}</a>)}
											</div>
										)
									})}
								</div>
							</div>
						);
					})}
				</div>
			</Panel>
		)
	}
}
