var md5 = require('md5')

const URL = 'https://api.ai.qq.com/fcgi-bin/nlp/nlp_texttranslate';
const APP_KEY = 'LpCW2DKkY2lh28SC';
const APP_ID = 2114106434;

var ksort = function (arys) {
  //先用Object内置类的keys方法获取要排序对象的属性名，再利用Array原型上的sort方法对获取的属性名进行排序，newkey是一个数组
  var newkey = Object.keys(arys).sort();
  //console.log('newkey='+newkey);
  var newObj = {}; //创建一个新的对象，用于存放排好序的键值对
  for (var i = 0; i < newkey.length; i++) {
    //遍历newkey数组
    newObj[newkey[i]] = arys[newkey[i]];
    //向新创建的对象中按照排好的顺序依次增加键值对

  }
  return newObj; //返回排好序的新对象
}

//1.生成鉴权签名sign
var getReqSign = function (params, appkey) {

  // 1. 字典升序排序
  let params2 = ksort(params);

  // 2. 拼按URL键值对
  let str = '';
  for (var key in params2) {
    if (params2.hasOwnProperty(key)) {
      let value = params2[key];
      if (value !== '') { // 过滤空值，比如sign
        str += key + '=' + encodeURIComponent(value) + '&';
      }
    }
  }

  // 3. 拼接app_key
  str += 'app_key=' + appkey;
  console.log("str:"+str);

  // 4. MD5运算+转换大写，得到请求签名
  let sign = md5(str || '').toUpperCase();
  return sign;
}


var translator = function (sentense, sour, tar) {
  //Promise 对象
  return new Promise((resolve, reject) => {

    let params = {
      app_id: APP_ID,
      nonce_str: Math.random().toString(36).slice(-5),
      sign: '',            // 初始值一定要写成'',不要写成别的值
      source: sour,
      target: tar,
      text: sentense,
      time_stamp: (Date.now() / 1000).toFixed(0)
    }

    params.sign = getReqSign(params, APP_KEY);
    
    wx.request({
      url: URL,
      data: params,
      success(res) {

        /*var temp= JSON.stringify(res);
        console.log(temp)*/

        if (res.data && res.data.data.target_text) {
          resolve(res)
        }
        else {
          reject({ status: 'error', msg: '翻译失败了' })
          wx.showToast({
            title: '翻译失败',
            icon: 'none',
            duration: 3000
          })
        }
      },
      fail() {
        reject({ status: 'error', msg: '翻译失败' })
        wx.showToast({
          title: '网络异常',
          icon: 'none',
          duration: 3000
        })
      }
    })
  })
}

module.exports = translator;