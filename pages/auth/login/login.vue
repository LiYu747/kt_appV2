<template>
	<view class="back">
		<view class="nav pos-rel flex al-center ju-center">
			<image @click="goback" class="img pos-abs" src="https://oss.kuaitongkeji.com/static/img/app/login/fanhui.png" mode=""></image>
			<view class="text">
				<!-- 登录 -->
			</view>
		</view>

		<!-- logo -->
		<view class="logo flex ju-center">
			<image src="https://oss.kuaitongkeji.com/static/img/app/login/logo.png" class="logoimg" mode=""></image>
		</view>
		
		<view  class="cutBox flex al-center">
			<view @click="cut" class="">
				<view v-show="iSlogin==false" class="passlogin flex m-t1">
					验证码登录
				</view>
				<view v-show="iSlogin==true" class="passlogin flex m-t1">
					密码登录
				</view>
			</view>
			<image src="https://oss.kuaitongkeji.com/static/img/app/zhuanh.png" class="zhuanh" mode=""></image>
		</view>
		<!-- 输入框 -->
		<view class="top flex-d al-center">
			<u-form :model="form" ref="uForm">
				<!-- 手机号 -->
				<u-form-item label="" prop="phone">
					<view class="uiput flex al-center pos-rel">
						<image class="iptimg pos-abs" src="https://oss.kuaitongkeji.com/static/img/app/login/phone.png" mode=""></image>
						<u-input class="ipt" type="number" :clearable='flag' v-model="form.phone" placeholder="输入手机号" value="" />
					</view>
				</u-form-item>
				<!-- 密码 -->
				<u-form-item v-show="iSlogin==false" label="" prop="password">
					<view class="uiput flex al-center pos-rel">
						<image class="iptimg2 pos-abs" src="https://oss.kuaitongkeji.com/static/img/app/login/security.png" mode=""></image>
						<u-input class="ipt" type="password" :clearable='flag' v-model="form.password" placeholder="输入密码" value="" />
					</view>
				</u-form-item>
				<!-- 验证码 -->
				<u-form-item v-show="iSlogin==true" label="" prop="Verification">
					<view class="uiput flex al-center pos-rel">
						<image class="iptimg2 pos-abs" src="https://oss.kuaitongkeji.com/static/img/app/login/security.png" mode=""></image>
						<u-input class="ipt" type="number" :clearable='flag' v-model="form.Verification" placeholder="输入验证码" />
						<view @click="addvercode" ref='code' :class="{'dv':code===false}" class="vcode pos-abs flex al-center ju-center">
							<view class="tetxs">
								{{text}}
							</view>
						</view>
					</view>
				</u-form-item>
				<u-toast ref="uToast" />
			</u-form>
		</view>

	

		<!-- 登录按钮 -->
		<view class="flex-d al-center m-t4">
			<view @click="Login" class="btn pos-rel flex ju-center al-center">
				<image src="https://oss.kuaitongkeji.com/static/img/app/login/jbs.png" class="jbsimg" mode=""></image>
				<view class="lgtext pos-abs">
					登录
				</view>
			</view>

			<!-- 找回密码 -->
			<view class="flex al-center retrieve">
				<view @click="find" class="">
					找回密码
				</view>
				<view class="line">

				</view>
				<view @click="register" class="">
					注册账号
				</view>
			</view>

		</view>

	</view>
</template>

