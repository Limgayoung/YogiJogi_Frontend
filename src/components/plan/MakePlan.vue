<template>
  <div class="container-makeplan">
    <div class="left-box">
      <!-- 위에 줄 -->
      <div class="selectInfo">
        <div class="d-flex mb-3">
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
        </div>

        <!-- 아래 줄 -->
        <div class="d-flex">
          <input
            type="text"
            v-model="searchText"
            class="custom-width-input flex-grow-1"
            placeholder="검색어를 입력하세요"
          />
          <button
            type="button"
            class="btn btn-primary flex-shrink-0"
            @click="search"
            style="
              background-color: #ffb108;
              border-color: #ffb108;
              margin-right: 10px;
            "
          >
            검색
          </button>
        </div>
      </div>
      <div class="top-btn">
        <v-item-group selected-class="bg-yellow" multiple>
          <v-item
            v-for="(category, index) in categories"
            :key="index"
            v-slot="{ selectedClass, toggle }"
          >
            <v-chip :class="selectedClass" @click="toggle">{{
              category
            }}</v-chip>
          </v-item>
        </v-item-group>
      </div>
      <button
        v-for="(card, index) in cards"
        :key="index"
        type="button"
        class="btn btn-secondary-card d-flex flex-column justify-content-center align-items-center"
        :class="{ active: selectedCard === index }"
        @click="handleCardClick(card)"
        style="height: 8rem"
      >
        <div
          class="card d-flex flex-row align-items-center"
          :class="{ 'border-selected': selectedCard === index }"
          style="width: 100%; height: 100%"
        >
          <!-- 이미지를 왼쪽에 위치시킵니다. -->
          <div class="col-4">
            <img
              :src="card.imgSrc"
              class="card-img-top"
              alt="..."
              style="width: 100%; height: 100%; margin-left: 15px"
            />
          </div>
          <!-- 카드 바디를 오른쪽에 배치합니다. -->
          <div
            class="card-body col-8 d-flex justify-content-center align-items-center"
          >
            <p class="card-text">{{ card.description }}</p>
          </div>
        </div>
      </button>
    </div>

    <div class="middle-box">
      <div class="kakao-map-wrapper">
        <KakaoMap width="100%" height="45rem" :lat="33.452" :lng="126.573">
          <KakaoMapMarkerPolyline
            :markerList="markerList"
            :showMarkerOrder="true"
            strokeColor="#C74C5E"
            :strokeOpacity="1"
            strokeStyle="shortdot"
          />

          <KakaoMapMarker
            :lat="33.450705"
            :lng="126.570667"
            :image="newImage"
            @onClickKakaoMapMarker="onClickKakaoMapMarker"
            :clickable="true"
          />
        </KakaoMap>
      </div>
    </div>

    <div class="right-box">
      <div class="space-container">
        <v-btn @click="addSpace" class="add-space-btn" style="margin-right: 10px; background-color: #ffc700;">일정 추가</v-btn>
        <v-btn @click="addItemToLastSpace" class="add-item-btn" style="margin-right: 10px; background-color: #ffc700;"
          >여행지 추가</v-btn
        >
        <v-btn @click="addItemToLastSpace" class="add-item-btn" style="margin-right: 10px; background-color: #ffc700;">등록</v-btn>
        <div v-for="(space, index) in spaces" :key="index" class="space-item">
          <h1>{{ space.title }}</h1>
          <draggable
            v-model="space.items"
            tag="ul"
            group="meals"
            class="draggable-list"
            :itemKey="(item) => item.name"
          >
            <template #item="{ element: meal }">
              <li>{{ meal.name }}</li>
            </template>
          </draggable>
        </div>
      </div>
      <v-card style="padding: 10px">
        <v-tabs v-model="currentTab" bg-color="#ffb108">
          <v-tab v-for="tab in tabs" :key="tab.value" :value="tab.value">
            {{ tab.text }}
          </v-tab>
        </v-tabs>

        <v-card-text>
          <v-tabs-window v-model="currentTab">
            <v-tabs-window-item
              v-for="tab in tabs"
              :key="tab.value"
              :value="tab.value"
            >
              <input v-model="tab.inputText" placeholder="내용을 입력하세요" />
            </v-tabs-window-item>
          </v-tabs-window>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
import { ref, watch } from "vue";
import draggable from "vuedraggable";
import {
  KakaoMap,
  KakaoMapMarkerPolyline,
  KakaoMapMarker,
  KakaoMapCustomOverlay,
} from "vue3-kakao-maps";

