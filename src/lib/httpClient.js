import axios from "axios";

export const refresh = async () => {
	const refreshToken = localStorage.getItem("refreshToken");

	try {
		const res = await axios.post(
			`${process.env.REACT_APP_KUBIG_PUBLIC_API_URL}/auth/refresh`,
			{},
			{ headers: { Authorization: `Bearer ${refreshToken}` } }
		);
		if (res.data.accessToken && res.data.refreshToken) {
			localStorage.setItem("accessToken", res.data.accessToken);
			localStorage.setItem("refreshToken", res.data.refreshToken);
			return true;
		}
	} catch (err) {
		console.log(err);
	}
	localStorage.removeItem("refreshToken");
	localStorage.removeItem("accessToken");

	return false;
};

const client = axios.create({
	baseURL: process.env.REACT_APP_KUBIG_PUBLIC_API_URL,
});

client.interceptors.request.use((config) => {
	const token = localStorage.getItem("accessToken");
	if (token && config.headers) {
		config.headers["Authorization"] = `Bearer ${token}`;
	}
	return config;
});

client.interceptors.response.use(
	(response) => response,
	async (error) => {
		console.log("error", error);
		if (error.response && error.response.status === 401) {
			localStorage.removeItem("accessToken");
			const refreshSuccess = await refresh();
			if (refreshSuccess) {
				const originalRequest = error.config;
				originalRequest.headers.Authorization = `Bearer ${localStorage.getItem("accessToken")}`;
				return client.request(originalRequest);
			}
			window.location.href = "/auth/login";
		} else return error.response;
	}
);

export default client;
