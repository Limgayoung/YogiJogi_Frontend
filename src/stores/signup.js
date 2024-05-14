import { ref, computed, inject } from 'vue'
import { defineStore } from 'pinia'

export const useSignUpStore = defineStore('signup', () => {
  const axios = inject('$axios');

  const submitForm  = async (data) => {
    try{
      const response = await axios.post('/data', data);
    } catch(err) {
      console.log(err);
    }
  }

  return { submitForm }
})