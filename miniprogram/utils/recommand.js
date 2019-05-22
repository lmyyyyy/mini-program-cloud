var uniqueUserWords;
var this_query_list;
var essaylist_1, essaylist_2, essaylist_3; //各级文章
var essaylist = new Array();

const app = getApp()
const db = wx.cloud.database()

function get_essay_1() {
  var q = new Promise((resolve, reject) => {
    db.collection('articles').where({
      degree: 1
    }).get({
      success: res => {
        essaylist_1 = res.data
        resolve()
      },
      fail: err => {
        reject('essay1 error')
      }
    })
  })
  return q;
}

function get_essay_2() {
  var r = new Promise((resolve, reject) => {
    db.collection('articles').where({
      degree: 2
    }).get({
      success: res => {
        essaylist_2 = res.data
        resolve()
      },
      fail: err => {
        reject('essay2 error')
      }
    })
  })
  return r;
}

function get_essay_3() {
  var s = new Promise((resolve, reject) => {
    db.collection('articles').where({
      degree: 3
    }).get({
      success: res => {
        essaylist_3 = res.data
        resolve('essay get success')
      },
      fail: err => {
        reject('essay3 error')
      }
    })
  })
  return s;
}

function get_numbers() {
  var p = new Promise((resolve, reject) => {
    var sen;
    var userWords = new Array();
    for (let i = 0; i < this_query_list.length; i++) {
      var senWords = this_query_list[i].split(" ");
      for (let j = 0; j < senWords.length; j++) {
        var tempWords = senWords[j].replace(/[\ |\~|\`|\!|\@|\#|\$|\%|\^|\&|\*|\(|\)|\-|\_|\+|\=|\||\\|\[|\]|\{|\}|\;|\:|\"|\'|\,|\<|\.|\>|\/|\?]/g, "")
        userWords.push(tempWords.toLowerCase());
      }
      uniqueUserWords = Array.from(new Set(userWords)); //去重
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
    // console.log(l1 + ' ' + l2 + ' ' + l3)
    resolve([l1, l2, l3])
  });
  return p;
}


function get_essays([l1, l2, l3]) {

  var p = new Promise((resolve, reject) => {

    console.log(l1 + ' ' + l2 + ' ' + l3)
    var total = l1 + l2 + l3;
    var d1 = l1 / total * 10;
    var d2 = l2 / total * 20;
    var d3 = l3 / total * 20;
    console.log(d1 + ' ' + d2 + ' ' + d3)

    console.log(essaylist_1.length + ' ' + essaylist_2.length + ' ' + essaylist_3.length)

    var temp_1 = parseInt((Math.random()) * (essaylist_1.length))
    console.log('original: ' + temp_1)
    if (essaylist_1.length - temp_1 < d1) {
      temp_1 = 0;
    }
    console.log('after:' + temp_1)

    for (let i = temp_1; i < d1; i++) {
      essaylist.push(essaylist_1[i])
    }

    var temp_2 = parseInt((Math.random()) * (essaylist_2.length))
    console.log('original: ' + temp_2)
    if (essaylist_2.length - temp_2 < d2) {
      temp_2 = 0;
    }
    console.log('after: ' + temp_2)

    for (let i = temp_2; i < d2; i++) {
      essaylist.push(essaylist_2[i])
    }

    var temp_3 = parseInt((Math.random()) * (essaylist_3.length))
    console.log('original: ' + temp_3)
    if (essaylist_3.length - temp_3 < d3) {
      temp_3 = 0;
    }
    console.log('after: '+temp_3)

    for (let i = temp_3; i < d3; i++) {
      essaylist.push(essaylist_3[i])
    }
    console.log(essaylist)
    resolve(essaylist)
  });
  return p;
}

var recommand = function(queryList) {

  this_query_list = queryList;

  return new Promise((resolve, reject) => {

    get_essay_1().then(get_essay_2)
      .then(get_essay_3)
      .then(get_numbers)
      .then(get_essays)
      .then(res => {
        resolve(essaylist)
      })
  });
}

module.exports = recommand;