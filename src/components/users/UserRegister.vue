<template>
  <div class="error_msg" :class="[isOpen ? 'open' : '']">
    <div class="error_bg"></div>
    <div class="error_wrap">
      <div class="header">
        <span>알림</span>
        <button @click="isOpenToggle()">X</button>
      </div>
      <div class="divider"></div>
      <div class="content">
        {{ message }}
      </div>
      <div class="btn_wrap">
        <button @click="errMsg">확인</button>
      </div>
    </div>
  </div>

  <div class="joinform">
    <h1 class="join">회원가입</h1>

    <form @submit.prevent="checkForm">
      <div class="form-group">
        <label for="name">이름</label>
        <input
          type="text"
          ref="name"
          placeholder="이름"
          id="name"
          v-model="formData.name"
        />
      </div>

      <div class="form-group">
        <div class="id-input-group">
          <label for="loginId">아이디</label>
          <button @click="idcheck" class="idcheck">아이디 중복 체크</button>
        </div>
        <input
          type="text"
          ref="loginId"
          placeholder="아이디"
          id="loginId"
          v-model="formData.loginId"
        />
      </div>

      <div class="form-group">
        <label for="nickname">닉네임</label>
        <input
          type="text"
          ref="nickname"
          placeholder="닉네임"
          id="nickname"
          v-model="formData.nickname"
        />
      </div>

      <div class="form-group">
        <label for="password">비밀번호</label>
        <input
          type="password"
          ref="password"
          placeholder="비밀번호"
          id="password"
          v-model="formData.password"
        />
      </div>

      <div class="form-group">
        <label for="confirm-password">비밀번호 확인</label>
        <input
          type="password"
          placeholder="비밀번호 확인"
          id="confirm-password"
          ref="confirmPassword"
          v-model="confirmPasswordChk"
        />
      </div>

      <div class="form-group">
        <label for="email">이메일</label>
        <input
          type="text"
          ref="email"
          placeholder="이메일"
          id="email"
          v-model="formData.email"
        />
      </div>
      <div class="control">
        <div class="custom-control">
          <input
            type="checkbox"
            id="agreement-1"
            value="1"
            v-model="service_agree"
          />
          <label for="agreement-1">서비스 약관에 동의합니다.</label>
          <a href="#" target="_blank">내용보기</a>
        </div>
        <div class="custom-control">
          <input
            type="checkbox"
            id="agreement-2"
            value="2"
            v-model="privacy_agree"
          />
          <label for="agreement-2">개인정보 수집 및 이용에 동의합니다. </label>
          <a href="#" target="_blank">내용보기</a>
        </div>
      </div>
      <button class="submit" type="submit">회원가입</button>
    </form>
  </div>
</template>

<script setup>
import axios from "axios";
import { onMounted, ref } from "vue";
import router from "@/router";

const isOpen = ref(false);
const message = ref("");
const formData = ref({
  loginId: "",
  password: "",
  name: "",
  nickname: "",
  email: "",
});
const eleRef = ref();
const confirmPasswordChk = ref("");

const loginId = ref(null);
const password = ref(null);
const name = ref(null);
const nickname = ref(null);
const confirmPassword = ref(null);

const service_agree = ref(false);
const privacy_agree = ref(false);

const isOpenToggle = () => {
  isOpen.value = !isOpen.value;
};

const isValidEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  console.log(emailRegex.test(email));
  return emailRegex.test(email);
};

const errMsg = () => {
  isOpen.value = false;
  if (eleRef.value && eleRef.value.value) {
    eleRef.value.value.focus();
  }
};

const checkForm = async () => {
  if (formData.value.name.length === 0) {
    message.value = "이름을 입력해 주세요.";
    isOpenToggle();
    eleRef.value = name;
    return;
  } else if (formData.value.loginId.length === 0) {
    message.value = "아이디를 입력해 주세요.";
    isOpenToggle();
    eleRef.value = loginId;
    return;
  } else if (
    formData.value.nickname.length > 10 ||
    formData.value.nickname.length === 0
  ) {
    message.value = "닉네임는 1글자 이상 10글자 이하로 입력해 주세요.";
    isOpenToggle();
    eleRef.value = nickname;
    return;
  } else if (formData.value.password.length === 0) {
    message.value = "비밀번호를 정확히 입력해주세요.";
    isOpenToggle();
    eleRef.value = password;
    return;
  } else if (formData.value.password !== confirmPasswordChk.value) {
    message.value = "비밀번호가 일치하지 않습니다.\n 다시 입력해 주세요.";
    isOpenToggle();
    eleRef.value = confirmPassword;
    return;
  } else if (
    !isValidEmail(formData.value.email) ||
    formData.value.email.length === 0
  ) {
    message.value = "이메일 주소를 정확히 입력해주세요.";
    isOpenToggle();
    eleRef.value = email;
    return;
  } else if (!service_agree.value || !privacy_agree.value) {
    message.value = "약관에 동의해 주세요.";
    isOpenToggle();
    eleRef.value = null;
    return;
  }

  try {
    const response = await axios.post(
      "http://localhost/api/users/join",
      formData.value
    );
    // 여기서 response를 처리할 수 있습니다.
    console.log(response.data);
    // 성공적으로 회원가입이 처리되었음을 사용자에게 알릴 수 있습니다.
    message.value = "회원가입이 완료되었습니다.";
    isOpenToggle();
    router.push({ name: 'login' });
  } catch (error) {
    // 오류 발생 시 처리할 내용
    console.error("Error during signup:", error);
    // 오류 메시지를 사용자에게 표시할 수 있습니다.
    message.value = "회원가입에 실패했습니다. 다시 시도해주세요.";
    isOpenToggle();
  }
};

