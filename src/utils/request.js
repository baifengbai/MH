/**
 * 开发者：TianZ
 * 基于uniapp框架。
 * 为方便开发，进行二次封装，全局性调用。
 **/

/** 
 * showLoading 开启loading
 * loadingText loading提示文字
 * api 接口名
 * method 请求方式
 * timeout 请求超时时间 默认 30000
 * icon 回调提示图标 默认 none
 * showCatch 是否接口出错回调
**/
import config from './config'
import main from './main'
import router from './router'
import store from './store'
import md5 from "js-md5"
import qs from 'qs'
import { Encrypt, Decrypt, randomString } from './secret'
var apiNum = 0
let frontKey = 'IqgoZCb07DHTOQrP'
let frontIv = '10A7WcD4PO2owSgu'
let signature = 'JmVH4auum5MwbSosFlN7VwKVTIqNTYUO'

const request = {
    api: (data = {}) => {
        if (data.showLoading) {
            apiNum++
            main.showLoading(data.loadingText || '加载中')
        }
        data.apiTime = Date.parse(new Date()) / 1000
        data.institution_id = config.appId
        let form_data = ''
        let header = {}
        if (config.isBuild) {
            data.api_version = config.version
            data.apiRandomStr = randomString(12)
            data.apiToken = store.getStorageSync('tzToken')
            data.apiSignature = md5(data.apiRandomStr + data.apiTime + signature)
            let dataString = `${JSON.stringify(data)}`
            let obj = {
                apiData: Encrypt(dataString, frontKey, frontIv),
                apiEndKey: randomString(32)
            }
            form_data = qs.stringify(obj)
            header = {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        } else {
            console.log('Request_Front_Time：' + new Date().getTime())
            data.api_version = config.Online
            data.apiPass = 'xiaotq2020EASG2344EC)!e45'
            header = {
                'Authorization': store.getStorageSync('tzToken')
            }
        }

        var promise = new Promise(function (resolve, reject) {
            uni.request({
                url: data.url || config.BASE_API + data.api || '', //仅为示例，并非真实接口地址。
                data: config.isBuild ? form_data : data,
                method: data.method || 'post',
                header: header,
                timeout: data.timeout || 30000,
                success: (res) => {
                    if (config.isBuild) {
                        res.data = JSON.parse(Decrypt(res.data.data, frontKey, frontIv))
                    } else {
                        console.log('Request_After_Time：' + new Date().getTime())
                    }
                    res.data.apiSwitch = !Number(res.header.Api_switch)
                    if (res.data.code === 200) {
                        resolve(res.data)
                        if (data.showToast) {
                            main.showToast(res.data.msg, res.data.msgTime, data.toastIcon)
                        }
                    } else if (res.data.code === 400) {
                        setTimeout(() => {
                            main.showToast(res.data.msg, res.data.msgTime, data.toastIcon)
                        }, 100)
                    } else if (res.data.code === 401) {
                        let pageStack = getCurrentPages();
                        let pageLength = pageStack[pageStack.length - 1].route.split('/').length - 1
                        let url = ''
                        for (let i = 0; i < pageLength; i++) {
                            url += '../'
                        }
                        url += 'pages/signIn'
                        console.log(url)
                        router.navigateTo(url)
                    } else {
                        setTimeout(() => {
                            main.showToast(res.data.msg, res.data.msgTime, data.toastIcon)
                        }, 100)
                    }
                    if (res.data.code !== 200) {
                        if (data.showCatch) {
                            reject(res.data)
                        }
                    }
                },
                fail: (res) => {},
                complete: (res) => {
                    if (data.showLoading) {
                        apiNum--
                        if (!apiNum) main.hideLoading()
                    }
                }
            })
        })
        return promise
    },
    uploadFile: (data) => {
        var promise = new Promise(async function (resolve, reject) {
            let list = []
            if (!data.list.length) {
                resolve(data.list)
                return
            } else {
                for (let i = 0; i < data.list.length; i++) {
                    if ((data.list[i].type === 'image' || data.list[i].type === 'video' || data.list[i].type === 'radio') && data.list[i].url && !main.uploaded(data.list[i].url)) {
                        list.push(data.list[i])
                    }
                }
                if (!list.length) {
                    resolve(data.list)
                    return
                }
            }
            main.showLoading('上传中')
            let num = 0
            let keyArr = await request.api({api: data.api, count: list.length, room_id: data.room_id || ''})
            keyArr = keyArr.data
            keyArr.forEach((item, index) => {
                keyArr[index] = {
                    ...keyArr[index],
                    ...list[index]
                }
                let fileType
                if (keyArr[index].type == 'image') fileType = '.png'
                if (keyArr[index].type == 'video') fileType = '.mp4'
                if (keyArr[index].type == 'radio') fileType = '.mp3'
                let requestData = {
                    url: keyArr[index].upload_host, // 上传的地址
                    filePath: keyArr[index].url, // 要上传文件资源的路径
                    name: 'file', // 文件对应的 key, 在服务器端通过这个 key 可以获取到文件二进制内容
                    header: {}, // HTTP 请求 Header, header 中不能设置 Referer
                    formData: {
                        key: `${keyArr[index].dir}${fileType}`,
                        policy: keyArr[index].policy,
                        OSSAccessKeyId: keyArr[index].accessid,
                        signature: keyArr[index].signature,
                        success_action_status: '200'
                    }, // HTTP 请求中其他额外的 form data
                    success: (res) => {
                        num++
                        keyArr[index].url = `${keyArr[index].host}/${keyArr[index].dir}${fileType}`
                        if (num === keyArr.length) {
                            for (let i = 0; i < data.list.length; i++) {
                                for (let x = 0; x < keyArr.length; x++) {
                                    if (data.list[i].mode === keyArr[x].mode && data.list[i].index === keyArr[x].index) {
                                        data.list[i].url = keyArr[x].url
                                    }
                                }
                            }
                            resolve(data.list)
                            main.hideLoading()
                        }
                    },
                    fail: (res) => {
                        main.hideLoading()
                        setTimeout(() => {
                            main.showToast('上传失败，请重试')
                        }, 100)
                        resolve(false)
                    }
                }
                let upload = uni.uploadFile(requestData)
                upload.onProgressUpdate((res) => {
                    // console.log('上传进度' + res.progress)
                    // console.log('已经上传的数据长度' + res.totalBytesSent)
                    // console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend)

                    // upload.abort() // 取消上传任务
                })
            })
            
        })
        return promise
    }
}
export default request