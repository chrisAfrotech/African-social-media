export default ({ store, next, to }) => {
  function getCookieValueByName (value) {
    let match = document.cookie.match(new RegExp('(^| )' + value + '=([^;]+)'))
    return match ? match[2] : ''
  }
  /* function setCookie (name, value, days) {
    let d = new Date()
    d.setTime(d.getTime() + 24 * 60 * 60 * 1000 * days)
    document.cookie = name + '=' + value + ';SameSite=lax; Secure;path=/;expires=' + d.toGMTString()
  }
  function deleteCookie (name) { setCookie(name, '', -1) } */

  if (!store.state.login.connected) {
    console.log(getCookieValueByName('userId'))
    if (getCookieValueByName('userId') === '') {
      next('login')
    } else {
      store.commit('updateLogin', {connected: true, id: getCookieValueByName('userId')})
      next()
    }
  } else {
    next()
  }
}
