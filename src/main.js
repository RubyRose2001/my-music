// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "babel-polyfill"
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
// import Vconsole from 'vconsole'
//解决移动端延迟300毫秒点击问题
import fastclick from "fastclick"
//图片懒加载
import VueLazyLoad from "vue-lazyload"

Vue.config.productionTip = false
// let vConsole = new Vconsole()
/* eslint-disable no-new */
Vue.use(VueLazyLoad,{
  loading:require("./common/image/default.png")
})
// Vue.use(new vconsole);
import "./common/stylus/index.styl"
import "./common/stylus/swiper.min.css"
fastclick.attach(document.body)
new Vue({
  el: '#app',
  store,
  router,
  template: '<App/>',
  components: { App }
})
