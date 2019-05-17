let tools = {
	/* 做cookie的存储删除和修改
	 * 只传key就是获取
	 * key和value一起穿就是存或者删除
	 * option 修改path和expires expires的值为-1代码删除
	 * @param key <string> cookie的属性名
	 * @param value <string> cookie的值
	 * @param option <object> {expires, path}
	 * return <string> 取cookie时,就返回当前这条cookie值
	 */
	
	cookie : function (key, value, option) {
		if(value === undefined) {
			var cookie = document.cookie;
			var arr = cookie.split("; ");
			var objCookie = arr.reduce(function(obj, item) {
				var substr = item.split("=");
				obj[substr[0]] = decodeURIComponent(substr[1]);
				return obj;
			},{})
			
			return objCookie[key];
		}else{
			var str = key + "=" + encodeURIComponent(value);
			if(option){
				if(option.expires){
					var date = new Date();
					date.setDate(date.getDate() + option.expires)
					console.log(date)
					str += ";expires=" + date;
				}
				if(option.path)str += ";path=" + option.path;
			}
			document.cookie = str;
		}
	} ,
	
	/* ajaxGet方法
	 * @param url <string> 地址 
	 * @param query <object> 请求携带的参数
	 * @param callback <function> 数据成功和的回调函数
	 * @param isJson <boolean> 是否是json格式数据
	 */
	
	ajaxGet : function (url, query, callback, isJson) {
		isJson = isJson === undefined ? true: isJson;
		
		var ajax = new XMLHttpRequest();
		if(query) {
			url += "?";
			for(var key in query) {
				url += key + "=" + query[key] + "&";
			}
			url.slice(0, -1);
		}
		ajax.open("GET", url, true);
		
		ajax.send(null);
		
		ajax.onreadystatechange = function () {
			if(ajax.readyState === 4 && ajax.status === 200) {
				var res = isJson ? JSON.parse(ajax.responseText) : ajax.responseText;
				callback && callback(res);
			}
		}
	},
	
		/* ajax方法
	 * @param method <string> "get" 或者 "post"
	 * @param url <string> 地址
	 * @param query <object> 请求携带的参数
	 * @param callback <function> 数据成功后的回调函数
	 * @paran isJson <boolean> 是否是json格式数据
	 */
	
	ajax : function (method, url, query, callback, isJson) {
		isJson = isJson === undefined ? true : isJson;
		
		if(method.toUpperCase() === "GET") {
			this.ajaxGet(url, query, callback, isJson);
		}else if(method.toUpperCase() === "POST") {
			var ajax = new XMLHttpRequest();
			
			ajax.open("POST", url, true);
			
			ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
			
			var str = "";
			if(query) {
				for(var key in query) {
					str += key + "=" + query[key] + "&";
				}
				str.slice(0, -1);
			}
			
			ajax.send(str);
			
			ajax.onreadystatechange = function () {
				if(ajax.readyState === 4){
					if(ajax.status === 200){
						callback && callback(isJson ? JSON.parse(ajax.responseText) : ajax.responseText);
					}else{
						alert("请求失败");
					}
				}
			}
		}
	},
	
	/* ajaxGetPromise方法
	 * @param url <string> 请求的地址
	 * @param query <object> 要携带的参数
	 * @isJson <boolean> 是否是json格式数据
	 */
	
	ajaxGetPromise : function (url, query, isJson) {
		isJson = isJson === undefined ? true : isJson	;
		
		if(query){
			url = "?";
			for(var key in query){
				url += key + "=" +query[key] + "&";
			}
			url.slice(0, -1);
		}
		
		return new Promise((resolve, reject) => {
			var ajax = new XMLHttpRequest();
			
			ajax.open("GET", url, true);
			
			ajax.send(null);
			
			ajax.onreadystatechange = function () {
				if(ajax.readyState === 4) {
					if(ajax.status === 200){
						resolve(isJson ? JSON.parse(ajax.responseText) : ajax.responseText);
					}else{
						reject()
					}
				}
			}
		})
	}
}

define(function () {
	return tools;
})