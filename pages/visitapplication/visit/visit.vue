<template>
	<view class="">
		<subunit titel="拜访申请"></subunit>
		<view class="navBox" :style="{height:  this.$store.state.customBar + 'rpx'}">
			<view @click="gorecord" class="pos-abs  location">
				申请记录
			</view>
		</view>
		<view class="flex-d al-center">
			<view class=" message">
				<view class="text flex al-center">
					基本信息
				</view>
				<view class="">
					<view class="item flex al-center pos-rel" @click="itemlabel(index)" v-for="(item,index) in  record"
						:key='item.id' :class="{'dv':index===record.length-1}">
						<u-field v-model="item.value " :label="item.label" :placeholder="item.placeholder"
							:clearable=false :required='item.required' input-align='right' :disabled="item.disabled"
							label-width="170">
						</u-field>
						<view v-if="index===record.length-1" class="pos-abs righ">
							<image src="https://oss.kuaitongkeji.com/static/img/app/home/xiala.png" class="xiala"
								mode=""></image>
						</view>
					</view>
				</view>
				<u-select v-model="show" mode="mutil-column-auto" :default-value='value' :list="renderVillageLists"
					@confirm="confirm"></u-select>
			</view>
			<!-- 上传文件 -->
			<view class="uploadFiles">
				<view class="uploadTil flex al-center">
					上传图片
					<view v-if="textShow==true" class="fz-12 m-l1 c-red">
						(*您可以上传外卖或者快递的图片给用户)
					</view>
				</view>
				<view class="filesBox flex al-center">
					<view v-for="item in images" :key="item.id" class="">
						<image :src="item" class="itemImg" mode="aspectFill"></image>
					</view>
					<view @click="succ" class="puls flex-d al-center ju-center">
						<image src="https://oss.kuaitongkeji.com/static/img/app/home/push.png" class="pushimg" mode="">
						</image>
						添加
					</view>
				</view>
			</view>

			<!-- 备注 -->
			<view class="pos-rel reMessage">
				<view class="textTil flex al-center">
					申请备注
				</view>
				<view class="">
					<textarea class="tar" maxlength="1000" v-model="text"></textarea>
				</view>
			</view>
			<!-- 提交 -->
			<view class="pos-rel m-t4 bot flex al-center ju-center" @click="Submit">
				<image class="Submit" src="https://oss.kuaitongkeji.com/static/img/app/login/ccuc.png" mode=""></image>
				<view class="pos-abs subtext">
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
	import enclosure from '../../../components/checkIn/enclosure/enclosure.vue'
	import remarks from '../../../components/checkIn/remarks/remarks.vue'
	import village from '../../../vendor/village/village.js'
	import home from '../../../vendor/home/home.js'
	import cache from '../../../vendor/cache/cache.js'
	import user from '../../../vendor/user/userDetails.js'
	import jwt from '../../../vendor/auth/jwt.js'
	import route from '../../../vendor/request/routes.js'
	export default {
		name: "",
		components: {
			subunit,
			enclosure,
			remarks,
		},
		props: {},
		data() {
			return {
				Villid: '', //小区id
				record: [{
						label: '拜访人姓名',
						value: '',
						required: true,
						disabled: true
					},
					{
						label: '拜访人手机号',
						value: '',
						required: true,
						disabled: true
					},
					{
						label: '拜访人身份证',
						value: '',
						required: true,
						disabled: true
					},
					{
						label: '被访问人姓名',
						value: '',
						required: true,
						placeholder: '请输入被访问人姓名'
					},
					{
						label: '地址',
						value: '',
						disabled: true,
						placeholder: '请选择地址',
						required: true,
					},
				],
				//服务端返回的原始数据
				orgVillageLists: [],

				renderVillageLists: [],

				// 选择小区id
				id: [],
				show: false,
				value: [], //小区列表默认选择的对象
				images: [], //要上传的文件
				text: '', //默认备注
				isLoding: false,
				textShow: false
			}
		},
		methods: {
			// 显示选择小区列表
			itemlabel(index) {
				if (index == this.record.length - 1) {
					this.show = true
				}
			},
			// 选择小区
			confirm(val) {
				// 获取的文本
				let text = ''
				let id = []
				let value = []
				val.map(items => {
					id.push(items.extra)
					if (items.value != null) {
						text += items.label
					}
					if (items.value == null) {
						items.value == 0
					}
					value.push(items.value)
				})
				this.record[4].value = text
				this.id = id
				this.value = value
			},

			// 上传文件
			succ() {
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
			},
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
							that.images.push(jres.data.url) 
							// console.log(jres.data.url);

							res(jres);
						}
					})
				})
			},

			// 提交
			Submit() {
				if (this.record[3].value == '') {
					uni.showToast({
						title: '请输入被拜访人姓名',
						icon: 'none'
					})
					return;
				}
				if (this.id.length == 0) {
					uni.showToast({
						title: '请选择地址',
						icon: 'none'
					})
					return;
				}
				if (this.isLoding == true) return;
				uni.showLoading({
					title: '提交中...'
				})
				home.VisitApplication({
					data: {
						host_name: this.record[3].value,
						village_id: this.Villid,
						building_id: this.id[0],
						apartment_id: this.id[1],
						floor_id: this.id[2],
						room_id: this.id[3],
						visitor_remark: this.text,
						pics: this.images
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
							duration: 2000
						});

						const time = setTimeout(() => {
							uni.redirectTo({
								url: '/pages/visitapplication/goRecord/goRecord'
							})
							clearTimeout(time)
						}, 2000)
						// console.log(res);
					},

				})
			},
			// 申请记录
			gorecord() {
				uni.navigateTo({
					url: '/pages/visitapplication/goRecord/goRecord'
				})
			},

			villDils() {
				village.displayInformation({
					data: {
						id: this.Villid,
						need_buildings: '1'
					},
					fail: (err) => {
						uni.showToast({
							title: '网络错误',
							icon: 'none'
						})
					},
					success: (res) => {
						this.isLoding = false
						if (res.statusCode != 200) return
						if (res.data.code != 200) return
						// console.log('小区展示', res);
						let data = res.data.data.buildings
						this.orgVillageLists = data;
						this.renderMSelect();
					}
				})
			},

			//使用返回的数据进行渲染select
			renderMSelect() {
				//renderVillageLists
				if (!this.orgVillageLists || this.orgVillageLists.length == 0) {
					this.renderVillageLists = [];
					return;
				}

				//进行修改
				let tmp = [];
				this.orgVillageLists.forEach((item, index) => {
					//楼栋
					let villages = {
						label: item.name,
						value: index,
						extra: item.id,
						children: [],
					};

					if (!item.apartments) return true;
					//单元
					item.apartments.forEach((item2, idx2) => {
						let apartments = {
							label: item2.name,
							value: idx2,
							extra: item2.id,
							children: [],
						};
						// console.log('buildings', item2, !item2.apartments)
						if (!item2.floors) return true;
						//楼层
						item2.floors.forEach((item5, idx3) => {

							//楼层
							let floors = {
								label: item5.name,
								value: idx3,
								extra: item5.id,
								children: [],
							};

							if (!item5.rooms) return true;

							item5.rooms.forEach((item4, idx4) => {
								floors.children.push({
									label: item4.name,
									value: idx4,
									extra: item4.id,
								});
							})

							apartments.children.push(floors);


						})
						villages.children.push(apartments);

					})

					tmp.push(villages);
				})

				this.renderVillageLists = tmp;
				// console.log(tmp);
			},

			// 获取用户资料
			// 判断是否登录
			loadUserData() {

				jwt.doOnlyTokenValid({
					showModal: true,
					keepSuccess: false,
					success: () => {
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
								this.record[0].value = Users.username
								this.record[1].value = Users.tel.slice(0, 3) + '****' + Users.tel
									.slice(7, 11)
								if (!Users.id_card_no) {
									uni.showModal({
										content: '请完善您的身份信息',
										success: function(res) {
											if (res.confirm) {
												uni.navigateTo({
													url: '/pages/user/realInformation/realInformation'
												})
											} else if (res.cancel) {
												uni.navigateBack({
													delta: 1
												})
											}
										}
									})
									return;
								}
								this.record[2].value = Users.id_card_no.slice(0, 3) +
									'**********' + Users.id_card_no.slice(Users.id_card_no
										.length - 4, Users.id_card_no.length)
							},
						})
					},
					fail: () => {
						uni.hideLoading()
						uni.switchTab({
							url: '/pages/index/index'
						})
					}
				})
			},
		},
		mounted() {
			this.villDils()
		},
		onShow() {
        this.loadUserData()

		},
		onLoad(option) {
			if (option.text) {
				this.text = option.text
				this.textShow = true
			}
			if (option.id) {
				this.Villid = option.id
			}
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
	.navBox {
		width: 30%;
		top: 0;
		right: 0;
		position: fixed;
		z-index: 99;
	}

	.message {
		margin-top: 30rpx;
		width: 644rpx;
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
	}

	.item {
		height: 69rpx;
		font-size: 24rpx;
		color: #666666;
		border-bottom: 1rpx solid #BFBFBF;

		/deep/ .u-field {
			padding-left: 20rpx;
		}

		/deep/ .uni-input-input {
			width: 400rpx;
			font-size: 24rpx;
		}
	}

	.dv {
		margin-bottom: 43rpx;
	}

	.righ {
		right: 0;
	}

	.xiala {
		width: 16rpx;
		height: 12rpx;
	}

	.Submit {
		width: 358rpx;
		height: 68rpx;
	}

	.subtext {
		font-size: 30rpx;
		color: #FFFFFF;
	}

	.posp {
		position: fixed;
	}

	.bot {
		margin-bottom: 80rpx;
	}

	.top {
		margin-top: 20rpx;
	}

	.reMessage {
		margin-top: 22rpx;
		width: 644rpx;
		padding-bottom: 20rpx;
		background: #FFFFFF;
		border-radius: 10rpx;
		box-shadow: 2rpx 2rpx 12rpx #d9d9d9;
		padding-left: 20rpx;
		padding-right: 26rpx;
	}

	.textTil {
		height: 69rpx;
		font-size: 30rpx;
		color: #666666;
		border-bottom: 1rpx solid #BFBFBF;
	}

	.tar {
		margin-top: 20rpx;
		padding: 10rpx;
		padding-bottom: 0;
		width: 623rpx;
		height: 130rpx;
		resize: none;
		overflow: auto;
		font-size: 24rpx;
		color: #666666;
	}

	.location {
		font-size: 15px;
		color: #FFFFFF;
		right: 50rpx;
		bottom: 20rpx;
	}

	.fiexd {
		position: fixed;
		z-index: 99;
	}


	/deep/ .u-select__body__picker-view__item[data-v-a577ac80] {
		font-size: 24rpx !important;
		text-align: center !important;
	}



	.uploadFiles {
		margin-top: 40rpx;
		width: 650rpx;
		padding: 0 20rpx;
		background: #FFFFFF;
		border-radius: 10rpx;
		box-shadow: 2rpx 2rpx 12rpx #d9d9d9;
		color: #666666;
	}

	.uploadTil {
		height: 68rpx;
		font-size: 15px;
		border-bottom: 2rpx solid #CCCCCC;
	}

	.filesBox {
		margin-top: 20rpx;
		width: 100%;
		flex-wrap: wrap;
		margin-bottom: 30rpx;
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

	.itemImg {
		width: 140rpx;
		height: 160rpx;
		margin-right: 20rpx;
		margin-bottom: 10rpx;
		border-radius: 10rpx;
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
