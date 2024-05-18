<template>
    <div>
      <b-card
        v-for="card in cards"
        :key="card.title"
        class="my-2"
        @click="openCardDetail(card)"
      >
        <b-card-title>{{ card.title }}</b-card-title>
        <b-card-text>{{ card.text }}</b-card-text>
      </b-card>
    </div>
  </template>
  
  <script>
  import { defineComponent } from 'vue';
  import { BCard, BCardTitle, BCardText } from 'bootstrap-vue-3';
  
  export default defineComponent({
    name: 'SidebarContent',
    components: {
      BCard,
      BCardTitle,
      BCardText
    },
    props: {
      selectedButton: {
        type: String,
        default: ''
      }
    },
    data() {
      return {
        cards: [
          { title: 'Card 1', text: 'This is card 1' },
          { title: 'Card 2', text: 'This is card 2' }
        ]
      };
    },
    methods: {
      openCardDetail(card) {
        this.$emit('open-detail', card);
      }
    }
  });
  </script>
  