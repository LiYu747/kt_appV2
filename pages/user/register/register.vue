<template>
	<view class="back">
		<view class="nav pos-rel flex al-center ju-center" :style="{top:customBar + 'rpx'}">
			<image @click="goback" class="img pos-abs"
				src="https://oss.kuaitongkeji.com/static/img/app/login/fanhui.png" mode=""></image>
			<view class="text">
				注册
			</view>
		</view>

		<!-- logo -->
		<view class="logo flex ju-center">
			<image :src="avatar" @click="UploadAvatar" class="logoimg" mode="aspectFill"></image>
		</view>
		<!-- 输入框 -->
		<view class="top flex-d al-center">
			<u-form :model="form" ref="uForm">
				<!-- 昵称-->
				<u-form-item label="" class="postop" prop="nickname">
					<view class="uiput flex al-center pos-rel">
						<image class="nameimg pos-abs" src="https://oss.kuaitongkeji.com/static/img/app/register/my.png"
							mode=""></image>
						<u-input class="ipt" :clearable='flag' v-model="form.nickname" placeholder="昵称(用于给他人展示)" />
					</view>
				</u-form-item>
				<!-- 性别-->
				<u-form-item label="" class="postop" prop="sex">
					<view class="uiput flex al-center pos-rel">
						<image class="nameimg pos-abs" src="../../../image/Usersex.png" mode=""></image>
						<view class="userSex">
							性别
						</view>
						<view class="pos-abs celradio">
							<u-radio-group v-model="value" @change="radioGroupChange">
								<u-radio label-size="24" icon-size="24" active-color="#FF773C"
									v-for="(item, index) in list" :key="index" :name="item.name"
									:disabled="item.disabled">
									{{item.name}}
								</u-radio>
							</u-radio-group>
						</view>
					</view>
				</u-form-item>
				<!-- 设置密码-->
				<u-form-item label="" class="postop" prop="password">
					<view class="uiput flex al-center pos-rel">
						<image class="idptimg pos-abs" src="../../../image/userpawd.png" mode=""></image>
						<u-input class="ipt" type="password" :clearable='flag' v-model="form.password"
							placeholder="设置登录密码" />
					</view>
				</u-form-item>
				<!-- 确认密码-->
				<u-form-item label="" class="postop" prop="confirmPass">
					<view class="uiput flex al-center pos-rel">
						<image class="idptimg pos-abs" src="../../../image/userpawd.png" mode=""></image>
						<u-input class="ipt" type="password" :clearable='flag' v-model="form.confirmPass"
							placeholder="确认登录密码" />
					</view>
				</u-form-item>
				<!-- 手机号 -->
				<u-form-item class="postop" label="" prop="phone">
					<view class="uiput flex al-center pos-rel">
						<image class="iptimg pos-abs" src="https://oss.kuaitongkeji.com/static/img/app/login/phone.png"
							mode=""></image>
						<u-input class="ipt" type="number" :clearable='flag' v-model="form.phone" placeholder="手机号" />
					</view>
				</u-form-item>
				<!-- 验证码 -->
				<u-form-item class="postop" label="" prop="Verification">
					<view class="uiput flex al-center pos-rel">
						<image class="iptimg2 pos-abs"
							src="https://oss.kuaitongkeji.com/static/img/app/login/security.png" mode=""></image>
						<u-input class="ipt" type="number" :clearable='flag' v-model="form.Verification"
							placeholder="验证码" />
						<view @click="addvercode" ref='code' :class="{'dv':code===false}"
							class="vcode pos-abs flex al-center ju-center">
							<view class="tetxs">
								{{text}}
							</view>
						</view>
					</view>
					<u-toast ref="uToast" />
				</u-form-item>
			</u-form>
		</view>

		<!-- 注册按钮 -->
		<view class="flex-d al-center">
			<view @click="register" class="btn pos-rel flex ju-center al-center">
				<image src="https://oss.kuaitongkeji.com/static/img/app/login/jbs.png" class="jbsimg" mode=""></image>
				<view class="lgtext pos-abs">
					注册
				</view>
			</view>
		</view>

		<view v-show="isLoding == true" class="showloding flex al-center ju-center">
			<view class="loding flex-d al-center ju-center">
				<view class=" ">
					<image class="loimg" src="https://oss.kuaitongkeji.com/static/img/app/address/loading.gif" mode="">
					</image>
				</view>
				上传中
			</view>
		</view>
	</view>
