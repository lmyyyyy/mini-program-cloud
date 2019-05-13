// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'lmy-cloud-1007',
  traceUser: true,
})


// 云函数入口函数
exports.main = async(event, context) => {

  const wxContext = cloud.getWXContext()
  const db = cloud.database();

  try {
    db.collection('dicts').add({
      data: {
        word: 'hello',
        degree: event.tags
      },
      success: res => {
        console.log('add success: ', res)
      },
      fail: err => {
        console.error('add error：', err)
      }
    })
  } catch (e) {
    return e;
  }


  // const wxContext = cloud.getWXContext()

  // return {
  //   event,
  //   openid: wxContext.OPENID,
  //   appid: wxContext.APPID,
  //   unionid: wxContext.UNIONID,
  // }
}