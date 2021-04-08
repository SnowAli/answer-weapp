/*
 * @Description: 
 * @Author: Ali
 * @Date: 2021-04-05 21:38:46
 * @LastEditors: Ali
 * @LastEditTime: 2021-04-08 23:45:58
 */
// pages/start/item/item-index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
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

  /**
   * 组件的初始数据
   */
  data: {
    radio: '',
    timer: ''
  },

  /**
   * 组件的方法列表
   */
  onload () {
    console.log('item onload');
    console.log(this.data.item);
  },

  methods: {

    onRadioChange (e) {
      // console.log(e);
      this.setData({
        radio: e.detail,
      });
      this.triggerEvent('getAnswer', { spendTime: 60 - this.properties.time })

    },

    onRadioClick (e) {
      console.log(this);
      console.log(e);
      console.log('a');
      const { name } = e.currentTarget.dataset;
      this.setData({
        radio: name,
      });
      this.triggerEvent('getAnswer', { spendTime: 60 - this.properties.time })
    },
  }
})
