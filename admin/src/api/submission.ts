import fetchInstance from "../utils/fetch";
import { SubmissionResponse, SubmissionsResponse } from "../utils/types";

const submissionRequests = {
  getSubmissions: async (options?: object): Promise<SubmissionsResponse> => {
    const data = await fetchInstance(`submissions?${options}`, "GET");

    return data.json();
  },

  getSubmission: async (id: string): Promise<SubmissionResponse> => {
    const data = await fetchInstance(`submission/${id}`, "GET");

    return data.json();
  },
};

export default submissionRequests;
