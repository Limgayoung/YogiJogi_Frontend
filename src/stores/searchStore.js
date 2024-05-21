// store.js

import { defineStore } from "pinia";

export const useSearchStore = defineStore({
  id: "result",
  state: () => ({
    searchResults: null,
    // 다른 필요한 상태들도 추가할 수 있습니다.
  }),
  actions: {
    setSearchResults(results) {
      this.searchResults = results;
    //   console.log("res: " + results);
    //   console.log("searchResults: " + JSON.stringify(this.searchResults));
    },
    // 다른 필요한 액션들도 추가할 수 있습니다.
  },
});
