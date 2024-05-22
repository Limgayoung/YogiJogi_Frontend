<template>
  <div class="container-spotdetail">
    <div v-if="loading">로딩 중...</div>
    <div v-else>
      <div
        class="titleType1"
        style="
          height: 200px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        "
      >
        <div style="margin-bottom: 20px; text-align: center">
          <h2 id="topTitle" style="font-size: 50px">{{ spot.spot.name }}</h2>
          <div class="area_address" id="topAddr" style="display: block">
            <span style="display: block; text-align: center">{{
              spot.spot.address
            }}</span>
          </div>
        </div>

        <div
          style="
            display: flex;
            align-items: center;
            justify-content: space-between;
            width: 100%;
          "
        >
          <div class="left_section">
            <!-- <button type="button" class="btn_good" @click="setLike">
              <span
                class="mdi mdi-heart-outline"
                style="font-size: 24px"
              ></span>
              <span class="num" id="conLike">0</span>
            </button> -->
            <span class="num_view"
              ><em class="tit"
                ><span
                  class="mdi mdi-eye-outline"
                  style="font-size: 24px"
                ></span></em
              ><span class="num" id="conRead">{{ spot.spot.views }}</span></span
            >
          </div>
          <div class="right_section">
            <!-- <button
              type="button"
              class="btn_bookmark"
              @click="setFavoContentDetail"
            >
              <span
                class="mdi mdi-bookmark-outline"
                style="font-size: 24px"
              ></span>
            </button> -->
            <button
              type="button"
              class="btn_print"
              @click="openPrint"
              title="새창 열림"
            >
              <span
                class="mdi mdi-printer-outline"
                style="font-size: 24px"
              ></span>
            </button>
            <button
              type="button"
              class="btn_cos"
              @click="myCourseCartDetail('C', '12', '')"
            >
              <span class="mdi mdi-map" style="font-size: 24px"></span>
            </button>
            <button type="button" class="btn_sharing" @click="openShare">
              <span
                class="mdi mdi-share-variant-outline"
                style="font-size: 24px"
              ></span>
            </button>
          </div>
        </div>
      </div>
      <div class="content_detail">
        <div class="detail_tab">
          <ul>
            <li class="select_tab on" id="photoTab">
              <a
                href="javascript:void(0);"
                @click="tabChange('galleryGo')"
                title="사진 보기 위치로 이동"
                ><span>사진보기</span></a
              >
            </li>
            <li class="select_tab" id="detailTab">
              <a
                href="javascript:void(0);"
                @click="tabChange('detailGo')"
                title="상세정보 위치로 이동"
                ><span>상세정보</span></a
              >
            </li>
            <li class="select_tab" id="talkTab">
              <a
                href="javascript:void(0);"
                @click="tabChange('replyGo')"
                title="여행톡 위치로 이동"
                ><span>댓글</span></a
              >
            </li>
          </ul>
          <div id="galleryGo">
            <h3 class="blind">사진보기</h3>
            <div
              class="photo_gallery"
              v-if="spot.images && spot.images.length > 0"
            >
              <v-carousel
                height="400px"
                width="100%"
                cycle
                hide-delimiter-background
              >
                <v-carousel-item
                  v-for="(image, index) in spot.images"
                  :key="index"
                >
                  <img
                    :src="image"
                    class="spot Image"
                    style="object-fit: contain; width: 100%; height: 100%"
                  />
                </v-carousel-item>
              </v-carousel>
            </div>
            <div v-else>
              <div class="centered-content">
                <img
                  src="@/assets/images/noimg.png"
                  class="card-img-top"
                  alt="No Image"
                  style="
                    width: 300px;
                    max-width: 100%;
                    height: auto;
                    max-height: 100%;
                    margin-left: auto;
                    margin-right: auto;
                    display: block;
                  "
                />
                <div>사진 준비중</div>
              </div>
            </div>
          </div>

          <div id="detailGo">
            <h3 class="blind">상세정보</h3>
            <br />
            <div class="description" style="text-align: left">
              {{ spot.detail }}
            </div>
            <br />
            <KakaoMap
              :lat="spot.spot.latitude"
              :lng="spot.spot.longitude"
              :draggable="true"
              width="100%"
              height="20rem"
            >
              <KakaoMapMarker
                :lat="spot.spot.latitude"
                :lng="spot.spot.longitude"
              ></KakaoMapMarker>
            </KakaoMap>
            <br />
            <div class="moreInfo">
              <div class="addressInfo">
                주소 :
                {{
                  spot.spot.address
                    ? spot.spot.address
                    : "등록된 정보가 없습니다"
                }}
              </div>
              <div class="askInfo">
                문의 및 안내 :
                {{
                  spot.spot.phone ? spot.spot.phone : "등록된 정보가 없습니다"
                }}
              </div>
              <div class="homepageInfo">
                홈페이지 :
                {{
                  spot.spot.homepage
                    ? spot.spot.homepage
                    : "등록된 정보가 없습니다"
                }}
              </div>
            </div>

            <h3 class="blind" style="margin-top: 80px">#tag</h3>
            <div class="hashtags">
              <v-btn
                v-for="(tag, index) in spot.hashtags"
                :key="index"
                @click="handleTagClick(tag)"
                class="tag"
                >{{ tag }}</v-btn
              >
            </div>
          </div>
          <div id="replyGo">
            <div class="replyWrap">
              <h3 class="tit_reply">
                댓글 <span>{{ comment.length }}</span>
              </h3>
              <div class="write" id="writeReview">
                <div class="form" style="display: flex; align-items: center">
                  <form @submit.prevent="submitComment" style="flex: 1">
                    <v-row align="center">
                      <v-col cols="10">
                        <v-textarea
                          class="mx-2"
                          id="commentContent"
                          label="자유롭게 댓글을 남겨주세요."
                          prepend-icon="mdi-comment"
                          rows="1"
                          v-model="commentContent"
                          @click="checkLogin"
                        ></v-textarea>
                      </v-col>
                      <v-col cols="2">
                        <v-btn type="submit" color="yellow"> 댓글 작성 </v-btn>
                      </v-col>
                    </v-row>
                  </form>
                </div>

                <div class="wrap_reply">
                  <div v-if="comment.length > 0">
                    <div
                      v-for="(commentItem, index) in comment"
                      :key="index"
                      class="comment"
                    >
                      <div class="user_info">
                        <span
                          class="mdi mdi-account-circle"
                          style="font-size: 24px"
                        ></span>
                        <span class="username">{{ commentItem.nickName }}</span>
                      </div>
                      <p>{{ commentItem.content }}</p>
                    </div>
                  </div>
                  <div v-else>
                    <p>등록된 댓글이 없습니다.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { KakaoMap, KakaoMapMarker } from "vue3-kakao-maps";
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import axios from "axios";
import { useUserStore } from "@/stores/userStore.js";

