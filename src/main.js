import Vue from "vue";
import App from "./App.vue";
import store from "./store";
import {
  library
} from "@fortawesome/fontawesome-svg-core";
import {
  fas
} from "@fortawesome/free-solid-svg-icons";
import {
  FontAwesomeIcon
} from "@fortawesome/vue-fontawesome";
import VueI18n from "vue-i18n";
import $ from "jquery";
import "bootstrap";
import "./assets/all.scss";
Vue.use(VueI18n);

const i18n = new VueI18n({
  locale: "en-US", // 語言標識
  //this.$i18n.locale // 通過切換locale的值來實現語言切換

  messages: {
    "my": require("./common/lang/my"), // 緬甸語言包

    "th": require("../src/common/lang/th"), // 泰國語言包

    "en-US": require("./common/lang/en") // 英文語言包
  }
});

library.add(fas);
Vue.component("font-awesome-icon", FontAwesomeIcon);
Vue.config.productionTip = false;
new Vue({
  store,
  i18n,
  render: h => h(App)
}).$mount("#app");
