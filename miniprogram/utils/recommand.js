var uniqueUserWords;
const app = getApp()

function get_users(his, callback) {
  var sen;
  var userWords = new Array();
  for (let i = 0; i < his.length; i++) {
    var senWords = his[i].split(" ");
    for (let j = 0; j < senWords.length; j++) {
      var tempWords = senWords[j].replace(/[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g, "")
      userWords.push(tempWords.toLowerCase());
    }
    uniqueUserWords = unique(userWords); //去重
  }
  callback(uniqueUserWords);
}


function unique(arr) { //去重
  return Array.from(new Set(arr))
}


function count(uniqueUserWords) {

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

  wx.cloud.callFunction({ //调用云函数recommand
    name: 'recommand',
    data: {
      degree: 1
    },
    success: res => {
      console.log('[recommand] success: ', res.result)
    },
    fail: err => {
      console.error('[recommand] error: ', err)
    }
  })
}

var recommand = function(queryList) {
  get_users(queryList, count);
}


module.exports = recommand;