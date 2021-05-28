<template>
	<view>
		<subunit titel='找回密码' ></subunit>
		<view class="flex-d al-center">
			<view class="cententBox">
				<u-form :model="form" ref="uForm">
					<!-- 手机号 -->
					<u-form-item v-show="falgWay == false" label="" prop="phone">
						<view class="label">
							手机号
						</view>
						<view class="uiput flex al-center pos-rel">
							<u-input class="ipt" type="number" :clearable='flag' v-model="form.phone" placeholder="输入手机号" value="" />
						</view>
					</u-form-item>
					<!-- 密码 -->
					<u-form-item label="" prop="password">
						<view class="label">
							新密码
						</view>
						<view class="uiput flex al-center pos-rel">
							<u-input class="ipt" type="password" :clearable='flag' v-model="form.password" placeholder="输入新密码" value="" />
						</view>
					</u-form-item>
					<!-- 确认密码 -->
					<u-form-item label="" prop="cfmPassword">
						<view class="label">
							确认密码
						</view>
						<view class="uiput flex al-center pos-rel">
							<u-input class="ipt" type="password" :clearable='flag' v-model="form.cfmPassword" placeholder="确认密码" value="" />
						</view>
					</u-form-item>

					<!-- 验证码 -->
					<u-form-item v-show="falgWay == false" label="" prop="Verification">
						<view class="label">
							验证码
						</view>
						<view class="uiput flex al-center pos-rel">
							<u-input class="ipt" type="number" :clearable='flag' v-model="form.Verification" placeholder="输入验证码" />
							<view @click="addvercode" ref='code' :class="{'dv':code===false}" class="vcode pos-abs flex al-center ju-center">
								<view class="tetxs">
									{{text}}
								</view>
							</view>
						</view>
					</u-form-item>
				</u-form>
			</view>
			
			<!-- 确定按钮 -->
			<view class="flex-d al-center m-t4">
				<view @click="save" class="btn pos-rel flex ju-center al-center">
					<image src="https://oss.kuaitongkeji.com/static/img/app/login/jbs.png" class="jbsimg" mode=""></image>
					<view class="lgtext pos-abs">
						保存
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import subunit from '../../../components/sub-unit/subunit.vue'
	import user from '../../../vendor/user/userDetails.js'
	import sms from '../../../vendor/sms/sms.js'
	export default {
		name: "",
		components: {
			subunit
		},
		props: {},
		data() {
			const validatePass = (rule, value, callback) => {
				if (value === "") {
					callback(new Error("请新输入密码"));
				}  
				else {
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
				falgWay:false,
				setWay:'使用旧密码修改',
				verify_method:'sms_code',
				flag: false,
				text: '获取验证码',
				code: true,
				timer: 60,
				form: {
					phone: '',
					password: '',
					cfmPassword: '',
					Verification: '',
					oldPassword:''
				},
				rules: {
					password: [
						{
							min: 6,
							message: '密码至少6位',  
							trigger: 'blur'
						},
						{
							validator: validatePass,
							trigger: "blur"
						}
					],
					cfmPassword: [
						{
							validator: validatePass2,
							trigger: "blur"
						}
					],
				},
			}
		},
		methods: {
			
			//保存新密码
			save(){
				this.codeWay()
			},
			codeWay(){
				uni.showLoading({
					title:'加载中'
				})
				user.findPaw({
					data:{
						tel:this.form.phone,
						sms_code:this.form.Verification,
						new_secret: this.form.password,
						new_secret_confirmation: this.form.cfmPassword,
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
							duration:2000
						});
						const authtime = setInterval(() => {
						     uni.navigateBack({
						     	delta:1
						     })
							 clearInterval(authtime)
						}, 2000)
					}
				})
			},
			
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
						tel: this.form.phone,
						use_to:'user_forgot_password'
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

		},
		mounted() {
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
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
	.fixed {
		position: fixed;
		z-index: 9;
	}

	.topLine {
		height: 148rpx;
	}

	.cententBox {
		margin-top: 50rpx;
		width: 610rpx;
        color: #666666;
		background: #FFFFFF;
		border-radius: 10rpx;
		padding: 0 40rpx;
		padding-bottom: 50rpx;
		box-shadow: 2rpx 2rpx 12rpx #d9d9d9;
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

	.uiput {
		width: 400rpx;
		height: 68rpx;
		// background: red;
		// padding: 0 72rpx;
	}

	.label {
		width: 130rpx;
	}

	/deep/ .u-form-item__message {
		padding-left: 130rpx !important;
		margin-top: 0;
	}

	.u-form-item {
		border-bottom: 1px solid #CCCCCC;
	}

	.ipt {
		/deep/ .uni-input-input {
			// background: red; 
			font-size: 14px;
			width: 350rpx;
		}

		/deep/ .uni-input-placeholder {
			font-size: 14px;
		}
	}

	.vcode {
		padding: 0 10rpx;
		height: 40rpx;
		border-radius: 22rpx;
		border: 1rpx solid #FF773C;
		right: 0;
		color: #FF773C;
	}

	.tetxs {
		font-size: 24rpx;
	}

	.dv {
		background: #FF934E;
		border: none;
		color: #FFFFFF;
	}

	.btn {
		margin-top: 20rpx;
		width: 576rpx;
		height: 68rpx;
	}

	.jbsimg {
		width: 440rpx;
		height: 68rpx;
		border-radius: 34rpx;
	}

	.lgtext {
		font-size: 30rpx;
		color: #FFFFFF;
	}
	
	.setPwd{
		width: 640rpx;
		display: flex;
		justify-content: flex-end;
		margin-top: 30rpx;
		font-size: 12px;
		color: #F07535;
	}
</style>
