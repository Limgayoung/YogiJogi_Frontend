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
        @click="handleButtonSelect(index)"
      >
        {{ button }}
      </button>
    </div>
  </div>
  <div class="sidebar2">
    <!-- 추천테마 -->
    <div v-if="selectedButton === 0">
      <v-sheet class="mx-auto" max-width="400" rounded="xl">
        <div class="pa-4">
          <v-responsive class="overflow-y-auto" max-height="150">
            <v-chip-group class="mt-3" selected-class="text-color" column>
              <v-chip
                v-for="tag in tags"
                :key="tag"
                :text="tag"
                :value="tag"
              ></v-chip>
            </v-chip-group>
          </v-responsive>
        </div>
      </v-sheet>
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
          <div class="photo_gallery" v-if="slides.length > 0">
            <!-- 공사 사진 영역 -->
            <v-carousel
              height="400"
              width="100%"
              cycle
              hide-delimiter-background
            >
              <v-carousel-item v-for="(slide, i) in slides" :key="i">
                <v-sheet :color="colors[i]" height="100%">
                  <div class="d-flex fill-height justify-center align-center">
                    <div class="spotname">{{ slide }}</div>
                  </div>
                </v-sheet>
              </v-carousel-item>
            </v-carousel>
          </div>
          <div v-else>
            <!-- 슬라이드 로딩 중 표시할 내용 -->
            <p>Loading...</p>
          </div>
        </Sidebar>
        <button
          v-for="(card, index) in cards"
          :key="index"
          type="button"
          class="btn btn-secondary-card d-flex flex-column justify-content-center align-items-center"
          :class="{ active: selectedCard === index }"
          @click="handleCardClick(card)"
          style="height: 7rem"
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
    </div>

    <!-- 인기장소 -->
    <div v-else-if="selectedButton === 1">
      <div class="where-go">어디로 떠나볼까요?</div>
      <div v-if="searchResult" class="search-result">
        {{ selectedAreaName }} {{ selectedGugunName }}
      </div>
      <div class="container-side mt-3">
        <div class="d-flex">
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
            @click="
              () => {
                fetchSearchResults();
                localSearch();
              }
            "
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
      <div
        class="btn-group-vertical"
        role="group"
        aria-label="Vertical button group"
      >
        <Sidebar
          v-model:visible="visibleRight"
          :selectedCardDescription="selectedCardDescription"
          header=""
          position="right"
        >
          <div class="card-details">
            <img
              v-if="
                selectedCard.images != null && selectedCard.images.length > 0
              "
              :src="selectedCard.images[0]"
              alt="Spot Image"
              style="max-width: 100%; height: auto"
            />
            <img
              v-else
              src="@/assets/images/noimg.jpg"
              class="card-img-top"
              alt="No Image"
              style="width: 100%; height: 100%; margin-left: 15px"
            />
            <div class="card-info-custom">
              <h2 class="card-info-title">
                <a :href="selectedCard.spot.homepage" target="_blank">{{
                  selectedCard.spot.name
                }}</a>
              </h2>
              <p><strong>주소:</strong> {{ selectedCard.spot.address }}</p>
              <p><strong>조회수:</strong> {{ selectedCard.spot.views }}</p>
              <p v-if="selectedCard.spot.homepage">
                <strong>홈페이지:</strong>
                <a :href="selectedCard.spot.homepage" target="_blank">{{
                  selectedCard.spot.homepage
                }}</a>
              </p>
              <p v-else><strong>홈페이지:</strong> 등록된 정보가 없습니다.</p>
              <p v-if="selectedCard.spot.phone">
                <strong>전화번호:</strong> {{ selectedCard.spot.phone }}
              </p>
              <p v-else><strong>전화번호:</strong> 등록된 정보가 없습니다.</p>
            </div>
          </div>
        </Sidebar>
        <div v-if="cards.length > 0">
          <button
            v-for="(card, index) in cards"
            :key="index"
            type="button"
            class="btn btn-secondary-card d-flex flex-column justify-content-center align-items-center"
            :class="{ active: selectedCard === index }"
            @click="handleCardClick(card)"
            style="height: 7rem"
          >
            <!-- 이미지를 왼쪽에 위치시키고 카드 바디를 오른쪽에 배치합니다. -->
            <div
              class="card d-flex flex-row align-items-center"
              :class="{ 'border-selected': selectedCard === index }"
              style="width: 100%; height: 100%"
            >
              <div class="col-4">
                <!-- 조건부 렌더링 -->
                <template
                  v-if="card.spot.images && card.spot.images.length > 0"
                >
                  <img
                    :src="card.spot.images[0].imgSrc"
                    class="card-img-top"
                    alt="..."
                    style="width: 100%; height: 100%; margin-left: 15px"
                  />
                </template>
                <template v-else>
                  <img
                    src="@/assets/images/noimg.jpg"
                    class="card-img-top"
                    alt="No Image"
                    style="width: 100%; height: 100%; margin-left: 15px"
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
      <div class="top-btn">
        <v-item-group v-model="selectedCategory" selected-class="bg-yellow">
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
    </div>

    <!-- 여행코스 -->
    <div v-else-if="selectedButton === 2">
      <div class="pa-4" style="max-width: 400px">
        <v-chip-group selected-class="text-color" column>
          <v-chip v-for="t in theme" :key="t"> {{ t }} </v-chip>
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
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
        </Sidebar>
        <button
          v-for="(card, index) in cards"
          :key="index"
          type="button"
          class="btn btn-secondary-card d-flex flex-column justify-content-center align-items-center"
          :class="{ active: selectedCard === index }"
          @click="handleCardClick(card)"
          style="height: 7rem"
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
    </div>

    <!-- 나의여행 -->
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { provide } from "vue";
const router = useRouter();
import axios from "axios";
import Sidebar from "primevue/sidebar";
import { useSearchStore } from "@/stores/searchStore.js";

