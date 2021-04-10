/*
 * @Description: 
 * @Author: Ali
 * @Date: 2021-04-05 21:38:46
 * @LastEditors: Ali
 * @LastEditTime: 2021-04-10 16:22:20
 */
// pages/start/index.js
const NO_PREV_PAGE = -1
const NO_NEXT_PAGE = -2
const app = getApp();
const db = wx.cloud.database()
Page({


  data: {
    list: [],
    total: 0,
    current: 0,
    currentIndex: 0,
    swiperDuration: "0",
    time: 60,
    timer: '',
    totalTime: 0,
    totalCredit: 0,
    totalRight: 0,
    totalError: 0
  },

  requestQuestionInfo: function () {
    let questionList = []
    db.collection('question').aggregate().sample({
      size: 5
    }).end().then(res => {
      const list = res.list.map((item, index) => {
        item.index = index
        item.total = 5
        return item
      })

      this.setData({
        list: list,
        total: list.length
      })
    })



    this.setData({
      swiperDuration: '250'
    })

    // 全局记一下list, 答题卡页暂时就直接用了
    // app.globalData.questionList = questionList
  },

  startTimer () {
    this.data.timer = setInterval(() => {
      this.setData({
        time: this.data.time - 1
      })

      if (this.data.time <= 0) {
        clearInterval(this.data.timer);
      }
    }, 1000)

  },
  endTimer () {
    clearInterval(this.data.timer)
  },
  getUserProfile (e) {
    if (app.globalData.userInfo !== {}) {
      console.log(app);

    }

    wx.getUserProfile({
      desc: '用于完善会员资料',
      success: (res) => {
        console.log(res);

      }
    })
  },
  getAnswer (e) { // 答案被选中，停止计时
    const { detail: { spendTime, credit }
    } = e
    console.log(e.detail);
    this.data.totalTime += spendTime
    this.data.totalCredit += credit
    credit === 0 ? this.data.totalError++ : this.data.totalRight++
    this.endTimer()

  },
  nextQuestion () {
    this.setData({
      time: 60
    })
    this.data.timer = setInterval(() => {
      this.setData({
        time: this.data.time - 1
      })

      if (this.data.time <= 0) {
        clearInterval(this.data.timer);
      }
    }, 1000)
  },
  commitAnswer () {
    console.log('commit');
    wx.redirectTo({
      url: `/pages/checkout/index?totalCredit=${this.data.totalCredit}&totalTime=${this.data.totalTime}&total=${this.data.total}&totalRight=${this.data.totalRight}&totalError=${this.data.totalError}`
    })

  },



  onLoad: function (options) {
    wx.enableAlertBeforeUnload({
      message: "答题中,退出不保存状态噢!",
      success: (res) => {

      },
      fail: (err) => {

      },
    });
    this.setData({
      swiperHeight: wx.getSystemInfoSync().windowHeight,
    })
    this.requestQuestionInfo()
    this.startTimer()


  },

})