<template>
	<view class="">
		<image class="img" @click="goback" src="https://oss.kuaitongkeji.com/static/img/app/login/retrue.png" mode=""></image>
		<view class="photo flex-d al-center ju-center">
			<image :src="img" class="phimg" mode=""></image>
			<view class="informTxt">
				{{inform}}
			</view>
			<view @tap="chooseAvatar" class="text">
				更换照片
			</view>
		</view>

		<view v-show="isLoding == true" class="showloding flex al-center ju-center">
			<view class="loding flex-d al-center ju-center">
				<view class=" ">
					<image class="loimg" src="https://oss.kuaitongkeji.com/static/img/app/address/loading.gif" mode=""></image>
				</view>
				上传中
			</view>
		</view>
	</view>
</template>

<script>
	import route from '../../../vendor/request/routes.js'
	import userDetails from '../../../vendor/user/userDetails.js'
	export default {
		name: "",
		components: {

		},
		props: {},
		data() {
			return {
				img: '', //照片
				isLoding: false ,//上传照片
				inform:''
			}
		},
		methods: {
			chooseAvatar() {
				// 此为uView的跳转方法，详见"文档-JS"部分，也可以用uni的uni.navigateTo
				this.$u.route({
					// 关于此路径，请见下方"注意事项"
					url: '/uview-ui/components/u-avatar-cropper/u-avatar-cropper',
					// 内部已设置以下默认参数值，可不传这些参数
					params: {
						// 输出图片宽度，高等于宽，单位px
						destWidth: 250,
						// 裁剪框宽度，高等于宽，单位px
						rectWidth: 250,
						// 输出的图片类型，如果'png'类型发现裁剪的图片太大，改成"jpg"即可
						fileType: 'jpg',
					}
				})
			},
			// 返回
			goback() {
				uni.navigateBack({
					delta: 1
				})
			},
			// 获取用户资料
			UserData() {
				userDetails.userDeta({
					fail: (err) => {
						uni.showToast({
							title: '网络错误',
							icon:'none'
						})
					},
					success: (res) => {
						if (res.statusCode != 200) {
							uni.showToast({
								title: '网络请求出错',
								icon:'none'
							});
							return;
						}
						if (res.data.code != 200) {
							uni.showToast({
								title:res.data.msg,
								icon:'none'
							});
							return;
						}
						// console.log(res.data.data);
						let data = res.data.data
						this.img = data.faceimg
					},
				})
			}
		},
		created() {

			// 监听从裁剪页发布的事件，获得裁剪结果
			uni.$on('uAvatarCropper', path => {
				this.isLoding = true
				// 可以在此上传到服务端
				uni.uploadFile({
					url: route.services.file.upload,
					filePath: path,
					name: 'file',
					success: (res) => {
						
						if (res.statusCode != 200) {
							uni.showToast({
								title: '网络请求出错',
								icon:'none'
							});
							return;
						}

						let data = JSON.parse(res.data);

						if (data.code != 200) {
							uni.showToast({
								title: data.msg,
								icon:'none'
							});
							return;
						}
						userDetails.updataphoto({
							data: {
								faceimg: data.data.url
							},
							fail: (err) => {
								this.isLoding = false
								uni.showToast({
									title: '网络错误',
									icon:'none'
								})
							},
							success: (res) => {
								this.isLoding = false
								// console.log('updataphoto:',res);
								if (res.statusCode != 200) {
									uni.showToast({
										title: '网络请求出错',
										icon:'none'
									});
									return;
								}
								if (res.data.code != 200) {
									uni.showModal({
										title: '更新失败人脸图片失败',
										content: res.data.msg, 
										showCancel: false
									})
									return;
								}
								uni.showToast({
									title: res.data.msg,
									duration: 2000,
								});
								this.inform = '更新成功'
								this.img = data.data.url;
							}
						})
					}
				});
			})
		},
		mounted() {
         this.UserData()
		},
		onShow() {

		},
		onLoad(val) {
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
	.img {
		width: 22rpx;
		height: 41rpx;
		margin-left: 50rpx;
		margin-top: 64rpx;
	}

	.photo {
		margin-top: 130rpx;
		width: 100%;
	}

	.phimg {
		width: 500rpx;
		height: 500rpx;
	}

	.text {
		margin-top: 80rpx;
		color: #666666;
		font-size: 36rpx;
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
	
	.informTxt{
		margin-top: 20rpx;
		font-size: 14px;
		color: rgb(75,203,139);
	}
</style>
