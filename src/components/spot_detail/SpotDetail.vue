<template>
    <div class="container">
      <div class="titleType1" style="height: 200px; display: flex; flex-direction: column; justify-content: center; align-items: center;">
        <div style="margin-bottom: 20px;">
          <h2 id="topTitle" style="font-size: 50px;">{{ spot.name }}</h2>
          <div class="area_address" id="topAddr"><span>{{ spot.address }}</span></div>
        </div>
  
        <div style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
          <div class="left_section">
            <button type="button" class="btn_good" @click="setLike">
              <span class="mdi mdi-heart-outline" style="font-size: 24px;"></span>
              <span class="num" id="conLike">0</span>
            </button>
            <span class="num_view"><em class="tit"><span class="mdi mdi-eye-outline" style="font-size: 24px;"></span></em><span class="num" id="conRead">904</span></span>
          </div>
          <div class="right_section">
            <button type="button" class="btn_bookmark" @click="setFavoContentDetail">
              <span class="mdi mdi-bookmark-outline" style="font-size: 24px;"></span>
            </button>
            <button type="button" class="btn_print" @click="openPrint" title="새창 열림">
              <span class="mdi mdi-printer-outline" style="font-size: 24px;"></span>
            </button>
            <button type="button" class="btn_cos" @click="myCourseCartDetail('C','12','')">
              <span class="mdi mdi-map" style="font-size: 24px;"></span>
            </button>
            <button type="button" class="btn_sharing" @click="openShare">
              <span class="mdi mdi-share-variant-outline" style="font-size: 24px;"></span>
            </button>
          </div>
        </div>
      </div>
      <div class="content_detail">
        <div class="detail_tab">
          <ul>
            <li class="select_tab on" id="photoTab"><a href="javascript:void(0);" @click="tabChange('galleryGo')" title="사진 보기 위치로 이동"><span>사진보기</span></a></li>
            <li class="select_tab" id="detailTab"><a href="javascript:void(0);" @click="tabChange('detailGo')" title="상세정보 위치로 이동"><span>상세정보</span></a></li>
            <li class="select_tab" id="talkTab"><a href="javascript:void(0);" @click="tabChange('replyGo')" title="여행톡 위치로 이동"><span>댓글</span></a></li>
          </ul>
          <div id="galleryGo">
            <h3 class="blind">사진보기</h3>
            <div class="photo_gallery" v-if="slides.length > 0">
              <v-carousel height="400" width="100%" cycle hide-delimiter-background>
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
              <p>Loading...</p>
            </div>
          </div>
  
          <div id="detailGo">
            <h3 class="blind">상세정보</h3>
            <br>
            <div class="description" style="text-align: left;">
              {{ spot.detail }}
            </div>
            <br>
            <KakaoMap :lat="spot.latitude" :lng="spot.hardness" :draggable="true" width="100%" height="20rem">
              <KakaoMapMarker :lat="spot.latitude" :lng="spot.hardness"></KakaoMapMarker>
            </KakaoMap>
            <br>
            <div class="moreInfo">
              <div class="askInfo">문의 및 안내 : {{ spot.phone }}</div>
              <div class="homepageInfo">홈페이지 : {{ spot.homepage }}</div>
              <div class="addressInfo">주소 : {{ spot.address }}</div>
            </div>
  
            <h3 class="blind" style="margin-top: 80px;">#tag</h3>
            <div class="hashtags">
              <v-btn v-for="(tag, index) in spot.hashtags" :key="index" @click="handleTagClick(tag)" class="tag">{{ tag }}</v-btn>
            </div>
          </div>
          <div id="replyGo">
            <div class="replyWrap">
              <h3 class="tit_reply">
                댓글<span>2</span>
              </h3>
              <div class="write" id="writeReview">
                <div class="form">
                  <form name="tform" id="tform">
                    <v-textarea class="mx-2" id="comment" label="자유롭게 댓글을 남겨주세요." prepend-icon="mdi-comment" rows="1"></v-textarea>
                    <div class="fileRegbtn_wrap">
                      <a href="javascript:" class="btn_apply ContentComment">로그인</a>
                    </div>
                  </form>
                </div>
                <div class="wrap_reply">
                  <div v-if="spot.comments && spot.comments.length > 0">
                    <div v-for="(comment, index) in spot.comments" :key="index" class="comment">
                      <div class="user_info">
                        <span class="mdi mdi-account-circle" style="font-size: 24px;"></span>
                        <span class="username">{{ comment.user }}</span>
                      </div>
                      <p>{{ comment.content }}</p>
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
  import { KakaoMap, KakaoMapMarker } from 'vue3-kakao-maps';
  import { ref, onMounted } from 'vue';
  
  const spot = ref({});
  const colors = ref([]);
  const slides = ref([]);
  
  onMounted(() => {
    spot.value = {
      id: 1,
      name: "경복궁",
      detail: "경복궁은 조선 시대 궁궐 중의 하나로, 한반도에 남아있는 궁중 최대의 건물군이다. 경복궁(景福宮, 영어: Gyeongbokgung Palace)은 서울특별시 종로구 사직로에 위치한 조선 왕조의 법궁(法宮, 정궁)이다. 1395년 창건되어 1592년 임진왜란으로 전소되었고, 1868년 흥선대원군의 주도로 중건되었다.",
      latitude: 37.5796181,
      hardness: 126.977041,
      sido_code: 11,
      gugun_code: 110,
      address: "서울특별시 종로구 사직로 161",
      homepage: "http://www.royalpalace.go.kr/",
      phone: "02-3700-3900",
      created_at: "2024-05-16 10:00:00",
      updated_at: "2024-05-16 15:00:00",
      views: 10000,
      image: "https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&amp;id=cbeefd27-1f65-4a07-8f16-6705807bae9d",
      hashtags: ["#궁궐", "#역사", "#서울"],
      comments: [
        {
          user: "사용자1",
          content: "이곳은 정말 아름다운 곳입니다."
        },
        {
          user: "사용자2",
          content: "역사를 느낄 수 있는 곳이에요."
        }
      ]
    };
    colors.value = [
      'indigo',
      'warning',
      'pink darken-2',
      'red lighten-1',
      'deep-purple accent-4'
    ];
    slides.value = ['사진1', '사진2', '사진3', '사진4', '사진5'];
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
    src: url("https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_20-10@1.0/GongGothicMedium.woff") format("woff");
    font-weight: normal;
    font-style: normal;
  }
  
  .container {
    width: 80%;
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
  </style>