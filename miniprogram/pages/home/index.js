/*
 * @Description: 
 * @Author: Ali
 * @Date: 2021-04-04 18:33:04
 * @LastEditors: Ali
 * @LastEditTime: 2021-04-11 22:28:14
 */
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasUserInfo: false,
    userInfo: null
  },


  onLoad: function (options) {
    // 查看是否授权

  },
  onShow: function (options) {
    console.log(this.data.userInfo);
    const { globalData: { userInfo } } = app
    if (userInfo) {
      this.setData({
        userInfo: userInfo
      })
    }
  },


  onShareAppMessage: function () {

  },

  getUserProfile (e) {
    console.log(e);
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res);
        app.globalData.userInfo = res.userInfo
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        console.log(this.data.userInfo);
      }
    })
  }
})