const searchStore = useSearchStore();

const selectedCategory = ref(null);
const searchText = ref(null);
const selectedAreaCode = ref(null);
const selectedGugunCode = ref(null);
const searchResult = ref(null);
const areas = ref([]);
const guguns = ref([]);
const selectedAreaName = ref("");
const selectedGugunName = ref("");
const buttons = ref(["추천테마", "인기장소", "여행코스", "나의여행"]);
const selectedButton = ref(0);
const selectedCard = ref(null);
const selectedCardDescription = ref("");
const visibleRight = ref(false);
const tags = ref([
  "#가족과함께",
  "#연인과함께",
  "#반려동물과함께",
  "#친구와함께",
  "#가족과함께2",
  "#연인과함께2",
  "#반려동물과함께2",
  "#친구와함께2",
]);
const theme = ref(["가족과함께", "연인과함께", "반려동물과함께", "친구와함께"]);

const searchResults = ref([]);
provide("searchResults", searchResults); // Provide searchResults to children

const categories = ref([
  "🌄 관광지",
  "📖 문화시설",
  "👨‍👩‍👧‍👦 행사",
  "🏀 레포츠",
  "👜 쇼핑",
  "🍴 음식점",
]);
const cards = ref([]);

onMounted(() => {
  fetchAreaCodes();
});

const handleCardClick = async (card) => {
  selectedCard.value = card;
  visibleRight.value = true;

  try {
    const response = await axios.get(
      `http://localhost/api/spots/${card.spot.id}`
    );
    console.log(`http://localhost/api/spots/${card.spot.id}`);
    selectedCardDescription.value = response.data.data;
  } catch (error) {
    console.error("Error fetching card details:", error);
  }
};

const fetchAreaCodes = async () => {
  try {
    const response = await axios.get("http://localhost/api/spots/areacode");
    areas.value = response.data.data;
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
  } catch (error) {
    console.error("Error fetching gugun codes:", error);
  }
};

const localSearch = () => {
  if (selectedAreaCode.value || selectedGugunCode.value) {
    selectedAreaName.value =
      areas.value.find((area) => area.code === selectedAreaCode.value)?.name ||
      "";
    selectedGugunName.value =
      guguns.value.find((gugun) => gugun.code === selectedGugunCode.value)
        ?.name || "";
    searchResult.value = `${selectedAreaName.value} - ${selectedGugunName.value}에 대한 검색 결과가 여기에 나타납니다.`;
  } else {
    searchResult.value = "먼저 두 가지를 선택해주세요.";
  }
};

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
    searchStore.setSearchResults(data);
  } catch (error) {
    console.error("Error searching:", error);
  }
};

const handleButtonSelect = (index) => {
  selectedButton.value = index;
  if (index === 3) {
    router.push("/makePlan"); // 나의여행 페이지로 이동
  }
};
</script>

<style scoped>
@font-face {
  font-family: "GongGothicMedium";
  src: url("https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_20-10@1.0/GongGothicMedium.woff")
    format("woff");
  font-weight: normal;
  font-style: normal;
}

.sidebar {
  background-color: transparent;
  padding: 0px;
  font-family: "GongGothicMedium";
}

.sidebar2 {
  background-color: transparent;
  padding: 0px;
  width: 24%;
  font-family: "GongGothicMedium";
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
  border-color: white;
  border-width: 3px;
}

.border-selected {
  border-color: #ffc700 !important;
  border-width: 3px;
}

.where-go {
  font-size: 20px;
  margin-left: 15px;
  margin-top: 10px;
}

.custom-width-1-side {
  margin-left: 10px;
  width: 50%;
  font-size: 12px;
}
.custom-width-2-side {
  width: 50%;
  font-size: 12px;
}
.custom-width-button {
  width: 20%;
  background-color: #ffc700;
  border-color: #ffc700;
  color: white;
  margin-left: 10px;
}

.custom-width-input-side {
  margin-left: 10px;
  border: 1px solid rgb(189, 185, 185);
  margin-right: 10px;
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

.top-btn {
  font-family: "GongGothicMedium";
  position: absolute; /* 절대 위치 지정 */
  top: 70px; /* 원하는 위치로 조정 */
  left: 380px; /* 원하는 위치로 조정 */
  z-index: 2;
  margin-left: 10px;
}

.d-flex {
  margin-top: 10px;
}

.card-info-custom {
  font-family: "GongGothicMedium";
  margin-left: 10px;
}

.card-info-title {
  margin-top: 10px;
  margin-bottom: 10px;
}
</style>
