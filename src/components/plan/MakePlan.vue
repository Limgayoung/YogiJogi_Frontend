<template>
  <div class="container-makeplan">
    <div class="left-box">
      <!-- 위에 줄 -->
      <div class="selectInfo">
        <div class="d-flex mb-3">
          <select
            v-model="selectedAreaCode"
            class="form-select custom-width-1-side mr-2"
            aria-label="Default select example"
            @change="fetchGugunCodes"
          >
            <option value="" disabled>첫 번째 선택</option>
            <option v-for="area in areas" :key="area.code" :value="area.code">
              {{ area.name }}
            </option>
          </select>
          <select
            v-model="selectedGugunCode"
            class="form-select custom-width-2-side mr-2"
            aria-label="Default select example"
          >
            <option value="" disabled>두 번째 선택</option>
            <option
              v-for="gugun in guguns"
              :key="gugun.code"
              :value="gugun.code"
            >
              {{ gugun.name }}
            </option>
          </select>
        </div>
        <div class="d-flex">
          <input
            type="text"
            v-model="searchText"
            class="custom-width-input-side flex-grow-1"
            placeholder="검색어를 입력하세요"
          />
          <button
            type="button"
            class="btn btn-primary flex-shrink-0"
            @click="fetchSearchResults()"
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
      <div v-if="cards.length > 0">
        <button
          v-for="(card, index) in cards"
          :key="index"
          type="button"
          class="btn btn-secondary-card d-flex flex-column justify-content-center align-items-center"
          :class="{ active: selectedCard === index }"
          @click="handleCardClick(card)"
          style="height: 7rem; width: 100%"
        >
          <!-- 이미지를 왼쪽에 위치시키고 카드 바디를 오른쪽에 배치합니다. -->
          <div
            class="card d-flex flex-row align-items-center"
            :class="{ 'border-selected': selectedCard === index }"
            style="width: 100%; height: 100%"
          >
            <div class="col-4">
              <!-- 조건부 렌더링 -->
              <template v-if="card.spot.images && card.spot.images.length > 0">
                <img
                  :src="card.spot.images[0].imgSrc"
                  class="card-img-top"
                  alt="..."
                  style="
                    width: auto;
                    max-width: 100%;
                    height: auto;
                    max-height: 100%;
                    margin-left: 15px;
                  "
                />
              </template>
              <template v-else>
                <img
                  src="@/assets/images/noimg.png"
                  class="card-img-top"
                  alt="No Image"
                  style="
                    width: 80px;
                    max-width: 100%;
                    height: auto;
                    max-height: 100%;
                    margin-left: 15px;
                  "
                />
              </template>
              <!-- /조건부 렌더링 -->
            </div>
            <div
              class="card-body col-8 d-flex justify-content-center align-items-center"
            >
              <p class="card-text">{{ card.spot.name }}</p>
            </div>
          </div>
        </button>
      </div>
    </div>

    <div class="middle-box">
      <div class="kakao-map-wrapper">
        <KakaoMap
          width="100%"
          height="45rem"
          :lat="mapCenter.lat"
          :lng="mapCenter.lng"
        >
          <KakaoMapMarkerPolyline
            :markerList="markerList"
            :showMarkerOrder="true"
            strokeColor="#C74C5E"
            :strokeOpacity="1"
            strokeStyle="solid"
            v-if="markerList.length > 0"
          />
          <KakaoMapMarker
            :lat="currentMarker.lat"
            :lng="currentMarker.lng"
            @onClickKakaoMapMarker="onClickKakaoMapMarker"
            :clickable="true"
          />
          <KakaoMapCustomOverlay
            :lat="infoWindow.lat"
            :lng="infoWindow.lng"
            :yAnchor="1.4"
          >
            <div class="info-window">
              <!-- 인포 윈도우의 내용을 여기에서 사용자 정의할 수 있습니다 -->
              <div style="font-size: 15px">{{ infoWindow.title }}</div>
              <div style="font-size: 13px">{{ infoWindow.address }}</div>
              <!-- <span style="float: right; cursor: pointer" @click="closeOverlay" title="닫기">X</span> -->
              <button
                @click="addItemToLastSpace"
                style="
                  font-size: 13px;
                  background-color: #ffc700;
                  border: none;
                  padding: 5px;
                  cursor: pointer;
                "
              >
                여행지 추가
              </button>
            </div>
          </KakaoMapCustomOverlay>
        </KakaoMap>
      </div>
    </div>

    <div class="right-box">
      <div class="space-container">
        <v-btn
          @click="addSpace"
          class="add-space-btn"
          style="margin-right: 10px; background-color: #ffc700"
          >일정 추가</v-btn
        >
        <!-- <v-btn
          @click="addItemToLastSpace"
          class="add-item-btn"
          style="margin-right: 10px; background-color: #ffc700"
          >여행지 추가</v-btn
        > -->
        <v-btn
          @click="removeSpace"
          class="add-space-btn"
          style="margin-right: 10px; background-color: #ffc700"
        >
          일정 삭제
        </v-btn>
        <v-btn
          @click="addItemToLastSpace"
          class="add-item-btn"
          style="margin-right: 10px; background-color: #ffc700"
          >등록</v-btn
        >
        <div v-for="(space, index) in spaces" :key="index" class="space-item">
          <h1>{{ space.title }}</h1>
          <draggable
            v-model="space.items"
            tag="ul"
            group="meals"
            class="draggable-list"
            :itemKey="(item) => item.name"
            @end="onDragEnd"
          >
            <template #item="{ element: meal, index: mealIndex }">
              <li
                style="
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                "
              >
                {{ meal.name }}
                <v-btn
                  icon
                  @click="removeItem(index, mealIndex)"
                  style="
                    background-color: #ffc700;
                    color: white;
                    width: 25px;
                    height: 25px;
                  "
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </li>
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

