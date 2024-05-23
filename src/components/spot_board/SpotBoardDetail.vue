<template>
    <div class="container-spotdetail">
      <div v-if="loading">로딩 중...</div>
      <div v-else>
        <div class="titleType1">
          <h2>{{ spotBoard.title }}</h2>
          <div class="area_address">
            <span>작성자 : {{ userName }}</span>
          </div>
        </div>
  
        <span class="num_view"
              ><em class="tit"
                ><span
                  class="mdi mdi-eye-outline"
                  style="font-size: 24px"
                ></span></em
              ><span class="num" id="conRead">{{ ' '+spotBoard.views }}</span></span
            >
        <div class="content_detail">
          <div class="detail_tab">
            <ul>
              <li class="select_tab on" id="photoTab">
                <a href="javascript:void(0);" @click="tabChange('galleryGo')" title="사진 보기 위치로 이동"><span>사진보기</span></a>
              </li>
              <li class="select_tab" id="detailTab">
                <a href="javascript:void(0);" @click="tabChange('detailGo')" title="상세정보 위치로 이동"><span>상세정보</span></a>
              </li>
              <li class="select_tab" id="spotTab">
                <a href="javascript:void(0);" @click="tabChange('spotGo')" title="여행지 정보 위치로 이동"><span>여행지정보</span></a>
              </li>
              <li class="select_tab" id="talkTab">
                <a href="javascript:void(0);" @click="tabChange('replyGo')" title="여행톡 위치로 이동"><span>댓글</span></a>
              </li>
            </ul>
          </div>

          <div id="galleryGo">
            <h3 class="blind">사진보기</h3>
            <div class="photo_gallery">                
              <!-- <img src="@/assets/images/noimg.png" aspect-ratio="1.5" class="card-image"></img> -->
              <img :src="getImageUrl(spotBoard.id, imgUrls)" aspect-ratio="1.5" class="card-image"></img>
              <!-- <img src="@/assets/images/spot_board/44.jpeg" aspect-ratio="1.5" class="card-image"></img> -->
              <!-- <v-img :src="imgUrl" aspect-ratio="1.5" class="card-image"></v-img> -->
              <!-- {{ imgUrl }} -->
            </div>            
          </div>
  
          <div id="detailGo">
            <h3 class="blind">CONTENT</h3>
            <br />
            <div class="description" style="text-align: left">
              {{ spotBoard.content }}
            </div>
            <br />
            <div class="moreInfo">
              <div class="addressInfo">
                <hr>
                조회수 : {{ spotBoard.views }}
              </div>
              <div class="hashtags">
                해시태그 : 
                <span v-for="(tag, index) in hashtags" :key="index" class="tag">{{ tag }}</span>
              </div>
            </div>
          </div>
  
          <div id="spotGo">
            <h3 class="blind">SPOT</h3>
            <br />
            <div class="description" style="text-align: left">
              <h4>{{ spot.name }}</h4>           
            </div>
            <!-- <br /> -->
            <div class="moreInfo">
              <div class="addressInfo">
                주소 : {{ spot.address }}<hr>
              </div>
              <KakaoMap
              :lat="spot.latitude"
              :lng="spot.longitude"
              :draggable="true"
              width="100%"
              height="20rem"
              >
              <KakaoMapMarker
                :lat="spot.latitude"
                :lng="spot.longitude"
              ></KakaoMapMarker>
              </KakaoMap>
            </div>
          </div>
  
          <div id="replyGo">
            <div class="replyWrap">
              <h3 class="tit_reply">
                댓글 <span>{{ comments.length }}</span>
              </h3>
              <div class="write" id="writeReview">
                <div class="form" style="display: flex; align-items: center">
                  <form @submit.prevent="submitComment" style="flex: 1">
                    <v-row align="center">
                      <v-col cols="10">
                        <v-textarea class="mx-2" id="commentContent" label="자유롭게 댓글을 남겨주세요." prepend-icon="mdi-comment" rows="1" v-model="commentContent" @click="checkLogin"></v-textarea>
                      </v-col>
                      <v-col cols="2">
                        <v-btn type="submit" color="yellow">댓글 작성</v-btn>
                      </v-col>
                    </v-row>
                  </form>
                </div>
  
                <div class="wrap_reply">
                  <div v-if="comments.length > 0">
                    <div v-for="(commentItem, index) in comments" :key="index" class="comment">
                      <div class="user_info">
                        <span class="mdi mdi-account-circle" style="font-size: 24px"></span>
                        <span class="username">{{ commentItem.userId }}</span>
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
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { useRoute } from "vue-router";
  import axios from "axios";
  import { useUserStore } from "@/stores/userStore.js";
  import { KakaoMap, KakaoMapMarker } from "vue3-kakao-maps";
  
  const route = useRoute();
  const userStore = useUserStore();
  const spotBoard = ref({});
  const spot = ref({});
  const imgUrls = ref([]);
