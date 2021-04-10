/*
 * @Description: 
 * @Author: Ali
 * @Date: 2021-04-03 19:30:56
 * @LastEditors: Ali
 * @LastEditTime: 2021-04-10 22:12:55
 */
// app.js
App({
  globalData: {
    //全局数据管理
    openid: '',
    hasUserInfo: false,
    userInfo: null,
    navBarHeight: 0, // 导航栏高度
    menuBotton: 0, // 胶囊距底部间距（保持底部间距一致）
    menuRight: 0, // 胶囊距右方间距（方保持左、右间距一致）
    menuHeight: 0, // 胶囊高度（自定义内容可与胶囊高度保证一致）
  },

  onLaunch: function (options) {
    console.log(1111, options);
    // console.log('场景值,', wx.getLaunchOptionsSync());
    wx.cloud.init({
      env: 'test-0g36m7t4031c1bfe'
    })
    this.setNavBarInfo()
    this.getOpenId()
  },





  setNavBarInfo () {
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;  
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
      }
    })


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

  getOpenId () {
    wx.cloud.callFunction({
      name: 'login',
      success: res => {
        const { result: { openId }
        } = res
        this.globalData.openId = openId
      }
    })
  }

})
