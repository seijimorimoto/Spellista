import { AxiosRequestConfig } from 'axios';

const axiosConfigBuilder = (
  authorization: string | undefined,
  queryParams?: any
): AxiosRequestConfig => {
  return {
    headers: {
      Accept: 'application/json',
      Authorization: authorization,
      'Content-type': 'application/json'
    },
    params: queryParams
  };
};

export { axiosConfigBuilder };
