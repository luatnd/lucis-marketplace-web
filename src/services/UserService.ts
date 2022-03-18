import { apiClient } from "./ApiClient"

class UserService {
  async getUser() {
    const res = await apiClient.req({
      method: "GET",
      url: "/user/get",
    })
    if (res?.data?.error_code === "") {
      return res?.data?.data
    }
    return null
  }
}

export const userService = new UserService()
