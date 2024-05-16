<script setup>
import { RouterView } from "vue-router";
</script>

<template>

    <h1>메인</h1>
    <!-- carousel -->
    <v-carousel height="400" width="100%" cycle hide-delimiter-background>
        <v-carousel-item v-for="(slide, i) in slides" :key="i">
            <v-sheet :color="colors[i]" height="100%">
                <div class="d-flex fill-height justify-center align-center">
                    <div class="spotname">{{ slide }}</div>
                </div>
            </v-sheet>
        </v-carousel-item>
        <button class="detail-button" @click="viewDetails(slides.length - 1)">자세히 보기</button>
    </v-carousel>
    <router-link to="/user">유저 페이지로 이동</router-link>

    <!-- 지역 선택지 -->
    <v-item-group mandatory>
        <v-container class="centered">
            <v-row>
                <v-col cols="12">
                    <v-row>
                        <v-col v-for="(area, index) in sido" :key="index">
                            <v-item v-slot="{ isSelected, toggle }">
                                <v-card :color="isSelected ? '#FFC700' : '#f0f0f0'" class="d-flex align-center"
                                    height="40" width="55" dark @click="toggle">
                                    <v-scroll-y-transition>
                                        <div class="local flex-grow-1 text-center font-size">{{ area }}</div>
                                    </v-scroll-y-transition>
                                </v-card>
                            </v-item>
                        </v-col>
                    </v-row>
                </v-col>
            </v-row>
        </v-container>
    </v-item-group>

    <body>
        <!-- 여행 카드 -->

        <v-row class="centered">
            <v-col cols="12" >
                <h3 class="custom-heading">인기 여행 코스</h3><br>
            </v-col>
            <v-col v-for="(card, index) in cards" :key="index" cols="12" sm="6" md="4" lg="3" class="my-col">
                <v-hover v-slot="{ isHovering, props }">
                    
                    <v-card class="mx-auto card-wrapper" max-width="300" max-height="320" v-bind="props">
                        <v-img :src="card.imageUrl" aspect-ratio="1.3"></v-img>

                        <v-card-text>
                            <h2 class="cardSpotName ">{{ card.name }}</h2>
                            <p class="cardSpotDes">{{ card.description }}</p>
                        </v-card-text>

                        <v-card-title>
                            <span class="text-primary text-subtitle-2">64 Reviews</span>
                        </v-card-title>

                        <v-overlay :model-value="isHovering" class="align-center justify-center" scrim="#ccc" contained>
                            <v-btn class="moreInfo" variant="flat">상세 정보 보러가기</v-btn>
                        </v-overlay>
                    </v-card>
                </v-hover>
            </v-col>

            <v-col cols="12">
                <h3 class="custom-heading">인기 여행지</h3><br>
            </v-col>
            <v-col v-for="(card, index) in cards" :key="index" cols="12" sm="6" md="4" lg="3" class="my-col">
                <v-hover v-slot="{ isHovering, props }">
                    <v-card class="mx-auto card-wrapper"max-width="300" max-height="320" v-bind="props">
                        <v-img :src="card.imageUrl" aspect-ratio="1.3"></v-img>

                        <v-card-text>
                            <h2 class="cardSpotName ">{{ card.name }}</h2>
                            <p class="cardSpotDes">{{ card.description }}</p>
                        </v-card-text>

                        <v-card-title>
                            <span class="text-primary text-subtitle-2">64 Reviews</span>
                        </v-card-title>

                        <v-overlay :model-value="isHovering" class="align-center justify-center" scrim="#ccc" contained>
                            <v-btn class="moreInfo" variant="flat">상세 정보 보러가기</v-btn>
                        </v-overlay>
                    </v-card>
                </v-hover>
            </v-col>

            <v-col cols="12">
                <h3 class="custom-heading">인기글</h3><br>
            </v-col>
            <v-col v-for="(card, index) in cards" :key="index" cols="12" sm="6" md="4" lg="3" class="my-col">
                <v-hover v-slot="{ isHovering, props }">
                    <v-card class="mx-auto card-wrapper" max-width="300" max-height="320" v-bind="props">
                        <v-img :src="card.imageUrl" aspect-ratio="1.3"></v-img>

                        <v-card-text>
                            <h2 class="cardSpotName ">{{ card.name }}</h2>
                            <p class="cardSpotDes">{{ card.description }}</p>
                        </v-card-text>

                        <v-card-title>
                            <span class="text-primary text-subtitle-2">64 Reviews</span>
                        </v-card-title>

                        <v-overlay :model-value="isHovering" class="align-center justify-center" scrim="#ccc" contained>
                            <v-btn class="moreInfo" variant="flat">상세 정보 보러가기</v-btn>
                        </v-overlay>
                    </v-card>
                </v-hover>
            </v-col>
        </v-row>

    </body>

