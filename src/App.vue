<script setup>
import { RouterView } from "vue-router";
import Navbar from "./views/Navbar.vue";
import Footer from "./views/Footer.vue";
// import TheHeadingNavbar from "@/components/layout/TheHeadingNavbar.vue";
</script>

<template>
  <div>
    <Navbar></Navbar>
    <!-- <TheHeadingNavbar></TheHeadingNavbar> -->
    <router-view></router-view>
    <br>
    <Footer></Footer>
  </div>
</template>

<style scoped></style>
