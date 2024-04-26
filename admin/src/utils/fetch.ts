import { auth } from "@strapi/helper-plugin";
import pluginId from "../pluginId";

const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${auth.getToken()}`,
};

const fetchInstance = async (
  endpoint: string,
  method: string,
  options?: object | null,
  formData?: object | null,
  isAdmin?: boolean
) => {
  const route = `${isAdmin ? "/" : "/api/"}`;

  return fetch(
    `${route}${pluginId}/${endpoint}${
      options ? `?${new URLSearchParams({ ...options })}` : ""
    }`,
    {
      method,
      mode: "cors",
      headers,
      body: formData && JSON.stringify({ data: formData }),
    }
  );
};

export default fetchInstance;
