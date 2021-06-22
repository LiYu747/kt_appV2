<template>
	<view class="">
		<subunit></subunit>
		<view class="navBox" :style="{height:  this.$store.state.customBar + 'rpx'}">
			<view class="ipt  flex al-center pos-abs">
				<image class="img pos-abs" src="https://oss.kuaitongkeji.com/static/img/app/home/ss.png" mode="">
				</image>
				<input class="input" type="text" v-model.trim="value" @confirm='confirm' placeholder="请输入帖子关键词" />
				<image @click="empty" src="https://oss.kuaitongkeji.com/static/img/app/forum/clier.png" class="clierimg"
					mode=""></image>
				<view v-show="flag == true" @click="remove" class="rig m-l2">
					取消
				</view>
			</view>
		</view>
		<!-- tag标签 -->
		<view v-if="flag == false" class="back">
			<view class="wid">
				<u-tabs-swiper v-if="tagdata.length > 0" ref="uTabs" active-color='#F07535' :list="tagdata" :current="current"
					@change="tabsChange" :is-scroll="true" swiperWidth="750"></u-tabs-swiper>
			</view>
		</view>
		<view v-if="flag == false" class="lines">  

		</view>
		<view v-if="flag == false" class="release">
			<swiper :current="swiperCurrent" @change="Onchange" :style="hig" style="box-sizing: border-box;"
				@transition="transition" @animationfinish="animationfinish">
				<swiper-item class="swiper-item" v-for="(items, index) in tagdata" :key="index">
					<scroll-view scroll-y style="height:100%;width: 100%;" @scrolltolower="onreachBottom">
						<view class="">

							<view class="item" @click="gotoD(item)" v-for="item in items.list" :key='item.id'>
								<view class="flex">
									<!-- 头像 -->
									<image :src="item.own_poster.avatar" class="itemimg" mode="aspectFill"></image>
									<view class="name m-l1 m-t1">
										{{item.own_poster.nickname}}
										<view class="time">
											{{item.created_at}}
										</view>
									</view>
								</view>
								<!-- 标题 -->
								<view class="content">
									<view class="show">
										{{item.title}}
									</view>
								</view>
								<!-- 图片 -->
								<view class="flex al-center m-t4">
									<view v-for="(itemss,indexss) in item.album" :key='indexss'>
										<image :src="itemss" class="items" :class="(indexss+1)%3 == 0?'onmargin':''"
											mode="aspectFill"></image>
									</view>
								</view>

								<view class="Hline">

								</view>
							</view>
						</view>
						<view v-show="Isnext == true" class=" flex ju-center al-center lodbox">
							<image class="lodimg" src="https://oss.kuaitongkeji.com/static/img/app/address/loading.gif"
								mode=""></image>
							加载中...
						</view>
						<view v-show="Isnext == false" class="flex ju-center btom fz-12">
							{{showtext}}
						</view>

						<view class="nono flex al-center ju-center"
							v-if="items.list&&items.list.length == 0 && isLoding == false">
							没有您想看类型的帖子,试试其他的吧
						</view>

					</scroll-view>
				</swiper-item>
			</swiper>

		</view>

		<view v-if="flag == true" class="searchend ">
			<view class="" v-if="lists.length>0">
				<view class="item" @click="gotoD(item)" v-for="(item,index) in lists" :key='index'>
					<view class="flex">
						<!-- 头像 -->
						<image :src="item.own_poster.avatar" class="itemimg" mode="aspectFill"></image>
						<view class="name m-l1 m-t1">
							{{item.own_poster.nickname}}
							<view class="time">
								{{item.created_at}}
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
						<view v-for="(items,indexs) in item.album" :key='indexs'>
							<image :src="items" class="items" mode="aspectFill"></image>
						</view>
					</view>
					<view class="Hline">

					</view>
				</view>
				<view v-show="isLoding == true" class=" flex ju-center al-center lodbox">
					<image class="lodimg" src="https://oss.kuaitongkeji.com/static/img/app/address/loading.gif" mode="">
					</image>
					加载中...
				</view>
				<view v-if="hasMore == false" class="flex ju-center btm fz-12">
					{{text}}
				</view>

			</view>
			<view v-if="isLoding == false && lists.length==0" class="nono flex al-center ju-center">
				没有您搜索的帖子哦~
			</view>
			<view class="btoms">

			</view>
		</view>

		<view v-show="isLoding == true && lists.length == 0" class="showloding flex al-center ju-center">
			<view class="loding flex-d al-center ju-center">
				<view class=" ">
					<image class="loimg" src="https://oss.kuaitongkeji.com/static/img/app/address/loading.gif" mode="">
					</image>
				</view>
				加载中
			</view>
		</view>
		<subbotn :ids='id'></subbotn>
	</view>
</template>

