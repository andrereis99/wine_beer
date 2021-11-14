import React from "react";
import { connect } from "react-redux";
import { Route, Redirect, Switch } from "react-router-dom";
import { setLanguage, setBottles } from "../../store/actions";
import { Home, BottleDetails, BottleForm } from "../index";

export class RoutesContainer extends React.Component<any, any> {
	
	componentDidMount() {
		const { dispatch } = this.props;

		dispatch(setLanguage('pt'));
		// Here I populate default bottles for example, in the production case wouldn't be here
		dispatch(setBottles([{
				id: 1,
				name: 'Wine 1',
				type: 'wine',
				brand: 'Brand 1',
				description: { pt: 'Descrição do Vinho 1', en: 'Wine 1 Description' },
				image: 'https://media.istockphoto.com/photos/wine-bottle-picture-id182837880?k=20&m=182837880&s=170667a&w=0&h=SRogjWC0MQ-1is6KlHhYnKraqDxtCwA0TlYrCWWrEtw=',
				price: 16,
			}, {
				id: 2,
				name: 'Wine 2',
				type: 'wine',
				brand: 'Brand 2',
				description: { pt: 'Descrição do Vinho 2', en: 'Wine 2 Description' },
				image: 'https://media.istockphoto.com/photos/wine-bottle-isolated-on-the-white-background-mock-up-label-picture-id1278821903?b=1&k=20&m=1278821903&s=170667a&w=0&h=EfWPg_2FZo7wiAsHrXS21paRavARGR4_-oxrIPMDYTs=',
				price: 21,
				promoPrice: 17.99,
			}, {
				id: 3,
				name: 'Beer 1',
				type: 'beer',
				brand: 'Brand 1',
				description: { pt: 'Descrição da Cerveja 1', en: 'Beer 1 Description' },
				image: 'https://envato-shoebox-0.imgix.net/2f3a/315d-3aa5-4c5f-8567-57176ed7b662/Brown+cold+beer+bottle+with+drops.jpg?auto=compress%2Cformat&fit=max&mark=https%3A%2F%2Felements-assets.envato.com%2Fstatic%2Fwatermark2.png&markalign=center%2Cmiddle&markalpha=18&w=1600&s=938481553f5cae67eb1a4cc20c0b8e92',
				price: 1.20,
			}, {
				id: 4,
				name: 'Beer 2',
				type: 'beer',
				brand: 'Brand 2',
				description: { pt: 'Descrição da Cerveja 2', en: 'Beer 2 Description' },
				image: 'https://www.costanteimports.com.au/media/catalog/product/cache/3e8af2b46744aa4b2e6bbd91bb98c923/3/3/330ml_longneck_pivo_braun_cc_ew_0019.jpg',
				price: 1.99,
			}
		]));
	}

	componentDidUpdate() {
		const elem = document.getElementById("app_content");

		if (elem) {
			elem.scrollTop = 0;
		}
	}

	render() {
		return (
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/bottle/:id" component={BottleDetails} />
				<Route exact path="/bottle_form/:id?" component={BottleForm} />
				<Redirect to="/" />
			</Switch>
		);
	}
}

const mapStateToProps = (state: any) => ({
  	router: state.router,
});

export default connect(mapStateToProps)(RoutesContainer);
