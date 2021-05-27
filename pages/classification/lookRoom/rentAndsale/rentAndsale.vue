<template>
	<view class="">
		<subunit titel="房屋租售"></subunit>
		<view @touchstart="start" @touchend="end" class="">
			<view class="nav flex al-center posd">
				<view class="left flex al-center ju-center" v-for="(item,index) in til" @click="add(item,index)" :class="{dv:index===0}"
				 :key='index'>
					<view :class="{dv1:index===idx}">
						{{item.name}}
					</view>
				</view>
			</view>
			<view class="line1">

			</view>
			<!-- 我的出租 -->
			<view v-show='idx===0' class="release">
				<scroll-view scroll-y style="height: calc(100vh - 240rpx);;width: 100%;" refresher-enabled='true'
				 @refresherrefresh='fresh' :refresher-triggered='isPull'   @scrolltolower="onreachBottom1">
					<view v-if="lists.length>0" class="flex-d al-center">
						<view class="item m-t3 flex" @click="gotoD(item,index)" v-for="(item,index) in lists" :key='item.id'>
							<image :src="item.cover" class="itemImg" mode="aspectFill"></image>
							<view class="m-l2 rigBox fz-16 pos-rel">
								{{item.title}}
								<view class="flex fz-12 m-t1 cl9">
									<view class="">
										{{item.area}}㎡
									</view>
									<view class="m-l1">
										{{item.introduce}}/{{item.zx}}
									</view>
								</view>
								<view class="fz-12 szcolor">
									{{item.address_name}}
								</view>
								<view class="m-t1 flex al-b fz-16 itemtext">
									{{item.rents}}
									<view class="fz-12">
										元/月
									</view>
								</view>
								<view class="nextTex  pos-abs">
									<image src="https://oss.kuaitongkeji.com/static/img/app/classification/Healthcare/next.png" class="nextImg"
									 mode=""></image>
								</view>
							</view>
						</view>
						<view v-if=" isLoding == true" class=" flex ju-center m-t2 al-center lodbox">
							<image class="lodimg" src="https://oss.kuaitongkeji.com/static/img/app/address/loading.gif" mode=""></image>
							加载中...
						</view>
						
						<view class="flex ju-center m-b2 m-t3 fz-12" v-if="hasMore == false">
							{{text}}
						</view>
					</view>
					
					<view class="nono flex ju-center fz-14 cl9" v-if="lists.length == 0 && isLoding==false">
						您还没有发布
					</view>
					<view class="btom">

					</view>
				</scroll-view>
			</view>

			<!-- 我的卖房 -->
			<view v-show="idx===1" class="release">
				<scroll-view scroll-y style="height: calc(100vh - 240rpx);;width: 100%" 
			refresher-enabled='true'  @refresherrefresh='fresh' :refresher-triggered='isPull'  	@scrolltolower="onreachBottom2">
					<view class="flex-d al-center" v-if="data1.length>0">
						<view class="item m-t3 flex " @click="reply(item,index)" v-for="(item,index) in data1" :key='index'>
							<image :src="item.cover" class="itemImg" mode="aspectFill"></image>
							<view class="m-l2 rigBox fz-16 pos-rel">
								{{item.title}}
								<view class="flex fz-12 m-t1 cl9">
									<view class="">
										{{item.area}}㎡
									</view>
									<view class="m-l1">
										{{item.introduce}}/{{item.zx}}
									</view>
								</view>
								<view class="fz-12 cl9 m-t1">
									{{item.address_name}}
								</view>
								<view class="m-t1 flex al-b fz-16 itemtext">
									{{item.sale_price}}万
								</view>
								<view class="nextTex pos-abs">
									<image src="https://oss.kuaitongkeji.com/static/img/app/classification/Healthcare/next.png" class="nextImg"
									 mode=""></image>
								</view>
							</view>
							
						</view>
						<view v-show="isLoding1 == true" class="m-t2 flex ju-center al-center lodbox">
							<image class="lodimg" src="https://oss.kuaitongkeji.com/static/img/app/address/loading.gif" mode=""></image>
							加载中...
						</view>
						<view class="flex ju-center m-b2 m-t3 fz-12" v-if="hasMore1 == false">
							{{text1}}
						</view>
					</view>

					<view class="nono flex ju-center fz-14 cl9" v-if="data1.length==0 && isLoding1==false">
						您还没有发布
					</view>
					
					<view class="btom">

					</view>
				</scroll-view>
			</view>

			<view v-show="isLoding == true" class="showloding flex al-center ju-center">
				<view class="loding flex-d al-center ju-center">
					<view class=" ">
						<image class="loimg" src="https://oss.kuaitongkeji.com/static/img/app/address/loading.gif" mode="aspectFill"></image>
					</view>
					加载中
				</view>
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
			subunit,
		},
		props: {},
		data() {
			return {
				til: [{
					name: '我的出租',
				}, {
					name: '我的卖房',
				}],
				scrollTop: 0,
				idx: 0,
 				lists: [], //我发布的租房
				page: 1,
				pageSize:15,
				text: '',
				isLoding: false, //是否显示loding
				hasMore: true, //是否还有更多
				data1: [], //我参与的
				page1: 1,
				pageSize1: 15,
				text1: '',
				isLoding1: false, //是否显示loding
				hasMore1: true, //是否还有更多
				clientX: '',
				index1:'',//租房看的哪一项
				index2:'',//售房看的哪一项
				isPull : '',
			}
		},

		methods: {
			add(item, index) {
				this.idx = index
			},
			 
			 // 下拉刷新
			 fresh(){
					var that = this;
					if(!this.isPull){
						this.isPull = true; //下拉加载，先让其变true再变false才能关闭
						//关闭加载状态 (转动的圈)，需要一点延时才能关闭
						this.page = 1
						this.lists = []
						this.loadPageData()
						this.page1 = 1
						this.data1 = []
						this.SelfPost()
					}
			 },
			 
			// 租房信息
			loadPageData() {
				this.isLoding = true;
				home.postrentMsg({
					data: {
						page: this.page,
						pageSize:this.pageSize
					},
					fail: () => {
						this.isLoding = false;
						this.isPull = false
						uni.showToast({
							title: '网络错误',
							icon: 'none'
						})
					},
					success: (res) => {
						this.isLoding = false;
                        this.isPull = false
						if (res.statusCode != 200) return;

						if (res.data.code != 200) return;
						let data = res.data.data;
						this.page = data.current_page + 1;
						this.hasMore = data.next_page_url ? true : false;
                          data.data.map(item => {
							  item.introduce = item.room + '室' + item.hall + '厅' + item.bathroom + '卫'
							  if (item.zx == 'low') {
							  	item.zx = '清水房'
							  }
							  if (item.zx == 'simple') {
							  	item.zx = '简装'
							  }
							  if (item.zx == 'well') {
							  	item.zx = '精装'
							  }
						  })   
						this.lists = this.lists.concat(data.data);
					},

				})

			},
			// 卖房信息
			SelfPost() {
				this.isLoding1 = true;
				home.postsellMsg({
					data: {
						page: this.page1,
						pageSize: this.pageSize1
					},
					fail: () => {
						this.isLoding1 = false;
							this.isPull = false
						uni.showToast({
							title: '网络错误',
							icon: 'none'
						})
					},
					success: (res) => {
						this.isLoding1 = false;
                          	this.isPull = false
						if (res.statusCode != 200) return;

						if (res.data.code != 200) return;
						let data = res.data.data;
						data.data.map(item => {
						  item.introduce = item.room + '室' + item.hall + '厅' + item.bathroom + '卫'
						  if (item.zx == 'low') {
							item.zx = '清水房'
						  }
						  if (item.zx == 'simple') {
							item.zx = '简装'
						  }
						  if (item.zx == 'well') {
							item.zx = '精装'
						  }
						}) 
						this.page1 = data.current_page + 1;
						this.hasMore1 = data.next_page_url ? true : false;

						this.data1 = this.data1.concat(data.data);
					},

				})

			},
			// 去详情
			gotoD(item, index) {
				this.index1 = index
				uni.navigateTo({
				url: '/pages/classification/lookRoom/rentAndsale/rentroomDils?id=' + item.id
				})
			},
			// 去卖房详情
			reply(item,index) {
				this.index2 = index
				uni.navigateTo({
				url: '/pages/classification/lookRoom/rentAndsale/saleroomDils?id=' + item.id
				})
			},
			
			// 下拉加载更多
			onreachBottom1(e) {
				this.text = '没有更多了'
				if (this.isLoding == true || this.hasMore == false) return;
				this.loadPageData()
			},
			// 下拉加载更多
			onreachBottom2(e) {
				this.text1 = '没有更多了'
				if (this.isLoding1 == true || this.hasMore1 == false) return;
				this.SelfPost()
			},
			start(e) {
				this.clientX = e.changedTouches[0].clientX;
			},
			end(e) {
				const subX = e.changedTouches[0].clientX - this.clientX;
				if (subX > 100) {
					if (this.idx == 0) return
					this.idx = 0
			
				} else if (subX < -100) {
					// console.log('左滑')
					if (this.idx == 1) return
					this.idx = 1
			
				} else {
					// console.log('无效')
				}
			},
		},
		mounted() {
			this.SelfPost()
			this.loadPageData()
		},
		// 下拉加载更多
		onReachBottom() {

		},
		onLoad(val) {
		},
		onShow() {
		
			if(this.$store.state.roomisDel == 200){
				this.lists.splice(this.index1,1)
			}
			if(this.$store.state.saleDel == 200){
				this.data1.splice(this.index2,1)
			}
		},
        onHide() {
        	this.$store.commit('roomisDel','')
			this.$store.commit('saleDel','')
			this.text = ''
			this.text1 = ''
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
	.cl9{
		color: #999999 ;
	}
	.fidx {
		position: fixed;
		z-index: 9;
	}

	.line {
		height: 148rpx;
	}

	.nav {
		width: 100%;
		height: 74rpx;
		background: #FFFFFF;
		font-size: 28rpx;
		color: #666666;
		border-bottom: 1px solid #CCCCCC;
	}

	.left {
		flex: 1;
		height: 74rpx;
	}

	.dv {
		border-right: 1rpx solid #C0C0C0;
	}

	.dv1 {
		color: #F07535;
		display: flex;
		align-items: center;
		height: 42rpx;
		border-top: 4rpx solid #FFFFFF;
		border-bottom: 4rpx solid #F07535;
	}

	.itemImg {
		width: 200rpx;
		height: 190rpx;
		border-radius: 10rpx;
	}

	.item {
		width: 630rpx;
		padding: 30rpx;
		color: #666666;
		background: #FFFFFF;
			box-shadow: 2rpx 2rpx 12rpx #d9d9d9;
		border-radius: 10px;
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

	.time {
		display: flex;
		justify-content: flex-end;
		font-size: 24rpx;
	}

	.titel {
		margin-left: 20rpx;
		margin-top: 20rpx;
	}

	.content {
		font-size: 26rpx;
		margin-left: 30rpx;
		margin-top: 20rpx;
		background: rgba(204, 204, 204, 0.5);
		padding: 10rpx;
		width: 89%;
	}

	.btom {
		height: 10rpx;
	}

	.itemtext {
		color: #F07535;
	}

	.name {
		width: 580rpx;
	}

	.color {
		color: #2D64B3;
	}

	.conten {
		width: 510rpx;
	}

	.posd {
		position: fixed;
		z-index: 99;
	}

	.line1 {
		height: 74rpx;
	}

	.nono {
		position: relative;
		top: 50rpx;
	}

	.lodimg {
		width: 30rpx;
		height: 30rpx;
		margin-right: 20rpx;
	}

	.lodbox {
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

	.nonoTet {
		color: red;
	}
	
	.rigBox{
		width: 400rpx;
		color: #333333;
	}
	
	.nextImg {
		width: 12rpx;
		height: 20rpx;
		margin-left: 10rpx;
		margin-top: 5rpx;
	}
	
	.nextTex {
		bottom: 0rpx;
		right: 0rpx;
	}
	
	.szcolor {
		margin-top: 10rpx;
		color: #999999;
	}
</style>
