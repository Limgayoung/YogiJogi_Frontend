import { defineStore } from "pinia";
import axios from "axios";

export const useUserStore = defineStore("user", {
  state: () => ({
    user: null,
    jwtToken: null,
    userInfo: null,
  }),
  actions: {
    async login(credentials) {
      try {
        const response = await axios.post(
          "http://localhost/api/users/login",
          credentials
        );
        this.user = response.data.data.userId;
        this.jwtToken = response.data.data.jwtToken;
        
        console.log(this.jwtToken);
        return response.data;
      } catch (error) {
        console.error("로그인 오류:", error);
        throw error;
      }
    },
    async logout() {
      this.user = null;
      this.jwtToken = null;
      this.userInfo = null;
    },
    async fetchUserInfo() {
      try {
        const config = {
          method: "get",
          url: `http://localhost/api/users/${this.user}`,
          headers: {
            Authorization: `${this.jwtToken.accessToken}`,
          },
        };

        console.log("Axios Request Config:", config);

        const response = await axios(config);
        console.log("response:", response.data);
        this.userInfo = response.data.data;
      } catch (error) {
        console.error("사용자 정보 요청 오류:", error);
        throw error;
      }
    },
  },
  getters: {
    isAuthenticated: (state) => !!state.user,
  },
  persist: {
    enabled: true,
    strategies: [
      { 
        key: 'user',
        storage: localStorage,
        paths: ['user', 'jwtToken'] // 저장할 상태 지정
      },
    ],
  },
});
