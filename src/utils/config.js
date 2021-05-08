const config = {
    appId: uni.getAccountInfoSync().miniProgram.appId,
    // BASE_API: 'https://xiaotq.com/api/', // 生产环境
    BASE_API: 'https://api.xtq99.com/api/', // 开发环境
    ICON_URL: '/static/images/',
    version: '1.0.0', // 版本
    isBuild: false // 是否为发布版
}
export default config