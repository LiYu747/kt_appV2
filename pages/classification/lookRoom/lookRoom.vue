<template>
	<view class="">
		<subclass titel='找房'></subclass>
		<view class="flex-d al-center">
			<view class="contenBox">
				<view class="flex al-center m-t3 ju-between">
					<view @click="myRental" class="rentOut flex al-center">
						<image src="https://oss.kuaitongkeji.com/static/img/app/lookroom/sell.png" class="sellImg" mode=""></image>
						<view class="sellMsg">
							我要出租
						</view>
					</view>
					<view @click="mySellers" class="sellers m-l2 flex al-center">
						<image src="https://oss.kuaitongkeji.com/static/img/app/lookroom/buy.png" class="buyImg" mode=""></image>
						<view class="sellMsg">
							我要卖房
						</view>
					</view>
				</view>
				<view class="item m-t3">
					<view class="titel flex al-center ju-between">
						租房
						<view v-if="rentingRoom.length>0" @click="addmore" class="bricolor fz-14 flex al-center">
							更多
							<image src="https://oss.kuaitongkeji.com/static/img/app/lookroom/more.png" class="moreimg" mode=""></image>
						</view>
					</view>
					<view v-if="rentingRoom.length>0" class="flex ">
						<view class="items m-b1" @click="gotoDetails(items)" v-for=" items in rentingRoom" :key='items.id'>
							<image v-if="items.cover" :src="items.cover" class="itemsimg" mode="aspectFill"></image>
							<image v-else src="https://oss.kuaitongkeji.com/upload/2021/02/20/Kztg485iqwsrKNrDLXKIeQ7apbhuyi4v1SHpslOv.jpeg"
							 class="itemsimg" mode="aspectFill"></image>
							<view class="itemsname m-t1 fz-14">
								{{items.title}}
							</view>
							<view class="fz-12 bricolor">
								{{items.introduce}}
								<view v-if="items.area" class="">
									/{{items.area}}㎡
								</view>
							</view>
							<view class="pritext flex m-t1">
								{{items.rents}}
								<view class="fz-12">
									元/月
								</view>

							</view>
						</view>
					</view>
					<view v-if="rentingRoom.length == 0" class="flex ju-center fz-12 nomsg">
						{{notext}}
					</view>
				</view>
				<view class="item m-t3">
					<view class="titel flex al-center ju-between">
						买房
						<view v-if="sellRoom.length>0" @click="moreBuye" class="bricolor fz-14 flex al-center">
							更多
							<image src="https://oss.kuaitongkeji.com/static/img/app/lookroom/more.png" class="moreimg" mode=""></image>
						</view>
					</view>
					<view v-if="sellRoom.length>0" class="flex ">
						<view class="items" @click="gotoBuy(items)" v-for=" items in sellRoom" :key='items.id'>
							<image v-if="items.cover" :src="items.cover" class="itemsimg" mode="aspectFill"></image>
							<image v-else src="https://oss.kuaitongkeji.com/upload/2021/02/20/Kztg485iqwsrKNrDLXKIeQ7apbhuyi4v1SHpslOv.jpeg"
							 class="itemsimg" mode="aspectFill"></image>
							<view class="itemsname m-t1 fz-14">
								{{items.title}}
							</view>
							<view class="fz-12 bricolor">
								{{items.introduce}}/{{items.area}}㎡
							</view>
							<view class="pritext flex m-t1">
								{{items.sale_price}}
								<view class="fz-12">
									万
								</view>
							</view>
						</view>
					</view>
					<view v-if="sellRoom.length == 0" class="flex ju-center fz-12 nomsg">
						{{notext2}}
					</view>
				</view>
			</view>
		</view>

		<view class="btmLine">

		</view>
	</view>
</template>

