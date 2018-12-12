import jsonp from "common/js/jsonp"
import { commonParams, option } from "api/config"
import axios from 'axios'

export function getRecommend() {
    const url = 'https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg'

    const p = {
        platform: 'h5',
        uin: 0,
        needNewCode: 1
    }
    let data = { ...commonParams, ...p }

    return jsonp(url, data, option)
}
export function getDisclist() {
    const url = '/api/getDisclist'
    const data = Object.assign({}, commonParams, {
        platform: 'yqq',
        hostUin: 0,
        sin: 0,
        ein: 29,
        uin: 0,
        sortId: 5,
        needNewCode: 0,
        categoryId: 10000000,
        rnd: Math.random(),
        format: 'json'

    })
    return axios.get(url, {
        params: data
    }).then((res) => {
        return Promise.resolve(res.data)
    })
}