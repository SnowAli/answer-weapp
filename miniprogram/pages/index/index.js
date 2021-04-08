/*
 * @Description: 
 * @Author: Ali
 * @Date: 2021-04-03 19:30:56
 * @LastEditors: Ali
 * @LastEditTime: 2021-04-04 18:01:35
 */
// index.js
// 获取应用实例
const app = getApp()

Page({
  data: {
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    indicatorDots: true,
    vertical: false,
    autoplay: true,
    circular: true,
    interval: 2000,
    duration: 500,
    imgUrls: [
      'https://p3.pstatp.com/large/43700001e49d85d3ab52',
      'https://p3.pstatp.com/large/39f600038907bf3b9c96',
      'https://p3.pstatp.com/large/31fa0003ed7228adf421'
    ],
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
  getUserProfile (e) {
    // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
    wx.getUserProfile({
      desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res)
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    })
  },
  getUserInfo (e) {
    // 不推荐使用getUserInfo获取用户信息，预计自2021年4月13日起，getUserInfo将不再弹出弹窗，并直接返回匿名的用户个人信息
    console.log(e)
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
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
})
