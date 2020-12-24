import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import CKEditor from "@ckeditor/ckeditor5-vue2";

import  { RESTAPI,CONSTATNTS } from './plugins/plugins';

Vue.use(CKEditor);
Vue.use(require('vue-moment'));

Vue.config.productionTip = false;

const bgColors=["bg-white","bg-primary","bg-success"]

Vue.use(RESTAPI,{url:'http://localhost:3000'});
Vue.use(CONSTATNTS,{bgColors});

new Vue({
    router,
    render: (h) => h(App),
}).$mount("#app");


