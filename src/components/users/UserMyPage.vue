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
  
    <h1 class="join">마이페이지</h1>
  
    <form @submit.prevent="checkForm">
      <div class="form-group">
        <label for="username">이름</label>
        <input type="text" ref="username" placeholder="이름" id="username" v-model="formData.username" />
      </div>
      <div class="form-group">
        <label for="email">이메일</label>
        <input type="text" ref="email" placeholder="이메일" id="email" v-model="formData.email" />
      </div>
      <div class="form-group">
        <label for="password">비밀번호</label>
        <input type="password" ref="password" placeholder="비밀번호" id="password" v-model="formData.password" />
      </div>
      <div class="form-group">
        <label for="confirm-password">비밀번호 확인</label>
        <input type="password" placeholder="비밀번호 확인" id="confirm-password" ref="confirmPassword"
          v-model="confirmPasswordChk" />
      </div>
      
      <button class="submit" type="submit">수정</button>
      <button class="submit" type="submit">탈퇴</button>
    </form>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue'
  import { useSignUpStore } from '@/stores/signup.js'
  
  const store = useSignUpStore()
  const isOpen = ref(false)
  const message = ref('')
  const formData = ref({
    username: '김현지',
    email: 'khj@ssafy.com',
    password: '1234',
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
    if (eleRef.value) {
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
    } else if (formData.value.password.length === 0) {
      message.value = '비밀번호를 정확히 입력해주세요.'
      isOpenToggle();
      eleRef.value = password;
      return;
    } else if (formData.value.password !== confirmPasswordChk.value) {
      message.value = '비밀번호가 일치하지 않습니다.\n 다시 입력해 주세요.'
      isOpenToggle();
      eleRef.value = confirmPassword;
      return;
    } 
    store.submitForm(formData.value);
  }
  
  </script>
  
  <style>
  @font-face {
    font-family: "GongGothicMedium";
    src: url("https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_20-10@1.0/GongGothicMedium.woff") format("woff");
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
  
  .btn_wrap button {
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
  </style>
  