import moment from 'moment';

moment.locale('zh-cn');

// 格式化时间 
export function formatDate(datetime, type) {
  return moment(datetime).format(type);
}

// 获取年(years)、月(months)、日(days)、周(weeks)的上n个时间
export function lastDate(number, mdate, type) {
  return moment().subtract(number, mdate).format(type)
}

// 获取当前 年(YYYY) 月(MM) 日(DD) 
export function getDate(type) {
  return parseInt(moment().format(type))
}

export function delay(time) {
  return new Promise(function(resolve, reject) {
    window.setTimeout(function() {
      resolve(time)
    }, time)
  })
}

export function random(low, high) {
  if (arguments.length === 1) {
    high = low
    low = 0
  }
  return Math.floor(low + Math.random() * (high - low))
}

export function randomOne(arr) {
  return arr[random(0, arr.length)]
}

export function kebabCase(s) {
  return s.replace(/[A-Z]/g, function($0) {
    return '-' + $0.toLowerCase()
  })
}

export function forIn(obj, fn) {
  obj = obj || {}
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      fn.call(obj, obj[key], key, obj)
    }
  }
}

export function isEmpty(obj) {
  //typeof
  if (typeof obj == 'undefined' || obj == null || obj == '') {
    return true
  } else if (typeof obj == 'object' && Object.keys(obj).length == 0) {
    return true
  } else if (typeof obj == 'array' && obj.length == 0) {
    return true
  } else {
    return false
  }
}

//从当前月往前推n个月
export function calcNMonths(n) {
  const data = new Date()
  data.setMonth(data.getMonth() + 1, 1)
  const months = []
  for (let i = 0; i < n; i++) {
    data.setMonth(data.getMonth() - 1)
    const month = data.getMonth() + 1
    const formatMonth = month < 10 ? `0${month}` : month
    const item = {
      value: data.getFullYear() + '-' + formatMonth,
      text: data.getFullYear() + '年' + formatMonth + '月'
    }
    months.push(item)
  }
  return months;
}

export function noop() {}

/**
 * 将形如url?(page=1&sort=4)param转换为{page:'1',sort:'4'}
 * [param2Obj description]
 * @param  {String} url 
 * @return {jsonString}   
 */
export function param2Obj(url) {
  const search = url.split('?')[1]
  if (!search) return {}
  return JSON.parse('{"' + decodeURIComponent(search).replace(/"/g, '\\"').replace(/&/g, '","').replace(/=/g, '":"') + '"}')
}

/**
 * 将形如{page:'1',sort:'4'}JSON转换为(page=1&sort=4)param
 * [obj2Param description]
 * @param  {Object} json 
 * @return {String}    
 */
export function obj2Param(json) {
  if (!json) return ''
  return Object.keys(json).map(key => {
    if (json[key] === undefined) return ''
    return encodeURIComponent(key) + '=' +
      encodeURIComponent(json[key])
  }).join('&')
}