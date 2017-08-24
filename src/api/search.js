import jsonp from "../common/myjs/myjsonp.js"
import { commendParams, options } from "./config"
import axios from "axios"
export function getHot() {
    const url = "https://c.y.qq.com/splcloud/fcgi-bin/gethotkey.fcg";
    const data = Object.assign({}, commendParams, {
        format: 'json',
        inCharset: 'utf-8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'h5',
        needNewCode: 1
    })
    return jsonp(url, data, options)
}

export function getSearchData(val, num = 1, perpage) {
    const url = 'https://c.y.qq.com/soso/fcgi-bin/search_for_qq_cp';
    const data = Object.assign({}, commendParams, {
        uin: 0,
        format: 'jsonp',
        platform: 'h5',
        needNewCode: 1,
        w: val,
        zhidaqu: 1,
        catZhida: 1,
        t: 0,
        flag: 1,
        ie: 'utf - 8',
        sem: 1,
        aggr: 0,
        perpage,
        n: 20,
        p: num,
        remoteplace: 'txt.mqq.all'
    })
    return jsonp(url, data, options)
}