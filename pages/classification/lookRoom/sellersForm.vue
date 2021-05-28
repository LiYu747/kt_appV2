<template>
	<view class="">
		<subunit titel='我要卖房' class="fixed"></subunit>
		<view class="topLine">

		</view>

		<view class="layoutBox flex ">
			标题
			<textarea autoHeight="true" class="textBox" maxlength="30" v-model="value" placeholder="请输入标题(30字以内)" />
			</view>
		<view class="contentBox m-t3">
			<view class="itemBox flex al-center ju-between" @click="fillIn(item,index)" v-for="(item,index) in formlist" :key="item.id"
			 :class="index==formlist.length-1?'dv':''">
				{{item.titel}}
				<view class="flex al-center">
					<input :type="item.style" :placeholder="item.placeholder" v-model="item.value" :disabled="item.disabled" class="ipt" />
					<image v-if="index!=4" class="reimg" src="https://oss.kuaitongkeji.com/static/img/app/address/retrue.png" mode=""></image>
					<view v-if="index==4" class=" m-l2">
						㎡
					</view>
				</view>
			</view>
		</view>
		<!-- 户型 -->
		<u-select v-model="houseType" title='请选择户型' mode="mutil-column" :default-value='defaultType' :list="listType"
		 @confirm="confirmRoom"></u-select>
		<!-- 楼层 -->
		<!-- <u-picker range-key="label" title='请选择楼层' :default-selector='defaultFloor' v-model="Isfloor" mode="multiSelector" @columnchange='change' :range="listFloor" @confirm="confirmFloor"></u-picker> -->
		<u-select v-model="Isfloor" title='请选择楼层' mode="mutil-column-auto" :default-value='defaultFloor' @confirm="confirmFloor" :list="listFloor"></u-select>
		<!-- 装修 -->
		<u-select v-model="fitmentShow" title='请选择装修' :default-value='defaultFitment' @confirm="confirmFitment" :list="fitmentList"></u-select>
		<!-- 电梯 -->
		<u-select v-model="elevatorShow" title='请选择是否有电梯' :default-value='defaultElevator' @confirm="confirmElevator" :list="elevatorList"></u-select>
		<view class="contentBox m-t3">
			<view class="itemBox flex al-center dv ju-between">
				售价
				<view class="flex al-center">
					<input type="number" v-model="rentNum" placeholder="请填写" class="ipt" />
					<view class="fz-14 m-l2">
						万
					</view>
				</view>
			</view>
		</view>

		<view class="contentBox m-t3 ">
			<view class="roomtetx">
				房屋照片
			</view>
			<view class="flex al-center flex-w">
				<view class="pos-rel" v-for="(item,index) in image" :key='item.id'>
					<image :src="item" mode="aspectFill" class="itemImg"></image>
					<view @click="delImage(index)" class="delBox flex al-center ju-center">
						<image src="https://oss.kuaitongkeji.com/static/img/app/lookroom/del.png" class="delImg" mode=""></image>
					</view>
				</view>
				<view @click="selPhoto"  class="selphoto flex al-center ju-center">
					<image src="https://oss.kuaitongkeji.com/static/img/app/lookroom/photo.png" class="photoImg" mode=""></image>
				</view>
			</view>
			<view class="roomtetx">
				封面图片
			</view>
			<view class="p-b2 flex">
				<view  v-if="coverImg" class="pos-rel">
					<image :src="coverImg" class="itemImg" mode="aspectFill"></image>
					<view @click="coverImg=''" class="delBox flex al-center ju-center">
						<image src="https://oss.kuaitongkeji.com/static/img/app/lookroom/del.png" class="delImg" mode=""></image>
					</view>
				</view>
				<view @click="celCover" class="selphoto flex al-center ju-center">
					<image  src="https://oss.kuaitongkeji.com/static/img/app/lookroom/cover.png" class="coverImg" mode=""></image>
				</view>
			</view>
		</view>

		<view class="contentBox m-t3">
			<view class="roomtetx">
				房源简介
			</view>
			<view class=" p-b3">
				<textarea class="textAr" auto-height="true" maxlength="1000" value="" v-model="textvalue" placeholder="请填写" />
				</view>
		</view>
	
		<view class="contentBox m-t3">
			<view class="roomtetx">
				<view class="flex al-center">
					联系人
					<view class=" m-l3 fz-14">
						<input type="text" v-model="username" value="" />
					</view>
				</view>
				<view class="Hline">
					
				</view>
			    <view class=" flex al-center">
			    	联系电话
					<view class=" m-l3 fz-14">
						<input type="text" value="" v-model="tel" />
					</view>
			    </view>
			</view>
		</view>
		
		<view class="flex ju-center ">
			<view  @click="iSfill"  class="submit flex al-center ju-center">
				<image src="https://oss.kuaitongkeji.com/static/img/app/lookroom/submit.png" class="submitImg" mode=""></image>
				<view class="pos-abs fz-16 bai">
					提交
				</view>
			</view>
		</view>
		
		<view v-show="isLoding == true" class="showloding flex al-center ju-center">
			<view class="loding flex-d al-center ju-center">
				<view class=" ">
					<image class="loimg" src="https://oss.kuaitongkeji.com/static/img/app/address/loading.gif" mode=""></image>
				</view>
				上传中
			</view>
		</view>
  </view>
