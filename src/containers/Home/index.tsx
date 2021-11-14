/*
*
* Home
*
*/

import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { push } from "connected-react-router";
import { Row, Col, Button } from "antd";
import { setTitle } from "../../store/actions";
import { translate, formatPrice } from '../../utils/utils';
import Strings from '../../utils/strings';

import './styles.scss';

export class Home extends React.Component<any, any> {
	constructor(props: any) {
		super(props);

		this.state = {};
	}

	componentDidMount() {
		const { bottles } = this.props;
        const { dispatch } = this.props;

        dispatch(setTitle(Strings.listOfBottles.header));

		if (!bottles) return;

		// Separate the bottles by type (wine/beer)
		this.setState({
			listOfWineBottles: bottles.filter((elem: any) => elem.type === 'wine'),
			listOfBeerBottles: bottles.filter((elem: any) => elem.type === 'beer')
		})
	}

	render() {
		const { listOfWineBottles, listOfBeerBottles } = this.state;
		const { dispatch } = this.props;

		return (
			<React.Fragment>
				<Helmet>
					<title>{Strings.listOfBottles.header}</title>
					<meta name="List" content="Bottles List" />
				</Helmet>
				<div className="ContentContainer">
					{/* Wine Bottles Section */}
					<div className="BottleListSection">
						<div className="SectionTitle">
							{Strings.listOfBottles.listOfWineBottles}
							<Button onClick={() => dispatch(push('bottle_form', { bottleType: 'wine' }))} type="primary">
								{Strings.bottleDetails.addWine}
							</Button>
						</div>
						<Row gutter={12}>
							{listOfWineBottles?.map((bottle: any) => {
								return <Col key={`bottle_${bottle.id}`} xs={24} md={12} lg={6}>
									<div className="BottleListSection_Item" onClick={() => dispatch(push(`bottle/${bottle.id}`))}>
										<div className="BottleListSection_Item_Header">
											<div>
												<div className="BottleListSection_Item_Brand">
													{bottle.brand}
												</div>
												<div className="BottleListSection_Item_Title">
													{bottle.name}
												</div>
											</div>
											{/* Verify if has Promo Price */}
											<div className={`BottleListSection_Item_Price ${bottle.promoPrice ? 'promo': ''}`}>
												{bottle.promoPrice ? formatPrice(bottle.promoPrice) : formatPrice(bottle.price)}
												{bottle.promoPrice ? <span>{formatPrice(bottle.price)}</span> : null}
											</div>
										</div>
										{bottle.image ? <div className="BottleListSection_Image_Container">
											<img alt={bottle.name} src={bottle.image} />
										</div> : null}
									</div>
								</Col>
							})}
						</Row>
					</div>
					{/* Beer Bottles Section */}
					<div className="BottleListSection">
						<div className="SectionTitle">
							{Strings.listOfBottles.listOfBeerBottles}
							<Button onClick={() => dispatch(push('bottle_form', { bottleType: 'beer' }))} type="primary">
								{Strings.bottleDetails.addBeer}
							</Button>
						</div>
						<Row gutter={12}>
							{listOfBeerBottles?.map((bottle: any) => {
								return <Col key={`bottle_${bottle.id}`} xs={24} md={12} lg={6}>
									<div className="BottleListSection_Item" onClick={() => dispatch(push(`bottle/${bottle.id}`))}>
										<div className="BottleListSection_Item_Header">
											<div>
												<div className="BottleListSection_Item_Brand">
													{bottle.brand}
												</div>
												<div className="BottleListSection_Item_Title">
													{bottle.name}
												</div>
											</div>
											{/* Verify if has Promo Price */}
											<div className={`BottleListSection_Item_Price ${bottle.promoPrice ? 'promo': ''}`}>
												{bottle.promoPrice ? formatPrice(bottle.promoPrice) : formatPrice(bottle.price)}
												{bottle.promoPrice ? <span>{formatPrice(bottle.price)}</span> : null}
											</div>
										</div>
										{bottle.image ? <div className="BottleListSection_Image_Container">
											<img alt={bottle.name} src={bottle.image} />
										</div> : null}
									</div>
								</Col>
							})}
						</Row>
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

export default connect(mapStateToProps)(Home);