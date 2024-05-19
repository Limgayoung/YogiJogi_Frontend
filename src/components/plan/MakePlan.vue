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
  },
};
</script>

<script setup>
import { ref, watch } from "vue";
import draggable from "vuedraggable";
import {
  KakaoMap,
  KakaoMapMarkerPolyline,
  KakaoMapMarker,
  KakaoMapCustomOverlay,
} from "vue3-kakao-maps";

// 초기 공간들
const spaces = ref([
  { title: "1일차", items: [{ name: "강남역" }, { name: "멀티캠퍼스" }, { name: "대림역" }] },
]);

// 새로운 공간 추가 함수
const addSpace = () => {
  spaces.value.push({ title: `${spaces.value.length + 1}일차`, items: [] });
};

// 마지막 공간에 요소 추가 함수
const addItemToLastSpace = () => {
  const lastSpace = spaces.value[spaces.value.length - 1];
  if (lastSpace) {
    lastSpace.items.push({ name: `새로운 여행지${lastSpace.items.length + 1}` });
  }
};

// spaces가 변경될 때마다 새로운 값을 콘솔에 출력
watch(spaces, (newVal) => {
  console.log("Spaces updated:", newVal);
}, { deep: true });

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
  });
};

// 마커 삭제하기 버튼의 함수입니다
const deleteMarker = () => {
  markerList.value.pop();
};

// Define the onClickKakaoMapMarker method
const onClickKakaoMapMarker = () => {
  alert("Marker clicked!");
};
</script>

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
            class="custom-width-input"
            placeholder="검색어를 입력하세요"
          />
          <button type="button" class="btn btn-primary" @click="search">
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
            <v-chip :class="selectedClass" @click="toggle">{{ category }}</v-chip>
          </v-item>
        </v-item-group>
      </div>
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
          style="width: 21rem"
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
        <button @click="addSpace" class="add-space-btn">Add New Space</button>
        <button @click="addItemToLastSpace" class="add-item-btn">Add Item to Last Space</button>
        <div v-for="(space, index) in spaces" :key="index" class="space-item">
          <h1>{{ space.title }}</h1>
          <draggable
            v-model="space.items"
            tag="ul"
            group="meals"
            class="draggable-list"
            :itemKey="item => item.name"
          >
            <template #item="{ element: meal }">
              <li>{{ meal.name }}</li>
            </template>
          </draggable>
        </div>
      </div>
    </div>
  </div>
</template>

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
  height: 100vh; /* 컨테이너를 화면의 높이만큼 설정합니다. */
}

.left-box {
  flex: 1; /* 왼쪽 박스 */
  border: 1px solid black;
  overflow-y: auto; /* 세로 스크롤을 활성화합니다. */
}

.middle-box {
  flex: 2; /* 가운데 박스 */
  margin: 0 10px; /* 가운데 박스를 좌우로 조금씩 여백을 줍니다. */
  border: 1px solid black;
  overflow-y: auto; /* 세로 스크롤을 활성화합니다. */
}

.right-box {
  flex: 1; /* 오른쪽 박스 */
  border: 1px solid black;
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
  border: 1px solid black;
  margin-right: 8px;
}

.selectInfo {
  margin-left: 10px;
  margin-top: 10px;
}

.top-btn {
  margin-top: 10px;
  margin-left: 10px;
}

.right-box {
  flex: 1;
  border: 1px solid black;
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
