Date.prototype.format = function (fmt) {
  var o = {
    'M+': this.getMonth() + 1, // 月份
    'd+': this.getDate(), // 日
    'h+': this.getHours(), // 小时
    'm+': this.getMinutes(), // 分
    's+': this.getSeconds(), // 秒
    'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
    'S': this.getMilliseconds() // 毫秒
  }
  if (/(y+)/.test(fmt)) { fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length)) }
  for (var k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) { fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length))) }
  }
  return fmt
}

export function parseUrl (url) {
  let obj = {}
  if (url.includes('?')) {
    let paramString = url.split('?')[1]
    if (paramString.includes('&')) {
      let paramArray = paramString.split('&')
      for (let param in paramArray) {
        let keyvalue = paramArray[param].split('=')
        let key = keyvalue[0]
        let value = keyvalue[1]
        obj[key] = value
      }
    } else {
      let keyvalue = paramString.split('=')
      let key = keyvalue[0]
      let value = keyvalue[1]
      obj[key] = value
    }
  }
  return obj
}

Date.prototype.getAgoDate = function (type, number) {
  switch (type) {
    case 'day': this.setDate(this.getDate() - Number(number)); break
    case 'month': this.setMonth(this.getMonth() - Number(number)); break
    case 'year': this.setFullYear(this.getFullYear() - Number(number)); break
  }
  return this
}

Date.prototype.startTime = function (type, number) {
  return new Date(this.getAgoDate(type, number).toLocaleDateString()).getTime()
}

Date.prototype.endTime = function (type, number) {
  return new Date(this.getAgoDate(type, number).toLocaleDateString()).getTime() + 86400000 - 1
}

Date.prototype.getFirstDayInMonth = function () {
  this.setDate(1)
  return this
}
