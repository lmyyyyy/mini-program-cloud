//app.js
App({
  onLaunch: function () {
    
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力')
    } else {
      wx.cloud.init({
        traceUser: true,
      })
    }

    this.globalData.curLang = wx.getStorageSync('curLang') || this.globalData.langList[0]
  },
  globalData: {
    curLang: {},
    dicts:{},
    openid:'oNiMs5HbsUrjWxQu40DJKA6-o7zI',
    langList: [
      {
        'chs': '英文',
        "lang": 'en',
        "index": 0
      },
      {
        'chs': '中文',
        'lang': 'zh',
        "index": 1
      },
      {
        'chs': '日语',
        'lang': 'jp',
        "index": 2
      },
      {
        'chs': '韩语',
        'lang': 'kr',
        "index": 3
      },
      {
        'chs': '法语',
        'lang': 'fr',
        "index": 4
      },
      {
        'chs': '德语',
        'lang': 'de',
        "index": 5
      },
      {
        'chs': '俄语',
        'lang': 'ru',
        "index": 6
      },
      {
        'chs': '泰语',
        'lang': 'th',
        "index": 7
      },
      {
        'chs': '西班牙语',
        'lang': 'es',
        "index": 8
      },
      {
        'chs': '阿拉伯语',
        'lang': 'ara',
        "index": 9
      },
      {
        'chs': '意大利语',
        'lang': 'it',
        "index": 10
      },
      {
        'chs': '葡萄牙语',
        'lang': 'pt',
        "index": 11
      }
    ]
  }
})
