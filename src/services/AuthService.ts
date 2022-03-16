import { apiClient } from "./ApiClient"

class AuthService {
  async getNonce(address: string) {
    const res = await apiClient.req({
      method: "GET",
      url: "/auth/get-nonce?address=" + address,
    })
    if (res?.data?.error_code === "") {
      return res?.data?.data?.nonce
    }
    return null
  }

  async login(address: string, sign: string) {
    const res = await apiClient.req({
      method: "POST",
      url: "/auth/login",
      data: { address, sign },
    })
    if (res?.data?.error_code === "") {
      const token = res?.data?.data?.token
      return token
    }
    return null
  }
}

export const authService = new AuthService()
