import { SET_CURRENT_USER } from '../actionsTypes';

const DEFAULT_STATE = {
	isAuthenticated: false, // if user info is true when he logged in
	user: {} // user info when logged in
};

export default (state = DEFAULT_STATE, action) => {
	switch (action.type) {
		case SET_CURRENT_USER:
			return {
				//turn empty object  into false or if there are key ..true(another way boolean(object.keys(action.user).length))
				isAuthenticated: !!Object.keys(action.user).length,
				user: action.user
			};
		default:
			return state;
	}
};
