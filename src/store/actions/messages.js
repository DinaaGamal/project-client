import { apiCall } from '../../services/api';
import { REMOVE_MESSAGE, ADD_MESSAGE } from '../actionsTypes';
import { addError } from './errors';
import history from '../../history';

export const loadMessages = (messages) => ({
	type: 'LOAD_MESSAGES',
	messages
});
export const addMessage = (message) => ({
	type: ADD_MESSAGE,
	message
});

export const remove = (id) => ({
	type: REMOVE_MESSAGE,
	id
});

export const removeMessage = (user_id, message_id) => {
	return (dispatch) => {
		return apiCall('delete', `/api/users/${user_id}/messages/${message_id}`)
			.then(() => dispatch(remove(message_id)))
			.catch((err) => {
				dispatch(addError(err.message));
			});
	};
};

export const fetchMessages = () => {
	return (dispatch) => {
		apiCall('GET', '/api/messages').then((res) => dispatch(loadMessages(res))).catch((err) => {
			dispatch(addError(err.message));
		});
	};
};

export const postNewMessage = (text) => async (dispatch, getState) => {
	// let { currentUser } = getState();
	// let id = currentUser.user.id;
	// apiCall('post', `/api/users/${id}/messages`, { text })
	// 	.then((res) => {
	//
	// 	})
	// 	.then(() => {
	// 		history.push('/');
	// 	})
	// 	.catch((err) => dispatch(addError(err.message)));
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
