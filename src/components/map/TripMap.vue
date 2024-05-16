<script setup>
import { ref } from 'vue';
import { KakaoMap, KakaoMapMarkerPolyline, KakaoMapMarker, KakaoMapCustomOverlay } from 'vue3-kakao-maps';
/**
 * 해당 장소에 대한 세부 내용 Server로부터 받는다.
 * 받은 정보를 토대로 마커 띄우고 인포윈도우 띄운다.
 * 사이드바의 추가 버튼으로 여행 계획에 해당 장소를 추가할 수 있다.
 */
const image = {
    imageSrc: 'src/assets/images/marker/15.png',
    imageWidth: 30,
    imageHeight: 40
};

const newImage = {
    imageSrc: 'src/assets/images/marker/12.png',
    imageWidth: 30,
    imageHeight: 40
}

const markerList = ref([
    { lat: 33.4509, lng: 126.571, image, order: '출발' },
    { lat: 33.451, lng: 126.572, image },
    { lat: 33.452, lng: 126.573, image },
    { lat: 33.4518, lng: 126.5725, image }
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


<template>
    <KakaoMap width="100%" height="50rem" :lat="33.452" :lng="126.573">
        <KakaoMapMarkerPolyline :markerList="markerList" :showMarkerOrder="true" strokeColor="#C74C5E"
            :strokeOpacity="1" strokeStyle="shortdot" />

        <KakaoMapMarker :lat="33.450705" :lng="126.570667" :image="newImage" @onClickKakaoMapMarker="onClickKakaoMapMarker" :clickable="true"
         />         
    </KakaoMap>

    <div>
        <button class="demo-button" @click="addMarker">마커 추가하기</button>
        <button class="demo-button" @click="deleteMarker">마커 삭제하기</button>
    </div>
</template>
