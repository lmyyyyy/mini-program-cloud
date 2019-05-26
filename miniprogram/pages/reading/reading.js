// pages/reading/reading.js

var recommand = require('../../utils/recommand.js');

const app = getApp()

Page({

  data: {
    queryList: [], //查询历史列表
    essayList: [] //文章列表
  },

  onLoad() {

    // console.log('reading: ' + app.globalData.openid)

    const db = wx.cloud.database() //查询搜索历史
    db.collection('users').where({
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

        //调用推荐函数
        recommand(this.data.queryList).then(res => {
          this.setData({
            essayList: res
          })
          console.log(this.data.essayList)
        })

      },
      fail: err => {
        console.error('query error：', err)
      }
    })
  },

  viewDetail: function (e) {
    let langObj = e.currentTarget.dataset
    console.log(langObj)
    wx.switchTab({ url: '/pages/reading/essay_detail/essay_detail' })  //跳转页面
  }


})