// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import Vuex from "vuex";

import router from "./router/router";
import store from "./store/store";

Vue.config.productionTip = false;

Vue.use(Vuex);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  render: h => h(App)
}).$mount("#app");
