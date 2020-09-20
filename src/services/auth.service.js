import axios from "axios";

const API_URL = "http://50.116.40.131:8000/api/v1";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "/token/obtain/", {
        username,
        password,

        headers: {
          Authorization: localStorage.getItem("access_token")
            ? "JWT " + localStorage.getItem("access_token")
            : null,
          "Content-Type": "application/json",
          accept: "application/json",
        },
      })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }

        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("/user/details"));
  }
}

export default new AuthService();
