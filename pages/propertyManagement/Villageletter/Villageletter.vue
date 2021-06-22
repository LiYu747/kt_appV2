<template>
	<view class="">
		<subunit titel='小区信息'></subunit>
		<view v-if="code == 200" class="flex-d al-center">
			<view class="swpBox m-t3">
				<u-swiper @click="look" :list="list" border-radius='10' height="350"></u-swiper>
			</view>
			<view class="conBox m-t4">
				<view class="fz-16">
					{{villinfo.name}}
				</view>
				<view class=" fz-14 cl6 m-t1">
					地址：{{villinfo.address}}
				</view>
				<view class="fz-14 m-t3">
					简介
				</view>
				<view class="brief m-t2 fz-12">
					<view v-if="villinfo.brief" class="foot">
						<u-parse :html="villinfo.brief"></u-parse>
					</view>
				</view>
			</view>
		</view>
		<view class="btmLine">
			
		</view>
		<view v-show="isLoding == true" class="showloding flex al-center ju-center">
			<view class="loding flex-d al-center ju-center">
				<view class=" ">
					<image class="loimg" src="https://oss.kuaitongkeji.com/static/img/app/address/loading.gif" mode="">
					</image>
				</view>
				加载中
			</view>
		</view>
	</view>
</template>

<script>
	import subunit from '../../../components/sub-unit/subunit.vue'
	import home from "../../../vendor/home/home.js"
	import jwt from '../../../vendor/auth/jwt.js'
	import cache from '../../../vendor/cache/cache.js'
	export default {
		name: "",
		components: {
			subunit
		},
		props: {

		},
		data() {
			return {
				code:0,
				localist: ['https://oss.kuaitongkeji.com/static/img/app/forum/timg.jpg'],
				list: [], //轮播图
				villinfo: {}, //小区展示信息
				isLoding: false,
			}
		},
		methods: {
			// 小区展示信息
			Information() {
				this.isLoding = true
				home.getVillageinfo({
					data: {
						
					},
					fail: () => {
						this.isLoding = false
						uni.showToast({
							title: '网络错误',
							icon: 'none'
						})
					},
					success: (res) => {
						this.isLoding = false
						if (res.statusCode != 200) return
						if(res.data.code == 403){
							uni.showModal({
								content:res.data.msg,
								success: () => {
									uni.navigateBack({
										delta:1
									})
								}
							})
							return;
						}
						if (res.data.code != 200){
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							})
							return;
						} 
						this.code = res.data.code
						let data = res.data.data
						let img = ['https://oss.kuaitongkeji.com/upload/2020/12/15/AY0xTVMZBzNuJ0acHphXphi4gewrdyJeuBoypUCH.jpeg']
						this.list = !data.album || data.album.length == 0 ? img : data.album
						this.villinfo = data
					}
				})
			},
		  // 查看图片
		  look(index) {
		  	// 预览图片
		  	uni.previewImage({
		  		urls:this.list, 
		  		current: index,
		  		indicator:"default",
		  	});
		  
		  },
		
		},
		mounted() {

			this.Information()
		},
		onLoad() {
		},
		onShow() {
			
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
	
   .swpBox{
	   width: 690rpx;
	   border-radius: 10rpx;
   }

	/deep/ .u-swiper-indicator[data-v-a5b2d580] {
		bottom: 60rpx !important;
	}
	
	.conBox{
		width: 690rpx;
	}
	
	.brief{
		width: 630rpx;
		padding: 20rpx 30rpx;
		background: #F0F0F0;
		border-radius: 10rpx;
	}

	.showloding {
		position: absolute;
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
	
	.cl6{
		color: #666666;
	}
	
	.btmLine{
		height: 50rpx;
	}
</style>
