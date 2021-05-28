<template>
	<view class="">
		<subunit titel="详情"></subunit>
		<view v-if="code == 200" class="">
			<view class="woer"> 
				<view class="nav flex">
					<image class="img" :src="user.avatar" mode="aspectFill"></image>
					<view class="m-l2 text">
						<view class="">
							{{user.nickname}}
						</view>
						<view class="small">
							{{arr.created_at}}
						</view>
					</view>
				</view>
				<!-- 标题 -->
				<view class="title">
					{{arr.title}}
				</view>
				<!-- 内容 -->
				<view class=" flex ju-center">
					<view class="content">
						{{arr.content}}
					</view>
				</view>
				<!-- 图片 -->
				<view class="flex al-center imgbx">
					<view class="" v-for="(item,index) in arr.album" @click="look(item)" :key='item.id'>
						<image class="itemimg" :src="item" :class="(index+1)%3 == 0?'dv':''" mode="aspectFill"></image>
					</view>
				</view>
				<view class="layou pos-rel">
					<view class=" move pos-abs">
						<image @click="open" src="https://oss.kuaitongkeji.com/static/img/app/forum/pinlun.png"
							class="plimg" mode=""></image>
					</view>
				</view>
			</view>
			<view class="topLine">
			
			</view>
			<!-- 评论 -->
			<view v-if="comments.length>0" class="">
				<view class="line flex pos-rel"  v-for="(item,index) in comments"
					:key='item.id'>
					<view class="marg">
						<image v-if="item.own_commentator" class="img" :src="item.own_commentator.avatar" mode="aspectFill">
						</image>
					</view>
					<view class="rigBox">
						<view v-if="item.own_commentator" class="nickname">
							{{item.own_commentator.nickname}}
						</view>
						<view class="texbox">
							{{item.content}}
						</view>
						<!-- 时间 -->
						<view class="postime m-t1 m-b2 flex">
							<view v-show="item.Isdel==true" @click="delmsg(item,index)" class="fz-12  delTxt ">
								删除
							</view>{{item.created_at}}
						</view>
					</view>
					
				</view>
				<view v-show="isLoding == true" class=" flex ju-center al-center lodbox">
					<image class="lodimg" src="https://oss.kuaitongkeji.com/static/img/app/address/loading.gif" mode="">
					</image>
					加载中...
				</view>
				<view class="flex  ju-center lodbox  fz-12" v-if="hasMore == false">
					{{text}}
				</view>
			</view>
			<view class="nono flex al-center ju-center" v-if="comments.length==0&&isLoding==false">
				还没有任何评论哦
			</view>
			
			<view v-show="flag===true" class="posbot flex al-center ">
				<view class="pos-rel">
					<textarea @focus="onChange" :autoHeight="auto"  id="area" placeholder='评论' v-model="context"
						class="ch flex al-center"></textarea>
					<view @click="send" class="btn flex pos-abs al-center ju-center" :class="context != ''?'sendStyle':''">
						发送
					</view>
				</view>
			</view>
			<!-- 查看图片 -->
			<view v-show="see == true" @click="off" class="look flex al-center ju-center">
				<image :src="src" class="srcimg" mode="aspectFit"></image>
			</view>
		</view>

		<view v-show="isLoding == true&&comments.length==0" class="showloding flex al-center ju-center">
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
	import subunit from '../sub-unit/subunit.vue'
	import village from '../../vendor/village/village.js'
	import jwt from '../../vendor/auth/jwt.js'
	import userDetails from '../../vendor/user/userDetails.js'
	export default {
		name: "",
		components: {
			subunit
		},
		props: {},
		data() {
			return {
				code:0,
				userID: '', //用户id
				auto: true,
				id: "",
				arr: {}, //数据
				user: {},
				comments: [], //获取评论
				flag: false,
				context: '',
				src: '', //查看图片路径
				see: false, //图片遮罩层
				page: 1,
				pageSize: 15,
				isLoding: false,
				hasMore: true,
				text: '',

			}
		},
		methods: {

			//删除
			delmsg(item, index) {
				//帖子是自己发布的
				if (this.user.id == this.userID) {
					uni.showModal({
						content: "您确定要删除吗",
						success: (res) => {
							if(res.confirm){
								this.deluserPost(item.id)
								this.comments.splice(index, 1)
							}
						}
					})
					return;
				}
				//删除别人帖子中自己的评论
				if (item.own_commentator.id == this.userID) {
					uni.showModal({
						content: "您确定要删除吗",
						success: (res) => {
							if(res.confirm){
								this.delPost(item.id)
								this.comments.splice(index, 1)
							}
						}
					})
					
				}

			},
			//长按显示删除
			logoTime(item, index) {
				
			},
			//删除自己帖子的评论
			deluserPost(id) {
				village.deluserPost({
					data: {id:id},
					fail: () => {
						uni.showToast({
							title: '网络错误',
							icon: 'none'
						})
					},
					success: (res) => {
						if (res.statusCode != 200) {
							uni.showToast({
								title: '网络错误',
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
						this.$store.commit("isComment", res.data.code);
						this.text = ''
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						})
					}
				})
			},
			
			//删除自己的评论
			delPost(id) {
				village.delPost({
					data: {id:id},
					fail: () => {
						uni.showToast({
							title: '网络错误',
							icon: 'none'
						})
					},
					success: (res) => {
						if (res.statusCode != 200) {
							uni.showToast({
								title: '网络错误',
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
						this.$store.commit("isComment", res.data.code);
						this.text = ''
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						})
					}
				})
			},

			// 获取用户资料
			getUser() {
				userDetails.userDeta({
					data: {},
					fail: () => {
						uni.showToast({
							title: '网络错误',
							icon: 'none'
						})
					},
					success: (res) => {
						this.userID = res.data.data.id
						this.Data()
					
					},

				})
			},
			// 详情数据 
			Data() {
				this.isLoding = true;
				village.postDetails({
					data: {
						id: this.id
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
						if (res.statusCode != 200) return
						this.code = res.data.code
						if (res.data.code == 200) {
							let data = res.data.data
							data.created_at = data.created_at.slice(0, 16)
							this.arr = data
							this.user = data.own_poster
								this.loadPageData()
						} else {
							uni.showToast({
								title: res.data.msg,
								icon: 'none',
								duration: 2000
							})
						}
					}
				})
			},
			// 评论获取数据
			loadPageData() {
				this.isLoding = true;
				village.postComments({
					data: {
						post_id: this.id,
						page: this.page,
						pageSize: this.pageSize
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
						data.data.map(item => {
							item.created_at = item.created_at.slice(0, 16)
						    //帖子是自己发布的
						    if (this.user.id == this.userID) {
						    	item.Isdel = true;
								return;
						    }
							 //别人帖子中自己的评论
							if (item.own_commentator.id == this.userID) {
								item.Isdel = true;
								return;
							}
						})
						this.hasMore = data.next_page_url ? true : false;
						this.page = data.current_page + 1
						this.comments = this.comments.concat(data.data)
					},
				})
			},
			// 打开评论
			open() {
				this.flag = !this.flag
			},
			// 查看图片
			look(item) {
				this.see = true
				this.src = item
			},
			// 关闭
			off() {
				this.see = false
			},

			// 发送评论
			send() {
				if (this.context == '') {
					uni.showToast({
						title: '请输入评论内容',
						icon: 'none'
					})
					return;
				}
				uni.showLoading({
					title: '发送中...'
				})
				village.relComments({
					data: {
						post_id: this.id,
						content: this.context
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
						if (res.statusCode != 200) return
						if (res.data.code == 200) {
							this.page = 1
							this.context = ''
							this.comments = []
							this.loadPageData()
							this.flag = false
							this.auto = true
							uni.showToast({
								title: res.data.msg,
								icon: 'none',
								duration: 2000
							})
							this.$store.commit("isComment", res.data.code);
						} else {
							uni.showToast({
								title: res.data.msg,
								duration: 2000,
								icon: 'none'
							})
						}
					}
				})
			},
			
			onChange(e){
				this.text = ""
			}
			
		},
		mounted() {
			this.getUser()
			
		},

		onShow() {

		},
		// 下拉加载更多
		onReachBottom() {
			this.text = '没有更多了'
			if (this.isLoding == true || this.hasMore == false) return;
			this.loadPageData()
		},
		onLoad(val) {
			this.id = val.id
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
		z-index: 66;
	}

	.topLine {
		height: 1px;
		width: 100%;
		background-color: #BFBFBF;

	}

	.actfixed {
		position: fixed;
		top: 88rpx;
		z-index: 66;
		right: 50rpx;
	}

	.actionBar {
		width: 40rpx;
		height: 40rpx;
	}

	.retunt {
		margin-top: 30rpx;
		width: 60rpx;
		height: 24rpx;
	}

	.cancelBox {
		width: 90%;
		height: 80rpx;
		background: rgb(236, 234, 245);
		position: absolute;
		bottom: 20rpx;
		border-radius: 10rpx;
	}

	.compile {
		width: 40rpx;
		height: 30rpx;
		margin: 0 30rpx;
	}

	.delete {
		width: 40rpx;
		height: 40rpx;
		margin: 0 30rpx;
	}

	.tagbox {
		width: 100%;
		height: 90rpx;
	}


	.woer {
		width: 690rpx;
		padding: 30rpx;
		color: #666666;
	}

	.nav {
		width: 100%;
		height: 60rpx;
	}

	.rigBox {
		width: 600rpx;
		border-bottom: 1px solid #eee;
	}

	.img {
		width: 74rpx;
		height: 74rpx;
		border-radius: 50%;
	}

	.text {
		font-size: 28rpx;
		color: #F07535;
	}

	.small {
		font-size: 24rpx;
		color: #B3B3B3;
	}

	.layou {
		width: 100%;
		height: 60rpx;
	}

	.title {
		margin-top: 30rpx;
		font-size: 16px;
	}

	.content {
		margin-top: 20rpx;
		width: 680rpx;
		font-size: 14px;
	}

	.imgbx {
		margin-top: 60rpx;
		flex-wrap: wrap;
	}

	.itemimg {
		width: 210rpx;
		height: 210rpx;
		margin-right: 30rpx;
		border-radius: 10rpx;
		margin-bottom: 10rpx;
	}

	.dv {
		margin-right: 0;
	}

	.move {
		right: 0rpx;
		bottom: 0;
	}

	.plimg {

		width: 30rpx;
		height: 27rpx;
	}

	.line {
		width: 690rpx;
		padding: 30rpx;

	}

	.nickname {
		color: #F07535;
		font-size: 12px;
	}

	.marg {
		width: 90rpx;
	}

	.texbox {
		margin: 10rpx 0;
		width: 560rpx;
		font-size: 14px;
	}

	.postime {
		font-size: 12px;
		color: #B3B3B3;
		width: 100%;
		display: flex;
		justify-content: flex-end;
	}

	.ch {
		margin-left: 20rpx;
		border-radius: 5rpx;
		padding: 10rpx;
		width: 500rpx;
		background: #FFFFFF;
		// height: 40rpx;
		word-wrap: break-word;
		font-size: 14px;
	}

	// .ch:empty::before {
	// 	color: lightgrey;
	// 	content: attr(placeholder);
	// }

	.posbot {
		position: fixed;
		bottom: 0;
		width: 100%;
		background: rgb(239, 239, 239);
		font-size: 28rpx;
		padding: 30rpx 20rpx;
		padding-bottom: 50rpx;
		border-top: 1px solid rgba(204, 204, 204, 0.6);
	}

	.btn {
		width: 90rpx;
		height: 50rpx;
		font-size: 26rpx;
		background: rgba(204, 204, 204, 0.8);
		color: #FFFFFF;
		right: -140rpx;
		border-radius: 10rpx;
		bottom: 5rpx;
	}

	.btom {
		height: 100rpx;
	}

	.nono {
		width: 100%;
		font-size: 28rpx;
		color: #666666;
		height: 200rpx;
	}

	.look {
		top: 0;
		position: absolute;
		width: 100%;
		height: 100vh;
		z-index: 99;
		background: rgb(0, 0, 0);
	}

	.srcimg {
		width: 100%;
		height: 100vh;
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
		border-radius: 10rpx ;
	}

	.sendStyle {
		background: #F07535;
	}

	.delTxt {
		margin-right: 20rpx;
	}
</style>
