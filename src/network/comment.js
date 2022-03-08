import {
  request
} from "./request";

// 评论
export function getComment(id, type, sortType, pageNo, pageSize) {
  return request({
    url: '/comment/new',
    params: {
      id,
      type, // 0.歌曲  1.mv  2.歌单  3.专辑  4.电台  5.视频  6.动态
      pageNo, // 分页 默认1
      pageSize, //  分页条数 默认20
      sortType, // 排序方式  1.推荐  2.热度  3.时间
      // cursor //当sortType为 3 时且页数不是第一页时需传入,值为上一条数据的 time
    }
  })
}

// 评论点赞
export function likeComment(id, cid, t, type, token) {
  return request({
      url: '/comment/like',
      params: {
          id, 
          cid, 
          t, 
          type,
          token
      }
  })
}

// 发表评论
export function getAddComment(t, type, id, content, cookie, commentId) {
  return request({
      url: '/comment',
      params: {
          t,  // 0.删除  1.发表  2.回复
          type,
          id,
          content,
          cookie,
          commentId
      }
  })
}

// 删除评论
export function getDComment(t, type, threadId, content, cookie) {
  return request({
      url: '/comment',
      params: {
          t,
          type,
          threadId,
          content,
          cookie
      }
  })
}

