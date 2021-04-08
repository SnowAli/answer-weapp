// pages/start/index.js
const NO_PREV_PAGE = -1
const NO_NEXT_PAGE = -2
const app = getApp();
const db = wx.cloud.database()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: [],
    current: 0,
    currentIndex: 0,
    swiperDuration: "0",
    time: 60
  },

  requestQuestionInfo: function () {
    let questionList = []
    db.collection('question').aggregate().sample({
      size: 20
    }).end().then(res => {
      const list = res.list.map((item, index) => {
        item.index = index
        item.total = 20
        return item
      })

      this.setData({
        list: list
      })
      this.selectComponent('#swiper').init(0);
      app.globalData.questionList = list

      console.log(this.data.list);
    })


    // 初始化需要三步
    // 初始化setData后，需要调用swiper组件的init方法
    // this.setData({
    //   list: questionList
    // })
    // 比如上次答到了第20题
    // this.selectComponent('#swiper').init(0);
    // 初始化后再把动画弄出来，否则初始的current不是0，界面会自动跳动到当前位置，体验不太好
    this.setData({
      swiperDuration: '250'
    })

    // 全局记一下list, 答题卡页暂时就直接用了
    // app.globalData.questionList = questionList
  },

  swiperChange (e) {
    let that = this
    console.log(e.detail)
    let current = e.detail.current
    that.setData({
      currentIndex: current
    })
    if (current == NO_PREV_PAGE) {
      wx.showToast({
        title: "已经是第一题了",
        icon: "none"
      })
      return
    }

    if (current == NO_NEXT_PAGE) {
      wx.showModal({
        title: "提示",
        content: "您已经答完所有题，是否退出？",
      })
      return
    }
  },

  onClickAnswerCard: function (e) {
    let that = this
    // 因为某一项不一定是在当前项的左侧还是右侧
    // 跳转前将动画去除，以免点击某选项回来后切换的体验很奇怪
    that.setData({
      swiperDuration: "0"
    })
    wx.navigateTo({
      url: '../../pages/answer_card/index'
    })
  },

  onClickLast: function (e) {
    let that = this
    if (that.data.currentIndex - 1 < 0) {
      return
    }
    that.setData({
      current: that.data.currentIndex - 1
    })
  },

  onClickNext: function (e) {
    let that = this
    if (that.data.currentIndex + 1 > that.data.list.length - 1) {
      return
    }
    that.setData({
      current: that.data.currentIndex + 1
    })
  },

  startTimer () {
    let timer = setInterval(() => {
      this.setData({
        time: this.data.time - 1
      })

      if (this.data.time <= 0) {
        clearInterval(timer);
      }
    }, 1000)

  },
  getAnswer (e) {
    console.log(e);
  },


  onLoad: function (options) {

    this.setData({
      swiperHeight: wx.getSystemInfoSync().windowHeight,
    })
    this.requestQuestionInfo()
    this.startTimer()
  },

})