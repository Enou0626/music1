class Song {
  constructor({ id, mid, singer, name, album, duration, image, url, songmid }) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.duration = duration
    this.image = image
    this.url = url
    this.songmid = songmid
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
    // url: songUrl,
    songmid: musicData.songmid,
    url: `https://api.bzqll.com/music/tencent/url?key=579621905&id=${musicData.songmid}&br=320`
  });
}
// const songUrl = 'http://dl.stream.qqmusic.qq.com/C400003OUlho2HcRHC.m4a?guid=7673951776&vkey=5036C0B9B0910422E9B46A3D1CD2CCA46A8E1FC063E6D590B6F61E43447526E20FC6E693928B52C222D6DCE4FD1BEF96C9D5F5470C77123B&uin=2506&fromtag=66'
function filterSinger(singerArr) {
  let retArr = singerArr.map(singer => {
    return singer.name
  }).join('/');

  return retArr;
}