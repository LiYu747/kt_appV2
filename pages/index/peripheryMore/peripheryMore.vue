<template>
	<view class="">
		<submit titel="更多新闻"></submit>
		<view v-if="locdata.length>0" class="conBox m-t2">
			<view class="itemBox" @click="godils(item)" v-for="item in locdata" :key="item.id">
				<view v-if="flag == 0" class="flex">
					<image :src="item.cover" class="itemImg" mode=""></image>
					<view class="content m-l2 pos-rel">
						<view class="conTex  m-t2">
							{{item.title}}
						</view>
						<view class="timeBox fz-12 pos-abs flex ju-between">
							{{item.created_at}}
							<view class="">
								{{item.pv}}人浏览
							</view>
						</view>
					</view>
				</view>
				<view v-if="flag == 1" class="">
					<view class="conTex fz-14">
						{{item.title}}
					</view>
					<view class="flex m-t4">
						<image :src="item.faceimg" class="itemImg" mode=""></image>
						<image :src="item.faceimg" class="itemImg m-l2" mode=""></image>
						<image :src="item.faceimg" class="itemImg m-l2" mode=""></image>
					</view>
					<view class="flex timeBox fz-12 flex ju-between m-t3">
						{{item.created_at}}
						<view class="">
							512486人浏览
						</view>
					</view>
				</view>
			</view>
			<view v-show="isLoding == true" class=" fz-12 flex ju-center al-center lodbox">
				<image class="lodimg" src="https://oss.kuaitongkeji.com/static/img/app/address/loading.gif" mode="">
				</image>
				加载中...
			</view>
			<view class="flex ju-center lodbox  fz-12" v-if="hasMore == false">
				{{text}}
			</view>
		</view>
		<view v-show="isLoding == true&&locdata.length == 0" class="showloding flex al-center ju-center">
			<view class="loding flex-d al-center ju-center">
				<view class=" ">
					<image class="loimg" src="https://oss.kuaitongkeji.com/static/img/app/address/loading.gif" mode="">
					</image>
				</view>
				搜索中
			</view>
		</view>
	</view>
</template>

<script>
	import submit from '../../../components/sub-unit/subunit.vue'
	import home from '../../../vendor/home/home.js'
	export default {
		name: "",
		components: {
			submit
		},
		props: {},
		data() {
			return {
				locdata: [],
				page: 1,
				pageSize: 15,
				flag: 0,
				isLoding: false,
				hasMore: true,
				text: '',
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
					}
				})
			},
			// 数据
			getData() {
				if (this.isLoding == true || this.hasMore == false) return;
				this.isLoding = true
				home.news({
					data: {
						page: this.page,
						pageSize: this.pageSize
					},
					fail: () => {
						uni.showToast({
							title: '网络错误',
							icon: 'none'
						})
						this.isLoding = false
					},
					success: (res) => {
						this.isLoding = false
						if (res.statusCode != 200) return
						if (res.data.code != 200) return
						// console.log(res.data.data.data);
						let data = res.data.data
						this.page = data.current_page + 1
						this.hasMore = data.next_page_url ? true : false;
						data.data.map(item => {
							item.created_at = item.created_at.slice(0, 10)
						})

						this.locdata = this.locdata.concat(data.data)
					},
				})
			}
		},
		mounted() {
			this.getData()
		},
		onLoad() {

		},
		onReachBottom() {
			this.getData()
			this.text = "到底啦!"
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
	page {
		background: #fff;
	}

	.conBox {
		width: 690rpx;
		padding: 0 30rpx;
	}

	.itemBox {
		padding: 40rpx 20rpx;
		border-bottom: 1px solid #E6E6E6;
	}

	.itemImg {
		width: 200rpx;
		height: 150rpx;
		border-radius: 10rpx;
	}

	.content {
		width: 420rpx;
		height: 150rpx;
		font-size: 14px;
	}

	.conTex {
		color: #333333;
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
		width: 100%;
		bottom: 0;
		color: #666666;
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

	.lodimg {
		width: 30rpx;
		height: 30rpx;
		margin-right: 20rpx;
	}

	.lodbox {
		padding: 30rpx 0;
	}
</style>
