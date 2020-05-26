import CACHE from '../global/usual_cache';
import Api from '../api/api_index';

const login = (callback) => {
  wx.login({
    success(res) {
      console.log("用户登录返回数据:");
      console.log(res);
      if (res.code) {
        // 获取微信用户code成功，将code传递到后台进行身份认证
        Api.login({username: res.code}, (res1) => {
          if (res1.code === 0) {
            console.log(res1);
            CACHE.token = res1.header['X-Auth-Token'];
            CACHE.userInfo = res1.data.data.principal;
            callback(res1);
          } else {
            console.log('登录失败！' + res1.message)
          }
        })
      } else {
        console.log('登录失败！' + res.errMsg)
      }
    }
  })
}

const loadUserInfo = (callback) => {
  allowUserInfoScope(() => {
    wx.getUserInfo({
      withCredentials: true,
      success: function (res) {
        const data = {
          encryptedData: res.encryptedData,
          iv: res.iv
        }
        Api.userInfo(data, (res1) => {
          if (res1.code === 0) {
            CACHE.userInfo = {
              ...CACHE.userInfo,
              ...res1.data
            }
            callback(res1.data);
          } else {
            console.log('用户信息获取失败!', res1.message)
          }
        })
      }
    })
  })
}

const allowUserInfoScope = (callback) => {
  wx.getSetting({
    success (res) {
      if (!res.authSetting["scope.userInfo"]) {
        wx.authorize({
          scope: 'scope.userInfo',
          success () {
            callback();
          }
        })
      } else {
        callback();
      }
    }
  })
}

export default {
  login,
  loadUserInfo
}
