<template>
	<view>
		<subunit titel='我的信息'></subunit>
		<view v-if="code == 200" class="contentBox">
			<view class="infoBox">
				<view class="itemBox flex al-center ju-between" v-for="item in locdata" :key='item.id'>
					<view class="itemLb">
						{{item.label}}
					</view>
					<view class="">
						{{item.value}}
					</view>
				</view>
			</view>

			<view class="accessoryBox">
				<view class="accessoryTxt">
					附件
				</view>
				<view class="filesBox">
					<view class="" v-for="item in files" :key='item.id'>
						<image :src="item" class="itemImg" mode="aspectFill"></image>
					</view>
				</view>
			</view>
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
				code:0,
				files: [],
				locdata: [{
						label: '申请平台',
						value: ''
					},
					{
						label: '申请编号',
						value: ''
					},
					{
						label: '申请时间',
						value: ''
					},
				]
			}
		},
		methods: {

			getData() {
				uni.showLoading({
					title: '加载中'
				})
				home.lookMymsg({
					data: {},
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
						if (res.data.code == 5403) {
							uni.showModal({
								content: res.data.msg,
								success: (res) => {
									uni.navigateBack({
										delta: 1
									})
								}
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
						let data = res.data.data
						this.locdata[0].value = data.platform
						this.locdata[1].value = data.job_number
						this.locdata[2].value = data.created_at.slice(0, 16)
						this.files = data.files
					}
				})
			}

		},
		mounted() {
			this.getData()
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
	.contentBox {
		padding: 40rpx;
	}

	.infoBox {
		width: 94%;
		padding: 20rpx 3%;
		background: #FFFFFF;
		border-radius: 10rpx;
		box-shadow: 2rpx 2rpx 12rpx #d9d9d9;
		font-size: 15px;
		color: #666666;
		padding-bottom: 50rpx;
	}

	.itemBox {
		height: 80rpx;
		border-bottom: 1px solid #CCCCCC;
	}

	.accessoryBox {
		margin-top: 50rpx;
		width: 94%;
		padding: 0rpx 3%;
		background: #FFFFFF;
		padding-bottom: 30rpx;
		border-radius: 10rpx;
		box-shadow: 2rpx 2rpx 12rpx #d9d9d9;
	}

	.accessoryTxt {
		display: flex;
		align-items: center;
		height: 70rpx;
		color: #666666;
		border-bottom: 1px solid #CCCCCC;
	}

	.filesBox {
		margin-top: 20rpx;
		flex-wrap: wrap;
	}

	.itemImg {
		width: 140rpx;
		height: 160rpx;
		border-radius: 10rpx;
		margin-right: 20rpx;
		margin-bottom: 10rpx;
	}
</style>
