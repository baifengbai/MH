/**
 * 开发者：TianZ
 * 基于uniapp框架。
 * 为方便开发，进行二次封装，全局性调用。
 **/

// 跳转到应用内的某个页面
function navigateTo(url) {
  if (url) uni.navigateTo({ url })
}

// 关闭当前页面，跳转到应用内的某个页面
function redirectTo(url) {
  if (url) uni.redirectTo({ url })
}

// 跳到tabBar 页面
function switchTab(url) {
  if (url) uni.switchTab({ url })
}

// 后台，index是数字比如1
function navigateBack (index) {
  uni.navigateBack({ delta: index })
}

// 关闭所有页面，打开到应用内的某个页面
function reLaunch(url) {
  if (url) uni.reLaunch({ url })
}

export default {
  navigateTo,
  redirectTo,
  switchTab,
  navigateBack,
  reLaunch
}
