import Vue from 'vue'
import App from './App.vue'
import store from './store'
import vueCookie from 'vue-cookies'
Vue.config.productionTip = false
Vue.use(vueCookie)
new Vue({
  store,
  render: h => h(App)
}).$mount('#app')

const user = global.$cookies.get('terminal-user')
if (user) {
  store.commit('logInWith', user)
}
store.commit('loaded')
