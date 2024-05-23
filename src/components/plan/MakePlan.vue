<template>
  <div class="container-makeplan">
    <div class="left-box">
      <!-- 위에 줄 -->
      <div class="selectInfo">
        <div class="d-flex mb-3">
          <select v-model="selectedAreaCode" class="form-select custom-width-1-side mr-2"
            aria-label="Default select example" @change="fetchGugunCodes">
            <option value="" disabled>첫 번째 선택</option>
            <option v-for="area in areas" :key="area.code" :value="area.code">
              {{ area.name }}
            </option>
          </select>
          <select v-model="selectedGugunCode" class="form-select custom-width-2-side mr-2"
            aria-label="Default select example">
            <option value="" disabled>두 번째 선택</option>
            <option v-for="gugun in guguns" :key="gugun.code" :value="gugun.code">
              {{ gugun.name }}
            </option>
          </select>
        </div>
        <div class="d-flex">
          <input type="text" v-model="searchText" class="custom-width-input-side flex-grow-1"
            placeholder="검색어를 입력하세요" />
          <button type="button" class="btn btn-primary flex-shrink-0" @click="fetchSearchResults()" style="
              background-color: #ffb108;
              border-color: #ffb108;
              margin-right: 10px;
            ">
            검색
          </button>
        </div>
      </div>
      <div class="top-btn">
        <v-item-group v-model="selectedCategory" selected-class="bg-yellow">
          <v-item v-for="(category, index) in categories" :key="index" v-slot="{ selectedClass, toggle }">
            <v-chip :class="selectedClass" @click="() => handleCategoryClick(category.id, toggle)">
              {{ category.name }}
            </v-chip>
          </v-item>
        </v-item-group>
      </div>
      <div v-if="cards.length > 0">
        <button v-for="(card, index) in cards" :key="index" type="button"
          class="btn btn-secondary-card d-flex flex-column justify-content-center align-items-center"
          :class="{ active: selectedCard === index }" @click="handleCardClick(card)" style="height: 7rem; width: 100%">
          <!-- 이미지를 왼쪽에 위치시키고 카드 바디를 오른쪽에 배치합니다. -->
          <div class="card d-flex flex-row align-items-center" :class="{ 'border-selected': selectedCard === index }"
            style="width: 100%; height: 100%">
            <div class="col-4">
              <!-- 조건부 렌더링 -->
              <template v-if="card.imgUrl">
                <img :src="card.imgUrl" class="card-img-top" alt="..." style="
                    width: 130px;
                    max-width: 100%;
                    height: 70px;
                    max-height: 100%;
                    margin-left: 15px;
                  " />
              </template>
              <template v-else>
                <img src="@/assets/images/noimg.png" class="card-img-top" alt="No Image" style="
                    width: 80px;
                    max-width: 100%;
                    height: auto;
                    max-height: 100%;
                    margin-left: 15px;
                  " />
              </template>
              <!-- /조건부 렌더링 -->
            </div>
            <div class="card-body col-8 d-flex justify-content-center align-items-center">
              <p class="card-text">{{ card.spot.name }}</p>
            </div>
          </div>
        </button>
      </div>
    </div>

    <div class="middle-box">
      <div class="kakao-map-wrapper">
        <KakaoMap width="100%" height="45rem" :lat="mapCenter.lat" :lng="mapCenter.lng">
          <KakaoMapMarkerPolyline :markerList="markerList" :showMarkerOrder="true" strokeColor="#C74C5E"
            :strokeOpacity="1" strokeStyle="solid" v-if="markerList.length > 0" />
          <KakaoMapMarker :lat="currentMarker.lat" :lng="currentMarker.lng"
            @onClickKakaoMapMarker="onClickKakaoMapMarker" :clickable="true" />
          <KakaoMapCustomOverlay :lat="infoWindow.lat" :lng="infoWindow.lng" :yAnchor="1.4">
            <div class="info-window">
              <!-- 인포 윈도우의 내용을 여기에서 사용자 정의할 수 있습니다 -->
              <div style="font-size: 15px">{{ infoWindow.title }}</div>
              <div style="font-size: 13px">{{ infoWindow.address }}</div>
              <!-- <span style="float: right; cursor: pointer" @click="closeOverlay" title="닫기">X</span> -->
              <button @click="addItemToLastSpace" style="
                  font-size: 13px;
                  background-color: #ffc700;
                  border: none;
                  padding: 5px;
                  cursor: pointer;
                ">
                여행지 추가
              </button>
            </div>
          </KakaoMapCustomOverlay>
        </KakaoMap>
      </div>
    </div>

    <div class="right-box">
      <div class="space-container">
        <div><input v-model="tripTitle" class="title-input" placeholder="제목을 입력하세요" /></div>
        <div class="button-group">
          <v-btn @click="addSpace" class="add-space-btn" style="margin-right: 10px; background-color: #ffc700">일차
            추가</v-btn>
          <!-- <v-btn
          @click="addItemToLastSpace"
          class="add-item-btn"
          style="margin-right: 10px; background-color: #ffc700"
          >여행지 추가</v-btn
        > -->
          <v-btn @click="removeSpace" class="add-space-btn" style="margin-right: 10px; background-color: #ffc700">
            일차 삭제
          </v-btn>

          <!-- tripTheme 드롭다운 선택자 추가 -->
          <select v-model="selectedThemeId" class="form-select custom-width-triptheme theme-select" aria-label="테마 선택">
            <option :value="테마" disabled>테마</option>
            <option v-for="theme in themes" :key="theme.id" :value="theme.id">                            
              {{ theme.name }}
            </option>
          </select>

          <v-btn @click="postInitTrip" class="add-item-btn"
            style="margin-right: 10px; background-color: #ffc700">등록</v-btn>
        </div>
        <div v-for="(space, index) in spaces" :key="index" class="space-item">
          <h1>{{ space.title }}</h1>
          <draggable v-model="space.items" tag="ul" group="meals" class="draggable-list" :itemKey="(item) => item.name"
            @end="onDragEnd">
            <template #item="{ element: meal, index: mealIndex }">
              <li style="
                  display: flex;
                  justify-content: space-between;
                  align-items: center;
                ">
                {{ meal.name }}
                <v-btn icon @click="removeItem(index, mealIndex)" style="
                    background-color: #ffc700;
                    color: white;
                    width: 25px;
                    height: 25px;
                  ">
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
            <v-tabs-window-item v-for="tab in tabs" :key="tab.value" :value="tab.value">
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
import { useUserStore } from "@/stores/userStore"; // Pinia store import
import { useRouter } from "vue-router"; // vue-router import

