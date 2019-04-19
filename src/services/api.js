import axios from 'axios';

export function setTokenHeader(token) {
	token
		? (axios.defaults.headers.common['Authorization'] = `Bearer ${token}`)
		: delete axios.defaults.headers.common['Authorization'];
}
// generic function
export function apiCall(method, path, data) {
	return new Promise((resolve, reject) => {
		return axios
			[method.toLowerCase()](path, data) // axios.get("/", data)
			.then((res) => {
				return resolve(res.data);
			})
			.catch((err) => {
				return reject(err.response.data.error);
			});
	});
}
