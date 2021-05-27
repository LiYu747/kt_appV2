<template>
	<view class="">
		<subunit :retur='false' titel='快递 外卖'></subunit>
		<view class="userSelection" :style="{height:customBar + 'rpx' }">
			<view class="navBox pos-abs">
				<image @click="isShowType = !isShowType" src="../../../image/Clssmenu.png" class="sjxlIcon" mode=""></image>
				<view v-show="isShowType == true" class="pos-abs m-l5 m-t1">
					<view class="trilateral">
					</view>
					<view class="nomenBox">
						<view class="itemType flex al-center" v-for="item in userType" :key='item.id'>
							<view @click="selecType(item)" class="">
								{{item.name}}
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view v-if="code==200" class="">
			<view class="contenBox flex">
				<!-- 左边 -->
				<view class="">
					<view @click="passQrCode" class="passQrCode">
						<image src="https://oss.kuaitongkeji.com/static/img/app/userMessenger/back1.png" class="back1Img pos-abs" mode=""></image>
						<view class="prcline"></view>
						<view class="prctext">
							通行二维码
						</view>
						<view class="">
							<image src="https://oss.kuaitongkeji.com/static/img/app/userMessenger/qecode.png" class="qecodeImg" mode=""></image>
						</view>
					</view>
				</view>
				<!-- 右边 -->
				<view class="m-l2">
					<view @click="myInfo" class="">
						<view class="">
							<image src="https://oss.kuaitongkeji.com/static/img/app/userMessenger/goto.png" class="ApplyingTo" mode=""></image>
						</view>
					</view>
					<view @click="VisitToApply" class=" m-t1">
						<view class="">
							<image src="https://oss.kuaitongkeji.com/static/img/app/userMessenger/visit.png" class="ApplyingTo" mode=""></image>
						</view>
					</view>
				</view>
			</view>

			<view @click="navigation" class=" flex ju-center">
				<image src="https://oss.kuaitongkeji.com/static/img/app/userMessenger/path.png" class="pathImg" mode=""></image>
			</view>
		</view>

		<view class="flex-d al-center nointo" v-if="code==5403">
			<view class="">
				您还没有申请成为外卖或者快递员
			</view>
			<view @click="ApplyingTo" class="m-t2 gointo">
				去申请成为
			</view>
		</view>
		<view v-show="isShowType == true" @click="isShowType = false" class="showBox">
			
		</view>
	</view>
</template>

<script>
	import subunit from '../../../components/sub-unit/subunit.vue'
	import home from '../../../vendor/home/home.js'
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
						url: '/pages/userMessenger/userhome/userhome',
					}
				],
				isShowType: false,
				code: 0
			}
		},
		methods: {
			//申请进度
			application() {
				uni.navigateTo({
					url: '/pages/userMessenger/applyingTo/applyingRecord/applyingRecord'
				})
			},
			selecType(item) {
				if (item.type == 'expressage') return;
				uni.reLaunch({
					url: item.url
				})
			},
			// 通行二维码
			passQrCode() {
				uni.navigateTo({
					url: '/pages/userMessenger/goQrCode/goQrCode'
				})
			},
			// 我的信息
			myInfo() {
				uni.navigateTo({
					url: '/pages/userMessenger/applyingTo/myInformation/myInformation'
				})
			},

			// 申请成为
			ApplyingTo() {
				uni.navigateTo({
					url: '/pages/userMessenger/applyingTo/applyingTo'
				})
			},
			// 拜访申请
			VisitToApply() {
				uni.navigateTo({
					url: '/pages/residence/seachVill/seachVill?code=2'
				})
			},
			// 路线导航
			navigation() {
				uni.navigateTo({
					url: '/pages/classification/travel/travel'
				})
			},
			// 获取信息
			getData() {
				uni.showLoading({
					title: '加载中'
				})
				home.lookMymsg({
					data: {},
					fail: () => {
						uni.hideLoading()
						uni.showToast({
							title: '网络错误',
							icon: "none"
						})
					},
					success: (res) => {
						uni.hideLoading()
						if (res.statusCode != 200) {
							uni.showToast({
								title: '网络出错了',
								icon: "none"
							})
							return;
						}
						if (res.data.code != 200 && res.data.code != 5403) {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
							return;
						}
						this.code = res.data.code
					}
				})
			}

		},
		onShow() {

		},
		mounted() {
			this.getData()
			this.customBar = cache.get("customBar")
		},
		onLoad() {

		},
		onHide() {
			this.isShowType = false
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
		position: absolute;
		z-index: 9;
	}

	.typeLine {
		height: 20rpx;
	}


	.itemType {
		height: 60rpx;
	}

	.contenBox {
		margin-top: 20rpx;
		width: 690rpx;
		padding: 30rpx;
	}

	.passQrCode {
		width: 335rpx;
		height: 420rpx;
		color: #FFFFFF;
	}

	.back1Img {
		width: 335rpx;
		height: 420rpx;
	}

	.prcline {
		height: 40rpx;
	}

	.prctext {
		margin-left: 20rpx;
		font-size: 20px;
		opacity: 0.99;
	}

	.qecodeImg {
		margin-top: 97rpx;
		margin-left: 97rpx;
		width: 140rpx;
		height: 140rpx;
	}


	.ApplyingTo {
		width: 335rpx;
		height: 200rpx;
	}

	.pathImg {
		margin-top: -20rpx;
		width: 690rpx;
		height: 200rpx;
	}

	.nointo {
		margin-top: 50rpx;
		color: #666666;
	}

	.gointo {
		color: #01AAED;
		// text-decoration:underline;
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

	.nomenBox {
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