<script>
	import sms from '../../../vendor/sms/sms.js';
	import userinfo from '../../../vendor/user/userinfo.js'
	import jwt from '../../../vendor/auth/jwt.js';
    import cache from '../../../vendor/cache/cache.js'

	export default {
		name: "",
		components: {

		},
		props: {},
		data() {
			return {
				iSlogin: false,
				flag: false,
				text: '获取验证码',
				code: true,
				timer: 60,
				loginMethod: 'secret', //默认密码登录为secret,验证码登录sms，
				form: {
					phone: '',
					password: '',
					Verification: ''
				},
				rules: {
					phone: [
						// 对电话字段格式验证
						{
							pattern: /^1[3|4|5|7|8][0-9]{9}$/,
							message: '手机号码格式不正确',
							trigger: 'blur'
						},
						// 对电话字段进行必填验证
						{
							required: true,
							message: '请输入手机号码',
							trigger: 'blur'
						},
					],
				},
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
						use_to:'user_login',
						tel: this.form.phone,
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
						// 发送成功
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
							icon: 'none',
							duration: 2000
						})
						// this.form.Verification = res.data.data.code 
						// console.log(res.data.data.code);
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
			// 切换登录
			cut() {
				this.iSlogin = !this.iSlogin
				// this.iSlogin 为true 是验证码 ,反之
				if (this.iSlogin == true) {
						this.loginMethod = 'sms'
				}
				if (this.iSlogin == false) {
					this.loginMethod = 'secret'
				}
			},
			// 返回按钮
			goback() {
				uni.navigateBack({
					delta: 1
				})
			},
			// 去注册
			register() {
				uni.navigateTo({
					url: '/pages/user/register/register'
				})
			},
			// 找回密码
			find() {
				uni.navigateTo({
					url:'/pages/user/findPsw/findPsw'
				})
			},
			// 登录
			Login() {
				if (this.form.phone == '') {
					uni.showToast({
						title: '请输入手机号',
						icon: 'none'
					})
					return;
				}
				uni.showLoading({
					title: '加载中...'
				})
				userinfo.Signin({
					data: {
						login_method: this.loginMethod,
						tel: this.form.phone,
						sms_code: this.form.Verification,
						secret: this.form.password
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
						if (res.statusCode != 200) {
							uni.showToast({
								title: '网络出错了',
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

						let info = jwt.parseToken(res.data.data.jwt.token);
						if (!info) return;

						jwt.setToken(res.data.data.jwt.token, info.exp * 1000 - 10000, () => {
							jwt.execTask();
						})
						cache.set('loginTel',this.form.phone)
						// 
						this.$refs.uToast.show({
							title: res.data.msg,
							type: 'success',
						});
						const time = setTimeout(() => {
								uni.navigateBack({
									delta: 1
								})
							clearTimeout(time)
						}, 2000)
					},
				})
			}
		},
		mounted() {
			if(!cache.get('loginTel')) return;
			this.form.phone = cache.get('loginTel')
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
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
	.back {
		position: relative;
		background-image: url(https://oss.kuaitongkeji.com/static/img/app/login/backg.png);
		height: 100vh;
		background-repeat: no-repeat; //不重复
		background-size: 100% 100%; // 满屏
	}

	.nav {
		top: 67rpx;
	}

	.img {
		width: 22rpx;
		height: 41rpx;
		left: 50rpx;
	}

	.text {
		height: 40rpx;
	}

	.logo {
		margin-top: 200rpx;
		width: 100%;
	}

	.logoimg {
		width: 128rpx;
		height: 169rpx;
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
			// background: red; 
			font-size: 12px;
			width: 430rpx;
		}

		/deep/ .uni-input-placeholder {
			color: #FF773C !important;
			font-size: 12px;
		}
			/deep/
		.u-icon__icon{
			font-size: 18px !important;
		}
	}

   
	.top {
		// margin-top: 75rpx;
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

	.line {
		width: 1rpx;
		height: 26rpx;
		background: #FF773C;
		margin: 0 28rpx;
	}

	.retrieve {
		color: #FF773C;
		font-size: 12px;
		margin-top: 57rpx;
	}
	
	.cutBox{
		margin-top: 75rpx;
		height: 50rpx;
		width: 650rpx;
		display: flex;
		justify-content: flex-end;
	}

	.passlogin {
		font-size: 12px;
		color: #F07535;
	}
	
	.zhuanh{
		margin-top: 8rpx;
		margin-left: 10rpx;
		width: 30rpx;
		height: 30rpx;
	}
</style>