<script>
	import subclass from '../../../components/sub-class/subclass.vue'
	import home from '../../../vendor/home/home.js'
	export default {
		name: "",
		components: {
			subclass
		},
		props: {},
		data() {
			return {
				rentingRoom: [],
				sellRoom: [],
				notext: '',
				notext2: ''
			}
		},
		methods: {

			// 更多租房
			addmore() {
				// console.log(item);
				uni.navigateTo({
					url: '/pages/classification/lookRoom/rentRoom/moreRoom'
				})
			},
			//更多买房
			moreBuye() {
				uni.navigateTo({
					url: '/pages/classification/lookRoom/buyHouse/moreBuy'
				})
			},
			// 去租房详情
			gotoDetails(items) {
				uni.navigateTo({
					url: '/pages/classification/lookRoom/rentRoom/detailRoom?id=' + items.id
				})
			},
			//去买房详情
			gotoBuy(items) {
				uni.navigateTo({
					url: '/pages/classification/lookRoom/buyHouse/buyDetails?id=' + items.id
				})
			},
			// 我要出租
			myRental() {
				uni.navigateTo({
					url: '/pages/classification/lookRoom/rentalForm'
				})
			},
			//我要卖房
			mySellers(){
			uni.navigateTo({
				url: '/pages/classification/lookRoom/sellersForm'
			})
			},
			// 所有的出租房信息
			getRoom() {
				home.allRoom({
					data: {
						page: 1,
						pageSize: 3
					},
					fail: () => {
						uni.showToast({
							title: '网络错误',
							icon: 'none'
						})
					},
					success: (res) => {
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
						let data = res.data.data.data
						data.map(item => {
							item.introduce = item.room + '室' + item.hall + '厅' 
						})
						if (data.length == 0) {
							this.notext = '还没有人发布租房信息'
						}
						this.rentingRoom = data
					}
				})
			},
			// 所有出售房信息
			getSell() {
				home.sellRecords({
					data: {
						page: 1,
						pageSize: 3
					},
					fail: () => {
						uni.showToast({
							title: '网络错误',
							icon: 'none'
						})
					},
					success: (res) => {
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
						let data = res.data.data.data
						data.map(item => {
							item.introduce = item.room + '室' + item.hall + '厅' 
						})
						if (data.length == 0) {
							this.notext2 = '还没有人发布卖房信息'
						}
						this.sellRoom = data
					}
				})


			}
		},
		onShow() {

		},
		mounted() {
			this.getRoom()
			this.getSell()
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
	.contenBox {
		width: 690rpx;
	}

	.item {
		width: 650rpx;
		background: #FFFFFF;
		border-radius: 20rpx;
		padding: 0rpx 20rpx;
		padding-bottom: 20rpx;
		box-shadow: 2rpx 2rpx 12rpx #d9d9d9;
	}

	.titel {
		height: 90rpx;
		font-size: 34rpx;
		color: #333333;
	}

	.itemsname {
		width: 200rpx;
		display: -webkit-box;
		overflow: hidden;
		/*超出部分隐藏*/
		text-overflow: ellipsis;
		/* 超出部分显示省略号 */
		white-space: normal;
		/*规定段落中的文本不进行换行 */
		word-wrap: break-word;
		-webkit-line-clamp: 1;
		-webkit-box-orient: vertical;
	}
	
	.items{
		margin-left: 14rpx;
	}

	.itemsimg {
		width: 200rpx;
		height: 160rpx;
		border-radius: 10rpx;
	}

	.bricolor {
		color: #666666;
	}

	.pritext {
		color: #F07535;
		font-size: 32rpx;
		align-items: baseline;
	}

	.moreimg {
		width: 15rpx;
		height: 21rpx;
		margin-left: 8rpx;
	}

	.btmLine {
		height: 50rpx;
	}

	.simulation {
		display: flex;
		justify-content: center;
		margin-top: 20rpx;
		font-size: 30rpx;
		color: #b3b3b3;
	}

	.rentOut {
		width: 335rpx;
		height: 100rpx;
		background: #F84E4E;
		border-radius: 10rpx;
	}

	.sellers {
		width: 335rpx;
		height: 100rpx;
		background: #FF9126;
		border-radius: 10rpx;
	}

	.sellImg {
		width: 66rpx;
		height: 66rpx;
		margin-left: 60rpx;
	}

	.buyImg {
		width: 58rpx;
		height: 65rpx;
		margin-left: 60rpx;
	}

	.sellMsg {
		color: #ffffff;
		font-size: 34rpx;
		margin-left: 20rpx;
	}

	.nomsg {
		color: #CCCCCC;
		padding: 20rpx 0;
	}
</style>
