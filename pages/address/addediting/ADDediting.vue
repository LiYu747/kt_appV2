<template>
	<view class="">
		<subunit titel="地址详情"> </subunit>
		<view v-if="code == 200" class="flex-d al-center">
			<view class="content">
				<view class="postop">
					<view class=" fied flex  pos-rel al-center" v-for="(item,index) in parameter" :key='item.id'
						:class="{'dv':index===parameter.length-1}">
						<view class="">
							{{item.label}}
						</view>
						<view class="m-l4">
							{{item.value}}
						</view>
						<view class="line  pos-abs">
						</view>
					</view>
				</view>
			</view>

			<view class="memberBox">
				<view class="memberTil flex al-center ju-between">
					成员
					<image v-if="Islimits==1" @click="pushMember"
						src="https://oss.kuaitongkeji.com/static/img/app/forum/pushtag.png" class="pushtagimg" mode="">
					</image>
				</view>
				<view v-if="Members.length>0" class="">
					<view class="itemBox" @click="memberInfo(item)" :class="{'itemBtm':index==Members.length-1}"
						v-for="(item,index) in Members" :key='item.id'>
						<view class="flex ju-between">
							姓名
							<view v-if='item.own_user' class="">
								{{item.own_user.username}}
							</view>
						</view>
						<view class="flex m-t1 ju-between">
							手机号码
							<view v-if='item.own_user' class="">
								{{item.own_user.tel}}
							</view>
						</view>
						<view class="flex m-t1 ju-between">
							入住身份
							<view class="">
								{{item.type}}
							</view>
						</view>
						<view v-if="item.valid_type == '永久'" class="flex m-t1 ju-between">
							有效时间
							<view class="">
								{{item.valid_type}}
							</view>
						</view>
						<view class="" v-else>
							<view class="flex m-t1 ju-between">
								开始有效时间
								<view class="">
									{{item.valid_begin}}
								</view>
							</view>
							<view class="flex m-t1 ju-between">
								截止有效时间
								<view class="">
									{{item.valid_end}}
								</view>
							</view>
						</view>
						<view v-if="Islimits==1"  @click="cleaDel(item,index)" class=" fz-12  m-t2 flex  delTxt">
							删除
						</view>
					</view>
				</view>
				<view v-if="Members.length == 0 &&isLoding==false" class="nomen flex ju-center">
					暂时还没有成员
				</view>
			</view>
			<view class="btmLine">

			</view>


			<view v-show="isLoding == true" class="showloding flex al-center ju-center">
				<view class="loding flex-d al-center ju-center">
					<view class=" ">
						<image class="loimg" src="https://oss.kuaitongkeji.com/static/img/app/address/loading.gif"
							mode=""></image>
					</view>
					加载中
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import subunit from '../../../components/sub-unit/subunit.vue'
	import address from '../../../vendor/address/address.js'
	import cache from '../../../vendor/cache/cache.js'
	import user from '../../../vendor/user/userDetails.js'
	export default {
		name: "",
		components: {
			subunit
		},
		props: {

		},
		data() {
			return {
				code: 0,
				parameter: [{
						value: '',
						label: '姓名',
						disabled: true
					},
					{
						value: '',
						label: '手机号码',
						disabled: true
					},
					{
						value: '',
						label: '入住身份',
						disabled: true
					},
					{
						value: '',
						label: '小区',
						disabled: true
					},
					{
						value: '',
						label: '楼栋号',
						disabled: true
					},
				],
				id: '',
				Members: [], //所有成员 
				Islimits: '',
				typeid: '', //用户类型
				isLoding: false
			}
		},
		methods: {

			//删除成员
			cleaDel(item, index) {
				uni.showModal({
					content: '您确定要删除该成员',
					success: (res) => {
						if (res.confirm) {
							address.deleteMember({
								data: {
									house_id: item.id
								},
								fail: () => {
									uni.showToast({
										title: "网络错误",
										icon: "none"
									})
								},
								success: (res) => {
									if (res.statusCode != 200) {
										uni.showToast({
											title: "网络出错了",
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
									this.Members.splice(index, 1)
									uni.showToast({
										title: res.data.msg,
										icon: "none"
									})
								}
							})
						}
					}
				})
			},
			// 添加成员
			pushMember() {
				uni.navigateTo({
					url: '/pages/address/addediting/pushMember/pushMember?addressid=' + this.id + '&typeid=' + this
						.typeid
				})
			},

			// 用户成员详情信息
			memberInfo(item) {
				return;
				uni.navigateTo({
					url: '/pages/address/addediting/memberInfo/memberInfo?id=' + item.id
				})
			},

			// 用户居住信息
			getData() {
				this.isLoding = true
				address.listdetails({
					data: {
						id: this.id,
						mates: 1
					},
					fail: () => {
						this.isLoding = false
						uni.showToast({
							title: '网络错误',
							icon: 'none'
						})
					},
					success: (res) => {
						this.isLoding = false
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
						this.code = res.data.code
						res.data.data.mates.map(item => {
							switch (item.type) {
								case 1:
									item.type = "户主"
									break;
								case 2:
									item.type = "家庭成员"
									break;
								case 3:
									item.type = "租户"
									break;
							}
							if (item.own_user) {
								item.own_user.tel = item.own_user.tel.slice(0, 4) + '****' + item
									.own_user.tel.slice(7, 11)
							}
							switch (item.valid_type) {
								case 0:
									item.valid_type = "永久"
									break;
							}
							if (item.valid_begin) {
								item.valid_begin = item.valid_begin.slice(0, 11)
							}
							if (item.valid_end) {
								item.valid_end = item.valid_end.slice(0, 11)
							}
						})
						this.Members = res.data.data.mates
						let data = res.data.data.house
						this.typeid = data.type
						if (data.type == 1) {
							this.parameter[2].value = '户主'
						}
						if (data.type == 2) {
							this.parameter[2].value = '家庭成员'
						}
						if (data.type == 3) {
							this.parameter[2].value = '租户'
						}
						this.Islimits = data.allow_edit_member
						this.parameter[3].value = data.own_village.name
						this.parameter[4].value = data.own_building.name + data.own_apartment.name + data
							.own_floor.name + data.own_room
							.name
					}
				})
			},

			// 获取用户资料
			Userdata() {
				user.userDeta({
					data: {},
					fail: (err) => {
						uni.showToast({
							title: '网络错误',
							icon: 'none'
						})
					},
					success: (res) => {
						if (res.statusCode != 200) return;
						if (res.data.code != 200) return;
						let Users = res.data.data
						this.parameter[0].value = Users.username
						this.parameter[1].value = Users.tel.slice(0, 4) + '****' + Users.tel.slice(7, 11)
					},
				})
			}
		},
		mounted() {
			this.Userdata()

		},
		onShow() {
			this.getData()
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
		z-index: 9;
	}

	.topLine {
		height: 148rpx;
	}


	.content {
		margin-top: 40rpx;
		width: 650rpx;
		padding: 10rpx 20rpx;
		border-radius: 10rpx;
		background: #FFFFFF;
		box-shadow: 2rpx 2rpx 12rpx #d9d9d9;
	}

	.fied {
		width: 100%;
		height: 80rpx;
		background: #FFFFFF;
		font-size: 30rpx;
		color: #666666;

		/deep/ .u-field {
			width: 100%;
			padding: 0;
		}
	}

	.line {
		width: 100%;
		height: 1px;
		background: rgba(191, 191, 191, 0.5);
		bottom: 0;
		z-index: 9;
	}

	.dv {
		margin-bottom: 40rpx;
	}

	.preimg {
		width: 358rpx;
		height: 68rpx;
	}


	.pretext {
		font-size: 30rpx;
		color: #FFFFFF;
	}

	.memberBox {
		margin-top: 40rpx;
		width: 650rpx;
		border-radius: 10rpx;
		padding: 20rpx;
		background: #FFFFFF;
		box-shadow: 2rpx 2rpx 12rpx #d9d9d9;
		font-size: 15px;
		color: #666666;
		padding-bottom: 30rpx;
	}

	.memberTil {
		height: 80rpx;
		border-bottom: 1px solid #CCCCCC;
	}

	.pushtagimg {
		width: 40rpx;
		height: 40rpx;
	}

	.itemBox {
		padding: 20rpx 0;
		border-bottom: 1px solid #CCCCCC;
		font-size: 14px;
	}

	.reimg {
		width: 40rpx;
		height: 40rpx;
		margin-right: 20rpx;
	}

	.itemBtm {
		border-bottom: none;
	}

	.Submit {
		width: 358rpx;
		height: 68rpx;
	}

	.subtext {
		font-size: 30rpx;
		color: #FFFFFF;
	}

	.bot {
		margin-bottom: 40rpx;
	}

	.nomen {
		margin-top: 30rpx;
		font-size: 14px;
		color: #999999;
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

	.delTxt {
		justify-content: flex-end;
		margin-right: 10rpx;
		color: red;
	}

	.btmLine {
		height: 50rpx;
	}
</style>
