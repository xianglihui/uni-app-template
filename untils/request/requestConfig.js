export async function reqConfig(ins,options,successHandler = null ,failHandler = null,completeHandler = null){
	ins.baseUrl = options.baseUrl || ins.baseUrl;
	ins.header = options.header || ins.header;
	let config = {
		url:ins.baseUrl + options.url,
		header:ins.header
	}
	if(ins.requestInterceptor){
		let _config = null;
		try{
			_config = await ins.requestInterceptor(Object.assign({},options,config));
		}catch(e){
			//TODO handle the exception
			return false
		}
		if(!_config || typeof _config !== 'object'){
			return false
		}
		Object.assign(options, _config)
		config.url = _config.url;
		config.header = _config.header;
		const {type = 'request'} = options;
		if(type === 'request'){
			config['data'] = options.data || options.params || {};
			config['method'] = options.method || 'GET';
			config['dataType'] = options.dataType || 'json';
			config['responseType'] = options.responseType || 'text';
		}else if(type === 'upload'){
			config['fliePath'] = options.fliePath;
			config['name'] = options.name;
			config['method'] = options.method || "POST";
			config['formData'] = options.formData;
			config["fileType"] = options.fileType || "image"
			delete config['header']["Content-Type"];
		}
	}
	return config;
}