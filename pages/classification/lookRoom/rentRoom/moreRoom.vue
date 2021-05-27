<template>
	<view class="">
		<view class="fixed">
			<subunit class="" titel='租房'></subunit>
			<view class="tilBox  flex al-center ju-between">
				<view class="flex al-center" v-for="item in keyword" :key='item.id'>
					{{item.name}}
					<view class=" nextimg">
						▼
					</view>
				</view>
			</view>
		</view>
		<view class="topLine">

		</view>
		<view class="flex-d al-center">
			<view v-if="rentingRoom.length > 0" class="flex-d al-center">
				<view class="contenBox m-t3 flex ju-between pos-rel" @click="gotoDetails(item)" v-for="item in rentingRoom"
					:key='item.id'>
					<image v-if="item.cover" :src="item.cover" class="itemImg" mode="aspectFill"></image>
					<image v-else
						src="https://oss.kuaitongkeji.com/upload/2021/02/20/Kztg485iqwsrKNrDLXKIeQ7apbhuyi4v1SHpslOv.jpeg"
						class="itemImg" mode="aspectFill"></image>
					<view class="msgBox">
						<view class="itemName">
							{{item.title}}
						</view>
						<view class="fz-12 flex szcolor">
							<view v-if="item.area" class="">
								{{item.area}}㎡
							</view> 
							{{item.brief}}/{{item.zx}}
						</view>
						<view class="fz-12 szcolor">
							{{item.address_name}}
						</view>
						<view class=" szcolor pritext flex al-center ">
							<view class=" fz-16">
								{{item.rents}}
							</view>
							<view class="fz-12">
								元/月
							</view>
						</view>
					</view>
					<view class="nextTex  pos-abs">
						<image
							src="https://oss.kuaitongkeji.com/static/img/app/classification/Healthcare/next.png"
							class="nextImg" mode=""></image>
					</view>
				</view>
				<view v-if="hasMore == false" class="notext fz-12">
					{{text}}
				</view>
				<view v-if="isLoding == true" class=" flex ju-center al-center lodbox">
					<image class="lodimg" src="https://oss.kuaitongkeji.com/static/img/app/address/loading.gif" mode="">
					</image>
					加载中...
				</view>
			</view>
		</view>

		<view v-show="isLoding == true && rentingRoom.length==0" class="showloding flex al-center ju-center">
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
	import subunit from '../../../../components/sub-unit/subunit.vue'
	import home from '../../../../vendor/home/home.js'
	export default {
		name: "",
		components: {
			subunit
		},
		props: {},
		data() {
			return {
				rentingRoom: [],
				keyword: [{
					name: '区域'
				}, {
					name: '房型'
				}, {
					name: '价格'
				}, {
					name: '更多'
				}],
				page: 1,
				pageSize: 15,
				hasMore: true,
				isLoding: false,
				text: '',
			}
		},
		methods: {
			// 去详情
			gotoDetails(item) {
				uni.navigateTo({
					url: '/pages/classification/lookRoom/rentRoom/detailRoom?id=' + item.id
				})
			},
			// 所有的出租房信息
			getRoom() {
				this.isLoding = true
				home.allRoom({
					data: {
						page: this.page,
						pageSize: this.pageSize
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
						data.data.map(item => {
							if (item.zx == 'low') {
								item.zx = '清水房'
							}
							if (item.zx == 'simple') {
								item.zx = '简装'
							}
							if (item.zx == 'well') {
								item.zx = '精装'
							}
							let bathroom = item.bathroom != null ? item.bathroom + '卫' : "";
							let hall = item.hall != null ? item.hall + '厅' : '';
							item.brief = item.room + '室' + hall + bathroom
						})
						this.page = data.current_page + 1;
						this.hasMore = data.next_page_url ? true : false;
						this.rentingRoom = this.rentingRoom.concat(data.data)
					}
				})
			},
		},
		mounted() {
			this.getRoom()
		},
		onShow() {

		},
		// 下拉更多
		onReachBottom() {
			this.text = '没有更多了~'
			if (this.isLoding == true || this.hasMore == false) return;
			this.getRoom()
		},
		onLoad() {},
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
		z-index: 99;
	}

	.topLine {
		height: 230rpx;
	}

	.tilBox {
		width: 650rpx;
		height: 80rpx;
		background: #FFFFFF;
		padding: 0 50rpx;
		font-size: 32rpx;
		color: #666666;
		border-bottom: 1px solid #CCCCCC;
	}

	.nextimg {
		margin-left: 8rpx;
		margin-top: 5rpx;
		font-size: 10px;
	}

	.contenBox {
		width: 650rpx;
		background: #FFFFFF;
		box-shadow: 2rpx 2rpx 12rpx #d9d9d9;
		border-radius: 10px;
		padding: 20rpx 30rpx;
	}

	.itemImg {
		width: 200rpx;
		height: 190rpx;
		border-radius: 10rpx;
	}

	.msgBox {
		width: 430rpx;
	}

	.itemName {
		color: #333333;
		font-size: 28rpx;
	}

	.szcolor {
		margin-top: 10rpx;
		color: #999999;
	}

	.tags {
		margin-top: 10rpx;
		width: 100rpx;
		height: 30rpx;
	}

	.itempri {
		font-size: 14px;
		color: #F07535;
	}

	.nextImg {
		width: 12rpx;
		height: 20rpx;
		margin-left: 10rpx;
		margin-top: 5rpx;
	}

	.nextTex {
		bottom: 20rpx;
		right: 30rpx;
	}

	.pritext {
		color: #F07535;
		align-items: baseline;
	}

	.notext {
		padding: 20rpx 0;
		color: #333333;
	}

	.lodimg {
		width: 30rpx;
		height: 30rpx;
		margin-right: 20rpx;
	}

	.lodbox {
		font-size: 24rpx;
		padding: 20rpx;
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
</style>
