<script setup></script>

<template>
  <div class="container text-center mt-3">
    <div class="alert alert-primary" role="alert">User Service</div>
    <router-view></router-view>
    <router-link :to="{ name: 'user-login' }">로그인</router-link>
    <router-link :to="{ name: 'user-join' }">회원가입</router-link>
    <router-link :to="{ name: 'user-mypage' }">마이페이지</router-link>
    <router-link :to="{ name: 'spot-detail' }">여행지 상세보기</router-link>
  </div>
</template>

<style>
mark.orange {
  background: linear-gradient(to top, rgb(243, 164, 18) 20%, transparent 30%);
}
</style>