const userStore = useUserStore();
const router = useRouter(); // useRouter 초기화
onMounted(() => {
  fetchAreaCodes();
});

const selectedAreaCode = ref(null);
const selectedGugunCode = ref(null);
const cards = ref([]);
const areas = ref([]);
const guguns = ref([]);
const markerList = ref([]);
const selectedCategory = ref(null);
const selectedCategoryContentId = ref(null);
const searchText = ref("");
const selectedCard = ref(null);
const categories = ref([
  { name: "🌄 관광지", id: 12 },
  { name: "📖 문화시설", id: 14 },
  { name: "👨‍👩‍👧‍👦 행사", id: 15 },
  { name: "🏀 레포츠", id: 28 },
  { name: "👜 쇼핑", id: 38 },
  { name: "🍴 음식점", id: 39 },
]);
const tripTitle = ref("");
const themes = ref([
  { name: "가족과함께", id: 1 },
  { name: "연인과함께", id: 2 },
  { name: "아기와함께", id: 3 },
  { name: "반려동물과함께", id: 4 },
  { name: "친구와함께", id: 5 },
  { name: "나홀로여행", id: 6 },
  { name: "어르신과함께", id: 7 },
]);

const selectedThemeId = ref("");

watch(markerList, (newVal) => {
  // console.log("Marker list updated:", newVal);
});

