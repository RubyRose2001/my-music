import jsonp from "../common/myjs/myjsonp.js"
import { commendParams, options } from "./config"
import axios from "axios"
export function getRecommend() {
    const url = "https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg";
    const data = Object.assign({}, commendParams, {
        platform: 'h5',
        uin: 0,
        needNewCode: 1
    })
    return jsonp(url, data, options)
}
export function getList() {
    const url = "/api/getList";
    const data = Object.assign({}, commendParams, {
        rnd: Math.random(),
        platform: 'yqq',
        notice: 0,
        needNewCode: 1,
        categoryId: 10000000,
        sortId: 5,
        sin: 0,
        ein: 29,
        format: "json"
    })
    return axios.get(url, {
        params: data
    }).then((res) => {
        return res.data
    })
}

export function getDisc(disstid) {
    const url = 'https://c.y.qq.com/qzone/fcg-bin/fcg_ucc_getcdinfo_byids_cp.fcg'
    const data = Object.assign({}, commendParams, {
        type: 1,
        json: 1,
        utf8: 1,
        onlysong: 0,
        disstid,
        format: 'jsonp',
        g_tk: 5381,
        loginUin: 0,
        hostUin: 0,
        format: 'jsonp',
        inCharset: 'utf8',
        outCharset: 'utf-8',
        notice: 0,
        platform: 'yqq',
        needNewCode: 0
    })
    return jsonp(url, data, options)
}