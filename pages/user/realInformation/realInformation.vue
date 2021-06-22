<template>
	<view>
		<subunit titel='实名信息'></subunit>
		<view class="flex-d al-center">
			<view class="contenBox">
				<view class="flex al-center ju-between itemBox pos-rel" @click="settingPsw(index)" v-for=" (item,index) in locdata" :key='item.id'>
					<view class="">
						{{item.label}}
					</view>
					<view class="">
						<input type="text" class="ipt" :focus="item.focus" :disabled="item.disabled" :placeholder="item.placeholder"
						 v-model="item.value" />
					</view>
					<view  class="" v-if="index == 2" class="pos-abs rigth fz-14">
						<view @click="upload" v-if="!photo" class="">
							上传
						</view>
						<view @click="preview" v-else class="">
							预览
						</view>
					</view>
					<view v-if="index==3" class="pos-abs rigth">
						<image class="reimg" src="https://oss.kuaitongkeji.com/static/img/app/address/retrue.png" mode=""></image>
					</view>
				</view>
			</view>

			<!-- 保存 -->
			<view @click="save" class="flex al-center ju-center fz-16 save">
					保存
			</view>

			<!-- 退出登录 -->
			<view @click="logOut" class="end flex al-center fz-16 ju-center">
				退出登录
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
	import subunit from '../../../components/sub-unit/subunit.vue'
	import user from '../../../vendor/user/userDetails.js'
	import jwt from '../../../vendor/auth/jwt.js';
	import route from '../../../vendor/request/routes.js'
	export default {
		name: "",
		components: {
			subunit
		},
		props: {},
		data() {
			return {
				idcard:'',//身份证信息
				originalId:'',//原数据
				locdata: [{
						label: '真实姓名',
						value: ''
					},
					{
						label: '身份证号',
						value: '',
						focus: false,
						placeholder: '请输入您的身份证号'
					},
					{
						label: '正面免冠照',
						value: '',
						disabled:true
					},
					{
						label: '设置新密码',
						value: '',
						disabled:true
					},
				],
				isLoding:false,
				photo:''
			}
		},
		methods: {
			
			// 上传
			upload() {
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
			// 预览
			preview() {
				uni.navigateTo({
					url: `/pages/user/register/headSculpture`
				})
			},
			// 设置密码
			settingPsw(index){
				if(index != 3) return;
				uni.navigateTo({
				 url:'/pages/user/realInformation/setPassword/setPassword'	
				})
			},

			//保存
			save() {
				if(!this.locdata[0].value){
					uni.showToast({
						title:"请输入您的姓名",
						icon:"none"
					})
					return;
				}
				if(!this.locdata[1].value){
					uni.showToast({
						title:"请输入您的身份证号",
						icon:"none"
					})
					return;
				}
				if(!this.photo){
					uni.showToast({
						title:"请上传您的正面照",
						icon:"none"
					})
					return;
				}
				let idcard = ''
				if(this.locdata[1].value == this.idcard){
					idcard = this.originalId
				}
				else{
					idcard = this.locdata[1].value
				}
				uni.showLoading({
					title:'加载中'
				})
				user.updataRealname({
					data: {
						username: this.locdata[0].value,
						id_card_no:idcard,
						faceimg:this.photo
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
						};
						uni.showToast({
							title: res.data.msg,
						})
					}
				})
			},
			// 退出登录
			logOut() {
				uni.showModal({
					content: '您确定要退出吗',
					success: (res => {
						if (res.confirm) {
							jwt.flush({
								success: () => {
									uni.navigateBack({
										delta: 1
									})
								}
							});
						}
					})
				})
			},
			//用户信息
			getUserinfo() {
				uni.showLoading({
					title:'加载中'
				})
				user.userDeta({
					data: {},
					fail: () => {
						uni.hideLoading()
						uni.showToast({
							title: '网络错误',
							icon: 'none'
						})
					},
					success: (res) => {
						uni.hideLoading()
						if (res.statusCode != 200) return;
						if (res.data.code != 200) return;
						let Users = res.data.data
						this.locdata[0].value = Users.username
						if (!Users.id_card_no) {
							this.locdata[1].focus = true
							return;
						}
						this.photo = Users.faceimg
						this.$store.commit('userPhoto', Users.faceimg)
						this.locdata[1].value = Users.id_card_no.slice(0, 3) + '**********' + Users.id_card_no.slice(Users.id_card_no.length -
							4, Users.id_card_no.length)
						this.idcard = 	 Users.id_card_no.slice(0, 3) + '**********' + Users.id_card_no.slice(Users.id_card_no.length -
							4, Users.id_card_no.length)
						this.originalId = 	Users.id_card_no
					},

				})
			}
		},
		mounted() {
            this.getUserinfo()
		},
		onShow() {
			if(this.$store.state.userPhoto){
				this.photo = this.$store.state.userPhoto
			}
			
			//上传
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
						uni.showToast({
							title: '上传成功',
							icon: 'none'
						})
						// console.log(res);
						this.photo = data.data.url
						this.$store.commit('userPhoto', data.data.url)
					}
				});
			}
			
		},
		onLoad() {

		},
		onHide() {
			this.$store.commit("userphoto",'')
		},
		onUnload() {
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
	.fixed {
		position: fixed;
	}

	.topLine {
		height: 148rpx;
	}

	.contenBox {
		margin-top: 50rpx;
		width: 650rpx;
		background: #FFFFFF;
		border-radius: 10rpx;
		padding: 20rpx;
		color: #666666;
		padding-bottom: 50rpx;
		box-shadow: 2rpx 2rpx 12rpx #d9d9d9;
		font-size: 15px;
	}

	.itemBox {
		height: 80rpx;
		border-bottom: 1px solid #CCCCCC;
	}

	.ipt {
		width: 400rpx;
		text-align: right;
		font-size: 15px;
	}

	.rigth {
		right: 20rpx;
		color: #F07535;
	}

	.reimg {
		width: 18rpx;
		height: 25rpx;
	}

	.uni-input-placeholder {
		font-size: 14px;
		color: #999999;
	}

	.end {
		margin-top: 50rpx;
		width: 358rpx;
		height: 75rpx;
		border-radius: 50rpx;
		background: linear-gradient(to right, #F5000A, #FF954F);
		color: #FFFFFF;
	}

	.enimg {
		width: 358rpx;
		height: 68rpx;
	}

	.save {
		margin-top: 50rpx;
		width: 358rpx;
		height: 75rpx;
		border-radius: 50rpx;
		color: #FFFFFF;
		background: linear-gradient(to right, #F5000A, #FF954F);
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
</style>
