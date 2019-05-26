// pages/reading/essay_detail/essay_detail.js

const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    essay: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(query) {
    // let essay = JSON.parse(query.essay)

    let essayID = query.essayID
    console.log(essayID)

    // 找
    let essayList = app.globalData.essList
    for (let i = 0; i < essayList.length; i++) {
      if (essayList[i]._id == essayID) {
        let essay = essayList[i]
        if (essayList[i].degree == 1) {
          essay.grade = '四级'
        } else if (essayList[i].degree == 2) {
          essay.grade = '六级'
        } else if (essayList[i].degree == 3) {
          essay.grade = '雅思'
        }

        this.setData({
          essay: essay
        })
      }
    }


  }
})