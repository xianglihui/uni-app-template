import Request from "./request.js"
import store from '@/store/index.js'
const baseUrl = process.env.NODE_ENV === 'development' ? 'http://10.10.90.40:32013' : 'https://xxx'
// const baseUrl = process.env.NODE_ENV === 'development' ? 'https://masa-sec-wechat-dev.lonsid.cn' : 'https://xxx'
const config = {
	baseUrl,
}
const reqInterceptor = async (options)=>{
	//请求拦截器，设置header的一些内容
	options.header = {
		...options.header,
		token:store.getters.token
	};
	if(!store.getters.token){
		delete options.header['token'];
	}
	//加载提示,是否显示loading显示
	if(!options.hideLoading){
		uni.showLoading({
			title:'正在加载中...'
		})
	}
	
	return options;
	
}
//定义响应拦截
const resInterceptor = (response)=>{
	uni.hideLoading();
	return statusCodeFun(response);

}
const statusCodeFun = (response) =>{
	const { statusCode , errMsg } = response;
	
	if(statusCode == 200){
		return response.data;
	}else if(statusCode == 401){
		store.dispatch('addToken',0)
		store.dispatch('addUserInfo',{data:{},isSave:true});
		uni.showToast({
			icon:'none',
			title:errMsg
		});
		return {
			wakaryReqReject:true,
			msg:errMsg,
			res:response
		}
	}
	else if(statusCode == 299){
		uni.showToast({
			icon:'none',
			title:errMsg
		});
		return {
			wakaryReqReject:true,
			msg:errMsg,
			res:response
		}
	}else if(statusCode >= 500){
		uni.showToast({
			icon:'none',
			title:"网关异常"
		});
		return {
			wakaryReqReject:true,
			msg:"网关异常",
			res:response
		}
	}else{
		uni.showToast({
			icon:'none',
			title:errMsg
		});
		return {
			wakaryReqReject:true,
			msg:"服务器异常",
			res:response
		}
	}
}
const request = new Request(config,reqInterceptor,resInterceptor);
export default request;