import jsonp from "../common/myjs/myjsonp.js"
import {commendParams,options} from "./config"

export function getRank(){
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg'
  const o = Object.assign({},commendParams,{
    uin: 0,
    needNewCode: 1,
    platform: 'h5'
  })
  return jsonp(url,o,options)
}

export function getMusicList(id){
  console.log(id)
  const url = 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_toplist_cp.fcg'
  const o = Object.assign({},commendParams,{
    uin:0,
    format:'json',
    platform:'h5',
    needNewCode:1,
    tpl:3,
    page:'detail',
    type:'top',
    topid:id
  })
  return jsonp(url,o,options)
}