</template>


<script>
import { ref } from "vue";

const colors = ref([
    'indigo',
    'warning',
    'pink darken-2',
    'red lighten-1',
    'deep-purple accent-4',
]);

const slides = ref(['여행지이름1', '여행지이름2', '여행지이름3', '여행지이름4', '여행지이름5']);
const sido = ref(['전국', '서울', '인천', '경기', '강원', '대전', '부산', '대구', '광주', '제주', '전라', '제주']);
const cards = ref([
    {
        imageUrl: 'https://cdn.vuetifyjs.com/images/cards/forest-art.jpg',
        name: '물의 정원',
        description: '경기도 남양주시 조안면 북한강로 398'
    },
    {
        imageUrl: 'https://cdn.vuetifyjs.com/images/cards/forest-art.jpg',
        name: '문래창작촌',
        description: '서울특별시 영등포구 문래동3가 54-37'
    },
    {
        imageUrl: 'https://cdn.vuetifyjs.com/images/cards/forest-art.jpg',
        name: '경복궁',
        description: '서울특별시 종로구 사직로 161'
    },
    {
        imageUrl: 'https://cdn.vuetifyjs.com/images/cards/forest-art.jpg',
        name: '섭지코지',
        description: '제주특별자치도 서귀포시 성산읍 섭지코지로'
    }
]);

const viewDetails = (index) => {
    console.log('Details for slide:', index + 1);
};
</script>



<style>
@font-face {
    font-family: "GongGothicMedium";
    src: url("https://fastly.jsdelivr.net/gh/projectnoonnu/noonfonts_20-10@1.0/GongGothicMedium.woff") format("woff");
    font-weight: normal;
    font-style: normal;
}

/* carousel 안 텍스트 */
.spotname { 
    font-family: "GongGothicMedium";
    font-size: 60px;
}

/* carousel 안 자세히 보기 버튼 */
.detail-button {
    font-family: "GongGothicMedium";
    position: absolute;
    bottom: 40px;
    right: 40px;
    padding: 15px 30px;
    background-color: #FFC700;
    color: #fff;
    border: none;
    border-radius: 25px;
    cursor: pointer;
    font-size: 18px;
    transition: background-color 0.3s;
}

/* 자세히 보기 버튼 마우스 오버 */
.detail-button:hover {
    font-family: "GongGothicMedium";
    background-color: #006769;
}

/* 지역 태그 텍스트 */
.local {
    font-family: "GongGothicMedium";
    font-size: 18px;
}

/* 카드 안 여행지 이름 */
.cardSpotName {
    font-family: "GongGothicMedium";
    font-size: 15px;
    color: #ffb108;
    /* margin: 10px 0; */
}

.cardSpotDes {
    font-family: "GongGothicMedium";
    font-size: 13px;
    /* margin: 10px 0; */
}

/* 새로운 클래스 card-wrapper에 테두리와 동그란 모서리 스타일 추가 */
.card-wrapper {
    max-width: 200px;
    /* border: 3px solid rgb(215, 214, 211);  */
    border-radius: 15px;
    /* 테두리의 둥근 정도를 조절합니다. */
    overflow: hidden;
    /* 내용이 카드를 벗어나지 않도록 합니다. */
}

.card-wrapper:hover {
    border-color: #007BFF;
    transform: scale(1.05);
}

.moreInfo {
    font-family: "GongGothicMedium";
    font-size: 40px;
    min-width: 200px;
    min-height: 50px;
}

.centered {
    display: flex;
    justify-content: center;
    align-items: center;
}

.custom-heading {
    font-family: "GongGothicMedium";
    margin-left: 80px;
    margin-top: 20px;
    margin-bottom: -20px;
}
</style>
