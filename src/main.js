// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'common/stylus/index.styl'
import FastClick from 'fastclick'
import LazyLoad from 'vue-lazyload'
import Loading from './base/loading/loading'

Vue.config.productionTip = false
FastClick.attach(document.body)

Vue.use(LazyLoad, {
  loading: require('common/image/default.png')
})

Vue.component('loading', Loading)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
