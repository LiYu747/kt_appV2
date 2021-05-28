import Vue  from 'vue'
import Vuex from  "vuex"
import cache from '../vendor/cache/cache.js'
Vue.use(Vuex)
export default new Vuex.Store({
	state:{
		testArr:[
			{id:1,name:"纪念日"}
		],
		
		city:"四川省",
		iSuserDO:0,
		isDel:'',
		isComment:'',
		homeContent:{},
		roomisDel:'',
		saleDel:'',
		checkIspass:'',
		customBar: uni.getSystemInfoSync().statusBarHeight + 128,//用户状态栏高度
		userIschenge:'',
		userPhoto:'',
		userAdd:null
	},
	// 同步更改值
	mutations:{
		changeValue(state,info){
		  	console.log(info)
			},
		 //判断用户是否在来访记录操作
		 iSuserDO(state,info){
			this.state.iSuserDO = info 
		 },	 
		// 判断用户是否触发删除事件
		isDel(state,info){
			this.state.isDel = info
			},
		//判断用户是否触发评论事件		
		isComment(state,info){
			this.state.isComment = info
			},
		// 传首页文章详细数据
		homeContent(state,info){
			this.state.homeContent = info
			},
		//判断租房信息是否删除
		 roomisDel(state,info){
			this.state.roomisDel = info 
		 },
		//判断售房信息是否删除
		 saleDel(state,info){
			this.state.saleDel = info 
		 },
		 // 判断入住信息或帖子物业是否通过
		 checkIspass(state,info){
			this.state.checkIspass = info  
		 },
		 //判断用户更改租房信息
		 userIschenge(state,info){
			 this.state.userIschenge = info
		 },
		 //用户上传的正面照片
		 userPhoto(state,info){
			  this.state.userPhoto = info
		 },
		 //用户选择的地址
		 userAdd(state,info){
			 this.state.userAdd = info
		 }
	
	},
	//异步
	actions:{
		getCity(){
			console.log()
		}
	}
	
})