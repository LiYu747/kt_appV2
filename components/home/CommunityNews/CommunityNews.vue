<template>
	<view class="">
		<view class="box">
			<view class="text">
				小区新闻
			</view>
			<view v-if="news.length>0" class="cententBox pos-rel flex al-center">
				<view class="conTxt">
					<view class="" @click="godils(item)" v-for=" item in news" :key="item.id">
						{{item.title}}
					</view>
				</view>
			</view>
			<view  v-else class=" fz-12 nonews">
				暂无小区新闻...
			</view>
		</view>
		<view class="line">
			
		</view>
	</view>
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
				news: [],//资讯数据
			}
		},
		methods: {
			getData() {
				home.CommunityNews({
					data: {
						page:1,
						pageSize:1
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
						// console.log('新闻',res.data.data.data);
						this.news = res.data.data.data
					}
				})
			},
			// 查看详情
			godils(item) {
				home.NewsDils({
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
						let content = {title:res.data.data.title,content:res.data.data.content}
						this.$store.commit("homeContent",content);
						uni.navigateTo({
							url: `/pages/InformationDetails/InformationDetails/InformationDetails`
						})

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

	.box {
		margin-top: 40rpx;
		width: 650rpx;
		padding: 0 20rpx;
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
	
	.conTxt{
		width: 100%;
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
	
	.nonews{
		padding: 20rpx 10rpx;
		font-size: 12px;
		color: #999999;
	}
</style>
