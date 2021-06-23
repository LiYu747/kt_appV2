<template>
	<view class="flex-d al-center">
		<submit class="fixed"></submit>
		<view class="line ">
			<view class="ipt  ju-center flex al-center pos-rel">
				<image class="img pos-abs" src="https://oss.kuaitongkeji.com/static/img/app/home/ss.png" mode=""></image>
				<input class="input" type="text" v-model.trim="keyword" @confirm='confirm' placeholder="请输入帖子关键词" />
				<image @click="empty" src="https://oss.kuaitongkeji.com/static/img/app/forum/clier.png" class="clierimg" mode=""></image>
				<view v-show="keyword !=''" @click="empty" class="fixed rig">
					取消
				</view>
			</view>
		</view>
		
		<view class="swip" v-if="flag == false">
			<view class=" flex al-center ">
				<view class="tabsl">
					<u-tabs-swiper ref="uTabs" active-color='#F07535' :list="tagdata" :current="current" @change="tabsChange"
					 :is-scroll="true" swiperWidth="750"></u-tabs-swiper>
				</view>
				分类
			</view>

			<view class="">
				<swiper :current="swiperCurrent" @transition="transition" @animationfinish="animationfinish">
					<swiper-item class="swiper-item" v-for="(items, index) in tagdata" :key="index">
						<scroll-view scroll-y style="height:100%" @scrolltolower="onreachBottom">
							<view class="item" v-for="(item,index) in items.arr" @click="gotoD(item)" :key='index'>
								<view class="flex">
									<!-- 头像 -->
									<image :src="item.own_user.avatar" class="itemimg" mode=""></image>
									<view class="name m-l1 m-t1">
										{{item.own_user.nickname}}
										<view class="time">
											{{item.created_at.slice(0,16)}}
										</view>
									</view>
								</view>
								<!-- 内容 -->
								<view class="content">
									<view class="show">
										{{item.title}}
									</view>
								</view>
								<!-- 图片 -->
								<view class="flex al-center m-t4">
									<view v-for="(items,indexs) in item.album.slice(0,3)" :key='indexs'>
										<image :src="items.url" class="items" mode="aspectFill"></image>
									</view>
								</view>
							</view>
							<view class="flex ju-center  notext fz-12" v-if="items.notext">
								{{items.notext}}
							</view>
							<view v-show="isLoding == true &&items.arr.length!=0" class="m-t2 flex ju-center al-center lodbox">
								<image class="lodimg" src="https://oss.kuaitongkeji.com/static/img/app/address/loading.gif" mode=""></image>
								加载中...
							</view>
							<view class="notext fz-12 flex ju-center" v-if="items.hasMore == false&&items.arr.length>0">
								{{notext}}
							</view>
						</scroll-view>
					</swiper-item>
				</swiper>
			</view>
		</view>

		<view v-if="flag == true" class="">
			<view class="item" v-for="item in serachdata" :key='item.id'>
				<view class="flex">
					<!-- 头像 -->
					<image :src="item.own_user.avatar" class="itemimg" mode=""></image>
					<view class="name m-l1 m-t1">
						{{item.own_user.nickname}}
						<view class="time">
							{{item.created_at.slice(0,16)}}
						</view>
					</view>
				</view>
				<!-- 内容 -->
				<view class="content">
					<view class="show">
						{{item.title}}
					</view>
				</view>
				<!-- 图片 -->
				<view class="flex al-center m-t4">
					<view v-for="(items,indexs) in item.album.slice(0,3)" :key='indexs'>
						<image :src="items.url" class="items" mode="aspectFill"></image>
					</view>
				</view>
			</view>
			<view v-if="isLoding == true " class=" flex ju-center al-center lodbox">
				<image class="lodimg" src="https://oss.kuaitongkeji.com/static/img/app/address/loading.gif" mode=""></image>
				加载中...
			</view>
			<view v-if="isLoding == false && serachdata.length==0" class="notext fz-12">
				没有您搜索的帖子
			</view>
			<view v-if="hasMore == false" class="notext fz-12 flex ju-center">
				{{seratext}}
			</view>
			<view class="btmLine">

			</view>
		</view>

		<view v-show="isLoding == true && tagdata.length==0" class="showloding flex al-center ju-center">
			<view class="loding flex-d al-center ju-center">
				<view class=" ">
					<image class="loimg" src="https://oss.kuaitongkeji.com/static/img/app/address/loading.gif" mode=""></image>
				</view>
				加载中
			</view>
		</view>
		<subbotn></subbotn>
	</view>
