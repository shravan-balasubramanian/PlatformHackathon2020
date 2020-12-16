import Vue from 'vue';
import {
  Tooltip,
} from 'element-ui';
import { applyPolyfills, defineCustomElements } from '@freshworks/crayons/loader';
import App from './App.vue';
import router from './router';
import store from './store';

import './assets/styles/styles.scss';

applyPolyfills().then(() => defineCustomElements());

Vue.use(Tooltip);
Vue.config.ignoredElements = [/fw-\w*/];
Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount('#app');
