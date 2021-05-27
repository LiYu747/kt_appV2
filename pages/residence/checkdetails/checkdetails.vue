<template>
	<view class="">
		<subunit titel="详情" ></subunit>
		<view class="cont">
			<view class="nav flex al-center">
				<image src="https://oss.kuaitongkeji.com/static/img/app/visit/gnt.png" class="img" mode=""></image>
				<view  class="text">
					{{text}}
				</view> 
			</view>
			<view class="flex al-center pos-rel ipt" v-for="(item,index) in locadata" :key='item.id'>
				<view class="">
					{{item.titel}}
				</view>
				<view class="pos-abs rig">
					{{item.value}}
				</view>
			</view>
			<view class="line">

			</view>
			<view v-if="pics.length>0" class="">
			 <view class="tex1">
			 	附件
			 </view>	
			 <view class="imgBox flex">
			 	<view class="" v-for="item in pics" :key="item.id">
			 		<image :src="item" mode="aspectFill" class="itemImg"></image>
			 	</view>
			 </view>
			</view>
			<view class="tex1">
				备注
			</view>
			<textarea v-model="remark" disabled='true' class="frame">
			</textarea>
			<view class="tex1">
				申请结果
			</view>
			<textarea v-model="result" disabled='true' class="frame">
			</textarea>
			<view class="btoLine">
				
			</view>
		</view>
	</view>
</template>

<script>
	import subunit from '../../../components/sub-unit/subunit.vue'
	import home from '../../../vendor/home/home.js'
	import cache from '../../../vendor/cache/cache.js'
	import user from '../../../vendor/user/userDetails.js'
	export default {
		name: "",
		components: {
			subunit
		},
		props: {},
		data() {
			return {
				text: '',  //申请结果
				remark: '',  //备注
				result: '', //结果
				pics:[],//附件
				locadata: [{
						titel: '姓名',
						value: ''
					},
					{
						titel: '地址',
						value: ''
					},
					{
						titel: '时间',
						value: ''
					}
				],
				id: ''  //传的id
			}
		},
		methods: {
			
			
			// 获取数据
			loadPageData() {
				uni.showLoading({
					title:'加载中...'
				})
				home.recordDils({
					data: {
						id: this.id
					},
					fail: () => {
							uni.hideLoading()
						uni.showToast({
							title: '网络错误',
							icon: 'none'
						})
					},
					success: (res) => {
						console.log(res);
						uni.hideLoading()
						if (res.statusCode != 200) return;

						if (res.data.code != 200) return;
						let data = res.data.data
						if(!data) return;
						if (data.verify_status == 1) {
							data.verify_status_text = '审核中'
						}
						if (data.verify_status == 2) {
							data.verify_status_text = '通过'
						
						}
						if (data.verify_status == 3) {
							data.verify_status_text = '未通过'
						}
						// console.log(data);
						if(data.own_village){
							this.locadata[1].value = '' + data.own_village.name + data.own_building.name + data.own_apartment.name + data.own_building
								.name + data.own_room.name
						}
						this.locadata[2].value = data.created_at.slice(0, 16)
						this.text = data.verify_status_text
						this.remark = data.user_remark
						this.result = data.verify_msg
						if(data.pics){
							this.pics = data.pics
						}
					},
					
				})
			},

			// 获取用户资料
			Userdata() {
				user.userDeta({
					data: {},
					fail: () => {
						uni.showToast({
							title: '网络错误',
							icon: 'none'
						})
					},
					success: (res => {
						if (res.statusCode != 200) return;
						if (res.data.code != 200) return;
						let Users = res.data.data
						this.locadata[0].value = Users.username
					}),
				})
			}
		},
		mounted() {
			this.loadPageData()
			this.Userdata()
		},
		onLoad(val) {
			// console.log(val);
			this.id = val.id
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
	.cont {
		width: 710rpx;
		height: 100rpx;
		padding: 0 20rpx;
	}

	.nav {
		height: 120rpx;
		border-bottom: 1rpx solid #cccccc;
		margin-bottom: 20rpx;
	}

	.img {
		width: 40rpx;
		height: 40rpx;
	}

	.text {
		font-size: 30rpx;
		margin-left: 20rpx;
		color: #F07535;
	}

	.ipt {
		height: 60rpx;
		font-size: 30rpx;
		color: rgb(165, 165, 165);
	}

	.rig {
		right: 20rpx;
	}

	.line {
		margin-top: 30rpx;
		width: 100%;
		height: 1rpx;
		background: #cccccc;
	}

	.tex1 {
		margin: 30rpx 0;
		font-size: 30rpx;
		color: rgb(165, 165, 165);
	}
	
	.imgBox{
		width: 94%;
		padding: 3%;
		border-radius: 10rpx;
		background: #FFFFFF;
		font-size: 26rpx;
		 box-shadow: 2rpx 2rpx 12rpx #d9d9d9;
		color: rgb(165, 165, 165);
		flex-wrap: wrap;
	}

	.frame {
		width: 94%;
		padding: 3%;
		height: 120rpx;
		border-radius: 10rpx;
		background: #FFFFFF;
		font-size: 26rpx;
	     box-shadow: 2rpx 2rpx 12rpx #d9d9d9;
		color: rgb(165, 165, 165);
	}

	.btnr {
		width: 320rpx;
		height: 70rpx;
		color: #FFFFFF;
		font-size: 28rpx;
	}

	.btnimg {
		width: 320rpx;
		height: 70rpx;
	}

	.btnl {
		width: 318rpx;
		height: 68rpx;
		border-radius: 50rpx;
		border: 1rpx solid rgb(240, 117, 53);
		font-size: 28rpx;
		color: rgb(240, 117, 53);
	}
	
	.itemImg{
		width: 140rpx;
		height: 160rpx;
		border-radius: 10rpx;
		margin-right: 20rpx;
		margin-bottom: 10rpx;
	}
	
	.btoLine{
		height: 40rpx;
	}
</style>
