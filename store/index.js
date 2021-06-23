import Vue from "vue";
import Vuex from "vuex";
Vue.use(Vuex);
import userinfo from "@/store/global/global.js"
const store = new Vuex.Store({
	...userinfo,
	//code
})
export default store;