import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./router/router";
import store from "./store/";
import { routerMode } from "./config/env";

import { switchLogin, toThousands } from "./common/utils";
Vue.prototype.$switchLogin = switchLogin;
Vue.prototype.$toThousands = toThousands;

import { loadDemand, commonObject } from "./common/initialization";

import "babel-polyfill";
import "video.js/dist/video-js.css";

import "element-ui/lib/theme-chalk/index.css";

import JsEncrypt from "./common/jsencrypt";
// import echarts from "./common/echart/echarts.common.min"
//RSA encrypt
Vue.prototype.$jsEncrypt = JsEncrypt;
//RSA encrypt
// Vue.prototype.$echarts = echarts;

loadDemand(Vue);
commonObject();

import "./style/hover/index";
import "./style/animate/index";

Vue.use(VueRouter);
const router = new VueRouter({
  routes,
  mode: routerMode,
  strict: process.env.NODE_ENV !== "production",
  scrollBehavior(to, from, savedPosition) {
    // console.log("scrollBehavior");
    window.scrollTo(0, 0);
  },
  afterEach() {
    // console.log("afterEach");
    // window.scrollTo(0, 0);
  }
});

new Vue({
  router,
  store
}).$mount("#app");
