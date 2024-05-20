<template>
  <div class="container">
    <div class="text-center mb-4">
      <div class="login-text">마이페이지</div>
    </div>

    <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
      <div class="input-group">
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon1">
            <i class="mdi mdi-account"></i>
          </span>
        </div>
        <input
          v-model="userInfo.loginId"
          type="text"
          class="form-control"
          placeholder="Email address"
          aria-label="Email address"
          aria-describedby="basic-addon1"
          disabled
        />
      </div>

      <div class="input-group mt-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon2">
            <i class="mdi mdi-account-circle"></i>
          </span>
        </div>
        <input
          v-model="userInfo.name"
          type="text"
          class="form-control"
          placeholder="Name"
          aria-label="Name"
          aria-describedby="basic-addon2"
        />
      </div>

      <div class="input-group mt-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon3">
            <i class="mdi mdi-email"></i>
          </span>
        </div>
        <input
          v-model="userInfo.email"
          type="email"
          class="form-control"
          placeholder="Email"
          aria-label="Email"
          aria-describedby="basic-addon3"
        />
      </div>

      <div class="input-group mt-3">
        <div class="input-group-prepend">
          <span class="input-group-text" id="basic-addon4">
            <i class="mdi mdi-account-circle-outline"></i>
          </span>
        </div>
        <input
          v-model="userInfo.nickName"
          type="text"
          class="form-control"
          placeholder="Nickname"
          aria-label="Nickname"
          aria-describedby="basic-addon4"
        />
      </div>

      <v-btn @click="updateUserInfo" class="mb-8" color="primary" size="large" variant="outlined" block>
        수정 완료
      </v-btn>
    </v-card>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useUserStore } from '@/stores/userStore.js';

export default {
  setup() {
    const userInfo = ref({
      loginId: '',
      name: '',
      email: '',
      nickName: ''
    });
    const userStore = useUserStore();

    const updateUserInfo = async () => {
      try {
        await userStore.updateUserInfo(userInfo.value);
      } catch (error) {
        console.error('사용자 정보 업데이트 오류:', error);
        alert('사용자 정보를 업데이트하는 데 실패했습니다. 다시 시도해주세요.');
      }
    };

    onMounted(() => {
      userStore.fetchUserInfo();
      console.log(userInfo);
    });

    return {
      userInfo,
      updateUserInfo
    };
  },
};
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

.btn-primary {
  background-color: #007bff;
  border-color: #007bff;
}

.btn-primary:hover {
  background-color: #0056b3;
  border-color: #0056b3;
}

.btn-primary:focus,
.btn-primary.focus {
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.5);
}

.text-blue {
  color: #007bff;
}

.text-blue:hover {
  color: #0056b3;
}

.text-decoration-none {
  text-decoration: none;
}

.mt-3 {
  margin-top: 1rem;
}

.input-group {
  width: 100%;
}

.input-group-text {
  background-color: #fff;
  border: 1px solid #ced4da;
  color: #495057;
}

.input-group-text i {
  font-size: 1rem;
}

.form-control {
  border: 1px solid #ced4da;
  border-radius: 0.25rem;
}

.form-control:focus {
  border-color: #80bdff;
  box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
}
</style>