</template>

<script>
	import subunit from '../../../components/sub-unit/subunit.vue'
	import route from '../../../vendor/request/routes.js'
	import home from '../../../vendor/home/home.js'
	import jwt from '../../../vendor/auth/jwt.js'
	import user from '../../../vendor/user/userDetails.js'
	import cfg from '../../../vendor/config/config.js'
export default {
name: "",
components: {
subunit,
},
props: {},
data () {
  return {
	  id:'',
	  value:'', //标题
	  addDetails:'',//详细地址
	  lgt:'',//经度
	  lat:'',//纬度
	  houseType:false, //户型
	  listType:[[],[],[]], //户型数据
	  defaultType:[], //户型默认
	  Isfloor: false, //楼层
	  listFloor:[], //楼层数据
	  defaultFloor:[], //楼层默认
	  floor:'',//选择楼层
	  totalFloor:'',//选择总楼层
	  fitmentShow:false, //装修
	  fitmentList:[{value:'well',label:'精装',extra:0},{value:'simple',label:'简装',extra:1},{value:'low',label:'清水房',extra:2}],//装修数据
	  defaultFitment :[], //装修默认
	  celFit:"",//选择装修
	  elevatorShow:false, //电梯
	  elevatorList:[{value:0,label:'无'},{value:1,label:'有'}], //电梯数据
	  defaultElevator:[], //电梯默认
	  rentNum:'',//租金
	  image:[],//图片数据
	  isLoding:false,
	  coverImg:'',//封面图片
	  flag:false,
	  textvalue:'',//房屋简介
	  formlist:[{
		  titel:'小区名字及地址',
		  value:"",
		  disabled:true,
		  style:'text',
		  placeholder:'请选择小区'
	  },
	  {
		titel:'户型',
	    value:"",
		disabled:true,
		  style:'text',
		   placeholder:'请选择'
	  },
	  {
		titel:'楼层',
		value:"",
		disabled:true,
		  style:'text',
		    placeholder:'请选择'
	  },
	  {
	    titel:'装修',
	  	value:"",
		disabled:true,
		  style:'text',
		    placeholder:'请选择'
	  },
	  {
	    titel:'面积',
	  	value:"",
		  style:'number',
		 placeholder:'请填写'
	  },
	  {
	    titel:'电梯',
	  	value:"",
		disabled:true,
		  style:'text',
		    placeholder:'请选择'
	  },
	  ],
	  username:'',
	  tel:''
    }
  },
  methods: {
	   // 提交
	   subunit(){
		  let faceimg = this.coverImg
		   if(!this.coverImg){
			   faceimg = this.image[0]
		   }
		   uni.showLoading({
		   	title:'提交中'
		   })
		 home.releaseSellers({
			 data:{
				 // 必传
				 title: this.value,
				 room:this.defaultType[0] + 1,
				 hall:this.defaultType[1] + 1,
				 bathroom:this.defaultType[2] + 1,
				 area:this.formlist[4].value,
				 ele:this.defaultElevator[0],
				 floor:this.floor,
				 total_floor:this.totalFloor,
				 zx:this.celFit,
				 sale_price:this.rentNum,
				 album:this.image,
				 address_name:this.formlist[0].value,
				 desc:this.textvalue,
				 tel:this.tel,
				 contact_name:this.username,
				  address:this.addDetails,
				  lng:this.lgt,
				  lat:this.lat,
				  cover:faceimg
			 },
			 fail: () => {
				 uni.hideLoading()
				 uni.showToast({
				 	title: '网络错误',
				 	icon: 'none'
				 })
			 },
			 success:(res) => {
				  uni.hideLoading()
				  if (res.statusCode != 200) {
				  	uni.showToast({
				  		title: '网络出错了',
				  		icon: 'none'
				  	})
				  	return;
				  }
				  if (res.data.code != 200) {
				  	uni.showToast({
				  		title: res.data.msg,
				  		icon: 'none'
				  	})
				  	return;
				  }
				  uni.showToast({
				  	title: res.data.msg,
				  	icon: 'none',
					duration:3000
				  })
				  let settime = setTimeout(() =>{
					 uni.navigateBack({
					 	delta:1
					 })
					 clearTimeout(settime)
				  },3000)
					  
				 }
		 })  
	   },
	  // 选择操作
      fillIn(item,index){
		  if(index == 0) {
			  this.location()
		  }
		  if(index == 1){
			this.houseType = true  
		  }
		  if(index == 2){
			 
			this.Isfloor = true
		  }
		  if(index == 3) {
			  this.fitmentShow = true
		  }
		  if(index == 5) {
			  this.elevatorShow = true
		  }
	  },
	  //选择电梯
    confirmElevator(e){
		this.formlist[5].value = e[0].label
		let Default = []
		Default.push(e[0].value)
		this.defaultElevator = Default
	  },
	  // 选择装修
	  confirmFitment(e){
		 this.formlist[3].value = e[0].label
		 this.celFit = e[0].value
		 let extra = e[0].extra
		 if(extra == undefined){
		 			   extra = 0
		 }
		 this.defaultFitment = [extra]
	  },
	  // 选择楼层
	  confirmFloor(e){
		  let floor = e[0].value
		  let allFloor = e[1].value
		  this.defaultFloor = [e[0].value-1,e[1].value-e[0].value]
		  this.formlist[2].value = floor + '/' + allFloor
		  this.floor = floor
		  this.totalFloor = allFloor
		  },
	
	  // 选择户型
	  confirmRoom(e){
		  let Default = []
		  let value = ''
		  e.map(item => {
			 Default.push(item.value-1) 
			 value += item.label
		  })
		  this.defaultType = Default
		  this.formlist[1].value = value
	  },
	  //选择图片
	  selPhoto(){
		  this.flag = false
		  this.succ()
	  },
	  //选择封面
	  celCover(){
		  this.flag = true
		  this.succ()
	  },
	  succ(){
		 uni.chooseImage({
		 	extension: ['jpg', 'jpeg', 'png', 'gif'],
		 	success: (chooseImageRes) => {
		 		const files = chooseImageRes.tempFilePaths;
		 		this.isLoding = true;
		 		let that = this;
		 		if (files.length == 0) return;
		 		let func = [];
		 		files.forEach((item) => {
		 			func.push(that.upload(item));
		 		});
		 
		 		Promise.all(func).then((res) => {
		 			that.isLoding = false;
		 		}).catch((err) => {
		 			that.isLoding = false;
		 			uni.showModal({
		 				title: "上传文件出错:" + err,
		 			})
		 		})
		 	}
		 })  
	  },
	  upload(fileItem) {
	  	let that = this;
	  	return new Promise((res, rej) => {
	  		uni.uploadFile({
	  			url: route.services.file.upload,
	  			filePath: fileItem,
	  			name: 'file',
	  			fail: (err) => {
	  				rej('网络出错');
	  			},
	  			success: (val) => {
	  				if (val.statusCode != 200) {
	  					rej(val.statusCode);
	  					return;
	  				}
	  
	  				let jres = JSON.parse(val.data);
	  
	  				if (jres.code != 200) {
	  					rej(jres.msg);
	  					return;
	  				}
					if(that.flag == false){
						that.image.push(jres.data.url)
					}
					if(that.flag == true) {
						that.coverImg = jres.data.url
					}
	  				res(jres);
	  			}
	  		})
	  	})
	  },
	  all(){
		  // 户型数据
		 for( var i=1 ; i<11;i++){
			 let room = {value: i,label: i +'室'}
			 this.listType[0].push(room)
			 let hall = {value:  i,label: i +'厅'}
			  this.listType[1].push(hall)
			  let bathroom = {value: i,label: i +'卫'}
			  this.listType[2].push(bathroom)
		 }
		 // 楼层数据
		 for( var i=1 ; i<100 ; i++){
			 let floor = {value:i,label:i+'层',children:[]}
			 let allFloor = {value:i,label:'共'+i+'层'}
			  this.listFloor.push(floor)
			  this.listFloor.map(item => {
				 if(item.children){
					 item.children.push(allFloor)
				 }
			 })
		 }
	  },
	  // 定位
	  location(){
		  cfg.ready((data) => {
		  	if (!data) return;
		  	let qqMap = "https://apis.map.qq.com/tools/locpicker"
		  	let url = qqMap + "?search=1&type=1&key=" + data.map.qq_map.qqmap_app_key + "&referer=" + data
		  		.map.qq_map.qqmap_app_name
		  	uni.navigateTo({
		  		url: '/pages/classification/lookRoom/Celaddress/Celaddress?url=' +
		  			encodeURIComponent(url)
		  	})
		  })
	  },
	 //判断
    iSfill(){
		if(!this.value){
			uni.showToast({
				title:"请输入标题",
				icon:"none"
			})
			return;		
		} 
		if(!this.formlist[0].value) {
			 uni.showToast({
				title:"请选择小区",
				icon:"none"
			 })
			 return;
        } 
		if(this.defaultType.length == 0){
			 uni.showToast({
				title:"请选择户型",
				icon:"none"
			 })
			 return;
		}
		if(!this.floor){
			 uni.showToast({
				title:"请选择楼层",
				icon:"none"
			 })
			 return;
		}
		if(!this.celFit){
			 uni.showToast({
				title:"请选择装修",
				icon:"none"
			 })
			 return;
		}
		if(!this.formlist[4].value){
			 uni.showToast({
				title:"请填写面积",
				icon:"none"
			 })
			 return;
		}
		if( this.defaultElevator.length == 0){
			 uni.showToast({
				title:"请选择是否有电梯",
				icon:"none"
			 })
			 return;
		}
		if( !this.rentNum){
			 uni.showToast({
				title:"请填写租金",
				icon:"none"
			 })
			 return;
		}
		if( this.image.length == 0){
			 uni.showToast({
				title:"请上传房屋照片",
				icon:"none"
			 })
			 return;
		}
		if( !this.textvalue){
			 uni.showToast({
				title:"请填写房屋简介",
				icon:"none"
			 })
			 return;
		} 
		if(this.id){
			this.upData()
			return;
		}
		this.subunit()
	},
	  
	// 获取用户资料
	// 判断是否登录
	loadUserData() {
		jwt.doOnlyTokenValid({
			showModal: true,
			keepSuccess: false,
			success: () => {
				user.userDeta({
					data: {},
					fail: () => {
						uni.showToast({
							title: '网络错误',
							icon: 'none'
						})
					},
					success: (res) => {
						if (res.statusCode != 200) return;
						if (res.data.code != 200) return;
						let Users = res.data.data
						if (!Users.id_card_no) {
							uni.showModal({
								content: '请完善您的身份信息',
								success: function(res) {
									if (res.confirm) {
										uni.navigateTo({
											url: '/pages/user/realInformation/realInformation'
										})
									} else if (res.cancel) {
										uni.navigateBack({
											delta: 1
										})
									}
								}
							})
							return;
						}
						this.username = Users.username
						this.tel = Users.tel
					},
				})
			},
			fail: () => {
				uni.navigateBack({
					delta:1
				})
			}
		})
	},
    
	// 数据
	getData(id) {
		uni.showLoading({
			title:"加载中"
		})
		home.saleDils({
			data: {
				id: id
			},
			fail: () => {
				uni.hideLoading()
				uni.showToast({
					title: '网络错误',
					icon: 'none'
				})
			},
			success: (res) => {
				uni.hideLoading()
				if (res.statusCode != 200) {
					uni.showToast({
						title: '网络出错了',
						icon: 'none'
					})
					return;
				}
				if (res.data.code != 200) {
					uni.showToast({
						title: res.data.msg,
						icon: 'none'
					})
					return;
				}
				let data = res.data.data
				this.celFit = data.zx
				if (data.zx == 'low') {
					data.zx = '清水房'
					this.defaultFitment = [2]
				}
				if (data.zx == 'simple') {
					data.zx = '简装'
					this.defaultFitment = [1]
				}
				if (data.zx == 'well') {
					data.zx = '精装'
					this.defaultFitment = [0]
				}
				if (data.ele == 0) {
					data.ele = '无'
					this.defaultElevator = [0]
				}
				if (data.ele == 1) {
					data.ele = '有'
					this.defaultElevator = [1]
				}
				this.value = data.title
				this.formlist[0].value = data.village
				this.formlist[1].value = data.room + '室' + data.hall + '厅' + data.bathroom + '卫'
				this.defaultType = [data.room-1, data.hall-1,data.bathroom-1]
				this.formlist[2].value = data.floor + '/' + data.total_floor
				this.defaultFloor = [data.floor-1,data.total_floor-data.floor]
				this.formlist[3].value = data.zx 
				this.formlist[4].value = data.area
				this.formlist[5].value = data.ele
				this.rentNum = data.sale_price
				this.textvalue = data.desc
				this.image = data.album
				this.coverImg = data.faceimg
				this.floor = data.floor
				this.totalFloor = data.total_floor
				this.rents_bet = data.rents_bet
				this.rents_pay = data.rents_pay
				this.addDetails = data.location
				this.lgt = data.lgt
				this.lat = data.lat
			}
		})
	},
	upData(){
		let faceimg = this.coverImg
		  if(!this.coverImg){
			faceimg = this.image[0]
		  }
		  uni.showLoading({
		  	title:'提交中'
		  })
		home.houseSaleUp({
			 data:{
				 // 必传
				 id:this.id,
				// 必传
				 title: this.value,
				 room:this.defaultType[0] + 1,
				 hall:this.defaultType[1] + 1,
				 bathroom:this.defaultType[2] + 1,
				 area:this.formlist[4].value,
				 ele:this.defaultElevator[0],
				 floor:this.floor,
				 total_floor:this.totalFloor,
				 zx:this.celFit,
				 sale_price:this.rentNum,
				 album:this.image,
				 village:this.formlist[0].value,
				 desc:this.textvalue,
				 tel:this.tel,
				 contact_name:this.username,
				// 可选
				  location:this.addDetails,
				  lgt:this.lgt,
				  lat:this.lat,
				  faceimg:faceimg
			 },
			 fail: () => {
				 uni.hideLoading()
				 uni.showToast({
					title: '网络错误',
					icon: 'none'
				 })
			 },
			 success:(res) => {
				  uni.hideLoading()
				  if (res.statusCode != 200) {
					uni.showToast({
						title: '网络出错了',
						icon: 'none'
					})
					return;
				  }
				  if (res.data.code != 200) {
					uni.showToast({
						title: res.data.msg,
						icon: 'none'
					})
					return;
				  }
				  uni.showToast({
					title: res.data.msg + ',需等待审核',
					icon: 'none',
					duration:3000
				  })
				
				  let settime = setTimeout( () => {
					  uni.navigateBack({
					  	delta:3
					  })
				  },3000)	  
				 }
		})  
	},
	//删除照片
	delImage(index){
		this.image.splice(index,1)
	}
 },
  mounted () {
   this.all()
 
  },
  onLoad (val) {
    if(!val.id) return;
    this.id = val.id
    this.getData(val.id)
  },
  onShow() {
  	  this.loadUserData()
  	  if (this.$store.state.userAdd) {
  	  	let res = this.$store.state.userAdd
  	  	this.formlist[0].value = res.poiname
  	  	this.addDetails = res.poiaddress
  	  	this.lgt = res.latlng.lng.toFixed(6) //经度
  	  	this.lat = res.latlng.lat.toFixed(6) //纬度 
  	  } 
  },
  onUnload(){
    this.$store.commit("userAdd",null) 
  },
  filters: {

  },
  computed: {

  },
  watch: {

  },
  directives: {

  }
}
</script>

