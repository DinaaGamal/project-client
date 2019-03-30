import React from 'react';
import { Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from '../index';
import Navbar from './Navbar';
import Main from './Main';
import { setAuthorizationToken, setCurrentUser } from '../store/actions/auth';
import jwtDecode from 'jwt-decode';
import history from '../history';
const store = configureStore();

if (localStorage.jwtToken) {
	setAuthorizationToken(localStorage.jwtToken);
	//prevent anyone to manually tampering with the key of jwt in localstorage

	try {
		store.dispatch(setCurrentUser(jwtDecode(localStorage.jwtToken)));
	} catch (e) {
		store.dispatch(setCurrentUser({}));
	}
}

const App = () => {
	return (
		<Provider store={store}>
			<Router history={history}>
				<div className="onboarding">
					<Navbar />
					<Main />
				</div>
			</Router>
		</Provider>
	);
};

export default App;
