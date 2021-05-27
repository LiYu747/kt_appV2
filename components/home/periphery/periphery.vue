<template>
	<div>
		<view class="boxss">
			<view class="flex al-center  pos-rel">
				<view class="text">
					周边消息
				</view>
				<view v-if="locdata.length>0" @click="lookmore" class="andMore pos-abs">
					查看更多
				</view>
			</view>
			<view v-if="locdata.length>0" class="">
				<view class="itemBox m-t1" @click="godils(item)" v-for="item in locdata" :key="item.id">
					<view class="flex">
						<view class="">
							<view class="itemTil m-t2">
								{{item.title}}
							</view>
						</view>
						<image v-if="item.cover" :src="item.cover" class="itemImg" mode=""></image>
						<image v-else src="https://oss.kuaitongkeji.com/upload/2020/12/15/AY0xTVMZBzNuJ0acHphXphi4gewrdyJeuBoypUCH.jpeg"
						 class="itemImg" mode=""></image>
					</view>
					<view class="fz-12 timeBox flex ju-between m-t2">
						{{item.created_at}}
						<view class="">
							{{item.pv}}人浏览
						</view>
					</view>
				</view>
			</view>
			
			<view v-else class="fz-12 nonews">
					<view class="m-l1">
						还没有任何周边资讯哦~
					</view>
			</view>
		</view>
	</div>
</template>

<script>
	import home from '../../../vendor/home/home.js'

	export default {
		name: "",
		components: {

		},
		props: {},
		data() {
			return {
				locdata: [] //数据
			}
		},
		methods: {
			// 去详情页面
			godils(item) {
				home.surroundingDetails({
					data: {
						id: item.id
					},
					fail: (err) => {
						uni.showToast({
							title: '网络错误',
							icon: 'none'
						})
					},
					success: (res) => {
						if (res.statusCode != 200) return
						if (res.data.code != 200) return
						// console.log(res.data.data);
						let content = {
							title: res.data.data.title,
							content: res.data.data.content
						}
						this.$store.commit("homeContent", content);
						uni.navigateTo({
							url: '/pages/InformationDetails/InformationDetails/InformationDetails'
						})
						this.newsRead(res.data.data.id)
					}
				})
			},
			//查看更多
			lookmore() {
				uni.navigateTo({
					url: "/pages/index/peripheryMore/peripheryMore"
				})
			},
			//阅读统计
			newsRead(id){
				home.newsRead({
					data:{id:id},
					fail: () => {
						uni.showToast({
							title: '网络错误',
							icon: 'none'
						})
					},
					success: (res) => {
						if (res.statusCode != 200) return
						if (res.data.code != 200) return
						// console.log(res.data.data.data);
					},
				})
			},
			// 数据
			getData() {
				home.news({
					data: {
						page: 1,
						pageSize: 2
					},
					fail: () => {
						uni.showToast({
							title: '网络错误',
							icon: 'none'
						})
					},
					success: (res) => {
						if (res.statusCode != 200) return
						if (res.data.code != 200) return
						// console.log(res.data.data.data);
						let data = res.data.data.data
						data.map(item => {
							item.created_at = item.created_at.slice(0, 10)
						})
						this.locdata = data
					},
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
	.boxss {
		margin-top: 40rpx;
		width: 690rpx;
		margin-bottom: 40rpx;
	}

	.text {
		margin-left: 20rpx;
		font-size: 20px;
		color: #666666;
		font-weight: 700;
	}


	.andMore {
		right: 20rpx;
		font-size: 24rpx;
		color: rgb(247, 157, 70);
	}

	.itemBox {
		width: 650rpx;
		padding: 20rpx;
		border-bottom: 1px solid #E6E6E6;
	}

	.itemImg {
		width: 200rpx;
		height: 150rpx;
		margin-left: 40rpx;
	}

	.itemTil {
		width: 410rpx;
		color: #666666;
		font-size: 14px;
		// 超出部分隐藏
		display: -webkit-box;
		overflow: hidden;
		/*超出部分隐藏*/
		text-overflow: ellipsis;
		/* 超出部分显示省略号 */
		white-space: normal;
		/*规定段落中的文本不进行换行 */
		word-wrap: break-word;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}

	.timeBox {
		color: #808080;
	}
	
	.nonews{
		padding: 20rpx;
		font-size: 12px;
		color: #999999;
	}
</style>
