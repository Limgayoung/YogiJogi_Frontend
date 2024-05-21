<template>
  <div class="container">
    <div class="text-center mb-4">
      <div class="login-text">마이페이지</div>
    </div>

    <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
      <v-text-field
        v-model="userInfo.loginId"
        label="아이디"
        prepend-inner-icon="mdi-account"
        disabled
        class="mt-3"
      ></v-text-field>

      <v-text-field
        v-model="userInfo.name"
        label="이름"
        prepend-inner-icon="mdi-account-circle"
        class="mt-3"
      ></v-text-field>

      <v-text-field
        v-model="userInfo.email"
        label="이메일"
        prepend-inner-icon="mdi-email"
        class="mt-3"
      ></v-text-field>

      <v-text-field
        v-model="userInfo.nickName"
        label="닉네임"
        prepend-inner-icon="mdi-account-circle-outline"
        class="mt-3"
      ></v-text-field>

      <v-row class="mt-8">
        <v-col cols="6">
          <v-btn @click="updateUserInfo" class="mb-8" color="primary" size="large" block>
            수정 완료
          </v-btn>
        </v-col>
        <v-col cols="6">
          <v-btn @click="withdraw" class="mb-8" color="error" size="large" block>
            탈퇴
          </v-btn>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>
<script setup>
import { reactive, onMounted } from 'vue';
import { useUserStore } from '@/stores/userStore.js';
import axios from 'axios';
import router from "@/router";

const userStore = useUserStore();

const userInfo = reactive({
  loginId: '',
  name: '',
  email: '',
  nickName: ''
});

const updateUserInfo = async () => {
  try {
    // API로 수정된 정보를 보낼 준비
    const userData = {
      userId: userStore.user, // 현재 로그인한 사용자의 ID
      name: userInfo.name,
      nickName: userInfo.nickName,
      email: userInfo.email
    };
    // API로 PUT 요청 보내기
    await axios.put(`http://localhost/api/users`, userData, {
      headers: {
        Authorization: `${userStore.jwtToken.accessToken}`
      }
    });
    alert('사용자 정보가 업데이트되었습니다.');
  } catch (error) {
    console.error('사용자 정보 업데이트 오류:', error);
    alert('사용자 정보를 업데이트하는 데 실패했습니다. 다시 시도해주세요.');
  }
};

const withdraw = async () => {
  try {
    // 탈퇴 요청 보내기
    await axios.delete(`http://localhost/api/users/${userStore.user}`, {
      headers: {
        Authorization: `${userStore.jwtToken.accessToken}`
      }
    });
    alert('회원 탈퇴가 완료되었습니다.');
    // 로그아웃 처리
    await userStore.logout();
    router.push({ name: 'main' });
  } catch (error) {
    console.error('회원 탈퇴 오류:', error);
    alert('회원 탈퇴에 실패했습니다. 다시 시도해주세요.');
  }
};


onMounted(async () => {
  await userStore.fetchUserInfo();
  Object.assign(userInfo, userStore.userInfo); // userInfo를 userStore.userInfo로 업데이트
});
</script>
<style scoped>
.container {
  font-family: "GongGothicMedium";
}

.login-text {
  margin-top: 15px;
  font-size: 50px;
}

.text-center {
  text-align: center;
}

.mt-3 {
  margin-top: 1rem;
}

.mb-8 {
  margin-bottom: 2rem;
}
</style>
