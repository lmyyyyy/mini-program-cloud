// pages/reading/reading.js
const app = getApp()

Page({


  data: {
    queryList: '',
    essayList: []         //文章列表
  },


  onLoad() {
    console.log('reading: ' + app.globalData.openid)
    
    console.log(app.globalData.dicts['exhaustible'])
   },



   onShow() {
     const db = wx.cloud.database()               //查询搜索历史
     db.collection('users').where({
      //  _openid: this.data.openid
       _openid: app.globalData.openid
     }).get({
       success: res => {

         var tempQueryList = []
         for (var i = 0; i < res.data.length; i++) {
           tempQueryList.push(res.data[i].result)
         }
         this.setData({
           queryList: tempQueryList
         })
         console.log('history list: ' + tempQueryList)

       },
       fail: err => {
         console.error('query error：', err)
       }
     })

    //  wx.cloud.callFunction({            //调用云函数recommand
    //    name: 'recommand',
    //    data: {},
    //    success: res => {
    //      console.log('[recommand] success: ', res)
    //    },
    //    fail: err => {
    //      console.error('[recommand] error: ', err)
    //    }
    //  })

   }

})