<script setup>
import { ref, watch, onMounted, computed } from "vue";
import axios from "axios";
import draggable from "vuedraggable";
import {
  KakaoMap,
  KakaoMapMarkerPolyline,
  KakaoMapMarker,
  KakaoMapCustomOverlay,
} from "vue3-kakao-maps";

onMounted(() => {
  fetchAreaCodes();
});

const selectedAreaCode = ref(null);
const selectedGugunCode = ref(null);
const cards = ref([]);
const areas = ref([]);
const guguns = ref([]);
const markerList = ref([
]);

const searchText = ref("");
const selectedCard = ref(null);
const categories = ref([
  "🌄 관광지",
  "📖 문화시설",
  "👨‍👩‍👧‍👦 행사",
  "🏀 레포츠",
  "👜 쇼핑",
  "🍴 음식점",
]);

watch(markerList, (newVal) => {
  console.log("Marker list updated:", newVal);
});

const mapCenter = ref({ lat: 37.5665, lng: 126.978 }); // 서울의 위도와 경도
const currentMarker = ref({
  lat: 0,
  lng: 0,
  title: "",
  address: "",
  id: null,
});

const infoWindow = ref({
  lat: 0,
  lng: 0,
  title: "",
  address: "",
});

const visible = ref(false);
const onClickKakaoMapMarker = () => {
  visible.value = !visible.value;
};

const addMarkerToList = (lat, lng) => {
  console.log("add: " + lat, lng);
  const tmpMarker = {
    lat: lat,
    lng: lng,
  };
  markerList.value.push(tmpMarker);
  console.log("Marker list updated:", markerList.value); // 변경된 markerList 콘솔에 출력
};

const addItemToLastSpace = () => {
  const lastSpace = spaces.value[spaces.value.length - 1];
  if (lastSpace) {
    const newMarker = {
      name: currentMarker.value.title,
      id: currentMarker.value.id,
      lat: currentMarker.value.lat,
      lng: currentMarker.value.lng,
    };
    console.log("함수 호출");
    lastSpace.items.push(newMarker);
    addMarkerToList(currentMarker.value.lat, currentMarker.value.lng); // 새로운 마커 추가
  }
};

const updateMarkerListOrder = () => {
  markerList.value = spaces.value.flatMap((space) =>
    space.items.map((item) => ({ lat: item.lat, lng: item.lng }))
  );
};

// 드래그로 요소 순서 변경 시 호출되는 함수
const onDragEnd = () => {
  updateMarkerListOrder(); // 마커 리스트 순서 업데이트
};

const tabs = ref([{ value: "tab1", text: "1일차", inputText: "" }]);
const currentTab = ref("tab1");
const spaces = ref([
  {
    title: "1일차",
    items: [],
  },
]);

