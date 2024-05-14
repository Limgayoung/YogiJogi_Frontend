<template>
  <div class="error_msg" :class="[isOpen ? 'open' : '']">
    <div class="error_bg"></div>
    <div class="error_wrap">
      <div class="header">
        <span>알림</span>
        <button @click="isOpenToggle()">x</button>
      </div>
      <div class="content">
        {{ message }}
      </div>
      <div class="btn_wrap">
        <button @click="errMsg">확인</button>
      </div>
    </div>
  </div>
  
  <form @submit.prevent="checkForm">
    <div class="form-group">
      <label for="username">닉네임</label>
      <input
        type="text"
        ref="username"
        placeholder="닉네임"
        id="username"
        v-model="formData.username"
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
    <div class="control">
      <div class="custom-control">
        <input type="checkbox" id="agreement-1" value="1" v-model="service_agree"/>
        <label for="agreement-1">서비스 약관에 동의합니다.</label>
        <a href="#" target="_blank">내용보기</a>
      </div>
      <div class="custom-control">
        <input type="checkbox" id="agreement-2" value="2"  v-model="privacy_agree"/>
        <label for="agreement-2">개인정보 수집 및 이용에 동의합니다. </label>
        <a href="#" target="_blank">내용보기</a>
      </div>
    </div>
    <button class="submit" type="submit">회원가입</button>
  </form>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useSignUpStore } from '@/stores/signup.js'

const store = useSignUpStore()
const isOpen = ref(false)
const message = ref('')
const formData = ref({
  username: '',
  email: '',
  password: '',
})
const eleRef = ref();
const confirmPasswordChk = ref('');

const username = ref(null)
const email = ref(null)
const password = ref(null)
const confirmPassword = ref(null)

const service_agree = ref(false)
const privacy_agree = ref(false)

const isOpenToggle = () => {
  isOpen.value = !isOpen.value
}

const isValidEmail = (email) => {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  console.log(emailRegex.test(email))
  return emailRegex.test(email)
}

const errMsg = () => {
    isOpen.value = false;
    if(eleRef.value){
        eleRef.value.value.focus();
    }
}

const checkForm = () => {
  if (formData.value.username.length > 5 || formData.value.username.length === 0) {
    message.value = '닉네임은 다섯 글자 이하로 입력해 주세요.'
    isOpenToggle();
    eleRef.value = username;
    return;
  } else if (!isValidEmail(formData.value.email) || formData.value.email.length === 0) {
    message.value = '이메일 주소를 정확히 입력해주세요.'
    isOpenToggle();
    eleRef.value = email;
    return;
  } else if(formData.value.password.length === 0){
    message.value = '비밀번호를 정확히 입력해주세요.'
    isOpenToggle();
    eleRef.value = password;
    return;
  }else if (formData.value.password !== confirmPasswordChk.value) {
    message.value = '비밀번호가 일치하지 않습니다.\n 다시 입력해 주세요.'
    isOpenToggle();
    eleRef.value = confirmPassword;
    return;
  }else if (!service_agree.value || !privacy_agree.value) {
    message.value = '약관에 동의해 주세요.'
    isOpenToggle();
    eleRef.value = null;
    return;
  }
  store.submitForm(formData.value);
}

</script>

<style>
@font-face {
  font-family: "GongGothicMedium";
  src: url("https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_20-10@1.0/GongGothicMedium.woff")
    format("woff");
  font-weight: normal;
  font-style: normal;
}

.error_msg {
  display: none;
  position: fixed;
  top: 30%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 300px;
  background: #fff;
  border-radius: 10px;
  padding: 20px;
  box-sizing: border-box;
  border: 2px solid #ccc;
}

.error_msg.open {
  display: block;
}

.error_wrap {
  position: relative;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.header span {
  font-family: "GongGothicMedium"; /* 글꼴 적용 */
  flex: 1; /* "알림" 텍스트가 왼쪽에 정렬되도록 */
}

.header button {
  flex: 1; /* X 버튼이 오른쪽에 정렬되도록 */
}

.btn_wrap button {
  border: 2px solid #ccc; /* 버튼에 테두리 추가 */
  border-radius: 5px; /* 버튼의 테두리 모서리를 둥글게 만듭니다. */
  padding: 5px 10px; /* 버튼 내부의 여백을 조정합니다. */
  background-color: transparent; /* 배경색을 투명하게 설정합니다. */
  cursor: pointer; /* 마우스 포인터를 손가락 모양으로 변경하여 버튼임을 나타냅니다. */
}

.btn_wrap button:hover {
  background-color: #f0f0f0; /* 마우스를 올렸을 때 버튼의 배경색을 변경합니다. */
}

.content {
  font-family: "GongGothicMedium"; /* 글꼴 적용 */
}

.btn_wrap {
  border: 2px solid #ccc; /* 테두리 추가 */
  border-radius: 5px; /* 테두리의 모서리를 둥글게 만듭니다. */
  padding: 5px 10px; /* 내부 여백 조정 */
  margin-top: 10px; /* 위쪽 마진 추가 */
}

.btn_wrap button {
  border: none; /* 버튼의 기본 테두리 제거 */
  padding: 5px 10px; /* 버튼 내부의 여백을 조정합니다. */
  cursor: pointer; /* 마우스 포인터를 손가락 모양으로 변경하여 버튼임을 나타냅니다. */
}

.btn_wrap button:hover {
  background-color: #f0f0f0; /* 마우스를 올렸을 때 버튼의 배경색을 변경합니다. */
}

</style>