//   const imgUrl = ref('');
  const userName = ref();
  const comments = ref([]);
  const hashtags = ref([]);
  const commentContent = ref("");
  const loading = ref(true);

  onMounted(async () => {
    try {
      const spotBoardId = route.params.id;
      const response = await axios.get(`http://localhost/api/board/spots/search/${spotBoardId}`);
      console.log('spotboard detail response : ',response.data.data);
      const data = response.data.data;
      spotBoard.value = data.spotBoard;         
      spot.value = data.spot;      
      imgUrls.value = data.imgUrls;
         
      userName.value = data.userName;         
    //   imgUrl.value = require(`@/assets/images/noimg.png`);
    //   if(data.imgUrls.length > 0) imgUrl.value = 'src/assets/images/spot_board/'+data.spotBoard.id+'.jpeg';

    //   console.log('image url :',imgUrl.value);
      comments.value = data.comments;
      hashtags.value = data.spotBoard.hashtags.split(",");
      loading.value = false;
    } catch (error) {
      console.error("API 요청 중 오류 발생:", error);
      loading.value = false;
    }
  });

  function getImageUrl(spotBoardId, imgUrs) {
    // console.log('image urls : ',imgUrls.value);
    if(imgUrls.value.length > 0){        
        const url = new URL(`/src/assets/images/spot_board/${spotBoardId}.jpeg`,  import.meta.url).href;
        // console.log('data.spotBoard.id: ',data.spotBoard.id);
        console.log('url: ',url);
        return url;
    }
    return new URL(`/src/assets/images/noimg.png`, import.meta.url).href;
  }
  
  const submitComment = async () => {
    if (!userStore.isAuthenticated) {
      alert("로그인 후 이용해주세요.");
      return;
    }
  
    try {
      const response = await axios.post(
        "http://localhost/api/spots/comments",
        {
          spotBoardId: spotBoard.value.id,
          userId: userStore.user,
          content: commentContent.value,
        },
        {
          headers: {
            Authorization: `${userStore.jwtToken.accessToken}`,
          },
        }
      );
  
      comments.value.push({
        userId: userStore.user,
        content: commentContent.value,
      });
  
      commentContent.value = "";
      alert("댓글이 작성되었습니다.");
    } catch (error) {
      console.error("댓글 작성 중 오류 발생:", error);
      alert("댓글 작성 중 오류가 발생했습니다.");
    }
  };

  const checkLogin = () => {
  if (!userStore.isAuthenticated) {
    alert("로그인 후 이용해주세요.");
  }};
  
  const tabChange = (destination) => {
    const element = document.getElementById(destination);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };
  
  const handleTagClick = (tag) => {
    console.log("Clicked hashtag:", tag);
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
  
  .titleType1 {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 20px 0;
  }
  
  .titleType1 h2 {
    font-size: 2.5rem;
    margin-bottom: 10px;
  }
  
  .area_address {
    font-size: 1rem;
    color: #666;
  }
  
  .content_detail {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
  .detail_tab {
    width: 100%;
    border-bottom: 1px solid #ccc;
    margin-bottom: 20px;
  }
  
  .detail_tab ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    justify-content: center;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  
  .detail_tab li:not(:last-child) {
    border-right: 1px solid #ccc;
    padding-right: 10px;
  }
  
  .detail_tab li {
    flex: 1;
    text-align: center;
  }
  
  .detail_tab a {
    display: inline-block;
    padding: 10px 20px;
    color: #777;
  }
  
  .detail_tab a:hover {
    color: #000;
  }
  
  #galleryGo, #detailGo, #replyGo, #spotGo {
    width: 100%;
    margin-bottom: 80px;
  }
  
  .photo_gallery {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
  }
  
  .spot.Image {
    width: 100%;
    height: auto;
    object-fit: contain;
  }
  
  .centered-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  
  .description {
    text-align: left;
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
  }
  
  .moreInfo {
    width: 100%;
    max-width: 800px;
    margin: 20px auto;
    font-size: 1rem;
    text-align: left;
  }
  
  .hashtags {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
  }
  
  .tag {
    margin-right: 10px;
    margin-bottom: 10px;
    background-color: #ffc700;
    padding: 5px 10px;
    border-radius: 5px;
    cursor: pointer;
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
  
  .replyWrap {
    width: 100%;
    max-width: 800px;
    margin: 0 auto;
  }
  
  .tit_reply {
    font-size: 1.5rem;
    margin-bottom: 20px;
  }
  
  .wrap_reply {
    width: 100%;
  }

  .photo_gallery {
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

.card-image {
  width: 70%;
   /* 높이를 조정할 수 있습니다. 원하는 크기로 변경하세요. */
  object-fit: cover; /* 이미지가 컨테이너에 맞게 조정됩니다. */
  border-radius: 10px; /* 이미지를 둥글게 만들려면 이 값을 조정하세요. */
}
  </style>
  