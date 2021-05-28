<template>
	<view class="">
		<subclass titel="交通出行" :showmap='false'></subclass>
		<!-- <view class="simulation">
			以下均为模拟数据
		</view> -->
		<view class="topbox flex al-center ju-center">
			<view class="inbox flex">
				<view class="left flex-d al-center pos-rel">
					<view class="come">
						从
					</view>
					<view class="go pos-abs">
						到
					</view>
				</view>

				<view class="rigth">
					<input v-model="myPosition" :placeholder="myholder" />
					<view class="line">
						<input v-model="goPosition" :placeholder="goholder" />
					</view>
				</view>

				<view class="">
					<image @click="swap" src="https://oss.kuaitongkeji.com/static/img/app/classification/Travel/jiah.png" class="jiaoimg"
					 mode=""></image>
				</view>
			</view>
		</view>


		<map style="width: 100%; height: 600rpx;"    :latitude="latitude" :longitude="longitude" :markers="markers">
		</map>

		<view class=" flex ju-center">
			<view class="botombox flex al-center ju-center">
				<view class="flex ju-center ">
					<image @click="start" src="https://oss.kuaitongkeji.com/static/img/app/classification/Travel/start.png" class="startimg"
					 mode=""></image>
				</view>
			</view>
		</view>


	</view>
</template>

<script>
	import subclass from '../../../components/sub-class/subclass.vue'
	import userDetails from '../../../vendor/user/userDetails.js'
	// import cfg from '../../../vendor/config/config.js'
	export default {
		name: "",
		components: {
			subclass
		},
		props: {},
		data() {
			return {
				myholder: '我的位置',
				goholder: '请输入终点',
				myPosition: '', //开始的位置
				goPosition: '', //要去的位置
				latitude: '', //自动获取的经度
				longitude: '', //自动获取的纬度 
				markers: [{ 
					id: 1,              
					title: '我的位置', //地图标题 
					latitude: '',
					longitude: '', 
					iconPath: '../../../static/iospos.png'  //ios为iospos  安卓为pos 
				}],
				city: '', //自动获取的城市
				golat: '', //要去地方的经度
				golng: '', //要去地方的纬度 
			}
		},

		methods: {
			// 交换出发和到达地址
			swap() {
				if (this.goPosition == '') return;
				if (this.myPosition == '') {
					uni.showToast({
						title: '请输入开始的位置',
						icon: "none"
					})
					return;
				};
				let myPosition = this.myPosition
				let goPosition = this.goPosition
				this.myPosition = goPosition
				this.goPosition = myPosition
			},

			location() {
				uni.showLoading({
					title: '获取定位中'
				})
				// console.log('location')
				uni.getLocation({
					type: 'gcj02',
					altitude: true,
					geocode: true, //设置该参数为true可直接获取经纬度及城市信息
					success: (res) => {
						uni.hideLoading()
						  this.latitude = res.latitude
						  this.longitude = res.longitude
						  this.markers[0].latitude = res.latitude
						  this.markers[0].longitude = res.longitude 
						this.city = res.address.city
						// console.log(res);
					}, 
					fail: (err) => {
						uni.hideLoading()
						// console.log('err', err)
						uni.showToast({
							title: '获取定位失败,请稍后再试',
							icon: 'none'
						});
					}
				});
			},


			start() {
				let that = this;

				if (that.goPosition == '') {
					uni.showToast({
						title: '请输入终点',
						icon: "none"
					})
					return
				};
				let baiduUrl = 'http://api.map.baidu.com/direction'
				// 自动定位
				if (that.myPosition == '') {
					baiduUrl += `?origin=latlng:${that.latitude},${that.longitude}` + '|' + 'name:' + that.myPosition +
						`&destination=latlng:${that.golat},${that.golng}` + '|' + 'name:' + that.goPosition +
						'&mode=driving&region=' + this.city + '&output=html&src=webapp.baidu.openAPIdemo&coord_type=gcj02'
				}

				//可以自己输入开始的位置
				if (that.myPosition != '') {
					that.latitude = ''
					that.longitude = ''
					baiduUrl += `?origin=latlng:${that.latitude},${that.longitude}` + '|' + 'name:' + that.myPosition +
						`&destination=latlng:${that.golat},${that.golng}` + '|' + 'name:' + that.goPosition +
						'&mode=driving&region=' + this.city + '&output=html&src=webapp.baidu.openAPIdemo&coord_type=gcj02'
				}

				uni.navigateTo({
					url: '/pages/web/index/index?url=' + encodeURIComponent(baiduUrl)
				})

				// cfg.ready((data) => {
				// console.log(data);
				// if (!data.map) return;
				// let navUrl = 'https://apis.map.qq.com/tools/routeplan/eword=' + that.goPosition + '&sword=' + that.myPosition + 
				// 	'&spointx=' + that.latitude + '&spointy=' + that.longitude;
				// navUrl += '?key=' + data.map.key + '&referer=' + data.map.name 	
				// }) 
			},


		},
		onShow() {

		},
		mounted() {
			this.location()
		},
		onLoad(option) {
		
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
	.topbox {
		width: 100%;
		height: 200rpx;
		background: #FFFFFF;
	}

	.inbox {
		width: 620rpx;
		height: 146rpx;
		background: #F5F5F5;
		border-radius: 10rpx;
	}

	.left {
		width: 66rpx;
		color: #999999;
		font-size: 26rpx;
		height: 146rpx;
	}

	.come {
		margin-top: 20rpx;
	}

	.go {
		bottom: 26rpx;
	}

	.rigth {
		margin-top: 10rpx;
		width: 488rpx;
		height: 110rpx;
	}

	.line {
		width: 100%;
		height: 1px;
		background: #CCCCCC;
	}

	input {
		// background: red;
		height: 62rpx;
		font-size: 30rpx;
		color: #333333;
	}

	.jiaoimg {
		margin-top: 50rpx;
		margin-left: 20rpx;
		width: 30rpx;
		height: 36rpx;
	}

	.tabar {
		width: 100%;
		height: 64rpx;
		background: #FFFFFF;
		color: #999999;
		font-size: 24rpx;
			box-shadow: 2rpx 2rpx 12rpx #d9d9d9;
	}

	.item {
		height: 64rpx;
	}

	.dv {
		color: #FF9C00;
		height: 62rpx;
		border-top: 1px solid #FFFFFF;
		border-bottom: 1px solid #FF9C00;
	}

	.mapimg {
		width: 100%;
		height: 800rpx;
	}

	.botombox {
		top: -50rpx;
		position: relative;
		width: 690rpx;
		height: 280rpx;
		background: #FFFFFF;
		border-radius: 10rpx;
			box-shadow: 2rpx 2rpx 12rpx #d9d9d9;
	}

	.advantage {
		color: #999999;
		font-size: 24rpx;
	}

	.time {
		color: #333333;
		font-size: 36rpx;
	}

	.distance {
		color: #999999;
		font-size: 24rpx;
	}

	.itmmbox {
		flex: 1;
		margin-top: 10rpx;
	}

	.colr {
		color: #FF9C00 !important;
	}

	.ged {
		border-right: 2rpx solid #cccccc;
	}

	.startimg {
		margin-top: 35rpx;
		width: 423rpx;
		height: 64rpx;
	}

	.simulation {
		display: flex;
		justify-content: center;
		height: 80rpx;
		align-items: center;
		font-size: 30rpx;
		color: #b3b3b3;
		// background: #FFFFFF;
	}
</style>
