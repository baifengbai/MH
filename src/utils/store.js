/**
 * 开发者：TianZ
 * 基于uniapp框架。
 * 为方便开发，进行二次封装，全局性调用。
 **/

const store = {
    // 存储缓存 异步
    setStorage: (key, data) => {
        uni.setStorage({
            key: key,
            data: data
        })
    },

    // 存储缓存 同步
    setStorageSync: (key, data) => {
        try {
            uni.setStorageSync(key, data)
        } catch (e) {
            // error
        }
    },

    // 获取缓存 异步
    getStorage(key) {
        var promise = new Promise(function (resolve, reject) {
            uni.getStorage({
                key: key,
                success (res) {
                    resolve(res.data)
                },
                fail(res) {

                },
                complete(res) {

                }
            })
        })
        return promise
    },

    // 获取缓存 同步
    getStorageSync(key) {
        return uni.getStorageSync(key)
    },

    // 移除缓存 异步
    removeStorage: (key) => {
        uni.removeStorage({
            key: key,
            success (res) {
            }
        })
    },

    // 移除缓存 同步
    removeStorageSync: (key) => {
        uni.removeStorageSync(key)
    },

    // 清理缓存 异步
    clearStorage: () => {
        uni.clearStorage()
    },

    // 清理缓存 同步
    clearStorageSync: () => {
        uni.clearStorageSync()
    }
}

export default store