const route = useRoute();
const spotId = route.params.id;

const spot = ref({});
const loading = ref(true); // 로딩 상태 변수

const comment = ref([]);
const commentContent = ref("");
const sendCommentContent = ref("");
const userStore = useUserStore();

const colors = ref([
  "indigo",
  "warning",
  "pink darken-2",
  "red lighten-1",
  "deep-purple accent-4",
]);

onMounted(async () => {
  try {
    const response = await axios.get(
      `http://localhost/api/spots/search/${spotId}`
    );
    console.log("res : ", response.data.data);
    spot.value = response.data.data;
    const responseComment = await axios.get(
      `http://localhost/api/spots/comments/search/${spotId}`
    );
    comment.value = responseComment.data.data;
    console.log(comment.value);
    loading.value = false;
  } catch (error) {
    console.error("API 요청 중 오류 발생:", error);
  }
});

const tabChange = (destination) => {
  const element = document.getElementById(destination);
  if (element) {
    element.scrollIntoView({ behavior: "smooth" });
  }
};

const handleTagClick = (tag) => {
  console.log("Clicked hashtag:", tag);
};

const submitComment = async () => {
  try {
    // 로그인 상태 확인
    if (!userStore.isAuthenticated) {
      alert("로그인 후 이용해주세요.");
      return;
    }

    const spotId = spot.value.spot.id; // Spot 정보에서 spotId 추출
    const userId = userStore.user; // 사용자 정보에서 userId 추출
    const commentData = {
      spotId: spotId,
      userId: userId,
      content: commentContent.value,
    };

    console.log(commentData);
    const response = await axios.post(
      "http://localhost/api/spots/comments",
      commentData,
      {
        headers: {
          Authorization: `${userStore.jwtToken.accessToken}`,
        },
      }
    );
    console.log("댓글 작성 응답:", response.data);
    alert("댓글이 작성되었습니다.");
    // 새로운 댓글을 화면에 추가
    await userStore.fetchUserInfo();
    comment.value.push({
      nickName: userStore.userInfo.nickName, // 사용자 닉네임
      content: commentContent.value, // 댓글 내용
    });
    // 댓글 작성 후 입력 필드 비우기
    commentContent.value = "";
  } catch (error) {
    console.error("댓글 작성 오류:", error);
    alert("댓글 작성 중 오류가 발생했습니다.");
  }
};

const checkLogin = () => {
  if (!userStore.isAuthenticated) {
    alert("로그인 후 이용해주세요.");
  }
};

const setLike = () => {
  // 좋아요 기능을 구현하세요.
};

const setFavoContentDetail = () => {
  // 즐겨찾기 컨텐츠 세부 정보를 설정하세요.
};

const openPrint = () => {
  // 인쇄 기능을 구현하세요.
};

const myCourseCartDetail = (type, id, additional) => {
  // 내 코스 카트 세부 정보를 설정하세요.
};

const openShare = () => {
  // 공유 기능을 구현하세요.
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

.container-spotdetail {
  width: 70%;
  margin: 0 auto;
  font-family: "GongGothicMedium";
}

.detail_tab ul {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: space-between;
  border: 1px solid #ccc;
  border-radius: 5px;
  padding: 5px;
}

.detail_tab li:not(:last-child) {
  border-right: 1px solid #ccc;
  padding-right: 10px;
}

.detail_tab li {
  flex: 1;
  text-align: center;
  text-decoration: none;
}

.detail_tab a {
  display: inline-block;
  padding: 10px 20px;
  color: #777;
}

.detail_tab a:hover {
  color: #000;
}

.hashtags {
  display: flex;
  flex-wrap: wrap;
}

.tag {
  margin-right: 10px;
  margin-bottom: 10px;
}

textarea {
  width: 100%;
  border: 1px solid #ccc;
  padding: 8px;
  transition: border-color 0.3s;
}

textarea:focus {
  border-color: #000;
}

.comment {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.user_info {
  display: flex;
  align-items: center;
  margin-right: 30px;
}

.username {
  margin-right: 5px;
  margin-left: 10px;
}

.right_section {
  display: flex;
  justify-content: space-between;
}

.right_section button {
  margin-right: 10px;
}

.left_section {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.left_section span,
.left_section button {
  margin-right: 10px;
}

h3 {
  text-align: left;
  font-size: 30px;
}

#galleryGo,
#detailGo,
#replyGo {
  margin-bottom: 80px;
}

.moreInfo {
  font-size: 15px;
  text-align: left;
}

.centered-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
