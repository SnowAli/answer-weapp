/*
 * @Description: 
 * @Author: Ali
 * @Date: 2021-04-03 19:30:56
 * @LastEditors: Ali
 * @LastEditTime: 2021-04-11 20:38:26
 */
// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    indicatorDots: false,
    vertical: false,
    autoplay: true,
    circular: true,
    interval: 3000,
    duration: 800,
    imgUrls: [
      'https://p3.pstatp.com/large/43700001e49d85d3ab52',
      'https://p3.pstatp.com/large/39f600038907bf3b9c96',
      'https://p3.pstatp.com/large/31fa0003ed7228adf421'
    ],
    bigImg: ''
  },
  // 事件处理函数
  bindViewTap () {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad () {

    if (wx.getUserProfile) {
      this.setData({
        canIUseGetUserProfile: true
      })
    }
  },
  toAnswerPage (e) {

    if (!app.globalData.userInfo) {
      wx.getUserProfile({
        desc: '展示用户信息',
        success: (res) => {
          app.globalData.userInfo = res.userInfo
          wx.navigateTo({
            url: `/pages/answer/index`
          })
        },
        fail: (err) => {
          return
          console.log(err);
        }
      })
    } else {
      wx.navigateTo({
        url: `/pages/answer/index`
      })
    }


  },


  onPullDownRefresh: function () {
    console.log('下拉刷新');
    //设置触发事件时间效果方法
    setTimeout(() => {
      // 在此调取接口
      wx.showNavigationBarLoading(); // 显示顶部刷新图标
      wx.redirectTo({ //关闭当前页面跳转到目标页面，注意tabbar页面无法跳转！
        url: '/pages/mine/refresh', //加载页面地址
        success: function (res) { //调用成功时
          wx.stopPullDownRefresh({ // 数据请求成功后，关闭刷新。如果不加这个接口，刷新的动画效果时间使用系统默认设置时间
            success (res) { //调用成功时
              console.log('刷新成功');
            }
          })
        }
      })
    }, 1000) //单位“毫秒”，设置多久后开始触发刷新效果
  },



  upload () {
    let that = this;
    let openid = app.globalData.openid || wx.getStorageSync('openid');
    wx.chooseImage({
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        wx.showLoading({
          title: '上传中',
        });
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        let filePath = res.tempFilePaths[0];
        const name = Math.random() * 1000000;
        const cloudPath = name + filePath.match(/\.[^.]+?$/)[0]
        wx.cloud.uploadFile({
          cloudPath,//云存储图片名字
          filePath,//临时路径
          success: res => {
            console.log('[上传图片] 成功：', res)
            that.setData({
              bigImg: res.fileID,//云存储图片路径,可以把这个路径存到集合，要用的时候再取出来
            });
            let fileID = res.fileID;
            //把图片存到users集合表
            const db = wx.cloud.database();
            db.collection("weappImg").add({
              data: {
                bigImg: fileID
              },
              success: function () {
                wx.showToast({
                  title: '图片存储成功',
                  'icon': 'none',
                  duration: 3000
                })
              },
              fail: function () {
                wx.showToast({
                  title: '图片存储失败',
                  'icon': 'none',
                  duration: 3000
                })
              }
            });
          },
          fail: e => {
            console.error('[上传图片] 失败：', e)
          },
          complete: () => {
            wx.hideLoading()
          }
        });
      }
    })
  },
})
