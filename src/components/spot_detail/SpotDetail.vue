<template>
    <div class="container">
        <div class="titleType1"
            style="height: 200px; display: flex; flex-direction: column; justify-content: center; align-items: center;">

            <div style="margin-bottom: 20px;">
                <h2 id="topTitle" style="font-size: 50px;">{{ spot.name }}</h2>
                <div class="area_address" id="topAddr"><span>{{ spot.address }}</span></div>
            </div>

            <div style="display: flex; align-items: center; justify-content: space-between; width: 100%;">
                <div class="left_section">
                    <button type="button" class="btn_good" onclick="setLike();">
                        <span class="mdi mdi-heart-outline" style="font-size: 24px;"></span>
                        <span class="num" id="conLike">0</span>
                    </button>
                    <span class="num_view"><em class="tit"><span class="mdi mdi-eye-outline"
                                style="font-size: 24px;"></span></em><span class="num" id="conRead">904</span></span>
                </div>
                <div class="right_section">
                    <button type="button" class="btn_bookmark" onclick="setFavoContentDetail();">
                        <span class="mdi mdi-bookmark-outline" style="font-size: 24px;"></span>
                    </button>
                    <button type="button" class="btn_print" onclick="openPrint();" title="새창 열림">
                        <span class="mdi mdi-printer-outline" style="font-size: 24px;"></span>
                    </button>
                    <button type="button" class="btn_cos" onclick="myCourseCartDetail('C','12','');">
                        <span class="mdi mdi-map" style="font-size: 24px;"></span>
                    </button>
                    <button type="button" class="btn_sharing" onclick="openShare();">
                        <span class="mdi mdi-share-variant-outline" style="font-size: 24px;"></span>
                    </button>
                </div>
            </div>
        </div>
        <div class="content_detail">
            <div class="detail_tab">
                <ul>
                    <li class="select_tab on" id="photoTab"><a href="javascript:void(0);"
                            @click="tabChange('galleryGo');" title="사진 보기 위치로 이동"><span>사진보기</span></a></li>
                    <li class="select_tab" id="detailTab"><a href="javascript:void(0);" @click="tabChange('detailGo');"
                            title="상세정보 위치로 이동"><span>상세정보</span></a></li>
                    <li class="select_tab" id="talkTab"><a href="javascript:void(0);" @click="tabChange('replyGo');"
                            title="여행톡 위치로 이동"><span>댓글</span></a></li>
                    <!-- <li class="select_tab" id="recomTab"><a href="javascript:void(0);" @click="tabChange('relationGo');"
                        title="추천여행 위치로 이동"><span>추천여행</span></a></li> -->
                </ul>
                <div id="galleryGo">
                    <h3 class="blind">사진보기</h3>
                    <div class="photo_gallery" v-if="slides.length > 0">
                        <!-- 공사 사진 영역 -->
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
                        <!-- 슬라이드 로딩 중 표시할 내용 -->
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
                        <v-btn v-for="(tag, index) in spot.hashtags" :key="index" @click="handleTagClick(tag)"
                            class="tag">{{ tag }}</v-btn>
                    </div>
                </div>
                <div id="replyGo">
                    <div class="replyWrap">
                        <!-- login 추가시 로그인 후 form -->
                        <h3 class="tit_reply">
                            댓글<span>2</span>

                        </h3>
                        <div class="write" id="writeReview">
                            <div class="form">
                                <form name="tform" id="tform">
                                    <!-- <label class="blind" for="comment">자유롭게 댓글을 남겨주세요.</label> -->
                                    <v-textarea class="mx-2" id="comment" label="자유롭게 댓글을 남겨주세요."
                                        prepend-icon="mdi-comment" rows="1"></v-textarea>
                                    <div class="fileRegbtn_wrap">
                                        <a href="javascript:" class="btn_apply ContentComment">로그인</a>
                                    </div>
                                </form>
                            </div>
                            <div class="wrap_reply">
                                <!-- 댓글이 있을 때 -->
                                <div v-if="spot.comments && spot.comments.length > 0">
                                    <!-- 댓글을 줄줄이 표시 -->
                                    <div v-for="(comment, index) in spot.comments" :key="index" class="comment">
                                        <div class="user_info">
                                            <span class="mdi mdi-account-circle" style="font-size: 24px;"></span>
                                            <span class="username">{{ comment.user }}</span> <!-- 사용자 이름 -->
                                        </div>
                                        <p>{{ comment.content }}</p> <!-- 댓글 내용 -->
                                    </div>
                                </div>
                                <!-- 댓글이 없을 때 -->
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

<script>
import { KakaoMap, KakaoMapMarker } from 'vue3-kakao-maps';
import { ref } from "vue";

export default {
    components: {
        KakaoMap,
        KakaoMapMarker
    },
    data() {
        return {
            spot: {},
            colors: [],
            slides: []
        };
    },
    mounted() {
        // 여행지 정보를 가져오는 API 호출 또는 데이터베이스 쿼리를 실행합니다.
        // 이 예시에서는 임시로 하나의 여행지 정보를 설정합니다.
        this.spot = {
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
            image: "https://cdn.visitkorea.or.kr/img/call?cmd=VIEW&amp;id=cbeefd27-1f65-4a07-8f16-6705807bae9d", // 경복궁 이미지를 가져올 링크를 여기에 넣어주세요.
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
        this.colors = [
            'indigo',
            'warning',
            'pink darken-2',
            'red lighten-1',
            'deep-purple accent-4',
        ]

        this.slides = ['사진1', '사진2', '사진3', '사진4', '사진5']
    },
    methods: {
        tabChange(destination) {
            var element = document.getElementById(destination);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
            }
        },
        handleTagClick(tag) {
            // 해시태그 클릭 시 수행할 동작을 정의합니다.
            console.log("Clicked hashtag:", tag);
            // 원하는 동작을 수행합니다.
        }
    }
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
    /* padding 추가 */
    padding: 5px;
}

.detail_tab li:not(:last-child) {
    border-right: 1px solid #ccc;
    padding-right: 10px;
    /* 오른쪽 간격 조절 */
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
    /* 마우스 호버시 검정색으로 변경 */
    color: #000;
}

.hashtags {
    display: flex;
    flex-wrap: wrap;
}

.tag {
    margin-right: 10px;
    /* 원하는 간격 설정 */
    margin-bottom: 10px;
    /* 버튼 행 간격 설정 */
}

textarea {
    width: 100%;
    border: 1px solid #ccc;
    /* 회색 테두리 */
    padding: 8px;
    transition: border-color 0.3s;
    /* 테두리 색상 변화에 대한 transition 효과 */
}

textarea:focus {
    border-color: #000;
    /* 클릭 시 테두리 색상 변경 */
}

.comment {
    display: flex;
    align-items: center;
    /* 아이콘과 텍스트를 수직 정렬 */
    margin-bottom: 10px;
    /* 각 댓글 사이의 간격 조절 */
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
    /* 각 요소 사이의 오른쪽 여백 설정 */
}

h3 {
    text-align: left;
    font-size: 30px;
}

#galleryGo,
#detailGo,
#replyGo {
    margin-bottom: 80px;
    /* 각 섹션 사이의 간격 조절 */
}

.moreInfo {
    font-size: 15px;
    text-align: left;
}
</style>