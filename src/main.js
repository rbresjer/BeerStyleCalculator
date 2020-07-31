import Vue from 'vue';
import {
  LayoutPlugin,
  FormPlugin,
  FormGroupPlugin,
  FormInputPlugin,
  FormRadioPlugin,
  FormCheckboxPlugin,
} from 'bootstrap-vue';
import App from './App.vue';
import store from './store';
import './scss/style.scss';

Vue.use(LayoutPlugin);
Vue.use(FormPlugin);
Vue.use(FormGroupPlugin);
Vue.use(FormInputPlugin);
Vue.use(FormRadioPlugin);
Vue.use(FormCheckboxPlugin);

Vue.config.productionTip = false;

new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
