<template>
	<view class="">
		<subunit titel=''></subunit>
		<view class="flex-d al-center">
			
			<view class="wraps">
				<view class="title flex pos-rel">
					<view class=" m-l2">
						分类
					</view>
					<view @click="redact" class="rigth pos-abs">
						编辑
					</view>
				</view>
				<view class="  wrap">
					<drag-sorts ref='drag' :list="getData" :props="props" @change="onDragSortChange"></drag-sorts>
				</view>
			</view>
		
		</view>
	</view>
</template>

<script>
	import subunit from '../../../../components/sub-unit/subunit.vue'
	import village from '../../../../vendor/village/village.js'
	import dragSorts from '@/components/drag-sorts/index.vue'
	export default {
		name: "",
		components: {
			subunit,
			dragSorts
		},
		props: {},
		data() {
			return {
				props: {
					label: 'name'
				},
				getData: [],
			}
		},
		methods: {

			getCustomLists() {
				village.customLists({
					data: {},
					fail: () => {
						uni.showToast({
							title: '网络出错',
							icon: 'none'
						})
					},
					success: (res) => {
						if (res.statusCode != 200) return;
						if (res.data.code !== 200) return;
						res.data.data.tribune_cat.map((item, index) => {
							let r = parseInt(Math.random() * 256)
							let g = parseInt(Math.random() * 256)
							let b = parseInt(Math.random() * 256)
							let bgColor = `rgba(${r},${g},${b},0.3)`
							item.background =  bgColor
						})
						// console.log(res.data.data.tribune_cat);
						this.getData = res.data.data.tribune_cat

					}
				})
			},
			onDragSortChange(val) {
				// console.log(val);
			},
		    redact(){
				this.$refs.drag.reveals()
			}
		},
		mounted() {
			this.getCustomLists()
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
	.wraps {
		margin-top: 50rpx;
		width: 690rpx;
		height: 400rpx;
		background: #FFFFFF;
		flex-wrap: wrap;
		font-size: 13px;
		border-radius: 20rpx;
		box-shadow: 2rpx 2rpx 12rpx #d9d9d9;
	}

	.title {
		font-size: 16px;
		margin-top: 30rpx;
		margin-bottom: 40rpx;
	}

	.rigth {
		right: 20rpx;
		color: #F07535;
		font-size: 14px;
	}

	.wrap {}

	.itemcenten {
		margin-top: 20rpx;
		margin-left: 20rpx;
		width: 148rpx;
		height: 70rpx;
		background: #F0F0F0;
		border-radius: 5rpx;
	}
</style>