<script>
	import village from '../../../vendor/village/village.js'
	import jwt from '../../../vendor/auth/jwt.js'
	import subunit from '../../../components/sub-unit/subunit.vue'
	import subbotn from '../../../components/sub-botn/subbotn.vue'
	export default {
		name: "",
		components: {
			subunit,
			subbotn
		},
		props: {

		},
		data() {
			return {
				code: 0,
				showtext: '',
				hig: "",
				id: '', //传的id
				flag: false, //判断有没有搜索结果
				tagdata: [],
				idx: 0, //选择类型
				selectID: '', //选择的id
				current: 0, // tabs组件的current值，表示当前活动的tab选项
				swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
				page: 1,
				ps: 15,
				isLoding: false,
				Isnext: false,
				//搜索
				lists: [], //数据列表
				text: '', //没有更多的提示
				value: '',
				hasMore: true,
				isUser: false
			}
		},
		methods: {
			//滑动切换
			Onchange(e) {
				this.showtext = ""
				let current = e.detail.current;
				this.idx = e.detail.current
				if (this.tagdata[current].list.length > 0) return;
				this.loadPageData(this.tagdata[current].name, current)
			},
			// tabs通知swiper切换
			tabsChange(index) {
				this.swiperCurrent = index;
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

			// 获取数据
			loadPageData(name, idx) {
				if (name == "全部") {
					name = ''
				}
				this.isLoding = true
				village.communityPost({
					data: {
						village_id: this.id,
						cate: name,
						kw: this.keyword,
						page: this.page,
						pageSize: this.ps
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
						if (res.statusCode != 200) return;
						if (res.data.code == 403) {
							uni.showModal({
								content: res.data.msg,
								success: () => {
									uni.navigateBack({
										delta: 1
									})
								}
							})
							return;
						}
						if (res.data.code != 200) return;
						this.isUser = true
						let data = res.data.data;
						data.data.map(item => {
							item.created_at = item.created_at.slice(0, 16)
							item.album = item.album ? item.album.slice(0, 3) : []
						})
						this.tagdata.map((item, index) => {
							if (index == idx) {
								item.list = data.data
								item.page = data.current_page + 1
								item.hasMore = data.next_page_url ? true : false
							}
						})
					}
				})
			},
			//获取默认栏目列表
			grtColumn() {
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
						let arr = [{name: "全部"}]
						res.data.data.map(item => {
							item.list = []
							item.hasMore = false
							item.page = 1
							item.text = ""
							item.nono = null
							arr.push(item)
						})
						this.tagdata = arr
						this.loadPageData('', this.idx) 
            this.code = res.data.code
					}
				})
			},
			// scroll-view到底部加载更多
			onreachBottom() {
				this.showtext = "没有更多了"
				let idx = this.idx
				if (this.isLoding == true || this.Isnext == true) return;
				if (this.tagdata[idx].text) return;
				if (this.tagdata[idx].hasMore == false) {
					return;
				}
				this.Isnext = true
				let name = this.tagdata[idx].name
				if (name == "全部") {
					name = ''
				}
				village.communityPost({
					data: {
						village_id: this.id,
						cate: name,
						page: this.tagdata[idx].page,
						pageSize: this.ps
					},
					fail: () => {
						this.Isnext = false
						uni.showToast({
							title: '网络错误',
							icon: 'none'
						})
					},
					success: (res) => {
						this.Isnext = false
						if (res.statusCode != 200) return;

						if (res.data.code != 200) return;

						let data = res.data.data;
						data.data.map(item => {
							item.created_at = item.created_at.slice(0, 16)
							if (item.album) {
								item.album = item.album.slice(0, 3)
							}
						})
						this.tagdata.map((item, index) => {
							if (index == idx) {
								item.list = item.list.concat(data.data)
								item.page = data.current_page + 1
								item.hasMore = data.next_page_url ? true : false
							}
						})
					},

				})
			},
			// 去详情
			gotoD(item) {
				uni.navigateTo({
					url: `/components/forum/forumdils?id=${item.id}`
				})
			},
			//搜索
			confirm() {
				if (this.value == '') return;
				this.page = 1
				this.text = ''
				this.lists = []
				this.flag = true
				this.search()
			},
			// 清空
			empty() {
				this.value = ''
				this.flag = false
				this.text = ''
				this.page = 1
			},

			// 搜索
			search() {
				this.isLoding = true
				village.communityPost({
					data: {
						village_id: this.id,
						kw: this.value,
						page: this.page,
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

						this.hasMore = data.next_page_url ? true : false;
						this.page = data.current_page + 1
						data.data.map(item => {
							item.created_at = item.created_at.slice(0, 16)
							if (item.album) {
								item.album = item.album.slice(0, 3)
							}
						})
						this.lists = this.lists.concat(data.data)
					},
				})
			},
			// 取消
			remove() {
				this.empty()
				uni.hideKeyboard()
			},

			// 自定义tabar标签
			custom() {
				uni.navigateTo({
					url: '/pages/communityForum/forumlists/customTarbar/customTarbar'
				})
			},
			// 判断是否登录
			loadUserData() {
				jwt.doOnlyTokenValid({
					showModal: true,
					keepSuccess: false,
					success: () => {
						this.grtColumn()
					},
					fail: () => {
						uni.navigateBack({
							delta: 1
						})
					}
				})
			},
		},

		onLoad(val) {
			let num = this.$store.state.customBar + 192 + 'rpx'
			this.hig = `height:calc(100vh - ${num})`
			if (!val.id) return;
			this.id = val.id
		},
		// 下拉更多
		onReachBottom() {
			this.text = '没有更多了'
			if (this.isLoding == true || this.hasMore == false) return;
			this.search();
		},
		onUnload() {
			this.$store.commit("isComment", '');
		},
		onHide() {

		},
		onShow() {
			if (this.isUser == true) return;
			this.loadUserData()
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
	.navBox {
		width: 90%;
		position: fixed;
		top: 0;
		z-index: 99;
		right: 0;
	}

	.back {
		width: 100%;
		background-color: #FFFFFF;
		position: fixed;
		left: 0;
		z-index: 99;
		border-bottom: 1px solid #CCCCCC;
	}

	.wid {
		width: 100%;
	}

	.tagpos {
		width: 100%;
		position: fixed;
		z-index: 9;
	}

	.lines {
		height: 80rpx;
	}

	.itemimg {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
	}

	.item {
		position: relative;
		top: 30rpx;
		width: 690rpx;
		padding: 30rpx;
		color: #666666;
		background: #fff;
		margin-bottom: 30rpx;
		box-shadow: 2rpx 2rpx 12rpx #d9d9d9;
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
		margin-top: 30rpx;
		width: 650rpx;
		font-size: 16px;
	}

	.show {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	.items {
		width: 210rpx;
		height: 210rpx;
		margin-right: 30rpx;
		margin-bottom: 10rpx;
		border-radius: 10rpx;
	}

	.onmargin {
		margin-right: 0;
	}

	.comimg {
		width: 25rpx;
		height: 25rpx;
		margin-top: 5rpx;
		margin-right: 10rpx;
	}

	.comment {
		justify-content: flex-end;
		font-size: 24rpx;
		color: #666666;
	}

	.comtext {
		margin-top: 10rpx;
		width: 642rpx;
		background: rgb(230, 230, 230);
		padding: 14rpx 24rpx;
	}

	.release {
		margin-bottom: 100rpx;
	}

	.btom {
		padding-top: 20rpx;
		padding-bottom: 40rpx;
	}

	.btm {
		padding: 20rpx;
	}

	.nono {
		height: 300rpx;
		color: #CCCCCC;
	}

	.lodimg {
		width: 30rpx;
		height: 30rpx;
		margin-right: 20rpx;
	}

	.lodbox {
		font-size: 12px;
		padding-top: 20rpx;
		padding-bottom: 40rpx;
	}

	.Hline {
		margin: 10rpx 0;
		width: 100%;
		height: 1px;
		background: #ccc;
	}

	.fixed {
		position: fixed;
		z-index: 9;
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
		width: 100%;
		height: 60rpx;
		bottom: 20rpx;
		left: 60rpx;
	}

	.img {
		width: 38rpx;
		height: 38rpx;
		left: 16rpx;
	}

	.input {
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
		right: 49rpx;
		font-size: 30rpx;
		color: #FFFFFF;
	}

	.clierimg {
		width: 24rpx;
		height: 24rpx;
		position: absolute;
		left: 420rpx;
	}

	.tagbox {
		// width: 100%;
		height: 80rpx;
	}

	.itemtag {
		height: 76rpx;
		display: flex;
		align-items: center;
		margin-left: 40rpx;
		font-size: 30rpx;
		color: #666666;
	}


	.scroll-view_H {
		white-space: nowrap;
		width: 100%;
		background: #ffffff;
		border-bottom: 1px solid #eeeeee;

		/deep/.uni-scroll-view::-webkit-scrollbar {
			/* 隐藏滚动条，但依旧具备可以滚动的功能 */
			display: none
		}
	}

	.dv {
		height: 76rpx;
		display: flex;
		align-items: center;
		color: #F07535;
		border-bottom: 1px solid #F07535;
		border-top: 1px solid #FFFFFF;
	}

	.posclassfiy {
		width: 90rpx;
		height: 70rpx;
		position: absolute;
		top: 10rpx;
		right: 0rpx;
		background: #FFFFFF;
	}

	.classfiyimg {
		width: 40rpx;
		height: 40rpx;
	}

	.itemwidth {
		margin-right: 120rpx;
	}

	.searchend {
		width: 100%;
	}

	.btoms {
		height: 130rpx;
	}
</style>
