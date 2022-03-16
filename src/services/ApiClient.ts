import axios, { AxiosInstance, AxiosRequestConfig } from "axios"
import { API_URL } from "src/configs"
import { appLogger } from "./../utils/Logger"

const isClient = typeof window !== "undefined"
class ApiClient {
  private instance: AxiosInstance
  private baseUrl: string = API_URL
  constructor() {
    this.instance = axios.create({
      baseURL: this.baseUrl,
      timeout: 10000,
      headers: {},
    })
  }

  public getBaseUrl() {
    return this.baseUrl
  }

  public applyAuth(jwtToken: string) {
    this.instance.defaults.headers.common["Authorization"] =
      "Bearer " + jwtToken
  }

  public req(axiosOpt: AxiosRequestConfig) {
    return this.instance.request(axiosOpt).catch(function (error) {
      if (error.response) {
        isClient && appLogger.log("ApiService: ERROR: ", error.response.data)
        return error.response
      } else if (error.request) {
        isClient && appLogger.log("ApiService: ERROR: ", error.request)
        return {
          data: {
            error_code: "no_response",
          },
        }
      } else {
        isClient && appLogger.log("ApiService: ERROR: ", error.message)
        return {
          data: {
            error_code: "not_request",
          },
        }
      }
    })
  }

  public get(axiosOpt: AxiosRequestConfig) {
    axiosOpt.method = "GET"
    return this.req(axiosOpt)
  }

  public post(axiosOpt: AxiosRequestConfig) {
    axiosOpt.method = "POST"
    return this.req(axiosOpt)
  }
}

export const apiClient = new ApiClient()

export interface AppApiResponse {
  error: string | null
  message: string | null
  data: any
}
