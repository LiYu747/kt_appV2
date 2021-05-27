<template>
	<view class="content">
		<view class="nav" :style="{	height:iStatusBarHeight + 'rpx'}">
			<view class="ipt  ju-center flex al-center">
				<view v-if='user' class="userSelection pos-abs">
					<image @click="isShowType = !isShowType" src="../../image/Clssmenu.png" class="sjxlIcon" mode=""></image>
					<view v-show="isShowType == true" class="pos-abs  m-t1">
						<view class="trilateral">
						</view>
						<view class="nomenBox">
							<view class="itemType flex al-center" v-for="item in userType" :key='item.id'>
								<view @click="selecType(item)" class="">
									{{item.name}}
								</view>
							</view>
						</view>
					</view>
				</view>
				<image class="img pos-abs" src="https://oss.kuaitongkeji.com/static/img/app/home/ss.png" mode=""></image>
				<input class="input" type="text" v-model="value" confirm-type="search" @confirm='confirm' placeholder="请输入小区名称关键词" />

				<view v-if='user' @click="goInform" class="informBox pos-abs">
					<view v-if="0<informmsg.unread && informmsg.unread< 100" class="munber flex al-center ju-center pos-abs">
						<view class="">
							{{informmsg.unread}}
						</view>
					</view>
					<view v-if='informmsg.unread >99' class="munMore  flex al-center ju-center pos-abs">
						99+
					</view>
					<image src="https://oss.kuaitongkeji.com/static/img/app/home/infos.png" class="infosImg" mode=""></image>
				</view>
			</view>
		</view>
		<view :style="{height:iStatusBarHeight + 'rpx'}">
		</view>
		<!-- 主页 -->
		<view class="flex-d al-center">
			<view class="boxss">
				<image class="imgjx" src="https://oss.kuaitongkeji.com/static/img/app/home/jx.png" mode=""></image>
			</view>
			<!-- 轮播图 -->
			<view class="posmove">
				<u-swiper @click="addswiper" :list="list" border-radius='20' bg-color='rgba(255, 255, 255, 0)' height="340"
				 effect3d-previous-margin='60' indicator-pos='none' :effect3d="true"></u-swiper>
			</view>
			<!-- 操作 -->
			<view class="flex operation ju-between">
				<view class="flex-d al-center pos-rel" v-for="(item,index) in localdata" @click="operation(item)" :class="Gshow == 5&&index==idx?'Gitem':''"
				 :key='item.id'>
					<image :src="item.image" class="itemimg" mode=""></image>
					<view class="itemtext">
						{{item.name}}
					</view>
					<view @touchmove.stop.prevent v-if="Gshow == 5" class="">
						<view v-if="idx==0&&index==0" class="flex pos-abs m-ln1">
							<image src="https://oss.kuaitongkeji.com/static/img/app/Newguidance/arrowsLU.png" class="arrowsLU" mode=""></image>
							<view class=" Lutext">
								入住申请
								<view class="bai">
									填写入住地址详细信息
								</view>
							</view>
						</view>
						<view v-if="idx == 1&&index==1" class="m-ln2 pos-abs">
							<image src="https://oss.kuaitongkeji.com/static/img/app/Newguidance/upward.png" class="upward" mode=""></image>
							<view class="upText fz-16">
								<view class="al-center">
									拜访申请
									<view class="bai">
										朋友做客等可填写信息，房主通过后小区大门自动识别打开
									</view>
								</view>

							</view>
						</view>
						<view v-if="idx == 2&&index==2" class="m-ln3 pos-abs">
							<image src="https://oss.kuaitongkeji.com/static/img/app/Newguidance/upward.png" class="upward" mode=""></image>
							<view class="upText2 fz-16">
								<view class=" al-center flex-d">
									来访记录
									<view class="bai">
										可查看来访记录详细信息，所有亲戚朋友的来访记录都在这里！
									</view>
								</view>

							</view>
						</view>
						<view class="m-ln4 pos-abs" v-if="idx==3&&index==3">
							<image src="https://oss.kuaitongkeji.com/static/img/app/Newguidance/arrowsRU.png" class="arrowsLU" mode=""></image>
							<view class="goHome flex-d al-center">
								<view class="">
									回家二维码，
									<view class="bai">
										安全无接触，可直接扫码进入小区
									</view>
								</view>

							</view>
							<view class="lowRight">
								<view class="bai lowT">
									进入个人中心
								</view>
								<image src="https://oss.kuaitongkeji.com/static/img/app/Newguidance/lowRight.png" class="lowImg" mode=""></image>
							</view>
						</view>
					</view>
				</view>
			</view>
			<!-- 分类 -->
			<classification ref='clas'></classification>
			<!-- 资讯 -->
			<information ref="infor"></information>
			<!-- 社区新闻 -->
			<!-- <CommunityNews ref='news' v-if='user'></CommunityNews> -->
			<CommunityNews ref='news' ></CommunityNews>
			<!-- 周边 -->
			<periphery ref='peri'></periphery>

			<!-- <button @click="gogo">点击</button> -->
		</view>
		<!-- 视频播放 -->
		<view v-if="paly == true" @touchmove.stop.prevent class=" pos-abs moive flex-d al-center ju-center">
			<view @click="close" class="showback pos-abs">
			</view>
			<video :src="videoUrl" :poster='cover'></video>
			<image @click="close" src="https://oss.kuaitongkeji.com/static/img/app/home/close.png" class="closeimg" mode=""></image>
		</view>

		<view v-show="showPullDownRefreshIcon == true" class="showloding flex al-center ju-center">
			<view class="loding flex-d al-center ju-center">
				<view class=" ">
					<image class="loimg" src="https://oss.kuaitongkeji.com/static/img/app/address/loading.gif" mode=""></image>
				</view>
				刷新中
			</view>
		</view>
		<!-- 用户指导 -->
		<view v-if="Gshow == 0" @touchmove.stop.prevent class="guideBox">
			<image src="https://oss.kuaitongkeji.com/static/img/app/Newguidance/home.png" class="addLogo" mode=""></image>
		</view>

		<view v-if="Gshow == 1" @touchmove.stop.prevent class="guideBox">
			<view class="flex-d al-center bai guidePush">
				添加地址
				<image src="https://oss.kuaitongkeji.com/static/img/app/Newguidance/arrowsD.png" mode="" class="arrowsDimg"></image>
			</view>
			<view class="btmbox flex ju-center">
				<view @click="GgoAdd" class="addBox">
				</view>
				<image src="https://oss.kuaitongkeji.com/static/img/app/Newguidance/homeLogo.png" class="btmImg" mode=""></image>
			</view>
			<view class="">

			</view>
		</view>

		<view v-if="Gshow == 5" @touchmove.stop.prevent class="">
			<view @click="nextT" class="guideBox">
				<view v-show="idx == 3" class="btmbox flex ju-center">
					<view class="addBox">
					</view>
					<image src="https://oss.kuaitongkeji.com/static/img/app/Newguidance/userLogo.png" class="btmImg" mode=""></image>
				</view>
			</view>
			<view class="" v-show="idx!==3">
				<image src="https://oss.kuaitongkeji.com/static/img/app/Newguidance/home.png" class="addLogo" mode=""></image>
			</view>
		</view>
		
		<view v-show="isShowType == true" @click="isShowType = false" class="showBox">
			
		</view>
	</view>
