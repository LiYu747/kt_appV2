<template>
	<view>
		<subunit titel='详情' ></subunit>
		<view class="contenBox flex-d al-center pos-rel">
			<view class="itemBox flex al-center ju-between" @click="addItem(index)" v-for="(item,index) in locdata " :key='item.id'>
				<view class="">
					{{item.label}}
				</view>
				<view class="itemValue">
					{{item.value}}
				</view>
			</view>
			<view v-show="jurShow == true" class="iSjurisdiction pos-abs flex-d al-center ">
				<view class="juritem" @click="seljur(item)" v-for="item in jurList" :key='item.id'>
					{{item.label}}
				</view>
			</view>

			<view @click="tiemShow = !tiemShow" class="deadline flex al-center ju-between pos-rel">
				<view class="">
					有效期限
				</view>
				<view class="itemValue"> 
					{{time}}
					<image src="https://oss.kuaitongkeji.com/static/img/app/address/blckpd.png" class="blckpdImg" mode=""></image>
				</view>
				<view v-show="tiemShow" class="timeShow pos-abs flex-d al-center">
					<view class="juritem" @click="seltime(item)" v-for=" item in timeList" :key='item.id'>
						{{item.label}}
					</view>
				</view>
			</view>
			<u-picker @confirm="ok" mode="time" v-model="show" :default-time='defaultTime' :params="params"></u-picker>
			<view class="remarkBox">
				<view class="">
					备注
				</view>
				<view class="remarkCen">
					<textarea value="" v-model="value" class="reArea" placeholder="" />
					</view>
			</view>
			
			<!-- 提交 -->
			<view class="pos-rel m-t4 bot flex al-center ju-center" @click="Submit">
				<image class="Submit" src="https://oss.kuaitongkeji.com/static/img/app/login/ccuc.png" mode=""></image>
				<view class="pos-abs subtext">
					保存
				</view>
			</view>
			
			<!-- 删除 -->
			<view @click="delMember" class="delBox flex al-center ju-center ">
				删除
			</view>
		</view>
	</view>
</template>

