/**
 * Created by guorong on 2017/7/21.
 */

import Myjsonp from "jsonp"
function playlistinfoCallback(a){
  console.log(a)
}
export default function jsonp(url,data,option){
  url += (url.indexOf("?") == "-1" ? "?" : "&") + param(data)
  return new Promise((reslove,reject)=>{
    Myjsonp(url,option,(err,data)=>{
      if(!err){
        reslove(data)
      }else{
        reject(err)
      }
    })
  })
}
function param(data){
  let url=""
  for(var i in data){
    let val =  data[i] !==undefined ? data[i] : "";
    url += `&${i}=${encodeURIComponent(val)}`
  }
  return url ? url.substring(1) : ""
}
