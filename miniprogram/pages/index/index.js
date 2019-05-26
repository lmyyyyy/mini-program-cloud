//index.js
var translator = require('../../utils/api.js');
var init = require('../../utils/init.js');
const app = getApp()

Page({
  data: {
    query: '', //输入文字
    hideClearIcon: true, //close icon显现状态
    result: [], //译文结果
    curLang: {}, //当前语言
  },


  onLoad: function(options) { //翻译历史页通过 reLaunch 跳转，重新加载

    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }

    wx.showShareMenu({
      withShareTicket: true,
      success: function () { },
      fail: function () { }
    })

    wx.cloud.callFunction({ //调用云函数获取openid
      name: 'login',
      data: {},
      success: res => {
        app.globalData.openid = res.result.openid
        console.log(app.globalData.openid)
      },
      fail: err => {
        console.error('[login] error: ', err)
      }
    })

    init() //调用初始化函数，导入字典以及文章

    //console.log(options)
    if (options.query) {
      this.setData({
        query: options.query
      })
      this.setData({
        'hideClearIcon': false
      }) //输入框有文字，则让icon-close显现
    }
  },


  onShow: function() {
    if (this.data.curLang.lang !== app.globalData.curLang.lang) {
      this.setData({
        curLang: app.globalData.curLang
      })
      this.onConfirm()
    }
  },

  
  onInput: function(e) {
    //传递用户输入的数据、close的展示跟隐藏
    this.setData({
      'query': e.detail.value
    })
    if (this.data.query.length > 0) { //输入时字体图标出现
      this.setData({
        'hideClearIcon': false
      })
    } else {
      this.setData({
        'hideClearIcon': true
      })
    }
  },


  onTapClose: function() {
    //用户点击close的事件
    this.setData({
      query: '',
      hideClearIcon: true
    })
    //如果不需要保留译文结果，也可以删除
    this.setData({
      result: ''
    })
    console.log('clearAll')
  },


  onConfirm: function() {
    //翻译
    if (!this.data.query) return //空文本的时候不进行翻译

    translator(this.data.query, 'auto', this.data.curLang.lang).then(res => {
      //调用 api.js 里面的 Promise

      this.setData({
        'result': res.data.data.target_text
      })

      const db = wx.cloud.database() //将搜索记录加入数据库
      db.collection('users').add({
        data: {
          query: this.data.query,
          result: this.data.result
        },
        success: res => {
          console.log('add history success')
          // wx.showToast({
          //   title: '新增记录成功',
          // })
        },
        fail: err => {
          console.error('add history error：', err)
        }
      })

      let history = wx.getStorageSync('history') || [] //本地历史记录操作
      history.unshift({
        query: this.data.query,
        result: this.data.result
      })
      history.length = history.length > 10 ? 10 : history.length
      wx.setStorageSync('history', history)
    })
  },


  onShareAppMessage: function () {
    return {
      title: '快译读',
      path: 'pages/index/index',
      success: function (res) {
        // 转发成功
        console.log("转发成功:" + JSON.stringify(res));
      },
      fail: function (res) {
        // 转发失败
        console.log("转发失败:" + JSON.stringify(res));
      }
    }

  }

})