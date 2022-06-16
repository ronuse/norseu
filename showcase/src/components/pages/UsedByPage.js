
import React from "react"
import { Panel } from "@ronuse/norseu/core/panels/Panel";
import { CompaniesUsingNorseu } from "../../utils/companies_using_norseu"
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

export class UsedByPage extends React.Component {

	static buildOrgIconList(style) {
		return (
			<Panel style={{ marginTop: 40, marginBottom: 0 }} contentClassName="used-by-panel" contentStyle={style}>
				{CompaniesUsingNorseu.map((company_icon, index) => {
					return (
						<div key={index} className="used-by-card">
							<img src={company_icon}/>
						</div>
					)
				})}
			</Panel>
		);
	}

	render() {

		return (
			<Panel className="norseu-showcase-component-page">
				<h1>Used By</h1>
				<span>The following organization uses norseu in one of their project</span>
				{UsedByPage.buildOrgIconList({ justifyContent: "flex-start" })}
			</Panel>
		)
	}
}
