import {commendParams} from "./config"
import axios from 'axios'

export function lyric(id){
  let url = '/api/lyric'
  console.log(id)
  let options = Object.assign({
    songmid: id,
    platform: 'yqq',
    hostUin: 0,
    needNewCode: 0,
    categoryId: 10000000,
    pcachetime: +new Date(),
    format: 'json'
  },commendParams)
  return axios.get(url,{
    params:options
  }).then(function(res){
     return Promise.resolve(res.data)
  },function(err){
    return err.data
  })
}
