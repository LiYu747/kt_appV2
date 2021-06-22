<template>
	<view class="">
		<subunit titel="我的二维码"></subunit>
		<view class="flex-d al-center">
			<image src="https://oss.kuaitongkeji.com/static/img/app/home/jx.png" class="img" mode=""></image>
			<view class="pack flex-d al-center">
				<view class="nav flex al-center">
					请将二维码对准扫码口
				</view>
				<view class="boxs">
					<view class="qrimg">
						<tki-qrcode cid="qrcode1" ref="qrcode" :val="val" :size="size" :unit="unit" :background="background" :foreground="foreground"
						 :pdground="pdground" :icon="icon" :iconSize="iconsize" :lv="lv" :showLoading='false' :onval="onval" :loadMake="loadMake"
						 :usingComponents="true" />
					</view>
				</view>
				<view v-if="code==200" class="cortt flex al-center" @click="add">
					<image v-show="flag===1" src="https://oss.kuaitongkeji.com/static/img/app/qrcode/1.png" class="img1" mode=""></image>
					<image v-show="flag===0" src="https://oss.kuaitongkeji.com/static/img/app/qrcode/3.png" class="img2" mode=""></image>
					{{text}}
				</view>
				<view v-show="show===1 && timetext" class="m-t2 flex al-center ju-center">
					<image src="https://oss.kuaitongkeji.com/static/img/app/qrcode/2.png" class="time" mode=""></image>
					<view class="pos-abs texts bai">
						{{timetext}}
					</view>
				</view>
			</view>
			
			<view v-show="isLoding == true" class="showloding flex al-center ju-center">
				<view class="loding flex-d al-center ju-center">
					<view class=" ">
						<image class="loimg" src="https://oss.kuaitongkeji.com/static/img/app/address/loading.gif" mode=""></image>
					</view>
					加载中
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import subunit from '../../../components/sub-unit/subunit.vue'
	import home from '../../../vendor/home/home.js'
	import tkiQrcode from "../../../components/qrcode/tki-qrcode/tki-qrcode.vue"
	import jwt from '../../../vendor/auth/jwt.js'

	export default {
		name: "",
		components: {
			subunit,
			tkiQrcode
		},
		props: {},
		data() {
			return {
				val: '', // 要生成的二维码值
				size: 500, // 二维码大小
				unit: 'upx', // 单位
				background: '#ffffff', // 背景色
				foreground: '#000000', // 前景色
				pdground: '#000000', // 角标色
				icon: '', // 二维码图标
				iconsize: 40, // 二维码图标大小
				lv: 3, // 二维码容错级别 ， 一般不用设置，默认就行
				onval: true, // val值变化时自动重新生成二维码
				loadMake: true, // 组件加载完成后自动生成二维码
				text: '',
				flag: 1,
				show: 0,
				time: 0,
				timetext: '',
				isLoding:false,
				code:0
			}
		},
		methods: {
		
			// 手动刷新
			add() {
				if(this.flag == 0) return;
				this.loadUserData()
			},
			// 判断是否登录
			loadUserData() {
				jwt.doOnlyTokenValid({
					showModal: true,
					keepSuccess: false,
					success: () => {
						this.data()
					},
					fail: () => {
						uni.switchTab({
							url: '/pages/index/index'
						})
					}
				})
			},
			// 倒计时
			countdown() {
				var Urtime = setInterval(() => {
					if (this.time > 0) {
						this.time--
						this.timetext = '有效时间:' + this.time + 's'
						if (this.time <= 0 || this.flag === 0) {
							this.time = 60
							this.show = 0
							this.timetext = ''
							clearInterval(Urtime)
						}
					}
				}, 1000)
			},
			// 获取二维码
			data() {
				this.isLoding = true
				home.obtaincode({
					data: {},
					fail: () => {
						this.isLoding = false
						uni.showToast({
							title: '网络错误',
							icon: 'none'
						})
					},
					success: (res) => {
						this.isLoding = false
						// console.log(res.data.data.content);
						if (res.statusCode != 200) {
							uni.showToast({
								title: '网络出错了',
								icon: 'none'
							})
							return;
						}
						if(res.data.code == 4405){
							uni.showModal({
								content:'请完善您的身份信息',
								success: (res) => {
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

						if (res.data.code != 200) {
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							})
							return
						}
						
						this.code = res.data.code
						this.val = res.data.data.content
						this.text = '刷新成功'
						this.flag = 0
						this.show = 0
						this.time = 60					
						const time = setTimeout(() => {
							this.text = '手动刷新'
							this.flag = 1
							this.show = 1
							clearTimeout(time)
						}, 1000)
							this.countdown()
					}
				})
			}
		},
		onShow() {
				if(this.code == 200) return;
			this.loadUserData()
		},
		mounted() {
            
		},
		onLoad() {

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
	.img {
		width: 750rpx;
		height: 156rpx;
	}

	.pack {
		position: relative;
		top: -75rpx;
		width: 690rpx;
		height: 820rpx;
		background: #FFFFFF;
		border-radius: 20rpx;
		box-shadow: 2rpx 2rpx 12rpx #d9d9d9;
	}

	.nav {
		height: 131rpx;
		font-size: 30rpx;
		color: #666666;
	}

	.code {
		width: 494rpx;
		height: 484rpx;
	}

	.img1 {
		width: 30rpx;
		height: 30rpx;
		margin-right: 10rpx;
	}

	.img2 {
		width: 23rpx;
		height: 17rpx;
		margin-right: 10rpx;
	}

	.cortt {
		margin-top: 32rpx;
		font-size: 30rpx;
		color: #333333;
	}

	.time {
		width: 180rpx;
		height: 44rpx;
	}

	.texts {
		font-size: 24rpx;
		-webkit-transform: scale(0.9);
		-webkit-transform-origin: left top
	}

	.boxs {
		// width: 100%;
		// background: red;
	}

	.mrl {
		margin-right: 0;
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
</style>
