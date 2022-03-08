import {
  request
} from "./request";

// 专辑信息
export function getAblum(id) {
  return request({
    url: '/album',
    params: {
      id
    }
  })
}

// 专辑数据
export function getAlbumDetail(id) {
  return request({
    url: '/album/detail/dynamic',
    params: {
      id
    }
  })
}