const handleCategoryClick = (category, toggle) => {
  // console.log("cid " + category);
  selectedCategory.value = category;
  selectedCategoryContentId.value = category;
  // console.log(selectedCategory.value);
  toggle();
};

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
  // console.log("add: " + lat, lng);
  const tmpMarker = {
    lat: lat,
    lng: lng,
  };
  markerList.value.push(tmpMarker);
  // console.log("Marker list updated:", markerList.value); // 변경된 markerList 콘솔에 출력
};

const addItemToLastSpace = () => {
  console.log('addItemToLastSpace spaces : ', spaces.value);
  const lastSpace = spaces.value[spaces.value.length - 1];
  if (lastSpace) {
    const newMarker = {
      name: currentMarker.value.title,
      id: currentMarker.value.id,
      lat: currentMarker.value.lat,
      lng: currentMarker.value.lng,
    };
    // console.log("함수 호출");
    lastSpace.items.push(newMarker);
    addMarkerToList(currentMarker.value.lat, currentMarker.value.lng); // 새로운 마커 추가
  }

  if (map.value && bounds) {
    clearMarkers(); // 기존 마커 제거
    bounds = new kakao.maps.LatLngBounds();

    results.forEach((result) => {
      const point = new kakao.maps.LatLng(result.spot.latitude, result.spot.longitude);
      const marker = new kakao.maps.Marker({
        position: point,
      });
      marker.setMap(map.value);
      markers.value.push(marker); // 새로운 마커 저장
      bounds.extend(point);
    });

    map.value.setBounds(bounds);
  }
};

// 기존 마커 제거 함수
const clearMarkers = () => {
  markers.value.forEach(marker => marker.setMap(null));
  markers.value = []; // 배열 초기화
};

watch(
  () => searchStore.searchResults,
  (newResults) => {
    searchResults.value = newResults;
    setMarkers(newResults);
  }
);

// drawLines 상태 감시
watch(
  () => searchStore.drawLines,
  (newValue) => {
    drawLines.value = newValue;
  }
};

const fetchSearchResults = async () => {
  try {
    const url = `http://localhost/api/spots/search`;
    const params = {
      areaCode: selectedAreaCode.value,
      gunguCode: selectedGugunCode.value,
      title: searchText.value,
      contentTypeId: selectedCategoryContentId.value,
      offset: 0,
      limit: 15
    };

    // console.log("params :" +selectedCategory.value);
    // console.log(params);
    const response = await axios.get(url, { params });
    // console.log(url, params);
    const data = response.data.data;

    console.log('response data: ', data);
    // cards 값 설정
    cards.value = data;
    // console.log(cards.value);
    // searchResults 값 설정
  } catch (error) {
    console.error("Error searching:", error);
  }
};

const fetchAreaCodes = async () => {
  try {
    const response = await axios.get("http://localhost/api/spots/search/areacode");
    areas.value = response.data.data;
    // console.log("Area codes fetched:", areas.value);
  } catch (error) {
    console.error("Error fetching area codes:", error);
  }
};

const fetchGugunCodes = async () => {
  try {
    const response = await axios.get(
      `http://localhost/api/spots/search/gungucode?areaCode=${selectedAreaCode.value}`
    );
    guguns.value = response.data.data;
    // console.log("Gugun codes fetched:", guguns.value);
  } catch (error) {
    console.error("Error fetching gugun codes:", error);
  }
};

