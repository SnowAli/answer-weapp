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

    this.drawWall()



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


  },

  drawWall () {
    const query = wx.createSelectorQuery()
    query.select('#wall')
      .fields({ node: true, size: true })
      .exec((res) => {
        const { width, height } = res[0]
        const canvas = res[0].node
        const ctx = canvas.getContext('2d')

        const dpr = wx.getSystemInfoSync().pixelRatio
        const r = 3 * dpr
        canvas.width = width
        canvas.height = height
        for (var i = r * 2; i < width - r; i += r * 4) {
          this.drawSawtooth(ctx, i, height, r, 0);
        }
      })
  },

  drawSawtooth (ctx, x, y, r, d) {
    //d:方向
    ctx.fillStyle = "#fff";
    ctx.beginPath();
    if (d == 1) {
      ctx.arc(x, y, r, Math.PI, 0, true);
    } else {
      ctx.arc(x, y, r, 0, Math.PI, true);
    }
    ctx.closePath();
    ctx.fill();
  }



})