/*
 * @Description: 
 * @Author: Ali
 * @Date: 2021-04-09 22:46:00
 * @LastEditors: Ali
 * @LastEditTime: 2021-04-10 12:57:29
 */
// pages/start-swiper/index.js
const app = getApp();

Component({
  properties: {
    swiperHeight: {
      type: Number,
      value: 0
    },
    list: {
      type: Array,
      value: []
    },
    time: {
      type: Number,
      value: 0
    },
    current: {
      type: Number,
      value: 0
    },
    // 值为0禁止切换动画
    swiperDuration: {
      type: String,
      value: "250"
    },
    // 分页需要传此数据
    total: {
      type: Number,
      value: 0
    }
  },
  attached () {
    console.log(this.properties);
  },


  data: {
    list: '',
    current: 0,
    // 值为0禁止切换动画
    swiperDuration: "250",
    currentIndex: 0,

    // 判断是否能点击下一题
    hasNext: false,
    hasCommit: false
  },

  methods: {
    swiperChange (e) {
      let that = this
      console.log(e.detail)
      let current = e.detail.current
      that.setData({
        currentIndex: current
      })
      if (current == -1) {
        wx.showToast({
          title: "已经是第一题了",
          icon: "none"
        })
        return
      }
      console.log(this.properties.total);
      if (current == this.properties.total) {
        wx.showModal({
          title: "提示",
          content: "您已经答完所有题，是否退出？",
        })
        return
      }
    },
    onClickAnswerCard: function (e) {
      let that = this;
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
      console.log(this.properties);
      let that = this

      if (that.data.currentIndex + 1 > that.data.list.length - 1) {
        wx.showModal({
          title: "提示",
          content: "您已经答完所有题，是否提交？",
          success: (res) => {
            this.triggerEvent('commitAnswer')
          }
        })
        return
      }
      that.setData({
        current: that.data.currentIndex + 1
      })
      this.setData({
        hasNext: false
      })

      // 像父组件告知用户点击了下一题
      this.triggerEvent('nextQuestion')
    },
    catchTouchMove () {
      return false;
    },


    getAnswer (e) {
      // console.log(e);
      this.triggerEvent('getAnswer', {
        spendTime: e.detail.spendTime,
        credit: e.detail.credit
      })
      if (this.properties.total - 1 === this.properties.current) {
        console.log('wanl');
        this.setData({
          hasCommit: true
        })
        return
      }
      this.setData({
        hasNext: true
      })
    },
  }






})