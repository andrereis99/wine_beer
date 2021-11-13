import React from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { ConnectedRouter } from 'connected-react-router';
import history from './utils/history';
import { store, persistor } from './store';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
	<Provider store={store}>
		<PersistGate loading={null} persistor={persistor}>
			<ConnectedRouter history={history}>
				<App />
			</ConnectedRouter>
		</PersistGate>
	</Provider>,
	document.getElementById('app')
);

serviceWorker.unregister();
