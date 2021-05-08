/**
 * 开发者：TianZ
 * 基于uniapp框架。
 * 为方便开发，进行二次封装，全局性调用。
 **/
const CryptoJS = require('crypto-js') // 引用AES源码js

// 加密方法
export function Encrypt(word, key, iv) {
  const srcs = CryptoJS.enc.Utf8.parse(word)

  key = CryptoJS.enc.Utf8.parse(key) // 十六位十六进制数作为密钥
  iv = CryptoJS.enc.Utf8.parse(iv)

  const encrypted = CryptoJS.AES.encrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  return encrypted.ciphertext.toString()
}
// 解密方法
export function Decrypt(word, key, iv) {
  key = CryptoJS.enc.Utf8.parse(key) // 十六位十六进制数作为密钥
  iv = CryptoJS.enc.Utf8.parse(iv)

  const encryptedHexStr = CryptoJS.enc.Hex.parse(word)
  const srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr)

  const decrypt = CryptoJS.AES.decrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  })
  const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8)
  return decryptedStr.toString()
}

export function randomString(num = 16) {
  const expect = num
  let str = Math.random().toString(36).substring(2)
  while (str.length < expect) {
    str += Math.random().toString(36).substring(2)
  }
  return str.substring(0, expect)
}