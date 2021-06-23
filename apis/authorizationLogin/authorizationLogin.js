import request from "@/untils/request/index";
//拿微信code换openid
export function getWxLoginInfo(code){
	return request.request({
			method:"POST",
			url:`/api/MiniProgram/OnLogin`,
			data:{code}
		})
}
//获取解密后的手机号
export function getPhoneApi(data){
	return request.request({
			method:"POST",
			url:`/api/MiniProgram/DecryptPhoneNumber`,
			data
		})
}
//获取用户信息
export function getUser(){
	return request.request({
			method:"GET",
			url:`/api/WeChatUser`
		})
}