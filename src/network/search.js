import {request} from './request'

// 搜索结果
export function searchResult(keywords, limit, offset, type){
  return request({
      url: '/search',
      params: {
          keywords,
          limit,
          offset, 
          type
      }
  })
}

// 热搜榜简略
export function getSearchHot(){
  return request({
      url: '/search/hot'
  })
}

// 热搜榜详情
export function getHotDetail(){
  return request({
      url: '/search/hot/detail'
  })
}