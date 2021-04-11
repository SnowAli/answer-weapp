/*
 * @Description: 
 * @Author: Ali
 * @Date: 2021-04-04 23:09:47
 * @LastEditors: Ali
 * @LastEditTime: 2021-04-11 20:00:43
 */

Page({


  data: {
    rank: []
  },

  onLoad: function (options) {

    this.getRank(30, 0)
  },

  getRank (num, page) {

    console.log('getRant page');
    wx.cloud.callFunction({
      name: 'getRank',
      data: {
        num: num,    //用来记录每次获取数据的数量
        page: page,  //每次从page条数据之后获取数据
      }

    }).then(res => {
      const { result } = res
      const newRank = this.data.rank.concat(result)

      this.setData({
        rank: newRank
      })


    }).catch(err => {
      console.log(err);
    })


  }

  ,
  onReachBottom () {
    wx.showLoading({
      title: '加载中...',
      mask: true
    })

    const page = this.data.rank.length
    this.getRank(30, page)

    wx.hideLoading()
  },


})