<style scoped lang="scss">
.fixed{
	position: fixed;
	z-index: 99;
}
.topLine{
	height: 148rpx;
}

.layoutBox{
	width: 690rpx;
	background: #FFFFFF;
	padding: 20rpx 30rpx;
	color: #333333;
	font-size: 16px;
		box-shadow: 2rpx 2rpx 12rpx #d9d9d9;
}
.textBox{
	width: 540rpx;
	margin-left: 20rpx;
	height: 40rpx;
	font-size: 14px;
	color: #666666;
	margin-top: 4rpx;
	}

.contentBox{
	width: 690rpx;
	padding: 0 30rpx;
	background: #FFFFFF;
		box-shadow: 2rpx 2rpx 12rpx #d9d9d9;
}

.itemBox{
	width: 100%;
	height: 90rpx;
	border-bottom: 1px solid #CCCCCC;
	font-size: 16px;
	color: #333333;
}	

.dv{
	border-bottom: none;
}

.ipt{
	width: 380rpx;
	height: 60rpx;
	font-size: 14px;
	text-align: right;
	color: #666666;
	border: none;
	background: #FFFFFF;
	outline: none;
}

.reimg{
	width: 16rpx;
	height: 30rpx;
	margin-left: 30rpx;
}

.roomtetx{
	padding: 30rpx 0;
}

