<template>
  <div>
    <!-- carousel -->
    <v-carousel height="500" width="100%" cycle hide-delimiter-background>
      <v-carousel-item v-for="(slide, i) in slides" :key="i">
        <v-sheet :color="colors[i]" height="100%"
        :style="{
            backgroundImage: `url(${slide.imgUrl})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }">
          <div class="d-flex fill-height justify-center align-center">
            <!-- <v-img :src="slide.imageUrl" class="carousel-image" contain></v-img> -->
            <div class="spotname">{{ slide.name }}</div>
          </div>
        </v-sheet>
      </v-carousel-item>
      <router-link class="nav-link" to="/bootstrapTest"
              ><button class="detail-button">
        여행지 검색하러 가기
      </button></router-link>
    </v-carousel>
    

    <!-- 지역 선택지 -->
    <v-item-group mandatory v-model="selectedArea">
      <v-container class="centered">
        <v-row>
          <v-col cols="12">
            <v-row>
              <v-col v-for="(area, index) in sido" :key="index">
                <v-item>
                  <v-card :color="selectedArea === area ? '#FFC700' : '#f0f0f0'" class="d-flex align-center" height="40"
                    width="55" dark @click="selectedArea = area">
                    <v-scroll-y-transition>
                      <div class="local flex-grow-1 text-center font-size">
                        {{ area.name }}
                      </div>
                    </v-scroll-y-transition>
                  </v-card>
                </v-item>
              </v-col>
            </v-row>
          </v-col>
        </v-row>
      </v-container>
    </v-item-group>

    <body>
      <!-- 여행 카드 -->
      <v-row class="centered">
        <v-col cols="12">
          <h3 class="custom-heading">🔥인기 여행지</h3>
          <br />
        </v-col>
        <v-col v-for="(card, index) in spotCards" :key="index" cols="12" sm="6" md="4" lg="3" class="my-col">
          <v-hover v-slot="{ isHovering, props }">
            <v-card class="mx-auto card-wrapper" max-width="300" max-height="330" v-bind="props">
              <template v-if="card.imgUrl">
                <img :src="card.imgUrl" class="card-img-top" alt="..." style="
                    /* width: 100px; */
                    max-width: 100%;
                    height: 230px;
                    max-height: 80%;"/>
              </template>
              <template v-else>
                <img src="@/assets/images/noimg.png" class="card-img-top" alt="No Image" style="
                    /* width: 100px; */
                    max-width: 100%;
                    height: 230px;
                    max-height: 80%;"/>
              </template>
              <v-card-text>
                <h2 class="cardSpotName">{{ card.spot.name }}</h2>
                <p class="cardSpotDes">{{ card.spot.address }}</p>
                <p class="cardSpotDes">조회수 {{ card.spot.views }}</p>
              </v-card-text>
              <v-card-title>
                <span class="text-primary text-subtitle-2">64 Reviews</span>
              </v-card-title>
              <v-overlay :model-value="isHovering" class="align-center justify-center" scrim="#ccc" contained>
                <v-btn class="moreInfo" variant="flat">상세 정보 보러가기</v-btn>
              </v-overlay>
            </v-card>
          </v-hover>
        </v-col>

                <v-col cols="12">
          <h3 class="custom-heading">🔥인기 여행 코스</h3>
          <br />
        </v-col>
        <v-col v-for="(card, index) in tripCards" :key="index" cols="12" sm="6" md="4" lg="3" class="my-col">
          <v-hover v-slot="{ isHovering, props }">
            <v-card class="mx-auto card-wrapper" max-width="300" max-height="330" v-bind="props">
              <template v-if="card.imgUrl">
                <img :src="card.imgUrl" class="card-img-top" alt="..." style="
                    /* width: 100px; */
                    max-width: 100%;
                    height: 230px;
                    max-height: 80%;"/>
              </template>
              <template v-else>
                <img src="@/assets/images/noimg.png" class="card-img-top" alt="No Image" style="
                    /* width: 100px; */
                    max-width: 100%;
                    height: 230px;
                    max-height: 80%;"/>
              </template>
              <v-card-text>
                <h2 class="cardSpotName">{{ card.title }}</h2>
                <p class="cardSpotDes">{{ card.userName }}</p>
                <p class="cardSpotDes">조회수 {{ card.views }}</p>
              </v-card-text>
              <v-card-title>
                <span class="text-primary text-subtitle-2">64 Reviews</span>
              </v-card-title>
              <v-overlay :model-value="isHovering" class="align-center justify-center" scrim="#ccc" contained>
                <router-link :to="{ name: 'planDetail', params: { id: card.id } }">
                  <v-btn class="moreInfo" variant="flat">상세 정보 보러가기</v-btn>
                </router-link>
              </v-overlay>
            </v-card>
          </v-hover>
        </v-col>
      </v-row>
    </body>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import axios from "axios";

const colors = ref([
  "indigo",
  "warning",
  "pink darken-2",
  "red lighten-1",
  "deep-purple accent-4",
]);

const slides = ref([
  {
  name: "전주 한옥마을",
  imgUrl: "src/assets/images/main_img/img2.jpg"
  },{
  name: "경북 경주 동궁과 안압지",
  imgUrl: "src/assets/images/main_img/img1.jpg"
  },{
  name: "거제도",
  imgUrl: "src/assets/images/main_img/img3.jpg"
  },{
  name: "제주도 성산일출봉",
  imgUrl: "src/assets/images/main_img/img4.jpg"
  },
]);
const sido = ref([
  { name: "전국", sido_code: 0 },
  { name: "서울", sido_code: 1 },
  { name: "인천", sido_code: 2 },
  { name: "경기", sido_code: 31 },
  { name: "강원", sido_code: 32 },
  { name: "충북", sido_code: 33 },
  { name: "충남", sido_code: 34 },
  { name: "경북", sido_code: 35 },
  { name: "경남", sido_code: 36 },
  { name: "전북", sido_code: 37 },
  { name: "전남", sido_code: 38 },
  { name: "제주", sido_code: 39 },
]);

const selectedArea = ref(sido.value[0]); // 첫 번째 요소를 기본 선택 값으로 설정
const cards = ref([]);
const tripCards = ref([]);
const spotCards = ref([]);
const offset = 0;
const limit = 4;

const fetchTopTrips = async () => {
  try {
    const url = '?offset=' + offset + '&limit=' + limit;
    const response = await axios.get("http://localhost/api/trips/search" + url);

    console.log('trip response: ', response.data);
    const trips = response.data.data;

    tripCards.value = trips;
    console.log(`trip 받은 cards의 수: ${tripCards.value.length}`); // 받은 cards의 수를 콘솔에 출력
    console.log(`trip cards 데이터:`, tripCards.value); // 받은 cards의 데이터를 콘솔에 출력
  } catch (error) {
    console.error("Error fetching top trips:", error);
  }
};

const fetchTopSpots = async () => {
  try {
    const areaCode = selectedArea.value.sido_code;
    let url = '?offset=' + offset + '&limit=' + limit;
    if (areaCode != 0) {
      url += '&areaCode=' + areaCode;
    }
    console.log('url: ', url);
    const response = await axios.get("http://localhost/api/spots/search" + url);
    const spots = response.data.data;
    console.log('spot response data: ', spots);
    spotCards.value = spots;
    console.log(`spot 받은 cards의 수: ${spotCards.value.length}`); // 받은 cards의 수를 콘솔에 출력
    console.log(`spot cards 데이터:`, spotCards.value); // 받은 cards의 데이터를 콘솔에 출력
  } catch (error) {
    console.error("Error fetching top spots:", error);
  }
};

onMounted(() => {
  fetchTopTrips();
  fetchTopSpots();
});

watch(selectedArea, () => {
  fetchTopTrips();
  fetchTopSpots();
});

const viewDetails = (index) => {
  console.log("Details for slide:", index + 1);
};

</script>

<style>
@font-face {
  font-family: "GongGothicMedium";
  src: url("https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_20-10@1.0/GongGothicMedium.woff") format("woff");
  font-weight: normal;
  font-style: normal;
}

/* carousel 안 텍스트 */
.spotname {
  font-family: "GongGothicMedium";
  font-size: 60px;
}

/* carousel 안 자세히 보기 버튼 */
.detail-button {
  font-family: "GongGothicMedium";
  position: absolute;
  bottom: 40px;
  right: 40px;
  padding: 15px 30px;
  background-color: #ffc700;
  color: #fff;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: 18px;
  transition: background-color 0.3s;
}

/* 자세히 보기 버튼 마우스 오버 */
.detail-button:hover {
  font-family: "GongGothicMedium";
  background-color: #006769;
}

/* 지역 태그 텍스트 */
.local {
  font-family: "GongGothicMedium";
  font-size: 18px;
}

/* 카드 안 여행지 이름 */
.cardSpotName {
  font-family: "GongGothicMedium";
  font-size: 15px;
  color: #ffb108;
}

/* 카드 안 여행지 설명 */
.cardSpotDes {
  font-family: "GongGothicMedium";
  font-size: 13px;
}

/* 새로운 클래스 card-wrapper에 테두리와 동그란 모서리 스타일 추가 */
.card-wrapper {
  max-width: 200px;
  border-radius: 15px;
  overflow: hidden;
}

.card-wrapper:hover {
  border-color: #007bff;
  transform: scale(1.05);
}

/* 상세 정보 버튼 스타일 */
.moreInfo {
  font-family: "GongGothicMedium";
  font-size: 40px;
  min-width: 200px;
  min-height: 50px;
}

.centered {
  display: flex;
  justify-content: center;
  align-items: center;
}

.custom-heading {
  font-family: "GongGothicMedium";
  margin-left: 50px;
  margin-top: 20px;
  margin-bottom: -20px;
}
</style>