//server에 trip init request를 보낸다.
const postInitTrip = async () => {
  try {
    const data = makeRequestData();
    console.log('post init trip request data: ', data);
    console.log('jwtToken: ', userStore.jwtToken);
    console.log('accessToken: ', userStore.jwtToken.accessToken);
    const response = await axios.post(
      `http://localhost/api/trips/`,
      data,
      {
        headers: {
          Authorization: `${userStore.jwtToken.accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    console.log('post 후 응답 response: ', response.data.data);
    alert('여행 코스 등록이 완료되었습니다.');
    router.push({ name: 'planDetail', params: { id: response.data.data } })
    // console.log("Gugun codes fetched:", guguns.value);
  } catch (error) {
    console.error("Error post init trip codes:", error);
  }
};

const makeRequestData = () => {
  const userId = userStore.user; // 실제 사용자 ID로 교체 필요
  const title = tripTitle.value; // 실제 제목으로 교체 필요
  const tripPeriod = spaces.value.length; // 일정의 일수로 설정
  const content = tabs.value.map(tab => tab.inputText); // 각 탭의 입력된 내용을 배열로 변환
  const tripThemeId = 1; // 실제 테마 ID로 교체 필요

  const schedules = spaces.value.flatMap((space, dateSequence) =>
    space.items.map((item, scheduleSequence) => ({
      dateSequence: dateSequence + 1,
      scheduleSequence: scheduleSequence + 1,
      spotId: item.id
    }))
  );

  //console.log('spaces: ',spaces.value);
  // console.log('schedules: ',schedules);


  return {
    userId,
    title,
    tripPeriod,
    content,
    tripThemeId,
    schedules
  };
};

const handleCardClick = (card) => {
  // console.log(card.spot.latitude, card.spot.longitude);
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
    // console.log(currentMarker.value);
    //overlay.value && overlay.value.setMap(map.value);
  }
};

const spacesWatcher = watch(
  spaces,
  (newVal) => {
    // console.log("Spaces updated:", newVal);
  },
  { deep: true }
);
</script>

<style scoped>
@font-face {
  font-family: "GongGothicMedium";
  src: url("https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_20-10@1.0/GongGothicMedium.woff") format("woff");
  font-weight: normal;
  font-style: normal;
}
div {
  width: 100%;
  height: 100%;
}

.container-makeplan {
  display: flex;
  height: 90vh;
  /* 컨테이너를 화면의 높이만큼 설정합니다. */
  padding: 10px;
}

.left-box {
  flex: 1;
  /* 왼쪽 박스 */
  border: 1px solid rgb(185, 184, 184);
  overflow-y: auto;
  /* 세로 스크롤을 활성화합니다. */
}

.middle-box {
  flex: 2;
  /* 가운데 박스 */
  margin: 0 10px;
  /* 가운데 박스를 좌우로 조금씩 여백을 줍니다. */
  border: 1px solid rgb(185, 184, 184);
  overflow-y: auto;
  /* 세로 스크롤을 활성화합니다. */
}

.right-box {
  flex: 1;
  /* 오른쪽 박스 */
  border: 1px solid rgb(185, 184, 184);
  overflow-y: auto;
  /* 세로 스크롤을 활성화합니다. */
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
  padding: 10px 20px;
  font-size: 14px;
  background-color: #ffc700;
  border: none;
  color: white;
  cursor: pointer;
}

.demo-button:hover {
  background-color: #e0b400;
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

.title-input {
  flex-grow: 1;
  /* 입력란이 가능한 한 넓어지도록 설정 */
  height: 50px;
  padding: 5px;
  /* 여백 추가 */
  font-size: 1.2rem;
  /* 글자 크기 조정 */
  margin-bottom: 10px;
}

.custom-width-triptheme {
  width: 100%;
  height: 50px;
  margin-bottom: 10px;
}

.title-input {
  flex-grow: 1;
  /* 입력란이 가능한 한 넓어지도록 설정 */
  height: 50px;
  padding: 5px;
  /* 여백 추가 */
  font-size: 1.2rem;
  /* 글자 크기 조정 */
  margin-bottom: 10px;
}

.button-group {
  display: flex;
  align-items: center;
}

.button-group .theme-select {
  margin-left: 10px;
  margin-right: 10px;
  flex-grow: 1;
  width: 50px; /* auto로 설정하여 콘텐츠 크기에 맞추기 */
  height: 38px; /* 버튼과 동일한 높이 */
  padding: 5px 10px; /* 패딩 추가 */
  font-size: 1rem; /* 글자 크기 조정 */
  margin-right: 10px; /* 오른쪽 여백 추가 */
  border-radius: 4px; /* 모서리 둥글게 */
  border: 1px solid #ccc; /* 테두리 추가 */
}

.button-group .register-btn {
  height: 50px;
}
</style>
