import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
// css reset
import "./style/cssreset.css";
import "./style/public.less";
// 字体图标库
import "./iconfont/iconfont.css";
import "./iconfont/font/iconfont.css";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
// element ui样式重置
import "./style/elreset.less";
Vue.use(ElementUI);

import VueI18n from "vue-i18n/dist/vue-i18n.esm.js";
Vue.use(VueI18n); // 通过插件的形式挂载
const i18n = new VueI18n({
  locale: store.state.lang, // 语言标识
  // this.$i18n.locale // 通过切换locale的值来实现语言切换
  messages: {
    "zh": require("./lang/zh"), // 中文语言包
    "en": require("./lang/en"), // 英文语言包
  },
});

import VueClipboard from 'vue-clipboard2' 
// Vue.component("downloadExcel", JsonExcel);
Vue.use(VueClipboard);

// 添加权限
import addPermisson from '@/router/addPermisson';
addPermisson(); 

import mixin from './mixin';
Vue.mixin(mixin);

Vue.config.productionTip = false;

new Vue({
  i18n,
  store,
  router,
  render: (h) => h(App),
}).$mount("#app");
