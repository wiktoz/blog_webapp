import api from "./api"
import { redirect } from 'next/navigation'

export const fetcher = async (url: string) => {
  try {
      const response = await api.get(url);
      return response.data; // Return only the data from the Axios response
  } catch (error:any) {
      throw error.response.data; // Throw the error data from the Axios response
  }
}