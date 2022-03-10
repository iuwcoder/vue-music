import {
  request
} from "./request";

// 新建歌单
export function getCreateSheet(name, privacy, type, cookie) {
  return request({
    url: '/playlist/create',
    params: {
      name,
      privacy, // 隐私歌单，默认否，10隐私歌单
      type, //歌单类型,默认'NORMAL',传 'VIDEO'则为视频歌单,传 'SHARED'则为共享歌单
      cookie
    }
  })
}

// 删除歌单
export function getDeletSheet(id) {
  return request({
    url: '/playlist/delete',
    params: {
      id
    }
  })
}

// 收藏/取消收藏 歌单
export function getSubSheet(id, t) {
  return request({
    url: '/playlist/subscribe',
    params: {
      id,
      t // 类型 1:收藏 2:取消收藏 
    }
  })
}

// 对歌单添加或删除歌曲
export function getTracksSheet(op, pid, tracks) {
  return request({
    url: '/playlist/tracks',
    params: {
      op, //增加 add, 删除为 del
      pid, //歌单id
      tracks, //歌曲id
    }
  })
}