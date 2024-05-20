<template>
    <div>
      <!-- carousel -->
      <v-carousel height="400" width="100%" cycle hide-delimiter-background>
        <v-carousel-item v-for="(slide, i) in slides" :key="i">
          <v-sheet :color="colors[i]" height="100%">
            <div class="d-flex fill-height justify-center align-center">
              <div class="spotname">{{ slide }}</div>
            </div>
          </v-sheet>
        </v-carousel-item>
        <button class="detail-button" @click="viewDetails(slides.length - 1)">
          자세히 보기
        </button>
      </v-carousel>
  
      <!-- 지역 선택지 -->
      <v-item-group mandatory v-model="selectedArea">
        <v-container class="centered">
          <v-row>
            <v-col cols="12">
              <v-row>
                <v-col v-for="(area, index) in sido" :key="index">
                  <v-item>
                    <v-card
                      :color="selectedArea === area ? '#FFC700' : '#f0f0f0'"
                      class="d-flex align-center"
                      height="40"
                      width="55"
                      dark
                      @click="selectedArea = area"
                    >
                      <v-scroll-y-transition>
                        <div class="local flex-grow-1 text-center font-size">
                          {{ area }}
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
            <h3 class="custom-heading">🔥인기 여행 코스</h3>
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
                  <router-link to="/spotDetail">
                    <v-btn class="moreInfo" variant="flat"
                      >상세 정보 보러가기</v-btn
                    >
                  </router-link>
                </v-overlay>
              </v-card>
            </v-hover>
          </v-col>
          <v-col cols="12">
            <h3 class="custom-heading">🔥인기 여행지</h3>
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
                  <v-btn class="moreInfo" variant="flat"
                    >상세 정보 보러가기</v-btn
                  >
                </v-overlay>
              </v-card>
            </v-hover>
          </v-col>
          <v-col cols="12">
            <h3 class="custom-heading">🔥인기글</h3>
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
                  <v-btn class="moreInfo" variant="flat"
                    >상세 정보 보러가기</v-btn
                  >
                </v-overlay>
              </v-card>
            </v-hover>
          </v-col>
        </v-row>
      </body>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import axios from "axios";
  
  const colors = ref([
    'indigo',
    'warning',
    'pink darken-2',
    'red lighten-1',
    'deep-purple accent-4',
  ]);
  
  const slides = ref(['여행지이름1', '여행지이름2', '여행지이름3', '여행지이름4', '여행지이름5']);
  const sido = ref(['전국', '서울', '인천', '경기', '강원', '대전', '부산', '대구', '광주', '제주', '전라']);
  const selectedArea = ref(sido.value[0]); // 첫 번째 요소를 기본 선택 값으로 설정
  const cards = ref([]);
  
  const fetchTopSpots = async () => {
    try {
      const response = await axios.get('http://localhost/api/spots/top/4');
      cards.value = response.data;
      console.log(`받은 cards의 수: ${cards.value.length}`); // 받은 cards의 수를 콘솔에 출력
    } catch (error) {
      console.error("Error fetching top spots:", error);
    }
  };
  
  onMounted(() => {
    fetchTopSpots();
  });
  
  const viewDetails = (index) => {
    console.log('Details for slide:', index + 1);
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
  