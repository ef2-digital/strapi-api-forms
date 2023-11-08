import fetchInstance from "../utils/fetch";
import { FormResponse, FormType, FormRequest } from "../utils/types";

const formRequests = {
  getForms: async (queryFilter?: object): Promise<FormResponse> => {
    const data = await fetchInstance(`forms?${queryFilter}`, "GET");

    return data.json();
  },

  getForm: async (id: string, queryFilter?: object): Promise<FormType> => {
    const data = await fetchInstance(
      `form/${id}${queryFilter ? `?${queryFilter}` : ""}`,
      "GET"
    );
    const form = await data.json();

    return form.data;
  },

  getFormSubmissions: async (
    id: string,
    queryFilter?: object
  ): Promise<FormType> => {
    const data = await fetchInstance(
      `form/${id}/submissions${queryFilter ? `?${queryFilter}` : ""}`,
      "GET"
    );
    const form = await data.json();

    return form.data;
  },

  submitForm: async (formData?: object): Promise<FormRequest> => {
    const data = await fetchInstance(`forms`, "POST", null, formData);

    return data.json();
  },

  updateForm: async (id: string, formData?: object): Promise<FormType[]> => {
    const data = await fetchInstance(`forms/${id}`, "PUT", null, formData);

    return data.json();
  },

  deleteForm: async (id: number): Promise<any> => {
    const data = await fetchInstance(`forms/${id}`, "DELETE", null);

    return data.json();
  },
};

export default formRequests;
