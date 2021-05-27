<template>
	<div>
		<view class="box">
			<view class="text">
				社区资讯
			</view>
			<view v-if="loctext.length>0" class="cententBox flex al-center">
					<view class=" pos-rel flex cenItem al-center"  v-for=" item in loctext" :key="item.id">
						<view class="conTxt">
							{{item.title}}
						</view>
						<view @click="lookup(item)" class="readBtn pos-abs flex al-center ju-center">
							阅读＞
						</view>
					</view>
			
			</view>
			<view  v-else class=" fz-12 nodata">
				暂无社区资讯...
			</view>
 		</view>
		<view class="line">
			
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
				loctext: [] //数据
			}
		},
		methods: {
			// 查看详情
			lookup(item) {
				home.infordils({
					data: {
						id: item.id
					},
					fail: () => {
						uni.showToast({
							title: '网络错误',
							icon: 'none'
						})
					},
					success: (res) => {
						// console.log(res.data.data);
						if (res.statusCode != 200) return
						if (res.data.code != 200) return
						let content = {
							title: res.data.data.title,
							content: res.data.data.content
						}
						this.$store.commit("homeContent", content);
						uni.navigateTo({
							url: `/pages/InformationDetails/InformationDetails/InformationDetails`
						})
					}
				})
			},
			// 数据
			Data() {
				home.infortion({
					data: {
						page: 1,
						pageSize: 1
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
						this.loctext = res.data.data.data
					},
				})
			}
		},
		mounted() {
			this.Data()
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
	.box {
		margin-top: 40rpx;
		width: 650rpx;
		padding: 0 20rpx;
	}

	.imgss {
		width: 28rpx;
		height: 35rpx;
		margin-right: 10rpx;
	}

	.text {
		font-size: 20px;
		color: #666666;
		font-weight: 700;
	}
	
	.cententBox{
		margin-top: 40rpx;
		width: 100%;
	}
	
	.readBtn{
		width: 85rpx;
		height: 35rpx;
		border:1px solid #999999 ;
		border-radius: 20rpx;
		right:  0;
		font-size: 10px;
		color:#999999;
	}
	
	.cenItem{
		width: 100%;
	}
	
	.conTxt{
		width: 500rpx;
		font-size: 14px;
		color: #666666;
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
	
	.line{
		margin-top: 70rpx;
		width: 100%;
		height: 1px;
		background: #BFBFBF;
	}
	
	.nodata{
		padding: 20rpx 10rpx;
		color: #999999;
	}
</style>
