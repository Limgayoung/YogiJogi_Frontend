<script setup>
import { ref } from "vue";
const cards = ref([
  {
    imageUrl: "https://cdn.vuetifyjs.com/images/cards/forest-art.jpg",
    name: "물의 정원",
    description: "경기도 남양주시 조안면 북한강로 398",
  },
  {
    imageUrl: "https://cdn.vuetifyjs.com/images/cards/forest-art.jpg",
    name: "문래창작촌",
    description: "서울특별시 영등포구 문래동3가 54-37",
  },
  {
    imageUrl: "https://cdn.vuetifyjs.com/images/cards/forest-art.jpg",
    name: "경복궁",
    description: "서울특별시 종로구 사직로 161",
  },
  {
    imageUrl: "https://cdn.vuetifyjs.com/images/cards/forest-art.jpg",
    name: "섭지코지",
    description: "제주특별자치도 서귀포시 성산읍 섭지코지로",
  },
  {
    imageUrl: "https://cdn.vuetifyjs.com/images/cards/forest-art.jpg",
    name: "물의 정원",
    description: "경기도 남양주시 조안면 북한강로 398",
  },
  {
    imageUrl: "https://cdn.vuetifyjs.com/images/cards/forest-art.jpg",
    name: "문래창작촌",
    description: "서울특별시 영등포구 문래동3가 54-37",
  },
  {
    imageUrl: "https://cdn.vuetifyjs.com/images/cards/forest-art.jpg",
    name: "경복궁",
    description: "서울특별시 종로구 사직로 161",
  },
  {
    imageUrl: "https://cdn.vuetifyjs.com/images/cards/forest-art.jpg",
    name: "섭지코지",
    description: "제주특별자치도 서귀포시 성산읍 섭지코지로",
  },
  {
    imageUrl: "https://cdn.vuetifyjs.com/images/cards/forest-art.jpg",
    name: "물의 정원",
    description: "경기도 남양주시 조안면 북한강로 398",
  },
  {
    imageUrl: "https://cdn.vuetifyjs.com/images/cards/forest-art.jpg",
    name: "문래창작촌",
    description: "서울특별시 영등포구 문래동3가 54-37",
  },
  {
    imageUrl: "https://cdn.vuetifyjs.com/images/cards/forest-art.jpg",
    name: "경복궁",
    description: "서울특별시 종로구 사직로 161",
  },
  {
    imageUrl: "https://cdn.vuetifyjs.com/images/cards/forest-art.jpg",
    name: "섭지코지",
    description: "제주특별자치도 서귀포시 성산읍 섭지코지로",
  },
  {
    imageUrl: "https://cdn.vuetifyjs.com/images/cards/forest-art.jpg",
    name: "물의 정원",
    description: "경기도 남양주시 조안면 북한강로 398",
  },
  {
    imageUrl: "https://cdn.vuetifyjs.com/images/cards/forest-art.jpg",
    name: "문래창작촌",
    description: "서울특별시 영등포구 문래동3가 54-37",
  },
  {
    imageUrl: "https://cdn.vuetifyjs.com/images/cards/forest-art.jpg",
    name: "경복궁",
    description: "서울특별시 종로구 사직로 161",
  },
  {
    imageUrl: "https://cdn.vuetifyjs.com/images/cards/forest-art.jpg",
    name: "섭지코지",
    description: "제주특별자치도 서귀포시 성산읍 섭지코지로",
  },
]);
</script>

<template>
  <v-row class="centered">
    <v-col cols="12">
      <div style="display: flex; align-items: center">
        <h3 class="custom-heading">여행 코스 둘러보기</h3>
        <!-- <v-btn
          variant="outlined"
          class="custom-heading"
          style="margin-left: 1050px"
        >
          여행 코스 만들기
        </v-btn> -->
        <router-link to="/makePlan">
          <v-btn
            variant="outlined"
            class="custom-heading"
            style="margin-left: 1050px"
          >
            여행 코스 만들기
          </v-btn>
        </router-link>
      </div>
      <br />
    </v-col>
    <v-col
      v-for="(card, index) in cards"
      :key="index"
      cols="12"
      sm="6"
      md="4"
      lg="3"
      class="my-col"
    >
      <v-hover v-slot="{ isHovering, props }">
        <v-card
          class="mx-auto card-wrapper"
          max-width="300"
          max-height="320"
          v-bind="props"
        >
          <v-img :src="card.imageUrl" aspect-ratio="1.3"></v-img>

          <v-card-text>
            <h2 class="cardSpotName">{{ card.name }}</h2>
            <p class="cardSpotDes">{{ card.description }}</p>
          </v-card-text>

          <v-card-title>
            <span class="text-primary text-subtitle-2">64 Reviews</span>
          </v-card-title>

          <v-overlay
            :model-value="isHovering"
            class="align-center justify-center"
            scrim="#ccc"
            contained
          >
            <v-btn class="moreInfo" variant="flat">상세 정보 보러가기</v-btn>
          </v-overlay>
        </v-card>
      </v-hover>
    </v-col>
  </v-row>
</template>

<style>
@font-face {
  font-family: "GongGothicMedium";
  src: url("https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_20-10@1.0/GongGothicMedium.woff")
    format("woff");
  font-weight: normal;
  font-style: normal;
}
.container-plan {
  font-family: "GongGothicMedium";
}
</style>
