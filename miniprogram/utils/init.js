const app = getApp()

var dictWords = new Array()
var titleList;
var degreeList;


function getDicts(filename, callback) { //获取词典

  wx.cloud.downloadFile({
    fileID: 'cloud://lmy-cloud-1007.6c6d-lmy-cloud-1007/words/' + filename + '.txt', // 文件 ID
    success: res => {
      // 返回临时文件路径
      var file_path = res.tempFilePath;
      var fs = wx.getFileSystemManager(); //读文件

      fs.readFile({
        filePath: file_path,
        encoding: "utf8",
        success(res) {
          var words = res.data;
          var wordList = words.split("\n");

          if (filename.trim() == 'CET4') {
            for (let i = 0; i < wordList.length; i++) {
              dictWords[wordList[i].trim()] = 1;
            }
          } else if (filename.trim() == 'CET6') {
            for (let i = 0; i < wordList.length; i++) {
              if (!dictWords[wordList[i].trim()]) {
                dictWords[wordList[i].trim()] = 2;
              }
            }
          } else if (filename.trim() == 'IELTS') {
            for (let i = 0; i < wordList.length; i++) {
              if (!dictWords[wordList[i].trim()]) {
                dictWords[wordList[i].trim()] = 3;
              }
            }
          }
          callback(dictWords)
        },
        fail(res) { //readFile error
          console.log(res.errMsg);
        }
      })
    },
    fail: console.error //download error
  })
}

function assign(dictWords) {
  app.globalData.dicts = dictWords;
}



function getEssays(callback) {
  var ts = wx.getFileSystemManager();
  var gs = wx.getFileSystemManager();


  wx.cloud.downloadFile({
    fileID: 'cloud://lmy-cloud-1007.6c6d-lmy-cloud-1007/title.txt', // 文件 ID
    success: res => {
      // 返回临时文件路径
      var file_path = res.tempFilePath;

      ts.readFile({
        filePath: file_path,
        encoding: "utf8",
        success(res) {
          var titles = res.data;
          titleList = titles.split("\n");

          wx.cloud.downloadFile({ //再次下载等级
            fileID: 'cloud://lmy-cloud-1007.6c6d-lmy-cloud-1007/degree.txt', // 文件 ID
            success: res => {
              // 返回临时文件路径
              var file_p = res.tempFilePath;

              gs.readFile({
                filePath: file_p,
                encoding: "utf8",
                success(res) {
                  var degrees = res.data;
                  degreeList = degrees.split("\n");

                  callback()
                },
                fail(res) { //readFile error
                  console.log(res.errMsg);
                }
              })
            },
            fail: console.error //download error
          })
        },
        fail(res) { //readFile error
          console.log(res.errMsg);
        }
      })
    },
    fail: console.error //download error
  })
}


function get_content() { //初始化文章

  console.log('titlelength: '+titleList.length)
  console.log('degreelength: ' + degreeList.length)
  const db = wx.cloud.database() //将文章加入数据库


  for (let k = 0; k < 50; k++) {
    wx.cloud.downloadFile({
      fileID: 'cloud://lmy-cloud-1007.6c6d-lmy-cloud-1007/articles/essay' + k + '.txt', // 文件 ID
      success: res => {
        // 返回临时文件路径
        var file_pa = res.tempFilePath;
        var cs = wx.getFileSystemManager(); //读文件

        cs.readFile({
          filePath: file_pa,
          encoding: "utf8",
          success(res) {
            var cont = res.data;

            db.collection('articles').add({
              data: {
                contnet: cont,
                title: titleList[k],
                degree: degreeList[k]
              },
              success: res => {
                console.log('add essay success: ',k)
              },
              fail: err => {
                console.error('add history error：', err)
              }
            })


          },
          fail(res) { //readFile error
            console.log(res.errMsg);
          }
        })
      },
      fail: console.error //download error
    })

  }

}

var init = function() {
  getDicts('CET4', assign);
  getDicts('CET6', assign);
  getDicts('IELTS', assign);

  getEssays(get_content);
}

module.exports = init;


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