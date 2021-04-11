/*
 * @Description: 
 * @Author: Ali
 * @Date: 2021-04-10 20:54:23
 * @LastEditors: Ali
 * @LastEditTime: 2021-04-11 19:21:52
 */
// 云函数入口文件
const cloud = require('wx-server-sdk')


cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()



exports.main = async (event, context) => {
  let rank = null
  try {
    const { num, page } = event

    const { data } = await db.collection('rank')
      .orderBy('totalCredit', 'desc')
      .orderBy('totalTime', 'asc').skip(page).limit(num)
      .get()
    rank = data
  } catch (err) {
    console.log('错误:', err);
  }


  console.log('结果:', rank);

  return rank
}