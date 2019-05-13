// pages/history/history.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    avatarUrl: '../../imgs/user-unlogin.png',
    userInfo: {},
    logged: false,         //登陆状态
    history: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    // if (!wx.cloud) {
    //   console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    // }
    // else {
    //   wx.cloud.init({
    //     traceUser: true,
    //   })
    // }

    // // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           //console.log(res.userInfo)
    //           this.setData({
    //             avatarUrl: res.userInfo.avatarUrl,
    //             userInfo: res.userInfo
    //           })
    //         }
    //       })
    //     }
    //   }
    // })

  },

  onShow: function () {
    this.setData({ history: wx.getStorageSync('history') })
  },

  onTapItem: function (e) {
    wx.reLaunch({
      url: `/pages/translation/translation?query=${e.currentTarget.dataset.query}`
    })
  },

  // onGetUserInfo: function (e) {
  //   console.log('getUserInfo')
  //   if (!this.logged && e.detail.userInfo) {
  //     this.setData({
  //       logged: true,
  //       avatarUrl: e.detail.userInfo.avatarUrl,
  //       userInfo: e.detail.userInfo
  //     })
  //   }
  // },

  // onGetOpenid: function () {          //必须的
  //   console.log('getOpenID')
 
  //    wx.cloud.callFunction({        //调用云函数
  //     name: 'login',
  //     data: {},
  //     success: res => {
  //       console.log('[云函数] [login] user openid: ', res.result.openid)
  //       app.globalData.openid = res.result.openid
  //       console.log(app.globalData.openid)
  //     },
  //     fail: err => {
  //       console.error('[云函数] [login] 调用失败', err)
  //     }
  //   })
  // },

  onClearHistory: function(){
    this.setData({history: []})  //将显示变为空
    wx.clearStorage('history')   //并清除Storage历史记录
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})