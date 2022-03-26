import {
    request
} from './request'

// 获取用户基本信息
export function getUserDetail(uid) {
    return request({
        url: '/user/detail',
        params: {
            uid
        }
    })
}

// 获取用户详细信息
export function getUserSubcount() {
    return request({
        url: '/user/subcount'
    })
}

// 获取用户歌单
export function getUserPlayList(uid) {
    return request({
        url: '/user/playlist',
        params: {
            uid
        }
    })
}

// 获取用户关注
export function getUserFollows(uid) {
    return request({
        url: '/user/follows',
        params: {
            uid
        }
    })
}

export function getSongs() {
    return request({
        url: '/recommend/songs'
    })
}

// 获取用户绑定信息
export function getBinding(uid) {
    return request({
        url: '/user/binding',
        params: {
            uid
        }
    })
}

// 获取用户动态
export function getUserEvent(uid, limit, lasttime) {
    return request({
        url: '/user/event',
        params: {
            uid,
            limit,
            lasttime
        }
    })
}

// 获取用户粉丝
export function getUserFans(uid, limit, lasttime) {
    return request({
        url: '/user/followeds',
        params: {
            uid,
            limit,
            lasttime
        }
    })
}