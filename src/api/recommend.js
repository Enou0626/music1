import jsonp from "common/js/jsonp"
import { commonParams, option } from "api/config"

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