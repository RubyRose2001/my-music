
import jsonp from "../common/myjs/myjsonp.js"
import {commendParams,options} from "./config"

export function getSinger(){
  const url="https://c.y.qq.com/v8/fcg-bin/v8.fcg";
  const data=Object.assign({},commendParams,{
    channel:"singer",
    page:"list",
    key:"all_all_all",
    pagesize:100,
    pagenum:1,
    loginUin:0,
    hostUin:0,
    notice:0,
    platform:"yqq",
    needNewCode:0
  })
  return jsonp(url,data,options)
}
export function getSingerDetail(songId){
  const url="https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg";
  const data = Object.assign({},commendParams, {
    hostUin: 0,
    needNewCode: 0,
    platform: 'yqq',
    order: 'listen',
    begin: 0,
    num: 80,
    songstatus: 1,
    singermid: songId
  })
  return jsonp(url,data,options)
}
