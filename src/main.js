import Vue from 'vue'
import App from './App'
import request from './utils/request'
import store from './utils/store'
import router from './utils/router'
import main from './utils/main'
import config from './utils/config'

Vue.prototype.$api = request.api
Vue.prototype.$request = request
Vue.prototype.$store = store
Vue.prototype.$router = router
Vue.prototype.$main = main
Vue.prototype.$config = config

Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
  ...App
})
app.$mount()
