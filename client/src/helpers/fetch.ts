import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

export const fetchAPI = async ({
  method = 'GET',
  url = '/',
  params,
  data,
}: AxiosRequestConfig): Promise<AxiosResponse> => {
  return await axios({
    method,
    baseURL: process.env.REACT_APP_BACKEND,
    params,
    url,
    data,
    headers: {
      'Content-Type': 'application/json',
    },
  })
}
