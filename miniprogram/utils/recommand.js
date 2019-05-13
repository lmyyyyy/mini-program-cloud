var uniqueUserWords;

const app = getApp()
 
function get_users(his) {
  var sen;
  var userWords = new Array();

  for (let i = 0; i < his.length; i++) {
    var senWords = his[i].split(" ");

    for (let j = 0; j < senWords.length; j++) {
      userWords.push(senWords[j])
    }
    uniqueUserWords = unique(userWords);         //去重
  }
}

function unique(arr) {         //去重
  return Array.from(new Set(arr))
}



var recommand = function (queryList) {

  get_users(queryList);



  var l1=0, l2=0, l3=0;      //统计用户搜索历史中不同级别单词数目
  for (let k=0; k<uniqueUserWords.length; k++) {

    if (app.globalData.dicts[uniqueUserWords[k].strm()] == 1){
      l1++;
    }
    else if (dictWords[uniqueUserWords[k].strm()] == 2){
      l2++;
    }
    else if (dictWords[uniqueUserWords[k].strm()] == 3) {
      l3++;
    }
    else {
      console.log("some new words");
    }
  }

  console.log('times:' + l1 + ' ' + l2 + ' ' + l3)

  // get_essays();

}


module.exports = recommand;

// function cloud_set(filename, wordList) {
//   wx.cloud.callFunction({ //调用云函数init
//     name: 'init',
//     data: {
//       words: wordList,
//       tags: filename
//     },
//     success: res => {
//       console.log('[init] success: ', res.result)
//     },
//     fail: err => {
//       console.error('[init] error: ', err)
//     }
//   })
// }