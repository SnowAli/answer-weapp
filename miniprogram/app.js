/*
 * @Description: 
 * @Author: Ali
 * @Date: 2021-04-03 19:30:56
 * @LastEditors: Ali
 * @LastEditTime: 2021-04-04 18:01:28
 */
// app.js
App({
  globalData: {
    //全局数据管理
    openid: '',
    navBarHeight: 0, // 导航栏高度
    menuBotton: 0, // 胶囊距底部间距（保持底部间距一致）
    menuRight: 0, // 胶囊距右方间距（方保持左、右间距一致）
    menuHeight: 0, // 胶囊高度（自定义内容可与胶囊高度保证一致）
  },

  onLaunch: function () {
    wx.cloud.init({
      env: 'test-0g36m7t4031c1bfe'
    })
    this.setNavBarInfo()
    this.getOpenId()
  },
 


  

  setNavBarInfo () {
    // 获取系统信息
    const systemInfo = wx.getSystemInfoSync();
    // 胶囊按钮位置信息
    const menuButtonInfo = wx.getMenuButtonBoundingClientRect();
    // 导航栏高度 = 状态栏到胶囊的间距（胶囊距上距离-状态栏高度） * 2 + 胶囊高度 + 状态栏高度
    this.globalData.navBarHeight = (menuButtonInfo.top - systemInfo.statusBarHeight) * 2 + menuButtonInfo.height + systemInfo.statusBarHeight;
    this.globalData.menuBotton = menuButtonInfo.top - systemInfo.statusBarHeight;
    this.globalData.menuRight = systemInfo.screenWidth - menuButtonInfo.right;
    this.globalData.menuHeight = menuButtonInfo.height;
  },

  getOpenId() {
    wx.cloud.callFunction({
      name: 'login',
      success:res => {
console.log(res);
      }
    })
  }

})
