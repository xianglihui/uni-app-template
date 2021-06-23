import {reqConfig} from "./requestConfig.js"
export default class Request{
	constructor(config = {},reqInterceptor = null,resInterceptor = null,successHandler = null,failHandler = null,completehandler = null) {
	    this.baseUrl = config.baseUrl;
		this.header = config.header || {
			"Content-Type": "application/json;charset=UTF-8"
		};
		this.requestInterceptor = reqInterceptor;
		this.responseInterceptor = resInterceptor;
		this.success = successHandler;
		this.fail = failHandler;
		this.complete = completehandler;
	}
	async request(options,successHandler = null,failHandler = null,completeHandler = null){
		const {type = 'request'} = options;
		let config = null;
		try{
			config = await reqConfig(this,options,successHandler,failHandler,completeHandler);
		}catch(e){
			//TODO handle the exception
			console.error(e)
		}
		if(!config || typeof config != 'object'){
			return Promise.reject({});
		}
		const _this = this;
		return new Promise((res,rej)=>{
			config['success'] = response =>{
				let _res = null;
				if(_this.responseInterceptor){
					_res = _this.responseInterceptor(response);
				}
				successHandler && successHandler(response)
				if(_res.wakaryReqReject){
					delete _res.wakaryReqReject;
					rej(_res);
				}else{
					res(_res);
				}
			};
			config['fail'] = err =>{				
				failHandler && failHandler(err);
			};
			config['complete'] = res =>{
				completeHandler && completeHandler(res);
			};
			requestType(type,config);
		})
	}
}
const requestType = (type,config)=>{
	switch(type) {
	     case 'request':
	        uni.request(config);
	        break;
	     case 'upload':
	        uni.upload(config);
	        break;
	     default:
	        uni.downloadFile(config);
	} 
}