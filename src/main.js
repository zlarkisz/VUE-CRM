import Vue from 'vue'
import Vuelidate from 'vuelidate'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import dateFilter from '@/filters/datefilter'
import currencyFilter from '@/filters/currency.filter'
import tooltipDirective from '@/directives/tooltip.directive'
import messagePlugin from '@/utils/message.plugin'
import Loader from '@/components/app/Loader'
import 'materialize-css/dist/js/materialize.min'

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

Vue.config.productionTip = false

Vue.use(messagePlugin)
Vue.use(Vuelidate)
Vue.filter('date', dateFilter)
Vue.filter('currency', currencyFilter)
Vue.directive('tooltip', tooltipDirective)
Vue.component('Loader', Loader)

const firebaseConfig = {
  apiKey: "AIzaSyDZQw9Al6npL0pLKlHrEOb-_LDk4xJ9QYM",
  authDomain: "zlarkisz-crm.firebaseapp.com",
  projectId: "zlarkisz-crm",
  storageBucket: "zlarkisz-crm.appspot.com",
  messagingSenderId: "110697615656",
  appId: "1:110697615656:web:4aa58f903389859d30c01d",
  measurementId: "G-HQ6N3Q4MD4"
};

firebase.initializeApp(firebaseConfig);

let app

firebase.auth().onAuthStateChanged(() => {
  if (!app) {
    app = new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')
  }
})
