<template>
	<view class="">
		<view class="pos-rel message">
			<view class="text flex al-center">
				请添加附件
				<view class="fz-12 m-l2 c-red">
					(房产证或租房合同照片,仅用于审核)
				</view>
			</view>
			<view class="flex al-center fujbox">
				<view class="" v-for="item in image" :key='item.id'>
					<image :src="item" class="itemimg" mode="aspectFill"></image>
				</view>
				<view @click="succ" class="puls flex-d al-center ju-center">
					<image src="https://oss.kuaitongkeji.com/static/img/app/home/push.png" class="pushimg" mode=""></image>
					添加
				</view>
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
	export default {
		name: "",
		components: {

		},
		props: {
			Gshow: {
				type: Number,
				}
		},
		data() {
			return {
				image: [],
				isLoding: false
			}
		},
		methods: {
			succ() {
				if (this.Gshow == 3) return;
				uni.chooseImage({
					extension: ['jpg', 'jpeg', 'png', 'gif'],
					success: (chooseImageRes) => {
						const files = chooseImageRes.tempFilePaths;
						this.isLoding = true;
						let that = this;

						if (files.length == 0) return;

						let func = [];
						files.forEach((item) => {
							func.push(that.upload(item));
						});

						Promise.all(func).then((res) => {
							that.isLoding = false;
						}).catch((err) => {
							that.isLoding = false;
							uni.showModal({
								title: "上传文件出错:" + err,
							})
						})
					}
				})
			}

			,
			upload(fileItem) {
				let that = this;
				return new Promise((res, rej) => {
					uni.uploadFile({
						url: route.services.file.upload,
						filePath: fileItem,
						name: 'file',
						fail: (err) => {
							// that.isLoding = false;
							rej('网络出错');
						},
						success: (val) => {
							// that.isLoding = false;
							if (val.statusCode != 200) {
								rej(val.statusCode);
								return;
							}

							let jres = JSON.parse(val.data);

							if (jres.code != 200) {
								rej(jres.msg);
								return;
							}
							// console.log(jres.data.url);
							that.image.push(jres.data.url)
							that.$emit('abb', this.image)
							res(jres);
						}
					})
				})
			}
		},
		mounted() {

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
	.message {
		margin-top: 20rpx;
		width: 644rpx;
		padding-bottom: 20rpx;
		background: #FFFFFF;
		border-radius: 10rpx;
	    box-shadow: 2rpx 2rpx 12rpx #d9d9d9;
		padding-left: 20rpx;
		padding-right: 26rpx;

	}

	.text {
		height: 69rpx;
		font-size: 30rpx;
		color: #666666;
		border-bottom: 1rpx solid #BFBFBF;
		margin-bottom: 20rpx;
	}

	.move {
		top: 0;
		left: 0;
		margin-left: 20rpx;
		margin-top: 20rpx;
		font-size: 30rpx;
		opacity: 0;
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

	.itemimg {
		width: 140rpx;
		height: 160rpx;
		border-radius: 10rpx;
		margin-right: 20rpx;
		margin-bottom: 10rpx;
	}

	.puls {
		width: 140rpx;
		height: 140rpx;
		background: rgb(244, 245, 246);
		border-radius: 10rpx;
		font-size: 26rpx;
		color: #8a8a8a;
		margin-bottom: 15rpx;
	}

	.pushimg {
		width: 50rpx;
		height: 50rpx;
	}

	.fujbox {
		flex-wrap: wrap;
	}
</style>