const addSpace = () => {
  const newTitle = `${spaces.value.length + 1}일차`;
  spaces.value.push({ title: newTitle, items: [] });
  addTab(newTitle); // 새로운 공간 추가 시 탭도 추가
};

const removeSpace = () => {
  if (spaces.value.length > 0) {
    spaces.value.pop(); // 배열의 마지막 항목 제거
    removeTab();
  }
};

const addTab = (title) => {
  const newTabValue = `tab${tabs.value.length + 1}`;
  tabs.value.push({ value: newTabValue, text: title, inputText: "" });
  currentTab.value = newTabValue;
};

const removeTab = () => {
  if (tabs.value.length > 0) {
    tabs.value.pop(); // 배열의 마지막 탭 제거
  }
};

const removeItem = (spaceIndex, mealIndex) => {
  const space = spaces.value[spaceIndex];
  if (space && space.items) {
    const removedItem = space.items.splice(mealIndex, 1)[0];

    // markerList에서 해당 마커를 삭제
    markerList.value = markerList.value.filter(
      (marker) => !(marker.lat === removedItem.lat && marker.lng === removedItem.lng)
    );

    // 카카오맵에 실시간으로 반영
    updateMarkerListOrder();
  }
};

// const addItemToLastSpace = () => {
//   const lastSpace = spaces.value[spaces.value.length - 1];
//   if (lastSpace) {
//     lastSpace.items.push({
//       name: `새로운 여행지${lastSpace.items.length + 1}`,
//     });
//   }
// };

const fetchSearchResults = async () => {
  try {
    const url = `http://localhost/api/spots/title/${encodeURIComponent(
      searchText.value
    )}/region?areaCode=${selectedAreaCode.value}&gunguCode=${
      selectedGugunCode.value
    }&offset=0&limit=15`;
    const response = await axios.get(url);
    console.log(url);
    const data = response.data.data;

    console.log(data);
    // cards 값 설정
    cards.value = data;
    console.log(cards.value);
    // searchResults 값 설정
  } catch (error) {
    console.error("Error searching:", error);
  }
};

const fetchAreaCodes = async () => {
  try {
    const response = await axios.get("http://localhost/api/spots/areacode");
    areas.value = response.data.data;
    console.log("Area codes fetched:", areas.value);
  } catch (error) {
    console.error("Error fetching area codes:", error);
  }
};

const fetchGugunCodes = async () => {
  try {
    const response = await axios.get(
      `http://localhost/api/spots/gungucode?areaCode=${selectedAreaCode.value}`
    );
    guguns.value = response.data.data;
    console.log("Gugun codes fetched:", guguns.value);
  } catch (error) {
    console.error("Error fetching gugun codes:", error);
  }
};

const handleCardClick = (card) => {
  console.log(card.spot.latitude, card.spot.longitude);
  if (card.spot.latitude && card.spot.longitude) {
    currentMarker.value = {
      lat: card.spot.latitude,
      lng: card.spot.longitude,
      title: card.spot.name,
      address: card.spot.address,
      id: card.spot.id,
    };
    mapCenter.value = {
      lat: card.spot.latitude,
      lng: card.spot.longitude,
    };
    infoWindow.value = {
      lat: card.spot.latitude,
      lng: card.spot.longitude,
      title: card.spot.name,
      address: card.spot.address,
    };
    console.log(currentMarker.value);
    //overlay.value && overlay.value.setMap(map.value);
  }
};

// const handleMarkerClick = (marker) => {
//   console.log("maker: " + marker);
//   if (marker.lat && marker.lng) {
//     infoWindow.value = {
//       lat: marker.lat,
//       lng: marker.lng,
//       title: marker.title,
//       address: marker.address,
//       visible: true,
//     };
//     mapCenter.value = { lat: marker.lat, lng: marker.lng };
//   }
// };

// const addMarkerToItinerary = () => {
//   const lastSpace = spaces.value[spaces.value.length - 1];
//   if (lastSpace) {
//     lastSpace.items.push({
//       name: currentMarker.value.title,
//       id: currentMarker.value.id,
//     });
//   }
// };

const spacesWatcher = watch(
  spaces,
  (newVal) => {
    console.log("Spaces updated:", newVal);
  },
  { deep: true }
);
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

.custom-width-input-side {
  border: 1px solid rgb(189, 185, 185);
  margin-right: 10px;
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

.info-window {
  background-color: white;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}
</style>
