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
    openid:'',
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
        'chs': '西班牙语',
        'lang': 'es',
        "index": 5
      },
      {
        'chs': '意大利语',
        'lang': 'it',
        "index": 6
      },
      {
        'chs': '德语',
        'lang': 'de',
        "index": 7
      },
      {
        'chs': '土耳其语',
        'lang': 'tr',
        "index": 8
      },
      {
        'chs': '俄语',
        'lang': 'ru',
        "index": 9
      },
      {
        'chs': '葡萄牙语',
        'lang': 'pt',
        "index": 10
      },
      {
        'chs': '越南语',
        'lang': 'vi',
        "index": 11
      },
      {
        'chs': '印度尼西亚语',
        'lang': 'id',
        "index": 12
      },
      {
        'chs': '泰语',
        'lang': 'th',
        "index": 13
      },
      {
        'chs': '自动识别',
        'lang': 'auto',
        "index": 14
      },
      
      
    ]
  }
})
