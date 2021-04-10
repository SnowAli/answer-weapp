/*
 * @Description: 
 * @Author: Ali
 * @Date: 2021-04-04 23:09:47
 * @LastEditors: Ali
 * @LastEditTime: 2021-04-10 20:39:23
 */

Page({


  data: {
    rank: []
  },

  onLoad: function (options) {

    this.getRank()
  },

  getRank () {

    console.log('getRant page');
    wx.cloud.callFunction({
      name: 'getRank',

    }).then(res => {
      const {result} = res
      this.setData({
        rank: result
      })
      console.log(result);
    
    }).catch(err => {
      console.log(err);
    })


  }
})