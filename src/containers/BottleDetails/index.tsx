/* eslint-disable eqeqeq */
/*
*
* BottleDetails
*
*/

import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { push } from "connected-react-router";
import { Button } from "antd";
import { Icon } from "../../components";
import { translate, formatPrice } from '../../utils/utils';
import { setTitle } from "../../store/actions";
import Strings from '../../utils/strings';

import './styles.scss';

export class BottleDetails extends React.Component<any, any> {
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
		const { dispatch, match } = this.props;

		if (!bottle) return <></>

		return (
			<React.Fragment>
				<Helmet>
					<title>{translate(bottle.name)}</title>
					<meta name="description" content="Bottle Description" />
				</Helmet>
				{/* Header with back button and edit button */}
				<div className="Bottle_Header">
					<div className="Bottle_Header_BackPath" onClick={() => dispatch(push('/'))}>
						<Icon name="back" />
						<span>{Strings.listOfBottles.header}</span>
					</div>
					<div>
						<Button onClick={() => dispatch(push(`/bottle_form/${match.params.id}`))} type="primary">
							{Strings.bottleForm.edit}
						</Button>
					</div>
				</div>
				<div className="ContentContainer">
					<div className="Bottle_Details">
						<div>
							<div className="Bottle_Header">
								<div>
									<div className="Bottle_Brand">
										{bottle.brand}
									</div>
									<div className="Bottle_Title">
										{translate(bottle.name)}
									</div>
								</div>
								<div className={`Bottle_Price ${bottle.promoPrice ? 'promo': ''}`}>
									{bottle.promoPrice ? formatPrice(bottle.promoPrice) : formatPrice(bottle.price)}
									{bottle.promoPrice ? <span>{formatPrice(bottle.price)}</span> : null}
								</div>
							</div>
							<div className="Bottle_Description">
								{translate(bottle.description)}
							</div>
						</div>
						{bottle.image ? <div className="Bottle_Image_Container">
							<img alt={translate(bottle.name)} src={bottle.image} />
						</div> : null}
					</div>
				</div>
			</React.Fragment>
		);
	}
}

const mapStateToProps = (state: any) => ({
	bottles: state.bottles,
	language: state.language
});

export default connect(mapStateToProps)(BottleDetails);