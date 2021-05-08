/**
 * 开发者：TianZ
 * 基于uniapp框架。
 * 为方便开发，进行二次封装，全局性调用。
 **/

const main = {
  // 显示消息提示框
  showToast: (title = '', duration = 1500, icon = 'none') => {
    uni.showToast({
      title: title, // 消息文本
      duration: duration, // 显示时长
      icon: icon // 图标，success、loading、none
    })
  },
  // 隐藏消息提示框
  hideToast: () => {
    uni.hideToast()
  },

  // 显示 loading 提示框, 需主动调用 hideLoading 才能关闭提示框
  showLoading: (title = '') => {
    uni.showLoading({
      title: title // 显示的文本
    })
  },
  // 隐藏 loading 提示框
  hideLoading: (timeout = 0) => {
    setTimeout(() => {
      uni.hideLoading()
    }, timeout)
  },

  // 显示模态弹窗
  showModal: (content = '', title = '提示', showCancel = true, confirmText = '确定', cancelText = '取消', confirmColor = '#0066ff', cancelColor = '#9b9b9b') => {
    if (content && content instanceof Object) {
      let data = content
      title = data.title || title
      showCancel = data.showCancel || showCancel 
      confirmText = data.confirmText || confirmText
      cancelText = data.cancelText || cancelText
      confirmColor = data.confirmColor || confirmColor
      cancelColor = data.cancelColor || cancelColor
      content = data.content || ''
    }
    var promise = new Promise(function (resolve, reject) {
      uni.showModal({
        title: title, // 标题
        content: content, // 内容
        showCancel: showCancel, // 是否显示取消按钮
        confirmText: confirmText, // 确认按钮文字
        cancelText: cancelText, // 取消按钮文字
        confirmColor: confirmColor, // 确认按钮颜色
        cancelColor: cancelColor, // 取消按钮颜色
        success: function (res) {
          if (res.confirm) {
            resolve(true)
          } else if (res.cancel) {
            resolve(false)
          }
        }
      })
    })
    return promise
  },

  // ​显示操作菜单
  showActionSheet: (itemList = [], itemColor = '#333333') => {
    var promise = new Promise(function (resolve, reject) {
      uni.showActionSheet({
        itemList: itemList, // 菜单列表
        itemColor: itemColor, // 选项文字
        success (res) {
          resolve(res.tapIndex)
        },
        fail (res) {
          resolve(false)
        }
      })
    })
    return promise
  },

  // 动态设置当前页面的标题
  setNavigationBarTitle: (title = '') => {
    uni.setNavigationBarTitle({
      title: title
    })
  },

  // 显示当前页面导航条的加载动画
  showNavigationBarLoading: () => {
    uni.showNavigationBarLoading()
  },

  // 隐藏当前页面导航条的加载动画
  showNavigationBarLoading: () => {
    uni.hideNavigationBarLoading()
  },

  // 隐藏返回首页按钮
  showNavigationBarLoading: () => {
    uni.hideHomeButton()
  },

  // 动态设置 tabBar 某一项的内容
  setTabBarItem: (data) => {
    if (data.index || data.index === 0 || data.text) {
      uni.setTabBarItem({
        index: data.index, // tabBar 的哪一项，从左边算起
        text: data.text // tab 上的按钮文字
      })
    }
    if (data.color || data.selectedColor || data.backgroundColor || data.borderStyle) {
      uni.setTabBarStyle({
        color: data.color, // tab 上的文字默认颜色
        selectedColor: data.selectedColor, // tab 上的文字选中时的颜色
        backgroundColor: data.backgroundColor, // tab 的背景色
        borderStyle: data.borderStyle // tabBar上边框的颜色，仅支持 black/white
      })
    }
  },

  // 为 tabBar 某一项的右上角添加文本
  setTabBarBadge: (index, text) => {
    uni.setTabBarBadge({
      index: index,
      text: text
    })
  },
  // 移除 tabBar 某一项右上角的文本
  setTabBarBadge: (index) => {
    uni.removeTabBarBadge({
      index: index
    })
  },

  // 显示 tabBar 某一项的右上角的红点
  showTabBarRedDot: (index) => {
    uni.showTabBarRedDot({
      index: index
    })
  },
  // 隐藏 tabBar 某一项的右上角的红点
  hideTabBarRedDot: (index) => {
    uni.hideTabBarRedDot({
      index: index
    })
  },

  // 将页面滚动到目标位置
  pageScrollTo: (scrollTop, selector, duration = 300) => {
    uni.pageScrollTo({
      scrollTop: scrollTop,
      selector: selector,
      duration: duration
    })
  },

  // 获取服务供应商
  getProvider: (service = 'oauth') => {
    var promise = new Promise(function (resolve, reject) {
      uni.getProvider({
        service: service, // 服务类型：oauth 授权登录； share 分享； payment 支付； push 推送
        success: function (res) {
          resolve(res)
        }
      })
    })
    return promise
  },

  // 调起客户端小程序设置界面，返回用户设置的操作结果
  openSetting: () => {
    var promise = new Promise(function (resolve, reject) {
      uni.openSetting({
        complete(res) {
          resolve(res)
        }
      })
    })
    return promise
  },
  
  // 获取用户的当前设置
  getSetting: (scope) => {
    var promise = new Promise(function (resolve, reject) {
      uni.getSetting({
        success(res) {
          if (res.authSetting[scope] === true) {
            resolve(res)
          } else if (res.authSetting[scope] === false) {
            main.openSetting().then(res => {
              if (res.authSetting && res.authSetting[scope]) {
                resolve(res)
              } else {
                resolve(false)
              }
            })
          } else {
            resolve(res)
          }
        }
      })
    })
    return promise
  },

  // 小程序授权
  authorize: (scope) => {
    var promise = new Promise(function (resolve, reject) {
      uni.authorize({
        scope: scope, // 需要获取权限的 scope，详见 scope 列表
        success(res) {
          resolve(res)
        }
      })
    })
    return promise
  },

  // 小程序登录
  login: (provider = 'weixin') => {
    var promise = new Promise(function (resolve, reject) {
      main.getSetting('scope.userInfo').then(res => {
        uni.login({
          provider: provider, // 服务提供商，通过 getProvider 获取
          success: function (res) {
            resolve(res)
          }
        })
      })
    })
    return promise
  },

  // 检查登录状态是否过期
  checkSession: (provider = 'weixin') => {
    var promise = new Promise(function (resolve, reject) {
      uni.checkSession({
        provider: provider, // 服务提供商，通过 getProvider 获取
        success: function (res) {
          resolve(res)
        }
      })
    })
    return promise
  },

  // 获取用户信息
  getUserInfo: (withCredentials = false) => {
    var promise = new Promise(function (resolve, reject) {
      wx.getUserInfo({
        // provider: res.provider[0], // 服务提供商，通过 getProvider 获取
        // withCredentials: withCredentials, // 在小程序 withCredentials 为 true 时或是在 App 调用 uni.getUserInfo，要求此前有调用过 uni.login 且登录态尚未过期
        success: function (res) {
          resolve(res)
        }
      })
    })
    return promise
  },

  // 隐藏小程序的原生菜单中的分享按钮
  hideShareMenu: () => {
    uni.hideShareMenu()
  },

  // 打开另一个小程序
  navigateToMiniProgram: (appid, path, extraData, envVersion = 'release') => {
    var promise = new Promise(function (resolve, reject) {
      uni.navigateToMiniProgram({
        appId: appid, // 要打开的小程序 appId（百度小程序则填写App Key）
        path: path, // 打开的页面路径，如果为空则打开首页
        extraData: extraData, // 需要传递给目标小程序的数据，目标小程序可在 App.vue 的 onLaunch或onShow 中获取到这份数据
        envVersion: envVersion, // 要打开的小程序版本，有效值： develop（开发版），trial（体验版），release（正式版）
        success(res) {
          resolve(res)
        }
      })
    })
    return promise
  },

  // 跳转回上一个小程序，只有当另一个小程序跳转到当前小程序时才会能调用成功
  navigateBackMiniProgram: (extraData) => {
    var promise = new Promise(function (resolve, reject) {
      uni.navigateBackMiniProgram({
        extraData: extraData, // 需要返回给上一个小程序的数据，上一个小程序可在 App.vue 的 onShow 中获取到这份数据
        success(res) {
          resolve(res)
        }
      })
    })
    return promise
  },

  // 本API返回全局唯一的版本更新管理器对象： updateManager，用于管理小程序更新
  getUpdateManager: () => {
    var promise = new Promise(function (resolve, reject) {
      var updateManager = uni.getUpdateManager()
      updateManager.onCheckForUpdate(function (res) {
        if (res.hasUpdate) {
          
        }
      })

      updateManager.onUpdateReady(function (res) {
        showModal('发现新版本，是否重启更新？', '更新提示').then(res => {
          if (res) {
            updateManager.applyUpdate()
          }
        })
      })
    })
    return promise
  },

  // 获取网络类型
  getNetworkType: (extraData) => {
    var promise = new Promise(function (resolve, reject) {
      uni.getNetworkType({
        success: function (res) {
          resolve(res.networkType)
        }
      })
    })
    return promise
  },

  // 拨打电话
  getMakePhoneCall: (phoneNumber) => {
    let promise = new Promise(function (resolve, reject) {
      uni.makePhoneCall({
        phoneNumber: phoneNumber, // 电话号码
        success: function (res) {
          resolve(res)
        }
      })
    })
    return promise
  },

  // 复制文本内容
  setClipboardData: (data, msg) => {
    var promise = new Promise(function (resolve, reject) {
      uni.setClipboardData({
        data: data, // 复制的文本
        success: function (res) {
          if (msg) {
            main.showToast(msg)
          }
          resolve(res)
        }
      })
    })
    return promise
  },

  // 获取已复制的文本内容
  getClipboardData: () => {
    var promise = new Promise(function (resolve, reject) {
      uni.getClipboardData({
        success: function (res) {
          resolve(res)
        }
      })
    })
    return promise
  },

  // 设置屏幕亮度
  setScreenBrightness: (value) => {
    var promise = new Promise(function (resolve, reject) {
      uni.setScreenBrightness({
        value: value,
        success: function (res) {
          resolve(res)
        }
      })
    })
    return promise
  },

  // 获取屏幕亮度
  getScreenBrightness: () => {
    var promise = new Promise(function (resolve, reject) {
      uni.getScreenBrightness({
        success: function (res) {
          resolve(res)
        }
      })
    })
    return promise
  },

  // 设置是否保持常亮状态。仅在当前应用生效，离开应用后设置失效
  setKeepScreenOn: () => {
    uni.setKeepScreenOn({
      keepScreenOn: true
    })
  },

  // 获取当前的地理位置、速度。 在微信小程序中，当用户离开应用后，此接口无法调用，除非申请后台持续定位权限；当用户点击“显示在聊天顶部”时，此接口可继续调用
  getLocation: (type = 'gcj02', altitude = false) => {
    var promise = new Promise(function (resolve, reject) {
      main.getSetting('scope.userLocation').then(res => {
        if (res) {
          uni.getLocation({
            type: type, // 默认为 gcj02 返回国测局坐标，wgs84 返回 gps 坐标，可用于 openLocation 的坐标
            altitude: altitude, // 传入 true 会返回高度信息，由于获取高度需要较高精确度，会减慢接口返回速度
            success: function (res) {
              resolve(res)
            },
            fail: function (res) {
              resolve(false)
            }
          })
        } else {
          resolve(false)
        }
      })
    })
    return promise
  },

  // 打开地图选择位置
  chooseLocation: (latitude, longitude) => {
    var promise = new Promise(function (resolve, reject) {
      main.getSetting('scope.userLocation').then(res => {
        uni.chooseLocation({
          latitude: latitude, // 纬度
          longitude: longitude, // 经度
          success: function (res) {
            resolve(res)
          }
        })
      })
    })
    return promise
  },

  // 使用应用内置地图查看位置
  openLocation: (latitude, longitude, name = '', address = '') => {
    var promise = new Promise(function (resolve, reject) {
      uni.openLocation({
        latitude: Number(latitude), // 纬度
        longitude: Number(longitude), // 经度
        name: name, // 位置名
        address: address, // 地址的详细说明
        success: function (res) {
          resolve(res)
        }
      })
    })
    return promise
  },

  // 保存文件到本地
  saveFile: (tempFilePath) => {
    var promise = new Promise(function (resolve, reject) {
      uni.saveFile({
        tempFilePath: tempFilePath, // 需要保存的文件的临时路径
        success: function (res) {
          resolve(res)
        }
      })
    })
    return promise
  },

  // 获取本地已保存的文件列表
  getSavedFileList: () => {
    var promise = new Promise(function (resolve, reject) {
      uni.getSavedFileList({
        success: function (res) {
          resolve(res)
        }
      })
    })
    return promise
  },

  // 获取本地文件的文件信息。此接口只能用于获取已保存到本地的文件
  getSavedFileInfo: (filePath) => {
    var promise = new Promise(function (resolve, reject) {
      uni.getSavedFileInfo({
        filePath: filePath, // 文件路径
        success: function (res) {
          resolve(res)
        }
      })
    })
    return promise
  },

  // 删除本地存储的文件
  removeSavedFile: (filePath) => {
    var promise = new Promise(function (resolve, reject) {
      uni.removeSavedFile({
        filePath: filePath, // 需要删除的文件路径
        complete: function (res) {
          resolve(res)
        }
      })
    })
    return promise
  },

  // 获取文件信息
  // downloadFile: (url) => {
  //   var promise = new Promise(function (resolve, reject) {
  //     uni.downloadFile({
  //       url: url, // 文件路径，可通过 downFile 获得
  //       success: function (res) {
  //         resolve(res)
  //       }
  //     })
  //   })
  //   return promise
  // },

  // 新开页面打开文档，支持格式：doc, xls, ppt, pdf, docx, xlsx, pptx
  openDocument: (filePath) => {
    var promise = new Promise(function (resolve, reject) {
      uni.openDocument({
        filePath: filePath, // 文件路径
        success: function (res) {
          resolve(res)
        }
      })
    })
    return promise
  },

  // 从本地相册选择图片或使用相机拍照
  chooseImage: (count = 9, sizeType = ['original', 'compressed'], sourceType = ['album', 'camera']) => {
    var promise = new Promise(function (resolve, reject) {
      main.showLoading('导入本地图片')
      uni.chooseImage({
        count: count, // 默认9
        sizeType: sizeType, // original 原图，compressed 压缩图，默认二者都有
        sourceType: sourceType, // album 从相册选图，camera 使用相机，默认二者都有
        success: function (res) {
          let tempFiles = []
          for (let i = 0; i < res.tempFiles.length; i++) {
            if (res.tempFiles[i].size < 10485760) {
              tempFiles.push(res.tempFiles[i])
            } else {
              setTimeout(() => {
                main.showToast('请上传小于10M的图片')
              }, 10)
            }
          }
          if (!tempFiles.length) return
          res.tempFiles = tempFiles
          resolve(res)
        },
        complete: function (res) {
          main.hideLoading()
        }
      })
    })
    return promise
  },

  // 预览图片
  previewImage: (urls = [], current = 0) => {
    uni.previewImage({
      current: current, // 为当前显示图片的链接/索引值，不填或填写的值无效则为 urls 的第一张
      urls: urls, // 需要预览的图片链接列表
      success: function (res) {
      }
    })
  },

  // 获取图片信息
  getImageInfo: (src) => {
    var promise = new Promise(function (resolve, reject) {
      uni.getImageInfo({
        src: src, // 图片的路径，可以是相对路径，临时文件路径，存储文件路径，网络图片路径
        success: function (res) {
          resolve(res)
        }
      })
    })
    return promise
  },

  // 保存图片到系统相册
  saveImageToPhotosAlbum: (filePath) => {
    main.getSetting('scope.writePhotosAlbum').then(res => {
      uni.saveImageToPhotosAlbum({
        filePath: filePath, // 图片文件路径，可以是临时文件路径也可以是永久文件路径，不支持网络图片路径
        success: function (res) {
        }
      })
    })
  },

  // 压缩图片接口，可选压缩质量
  compressImage: (src, quality = 80) => {
    var promise = new Promise(function (resolve, reject) {
      uni.compressImage({
        src: src,
        quality: quality,
        success: res => {
          resolve(res)
        }
      })
    })
    return promise
  },

  // 从微信聊天会话中选择文件
  chooseMessageFile: (count = 9, type = 'all') => {
    var promise = new Promise(function (resolve, reject) {
      wx.chooseMessageFile({
        count: count, // 最多可以选择的文件个数，可以 0～100
        type: type, // 所选的文件的类型 all，video，image，file
        success: res => {
          resolve(res)
        }
      })
    })
    return promise
  },

  // 拍摄视频或从手机相册中选视频，返回视频的临时文件路径
  chooseVideo: (sourceType = ['album', 'camera'], maxDuration = 60, compressed) => {
    var promise = new Promise(function (resolve, reject) {
      main.showLoading('导入本地视频')
      wx.chooseVideo({
        count: 1, // 最多可以选择的文件个数，1
        sourceType: sourceType, // album 从相册选视频，camera 使用相机拍摄，默认为：['album', 'camera']
        compressed: compressed ? ture : false, // 是否压缩所选的视频源文件，默认值为 true，需要压缩
        maxDuration: maxDuration,
        success: res => {
          if (res.size > 10485760) {
            setTimeout(() => {
              main.showToast('请上传小于10M的视频')
            }, 10)
            return 
          }
          resolve(res)
        },
        complete: function (res) {
          main.hideLoading()
          setTimeout(() => {
            if (!res.size && res.errMsg !== 'chooseVideo:fail cancel' && res.errMsg !== 'chooseVideo:fail user canceled') main.showToast(`请上传小于10M的视频`)
          }, 10)
        }
      })
    })
    return promise
  },

  // 拍摄或从手机相册中选择图片或视频
  chooseMedia: (data) => {
    var promise = new Promise(function (resolve, reject) {
      wx.chooseMedia({
        count: data.count || 9, // 最多可以选择的文件个数，1
        mediaType: data.mediaType || ['image', 'video'], // 文件类型
        sourceType: data.sourceType || ['album', 'camera'], // album 从相册选视频，camera 使用相机拍摄，默认为：['album', 'camera']
        maxDuration: data.maxDuration || 10, // 拍摄视频最长拍摄时间，单位秒。时间范围为 3s 至 30s 之间
        sizeType: data.sizeType || ['album', 'camera'], // 仅对 mediaType 为 image 时有效，是否压缩所选文件 ['original', 'compressed']
        success: res => {
          resolve(res)
        }
      })
    })
    return promise
  },

  // 保存视频到系统相册
  saveVideoToPhotosAlbum: (filePath) => {
    var promise = new Promise(function (resolve, reject) {
      wx.saveVideoToPhotosAlbum({
        filePath: filePath, // 视频文件路径，可以是临时文件路径也可以是永久文件路径
        success: res => {
          resolve(res)
        }
      })
    })
    return promise
  },

  // 保存视频到系统相册
  saveVideoToPhotosAlbum: (filePath) => {
    var promise = new Promise(function (resolve, reject) {
      wx.saveVideoToPhotosAlbum({
        filePath: filePath, // 视频文件路径，可以是临时文件路径也可以是永久文件路径
        success: res => {
          resolve(res)
        }
      })
    })
    return promise
  },

  // 文件上传
  uploadFile: (data) => {
    var promise = new Promise(function (resolve, reject) {
      let upload = uni.uploadFile({
        url: data.url, // 上传的地址
        filePath: data.filePath, // 要上传文件资源的路径
        name: 'file', // 文件对应的 key, 在服务器端通过这个 key 可以获取到文件二进制内容
        header: data.header || {}, // HTTP 请求 Header, header 中不能设置 Referer
        formData: data.formData || {}, // HTTP 请求中其他额外的 form data
        success: (res) => {
          resolve(res)
        }
      })
      upload.onProgressUpdate((res) => {
        // console.log('上传进度' + res.progress)
        // console.log('已经上传的数据长度' + res.totalBytesSent);
        // console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend);

        // upload.abort() // 取消上传任务
      })
    })
    return promise
  },

  // 下载文件资源
  downloadFile: (url) => {
    var promise = new Promise(function (resolve, reject) {
      url = url.replace('.webp', '.png')
      uni.downloadFile({
        url: url, // 下载资源的 url
        success: (res) => {
          if (res.statusCode === 200) {
            resolve(res)
          }
        }
      })
    })
    return promise
  },

  // 判断是否为已上传的资源
  uploaded: (url) => {
    url = String(url)
    let isNet = false
    const netList = [
      'https://xiaotq',
      'https://wx.qlogo.cn',
      'https://thirdwx.qlogo.cn',
      'https://webp.xiaotq.com'
    ]
    netList.forEach(item => {
      if (url.indexOf(item) !== -1) {
        isNet = true
      }
    })
    return isNet
  },
  // 判断是否为本地图片
  uplocal: (url) => {
    url = String(url)
    let isNet = false
    const netList = [
      '://tmp/',
      '://tmp/wx',
      'wxfile://'
    ]
    netList.forEach(item => {
      if (url.indexOf(item) !== -1) {
        isNet = true
      }
    })
    return isNet
  },
  getCanvasMake: async (res) => {
    if (res.showLoading) {
      main.showLoading('正在生成')
    }
    let data = res.data
    let canvasWidth = res.canvasWidth
    let canvasHeight = res.canvasHeight
    var promise = new Promise(async function (resolve, reject) {
      for (let i = 0; i < data.length; i++) {
        if (data[i].type === 'image' && data[i].url && !main.uplocal(data[i].url)) {
          console.log(111)
          let localImg = await main.downloadFile(data[i].url)
          data[i].url = localImg.tempFilePath
        }
      }
      // 制作画布
      let width = uni.getSystemInfoSync().windowWidth / 375
      let canvas = uni.createCanvasContext('canvas')
      console.log(222)
      for (let i = 0; i < data.length; i++) {
        let item = data[i]
        if (item.type === 'line') {
          canvas.setStrokeStyle(item.bgColor) // 边框
          canvas.strokeRect(width * item.x, width * item.y, width * item.width, width * item.height) // 边框
        }
        if (item.type === 'bg') {
          canvas.fillStyle = item.bgColor
          canvas.fillRect(width * item.x, width * item.y, width * item.width, width * item.height)
        }
        if (item.type === 'image' && item.url) {
          if (item.isRound) {
            canvas.save()
            canvas.arc(width * (item.width / 2 + item.x), width * (item.height / 2 + item.y), width * item.width / 2, 0, Math.PI * 2, false)
            canvas.clip()
            canvas.drawImage(item.url, width * item.x, width * item.y, width * item.width, width * item.height) // 上传的封面图
            canvas.restore()
          } else {
            canvas.drawImage(item.url, width * item.x, width * item.y, width * item.width, width * item.height) // 上传的封面图
          }
        }
        if (item.type === 'txt') {
          var y = item.y
          // if (uni.getSystemInfoSync().platform === 'android') y = item.y - 4
          canvas.font = `normal ${item.bold} ${Math.round(width * item.pixel)}px sans-serif`
          canvas.setFillStyle(`${item.color}`)
          await main.getCanvasTextAutoLine(item.text, canvas, width * item.x, width * (y + item.height), width * (item.height + item.lineHeight), width * item.width, item.align) // 内容
        }
      }
      canvas.draw()
      setTimeout(async () => {
        let canvasImg = await main.getCanvasImg(canvasWidth, canvasHeight, res.showLoading)
        resolve(canvasImg)
      }, 100)
    })
    return promise
  },

  // 画布绘制文本
  getCanvasTextAutoLine(str, canvas, initX, initY, lineHeight, width, align) {
    const arrText = str.split(/\n/g) // 字符串分割为数组
    let res = []
    let currentText = '' // 当前字符串及宽度
    let currentWidth
    for (let item of arrText) {
      if (canvas.measureText(item).width < width) {
        res.push(item)
      } else {
        let letterArr = item.split('')
        for (let letter of letterArr) {
          currentText += letter
          currentWidth = canvas.measureText(currentText).width
          if (currentWidth > width) {
            res.push(currentText)
            currentText = ''
          }
        }
      }
    }
    for (let text of res) {
      var l = width - canvas.measureText(text).width
      if (align === 'left') canvas.fillText(text, initX, initY)
      if (align === 'center') canvas.fillText(text, initX + l / 2, initY)
      if (align === 'right') canvas.fillText(text, initX + l, initY)
      initY += lineHeight
    }
    if (currentText) {
      var z = width - canvas.measureText(currentText).width
      if (align === 'left') canvas.fillText(currentText, initX, initY)
      if (align === 'center') canvas.fillText(currentText, initX + z / 2, initY)
      if (align === 'right') canvas.fillText(currentText, initX + z, initY)
    }
  },

  // 将画布生成为图片
  getCanvasImg(canvasWidth, canvasHeight, showLoading) {
    var promise = new Promise(function (resolve, reject) {
      let width = uni.getSystemInfoSync().windowWidth / 375
      uni.canvasToTempFilePath({
        x: 0,
        y: 0,
        width: width * canvasWidth,
        height: width * canvasHeight,
        destWidth: width * canvasWidth * 3,
        destHeight: width * canvasHeight * 3,
        canvasId: 'canvas',
        quality: 1,
        success(res) {
          if (showLoading) {
            main.hideLoading()
          }
          resolve(res.tempFilePath)
        },
        fail(res) {}
      })
    })
    return promise
  },
  getSystemDate() {
    let date = new Date()
    let year = date.getFullYear()
    let month = date.getMonth() + 1
    let day = date.getDate()
    let hours = date.getHours()
    let minutes = date.getMinutes()
    if (month < 10) month = `0${month}`
    if (day < 10) day = `0${day}`
    if (hours < 10) hours = `0${hours}`
    if (minutes < 10) minutes = `0${minutes}`
    let dateObj = {
      date: `${year}-${month}-${day}`,
      time: `${hours}:${minutes}`
    }
    return dateObj
  },

  randomString: () => {
    const expect = 16
    let str = Math.random().toString(36).substring(2)
    while (str.length < expect) {
      str += Math.random().toString(36).substring(2)
    }
    return str.substring(0, expect)
  }
}
export default main
