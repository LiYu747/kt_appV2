//本地开发域名
let host = 'http://local.kt.cn/';
// let host = 'https://api.kuaitongkeji.com/';   
let apiPath = host + 'api/';


module.exports = {

	host: host,

	client: {

		config: apiPath + 'app/config',

		reg: apiPath + 'app/client',

		version: {
			latest: apiPath + 'app/version/latest',
		}
	},

	services: {
		// 登录验证码
		sms: {
			userLoginCode: host + 'services/sms/loginCode',
		},
		// 注册验证码
		regsms: {
			userRegCode: host + 'services/sms/regCode'
		},
		// 上传文件
		file: {
			upload: host + 'services/file/upload',
		}
	},

	user: {
		// 登录
		auth: {
			login: apiPath + 'user/user/login'
		},
		// 注册
		register: {
			regis: apiPath + 'user/user'
		},
		// 个人信息
		userdeta: {
			userdetails: apiPath + 'user/user/profile'
		},
		// 修改个人信息
		userupdate: {
			update: apiPath + 'user/user/update',
			//修改证件照
			updataphoto: apiPath + 'user/user/setFaceimg'
		},


	},

	home: {
		// 轮播图
		adPos: {
			rotationChart: apiPath + 'ad/adPos/show'
		},

		// 社区资讯
		infortion: {
			infor: apiPath + 'village/news',
			// 资讯详情
			infordils: apiPath + 'village/news/show',
			// 小区新闻
			CommunityNews: apiPath + 'community/news',
			// 小区新闻详情
			NewsDils: apiPath + 'community/news/show'
		},

		// 周边
		news: {
			peripheralNews: apiPath + 'article/news',
			// 周边详情
			surroundingDetails: apiPath + 'article/news/show'
		},

		// 申请入住
		applecheckin: {
			apple: apiPath + 'user/moveInApply',
			// 申请记录
			applerecord: apiPath + 'user/moveInApply',
			// 记录详情
			recordDils: apiPath + 'user/moveInApply/show'
		},

		//拜访申请Visit record
		visitLog: {
			// 拜访记录 && 申请拜访
			apply: apiPath + 'user/visitLog',

			// 最新拜访申请
			newapply: apiPath + 'user/visitLog/latestValid',

			// 拜访记录详情
			details: apiPath + 'user/visitLog/show',

			// 出行记录
			travelRecords: apiPath + 'user/backHome'

		},

		//来访记录
		Visitrecord: {
			visitors: apiPath + 'user/visitLog/visitors',

			// 来访详情
			details: apiPath + 'user/visitLog/visitorShow',

			// 处理来访申请
			handlevisit: apiPath + 'user/visitLog/deal'
		},


		// 二维码
		qrcode: {
			obtaincode: apiPath + 'user/backHome/makeQr'
		}

	},

	// 小区
	village: {
		vagelist: {
			// 小区列表
			list: apiPath + 'village/village',
			selectLists: apiPath + 'village/village/selectLists',

			// 小区公告
			Notice: apiPath + 'village/notice',

			// 公告详情
			Noticeshow: apiPath + 'village/notice/show',

			// 小区展示信息
			displayInformation: apiPath + 'village/village/info',

			// 小区内的帖子
			communityPost: apiPath + 'village/tribune',

			//发布帖子
			releasePost: apiPath + 'user/villageTribune',

			// 帖子详情
			postDetails: apiPath + 'village/tribune/show',

			// 帖子的评论
			postComments: apiPath + 'village/tribuneComment',

			// 发布评论
			relComments: apiPath + 'village/tribuneComment',

			//自己发布的帖子
			SelfComments: apiPath + 'user/villageTribune',

			// 自己发布的帖子评论
			SelfPost: apiPath + 'user/villageTribuneComments',

			//默认的栏目列表
			DefaultColumnList: apiPath + 'village/tribuneCat',

			//自定义的栏目列表
			customLists: apiPath + 'user/customTribuneCat'
		},


	},

	// 地址
	address: {
		alladd: {
			// 用户的所有住址
			list: apiPath + 'user/house',
			// 某一个住址的详细信息
			listdetails: apiPath + 'user/house/show'
		},
		//预约电梯
		bookingElevator: {
			booking: apiPath + 'user/house/subElevator'
		},


	},
	// 导航
	Navigation: {
		Navmap: apiPath + 'app/config'
	},

	// 小区物业管理
	propertyManagement: {
      
	    // 小区进出记录
		recordOfAccess : host + 'village_staff/village/inOutRecord',
		
		//入住申请所有记录
		checkinRecord : host + 'village_staff/village/moveInApply',
		
		//入住申请记录详情
	    checkinDetails : host + 'village_staff/village/moveInApply/show',
		
		// 审核某条记录
		 auditRecord : host + 'village_staff/village/moveInApply/verify',
		 
		 //获取所有帖子
		 allPost : host + 'village_staff/village/tribune'
	}
}
