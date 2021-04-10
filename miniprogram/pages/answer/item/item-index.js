/*
 * @Description: 
 * @Author: Ali
 * @Date: 2021-04-05 21:38:46
 * @LastEditors: Ali
 * @LastEditTime: 2021-04-10 12:58:21
 */
// pages/start/item/item-index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    index: {
      type: Number,
      value: 0
    },
    currentIndex: {
      type: Number,
      value: 0
    },
    total: {
      type: Number,
      value: 0
    },
    item: {
      type: Object,
      value: null
    },

    swiperHeight: {
      type: Number,
      value: 0
    },
    time: {
      type: Number,
      value: 0
    }
  },


  data: {
    radio: '',
    answer: '',
    points: 0, // 分值
    result: '',
    options: [] // 题目可能的选项
  },


  observers: {
    'item': function (nv) { // 当题目更新，radio必须置空，否则上一题的选项会保留 
      const options = nv.options

      options.forEach(item => {
        this.data.options.push(item.label);
      });

      this.setData({
        radio: '',
        points: 100 / this.properties.total,
        answer: nv.answer
      })
    },
    'time': function (nv) {
      if (nv === 60) {
        this.setData({
          radio: ''
        })
      }
      if (nv === 0) {
        let isAnswer = "item.isAnswer"
        if (this.properties.index !== this.properties.currentIndex) {
          return
        }
        this.setData({
          radio: 'none',
          [isAnswer]: true,
          result: `答题超时。正确答案是${this.data.answer}`
        })

        this.triggerEvent('getAnswer', { spendTime: 60 - this.properties.time, credit: 0 })
      }
    }
  },
  methods: {

    onRadioChange (e) {
      const radio = e.datail
      if (this.data.item.isAnswer) {
        return
      }
      this.getAnswer(radio)


    },

    onRadioClick (e) {

      if (this.data.item.isAnswer) {
        return
      }


      const { name: radio } = e.currentTarget.dataset;
      this.getAnswer(radio)
    },

    getAnswer (radio) {

      let isAnswer = "item.isAnswer"

      this.setData({
        radio: radio,
        [isAnswer]: true // 该题已被回答
      });
      let result = this.data.radio === this.data.answer
      console.log(this.data);
      let credit = result ? this.data.points : 0
      this.triggerEvent('getAnswer', {
        spendTime: 60 - this.properties.time,
        credit: credit
      })
      if (result) {
        this.setData({
          result: '答对了'
        })
      } else {
        this.setData({
          result: `答错了，正确答案是${this.data.answer}`
        })
      }
    }


  }
})
