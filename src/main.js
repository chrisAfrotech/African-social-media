// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import { facebookDate } from './facebookDate'
import vuexStore from './vuex_store.js'
import router from './router'
import Vuex from 'vuex'
import VueCountryCode from 'vue-country-code-select'
import ImageUploader from 'vue-image-upload-resize'
import middleware from '@grafikri/vue-middleware'

Vue.use(ImageUploader)

Vue.use(VueCountryCode)

Vue.use(Vuex)
Vue.mixin({
  methods: {
    facebookDate: facebookDate
  }
})
Vue.config.productionTip = false

/* creating the store ----- */

const store = new Vuex.Store(vuexStore)
router.beforeEach(middleware({store}))
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>',
  store: store
})