.photoImg{
	width: 56rpx;
	height: 48rpx;
}

.coverImg{
	width: 91rpx;
	height: 91rpx;
}

.submit{
	width: 360rpx;
	height: 70rpx;
	margin: 70rpx 0;
}

.submitImg{
	width: 360rpx;
	height: 70rpx;
	}
	/deep/
     .u-select__header[data-v-a577ac80]{
	color: #666666;
}	

    .textAr{
		width: 100%;
		font-size: 14px;
		color: #666666;
	}
	
    .itemImg{
		width: 190rpx;
		height: 140rpx;
		margin-right: 30rpx;
		margin-bottom: 20rpx;
	}
	
	.selphoto{
		width: 190rpx;
		height: 140rpx;
		background: #EEEEEE;
		margin-bottom: 30rpx;
	}

	.showloding {
		position: fixed;
		width: 100%;
		height: 100vh;
		top: 0;
		color: #FFFFFF;
	}

	.loimg {
		width: 50rpx;
		height: 50rpx;
	}

	.loding {
		width: 260rpx;
		height: 200rpx;
		background: rgba(88, 88, 88, 0.8);
		border-radius: 10rpx;
	}
	
	.Hline{
		width: 100%;
		height: 1px ;
		background:#CCCCCC ;
		margin: 20rpx 0;
	}
	
	.delImg{
			width: 25rpx;
			height: 25rpx;
		}
		
		.delBox{
			position: absolute;
			top: 5rpx;
			right: 35rpx;
			width: 35rpx;
			height: 35rpx;
			border-radius: 50%;
			border: 1px solid #FFFFFF;
		    background: rgba(0,0,0,0.2) 
		}
</style>