</template>

<script>
	import subunit from '../../components/sub-unit/subunit.vue'
	import home from '../../vendor/home/home.js'
	import classification from '../../components/home/classification/classification.vue';
	import information from '../../components/home/information/information.vue';
	import periphery from '../../components/home/periphery/periphery.vue';
	import CommunityNews from '../../components/home/CommunityNews/CommunityNews.vue'
	import cache from '../../vendor/cache/cache.js'
	import user from '../../vendor/user/userDetails.js';
	import urlUtil from '../../vendor/common/url.js';

	export default {
		components: {
			classification,
			information,
			periphery,
			CommunityNews,
			subunit
		},
		data() {
			return {
				iStatusBarHeight: 0,
				userType: [{
						name: '用户',
						type: 'user',
						url: '/pages/index/index'
					},
					{
						name: '物业',
						type: 'property',
						url: '/pages/propertyManagement/propertyhome/propertyhome'
					},
					{
						name: '快递、外卖',
						type: 'expressage',
						url: '/pages/userMessenger/userhome/userhome'
					}
				],
				isShowType: false,
				localdata: [
				{image:require('@/image/home/rz.png'),name:'入住申请',url:'/pages/residence/seachVill/seachVill?code=1'},
				{image:require('@/image/home/bf.png'),name:'拜访申请',url:'/pages/residence/seachVill/seachVill?code=2'},
				{image:require('@/image/home/lf.png'),name:'来访记录',url:'/pages/operation/visitRecord/visitRecord'},
				{image:require('@/image/home/code.png'),name:'回家二维码',url:'/pages/qrcode/qrCode/qrCode'}], 
				list: [], //轮播图
				value: '', //搜索绑定v-model
				user: {}, //用户资料
				paly: false,
				videoUrl: '', //视频地址
				cover: '', //视频封面
				showPullDownRefreshIcon: false,
				informmsg: {}, //用户未读消息数量
				Gshow: null, //新手指导
				idx: 0,
			}
		},
		onLoad(val) {
			// console.log(val);
		},
		methods: {

			nextT() {
				this.idx++
				if (this.idx == 4) {
					let num = this.Gshow + 1
					cache.set('Gshow', {
						key: '步骤' + num,
						value: num
					})
					this.Gshow = null
					uni.switchTab({
						url: '/pages/user/userCenter/userCenter'
					})
				}
			},
			GgoAdd() {
				let num = this.Gshow + 1
				cache.set('Gshow', {
					key: '步骤' + num,
					value: num
				})
				uni.switchTab({
					url: '/pages/address/address/address'
				})
			},
			gogo() {
				  // 预览图片
					return;
				uni.previewImage({
					urls:[
					'https://oss.kuaitongkeji.com/static/img/app/Newguidance/home.png'], 
					current: 0,
					indicator:"default",
					longPressActions: {
						itemList: [ '保存图片'],
						success: function() {
							    uni.showToast({
							    	icon:"none",
									title:'图片已保存至相册'  
							    })
								
								uni.saveImageToPhotosAlbum({
								    filePath:'https://oss.kuaitongkeji.com/static/img/app/Newguidance/home.png',    
								}); 
						},
						fail: function() {
						}
					}
				});
				return;
				uni.navigateTo({
					url: '/components/forum/setting/lianx'
				})
			},
			// 消息通知
			goInform() {
				uni.navigateTo({
					url: '/pages/user/userInform/userInform'
				})
			},
			// 未读获取消息通知
			getInform() {
				home.unread({
					data: {},
					fail: () => {
						this.stopRefreshIcon()
						uni.showToast({
							title: '网络出错',
							icon: 'none'
						})
					},
					success: (res) => {
						this.stopRefreshIcon()
						if (res.statusCode != 200) return
						if (res.data.code != 200) return
						let data = res.data.data
						// console.log(data);
						this.informmsg = data
					}
				})
			},
			//选择用户类型
			selecType(item) {
				if (item.type == 'user') return;

				uni.reLaunch({
					url: item.url
				})
			},
			// 回车搜索
			confirm() {
				if (this.value != '') {
					uni.navigateTo({
						url: `/pages/index/search/search?value=${this.value}`
					})
				}
			},
			// 点击轮播图
			addswiper(val) {
				let movie = this.list[val]
				if (movie.video) {
					this.videoUrl = movie.video 
					this.cover = movie.image
					this.paly = true
					return;
				} else {
					urlUtil.to({
						pageAlias: movie.page,
						options: movie.params,
					})
				}
			},

			// 关闭视频
			close() {
				this.paly = false
			},
			// 跳转
			operation(item) {
				if (this.Gshow == 5) {
					this.nextT()
					return;
				};
					uni.navigateTo({
						url: item.url
					})
			},

			// 轮播图数据
			Chart() {
				home.chart({
					data: {
						code: 'home_index_banner'
					},
					fail: () => {
						this.stopRefreshIcon()
						uni.showToast({
							title: '网络出错',
							icon: 'none'
						})
					},
					success: (res) => {
						this.stopRefreshIcon()
						if (res.statusCode != 200) return
						if (res.data.code != 200) return
						this.list = res.data.data
					},
				})
			},
			// 下拉刷新
			stopRefreshIcon() {
				if (this.showPullDownRefreshIcon == true) {
					uni.stopPullDownRefresh();
					this.showPullDownRefreshIcon = false;
				}
			},

		},
		onLoad() {

		},
		mounted() {
			this.Chart()
			this.iStatusBarHeight = uni.getSystemInfoSync().statusBarHeight + 128
			cache.set("customBar", this.iStatusBarHeight)
		},
		onShow() {
			if (cache.get("Gshow")) {
				this.Gshow = cache.get("Gshow").value
				uni.hideTabBar()
				if (this.Gshow == 0) {
					uni.showModal({
						title: '提示',
						content: '我们将为您开启新手指导教程',
						cancelText: '跳过',
						success: (res) => {
							if (res.confirm) {
								this.Gshow = this.Gshow + 1
								cache.set('Gshow', {
									key: '步骤' + this.Gshow,
									value: this.Gshow
								})
							}
							if (res.cancel) {
								cache.set('first', true)
								cache.forget('Gshow')
								this.Gshow = null
								uni.showTabBar()
							}
						}
					})
				}
			} else {
				uni.showTabBar()
			}
			this.getInform()
			let user = cache.get('jwt')
			if (user) {
				this.user = {}
			} else {
				this.user = null
			}
			this.value = ''
		},
		// 下拉刷新
		onPullDownRefresh() {
			this.showPullDownRefreshIcon = true;
			this.$refs.clas.Calss()
			this.$refs.infor.Data()
			this.$refs.peri.getData()
			if (this.user) {
				this.$refs.news.getData()
			}
			this.Chart()
			this.getInform()
		},
		onHide() {
			this.isShowType = false
			this.Gshow = null
			this.idx = 0
		}
	}