const idcheck = async () => {
  event.preventDefault();
  try {
    const response = await axios.get(
      `http://localhost/api/users/check/loginId?loginId=${formData.value.loginId}`
    );
    if (response.data.data) {
      alert("이미 사용 중인 아이디입니다.");
      formData.value.loginId = "";
    } else {
      alert("사용 가능한 아이디입니다.");
    }
  } catch (error) {
    console.error("Error checking ID availability:", error);
    alert("아이디 중복 체크를 실패했습니다.");
  }
};


</script>

<style>
@font-face {
  font-family: "GongGothicMedium";
  src: url("https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_20-10@1.0/GongGothicMedium.woff")
    format("woff");
  font-weight: normal;
  font-style: normal;
}

/* 에러 출력 창 */
.error_msg {
  display: none;
  position: fixed;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  box-sizing: border-box;
  border: 2px solid #ccc;
}

.error_msg.open {
  display: flex;
  flex-direction: column;
}

.header,
.divider,
.content,
.btn_wrap {
  display: block;
}

.error_wrap {
  position: relative;
}

.header {
  order: -1;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.header span {
  font-family: "GongGothicMedium";
  /* flex: 1;  */
}

.header button {
  font-family: "GongGothicMedium";
  /* flex: 1;  */
  margin-left: 10px;
}

.idcheck,
.btn_wrap button {
  font-family: "GongGothicMedium";
  border: 2px solid #ccc;
  border-radius: 5px;
  padding: 5px 10px;
  background-color: transparent;
  cursor: pointer;
}

.btn_wrap button:hover {
  font-family: "GongGothicMedium";
  background-color: #f0f0f0;
}

.join {
  font-family: "GongGothicMedium";
}

.content {
  margin-top: 25px;
  margin-bottom: 25px;
  font-family: "GongGothicMedium";
}

.btn_wrap {
  font-family: "GongGothicMedium";
  border: 2px solid #ccc;
  border-radius: 5px;
  padding: 5px 10px;
  margin-top: 20px;
  margin-bottom: 10px;
}

.btn_wrap button {
  border: none;
  padding: 5px 10px;
  cursor: pointer;
}

.form-group input[type="text"],
.form-group input[type="password"] {
  font-family: "GongGothicMedium";
  border: 2px solid #ccc;
  border-radius: 5px;
  padding: 5px 10px;
  width: 100%;
  box-sizing: border-box;
  margin-top: 5px;
}

.form-group input[type="text"]:focus,
.form-group input[type="password"]:focus {
  font-family: "GongGothicMedium";
  outline: none;
  border-color: #007bff;
}

.form-group label {
  font-family: "GongGothicMedium";
  display: block;
  margin-bottom: 5px;
  text-align: left;
}

.control .custom-control {
  font-family: "GongGothicMedium";
  display: flex;
  align-items: center;
}

.control .custom-control input[type="checkbox"] {
  margin-right: 10px;
}

.control .custom-control label {
  font-family: "GongGothicMedium";
  flex: 1;
  text-align: left;
}

.submit {
  font-family: "GongGothicMedium";
  border: 2px solid #ccc;
  border-radius: 5px;
  padding: 5px 10px;
  cursor: pointer;
  margin-top: 10px;
}

.submit:hover {
  font-family: "GongGothicMedium";
  background-color: #ccc;
  color: black;
}

.divider {
  border: 1px solid #ccc;
  margin: 30px 0;
}

.joinform {
  width: 40%;
  margin: 15px auto;
}

.form-group {
  display: flex;
  flex-direction: column;
}

.id-input-group {
  display: flex;
  align-items: center;
}

.idcheck {
  margin-left: auto;
  font-size: 12px;
}

.form-group input[type="text"],
.form-group input[type="password"]{
  margin-bottom: 10px; /* 원하는 값으로 조정하세요 */
}
</style>
