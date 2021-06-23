import {USERINFO,TOKEN} from "@/common/js/storeVariable.js"
export default {
	state:{
		userInfo:{}, //用户信息
		token:"",
		isGetGWC:false,//是否进入页面获取购物车数据
	},
	 getters: {
		 userInfo:state =>{
			 if(Object.keys(state.userInfo).length>0){
				 return state.userInfo
			 }else{
				return uni.getStorageSync(USERINFO)
			 }
			  
		 },
		 token:state =>{
			 if(state.token!=""){
				 return state.token
			 }else{
				return uni.getStorageSync(TOKEN)
			 }
		 			  
		 },
		 isGetGWC:state => state.isGetGWC,
		 
		 
	 },
	  mutations: {
		 saveUserInfo(state,payload) {
			state.userInfo = payload.data;
			 if(payload && payload.isSave){
				 uni.setStorageSync(USERINFO,payload.data);
			 }
				 
		 },
		 saveToken(state,token) {
			 state.token = token;
			uni.setStorageSync(TOKEN,token);			 
		 },
		 saveIsGetGWC(state,isBool){
			 state.isGetGWC = isBool;
		 }
		
	 },
	 actions:{
		 addUserInfo({commit},payload){
			 commit('saveUserInfo',payload)
		 },
		 addToken({commit},payload){
			 commit('saveToken',payload)
		 },
		 addIsGetGWC({commit},payload){
			 commit('saveIsGetGWC',payload)
		 },
	 }
	 
}