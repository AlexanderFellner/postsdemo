import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import Vuex from "vuex";
import store from "./store";
import VueSimpleAlert from "vue-simple-alert";

Vue.config.productionTip = false;
Vue.use(Vuex);
Vue.use(VueSimpleAlert);
new Vue({
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
