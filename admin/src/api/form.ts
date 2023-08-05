import fetchInstance from "../utils/fetch";
import { FormResponse, FormType } from "../utils/types";

const formRequests = {
  getForms: async (options?: object): Promise<FormResponse> => {
    const data = await fetchInstance(`forms`, 'GET', options);

    return data.json();
  },

  submitForm: async (formData?: object): Promise<FormType[]> => {
    const data = await fetchInstance(`forms`, 'POST', null, formData);

    return data.json();
  }
}

export default formRequests;
