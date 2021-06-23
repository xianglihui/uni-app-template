import {getWxLoginInfo,getPhoneApi,getUser} from "@/apis/authorizationLogin/authorizationLogin.js"
import store from '@/store/index.js'
export function GetUserInfoHandler(ins,wxdata) {
	Login(ins,wxdata);		  
};
async function Login(ins,wxdata){//登录流程
	let getcode = await getWxCode(wxdata);
	let getOpenid = await getWxOpenid(getcode);
	let params ={
		  encryptedData:wxdata.detail.encryptedData,
		  iv:wxdata.detail.iv,
		  sessionId:getOpenid.sessionId
	}
	let getPhone = await getPhoneInfo(params);
	store.commit('saveUserInfo',{data:{phone:getPhone.phoneNumber.phoneNumber},isSave:true});
	await UserRoute(ins);
}
async function UserRoute(ins){//登录成功后进行跳转
	await getUserInfo();
	let routeObj = ins.$Route.query;
	if(!routeObj?.redirect?.query?.back){
		let arrTab =['index','shopping','my'];
		 let obj ={
			 name:routeObj.redirect.name,
			 params:routeObj.redirect.query
		 }
		 if(arrTab.indexOf(obj.name)>-1){
			ins.$Router.pushTab(obj)
		 }else{
			ins.$Router.replace(obj);
		 }
		
	}else{
		 ins.$Router.back();
	}
}
export function getUserInfo(){//获取用户信息
	return new Promise((reslove,reject)=>{
		getUser().then(res=>{
			let userinfo = store.getters.userInfo;
			let params = {
				...userinfo,
				...res
			}
			store.commit('saveUserInfo',{data:params,isSave:true});
			
			reslove(res);
		}).catch((err)=>{
			reject(err);
			console.log("获取用户信息失败",err)
		})
	})
	
};
export function getPhoneInfo(data){//获取手机号码
	return new Promise((reslove,reject)=>{
		getPhoneApi({
			encryptedData:data.encryptedData,
			iv:data.iv,
			sessionId:data.sessionId
		}).then(res=>{
			reslove(res);
		}).catch((err)=>{
			reject(err);
		})
	})
	
}
export function getWxOpenid(code){//获取openid
	return new Promise((reslove,reject)=>{
		getWxLoginInfo(code).then((response)=>{
			store.commit('saveToken',response.openid);
		  reslove(response);
		}).catch((err)=>{
			reject(err);
		})
	})
	
};

export function getWxCode(wxdata){//获取code
	return new Promise((reslove,reject)=>{
		uni.login({
		  success (res) {
			  // console.log('login',res)
			if (res.errMsg == "login:ok") {
				 reslove(res.code);
			} else {
				 uni.showToast({
					 title:"微信登录失败",
					 icon:'none'
				 })
				 reject(res);
			  // console.log('登录失败！' + res.errMsg)
			}
		  }
	})
	
});
}

