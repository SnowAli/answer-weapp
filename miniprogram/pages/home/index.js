/*
 * @Description: 
 * @Author: Ali
 * @Date: 2021-04-04 18:33:04
 * @LastEditors: Ali
 * @LastEditTime: 2021-04-07 23:10:48
 */
// pages/home/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hasUserInfo: false,
    userInfo: {}
  },


  onLoad: function (options) {
    // 查看是否授权
    console.log(this.data.hasUserInfo);
    console.log(this.data.userInfo);
  },


  onShareAppMessage: function () {

  },

  getUserProfile (e) {
    console.log(e);
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        console.log(res);
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
        console.log(this.data.userInfo);
      }
    })
  }
})