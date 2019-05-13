var dictWords = new Map();    //词典
var essays = new Array();     //存储文章
var uniqueUserWords;

 
function get_users(his) {
  
  var sen;
  var userWords = new Array();

  for (let i = 0; i < his.length; i++) {
    sen = his[i].result;
    var senWords = sen.split(" ");

    for (let j = 0; j < senWords.length; j++) {
      userWords.push(senWords[j])
    }
    uniqueUserWords = unique(userWords);         //去重
  }
}



function unique(arr) {         //去重
  return Array.from(new Set(arr))
}



var recommand = function (his) {

  get_users(his);


  var l1=0, l2=0, l3=0;      //统计用户搜索历史中不同级别单词数目
  for (let k=0; k<uniqueUserWords.length; k++) {

    if (dictWords[uniqueUserWords[k]] == 1){
      l1++;
    }
    else if (dictWords[uniqueUserWords[k]] == 2){
      l2++;
    }
    else if (dictWords[uniqueUserWords[k]] == 3) {
      l3++;
    }
    else {
      console.log("some new words");
    }
  }

  get_essays();

}


module.exports = recommand;