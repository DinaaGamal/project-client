import { apiCall, setTokenHeader } from '../../services/api';
import { SET_CURRENT_USER } from '../actionsTypes';
import { addError, removeError } from './errors';

export const setCurrentUser = (user) => {
	return {
		type: SET_CURRENT_USER,
		user
	};
};

export const setAuthorizationToken = (token) => {
	setTokenHeader(token);
};

export const authUser = (type, userData) => (dispatch) => {
	return new Promise((resolve, reject) => {
		return apiCall('post', `/api/auth/${type}`, userData)
			.then(({ token, ...user }) => {
				localStorage.setItem('jwtToken', token);
				setAuthorizationToken(token);
				dispatch(setCurrentUser(user));
				dispatch(removeError()); //ana f l app  b7ot l err manuall w bshelo manual
				resolve();
			})
			.catch((err) => {
				dispatch(addError(err.message));
				reject();
			});
	});
};

export const logout = () => (dispatch) => {
	localStorage.clear();
	setAuthorizationToken(false);
	dispatch(setCurrentUser({}));
};
