//本地开发域名
let host = 'http://local.kt.cn/';
let apiPath = host + 'api/';
module.exports = {
	
	host : host,
	
	client : {
		reg : apiPath + 'app/client',
		
		version : {
			latest : apiPath + 'app/version/latest',
		}
	},
	
	services : {
		// 登录验证码
		sms : {
			userLoginCode : host + 'services/sms/loginCode',
		},
		// 注册验证码
		regsms : {
			userRegCode : host + 'services/sms/regCode'
		},
		// 上传文件
		file : {
			upload : host + 'services/file/upload',
		}
	},
	
	user : {
		// 登录
		auth : {
			login : apiPath + 'user/user/login'
		},
		// 注册
		register:{
			regis : apiPath + 'user/user'
		},
		// 个人信息
		userdeta:{
			userdetails : apiPath + 'user/user/profile'
		},
		// 修改个人信息
		userupdate: {
			update : apiPath + 'user/user/update',
			//修改证件照
			updataphoto: apiPath + 'user/user/setFaceimg'
		},
		
		
	},
	
	home : {
		// 轮播图
		adPos : {
			rotationChart : apiPath + 'ad/adPos/show'
		},
		
		// 社区资讯
		infortion: {
			infor : apiPath + 'village/news',
			// 资讯详情
			infordils : apiPath + 'village/news/show'
		},
		
		// 周边
		news : { 
			peripheralNews : apiPath  + 'article/news',
			// 周边详情
			surroundingDetails : apiPath + 'article/news/show'
		},
		
		// 申请入住
		applecheckin : {
			apple : apiPath + 'user/moveInApply',
			// 申请记录
			applerecord : apiPath + 'user/moveInApply'
		},
		
		//拜访申请Visit record
		visitLog : {
				// 拜访记录 && 申请拜访
			apply : apiPath + 'user/visitLog',
			
			// 拜访记录详情
			details : apiPath + 'user/visitLog/show'
	
		},
		
		//来访记录
		Visitrecord : {
			visitors : apiPath + 'user/visitLog/visitors',
			
			// 来访详情
			details : apiPath + 'user/visitLog/visitorShow',
			
			// 处理来访申请
			handlevisit : apiPath + 'user/visitLog/deal'
		},
		
		// 二维码
		qrcode : {
			obtaincode : apiPath + 'user/backHome/makeQr'
		}
		
	},
	
	// 小区
	village : {
		vagelist : {
			// 小区列表
			list : apiPath + 'village/village',
			selectLists : apiPath + 'village/village/selectLists',
			// 小区公告
			Notice :    apiPath + 'village/notice',
			// 小区展示信息
			displayInformation : apiPath + 'village/village/info',
			// 小区内的帖子
			communityPost : apiPath + 'village/tribune',
			//发布帖子
			releasePost : apiPath + 'user/villageTribune',
			// 帖子详情
			postDetails : apiPath + 'village/tribune/show',
			// 帖子的评论
			postComments : apiPath + 'village/tribuneComment',
			// 发布评论
			relComments : apiPath + 'village/tribuneComment',
			//自己发布的帖子
			 SelfComments : apiPath + 'user/villageTribune',
			 // 自己发布的帖子评论
			 SelfPost : apiPath + 'user/villageTribuneComments'
		},
		
		
	},
	
	// 地址
	address : {
		// 用户的所有住址
		alladd : {
			list : apiPath +'user/house'
			},
	  //预约电梯
	  bookingElevator : {
		   booking : apiPath + 'user/house/subElevator'
	  }
	}
}