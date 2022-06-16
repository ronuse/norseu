
import React from "react"
import { Panel } from "@ronuse/norseu/core/panels/Panel";
import { CompaniesUsingNorseu } from "../../utils/companies_using_norseu"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

export class ResourcesPage extends React.Component {

	render() {

		return (
			<Panel className="norseu-showcase-component-page">
				<h1>Resources</h1>
				<span>Related projects and design items by Ronuse</span>
				
				<h1>Ronuse Figma Library</h1>
				<span>Ronuse Figma library is available on Figma Community: <a href="https://www.figma.com/@ronuse">https://www.figma.com/@ronuse</a></span>
			</Panel>
		)
	}
}
