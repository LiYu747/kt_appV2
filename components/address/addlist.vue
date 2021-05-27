<template>
	<view class="">
		<view v-if="locdata.length>0" class="listbox" ref='fied'>
			<view class="content pos-rel fz-16" v-for="(item,index) in locdata" :key='item.id'>
				<view class="addres">
					<view v-if="item.own_village" @click="Select(item,index)" class="  name flex al-center  ju-between">
						{{item.own_village.name}}
						<view class="">
							<image class="reimg" src="../../image/goIn.png" mode=""></image>
						</view>
					</view>
					<view class="line m-t2"></view>
					<view v-if="item.address" class="text" @click="look(item)">
						{{item.address}}
					</view>
					<view class="line"></view>
					<view  class="botto">
						<view @click="callTenement(item)" class="Yueback m-r2 flex al-center ju-center">
							 <view class="fz-12">
							 	联系物业
							 </view>
						</view>
						<view @click="order(item)" class=" flex al-center ju-center elback">
							 <view class="fz-12 bai">
							 	预约电梯
							 </view>
						</view>
					</view>
				</view>

			</view>
		</view>
		<view v-if="locdata.length==0 && isLoding==false" class="nono flex al-center ju-center">
			暂无地址,快去添加吧
		</view>
		<view v-if='flag===true && msg' @mousewheel.prevent @touchmove.stop.prevent class="show pos-abs flex al-center ju-center">
			<view class="showbox flex-d al-center">
				<view v-show="message==true" class="flex-d al-center">
					<image src="https://oss.kuaitongkeji.com/static/img/app/address/scrcc.png" class="scrimg" mode=""></image>
					<view class="msg">
						{{msg}}
					</view>
				</view>
				<view v-show="message==false" class="flex-d al-center">
					<image src="https://oss.kuaitongkeji.com/static/img/app/address/no.png" class="noimg" mode=""></image>
					<image src="https://oss.kuaitongkeji.com/static/img/app/address/no1.png" class="ntimg" mode=""></image>
				</view>

				<view @click="sure" class="flex loca al-center ju-center">
					<view class="pos-abs sowtext bai">
						知道了
					</view>
					<image src="https://oss.kuaitongkeji.com/static/img/app/address/duan.png" class="showimg" mode=""></image>
				</view>
			</view>
		</view>


	</view>
</template>

<script>
	import address from '../../vendor/address/address.js'
	import village from '../../vendor/village/village.js'
	export default {
		name: "",
		components: {

		},
		props: {
			locdata: {
				type: Array
			},
			hasMore: {
				type: Boolean
			},
			isLoding: {
				type: Boolean
			}
		},
		data() {
			return {
				flag: false,
				message: true,
				msg: ''
			}
		},
		methods: {
			// 进入论坛
			Select(item, index) {
				uni.navigateTo({
					url: `/pages/communityForum/introduction/introduction?id=${item.village_id}`
				})
			},
			// 编辑
			look(item) {
				// console.log(item);	 
				uni.navigateTo({
					url: `/pages/address/addediting/ADDediting?id=${item.id}`
				})
			},
			//联系物业
			callTenement(item){
				uni.navigateTo({
					url:'/pages/address/addediting/tenement/tenement?id=' +  item.id
				})
			} ,
			// 预约电梯
			order(item) {
				this.flag = true
				this.message = true
				this.msg = '预约成功'
				uni.hideTabBar()
				return;
				uni.showLoading({
					title:'预约中...'
				})
				address.bookingElevator({
					data: {
						id: item.id,
						toFloor: 1
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
						if (res.statusCode != 200) return;

						if (res.data.code == 200) {
							this.message = true
							this.msg = res.data.msg
						} else {
							this.msg = res.data.msg
							this.message = false
						}
						// console.log(res.data.code);
					}
				})
				this.flag = true

			},
			// 确定关闭遮罩
			sure() {
				uni.showTabBar()
				this.flag = false
			},
		},
		mounted() {

		},
		onShow() {


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
	.listbox {
		margin-top: -96rpx;
		width: 690rpx;
		padding-left: 30rpx;
		padding-right: 30rpx;
	}

	.content {
		width: 600rpx;
		background: #FFFFFF;
		border-radius: 10rpx;
		margin-bottom: 30rpx;
		box-shadow: 2rpx 2rpx 12rpx #d9d9d9;
		padding-left: 60rpx;
		padding-right: 30rpx;
		padding-top: 30rpx;
		padding-bottom: 30rpx;
	}
    
	.name{
		height: 50rpx;
	}
	
	.zrimg {
		width: 24rpx;
		height: 24rpx;
	}

	.location {
		left: 20rpx;
		top: 30rpx; 
	}

	.addres {
		width: 100%;
		color: #666666;
	}

	.reimg {
		width: 20rpx;
		height: 30rpx; 
	}

	.line {
		width: 100%;
		height: 2rpx;
		background: #E6E6E6;
	}

	.text {
		width: 480rpx;
		padding: 40rpx 0;
	}

	.botto {
		 margin-top: 30rpx;
	     width: 100%;
		 display: flex;
		 justify-content: flex-end;
	}
	
	.Yueback{
		width: 140rpx;
		height:46rpx;
	    border: 1px solid #999999;
		border-radius: 10rpx;
		color: #999999;
	}
	
	.elback{
		width: 140rpx;
		height:50rpx;
			border-radius: 10rpx;
		background: #F07535;
	}

	.show {
		top: 0;
		width: 100%;
		height: 100vh;
		background: rgba(0, 0, 0, 0.3);
		z-index: 999;
		overflow: hidden;
		position: fixed;
	}

	.dv {
		position: fixed;
	}

	.showbox {
		width: 440rpx;
		height: 500rpx;
		background: #FFFFFF;
		border-radius: 20rpx;
	}

	.showimg {
		width: 230rpx;
		height: 60rpx;
	}

	.sowtext {
		font-size: 30rpx;
		z-index: 10;
	}

	.noimg {
		margin-top: -74rpx;
		width: 230rpx;
		height: 190rpx;
	}

	.ntimg {
		margin-top: 80rpx;
		width: 182rpx;
		height: 79rpx;
	}


	.scrimg {
		margin-top: -74rpx;
		width: 384rpx;
		height: 194rpx;
	}

	.scrtimg {
		margin-top: 80rpx;
		width: 220rpx;
		height: 37rpx;
	}

	.msg {
		color: rgb(254, 134, 72);
		width: 90%;
		height: 200rpx;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.nono {
		width: 100%;
		height: 300rpx;
		font-size: 14px;
		color: #333;
	}

	.lodimg {
		width: 30rpx;
		height: 30rpx;
		margin-right: 20rpx;
	}

	.lodbox {
		font-size: 24rpx;
	}
</style>
