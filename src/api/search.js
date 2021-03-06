import jsonp from 'common/js/jsonp'
import { commonParams, option } from './config'
import { get } from 'axios'

export function getHotKey() {
  const url = 'https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg'

  const data = Object.assign({}, commonParams, {
    uin: 0,
    needNewCode: 1,
    platform: 'h5'
  })

  return jsonp(url, data, option)
}

export function search(query, page, zhida, perpage) {
  const url = '/api/search'

  const data = Object.assign({}, {
    w: query,
    p: page,
    perpage,
    n: perpage,
    catZhida: zhida ? 1 : 0,
    zhidaqu: 1,
    t: 0,
    flag: 1,
    ie: 'utf-8',
    sem: 1,
    aggr: 0,
    remoteplace: 'txt.mqq.all',
    uin: 0,
    needNewCode: 1,
    platform: 'h5',
    format: 'json'
  })

  return get(url, {
    // headers: {
    //   referer: 'https://c.y.qq.com/',
    //   host: 'c.y.qq.com'
    // },
    params: data
  }).then((res) => {
    return Promise.resolve(res)
  })
}
