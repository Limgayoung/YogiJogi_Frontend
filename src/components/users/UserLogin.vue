<template>
  <div class="container">
    <div class="text-center mb-4">
      <div class="login-text">로그인</div>
    </div>

    <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
      <div class="text-subtitle-1 text-medium-emphasis">아이디</div>

      <v-text-field
        v-model="loginId"
        density="compact"
        placeholder="Email address"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
        class="font-gothic-medium"
      ></v-text-field>

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        비밀번호
        <a class="text-caption text-decoration-none text-blue" href="#" rel="noopener noreferrer" target="_blank">
          비밀번호 찾기
        </a>
      </div>

      <v-text-field
        v-model="password"
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        density="compact"
        placeholder="Enter your password"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        class="font-gothic-medium"
        @click:append-inner="visible = !visible"
      ></v-text-field>

      <v-btn @click="handleLogin" class="mb-8" color="blue" size="large" variant="tonal" block>
        로그인
      </v-btn>

      <v-card-text class="text-center">
        <router-link to="/join" class="text-blue text-decoration-none">
          회원가입 <v-icon icon="mdi-chevron-right"></v-icon>
        </router-link>
      </v-card-text>
    </v-card>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/userStore.js';

const loginId = ref('');
const password = ref('');
const visible = ref(false);
const router = useRouter();
const userStore = useUserStore();

const handleLogin = async () => {
  try {
    const credentials = {
      loginId: loginId.value,
      password: password.value,
    };
    await userStore.login(credentials);
    console.log(credentials);
    console.log('로그인 성공:', userStore.user);
    router.push('/');
  } catch (error) {
    console.error('로그인 오류:', error);
    alert('로그인에 실패했습니다. 다시 시도해주세요.');
  }
};
</script>

<style scoped>
@font-face {
  font-family: "GongGothicMedium";
  src: url("https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_20-10@1.0/GongGothicMedium.woff") format("woff");
  font-weight: normal;
  font-style: normal;
}

.container {
  font-family: "GongGothicMedium";
}

.text-subtitle-1,
.text-blue,
.font-gothic-medium,
.text-caption,
.container,
.login-text {
  font-family: "GongGothicMedium";
}

.login-text {
  margin-top: 15px;
  font-size: 50px;
}
</style>
