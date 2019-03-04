import {
  baseUrl
} from './env';
let axios = require('axios');

// 1 将所有的主机名和端口 一起设置
axios.defaults.baseURL = baseUrl;


export default (url = '', data = {}, method = 'GET') => {
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
  }

  return new Promise((resolve, reject) => {
    axios({
      method: method,
      url: url,
      data: method === 'POST' ? dataStr : null,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
      },
      withCredentials: false
    }).then((response) => {
      
      console.log(response)
      resolve(response);
    }).catch((error) => {
      reject(error);
    })
  })
}
