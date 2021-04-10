// 云函数入口文件
const cloud = require('wx-server-sdk')


cloud.init({
  env: cloud.DYNAMIC_CURRENT_ENV
})
const db = cloud.database()



exports.main = async (event, context) => {
  let rank = null
  try {

    const { data } = await db.collection('rank')
      .orderBy('totalCredit', 'desc')
      .orderBy('totalTime', 'asc')
      .get()
    rank = data
  } catch (err) {
    console.log('错误:', err);
  }


  console.log('结果:', rank);

  return rank
}