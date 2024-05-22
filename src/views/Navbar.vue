<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <div class="container-fluid">
      <router-link class="navbar-brand" to="/">
        <img
          src="@/assets/images/noimg.png"
          alt="No Image"
          style="width: 50px; height: 50px; margin-left: 15px"
        />
        요기조기</router-link
      >
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
              @click="logoutNav"
              to="/"
              class="nav-link"
            >
              로그아웃
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed } from "vue";
import { useUserStore } from "../stores/userStore";

const userStore = useUserStore();
const isAuthenticated = computed(() => userStore.isAuthenticated);
const user = computed(() => userStore.user);

const logoutNav = async () => {
  await userStore.logout();
};
</script>

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