</script>

<style>
	.m-ln1 {
		left: 0rpx;
		top: 160rpx;
		width: 600rpx;
		padding-left: 50rpx;
	}

	.m-ln2 {
		padding-left: 40rpx;
		width: 350rpx;
		left: 0rpx;
		top: 160rpx;
	}

	.m-ln3 {
		width: 250rpx;
		padding-left: 240rpx;
		left: -200rpx;
		top: 160rpx;
	}

	.m-ln4 {
		width: 150rpx;
		left: -20rpx;
		top: 160rpx;
	}

	.wrap {
		padding: 40rpx;
	}

	page {
	
		background: #fff;
	}

	.logo {
		height: 200rpx;
		width: 200rpx;
		margin-top: 200rpx;
		margin-left: auto;
		margin-right: auto;
		margin-bottom: 50rpx;
	}

	.text-area {
		display: flex;
		justify-content: center;
	}

	.title {
		font-size: 36rpx;
		color: #8f8f94;
	}

	.nav {
		width: 750rpx;
		background: #F07535;
		position: fixed;
		z-index: 99;
	}

	.img {
		width: 33rpx;
		height: 34rpx;
		left: 168rpx;
	}

	.ipt {
		width: 750rpx;
		height: 80rpx;
		position: absolute;
		bottom: 10rpx;
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

	.boxss {
		width: 750rpx;
		height: 156rpx;
	}

	.imgjx {
		width: 100%;
		height: 156rpx;
	}


	.posmove {
		width: 100%;
		height: 304rpx;
		position: relative;
		top: -136rpx;
	}

	.itemimg {
		width: 100rpx;
		height: 100rpx;
	}

	.operation {
		margin-top: -80rpx;
		width: 650rpx;
		height: 150rpx;
		background: #FFFFFF;
		border-radius: 20rpx 20rpx 0px 0px;
		padding: 20rpx;
		padding-top: 14rpx;
		padding-bottom: 22rpx;
	}

	.itemtext {
		margin-top: 5rpx;
		font-size: 30rpx;
		color: #666666;
	}

	.rig {
		right: 49rpx;
		font-size: 30rpx;
		color: #FFFFFF;
	}

	.moive {
		top: 0;
		position: fixed;
		z-index: 999;
		width: 100%;
		height: 100vh;
		background: #000000;
	}

	.showback {
		width: 100%;
		height: 100vh;
	}

	.closeimg {
		margin-top: 80rpx;
		width: 60rpx;
		height: 60rpx;
	}

	uni-video {
		width: 100%;
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
		border-radius: 10rpx;
		background: rgba(88, 88, 88, 0.8);
		border-radius: 10rpx;
	}

	.userSelection {
		left: 50rpx;
		z-index: 999;
	}

	.sjxlIcon {
		width: 34rpx;
		height: 34rpx;
	}

	.xljxImg {
		margin-top: 5rpx;
		width: 140rpx;
		height: 200rpx;
		position: absolute;
		z-index: -1;
	}

	.typeLine {
		height: 20rpx;
	}

	.typeBox {
		margin-top: 5rpx;
		width: 140rpx;
		height: 200rpx;
		color: #666666;
	}

	.itemType {
		height: 60rpx;
	}

	.informBox {
		right: 50rpx;
	}

	.infosImg {
		width: 34rpx;
		height: 34rpx;
	}

	.munber {
		width: 34rpx;
		height: 34rpx;
		background: red;
		border-radius: 50%;
		font-size: 12px;
		color: #FFFFFF;
		z-index: 2;
		margin-top: -12rpx;
		margin-left: 16rpx;
	}

	.munMore {
		width: 50rpx;
		height: 34rpx;
		background: red;
		border-radius: 20rpx;
		font-size: 12px;
		color: #FFFFFF;
		z-index: 2;
		margin-top: -12rpx;
		margin-left: 16rpx;
	}

	.guideBox {
		position: fixed;
		top: 0;
		width: 100%;
		height: 100vh;
		background: rgba(0, 0, 0, 0.75);
		z-index: 999;
	}
	
	.showBox{
		position: fixed;
		top: 0;
		width: 100%;
		height: 100vh;
		z-index: 9;
	}

	.btmbox {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 100rpx;
		z-index: -99;
	}

	.btmImg {
		width: 100%;
		height: 100rpx;
	}

	.arrowsDimg {
		width: 60rpx;
		height: 100rpx;
	}

	.guidePush {
		position: fixed;
		bottom: 120rpx;
		width: 100%;
	}

	.addBox {
		position: absolute;
		width: 100rpx;
		height: 100rpx;
		z-index: 99;
	}

	.itemHimg {
		position: fixed;
		top: 510rpx;
		width: 150rpx;
		height: 170rpx;
		left: 30rpx;
		background: transparent;
	}

	.Gitem {
		z-index: 99999;
		background: #FFFFFF;
		padding: 10rpx;
	}

	.arrowsLU {
		width: 120rpx;
		height: 88rpx;
	}

	.lowImg {
		width: 110rpx;
		height: 100rpx;
	}

	.Gmsgbox {
		position: fixed;
		top: 680rpx;
	}

	.Lutext {
		margin-top: 55rpx;
		margin-left: 10rpx;
		color: #FFD428;
	}

	.upward {
		width: 50rpx;
		height: 100rpx;
	}

	.upText {
		color: #FFD428;
		margin-left: -40rpx;
	}

	.upText2 {
		color: #FFD428;
		margin-left: -200rpx;
	}

	.goHome {
		color: #FFD428;
		position: relative;
		left: -220rpx;
		top: -40rpx;
		width: 240rpx;
	}

	.lowRight {
		position: fixed;
		bottom: 100rpx;
	}

	.lowT {
		margin-left: -200rpx;
	}

	.addLogo {
		width: 100%;
		height: 100rpx;
		position: fixed;
		bottom: 0;
	}
	
	.trilateral {
		width: 0;
		height: 0;
		border: 14rpx solid;
		border-color: transparent transparent white white;
	}
	
	.nomenBox {
		margin-top: -10rpx;
		border-radius: 10rpx;
		width: 240rpx;
		padding: 20rpx 30rpx;
		background: #FFFFFF;
		font-size: 14px;
		color: #666666;
		box-shadow: 2rpx 2rpx 12rpx #d9d9d9;
	}
</style>
