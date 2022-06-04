
import React from "react"
import { Panel } from "norseu/core/panels/Panel";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

export class IntroductionPage extends React.Component {

	state = {
		usageCode: `import { Button } from 'norseu/core/buttons';
import { Scheme } from "norseu/core/variables";
import { ScrollPanel } from 'norseu/core/panels';
import { InputText, PasswordInput } from 'norseu/core/form';`,
		sampleCode: `<ScrollPanel>
	<InputText scheme={Scheme.PRIMARY} label="Email"/>
	<PasswordInput scheme={Scheme.PRIMARY} label="Password"/>
	<Button scheme={Scheme.PRIMARY} text="Login"/>
</ScrollPanel>`
	}

	render() {

		return (
			<Panel className="norseu-showcase-component-page">
				<h1>Introduction</h1>
				<span>
					norseu is a flexible and easy to use UI framework designed by ronuse, It focus on simplicity and manging 
					component logic where possible so you can concentrate on building the UI elements.
				</span>

				<h2>Installation</h2>
				<span>norseu can be installed using npm or yarn, norseu requires <code>react@17.0.1</code> and <code>react-dom@17.0.1</code> or higher</span>
				<SyntaxHighlighter language="jsx" style={dracula} className={"norseu-showcase-code"} >
					npm install norseu
				</SyntaxHighlighter>
				<span>or</span>
				<SyntaxHighlighter language="jsx" style={dracula} className={"norseu-showcase-code"} >
					yarn add norseu
				</SyntaxHighlighter>

				<h2>Peer Dependencies</h2>
				<span>norseu depends on some packages, if your node version does not support peer dependencies auotomatic installation, 
					you can use the command below to install the dependencies.</span>
				<SyntaxHighlighter language="jsx" style={dracula} className={"norseu-showcase-code"} >
					npm install classnames react-transition-group
				</SyntaxHighlighter>
				<span>or</span>
				<SyntaxHighlighter language="jsx" style={dracula} className={"norseu-showcase-code"} >
					yarn add classnames react-transition-group
				</SyntaxHighlighter>

				<h2>Usage</h2>
				<span>Once norseu has been installed you can import your components as such:</span>
				<SyntaxHighlighter language="jsx" style={dracula} className={"norseu-showcase-code"} >
					{this.state.usageCode}
				</SyntaxHighlighter>
				<span>Then you can use the component in your project like:</span>
				<SyntaxHighlighter language="jsx" style={dracula} className={"norseu-showcase-code"} >
					{this.state.sampleCode}
				</SyntaxHighlighter>
			</Panel>
		)
	}
}
