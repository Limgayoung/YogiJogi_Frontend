<script setup>
import { KakaoMap, KakaoMapMarker } from 'vue3-kakao-maps';
const coordinate = {
    lat: 37.566826,
    lng: 126.9786567
};

const imgUrl = 'https://private-user-images.githubusercontent.com/57399274/331038962-aea3ed1e-3495-40b5-9be9-d0440183ccb9.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MTU4MzAzNTMsIm5iZiI6MTcxNTgzMDA1MywicGF0aCI6Ii81NzM5OTI3NC8zMzEwMzg5NjItYWVhM2VkMWUtMzQ5NS00MGI1LTliZTktZDA0NDAxODNjY2I5LnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDA1MTYlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwNTE2VDAzMjczM1omWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPWY3MWYyNWU3YzEwM2I1MmM1NGRiODRlNTVkMzIxZmVlZjRiYjg4ZGM1ZGQ2YTA5M2Q2YWIzNjdjMjVjMWMxZWMmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.4ShAh4cciTbBctp0kJS0A4D9CUpjwb_FIcB_T3nAehI'

const markerImage = {
    // imageSrc: imgUrl,
    imageSrc: 'https://private-user-images.githubusercontent.com/57399274/331038964-67a0f10e-4667-4211-9f59-cd47ea5f57b0.png?jwt=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJnaXRodWIuY29tIiwiYXVkIjoicmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbSIsImtleSI6ImtleTUiLCJleHAiOjE3MTU4MzAzNTMsIm5iZiI6MTcxNTgzMDA1MywicGF0aCI6Ii81NzM5OTI3NC8zMzEwMzg5NjQtNjdhMGYxMGUtNDY2Ny00MjExLTlmNTktY2Q0N2VhNWY1N2IwLnBuZz9YLUFtei1BbGdvcml0aG09QVdTNC1ITUFDLVNIQTI1NiZYLUFtei1DcmVkZW50aWFsPUFLSUFWQ09EWUxTQTUzUFFLNFpBJTJGMjAyNDA1MTYlMkZ1cy1lYXN0LTElMkZzMyUyRmF3czRfcmVxdWVzdCZYLUFtei1EYXRlPTIwMjQwNTE2VDAzMjczM1omWC1BbXotRXhwaXJlcz0zMDAmWC1BbXotU2lnbmF0dXJlPTE0ZGVlMGJmYTY2YWZmYTQzZjAzNDE1ODA2Yzg3YjVkNGQxOTNhY2M0M2UzODhiYWZiMDFhYzM4ZWU5ZDI0NzgmWC1BbXotU2lnbmVkSGVhZGVycz1ob3N0JmFjdG9yX2lkPTAma2V5X2lkPTAmcmVwb19pZD0wIn0.3-2d4DAAys947qSWDOaDqs4X1pn2HApgsLOQkvf4pVg',
    
    imageWidth: 20,
    imageHeight: 30,
    imageOption: {}
}

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