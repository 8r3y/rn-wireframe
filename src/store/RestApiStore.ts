import { IRootStore } from ".";
import axios, { AxiosRequestConfig, AxiosResponse, Method } from "axios";
import { restApiRoutes } from 'constants/rest-api';
import { extractDate } from "helpers/utils";

interface IRestApiRequestProps {
	method: Method;
	path: string;
	body?: any;
	successStatus?: number;
	errorStatus?: number;
	responseType?: "text" | "json" | "blob";
	withToken?: boolean;
}

const { API_BACKED_URL } = restApiRoutes;

class RestApi {
	private _rootStore: IRootStore;

	constructor(rootStore: IRootStore) {
		this._rootStore = rootStore;

		//Запустим interceptor для конвертирования ISO DateTime строки в объект Date
		axios.interceptors.response.use(response => {
			if (response.status >= 200 && response.status < 400 && response?.data) {
				response.data = extractDate(response.data);
			}
			return response;
		}, error => {
			return Promise.reject(error);
		});
	}

	async request<T>(props: IRestApiRequestProps): Promise<T | null> {
		const { method, path, body, successStatus, responseType = "json", withToken, errorStatus } = props;
		const url = API_BACKED_URL + path;
		const opts: AxiosRequestConfig = {
			url,
			method,
			// mode: "cors",
			headers: {
				accept: '*/*',
				'Content-Type': 'application/json',
				'Access-Control-Allow-Origin': '*'
			},
			responseType
		}

		if (body) opts.data = JSON.stringify(body);

		if (withToken) {
			const { userToken, } = this._rootStore.userStore;

			// Здесь можно реализовать функционал обновления токена
			if (!userToken) {
				this._rootStore.userStore.signOut();
				return null;
			}
			opts.headers = { ...opts.headers, "Authorization": `Bearer ${userToken}` } // Или любой другой вид авторизации
		}

		return await axios(opts).then((res: AxiosResponse) => {
			console.log('Fetch performed', opts, res.status);
			if (res.status === (successStatus || 200)) { // Не всегда успехом будет res.status === 200
				return res.data as T;
			}
			return null;
		}).catch((err: any) => {
			console.log('Error in Perform Request', { opts, err });
			// Когда необходимо обработать текст из ошибки
			if (errorStatus && err?.response?.status === errorStatus) {
				console.log("Fetch perform expecting error", err.response.data);
				try {
					const json = JSON.parse(err.response.data?.message);
					return json;
				} catch {
					return null;
				}
			}
			return null;
		})
	}
}

export default RestApi;
