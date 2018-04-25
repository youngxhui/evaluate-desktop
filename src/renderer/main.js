import Vue from 'vue'
import axios from 'axios'
import VCharts from 'v-charts'
import App from './App'
import router from './router'
import store from './store'
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(VCharts);
Vue.use(Element);

Vue.prototype.$http = axios;
// http://localhost:8085
// axios.defaults.baseURL = "http://193.112.6.35:8085/";
axios.defaults.baseURL = "http://localhost:8085/";
if (!process.env.IS_WEB) Vue.use(require('vue-electron'));
Vue.http = Vue.prototype.$http = axios;
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  components: {
    App
  },
  router,
  store,
  template: '<App/>'
}).$mount('#app');