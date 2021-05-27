<template>
	<view class="page">
		<subunit titel='详情'></subunit>
		<view class="navBox" :style="{height: this.$store.state.customBar + 'rpx'}">
			<image @click="install" src="https://oss.kuaitongkeji.com/static/img/app/user/Settings.png" class="setimg pos-abs" mode=""></image>
		</view>
		<view class="flex-d al-center">
			<view class="backBox pos-rel m-t2 flex al-center ju-center">
				<swiper class="swiper" :indicator-dots="indicatorDots" :autoplay="autoplay" :interval="interval" :duration="duration">
					<swiper-item v-for="item in roomInof.album" :key="item.id" class="flex ju-center">
						<image :src="item" class="logoImg " mode="aspectFill"></image>
					</swiper-item>
				</swiper>
			</view>

			<view class="contenBox">
				<view class="nameDetail">
					{{roomInof.title}}
				</view>
				<view class="pritext flex m-t1">
					{{roomInof.rents}}
					<view class="fz-12">
						元/月
					</view>
				</view>
				<view class="flex ju-between m-t1 fz-12 cl9 al-center">
					<view class="  m-l1">
						{{roomInof.rent_pay_method}}
					</view>
					<view class="m-r2">
						已有{{roomInof.pv}}人浏览
					</view>
				</view>
			</view>

			<view class="houseType flex al-center ju-between">
				<view class="flex al-center itemwidth ju-center pos-rel" v-for="(item,index) in locdata" :key='item.id'>
					<view class="flex-d al-center">
						<view class="fz-14 itemvalue">
							{{item.value}}
						</view>
						<view class="fz-12  itemtil">
							{{item.title}}
						</view>
					</view>
					<view class="line" v-if="locdata.length-1 != index">

					</view>
				</view>
			</view>

			<view class="isHave">
				<view class="fz-14 m-b1 flex al-center">
					电梯
					<view class="isResult m-l2">
						{{roomInof.ele}}
					</view>
				</view>
				<view class="fz-14  m-b1 flex al-center">
					装修
					<view class="isResult m-l2">
						{{roomInof.zx}}
					</view>
				</view>
			</view>

			<view @click="Address" class="addressBox m-t3 flex  fz-14">
				<image src="https://oss.kuaitongkeji.com/static/img/app/lookroom/add.png" class="addImg" mode=""></image>
				<view class="m-l2 addressmsg">
					{{roomInof.address}}
				</view>
			</view>

			<view class="briefRoom">
				<view class="itemvalue">
					房屋概况
				</view>
				<view class="fz-12 m-t2 m-b2" style="white-space:pre-wrap">
					{{roomInof.desc}}
				</view>
			</view>

			<view class="isHave flex">
				<view class="fz-16 haveBox isResult flex al-center">
					联系人
					<view class="fz-12 m-l2 conName">
						<view v-if="roomInof.contact_name" class="">
							{{roomInof.contact_name}}
						</view>
						<view  v-else class="">
							暂无
						</view>
					</view>
				</view>
				<view class="fz-16   flex haveBox isResult al-center">
					联系电话
					<view class="fz-12 m-l2 userTel">
						<view class="" v-if="roomInof.tel">
							{{roomInof.tel}}
						</view>
						<view class="isResult" v-else>
							暂无
						</view>
					</view>
				</view>
			</view>

			<view @click="consult" class="">
				<image src="https://oss.kuaitongkeji.com/static/img/app/lookroom/consult.png" class="consultImg" mode=""></image>
			</view>

			<view class="btmLine">

			</view>
		</view>

	</view>
</template>

