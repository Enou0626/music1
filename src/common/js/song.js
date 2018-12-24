class Song {
  constructor({ id, mid, singer, name, album, duration, image, url }) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
  }
}
export function creatSong(musicData) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    duration: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    url: songUrl
    // url: `http://dl.stream.qqmusic.qq.com/${musicData.songmid}.m4a?fromtag=66`
  });
}
const songUrl = "http://dl.stream.qqmusic.qq.com/C400001TXSYu1Gwuwv.m4a?guid=7673951776&vkey=ED87641D514EFB2293E7183FFC548F3078119A942605A0A58CC32B06623997C0C374354A91F69C44B7BC87529DD8BB32F372738CE6CD790F&uin=2506&fromtag=66"

function filterSinger(singerArr) {
  let retArr = singerArr.map(singer => {
    return singer.name
  }).join('/');

  return retArr;
}