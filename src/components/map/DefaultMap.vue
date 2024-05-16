<script setup>
import { KakaoMap, KakaoMapMarker } from 'vue3-kakao-maps';
const coordinate = {
    lat: 37.566826,
    lng: 126.9786567
};

// 이미지 URL 생성 함수
const getImageUrl = (type) => {
    return `src/assets/images/marker/${type}.png`;
};

const coordinates = [
    {
        key: 1,
        type: 12,
        lat: 37.566826,
        lng: 126.9786567,
        imageUrl: getImageUrl(12)
    },
    {
        key: 2,
        type: 14,
        lat: 37.566826,
        lng: 126.9886568,
        imageUrl: getImageUrl(14)
    },
    {
        key: 3,
        type: 15,
        lat: 37.566826,
        lng: 126.9686569,
        imageUrl: getImageUrl(15)
    },
    {
        key: 4,
        type: 28,
        lat: 37.566826,
        lng: 126.9756565,
        imageUrl: getImageUrl(28)
    }
];

//각 markers에 image 넣기
const markers = coordinates.map(coord => {
    return {
        ...coord,
        image: {
            imageSrc: coord.imageUrl,
            imageWidth: 20,
            imageHeight: 30,
            imageOption: {}
        }
    };
});

console.log(coordinates);
console.log('./images/marker/' + coordinates[0].type + '.png');
</script>

<template>
        <KakaoMap width="100%" height="30rem" :lat="coordinate.lat" :lng="coordinate.lng"
            :draggable="true">

            <KakaoMapMarker v-for="(marker, index) in markers" :key="marker.key === undefined ? index : marker.key"
                :lat="marker.lat" :lng="marker.lng" :image="marker.image" />            
        </KakaoMap>        
</template>

<style scoped></style>