<script>
	import subunit from '../../../../components/sub-unit/subunit.vue'
	import home from '../../../../vendor/home/home.js'
	import cache from '../../../../vendor/cache/cache.js'
	export default {
		name: "",
		components: {
			subunit
		},
		props: {},
		data() {
			return {
				indicatorDots: false,
				autoplay: false,
				interval: 2000,
				duration: 500,
				locdata: [{
					title: '面积',
					value: ''
				}, {
					title: '楼层',
					value: ''
				}, {
					title: '户型',
					value: ''
				}],
				roomInof: {},
				id:''
			}
		},
		methods: {
			//拨打电话
			consult() {
				if(!this.roomInof.tel) return;
				uni.makePhoneCall({
				 phoneNumber: this.roomInof.tel
				});
			},
			// 去设置
			install(){
				uni.navigateTo({
					url:'/pages/classification/lookRoom/rentAndsale/setRent?id=' + this.id 
				})
			},
			getData(id) {
				uni.showLoading({
					title:"加载中"
				})
				home.rentDils({
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
						if (data.album && data.album.length > 1) {
							this.indicatorDots = true
						}
						if (data.album == [] || !data.album) {
							let album = ['https://oss.kuaitongkeji.com/upload/2021/02/20/Kztg485iqwsrKNrDLXKIeQ7apbhuyi4v1SHpslOv.jpeg']
							data.album = album
						}
						let bathroom = data.bathroom != null ? data.bathroom + '卫' : "";
						let hall = data.hall != null ? data.hall + '厅' : '';
						this.locdata[0].value = data.area + '㎡'
						this.locdata[1].value = data.floor + '/' + data.total_floor + '层'
						this.locdata[2].value = data.room + '室' + hall + bathroom
						this.id = data.id
						this.$store.commit('userIschenge',data.is_show)
						if (data.zx == 'low') {
							data.zx = '清水房'
						}
						if (data.zx == 'simple') {
							data.zx = '简装'
						}
						if (data.zx == 'well') {
							data.zx = '精装'
						}
						if (data.ele == 0) {
							data.ele = '无'
						}
						if (data.ele == 1) {
							data.ele = '有'
						}

						this.roomInof = data
					}
				})
			},
			// 地址
			Address(){
				let latitude = Number(this.roomInof.lat)
				let longitude = Number(this.roomInof.lng)
				uni.openLocation({
				    latitude: latitude,
				    longitude: longitude, 
				    success: function () {
				        console.log('success');
				    }
				});
			},
		},
		mounted() {

		},
		onLoad(option) {
			this.getData(option.id)
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
	.page {
		background: #FFFFFF;
	}
	
	.navBox {
		width: 30%;
		top: 0;
		right: 0;
		position: fixed;
		z-index: 99;
	}
    
	.seticon{
		position: fixed;
		right: 50rpx;
		top: 80rpx;
		z-index: 99;
	}
	
	.fidex {
		position: fixed;
		z-index: 9;
	}

	.topLine {
		height: 148rpx;
	}

	.backBox {
		width: 690rpx;
		height: 360rpx;
	}

	.swiper {
		width: 690rpx;
		height: 360rpx;
	}


	.logoImg {
		width: 690rpx;
		height: 360rpx;
		border-radius: 20rpx;
	}

	.cutBox {
		width: 650rpx;
		padding: 0 20rpx;
	}

	.leftImg {
		width: 32rpx;
		height: 60rpx;
	}

	.contenBox {
		width: 690rpx;
	}

	.tags {
		margin-top: 10rpx;
		width: 100rpx;
		height: 30rpx;
	}

	.nameDetail {
		margin-top: 40rpx;
		font-size: 18px;
		color: #333333;
	}

	.pritext {
		color: #F07535;
		font-size: 34rpx;
		align-items: baseline;
	}

	.houseType {
		margin-top: 30rpx;
		width: 690rpx;
		background: #FFFFFF;
			box-shadow: 2rpx 2rpx 12rpx #d9d9d9;
		border-radius: 10rpx;
		padding: 20rpx 0rpx;
	}

	.itemwidth {
		width: 33%;
	}

	.line {
		width: 1px;
		height: 50rpx;
		background: #BFBFBF;
		position: absolute;
		right: 0;
	}

	.itemvalue {
		color: #F07535;
		font-size: 34rpx;
	}

	.itemtil {
		margin-top: 10rpx;
		color: #999999;
	}

	.isHave {
		margin-top: 30rpx;
		width: 650rpx;
		background: #FFFFFF;
			box-shadow: 2rpx 2rpx 12rpx #d9d9d9;
		border-radius: 10rpx;
		padding: 20rpx;
		color: #999999;
	}

	.isResult {
		color: #333333;
		align-items: baseline;
	}

	.addressBox {
		width: 630rpx;
		padding: 30rpx;
		background: #F5F5F5;
		border-radius: 10rpx;
	}

	.addImg {
		margin-top: 5rpx;
		width: 30rpx;
		height: 30rpx;
	}

	.briefRoom {
		margin-top: 30rpx;
		width: 650rpx;
		padding: 20rpx;
			box-shadow: 2rpx 2rpx 12rpx #d9d9d9;
		color: #4D4D4D;
		border-radius: 10rpx;
	}

	.consultImg {
		margin-top: 100rpx;
		width: 250rpx;
		height: 75rpx;
	}

	.addressmsg {
		width: 560rpx;
	}

	.btmLine {
		height: 100rpx;
	}

	.showBox {
		position: fixed;
		top: 0;
		width: 100%;
		height: 100vh;
		background: #000000;
		z-index: 99;
	}

	.showSwiper {
		width: 100%;
		height: 360rpx;
	}

	.showImg {
		width: 100%;
		height: 360rpx;
	}

	.haveBox {
		width: 50%;
	}

	.conName {
		color: #4D4D4D;
	}

	.userTel {
		color: #0078FF;
	}
	
	.setimg {
		right: 50rpx;
		bottom: 24rpx;
		width: 40rpx;
		height: 40rpx;
	}
</style>
