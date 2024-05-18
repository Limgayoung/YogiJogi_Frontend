

const app = createApp(App);


app.provide('$axios', axios);
// app.use(BootstrapVue3);
useKakao('24552d4b51f7bb99fa0203e1a2e75d09', ['clusterer', 'services', 'drawing']); // 각 라이브러리는 ',(콤마)'로 구분합니다.
app.mount('#app');
