var uniqueUserWords;
var essaylist_1, essaylist_2, essaylist_3;
const app = getApp()
const db = wx.cloud.database()


var recommand = function(queryList) {

  return new Promise((resolve, reject)=> {
    var sen;
    var userWords = new Array();
    for (let i = 0; i < queryList.length; i++) {
      var senWords = queryList[i].split(" ");
      for (let j = 0; j < senWords.length; j++) {
        var tempWords = senWords[j].replace(/[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g, "")
        userWords.push(tempWords.toLowerCase());
      }
      uniqueUserWords = Array.from(new Set(userWords));  //去重
    }
    var l1 = 0,
      l2 = 0,
      l3 = 0; //统计用户搜索历史中不同级别单词数目

    for (let k = 0; k < uniqueUserWords.length; k++) {
      if (app.globalData.dicts[uniqueUserWords[k]]) {
        if (app.globalData.dicts[uniqueUserWords[k]] == '1') {
          l1++;
        } else if (dictWords[uniqueUserWords[k]] == '2') {
          l2++;
        } else if (dictWords[uniqueUserWords[k]] == '3') {
          l3++;
        } else {
          console.log('some new tags');
        }
      }
    }
    
    db.collection('articles').where({
      degree: 1
    }).get({
      success: res => {
        essaylist_1 = res.data
        resolve(res)
      },
      fail: err => {
        reject('promise error')
      }
    })

    // wx.cloud.callFunction({ //调用云函数recommand
    //   name: 'recommand',
    //   data: {
    //     degree: 2
    //   },
    //   success: res => {
    //     resolve(res.result);
    //   },
    //   fail: err => {
    //     console.error('[recommand] error: ', err);
    //     reject('promise error')
    //   }
    // })
  })
}

module.exports = recommand;