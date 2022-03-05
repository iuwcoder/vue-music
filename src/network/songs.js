import axios from 'axios'

export function request(config) {
  // 创建一个 axios 对象
  const instance = axios.create({
      // 根路径
      baseURL: 'http://82.157.162.92:8008/music',
      timeout: 5000,
  })
  return instance(config)
}

// 获取音乐url
export function playSong(id){
  return request({
      url: '/getMusic',
      params:{
          id
      }
  })
}