export default {
  data() {
    return {
      selectedValue1: null,
      selectedValue2: null,
      searchText: "",
      selectedCard: null,
      categories: [
        "🌄 관광지",
        "📖 문화시설",
        "👨‍👩‍👧‍👦 행사",
        "🏀 레포츠",
        "👜 쇼핑",
        "🍴 음식점",
      ],
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
      tabs: [{ value: "tab1", text: "1일차", inputText: "" }],
      currentTab: "tab1",
      spaces: ref([
        {
          title: "1일차",
          items: [
            { name: "강남역" },
            { name: "멀티캠퍼스" },
            { name: "대림역" },
          ],
        },
      ]),
    };
  },
  methods: {
    search() {
      console.log("Selected Value 1:", this.selectedValue1);
      console.log("Selected Value 2:", this.selectedValue2);
      console.log("Search Text:", this.searchText);
    },
    handleCardClick(card) {
      this.selectedCardDescription = card.description;
      this.visibleRight = true;
    },
    addSpace() {
      const newTitle = `${this.spaces.length + 1}일차`;
      this.spaces.push({ title: newTitle, items: [] });
      this.addTab(newTitle); // 새로운 공간 추가 시 탭도 추가
    },
    addTab(title) {
      const newTabValue = `tab${this.tabs.length + 1}`;
      this.tabs.push({ value: newTabValue, text: title, inputText: "" });
      this.currentTab = newTabValue;
    },
    addItemToLastSpace() {
      const lastSpace = this.spaces[this.spaces.length - 1];
      if (lastSpace) {
        lastSpace.items.push({
          name: `새로운 여행지${lastSpace.items.length + 1}`,
        });
      }
    },
  },
  watch: {
    spaces: {
      handler(newVal) {
        console.log("Spaces updated:", newVal);
      },
      deep: true,
    },
  },
};
</script>

<script setup>
import { ref } from "vue";
import {
  KakaoMap,
  KakaoMapMarkerPolyline,
  KakaoMapMarker,
  KakaoMapCustomOverlay,
} from "vue3-kakao-maps";
/**
 * 해당 장소에 대한 세부 내용 Server로부터 받는다.
 * 받은 정보를 토대로 마커 띄우고 인포윈도우 띄운다.
 * 사이드바의 추가 버튼으로 여행 계획에 해당 장소를 추가할 수 있다.
 */
const image = {
  imageSrc: "src/assets/images/marker/15.png",
  imageWidth: 30,
  imageHeight: 40,
};

const newImage = {
  imageSrc: "src/assets/images/marker/12.png",
  imageWidth: 30,
  imageHeight: 40,
};

const markerList = ref([
  { lat: 33.4509, lng: 126.571, image, order: "출발" },
  { lat: 33.451, lng: 126.572, image },
  { lat: 33.452, lng: 126.573, image },
  { lat: 33.4518, lng: 126.5725, image },
]);

// 마커 추가하기 버튼의 함수입니다
const addMarker = () => {
  markerList.value.push({
    lat: 33.4509 + Math.random() * 0.003,
    lng: 126.571 + Math.random() * 0.003,
    image,
    // orderBottomMargin: '40px'
  });
};

// 마커 삭제하기 버튼의 함수입니다
const deleteMarker = () => {
  markerList.value.pop();
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

.container-makeplan {
  font-family: "GongGothicMedium";
}

.container-makeplan {
  display: flex;
  height: 90vh; /* 컨테이너를 화면의 높이만큼 설정합니다. */
  padding: 10px;
}

.left-box {
  flex: 1; /* 왼쪽 박스 */
  border: 1px solid rgb(185, 184, 184);
  overflow-y: auto; /* 세로 스크롤을 활성화합니다. */
}

.middle-box {
  flex: 2; /* 가운데 박스 */
  margin: 0 10px; /* 가운데 박스를 좌우로 조금씩 여백을 줍니다. */
  border: 1px solid rgb(185, 184, 184);
  overflow-y: auto; /* 세로 스크롤을 활성화합니다. */
}

.right-box {
  flex: 1; /* 오른쪽 박스 */
  border: 1px solid rgb(185, 184, 184);
  overflow-y: auto; /* 세로 스크롤을 활성화합니다. */
}

.select-boxes {
  display: flex;
  margin-bottom: 10px;
}

.select-boxes select {
  margin-right: 10px;
}

.input-section {
  display: flex;
  align-items: center;
}

.input-section input {
  margin-right: 10px;
}

.input-section button {
  padding: 5px 10px;
}

.custom-width-input {
  width: 275px;
  border: 1px solid rgb(165, 164, 164);
  margin-right: 8px;
}

/* .custom-width-input {
  border: 1px solid black;
  margin-right: 8px;
  flex-grow: 1;
} */

.selectInfo {
  margin-left: 10px;
  margin-top: 10px;
}

.top-btn {
  margin-top: 10px;
  margin-left: 10px;
}


.space-container {
  margin: 10px;
}

.add-space-btn {
  margin-bottom: 10px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
}

.add-item-btn {
  margin-bottom: 10px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
}

.space-item {
  margin-top: 20px;
}

.draggable-list {
  list-style-type: none;
  padding: 0;
}

.draggable-list li {
  margin: 0.5rem 0;
  padding: 0.5rem;
  border: 1px solid #ccc;
  background-color: #fafafa;
  cursor: move;
}

.space-item h1 {
  font-size: 1.5rem;
  margin-top: 1rem;
}

</style>
