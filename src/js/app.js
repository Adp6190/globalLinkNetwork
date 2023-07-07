// Import Vue
import { createApp } from 'vue';
import AppConfig from "./config";
import axios from 'axios';
// Import Framework7
import Framework7 from 'framework7/lite-bundle';

// Import Framework7-Vue Plugin
import Framework7Vue, { registerComponents } from 'framework7-vue/bundle';

// Import Framework7 Styles
import 'framework7/framework7-bundle.css';

// Import Icons and App Custom Styles
import '../css/icons.css';
import '../css/app.scss';
import store from './vuex';
const Axios = axios;
Axios.interceptors.request.use(function (config) {
    config.url = AppConfig.endpoint + '/' + config.url
    return config;
}, function (error) {
    return Promise.reject(error);
});
Axios.interceptors.response.use(function (response) {


    return response;
}, function (error) {
    if (error.response.status == 401) {
        store.dispatch('logout')
    }

    return Promise.reject(error);
});
// Import App Component
import App from '../components/app.vue';

// Init Framework7-Vue Plugin
Framework7.use(Framework7Vue);

// Init App
const app = createApp(App);
app.use(store);
app.config.globalProperties.$axios = Axios;
app.config.globalProperties.$appConfig = AppConfig;
// Register Framework7 Vue components
registerComponents(app);

// Mount the app
app.mount('#app');