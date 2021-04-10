const app = getApp()
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    total: 0,
    totalTime: 0,
    totalCredit: 0,
    totalRight: 0,
    totalError: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */

  onLoad: function (options) {
    console.log('分享进入', options);
    const { total, totalTime, totalCredit, totalRight, totalError } = options
    this.setData({
      total: total,
      totalTime: totalTime,
      totalCredit: totalCredit,
      totalRight: totalRight,
      totalError: totalError
    })

    this.insertResult()





  },

  onShareAppMessage: () => {
    return {
      title: '？在, 你还不做题',
      path: '/pages/index/index?isShare=true',
      imageUrl: '' // 图片 URL
    }
  },

  async insertResult () {
    try {

      console.log(app);
      const { avatarUrl, nickName } = app.globalData.userInfo
      const openId = app.globalData.openId

      const res = await db.collection('rank').add({

        data: {
          openId: openId,
          avatarUrl: avatarUrl,
          nickName: nickName,
          totalCredit: this.data.totalCredit,
          totalTime: this.data.totalTime
        }

      })
      console.log(res);
    } catch (err) {
      console.log(err);
    }


  }



})