import axios, { AxiosInstance, AxiosResponse } from 'axios';
import axiosRetry from 'axios-retry';

declare module 'axios' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface AxiosResponse<T = any> extends Promise<T> {}
}

abstract class BaseService {
  protected readonly instance: AxiosInstance;

  public constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL
    });
    axiosRetry(this.instance, { retries: 3 });
    this._initializeResponseInterceptor();
  }

  private _initializeResponseInterceptor = () => {
    this.instance.interceptors.response.use(this._handleResponse, this._handleError);
  };

  private _handleResponse = ({ data }: AxiosResponse) => data;

  protected _handleError = (error: any) => Promise.reject(error);
}

export default BaseService;
