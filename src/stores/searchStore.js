import { defineStore } from "pinia";

export const useSearchStore = defineStore({
  id: "result",
  state: () => ({
    searchResults: null,
    drawLines: false, // drawLines 상태 추가
    // 다른 필요한 상태들도 추가할 수 있습니다.
  }),
  actions: {
    setSearchResults(results) {
      this.searchResults = results;
    },
    setDrawLines(value) {
      this.drawLines = value;
    },
    
    // 다른 필요한 액션들도 추가할 수 있습니다.
  },
});