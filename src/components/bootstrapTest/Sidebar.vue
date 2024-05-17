<template>
  <div class="sidebar">
    <div
      class="btn-group-vertical"
      role="group"
      aria-label="Vertical button group"
    >
      <button
        v-for="(button, index) in buttons"
        :key="index"
        type="button"
        class="btn btn-secondary"
        :class="{ active: selectedButton === index }"
        @click="selectButton(index)"
      >
        {{ button }}
      </button>
    </div>
  </div>
  <div class="sidebar2">
    <div class="where-go">어디로 떠나볼까요?</div>
    <div v-if="searchResult" class="search-result">
      {{ selectedValue1 }} {{ selectedValue2 }}
    </div>
    <div class="container mt-3">
      <div class="d-flex">
        <select
          v-model="selectedValue1"
          class="form-select custom-width-1 mr-2"
          aria-label="Default select example"
        >
          <option value="" disabled>첫 번째 선택</option>
          <option value="서울시특별시">서울시특별시</option>
          <option value="인천광역시">인천광역시</option>
          <option value="경기도">경기도</option>
        </select>
        <select
          v-model="selectedValue2"
          class="form-select custom-width-2 mr-2"
          aria-label="Default select example"
        >
          <option value="" disabled>두 번째 선택</option>
          <option value="영등포구">영등포구</option>
          <option value="계양구">계양구</option>
          <option value="강남구">강남구</option>
        </select>
        <button type="button" class="btn custom-width-button" @click="search">
          검색
        </button>
      </div>
    </div>
    <div class="pa-4" style="max-width: 400px">
      <v-chip-group selected-class="text-color" column>
        <v-chip v-for="tag in tags" :key="tag"> {{ tag }} </v-chip>
      </v-chip-group>
    </div>

    <div
      class="btn-group-vertical"
      role="group"
      aria-label="Vertical button group"
    >
      <Sidebar
        v-model:visible="visibleRight"
        :selectedCardDescription="selectedCardDescription"
        header="Right Sidebar"
        position="right"
      >
        <p>선택된 카드의 설명: {{ selectedCardDescription }}</p>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </p>
      </Sidebar>
      <button
        v-for="(card, index) in cards"
        :key="index"
        type="button"
        class="btn btn-secondary-card"
        :class="{ active: selectedCard === index }"
        @click="handleCardClick(card)"
      >
        <div
          class="card"
          :class="{ 'border-selected': selectedCard === index }"
          style="width: 18rem"
        >
          <img
            :src="card.imgSrc"
            class="card-img-top"
            alt="..."
            height="100px"
          />
          <div class="card-body">
            <p class="card-text">{{ card.description }}</p>
          </div>
        </div>
      </button>
    </div>
  </div>
</template>

<script>
import { defineComponent, ref } from "vue";
import Sidebar from "primevue/sidebar";
export default defineComponent({
  name: "SidebarComponent",
  components: {
    Sidebar,
  },
  data() {
    return {
      selectedValue1: null, // 첫 번째 선택값을 저장할 변수
      selectedValue2: null, // 두 번째 선택값을 저장할 변수
      searchResult: null,
      buttons: ["추천테마", "인기장소", "여행코스", "나의여행"],
      selectedButton: 0, // 첫 번째 버튼이 기본적으로 선택되어 있음
      selectedCard: null, // 선택된 카드의 인덱스 업데이트
      visibleRight: false, // Sidebar visibility state
      tags: ["#가족과함께", "#연인과함께", "#반려동물과함께", "#친구와함께"],
      cards: [
        {
          imgSrc:
            "https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=cbeefd27-1f65-4a07-8f16-6705807bae9d",
          description: "카드1",
        },
        {
          imgSrc:
            "https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=cbeefd27-1f65-4a07-8f16-6705807bae9d",
          description: "카드2",
        },
        {
          imgSrc:
            "https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=cbeefd27-1f65-4a07-8f16-6705807bae9d",
          description: "카드3",
        },
        {
          imgSrc:
            "https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&id=cbeefd27-1f65-4a07-8f16-6705807bae9d",
          description: "카드4",
        },
        // 추가 카드 데이터...
      ],
    };
  },
  methods: {
    selectButton(index) {
      this.selectedButton = index; // 선택된 버튼의 인덱스 업데이트
      this.$emit("open-sidebar", this.buttons[index]); // 선택된 버튼의 정보를 이벤트로 전달
    },
    handleCardClick(index) {
      this.selectedCard = index; // 선택된 카드의 인덱스 업데이트
      this.visibleRight = true; // Sidebar를 열도록 설정
    },
    search() {
      if (this.selectedValue1 && this.selectedValue2) {
        this.searchResult = `${this.selectedValue1} - ${this.selectedValue2}에 대한 검색 결과가 여기에 나타납니다.`;
      } else {
        this.searchResult = "먼저 두 가지를 선택해주세요.";
      }
    },
    handleCardClick(card) {
      this.selectedCardDescription = card.description; // 선택된 카드의 설명 저장
      this.visibleRight = true; // Sidebar를 열도록 설정
    },
  },
});
</script>

<style>
@font-face {
  font-family: "GongGothicMedium";
  src: url("https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_20-10@1.0/GongGothicMedium.woff")
    format("woff");
  font-weight: normal;
  font-style: normal;
}

.sidebar {
  /* width: 200px;
      height: 100vh; */
  background-color: transparent;
  padding: 0px;
  font-family: "GongGothicMedium";
}

.sidebar2 {
  /* width: 200px;
      height: 100vh; */
  background-color: transparent;
  padding: 0px;
  font-family: "GongGothicMedium";
  /* background-color: rgb(232, 226, 226); */
}

.btn-secondary {
  font-size: 13px;
  color: black;
  background-color: rgb(255, 255, 255);
  border-color: rgb(255, 255, 255);
}
.btn-secondary.active,
.btn-secondary:active {
  background-color: #ffc700 !important;
  border-color: #ffc700 !important;
  color: black;
}

.btn-secondary-card.active {
  border-color: white; /* 원하는 테두리 색상으로 변경 */
  border-width: 3px;
}

.border-selected {
  border-color: #ffc700 !important; /* 선택된 카드의 테두리 색상 */
  border-width: 3px;
}

.where-go {
  font-size: 20px;
  margin-left: 15px;
  margin-top: 10px;
}

.custom-width-1 {
  width: 35%; /* 원하는 크기로 조절 */
  font-size: 12px;
}
.custom-width-2 {
  width: 35%; /* 원하는 크기로 조절 */
  font-size: 12px;
}
.custom-width-button {
  width: 20%; /* 원하는 크기로 조절 */
  background-color: #ffc700;
  border-color: #ffc700;
  color: white;
}

.search-result {
  margin-left: 15px;
  font-size: 20px;
  margin-top: 10px;
  border-bottom: 2px solid #ffc700;
  display: inline-block;
}

.text-color {
  background-color: #ffc700;
}
</style>
