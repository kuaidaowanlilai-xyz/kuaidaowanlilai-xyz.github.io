/**
 * 将时间戳转换成日期形式
 * @param {Number} timeStamp 时间戳
 * @param {String} type 输出的日期格式 yyyy-MM-dd HH:mm:ss
 */
const formatDate = (timeStamp, type) => { 
  let time = new Date(timeStamp)
  let year = time.getFullYear() //取得4位数的年份
  let month = time.getMonth()+1 //取得日期中的月份，其中0表示1月，11表示12月
  let monthB = time.getMonth()+1 < 10 ? '0' + (time.getMonth()+1) : time.getMonth()+1 //取得日期中的月份，其中0表示1月，11表示12月（补0）
  let date = time.getDate() //返回日期月份中的天数（1到31）
  let dateB = time.getDate() < 10 ? '0' + time.getDate() : time.getDate() //返回日期月份中的天数（01到31）
  let hour = time.getHours() //返回日期中的小时数（0到23）
  let hourB = time.getHours() < 10 ? '0' + time.getHours() : time.getHours() //返回日期中的小时数（00到23）
  let minute = time.getMinutes() //返回日期中的分钟数（0到59）
  let minuteB = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes() //返回日期中的分钟数（00到59）
  let second = time.getSeconds() //返回日期中的秒数（0到59）
  let secondB = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds() //返回日期中的秒数（00到59）
  if(type){
    return type.replace(/y{4}/g, year)
                .replace(/M{2}/g, monthB)
                .replace(/d{2}/g, dateB)
                .replace(/H{2}/g, hourB)
                .replace(/m{2}/g, minuteB)
                .replace(/s{2}/g, secondB)
                .replace(/M/g, month)
                .replace(/d/g, date)
                .replace(/H/g, hour)
                .replace(/m/g, minute)
                .replace(/s/g, second)
  }else{
    return `${year}-${month}-${date}`
  }
}