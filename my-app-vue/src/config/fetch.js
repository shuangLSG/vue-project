import {
	baseUrl
} from './env'

export default async (url = '', data = {}, type = 'GET', method = 'fetch') => {
	type = type.toUpperCase();
	url = baseUrl + url

	/**
	 * application/x-www-form-urlencoded 这应该是最常见的 POST 提交数据的方式了。
	 * 浏览器的原生 form 表单，如果不设置 enctype 属性， 那么最终就会以 application/x-www-form-urlencoded 方式提交数据。
	 * 请求的时候:
	 * 首先，Content-Type 被指定为 application/x-www-form-urlencoded； 
	 * 其次，提交的数据按照 key1=val1&key2=val2 的方式进行编码，key 和 val 都进行了 URL 转码
    */
	var dataStr = ''; //数据拼接字符串
	Object.keys(data).forEach(key => {
		dataStr += key + '=' + data[key] + '&';
	})
	if (dataStr !== '') {
		dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
		url = url + '?' + dataStr;
	}


	if (window.fetch && method == 'fetch') {
		let requestConfig = {
			credentials: 'include',
			method: type,
			headers: {
				'Accept': 'application/json, text/javascript, */*;',
				'Content-Type': 'application/x-www-form-urlencoded'
			},
			mode: "cors",
			cache: "force-cache"
		}

		if (type == 'POST') {
			var form = new FormData();
			Object.defineProperty(requestConfig, 'body', {
				value: dataStr // key1=val1&key2=val2 的方式进行编码
			})
		}

		try {
			const response = await fetch(url, requestConfig);
			const responseJson = await response.json();
			return responseJson.d
		} catch (error) {
			throw new Error(error)
		}
	} else {
		return new Promise((resolve, reject) => {
			let requestObj;
			if (window.XMLHttpRequest) {
				requestObj = new XMLHttpRequest();
			} else {
				requestObj = new ActiveXObject;
			}

			let sendData = '';
			if (type == 'POST') {
				sendData = JSON.stringify(data);
			}

			requestObj.open(type, url, true);
			requestObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			requestObj.send(sendData);

			requestObj.onreadystatechange = () => {
				if (requestObj.readyState == 4) {
					if (requestObj.status == 200) {
						let obj = requestObj.response
						if (typeof obj !== 'object') {
							obj = JSON.parse(obj);
						}
						resolve(obj)
					} else {
						reject(requestObj)
					}
				}
			}
		})
	}
}