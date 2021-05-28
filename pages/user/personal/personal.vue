<template>
	<view class="">
		<subunit titel="个人信息"></subunit>
		<view class="whole flex-d al-center">
			<view @click="UploadAvatar" class="activ flex al-center ju-center">
				<image :src="image" class="img" mode="aspectFill"></image>
			</view>
			<view @click="UploadAvatar" class="text">
				上传头像
			</view>
			<view class="postop">
				<view class="fied flex al-center" :class="index == 4 ? 'nodv':''" v-for="(item,index) in parameter"
					@click="xuaz(index)" :key='item.id'>
					<u-field label-width=270 v-model="item.value" :label="item.label" :clearable=false
						input-align='right' :disabled="item.disabled">
					</u-field>
					<view v-if="index>1" @click="add(index)" class="">
						<image v-show="item.show == false" src="../../../image/user/onshow.png" class="onshow" mode="">
						</image>
						<image v-show="item.show == true" src="../../../image/user/show.png" class="onshow" mode="">
						</image>
					</view>
				</view>
				<u-select v-model="show" :default-value='value' @confirm='ok' :list="list"></u-select>
			</view>

			<!-- 提交 -->
			<view @click="Submit" class="end flex al-center ju-center">
				<image src="https://oss.kuaitongkeji.com/static/img/app/login/ccuc.png" class="enimg" mode=""></image>
				<view class=" pos-abs">
					提交
				</view>
			</view>

			<view v-show="isLoding == true" class="showloding flex al-center ju-center">
				<view class="loding flex-d al-center ju-center">
					<view class=" ">
						<image class="loimg" src="https://oss.kuaitongkeji.com/static/img/app/address/loading.gif"
							mode=""></image>
					</view>
					上传中
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import subunit from '../../../components/sub-unit/subunit.vue'
	import userDetails from '../../../vendor/user/userDetails.js'
	import route from '../../../vendor/request/routes.js'
	export default {
		name: "",
		components: {
			subunit
		},
		props: {},
		data() {
			return {
				image: '', //头像
				parameter: [{
						value: '',
						label: '昵称',
					},
					{
						value: '',
						label: '性别',
						disabled: true
					},
					{
						value: '',
						label: '真实姓名',
						disabled: true,
						show: false
					},
					{
						value: '',
						label: '手机号码',
						disabled: true,
						show: false
					},
					{
						value: '',
						label: '身份证号码',
						disabled: true,
						show: false
					}
				],
				show: false, //打开性别选择
				list: [{
						value: '1',
						label: '男'
					},
					{
						value: '2',
						label: '女'
					}
				],
				sex: '', //性别id
				flag: false, //判断用户是否选择了头像
				faceimg: '', //证件照
				value: [], //默认选择
				isLoding: false, //上传照片
				usermsg: {} //用户资料
			}
		},
		methods: {
			add(index) {
				this.parameter.map((item, idx) => {
					if (index == idx) {
						item.show = !item.show
						if (item.show == true) {
							switch (index) {
								case 2:
									item.value = this.usermsg.username
									break;
								case 3:
									item.value = this.usermsg.tel
									break;
								case 4:
									item.value = this.usermsg.id_card_no
							}
						} else {
							switch (index) {
								case 2:
									item.value = this.usermsg.username.slice(0, 1) + '**'
									break;
								case 3:
									item.value = this.usermsg.tel.slice(0, 3) + '****' + this.usermsg.tel.slice(7,
										11)
									break;
								case 4:
									item.value = this.usermsg.id_card_no.slice(0, 3) + '**********' + this.usermsg
										.id_card_no.slice(this.usermsg.id_card_no.length - 4, this.usermsg
											.id_card_no.length)
							}
						}
					}
				})
			},
			// 上传头像
			UploadAvatar() {
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
			xuaz(index) {
				// 选择性别
				if (index == 1) {
					this.show = true
					let sex = this.parameter[1].value
					if (sex == '男') {
						this.value = [0]
					}
					if (sex == '女') {
						this.value = [1]
					}
				}
			},
			// 性别确定按钮
			ok(val) {
				this.parameter[1].value = val[0].label
				this.sex = val[0].value
				if (this.sex == 2 && this.flag == true) {
					this.image = 'https://oss.kuaitongkeji.com/static/img/avatar/female_64.png'
				}
			},
			// 提交
			Submit() {
				if (this.isLoding == true) return;
				uni.showLoading({
					title: "提交中..."
				})
				let name = this.parameter[0].value
				userDetails.userupdate({
					data: {
						nickname: name,
						avatar: this.image,
						sex: this.sex
					},
					fail: (err) => {
						uni.hideLoading()
						uni.showToast({
							title: '网络错误',
							icon: 'none'
						})
					},
					success: (res) => {
						uni.hideLoading()
						if (res.statusCode != 200) {
							uni.showToast({
								title: '网络请求出错',
								icon: 'none'
							});
							return;
						}
						if (res.data.code != 200) {
							uni.showToast({
								title: res.data.msg,
								duration: 2000
							})
							return;
						}
						uni.showToast({
							title: res.data.msg,
							duration: 2000
						})
					},
				})
			},
			// 获取用户资料
			UserData() {
				uni.showLoading({
					title: '加载中...'
				})
				userDetails.userDeta({
					fail: (err) => {
						uni.hideLoading()
						uni.showToast({
							title: '网络错误',
							icon: 'none'
						})
					},
					success: (res) => {
						uni.hideLoading()
						if (res.statusCode != 200) {
							uni.showToast({
								title: '网络请求出错',
								icon: 'none'
							});
							return;
						}
						if (res.data.code != 200) {
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							});
							return;
						}
						// console.log(res.data.data);
						let data = res.data.data
						this.usermsg = data
						if (data.avatar == 'https://oss.kuaitongkeji.com/static/img/avatar/male_64.png') {
							this.flag = true
						}
						this.faceimg = data.faceimg
						this.image = data.avatar
						this.parameter[0].value = data.nickname
						if (data.sex == 1) {
							this.parameter[1].value = '男'
						}
						if (data.sex == 2) {
							this.parameter[1].value = '女'
						}
						this.parameter[2].value = data.username.slice(0, 1) + '**'
						this.parameter[3].value = data.tel.slice(0, 3) + '****' + data.tel.slice(7, 11)
						if (data.id_card_no) {
							this.parameter[4].value = data.id_card_no.slice(0, 3) + '**********' + data
								.id_card_no.slice(data.id_card_no.length - 4, data.id_card_no.length)
						}
					},
				})
			}
		},
		mounted() {
			this.UserData()
		},
		onLoad(val) {},
		onShow() {
			if (this.$store.state.userphoto) {
				let path = this.$store.state.userphoto
				this.isLoding = true
				// 可以在此上传到服务端
				uni.uploadFile({
					url: route.services.file.upload,
					filePath: path,
					name: 'file',
					complete: (res) => {
						this.isLoding = false;
						if (res.statusCode != 200) {
							uni.showToast({
								title: '网络请求出错',
								icon: 'none'
							});
							return;
						}

						let data = JSON.parse(res.data)

						if (data.code != 200) {
							uni.showToast({
								title: data.msg,
								icon: 'none'
							});
							return;
						}
						if (data.data.url) {
							uni.showToast({
								title: '上传成功',
								icon: 'none'
							})
							this.image = data.data.url
							this.flag = false
						}

					}
				});
			}

		},
		onUnload() {
			this.$store.commit("userphoto",'')
		},
		onHide() {
			this.$store.commit("userphoto",'')
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
	.onshow {
		width: 32rpx;
		height: 20rpx;
		margin-right: 12rpx;
	}

	.activ {
		width: 148rpx;
		height: 148rpx;
		margin-top: 80rpx;
		border-radius: 50%;
		background: #FFFFFF;
	}

	.img {
		width: 148rpx;
		height: 148rpx;
		border-radius: 50%;
	}

	.text {
		margin-top: 21rpx;
		font-size: 36rpx;
		color: #666666;
	}

	.fied {
		width: 630rpx;
		height: 90rpx;
		padding-left: 40rpx;
		padding-right: 20rpx;
		background: #FFFFFF;
		border-bottom: 1px solid #BFBFBF;
		font-size: 15px;

		/deep/ .u-field {
			width: 100%;
			padding: 0;
		}
	}

	.postop {
		margin-top: 48rpx;
		box-shadow: 2rpx 2rpx 12rpx #d9d9d9;
	}

	.dv {
		border: none;
	}

	/deep/ .uni-input-input {
		width: 300rpx;
	}

	.end {
		margin-top: 61rpx;
		font-size: 30rpx;
		color: #FFFFFF;
	}

	.enimg {
		width: 358rpx;
		height: 68rpx;
	}

	/deep/ .u-select__body[data-v-a577ac80] {
		height: 300rpx !important;
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

	.nodv {
		border-bottom: none;
	}
</style>
