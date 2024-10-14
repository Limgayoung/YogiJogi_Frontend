<template>
    <div v-if="selectedCard">
      <h3>{{ selectedCard.title }}</h3>
      <p>{{ selectedCard.text }}</p>
      <p>Additional details here...</p>
    </div>
    <div v-else>
      <p>No card selected</p>
    </div>
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  
  export default defineComponent({
    name: 'DetailContent',
    props: {
      selectedCard: {
        type: Object,
        default: null
      }
    }
  });
  </script>
  