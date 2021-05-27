<template>
	<view>
		<subunit  titel='帖子详情'></subunit>
		<view class="contentBox">
			<view class="state flex al-center">
				<image src="https://oss.kuaitongkeji.com/static/img/app/visit/gnt.png" class="stateimg" mode=""></image>
				<view class="m-l2">
					{{infomsg.verify_status_text}}
				</view>
			</view>
			<view class="conBox flex">
				<view class="msgBox m-t1">
					<view class="">
						姓名：{{userInfo.username}}
					</view>
					<view class="m-t2">
						申请时间：{{infomsg.created_at}}
					</view>
				</view>
				<view class="m-l4">
					<image :src="userInfo.avatar" class="avatar" mode="aspectFill"></image>
				</view>
			</view>
			<view class="conBox m-t3">
				<view class="flex flex-w">
					类别：
					<view class="m-r1" v-for="item in infomsg.cate" :key="item.id">
						{{item}}
					</view>
				</view>
					<view class="m-t2 m-b2">
						标题：{{infomsg.title}}
					</view>
					<view class="">
						内容：{{infomsg.content}}
					</view>
					<view v-if="infomsg.album" class="flex flex-w m-t3" >
						<view class="m-r2 m-b1" :class="(index+1)%3==0?'dv':''" v-for="(item,index) in infomsg.album" :key="item.id">
						  <image :src="item" mode="aspectFill" class="itemImg"></image>
						</view>
					</view>
			</view>
			<view class="m-t5 fz-14">
				<view class="cl3">
					申请结果
				</view>
				<view class="conBox m-t2">
					<textarea v-model="value" class="textBox" placeholder="您可以在这里告诉他同意或不同意的原因" />
				</view>
			</view>
		</view>

		<!-- 按钮 -->
		<view   class="flex al-center ju-around btn">
			<view @click="pass" class="btnr flex al-center ju-center">
				<image src="https://oss.kuaitongkeji.com/static/img/app/login/ccuc.png" class="btnimg" mode=""></image>
				<view class=" pos-abs">
					通过
				</view>
			</view>
			<view @click="nopass" class="btnl flex al-center ju-center">
				不通过
			</view>
		</view>
		<view class="btnLine">
			
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
				id: '',
				userInfo: {}, //用户信息
				infomsg: {},
				verifyStatus:'',//是否通过
				value:''
			}
		},
		methods: {
			// 通过
			pass(){
			this.verifyStatus = 2	
			this.passReq('已通过')
			},
			// 不通过
			nopass(){
				if(!this.value){
					uni.showToast({
						title:'请填写不同意的原因告诉用户',
						icon:"none"
					})
					return;
				}
				this.verifyStatus = 3
				this.passReq('未通过')
			},
			// 是否通过
			passReq(text){
				uni.showLoading({
					title:'加载中'
				})
				home.ReviewPosts({
					data:{
						id:this.id,
						verify_status:this.verifyStatus,
						verify_msg:this.value
					},
					fail: () => {
						uni.hideLoading()
						uni.showToast({
							title: '网络错误',
							icon: "none"
						})
					},
					success: (res) => {
							uni.hideLoading()
						if (res.statusCode != 200) {
							uni.showToast({
								title: '网络出错了',
								icon: "none"
							})
							return;
						}
						if (res.data.code != 200) {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
							return;
						}
						uni.showToast({
							title: res.data.msg,
							icon:"none"
						})
						this.$store.commit('checkIspass',text)
						const time = setTimeout(() => {
							this.getData()
							clearTimeout(time)
						}, 1500)
					}
				})
			},
			// 获取数据
			getData() {
				uni.showLoading({
					title:'加载中'
				})
				home.postDetails({
					data: {
						id: this.id
					},
					fail: () => {
						uni.hideLoading()
						uni.showToast({
							title: '网络错误',
							icon: "none"
						})
					},
					success: (res) => {
							uni.hideLoading()
						if (res.statusCode != 200) {
							uni.showToast({
								title: '网络出错了',
								icon: "none"
							})
							return;
						}
						if (res.data.code != 200) {
							uni.showToast({
								title: res.data.msg,
								icon: "none"
							})
							return;
						}
						let data = res.data.data
						switch(data.verify_status){
							case 1:
							data.verify_status_text = '待处理'
							break;
							case 2:
							data.verify_status_text = '已通过'
							break;
							case 3:
							data.verify_status_text = '未通过'
							break; 
						}
						data.created_at = data.created_at.slice(0,16)
						this.userInfo = data.own_poster
						this.infomsg = data
					}
				})
			}
		},
		mounted() {
			this.getData()
		},
		onLoad(option) {
			this.id = option.id
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
	.dv{
		margin-right: 0;
	}
	.fixed {
		position: fixed;
		z-index: 9;
	}

	.topLine {
		height: 148rpx;
	}

	.contentBox {
		padding: 0 30rpx;
		color: #666666;
	}

	.stateimg {
		width: 40rpx;
		height: 40rpx;
	}

	.state {
		width: 100%;
		height: 100rpx;
		font-size: 15px;
		color: #F07535;
	}

    .conBox{
		padding: 30rpx 20rpx;
		border-radius: 10rpx;
		box-shadow: 2rpx 2rpx 12rpx #d9d9d9;
		font-size: 14px;
	}
	
	.msgBox{
		width: 450rpx;
		font-size: 14px;
	}
	
	.avatar{
		width: 124rpx;
		height: 124rpx;
		border-radius: 50%;
	}
	
	.itemImg{
		width: 200rpx;
		height: 200rpx;
		border-radius: 10rpx;
	}
	
	.textBox{
		height: 150rpx;
		font-size: 14px;
	}
	.textarea-placeholder{
		font-size: 14px;
	}
	
	.btn{
		margin-top: 100rpx;
		}
	
	.btnr {
		width: 320rpx;
		height: 70rpx;
		color: #FFFFFF;
		font-size: 28rpx;
	}
	
	.btnimg {
		width: 320rpx;
		height: 70rpx;
	}
	
	.btnl {
		width: 318rpx;
		height: 68rpx;
		border-radius: 50rpx;
		border: 1rpx solid rgb(240, 117, 53);
		font-size: 28rpx;
		color: rgb(240, 117, 53);
	}
	
	.btnLine{
		height: 60rpx;
	}
</style>
