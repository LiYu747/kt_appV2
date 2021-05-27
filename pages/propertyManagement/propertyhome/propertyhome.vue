<template>
	<view class="">
		<subunit :retur='false' titel='物业'></subunit>
		<view class="userSelection" :style="{height: customBar + 'rpx' }">
			<view class="navBox pos-abs">
				<image @click="isShowType = !isShowType" src="../../../image/Clssmenu.png" class="sjxlIcon" mode=""></image>
			<view v-show="isShowType == true" class="pos-abs m-l5 m-t1">
				<view class="trilateral"> 
				</view>
				<view class="nomenBox">
					<view
					@click="selecType(item)"
					class="itemType flex al-center"
					 v-for="item in userType"
					  :key='item.id'>
							{{item.name}}
					</view>
				</view>
			</view>
			</view>
		</view>
		<view class="contenBox flex">
			<view @click="goQuery" class="userQuery pos-rel">
				<image src="https://oss.kuaitongkeji.com/static/img/app/propertyManagement/userBack.png" class="userBack pos-abs"
				 mode=""></image>
				<view class="zidx">
					用户查询
				</view>
				<view class="userText">
					查询用户信息
				</view>
				<view class="">
					<image src="https://oss.kuaitongkeji.com/static/img/app/propertyManagement/userlook.png" class="userlookImg" mode=""></image>
				</view>
			</view>

			<view class=" m-l2">
				<view @click="CheckTo" class="CheckToSee flex fz-12 pos-rel">
					<image src="https://oss.kuaitongkeji.com/static/img/app/propertyManagement/checkBack.png" class="checkBack pos-abs"
					 mode=""></image>
					<view class="">
						<image src="https://oss.kuaitongkeji.com/static/img/app/propertyManagement/Checklook.png" class="ChecklookImg"
						 mode=""></image>
					</view>
					<view class="">
						<view class="checktex1">
							入住查看
						</view>
						<view class="checktex2">
							用户入住申请查看及审核
						</view>
					</view>
				</view>
				<view @click="comeAndGo" class="recordOfAccess flex pos-rel">
					<image src="https://oss.kuaitongkeji.com/static/img/app/propertyManagement/accessBack.png" class="checkBack pos-abs"
					 mode=""></image>
					<view class="">
						<image src="../../../image/home/nifo.png" class="contractImg" mode=""></image>
					</view>
					<view class="">
						<view class="checktex1">
							小区信息
						</view>
						<view class="checktex2">
							管理的小区信息
						</view>
					</view>
				</view>

			</view>
		</view>

		<view @click="PostManagement" class=" flex ju-center">
			<image src="https://oss.kuaitongkeji.com/static/img/app/propertyManagement/postManagement.png" class="postManagement"
			 mode=""></image>
		</view>
		
		<view v-show="isShowType == true" @click="isShowType = false" class="showBox">
			
		</view>
	</view>
</template>

<script>
	import subunit from '../../../components/sub-unit/subunit.vue'
	import cache from '../../../vendor/cache/cache.js'
	export default {
		name: "",
		components: {
			subunit
		},
		props: {},
		data() {
			return {
				customBar:0,
				userType: [{
						name: '用户',
						type: 'user',
						url: '/pages/index/index'
					},
					{
						name: '物业',
						type: 'property',
						url: '/pages/propertyManagement/propertyhome/propertyhome'
					},
					{
						name: '快递、外卖',
						type: 'expressage',
						url: '/pages/userMessenger/userhome/userhome'
					}
				],
				isShowType: false
			}
		},
		methods: {
			selecType(item) {
				if (item.type == 'property') return;
				uni.reLaunch({
					url: item.url
				})
			},
			//用户查询
			goQuery() {
				uni.navigateTo({
					url: "/pages/propertyManagement/userQuery/userQuery"
				})
			},
			//入住查看
			CheckTo() {
				uni.navigateTo({
					url: '/pages/propertyManagement/CheckToSee/CheckToSee'
				})
			},
			//小区信息
			comeAndGo() {
				uni.navigateTo({
					url: '/pages/propertyManagement/Villageletter/Villageletter'
				})
			},
			// 帖子管理
			PostManagement() {
				uni.navigateTo({
					url: '/pages/propertyManagement/postManagement/postManagement'
				})
			}
		},
		mounted() {
              this.customBar = cache.get("customBar")
		},
		onLoad() {

		},
		onHide() {
			
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
	.contenBox {
		margin-top: 20rpx;
		width: 690rpx;
		padding: 30rpx;
	}

	.userQuery {
		padding-left: 20rpx;
		padding-top: 40rpx;
		width: 315rpx;
		height: 380rpx;
		border-radius: 10rpx;
		font-size: 22px;
		color: #FFFFFF;
	}

	.userBack {
		top: 0;
		left: 0;
		width: 335rpx;
		height: 420rpx;
	}

	.zidx {
		opacity: 0.99;
	}

	.userText {
		margin-top: 20rpx;
		font-size: 14px;
		opacity: 0.5;
	}

	.userlookImg {
		width: 142rpx;
		height: 160rpx;
		position: absolute;
		top: 200rpx;
		left: 104rpx;
	}

	.CheckToSee {
		width: 295rpx;
		height: 200rpx;
		border-radius: 10rpx;
		padding: 0 20rpx;
		color: #fff;
	}

	.checkBack {
		top: 0;
		right: 0;
		width: 335rpx;
		height: 200rpx;
	}

	.ChecklookImg {
		margin-top: 50rpx;
		width: 105rpx;
		height: 97rpx;
	}


	.checktex1 {
		margin-top: 30rpx;
		margin-left: 10rpx;
		font-size: 22px;
		opacity: 0.99;
	}

	.checktex2 {
		margin-left: 10rpx;
		margin-top: 10rpx;
		font-size: 14px;
		opacity: 0.5;
	}

	.recordOfAccess {
		margin-top: 20rpx;
		width: 295rpx;
		height: 200rpx;
		border-radius: 10rpx;
		padding: 0 20rpx;
		color: #FFFFFF;
	}

	.contractImg {
		width: 104rpx;
		height: 104rpx;
		margin-top: 40rpx;
	}

	.userSelection {
		position: fixed;
		top: 0;
		z-index: 999;
	}

	.sjxlIcon {
		width: 34rpx;
		height: 34rpx;
		margin-left: 50rpx;
	}

	.xljxImg {
		margin-top: 5rpx;
		width: 140rpx;
		height: 200rpx;
		z-index: 99;

	}

	.typeLine {
		height: 20rpx;
	}


	.itemType {
		height: 60rpx;
	}

	.postManagement {
		margin-top: -10rpx;
		width: 690rpx;
		height: 200rpx;
	}

	.navBox {
		bottom: 20rpx;
	}

	.trilateral {
		width: 0;
		height: 0;
		border: 14rpx solid;
		border-color: transparent transparent white white;
	}
	
	.nomenBox{
		margin-top: -10rpx;
		border-radius: 10rpx;
		width: 240rpx;
	    padding: 20rpx 30rpx;
		background: #FFFFFF;
		font-size: 14px;
		color: #666666;
		box-shadow: 2rpx 2rpx 12rpx #d9d9d9;
	}
	
	.showBox{
		width: 100%;
		height: 100vh;
		position: fixed;
		top: 0;
		z-index: 99;
	}
</style>
