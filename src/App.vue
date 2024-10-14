<script setup>
import { RouterView } from "vue-router";
import Navbar from "./views/Navbar.vue";
// import TheHeadingNavbar from "@/components/layout/TheHeadingNavbar.vue";
</script>

<template>
  <div>
    <Navbar></Navbar>
    <!-- <TheHeadingNavbar></TheHeadingNavbar> -->
    <router-view></router-view>
  </div>
</template>

<style scoped></style>
