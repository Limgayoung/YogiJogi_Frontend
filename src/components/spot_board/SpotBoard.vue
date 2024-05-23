<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";
import { useUserStore } from "@/stores/userStore";

const router = useRouter();
const userStore = useUserStore();

const cards = ref([]);
const defaultImage = 'src/assets/images/noimg.png'; // 기본 이미지 경로

const fetchSpots = async (limit = 12, offset = 0) => {
  try {
    const response = await axios.get('http://localhost/api/board/spots/search/', {
      params: {
        limit,
        offset
      }
    });
    console.log("response.data.data: ", response.data.data);
    if (response.data.data && Array.isArray(response.data.data)) {
      cards.value = response.data.data.map( spot => ({
        id: spot.spotBoard.id,
        imageUrl: spot.imgUrl || defaultImage,
        title: spot.spotBoard.title,
        desccontentription: spot.spotBoard.content,
        views: spot.spotBoard.views,
      }));
      console.log("들어옴!!");
    }
    console.log(cards.value);
  } catch (error) {
    console.error("Error fetching trips:", error);
  }
};

onMounted(() => {
  fetchSpots();
});


</script>

<template>
  <v-row class="centered" align-content="start" justify="start">
    <v-col cols="12">
      <div
        style="
          display: flex;
          justify-content: space-between;
          align-items: center;
        "
      >
        <h3 class="custom-heading">여행지 후기 둘러보기</h3>
        
      </div>
      <br />
    </v-col>
    <v-col
      v-for="(card, index) in cards"
      :key="card.id"
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
          max-height="380"
          v-bind="props"
        >
          <v-img :src="card.imageUrl" aspect-ratio="1.5" class="card-image"></v-img>

          <v-card-text class="card-info">
            <h1 class="cardSpotTitle">{{card.title}}</h1>
            
            <div class="cardDescriptionContainer">
              <!-- <p class="cardSpotDes">{{ card.description }}</p>             -->
              <p class="cardSpotViews">{{ card.name }}</p>
              <p class="cardSpotViews">조회수 {{ card.views }}</p>
            </div>
          </v-card-text>

          <v-overlay
            :model-value="isHovering"
            class="align-center justify-center"
            scrim="#ccc"
            contained
          >
            <router-link :to="{ name: 'planDetail', params: { id: card.id } }">
              <v-btn class="moreInfo" variant="flat">상세 정보 보러가기</v-btn>
            </router-link>
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
.cardSpotTitle{
  font-size: 17px;
  font-family: "GongGothicMedium";
}
.card-wrapper {
  max-height: 300px; /* 카드의 전체 높이를 적당히 설정 */
}
.card-image {
  height: 180px; /* 이미지 높이를 줄임 */
}
.card-info {
  height: 100px; /* 정보 칸의 높이를 적절히 조정 */
}
.cardDescriptionContainer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.cardSpotDes {
  margin-top: 0.5rem; /* 간격 조정 */
  flex: 1;
}
.cardSpotViews {
  margin-top: 0.5rem; /* 간격 조정 */
  font-size: 1rem; /* 조회수 글자 크기 조정 */
  text-align: right; /* 조회수 텍스트 오른쪽 정렬 */
  font-family: "GongGothicMedium";
}
</style>
