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
// export class PlayList {
//     constructor(playlist) {
//         this.id = playlist.id 
//         this.name = playlist.name //歌单名称
//         this.img = playlist.coverImgUrl //歌单图片
//         this.playCount = playlist.playCount //创建歌单数量
//         this.trackCount = playlist.trackCount //收藏歌单数量
//         // this.nickname = playlist.creator.nickname
//     }
// }

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