import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from "axios";

export interface HttpResponse<T> extends Promise<T> {
  data: T;
  status: number;
  message: string;
}

export interface HttpClientOptions {
  baseURL?: string;
  timeout?: number;
  headers?: Record<string, string>;
  logger?: Console["log"];
  requestInterceptor?: (
    config: InternalAxiosRequestConfig
  ) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>;
  responseInterceptor?: (
    response: AxiosResponse
  ) => AxiosResponse | Promise<AxiosResponse>;
}

export interface URLMapping {
  provide?: string;
  params?: Array<string | number>;
  query?: Record<string, string | number | boolean>;
}

export class HttpClient {
  private https: AxiosInstance;

  private logger: Console["log"];

  private requestInterceptor: number;

  private responseInterceptor: number;

  constructor({
    baseURL,
    timeout,
    headers = {},
    logger = console.log,
    requestInterceptor = (config) => config,
    responseInterceptor = (response) => response,
  }: HttpClientOptions = {}) {
    this.https = axios.create({
      baseURL,
      timeout,
      headers,
    });

    this.logger = logger;

    this.requestInterceptor = this.https.interceptors.request.use(
      requestInterceptor,
      (error: Error) => {
        this.logger("Request Error:", error);

        return Promise.reject(error);
      }
    );

    this.responseInterceptor = this.https.interceptors.response.use(
      responseInterceptor,
      (error: Error) => {
        this.logger("Response Error:", error);

        return Promise.reject(error);
      }
    );
  }

  public get<T>(
    url: string | URLMapping,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    if (typeof url === "object" && url?.provide) {
      return this.https.get<T>(url.provide, {
        params: url.query,
      });
    }

    return this.https.get<T>(url as string, config);
  }

  /**
   * @description
   * Makes a DELETE request to the specified URL.
   * @param url - The URL to which the request is sent.
   * @param config - The config to be used for the request.
   */
  public delete<T>(
    url: string | URLMapping,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    if (typeof url === "object" && url?.provide) {
      return this.https.delete<T>(url.provide, {
        params: url.query,
      });
    }

    return this.https.delete<T>(url as string, config);
  }

  /**
   * @description
   * Makes a PATCH request to the specified URL.
   * @param url - The URL to which the request is sent.
   * @param data - The data to be sent as the request body.
   * @param config - The config to be used for the request.
   */
  public patch<T, B>(
    url: string | URLMapping,
    data?: B,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    if (typeof url === "object" && url?.provide) {
      return this.https.patch<T>(url.provide, data, {
        params: url.query,
      });
    }

    return this.https.patch<T>(url as string, data, config);
  }

  /**
   * @description
   * Makes a POST request to the specified URL.
   * @param url - The URL to which the request is sent.
   * @param data - The data to be sent as the request body.
   * @param config - The config to be used for the request.
   */
  public post<T, B>(
    url: string | URLMapping,
    data?: B,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    if (typeof url === "object" && url?.provide) {
      return this.https.post<T>(url.provide, data, {
        params: url.query,
      });
    }

    return this.https.post<T>(url as string, data, config);
  }

  /**
   * @description
   * Makes a PUT request to the specified URL.
   * @param url The URL to which the request is sent.
   * @param data The data to be sent as the request body.
   * @param config The config to be used for the request.
   */
  public put<T, B>(
    url: string | URLMapping,
    data?: B,
    config?: AxiosRequestConfig
  ): Promise<AxiosResponse<T>> {
    if (typeof url === "object" && url?.provide) {
      return this.https.put<T>(url.provide, data, {
        params: url.query,
      });
    }

    return this.https.put<T>(url as string, data, config);
  }

  /**
   * @description
   * Removes all interceptors, including the default ones.
   */
  public removeInterceptors() {
    this.https.interceptors.request.eject(this.requestInterceptor);

    this.https.interceptors.response.eject(this.responseInterceptor);
  }
}

export default HttpClient;
