export default class Singer {
  constructor({id, name}) {
    this.id = id
    this.name = name
    this.avatar = `https://y.gtimg.cn/music/photo_new/T001R300x300M000${id}.jpg?max_age=2592000`
                  //  https://y.gtimg.cn/music/photo_new/T001R300x300M000001fNHEf1SFEFN.jpg?max_age=2592000
                  //  https://y.gtimg.cn/music/photo_new/T001R300x300M000002J4UUk29y8BY.jpg?max_age=2592000
                  //  https://y.gtimg.cn/music/photo_new/T001R300x300M0005062.jpg?max_age=2592000
                  //                                                    "002J4UUk29y8BY"
                  //                                                    "0025NhlN2yWrP4"
  }
}