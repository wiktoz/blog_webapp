import api from "./api"

export const fetcher = async (url: string) => {
  try {
      const response = await api.get(url);
      return response.data; // Return only the data from the Axios response
  } catch (error:any) {
      if (error.response) {
        throw new Error(`Error: ${error.response.status} - ${error.response.data.message || error.message}`);
      } else if (error.request) {
        throw new Error("No response received from the server.");
      } else {
        throw new Error(`Error: ${error.message}`);
      }
  }
}