// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import App from './App'
import Axios from 'axios'

// 引入echarts
import echarts from 'echarts'

Vue.prototype.$echarts = echarts
Vue.prototype.$http = Axios

Vue.config.productionTip = false
Vue.config.devtools = true; //这步很重要

Vue.use(ElementUI);
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
