/* eslint-disable eqeqeq */
/*
*
* Home
*
*/

import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { translate } from "../../utils/utils";
import { setTitle } from "../../store/actions";
import Strings from '../../utils/strings';

import './styles.scss';

export class Home extends React.Component<any, any> {
	constructor(props: any) {
		super(props);

		this.state = {};
	}

    componentDidMount() {
        const { bottles, dispatch, match } = this.props;

		const bottle = bottles.find((elem: any) => elem.id == match.params.id);
		
        dispatch(setTitle(Strings.bottleDetails.header));

		this.setState({ bottle })
    }

	render() {
		const { bottle } = this.state;

		if (!bottle) return <></>

		return (
			<React.Fragment>
				<Helmet>
					<title>{translate(bottle.name)}</title>
					<meta name="description" content="Description of Portfolio" />
				</Helmet>
				<div className="ContentContainer">
					{translate(bottle.name)}
				</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state: any) => ({
	bottles: state.bottles,
	language: state.language
});

export default connect(mapStateToProps)(Home);