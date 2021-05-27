<template>
	<view>
		<subunit></subunit>
		<view class="navBox" :style="{height:  this.$store.state.customBar + 'rpx'}">
			<view class="ipt  ju-center flex al-center pos-abs">
				<image class="img pos-abs" src="https://oss.kuaitongkeji.com/static/img/app/home/ss.png" mode="">
				</image>
				<input class="input" @input="Onchange" type="text" v-model="value" @confirm="change"
					placeholder="请输入小区名称关键词" />
				<view @click="remove" class="rig m-l2">
					取消
				</view>
			</view>
		</view>
		<view class="">
			<view v-if="dataList.length>0" class="listbox m-t3" ref='fied'>
				<view class="content pos-rel fz-16 m-t2" @click="Select(item,index)" v-for="(item,index) in dataList"
					:key='item.id'>
					<view class="addres">
						<view class="  name flex al-center  ju-between">
							{{item.name}}
							<view class="">
								<image class="reimg" src="../../../image/goIn.png" mode=""></image>
							</view>
						</view>
						<view class="line m-t2"></view>
						<view v-if="item.address" class="text">
							{{item.address}}
						</view>
					</view>

				</view>
			</view>
			<view v-else-if="dataList.length==0&&code == 200" class="noBox flex al-center ju-center fz-14 cl9">
				没有您搜索的小区
			</view>
			<view v-if="flag == false" class="flex-d al-center m-t2">
				<view class="record flex al-center ju-between">
					<view class="">
						搜索记录
					</view>
					<view @click="celnomore" class="fz-14">
						清空
					</view>
				</view>
				<view class="record m-t3 flex">
					<view class="itemtitle m-r3 m-b2" @click="celItem(item)" v-for=" item in historyList"
						:key="item.id">
						{{item}}
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import subunit from '../../../components/sub-unit/subunit.vue'
	import village from '../../../vendor/village/village.js'
	import cache from '../../../vendor/cache/cache.js'
	export default {
		name: "",
		components: {
			subunit
		},
		props: {},
		data() {
			return {
				code: 0,
				value: '',
				dataList: [],
				historyList: [],
				flag: false,
				forcome: ''
			}
		},
		methods: {
			// 搜索
			change() {
				if (!this.value) return;
				uni.showLoading({
					title: '搜索中'
				})
				village.searchVill({
					data: {
						kw: this.value,
					},
					fail: () => {
						uni.hideLoading()
						uni.showToast({
							title: '网络错误',
							icon: 'none'
						})
					},
					success: (res) => {
						//console.log(res.data.data);
						uni.hideLoading()
						if (res.statusCode != 200) return;

						if (res.data.code != 200) return;
						this.flag = true
						this.historyList.unshift(this.value)
						this.historyList = this.historyList.filter((item, index) => {
							return this.historyList.indexOf(item) == index
						})
						cache.set('seachHstry', this.historyList)
						this.code = res.data.code
						this.dataList = res.data.data
					}
				})
			},
			Onchange(e) {
				if (!e.detail.value) {
					this.dataList = [],
						this.code = 0,
						this.flag = false
				}
			},
			//进入表单页面
			Select(item) {
				if (this.forcome == 1) {
					uni.navigateTo({
						url: '/pages/residence/checkIn/checkIn?id=' + item.id
					})
				}
				if (this.forcome == 2) {
					uni.navigateTo({
						url: '/pages/visitapplication/visit/visit?id=' + item.id 
					})
				}

			},
			//清空
			celnomore() {
				uni.showModal({
					content: '是否清空所以搜索历史',
					success: (res) => {
						console.log(res);
						if (res.confirm) {
							cache.forget('seachHstry');
							this.historyList = []
						} else {
							// console.log(2);
						}
					}
				})

			},
			// 取消
			remove() {
				this.value = ''
				this.dataList = [],
					this.code = 0,
					this.flag = false
			},
			celItem(item) {
				this.value = item
				this.change()
			}
		},
		mounted() {
			if (!cache.get('seachHstry')) return;
			this.historyList = cache.get('seachHstry')
		},
		onLoad(val) {
			this.forcome = val.code
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
		width: 90%;
		position: fixed;
		top: 0;
		z-index: 99;
		right: 0;
	}

	.ipt {
		bottom: 20rpx;
		width: 100%;
		height: 60rpx;
	}

	.img {
		width: 33rpx;
		height: 34rpx;
		left: 90rpx;
	}

	.input {
		width: 394rpx;
		height: 54rpx;
		background: rgba(255, 255, 255, 0.3);
		border-radius: 27px;
		padding-left: 75rpx;
		font-size: 24rpx;
		font-family: Source Han Sans CN;
		font-weight: 400;
		color: #FFFFFF;
	}

	.uni-input-placeholder {
		color: #FFFFFF;
	}

	.rig {
		right: 49rpx;
		font-size: 30rpx;
		color: #FFFFFF;
	}

	.listbox {
		width: 690rpx;
		padding-left: 30rpx;
		padding-right: 30rpx;
	}

	.content {
		width: 600rpx;
		background: #FFFFFF;
		border-radius: 10rpx;
		margin-bottom: 30rpx;
		box-shadow: 2rpx 2rpx 12rpx #d9d9d9;
		padding-left: 60rpx;
		padding-right: 30rpx;
		padding-top: 30rpx;
		padding-bottom: 30rpx;
	}

	.name {
		height: 50rpx;
	}

	.zrimg {
		width: 24rpx;
		height: 24rpx;
	}

	.location {
		left: 20rpx;
		top: 30rpx;
	}

	.addres {
		width: 100%;
		color: #666666;
	}

	.reimg {
		width: 20rpx;
		height: 30rpx;
	}

	.line {
		width: 100%;
		height: 2rpx;
		background: #E6E6E6;
	}

	.text {
		width: 480rpx;
		padding: 40rpx 0;
	}

	.noBox {
		height: 200rpx;
	}

	.record {
		width: 690rpx;
		color: rgb(93, 93, 93);
		flex-wrap: wrap;
	}

	.itemtitle {
		background: rgb(246, 246, 246);
		padding: 12rpx 20rpx;
		font-size: 15px;
		border-radius: 10rpx;
	}
</style>