<script>
	import subunit from '../../../../components/sub-unit/subunit.vue'
	import address from '../../../../vendor/address/address.js'
	export default {
		name: "",
		components: {
			subunit
		},
		props: {},
		data() {
			return {
				id:'',//成员id
				time:'',//有效时间
				value:'',//备注
				jurShow:false,
				jurId:'',//权限id
				jurList:[
					{
						label:'允许',
						id:1
					},
					{
						label:'不允许',
						id:0
					}
				],
				timeList:[
					{label:'永久',id:0},
					{label:'临时',id:1}
				],
				tiemShow:false,
				timeId:'',// 选择的时间
				show:false,
				params: {
					year: true,
					month: true,
					day: true,
				},
				locdata: [{
						label: '姓名',
						value: ''
					},
					{
						label: '手机号码',
						value: ''
					},
					{
						label: '是否允许添加其他成员',
						value: ''
					}
				],
				defaultTime:''//默认值
		        }
	        },
	    methods: {
				
			// 保存修改信息信息
			Submit(){
				uni.showLoading({
					title:'加载中'
				})
				address.updateMember({
					data:{
						id:this.id,
						allow_edit_member:this.jurId,
						valid_type:this.timeId,
						valid_end:this.time,
						host_remark:this.value
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
						 if(res.statusCode != 200){
						 	uni.showToast({
						 		title: '网络出错了',
						 		icon: 'none',
						 		duration:2000
						 	})
						 	return;
						 }
						 if (res.data.code != 200) {
						 	uni.showToast({
						 		title: res.data.msg,
						 		icon: 'none',
						 		duration:2000
						 	})
						 	return;
						 }
						uni.showToast({
							title:res.data.msg
						})
					}
				})
				},
				
			//删除成员
				delMember(){
					uni.showModal({
						content:'您确定要删除该成员吗',
						success:(res) => {
							// console.log(res);
							if(res.confirm){
								uni.showLoading({
									title:'加载中'
								})
								address.deleteMember({
									data:{id:this.id},
									fail: () => {
									    uni.hideLoading()
										uni.showToast({
											title: '网络错误',
											icon: 'none'
										})
									},
									success: (res) => {
										uni.hideLoading()
										if(res.statusCode != 200){
											uni.showToast({
												title: '网络出错了',
												icon: 'none',
												duration:2000
											})
											return;
										}
										if (res.data.code != 200) {
											uni.showToast({
												title: res.data.msg,
												icon: 'none',
												duration:2000
											})
											return;
										}
										uni.navigateBack({
											delta:1
										})
									}
								})
							}
						}
					})
				},
			// 打开权限
			addItem(index){
				if(index==2){
					this.jurShow = !this.jurShow
				}
			},
			
			// 选择权限
			seljur(item){
				this.jurShow = false
				this.locdata[2].value = item.label
				this.jurId = item.id
			},
			
			// 选择时间
			seltime(item){
				this.timeId = item.id
				if(item.id == 0){
					this.time = item.label
				}
				if(item.id == 1){
					this.show = true
					if(this.time != '永久'){
						this.defaultTime =  this.time
					}
				}
				
			},
			 // 时间确定
			ok(val){
				// console.log(val);
				this.time = val.year + '-' + val.month + '-' + val.day
				},
			// 成员信息
          getMdetails(){
			  uni.showLoading({
			  	title:'加载中'
			  })
			  address.memberDetails({
				  data:{id:this.id},
				  fail: () => {
					  uni.hideLoading()
				  	uni.showToast({
				  		title: '网络错误',
				  		icon: 'none'
				  	})
				  },
				  success: (res) => {
					    uni.hideLoading()
						if(res.statusCode != 200){
							uni.showToast({
								title: '网络出错了',
								icon: 'none',
								duration:2000
							})
							return;
						}
						if (res.data.code != 200) {
							uni.showToast({
								title: res.data.msg,
								icon: 'none',
								duration:2000
							})
							return;
						}
					  let data = res.data.data
					  this.locdata[0].value = data.own_user.username
					   this.locdata[1].value = data.own_user.tel
					   this.jurId = data.allow_edit_member
					   if(data.allow_edit_member == 0){
						    this.locdata[2].value = '不允许'
					   }
					   if(data.allow_edit_member == 1){
					   	 this.locdata[2].value = '允许'
					   }
					   this.timeId = data.valid_type 
					   if(data.valid_type == 0){
						    this.time = '永久'
					   }
					   if(data.valid_type == 1){
					      this.time = data.valid_end.slice(0,10)
					   }
					  this.value = data.host_remark
					  // console.log(data);
				  }
			  })
		  }
		},
		mounted() {
        this.getMdetails()
		},
		onLoad(option) {
			this.id = option.id
             // console.log(option);
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
	.fixed {
		position: fixed;
		z-index: 9;
	}

	.topLine {
		height: 148rpx;
	}

	.contenBox {
		width: 690rpx;
		padding: 30rpx;
	}
	
	.itemBox{
		width: 100%;
		height: 60rpx;
		font-size: 14px;
		color: #999999;
	}
	
	.deadline{
		margin-top: 30rpx;
		width: 100%;
		height: 100rpx;
		border-top: 1px solid #BFBFBF;
		font-size: 14px;
		color: #999999;
	}
	.blckpdImg{
		width: 24rpx;
		height: 16rpx;
		margin-left: 10rpx;
	}
	
	.remarkBox{
		width: 100%;
		color: #666666;
		font-size: 14px;
	}
	
	.remarkCen{
		margin-top: 20rpx;
		width: 650rpx;
		padding: 20rpx;
		background: #FFFFFF;
		border-radius: 10rpx;
		box-shadow: 2rpx 2rpx 12rpx #d9d9d9;
	}
	
	.reArea{
		width: 100%;
		height: 150rpx;
		font-size: 12px;
	}
	
	.itemValue{
		color: #666666;
	}
	
	.iSjurisdiction{
		top: 205rpx;
		width: 120rpx;
		background: red;
		right: 30rpx;
		background: #FFFFFF;
		z-index: 9;
		border-radius: 10rpx;
		border: 1px solid #EEEEEE;
		box-shadow: 2rpx 2rpx 12rpx #d9d9d9;
		padding-bottom: 30rpx;
		color: #666666;
		font-size: 14px;
	}
	
	.juritem{
		margin-top: 20rpx;
	}
	
	.timeShow{
		top: 80rpx;
		width: 120rpx;
		background: red;
		right: 0;
		background: #FFFFFF;
		z-index: 9;
		border-radius: 10rpx;
		border: 1px solid #EEEEEE;
		box-shadow: 2rpx 2rpx 12rpx #d9d9d9;
		padding-bottom: 30rpx;
		color: #666666;
		font-size: 14px;
	}
	
	.Submit {
		width: 358rpx;
		height: 68rpx;
	}
	
	.subtext {
		font-size: 30rpx;
		color: #FFFFFF;
	}
	
	.delBox{
		margin-top: 50rpx;
		width: 358rpx;
		height: 68rpx;
		border-radius: 30rpx;
		background: red;
		color: #fff;
	}
</style>