</template>

<script>
	import submit from '../../sub-unit/subunit.vue'
	import village from '../../../vendor/village/village.js'
	import subbotn from '../../sub-botn/subbotn.vue'
	export default {
		name: "",
		components: {
			submit,
			subbotn
		},
		props: {},
		data() {
			return {
				id: 1, //小区id
				tagdata: [],
				current: 0, // tabs组件的current值，表示当前活动的tab选项
				swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
				page: 1,
				ps: 15,
				idx: 0, //选择的类别
				hasMore: true, //是否有更多
				isLoding: false, //加载中
				notext: '', //没有更多了
				keyword: '', //搜索关键词
				flag: false, //展示搜索列表
				seratext: '', //搜索没有更多了
				serapage: 1, //搜索page
				serachdata: [] //搜索数据
			}
		},
		methods: {
			// 搜索
			confirm() {
				if (this.keyword == '') return;
				this.flag = true
				this.isLoding = true
				village.communityPost({
					data: {
						villageId: this.id,
						// tribune_cat: item.id,
						kw: this.keyword,
						page: this.serapage,
						pageSize: this.ps
					},
					fail: (err) => {
						this.isLoding = false
						uni.showToast({
							title: '网络错误',
							icon: 'none'
						})
					},
					success: (res) => {
						this.isLoding = false
						if (res.statusCode != 200) return;

						if (res.data.code != 200) return;
						let data = res.data.data;
						console.log(data);
						this.hasMore = data.next_page_url ? true : false;
						this.serapage = data.current_page + 1
						this.serachdata = this.serachdata.concat(data.data)
					},
				})
			},

			// 清空
			empty() {
				this.flag = false
				this.keyword = ''
				this.seratext = ''
				this.serapage = 1
				this.serachdata = []
			},

			//获取默认栏目列表
			grtColumn() {
				this.isLoding = true
				village.DefaultColumnList({
					data: {},
					fail: () => {
						uni.showToast({
							title: '网络错误',
							icon: 'none'
						})
					},
					success: (res) => {
						if (res.statusCode != 200) return;
						if (res.data.code != 200) return;
						res.data.data.map(item => {
							item.arr = []
							item.hasMore = false
							item.page = 1
							item.notext = null
							item.nono = null
							// 获取数据
							village.communityPost({
								data: {
									villageId: this.id,
									tribune_cat: item.id,
									kw: this.keyword,
									page: this.page,
									pageSize: this.ps
								},
								fail: (err) => {
									this.isLoding = false;
									// console.log(err);
									uni.showToast({
										title: '网络错误',
										icon: 'none'
									})
								},
								success: (res) => {
									// console.log(res);
									this.isLoding = false;

									if (res.statusCode != 200) return;

									if (res.data.code != 200) return;

									let data = res.data.data;

									if (data.data.length > 0) {
										item.arr = data.data
									}
									if (data.data.length == 0) {
										item.notext = '没有您想看类型的帖子,试试其他的吧'
									}
									item.hasMore = data.next_page_url ? true : false;
									item.page = data.current_page + 1
								},

							})

						})
						this.tagdata = res.data.data
					}
				})
			},

			// 去详情
			gotoD(item) {
				uni.navigateTo({
					url: `/components/forum/forumdils?id=${item.id}`
				})
			},

			// tabs通知swiper切换
			tabsChange(index) {
				this.idx = index
				this.swiperCurrent = index;
				this.notext = ''
			},
			// swiper-item左右移动，通知tabs的滑块跟随移动
			transition(e) {
				let dx = e.detail.dx;
				this.$refs.uTabs.setDx(dx);
			},
			// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
			// swiper滑动结束，分别设置tabs和swiper的状态
			animationfinish(e) {
				let current = e.detail.current;
				this.$refs.uTabs.setFinishCurrent(current);
				this.swiperCurrent = current;
				this.current = current;
			},
			// scroll-view到底部加载更多
			onreachBottom(e) {
				this.notext = '没有更多了'
				this.tagdata.map((item, index) => {
					// 获取数据
					if (item.hasMore == true && index == this.idx && this.isLoding == false) {
						this.isLoding = true
						village.communityPost({
							data: {
								villageId: this.id,
								tribune_cat: item.id,
								kw: this.keyword,
								page: item.page,
								pageSize: this.ps
							},
							fail: () => {
								this.isLoding = false;
								// console.log(err);
								uni.showToast({
									title: '网络错误',
									icon: 'none'
								})
							},
							success: (res) => {
								// console.log(res);
								this.isLoding = false;

								if (res.statusCode != 200) return;

								if (res.data.code != 200) return;

								let data = res.data.data;

								this.page = data.current_page + 1;
								this.hasMore = data.next_page_url ? true : false;
								// this.lists = data.data
								item.arr = item.arr.concat(data.data)
								item.hasMore = data.next_page_url ? true : false;
								item.page = data.current_page + 1
							},

						})
					}
				})
			}
		},
		mounted() {
			this.grtColumn()
		},
		onLoad(option) {

		},
		onReachBottom() {
			this.seratext = '没有更多了'
			if (this.hasMore == false || this.isLoding == true) return
			this.confirm()

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
	.fixed {
		position: fixed;
		z-index: 9;
	}

	.topLine {
		height: 148rpx;
	}

	.line {
		width: 100%;
		height: 148rpx;
	}

	.searchimg {
		width: 34rpx;
		height: 34rpx;
		z-index: 99;
		position: absolute;
		right: 54rpx;
		top: 74rpx;
		position: fixed;
	}

	.ipt {
		top: 100rpx;
		z-index: 99;
	}

	.img {
		width: 38rpx;
		height: 38rpx;
		left: 168rpx;
		position: fixed;
	}

	.input {
		position: fixed;
		width: 394rpx;
		height: 54rpx;
		background: rgba(255, 255, 255, 0.3);
		border-radius: 27px;
		padding-left: 75rpx;
		font-size: 24rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #FFFFFF;
	}

	.uni-input-placeholder {
		color: #FFFFFF;
	}

	.rig {
		right: 50rpx;
		font-size: 30rpx;
		color: #FFFFFF;
	}

	.clierimg {
		width: 24rpx;
		height: 24rpx;
		position: absolute;
		right: 170rpx;
		position: fixed;
	}

	.notext {
		padding: 30rpx 0;
	}

	.tabsl {
		width: 90%;
	}

	.swip {
		width: 100%;
	}

	uni-swiper {
		height: calc(100vh - 348rpx);
		box-sizing: border-box;
		// background: #F07535;
	}

	.itemimg {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
	}

	.item {
		width: 690rpx;
		padding: 30rpx;
		border-bottom: 1rpx solid #BFBFBF;
		color: #666666;
	}

	.name {
		font-size: 26rpx;
		color: #F07535;
	}

	.time {
		color: #B3B3B3;
		font-size: 24rpx;
		margin-top: 10rpx;
		-webkit-transform: scale(0.8);
		-webkit-transform-origin: left top
	}

	.content {
		margin-top: 20rpx;
		width: 650rpx;
		background: rgb(230, 230, 230);
		padding: 20rpx 20rpx;
		font-size: 28rpx;
	}

	.show {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	.items {
		width: 150rpx;
		height: 170rpx;
		margin-right: 20rpx;
		margin-bottom: 10rpx;
	}

	.lodimg {
		width: 30rpx;
		height: 30rpx;
		margin-right: 20rpx;
	}

	.lodbox {
		font-size: 24rpx;
		padding: 30rpx 0;
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

	.itemName {
		width: 750rpx;
		height: 400rpx;
		background: red;
		margin-top: 40rpx;
	}

	.btmLine {
		height: 120rpx;
	}
</style>
