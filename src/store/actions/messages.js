import { apiCall } from "../../services/api";
import { REMOVE_MESSAGE, ADD_MESSAGE, LOAD_MESSAGES } from "../actionsTypes";
import { addError } from "./errors";
import history from "../../history";

export const loadMessages = messages => ({
  type: LOAD_MESSAGES,
  messages
});

export const remove = id => ({
  type: REMOVE_MESSAGE,
  id
});

export const removeMessage = (userId, messageId) => dispatch => {
  return apiCall("delete", `/api/users/${userId}/messages/${messageId}`)
    .then(() => dispatch(remove(messageId)))
    .catch(err => dispatch(addError(err.message)));
};

export const fetchMessages = () => dispatch => {
  return apiCall("get", "/api/messages")
    .then(res => dispatch(loadMessages(res)))
    .catch(err => dispatch(addError(err.message)));
};

export const postNewMessage = text => (dispatch, getState) => {
  let { currentUser } = getState();
  let id = currentUser.user.id;
  return apiCall("post", `/api/users/${id}/messages`, { text })
    .then(res => {
      dispatch(loadMessages(res));
      history.push("/");
    })
    .catch(err => dispatch(addError(err.message)));
};
