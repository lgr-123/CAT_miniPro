// const BASE_URL = 'https://www.lizeqiang.top:8083'
// const BASE_URL = 'https://192.168.1.108:8086'
const BASE_URL = 'https://lixianghao.top:2358'




const H_config = {}

// 登录
H_config.API_login_URL = '/w/login'

// 提交报名表
H_config.API_submitForm_URL = '/enroll/submit'

// 获取所有学院
H_config.API_college_URL = '/college/list'
// 获取指定学院的专业
H_config.API_major_URL = '/major/college'

// 更新用户信息
H_config.API_updateInfo = '/w/update'

// 获取用户信息
H_config.API_getInfo_URL = '/w/get'

// 更新用户token,因为token会过期，所以每次登录都会更新token
H_config.API_updateToken_URL = '/w/updateT'

// 查询报名信息
H_config.API_getSignUpInfo_URL = '/user/getSignUpInfo'
H_config.STATUSCODE_getSignUpInfo_SUCCESS = 2208
H_config.STATUSCODE_getSignUpInfo_FAILED = 2513

// 判断是否报名
H_config.API_checkEnroll_URL = '/status/checkEnroll'
H_config.STATUSCODE_checkEnroll_SUCCESS = 800
H_config.STATUSCODE_checkEnroll_FAILED = 700

// 获取用户进度
H_config.API_selectSchedule_URL = '/schedule/selectSchedule'
H_config.STATUSCODE_selectSchedule_SUCCESS = 1200

// 获取可预约时间
H_config.API_getAppointTime_URL = '/appointment/listAll'
H_config.STATUSCODE_getAppointTime_SUCCESS = 1201

// 预约
H_config.API_appointTime_URL = '/appointment/updateUserInfo'
H_config.STATUSCODE_appointTime_SUCCESS = 1204

// 检查预约是否开放
H_config.API_appointCheck_URL = '/appointment/check'
// H_config.STATUSCODE_appointTime_SUCCESS = 1208

// 获取用户已预约时间
H_config.API_selectUserAppoint_URL = '/status/checkAppointment'
H_config.STATUSCODE_selectUserAppoint_SUCCESS = 1200

// 取消预约
H_config.API_cancelAppoint_URL = '/appointment/cancelAppointment'
// H_config.STATUSCODE_getAppointTime_SUCCESS

// 获取消息中心的消息
H_config.API_messagelist_URL = '/message/list'


H_config.API_getNotice_URL = '/schedule/selectNotice'

H_config.API_checkNotice_URL = '/schedule/updateNoticeStage'

export {
  BASE_URL,
  H_config
}