</template>

<script>
	import userinfo from '../../../vendor/user/userinfo.js'
	import sms from '../../../vendor/sms/sms.js'
	import route from '../../../vendor/request/routes.js'
	import cache from '../../../vendor/cache/cache.js'
	import config from '../../../vendor/config/config.js'
	export default {
		name: "",
		components: {

		},
		props: {},
		data() {
			const validatePass = (rule, value, callback) => {
				if (value === "") {
					callback(new Error("请输入密码"));
				} else {
					callback();
				}
			};
			const validatePass2 = (rule, value, callback) => {
				if (value === "") {
					callback(new Error("请再次输入密码"));
				} else if (value !== this.form.password) {
					callback(new Error("两次输入密码不一致!"));
				} else {
					callback();
				}
			};
			return {
				customBar:0,
				flag: false, //验证码变量
				text: '获取验证码',
				code: true, //验证码按钮
				timer: 60, //倒计时时间
				avatar: 'https://oss.kuaitongkeji.com/static/img/avatar/male_64.png', //用户头像
				sex: 1, //用户性别默认男
				form: {
					nickname: '',
					password: '',
					confirmPass: '',
					phone: '',
					Verification: ''
				},
				rules: {
					password: [{
							min: 6,
							message: '密码至少6位',
							trigger: 'blur'
						},
						{
							validator: validatePass,
							trigger: "blur"
						}
					],
					confirmPass: [{
						validator: validatePass2,
						trigger: "blur"
					}],
				},
				isLoding: false, //上传照片 
				list: [{
						name: '男',
						disabled: false
					},
					{
						name: '女',
						disabled: false
					},
				],
				value: '男',
			}
		},
		methods: {
			// 获取验证码
			addvercode() {
				if (this.code != true) return;
				if (this.form.phone == '') {
					uni.showToast({
						title: '请输入手机号',
						icon: 'none'
					})
					return;
				}
				uni.showLoading({
					title: '发送中...'
				})
				sms.smsSend({
					data: {
						use_to: 'user_reg',
						tel: this.form.phone
					},
					fail: () => {
						uni.hideLoading()
						uni.showToast({
							title: '网络错误',
							icon: 'none'
						})
					},
					success: (res) => {
						// console.log(res);
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
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						})
						const authtime = setInterval(() => {
							this.code = false
							this.timer--
							this.text = '验证码' + '(' + this.timer + 's' + ')'
							if (this.timer <= 0) {

								this.timer = 60
								this.text = '重新发送'
								this.code = true
								clearInterval(authtime)
							}
						}, 1000)
					},
				})
			},
			// 注册
			register() {
				if (this.isLoding == true) return;
				if (this.form.nickname == '') {
					uni.showToast({
						title: '请输入昵称',
						icon: 'none'
					})
					return;
				}
				if (this.form.password == '') {
					uni.showToast({
						title: '请输入登录密码',
						icon: 'none'
					})
					return;
				}
				if (this.form.confirmPass == '') {
					uni.showToast({
						title: '请输入确认密码',
						icon: 'none'
					})
					return;
				}
				if (this.form.phone == '') {
					uni.showToast({
						title: '请输入手机号',
						icon: 'none'
					})
					return;
				}
				if (this.form.Verification == '') {
					uni.showToast({
						title: '请输入验证码',
						icon: 'none'
					})
					return;
				}
				uni.showLoading({
					title: '加载中...'
				})
				userinfo.register({
					data: {
						nickname: this.form.nickname,
						sex: this.sex,
						secret: this.form.password,
						secret_confirmation: this.form.confirmPass,
						tel: this.form.phone,
						sms_code: this.form.Verification,
						avatar: this.avatar,
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
								icon: 'none'
							});
							return;
						}

						uni.showToast({
							title: res.data.msg,
							icon: "none"
						})
						const timeOut = setTimeout(() => {
							uni.navigateBack({
								delta: 1
							})
							clearTimeout(timeOut)
						}, 2000)

					},

				})
			},
			// 返回按钮
			goback() {
				uni.navigateBack({
					delta: 1
				})
			},
			// 选中任一radio时，由radio-group触发
			radioGroupChange(e) {
				if (e == '男') {
					this.sex = 1
				} else {
					this.sex = 2
				}

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
		},
		mounted() {

		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
			this.customBar = uni.getSystemInfoSync().statusBarHeight + 67
			  config.ready( (data) => {
			      if(!data.base.user_default_avatar) return;
			        this.avatar  = data.base.user_default_avatar
			    })
		},
		onShow() {
		 if(this.$store.state.userphoto){
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
			 		if( data.data.url){
			 		uni.showToast({
			 			title: '上传成功',
			 			icon: 'none'
			 		})
			 		this.avatar = data.data.url	
			 		}
			 	}
			 });
		 }
		},
		onUnload() {
			this.$store.commit("userphoto",'')
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
	.back {
		position: relative;
		background-image: url(https://oss.kuaitongkeji.com/static/img/app/login/backg.png);
		height: 100vh;
		background-repeat: no-repeat; //不重复
		background-size: 100% 100%; // 满屏
		 padding-bottom: 0;  
		  padding-bottom: constant(safe-area-inset-bottom);  
		  padding-bottom: env(safe-area-inset-bottom); 
	}


	.img {
		width: 22rpx;
		height: 41rpx;
		left: 50rpx;
	}

	.userSex {
		color: #ffa67f;
		font-size: 12px;
	}

	.text {
		font-size: 36rpx;
		color: #FF773C;
		opacity: 0;
	}

	.logo {
		margin-top: 200rpx;
		width: 100%;
	}

	.logoimg {
		width: 130rpx;
		height: 130rpx;
		border-radius: 50%;
	}

	.uiput {
		width: 432rpx;
		height: 68rpx;
		background: rgba(255, 255, 255, 0.7);
		border-radius: 34rpx;
		padding: 0 72rpx;
	}

	.ipt {
		/deep/ .uni-input-input {
			color: #FF773C;
			font-size: 12px;
			width: 350rpx;
		}

		/deep/ .uni-input-placeholder {
			color: #ffa67f !important;
			font-size: 12px;
		}
	}

	.celradio {
		right: 0rpx;
	}

	.top {
		margin-top: 75rpx;
	}

	.nameimg {
		width: 30rpx;
		height: 30rpx;
		left: 33rpx;
	}

	.idcardimg {
		left: 33rpx;
		width: 30rpx;
		height: 30rpx;
	}

	.idptimg {
		width: 30rpx;
		height: 30rpx;
		left: 35rpx;
	}

	.iptimg {
		width: 30rpx;
		height: 30rpx;
		left: 37rpx;
	}

	.iptimg2 {
		width: 30rpx;
		height: 30rpx;
		left: 37rpx;
	}

	.vcode {
		padding: 0 10rpx;
		height: 40rpx;
		border-radius: 22rpx;
		border: 1rpx solid #FF773C;
		right: 27rpx;
		color: #FF773C;
	}

	.tetxs {
		font-size: 24rpx;
		-webkit-transform: scale(0.9);
		-webkit-transform-origin: left top 2
	}

	.dv {
		background: #FF934E;
		border: none;
		color: #FFFFFF;
		-webkit-transform: scale(0.9);
		-webkit-transform-origin: left top 2
	}

	.btn {
		margin-top: 20rpx;
		width: 576rpx;
		height: 68rpx;
	}

	.jbsimg {
		width: 576rpx;
		height: 68rpx;
		border-radius: 34rpx;
	}

	.lgtext {
		font-size: 30rpx;
		color: #FFFFFF;
	}

	.upload {
		right: 27rpx;
		color: #FF773C;
		font-size: 24rpx;
	}

	.postop {
		margin-top: -20rpx;
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
