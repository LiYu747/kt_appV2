<template>
	<view>
		<subunit titel='详情'></subunit>
		<view v-if="code == 200" class="contentBox">
			<view class="state flex al-center">
				<image src="https://oss.kuaitongkeji.com/static/img/app/visit/gnt.png" class="stateimg" mode=""></image>
				<view class="m-l2">
					{{state}}
				</view>
			</view>
			<view class="">
				<view class="itemBox flex al-center ju-between" v-for=" item in locdata" :key='item.id'>
					<view class="">
						{{item.label}}
					</view>
					<view class="">
						{{item.value}}
					</view>
				</view>
			</view>
			<view class="line"></view>
			<view v-if="files.length>0" class="accessoryBox">
				<view class="remarkTil">
					附件
				</view>
				<view class="accessoryCtn flex">
					<view class="" @click="look(index)" v-for="(item,index) in files" :key="item.id">
						<image :src="item" class="itemUrl" :class="(index + 1) % 4 == 0?'m-r0':''" mode="aspectFill"></image>
					</view>
				</view>
			</view>
			<view class="remarkBox">
				<view class="remarkTil">
					备注
				</view>
				<textarea class="remarkCen" disabled='true' v-model="remark">
				</textarea>
				<view class="remarkTil">
					选择有效日期
				</view>
				<view class="timeBox m-t3 fz-14">
					<view class="showBox">
						<view class=" flex al-center ju-between">
							住户有效日期:
							<view class="">
								<u-radio-group active-color="#F07535" v-model="value" @change="radioGroupChange">
									<u-radio v-for="(item, index) in list" :key="index" :name="item.name"
										:disabled="item.disabled">
										{{item.name}}
									</u-radio>
								</u-radio-group>
							</view>
						</view>
						<view v-show="timeCode == 1" class=" fz-14">
							<view @click="cleStantime" class="m-t2 flex al-center ju-between">
								开始时间：
								<view class="flex al-center m-r3">
									<input disabled="true" type="text" :value="valid_begin" class="ipt"
										placeholder="请选择开始时间" />
									<image src="https://oss.kuaitongkeji.com/static/img/app/home/xiala.png"
										class="xiala" mode=""></image>
								</view>
							</view>
							<view @click="cleEndtime" class="m-t2 flex al-center ju-between">
								截止时间：
								<view class="flex al-center m-r3">
									<input disabled="true" type="text" :value="valid_end" class="ipt"
										placeholder="请选择结束时间" />
									<image src="https://oss.kuaitongkeji.com/static/img/app/home/xiala.png"
										class="xiala" mode=""></image>
								</view>
							</view>
						</view>
					</view>
				</view>
				<view class="remarkTil">
					申请结果
				</view>
				<textarea class="remarkCen" placeholder="您可以在这里填写您不同意的原因哦" v-model="result">
				</textarea>
			</view>

			<u-picker @confirm="ok" mode="time" v-model="timeshow" :default-time='defaultTime' :params="params">
			</u-picker>

			<!-- 按钮 -->
			<view v-if="stateCode == 1" class="flex al-center ju-around m-t4">
				<view @click="pass" class="btnr flex al-center ju-center">
					<image src="https://oss.kuaitongkeji.com/static/img/app/login/ccuc.png" class="btnimg" mode="">
					</image>
					<view class=" pos-abs">
						通过
					</view>
				</view>
				<view @click="nopass" class="btnl flex al-center ju-center">
					不通过
				</view>
			</view>
		</view>
		<view class="btmLine">

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
				code: 0,
				id: '',
				state: '', //处理状态
				stateCode: '', //处理状态码
				remark: '', //备注
				result: '', //结果
				files: [], //附件
				verify_status: '', //选择结果
				locdata: [{
						label: '姓名',
						value: ''
					},
					{
						label: '电话',
						value: ''
					},
					{
						label: '身份证号',
						value: ''
					},
					{
						label: '地址',
						value: ''
					},
					{
						label: '时间',
						value: ''
					}
				],
				list: [
					{
						name: '永久',
						disabled: false
					},
					{
						name: '临时',
						disabled: false
					}
				],
				value: "永久",
				timeCode: 0,
				params: {
					year: true,
					month: true,
					day: true,
					hour: true,
					minute: true,
					second: true
				},
				timeshow: false,
				isStarend: 0, //判断是选择开始还是结束，开始是0，结束是1.
				defaultTime: '',
				valid_begin: '',
				valid_end: ''
			}
		},
		methods: {

			//开始时间选择
			cleStantime() {
				this.isStarend = 0
				this.timeshow = true
			},

			//结束时间选择
			cleEndtime() {
				if (this.valid_begin == '') {
					uni.showToast({
						title: '请先选择开始时间',
						icon: "none",
					})
					return;
				}
				this.isStarend = 1
				this.timeshow = true
			},

			// 时间确定选择
			ok(val) {
				let time = val.year + '-' + val.month + '-' + val.day + ' ' + val.hour + ':' + val.minute + ":" + val
					.second
				if (this.isStarend == 0) {
					this.valid_begin = time
					this.defaultTime = time
					return;
				}
				if (this.isStarend == 1) {
					let tampLogin = new Date(time.replace(/-/g,'/')).getTime() - new Date(this.valid_begin.replace(/-/g,'/')).getTime();
					if (tampLogin > 0) {
						this.valid_end = time
						this.defaultTime = time
					} else {
						uni.showToast({
							title: '必须大于起始时间',
							icon: "none"
						})
					}
				}
			},

			//选择永久还是临时
			radioGroupChange(val) {
				this.timeCode = val == "临时" ? 1 : 0
			},

			// 获取数据
			getData() {
				uni.showLoading({
					title: '加载中'
				})
				home.checkinDetails({
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
						this.code = res.data.code
						let data = res.data.data
						this.stateCode = data.verify_status
						switch (data.verify_status) {
							case 1:
								this.state = '待审核'
								break;
							case 2:
								this.state = '已通过'
								break;
							case 3:
								this.state = '未通过'
								break;
						}
						this.remark = data.user_remark
						this.files = data.pics ?data.pics :[]
						this.locdata[0].value = data.username
						this.locdata[1].value = data.tel.slice(0, 3) + '****' + data.tel.slice(7, 11)
						this.locdata[2].value = data.id_card_no.slice(0, 3) + '***********' + data.id_card_no
							.slice(14, 18)
						this.locdata[3].value = data.own_village.name + data.own_building.name + data
							.own_apartment.name + data.own_floor
							.name + data.own_room.name
						this.locdata[4].value = data.created_at.slice(0, 16)
						this.result = data.verify_msg
					}
				})
			},

			auditreq(text) {
				uni.showLoading({
					title: '加载中'
				})
				if(!this.result){
					this.result = text
				}
				home.auditRecord({
					data: {
						id: this.id,
						verify_status: this.verify_status,
						verify_msg: this.result,
						valid_type:this.timeCode,
						valid_begin:this.valid_begin,
						valid_end:this.valid_end
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
								icon: 'none'
							})
							return;
						}
						uni.showToast({
							title: res.data.msg
						})
						this.$store.commit('checkIspass', text)
						const time = setTimeout(() => {
							this.getData()
							clearTimeout(time)
						}, 1500)
					}
				})
			},
			// 通过
			pass() {
				if(this.timeCode == 1){
					if(!this.valid_begin){
						uni.showToast({
							title:"请选择开始时间",
							icon:"none"
						})
						return;
					}
					if(!this.valid_end){
						uni.showToast({
							title:"请选择结束时间",
							icon:"none"
						})
						return;
					}
				}
				this.verify_status = '2'
				this.auditreq('已通过')
			},
			//不通过
			nopass() {
				if (!this.result) {
					uni.showToast({
						title: "请填写不同意的原因告诉用户",
						icon: "none"
					})
					return;
				}
				this.verify_status = '3'
				this.auditreq('未通过')
			},
			// 查看图片
			look(index) {
				// 预览图片
				uni.previewImage({
					urls:this.files, 
					current: index,
					indicator:"default",
				});
			
			},
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
	.color {
		color: #606266;
	}

	.xiala {
		width: 24rpx;
		height: 16rpx;
		margin-left: 10rpx;
	}

	.uni-input-placeholder {
		font-size: 14px;
		color: #A5A5A5;
	}

	.ipt {
		text-align: right;
		font-size: 14px;
		width: 400rpx;
	}

	.feidx {
		position: fixed;
		z-index: 9;
	}

	.topLine {
		height: 148rpx;
	}

	.contentBox {
		padding: 0 20rpx;
	}

	.state {
		width: 100%;
		height: 120rpx;
		border-bottom: 1px solid #CCCCCC;
		font-size: 15px;
		color: #F07535;
	}

	.stateimg {
		width: 40rpx;
		height: 40rpx;
	}

	.itemBox {
		margin-top: 25rpx;
		font-size: 15px;
		color: rgb(165, 165, 165);
	}

	.line {
		margin-top: 40rpx;
		width: 100%;
		height: 1px;
		background: #CCCCCC;
	}

	.remarkTil {
		margin: 30rpx 0;
		font-size: 15px;
		color: rgb(165, 165, 165);
	}

	.remarkCen {
		width: 650rpx;
		padding: 30rpx;
		height: 100rpx;
		background: #FFFFFF;
		border-radius: 10rpx;
		font-size: 12px;
		color: rgb(165, 165, 165);
		box-shadow: 2rpx 2rpx 12rpx #d9d9d9;
	}

	.textarea-placeholder {
		color: #999999;
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

	.accessoryCtn {
		width: 650rpx;
		padding: 20rpx 30rpx;
		background: #FFFFFF;
		border-radius: 10rpx;
		flex-wrap: wrap;
		box-shadow: 2rpx 2rpx 12rpx #d9d9d9;
	}

	.itemUrl {
		margin-right: 30rpx;
		margin-bottom: 10rpx;
		width: 140rpx;
		height: 160rpx;
		border-radius: 10rpx;
	}

	.btmLine {
		height: 60rpx;
	}

	.blckpdImg {
		width: 24rpx;
		height: 20rpx;
	}

	.sure {
		width: 300rpx;
		height: 60rpx;
		border-radius: 30rpx;
		background: linear-gradient(to right, #F5000A, #FF954F);
	}

	.timeBox {
		width: 650rpx;
		padding: 30rpx;
		box-shadow: 2rpx 2rpx 12rpx #d9d9d9;
		border-radius: 10rpx;
		color: #A5A5A5;
	}
	/deep/
	.u-radio__label[data-v-da6758f0]{
		color: #A5A5A5;
		font-size: 14px;
	}
</style>
