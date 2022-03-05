import moment from 'moment'

// 过滤器  pattern 时间格式
const getTime = (val, format = 'YYYY-MM-DD') => {
  if (!isNaN(val)) {
    val = parseInt(val)
  }
  return moment(val).format(format)
}

// 时间转换
const mvTime = (time) => {
  return (time / 1000 / 60 <= 9 ? '0' + Math.floor(time / 1000 / 60) :  Math.floor(time / 1000 / 60)) + ':' + (time / 1000 % 60 <= 9 ? '0' + time / 1000 % 60 : time / 1000 % 60)
}
const videoTime = (time) => {
  let min = (Math.floor(time / 60) + '').padStart(2, '0');  // 分钟
  let second = (time - (60 * min) + '').padStart(2, '0');  // 秒数
  return min+':'+second
}



export default app => {
	app.config.globalProperties.$filters = {
		getTime,
    mvTime,
    videoTime
	}
}
