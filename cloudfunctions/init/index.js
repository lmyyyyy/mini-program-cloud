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

  return {
    len: event.words.length,
    tag: event.tags
  }
}


// for (var i = 0; i < event.words.length; i++) { //读四级词汇并写入数据库

//   db.collection('dicts').where({ //查询
//     // _openid: app.globalData.openid,
//     word: event.words[i]
//   }).get({
//     success: res => {
//       console.log('already exist: ', res)
//     },
//     fail: err => {
//       console.error('not exist, add now：', err)
//       db.collection('dicts').add({
//         data: {
//           word: event.words[i],
//           degree: event.tags
//         },
//         fail: err => {
//           console.error('add error：', err)
//         }
//       })
//     }
//   })

// }