/*
 * @Description: 
 * @Author: Ali
 * @Date: 2021-04-04 17:22:49
 * @LastEditors: Ali
 * @LastEditTime: 2021-04-04 17:43:33
 */
// components/navigation/index.js
const app = getApp()
Component({
  /**
   * 组件的初始数据
   */
  data: {
    navBarHeight: app.globalData.navBarHeight, //导航栏高度
    menuRight: app.globalData.menuRight, // 胶囊距右方间距（方保持左、右间距一致）
    menuBotton: app.globalData.menuBotton,
    menuHeight: app.globalData.menuHeight
  }
})
