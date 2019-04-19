import { apiCall } from '../../services/api';
import { REMOVE_MESSAGE, ADD_MESSAGE, LOAD_MESSAGES } from '../actionsTypes';
import { addError, removeError } from './errors';
import history from '../../history';

export const loadMessages = (messages) => ({
	type: LOAD_MESSAGES,
	messages
});

export const remove = (id) => ({
	type: REMOVE_MESSAGE,
	id
});

export const removeMessage = (userId, messageId) => (dispatch) => {
	return apiCall('delete', `/api/users/${userId}/messages/${messageId}`)
		.then(() => dispatch(remove(messageId)))
		.catch((err) => dispatch(addError(err.message)));
};

export const fetchMessages = () => (dispatch) => {
	return apiCall('get', '/api/messages')
		.then((res) => dispatch(loadMessages(res)))
		.catch((err) => dispatch(addError(err.message)));
};

export const postNewMessage = (text) => async (dispatch, getState) => {
	try {
		let { currentUser } = getState();
		let id = currentUser.user.id;
		const res = await apiCall('post', `/api/users/${id}/messages`, { text });
		if (res) {
			// await dispatch(loadMessages(res));
			history.push('/');
		}
	} catch (error) {
		dispatch(addError(error.message));
	}
};
