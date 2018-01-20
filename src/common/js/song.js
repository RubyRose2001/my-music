import {lyric} from '../../api/lyric'
import {ERR_OK} from '../../api/config'
import {Base64} from 'js-base64'

export default class Song{
  constructor({id, mid, singer, name, album, duration, image, url}){
    this.id=id
    this.mid=mid
    this.singer=singer
    this.name=name
    this.album=album
    this.duration=duration
    this.image=image
    this.url=url
  }
  getlyric(){
   if(this.lyric){
     return Promise.resolve(this.lyric)
   }
   return new Promise((resolve,reject) => {
     lyric(this.mid).then(res=>{
      if (res.retcode == 0) {
        this.lyric = Base64.decode(res.lyric)
        resolve(this.lyric)
      } else {
        reject('no lyric')
      }
    })
   })
  }
}
export function createSong(songData){
  return new Song({
    id: songData.songid,
    mid: songData.songmid,
    singer: filterSinger(songData.singer),
    name: songData.songname,
    album: songData.albumname,
    duration: songData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${songData.albummid}.jpg?max_age=2592000`,
    url: `http://isure.stream.qqmusic.qq.com/C100${songData.songmid}.m4a?fromtag=32`
  })
}

function filterSinger(data){
  let ret = []
  if(!data){
    return ""
  }
  data.forEach((v,i)=>{
    ret.push(v.name)
  })
  return ret.join("/")
}
