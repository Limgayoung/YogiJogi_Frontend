<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">요기조기</router-link>
      <button
        class="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ml-auto">
          <li class="nav-item">
            <router-link class="nav-link" to="/">홈</router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/bootstrapTest"
              >여행지도</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/plan">여행코스</router-link>
          </li>
          <li class="nav-item">
            <router-link v-if="!isAuthenticated" class="nav-link" to="/login"
              >로그인</router-link
            >
            <router-link v-else class="nav-link" to="/mypage"
              >마이페이지</router-link
            >
          </li>
          <li>
            <router-link
              v-if="isAuthenticated"
              @click="logout_nav"
              to="/"
              class="nav-link"
              >로그아웃</router-link
            >
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { computed } from "vue";
import { useUserStore } from "../stores/userStore";

export default {
  setup() {
    const userStore = useUserStore();
    const isAuthenticated = computed(() => userStore.isAuthenticated);
    console.log("asd", isAuthenticated);
    const user = computed(() => userStore.user);

    const logout_nav = async () => {
      const userStore = useUserStore();
      await userStore.logout();
    };

    return {
      isAuthenticated,
      user,
      logout_nav
    };
  },
};
</script>

<style scoped>
/* 스타일 생략 */
</style>

<style scoped>
.navbar-nav {
  margin-left: auto;
}

@font-face {
  font-family: "GongGothicMedium";
  src: url("https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_20-10@1.0/GongGothicMedium.woff")
    format("woff");
  font-weight: normal;
  font-style: normal;
}

.container-fluid {
  font-family: "GongGothicMedium";
}

.navbar-brand {
  margin-left: 30px;
}
</style>
