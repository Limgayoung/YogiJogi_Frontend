<template>
    <div class="container-create-spotboard">
      <div class="titleType1">
        <h2>게시글 작성</h2>
      </div>
      <v-form @submit.prevent="submitForm">
        <v-row>
          <v-col cols="12" sm="6">
            <v-text-field
              v-model="form.title"
              label="제목"
              required
            ></v-text-field>
          </v-col>
          
          <v-col cols="12">
            <v-textarea
              v-model="form.content"
              label="내용"
              rows="10"
              required
            ></v-textarea>
          </v-col>
          <v-col cols="12">
            <v-text-field
              v-model="hashtagInput"
              label="해시태그"
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-file-input
              v-model="imageFiles"
              label="이미지 업로드"
              multiple
              show-size
              @change="uploadImages"
            ></v-file-input>
            <div class="uploaded-images">
              <v-img
                v-for="(img, index) in form.imgUrls"
                :key="index"
                :src="img"
                class="uploaded-image"
              ></v-img>
            </div>
          </v-col>
          <v-col cols="12">
            <v-btn type="submit" color="yellow">게시글 작성</v-btn>
          </v-col>
        </v-row>
      </v-form>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from "vue";
  import { useRouter } from "vue-router";
  import axios from "axios";
  import { useUserStore } from "@/stores/userStore.js";
  
  const router = useRouter();
  const userStore = useUserStore();
  
  const form = ref({
    userId: userStore.user,
    spotId: null,
    title: "",
    content: "",
    hashtags: [],
    imgUrls: [],
  });
  
  const spots = ref([]);
  const hashtagInput = ref("");
  const imageFiles = ref([]);
  
  
  const addHashtag = () => {
  if (hashtagInput.value) {
    // Split input string by whitespace
    const words = hashtagInput.value.split(" ");
    
    // Extract the first character of each word and convert to lowercase
    const hashtags = words.map(word => {
      // Ensure the word is not empty
      if (word.trim() !== "") {
        return word.trim().charAt(0).toLowerCase();
      }
    });
    
    // Filter out any undefined values
    const validHashtags = hashtags.filter(tag => tag !== undefined);
    
    // Add valid hashtags to the form
    validHashtags.forEach(tag => {
      if (!form.value.hashtags.includes(tag)) {
        form.value.hashtags.push(tag);
      }
    });
    console.log(hashtags.value);
    
    // Clear input field
  }
};
  
  const removeHashtag = (index) => {
    form.value.hashtags.splice(index, 1);
  };
  
  const uploadImages = async () => {
    try {
      const formData = new FormData();
      imageFiles.value.forEach((file) => {
        formData.append("images", file);
      });
  
      const response = await axios.post("http://localhost/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      form.value.imgUrls = response.data.data;
    } catch (error) {
      console.error("이미지 업로드 중 오류 발생:", error);
    }
  };
  
  const submitForm = async () => {
  try {
    // 게시글 작성 전 해시태그를 처리
    addHashtag();
    
    // 나머지 코드는 그대로 유지됩니다.
    
    const response = await axios.post(
      "http://localhost/api/spotboards",
      form.value,
      {
        headers: {
          Authorization: `${userStore.jwtToken.accessToken}`,
        },
      }
    );

    alert("게시글이 작성되었습니다.");
    router.push({ name: "spotBoard" });
  } catch (error) {
    console.error("게시글 작성 중 오류 발생:", error);
    alert("게시글 작성 중 오류가 발생했습니다.");
  }
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
  
  .container-create-spotboard {
    width: 70%;
    margin: 0 auto;
    font-family: "GongGothicMedium";
  }
  
  .hashtags {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
  }
  
  .uploaded-images {
    display: flex;
    flex-wrap: wrap;
    margin-top: 10px;
  }
  
  .uploaded-image {
    width: 100px;
    height: 100px;
    object-fit: cover;
    margin-right: 10px;
    margin-bottom: 10px;
  }
  </style>
  