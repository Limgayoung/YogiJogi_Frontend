
<template>
  <div class="navbar-left">
    <v-card class="custom-card">
      <v-layout>
        <v-navigation-drawer permanent width="100">
          <v-toolbar flat>
            <v-list>
              <v-list-item>
                <v-list-item-title class="title">
                  Application
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-toolbar>

          <v-divider></v-divider>

          <v-list
            dense
            class="pt-0"
            style="display: flex; flex-direction: column; align-items: center"
          >
            <v-btn
              v-for="item in items"
              :key="item.title"
              @click="toggleItem(item)"
              class="left-navbar-btn"
              :color="item.active ? 'yellow' : ''"
              >
              <!-- <div class="icon-wrapper">
        <v-icon size="40">{{ item.icon }}</v-icon>
      </div> -->
              <div class="title-wrapper">
                <v-list-item-title style="font-size: 14px">{{
                  item.title
                }}</v-list-item-title>
              </div>
            </v-btn>
          </v-list>
        </v-navigation-drawer>

        <v-navigation-drawer permanent class="category-list">
          <v-card
            variant="outlined"
            class="mx-auto"
            color="surface-variant"
            max-width="344"
            height="100px"
          >
            <v-row align="center">
              <!-- 왼쪽에 이미지 -->
              <v-col cols="12" sm="5">
                <v-img
                  class="card-img"
                  src="https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&amp;id=cbeefd27-1f65-4a07-8f16-6705807bae9d"
                  alt="Image Alt Text"
                >
                </v-img>
              </v-col>

              <!-- 오른쪽에 제목과 부제목 -->
              <v-col
                cols="12"
                sm="7"
                style="height: 100%"
                class="right-element"
              >
                <v-card-title>경복궁</v-card-title>
                <v-card-subtitle>주소주소주소입니다.</v-card-subtitle>
              </v-col>
            </v-row>
          </v-card>
          <v-card
            variant="outlined"
            class="mx-auto"
            color="surface-variant"
            max-width="344"
            height="100px"
          >
            <v-row align="center">
              <!-- 왼쪽에 이미지 -->
              <v-col cols="12" sm="5">
                <v-img
                  class="card-img"
                  src="https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&amp;id=cbeefd27-1f65-4a07-8f16-6705807bae9d"
                  alt="Image Alt Text"
                >
                </v-img>
              </v-col>

              <!-- 오른쪽에 제목과 부제목 -->
              <v-col
                cols="12"
                sm="7"
                style="height: 100%"
                class="right-element"
              >
                <v-card-title>멀티캠퍼스</v-card-title>
                <v-card-subtitle>주소주소주소입니다.</v-card-subtitle>
              </v-col>
            </v-row>
          </v-card>
        </v-navigation-drawer>
      </v-layout>
    </v-card>
  </div>
</template>

<script setup>
const navigate = (destination) => {
  // 네비게이션 로직을 구현합니다.
  console.log("Navigating to:", destination);
};

const items = [
  { title: "추천테마", icon: "mdi-star" },
  { title: "여행코스", icon: "mdi-map" },
  { title: "인기여행지", icon: "mdi-heart" },
  { title: "나의여행", icon: "mdi-account" },
];

const toggleItem = (clickedItem) => {
  clickedItem.active = !clickedItem.active;
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

.left-navbar-btn {
  margin-bottom: 10px;
  border-radius: 20%;
  border: 0px;
}

.custom-card {
  font-family: "GongGothicMedium";
}

.btn-custom {
  font-size: 12px; /* 버튼 텍스트 크기 조정 */
  border: 0px solid rgba(0, 0, 0, 0.12); /* 테두리 추가 */
  border-radius: 10%; /* 테두리의 모서리를 둥글게 만듦 */
  min-width: auto; /* 버튼의 최소 너비를 설정하여 텍스트에 맞게 크기 조정 */
  margin-left: auto;
}

.card-img {
  width: 100%;
  height: auto;
  aspect-ratio: 1 / 1; /* 가로와 세로의 비율을 1:1로 설정합니다. */
  object-fit: cover;
  margin-left: 10px;
}

.right-element {
  margin-left: -10px;
}

.navbar-left {
  width: 466px;
}

.icon-wrapper,
.title-wrapper {
  display: block;
}

.icon-wrapper v-icon {
  margin-bottom: 5px; /* 아이콘 아래 여백 설정 */
}
</style>
