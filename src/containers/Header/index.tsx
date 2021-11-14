/**
 *
 * Header
 *
 */

import React from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { Dropdown, Menu } from "antd";

import { setLanguage } from "../../store/actions";
import { LANGUAGES } from "../../utils/utils";
import Strings from "../../utils/strings";

import logo from "../../assets/logo.png"

import "./styles.scss";

/* eslint-disable react/prefer-stateless-function */
export class Header extends React.Component<any, any> {
	constructor(props: any) {
		super(props);
		this.state = {
			language: props.language || "pt",
		};
	}

	renderLogo() {
		const { dispatch } = this.props;

		return (
			<React.Fragment>
				<div className="HeaderSection">
					<a
						href="/"
						className="HeaderLogo"
						onClick={(e: any) => {
							e.preventDefault();
							dispatch(push('/'));
						}}
					>
						<img src={logo} alt="App Logo" />
						Wine/beer cellar
					</a>
				</div>
			</React.Fragment>
		);
	}

	/**
	 * Change System language
	 * @param language
	 */
    changeLanguage(language: string) {
		const {dispatch} = this.props;
		Strings.setLanguage(language);
		this.setState({ language: language });
		dispatch(setLanguage(language));
	}

	render() {
		const languageMenu = (
            <Menu onClick={() => {}}>
				{LANGUAGES.map((elem: any, index: number) => (
					<>
						<Menu.Item
							key={elem.label}
							style={{
								height: 40,
								display: "flex",
								alignItems: "center",
							}}
							onClick={() => this.changeLanguage(elem.value)}
						>
							{elem.label}
						</Menu.Item>
						{LANGUAGES[index+1] ? <Menu.Item
							key="separator"
							style={{
								height: 1,
								backgroundColor: "#EEE",
								padding: 0,
							}}
						/> : null}
					</>
				))}
            </Menu>
        );

		return (
			<div className="HeaderContainer">
				<div id="AppHeader" className="Header">
					{this.renderLogo()}
					{/* Language Switcher */}
					<Dropdown overlay={languageMenu} trigger={["click"]}>
                        <div className="LanguageContainer">
                            <h1>{this.state.language.toUpperCase()}</h1>
                        </div>
                    </Dropdown>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state: any) => ({
	language: state.language
});

export default connect(mapStateToProps)(Header);
