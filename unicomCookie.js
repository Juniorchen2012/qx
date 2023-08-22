const cookieName = '中国联通'
const tokenurlKey = 'chavy_tokenurl_10010'
const tokenheaderKey = 'chavy_tokenheader_10010'
const signurlKey = 'chavy_signurl_10010'
const signheaderKey = 'chavy_signheader_10010'
const loginlotteryurlKey = 'chavy_loginlotteryurl_10010'
const loginlotteryheaderKey = 'chavy_loginlotteryheader_10010'
const findlotteryurlKey = 'chavy_findlotteryurl_10010'
const findlotteryheaderKey = 'chavy_findlotteryheader_10010'
const chavy = init()
if ($request && $request.method != 'OPTIONS' && $request.url.indexOf('mobileserviceimportant') >= 0) {
  chavy.msg(cookieName, `获取中...`, ``)
  const tokenurlVal = $request.url
  const tokenheaderVal = JSON.stringify($request.headers)
  if (tokenurlVal) chavy.setdata(tokenurlVal, tokenurlKey)
  if (tokenheaderVal) chavy.setdata(tokenheaderVal, tokenheaderKey)
  chavy.msg(cookieName, `中国联通:获取cookie: 成功`, ``)
  chavy.done()
}
if ($request && $request.method != 'OPTIONS' && $request.url.indexOf('queryUserInfoSeven') >= 0) {
  const tokenheaderVal = JSON.stringify($request.headers)
  const cookie = chavy.getdata(tokenheaderKey)
  if(cookie && $request.headers.fromScriptable) {
    chavy.msg(cookieName, `来自scriptable...`, ``)
    var modifiedHeaders = $request.headers;
    modifiedHeaders['cookie'] = cookie;
    $done({headers : modifiedHeaders});
  }
}

function init() {
  isSurge = () => {
    return undefined === this.$httpClient ? false : true
  }
  isQuanX = () => {
    return undefined === this.$task ? false : true
  }
  getdata = (key) => {
    if (isSurge()) return $persistentStore.read(key)
    if (isQuanX()) return $prefs.valueForKey(key)
  }
  setdata = (key, val) => {
    if (isSurge()) return $persistentStore.write(key, val)
    if (isQuanX()) return $prefs.setValueForKey(key, val)
  }
  msg = (title, subtitle, body) => {
    if (isSurge()) $notification.post(title, subtitle, body)
    if (isQuanX()) $notify(title, subtitle, body)
  }
  log = (message) => console.log(message)
  get = (url, cb) => {
    if (isSurge()) {
      $httpClient.get(url, cb)
    }
    if (isQuanX()) {
      url.method = 'GET'
      $task.fetch(url).then((resp) => cb(null, {}, resp.body))
    }
  }
  post = (url, cb) => {
    if (isSurge()) {
      $httpClient.post(url, cb)
    }
    if (isQuanX()) {
      url.method = 'POST'
      $task.fetch(url).then((resp) => cb(null, {}, resp.body))
    }
  }
  done = (value = {}) => {
    $done(value)
  }
  return { isSurge, isQuanX, msg, log, getdata, setdata, get, post, done }
}
