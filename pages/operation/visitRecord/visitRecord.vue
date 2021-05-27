<template>
	<view class="">
		<subunit titel="来访记录"></subunit>
		<view class="flex-d al-center">
			<view v-if="lists.length > 0" class="">
				<view class="card" v-for="(items,indexs) in lists" @click="godetails(items,indexs)" :key='items.id'>
					<view class="bx1 flex al-center pos-rel">
						<image src="https://oss.kuaitongkeji.com/static/img/app/visit/user.png" class="dv3" mode=""></image>
						<view class="">
							{{items.own_visitor.username}}
						</view>
						<view class=" pos-abs rig">
							{{items.verify_status}}
							>
						</view>
					</view>
					<view class="bx1 flex al-center">
						<image src="https://oss.kuaitongkeji.com/static/img/app/visit/phone.png" class="dv1" mode=""></image>
						<view class="">
							{{items.own_visitor.tel}}
						</view>
					</view>
					<view class="bx1 flex al-center">
						<image src="https://oss.kuaitongkeji.com/static/img/app/visit/time.png" class="dv3" mode=""></image>
						<view class="">
							{{items.created_at}}
						</view>
					</view>
					<view class="bx2 flex al-center">
						<image src="https://oss.kuaitongkeji.com/static/img/app/visit/pos.png" class="dv3" mode=""></image>
						<view class="" v-if="items.place">
							{{items.place}}
						</view>
					</view>
				</view>
				<view v-show="isLoding == true" class=" flex ju-center al-center lodbox">
					<image class="lodimg" src="https://oss.kuaitongkeji.com/static/img/app/address/loading.gif" mode=""></image>
					加载中...
				</view>
				<view class="flex ju-center notext fz-14" v-if="hasMore == false">
					{{text}}
				</view>
			</view>
			<view v-if='lists.length == 0 && isLoding == false' class="nono flex al-center ju-center">
				您还没有来访记录
			</view>
		
			<view v-show="isLoding == true&&lists.length==0" class="showloding flex al-center ju-center">
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
	import home from '../../../vendor/home/home.js';
	import jwt from '../../../vendor/auth/jwt.js';

	export default {
		name: "",
		components: {
			subunit
		},
		props: {},
		data() {
			return {
				idx:0,
				text: '', //没有有更多提示
				lists: [], //数据列表
				page: 1,
				ps: 15,
				isLoding: false, //是否显示loding
				hasMore: true, //是否还有更多
			}
		},
		methods: {
			// 去详情
			godetails(item,index) {
				this.idx = index
				uni.navigateTo({
					url: `/pages/operation/details/details?id=${item.id}`
				})
			},

			// 获取数据
			getData() {
				this.isLoding = true;
				home.Visitrecord({
					data: {
						page: this.page,
						pageSize: this.ps
					},
					fail: () => {
						this.isLoding = false;
						uni.showToast({
							title: '网络错误',
							icon: 'none'
						})
					},
					success: (res) => {

						this.isLoding = false;

						if (res.statusCode != 200) return;

						if (res.data.code != 200) return;

						let data = res.data.data;

						this.page = data.current_page + 1;
						this.hasMore = data.next_page_url ? true : false;
						data.data.map(item => {
							item.own_visitor.tel = item.own_visitor.tel.slice(0, 3) + '****' + item.own_visitor.tel.slice(7, 11)
					    	item.created_at  =	item.created_at.slice(0,16)
							switch(item.verify_status){
								case 1:
								item.verify_status  = "待处理"
								break;
								case 2:
								item.verify_status  = "已同意"
								break;
								case 3:
								item.verify_status  = "未同意"
								break;
							}
						})
						this.lists = this.lists.concat(data.data);

						// console.log(this.lists);
					},

				})
			},
			// 判断是否登录
			loadPageData() {
				jwt.doOnlyTokenValid({
					keepSuccess: false,
					showModal: true,
					fail: () => {
						uni.switchTab({
							url: '/pages/index/index'
						})
					},
					success: () => {
						if (this.lists.length == 0) {
							this.getData()
						}
					}
				})

			},
			//判断用户是否进行了操作
			userisDo() {
				let code = this.$store.state.iSuserDO
				if (code == 0) return;
				let msg = ''
				if (code== 2) {
					msg = '已同意'
				}
				if (code == 3) {
					msg = '未同意'
				}
				this.lists.map((item, index) => {
					if (index == this.idx) {
						item.verify_status = msg
					}
				})
			}
		},
		mounted() {

		},
		onLoad() {

		},
		onShow() {
			this.loadPageData()
			this.userisDo()
		},
		// 下拉触底
		onReachBottom() {
			this.text = '没有更多了'
			if (this.isLoding == true || this.hasMore == false) return;
			this.loadPageData();

		},
		onHide() {
			this.$store.commit('iSuserDO', 0)
		},
		onPullDownRefresh() {

			// this.loadPageData();
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
	.card {
		margin-top: 20rpx;
		width: 690rpx;
		background: #FFFFFF;
		border-radius: 10rpx;
		box-shadow: 2rpx 2rpx 12rpx #d9d9d9;
		font-size: 26rpx;
	}

	.bx1 {
		height: 80rpx;
		border-bottom: 1rpx solid #cccccc;
	}

	.bx2 {
		height: 80rpx;
	}

	.left {
		width: 70rpx;
	}

	.itemimg {
		width: 28rpx;
		height: 28rpx;
	}

	.dv1 {
		width: 22rpx;
		height: 30rpx;
		margin: 0 24rpx;
	}

	.dv2 {
		width: 30rpx;
		height: 22rpx;
		margin: 0 20rpx;
	}

	.dv3 {
		width: 30rpx;
		height: 30rpx;
		margin: 0 20rpx;
	}

	.dv4 {
		width: 32rpx;
		height: 32rpx;
		margin: 0 20rpx;
	}

	.item {
		height: 80rpx;
		color: #666666;
		border-bottom: 1rpx solid #cccccc;
	}

	.bot {
		border: none;
	}

	.rig {
		right: 30rpx;
		color: rgb(229, 75, 68);
	}

	.fled {
		position: fixed;
		z-index: 9;
	}

	.top {
		margin-top: 148rpx;
	}

	.bottom {
		margin-bottom: 40rpx;
	}

	.nono {
		width: 100%;
		height: 300rpx;
		font-size: 14px;
		color: #666666;
	}

	.notext {
		padding: 30rpx;
		font-size: 12px;
	}

	.lodimg {
		width: 30rpx;
		height: 30rpx;
		margin-right: 20rpx;
	}

	.lodbox {
		padding: 20rpx 0;
		font-size: 24rpx;
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
