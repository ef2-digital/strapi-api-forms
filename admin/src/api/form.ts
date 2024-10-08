import fetchInstance from '../utils/fetch';
import { FormResponse, FormType, FormRequest, MessageType } from '../utils/types';

const formRequests = {
	getForms: async (queryFilter?: object): Promise<FormResponse> => {
		const data = await fetchInstance(`forms?${queryFilter}`, 'GET', null, null, true);

		return data.json();
	},

	getForm: async (id: string | number, queryFilter?: object): Promise<FormType> => {
		const data = await fetchInstance(`form/${id}${queryFilter ? `?${queryFilter}` : ''}`, 'GET', null, null, true);
		const form = await data.json();

		return form.data;
	},

	getMessage: async (id: string | number): Promise<MessageType> => {
		const data = await fetchInstance(`form/${id}/message`, 'GET', null, null, true);
		const message = await data.json();

		return message.data;
	},

	getFormSubmissions: async (id: string, queryFilter?: object): Promise<FormType> => {
		const data = await fetchInstance(`form/${id}/submissions${queryFilter ? `?${queryFilter}` : ''}`, 'GET', null, null, true);
		const form = await data.json();

		return form.data;
	},

	submitForm: async (formData?: object): Promise<FormRequest> => {
		const data = await fetchInstance(`forms`, 'POST', null, formData, true);

		return data.json();
	},

	updateForm: async (id: string, formData?: object): Promise<FormType[]> => {
		const data = await fetchInstance(`forms/${id}`, 'PUT', null, formData, true);

		return data.json();
	},

	deleteForm: async (id: number): Promise<any> => {
		const data = await fetchInstance(`forms/${id}`, 'DELETE', null, null, true);

		return data.json();
	},
};

export default formRequests;
