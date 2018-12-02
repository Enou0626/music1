import originJsonp from 'jsonp'

export default function jsonp(url, data, param) {
  console.log(url);
  url += (url.indexOf('?') < 0 ? "?" : "&") + packData(data);
  return new Promise((resolve, reject) => {
    originJsonp(url, param, (err, data) => {
      if (!err) {
        resolve(data)
      }
    })
  })
}

function packData(data) {
  let url = '';
  for (const key in data) {
    if (data.hasOwnProperty(key)) {
      url += `&${key}=${encodeURIComponent(data[key])}`;
    }
  }
  return url.substring(1);
}