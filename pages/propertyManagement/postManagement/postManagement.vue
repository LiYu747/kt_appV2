<template>
	<view>
		<subunit titel='帖子管理'></subunit>
		<view class="navBox" :style="{height: this.$store.state.customBar + 'rpx'}">
			<view class="searchBox ">
				<view @click="xlshow = !xlshow" class="allTx flex al-center">
					筛选
					<image src="https://oss.kuaitongkeji.com/static/img/app/propertyManagement/pullDown.png"
						class="pullDown" mode=""></image>
				</view>
				<view v-show="xlshow==true" class="celBox pos-abs flex-d al-center">
					<view class="trilateral">

					</view>
					<view class="xlshow flex-d al-center">
						<view class="itemLabel flex al-center ju-center" @click="select(item,index)"
							:class="{'back':index==idx}" v-for="(item,index) in condition" :key='item.id'>
							{{item.label}}
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="search flex al-center ju-center">
			<view class="searchBack flex al-center">
				<image src="https://oss.kuaitongkeji.com/static/img/app/propertyManagement/serach.png" class="serachImg"
					mode=""></image>
				<input type="text" class="ipt m-l1" v-model="value" @confirm="search" placeholder="请输入关键词" />
			</view>
			<view @click="cancel" v-show="ISseach==true" class="cancel pos-abs">
				取消
			</view>
		</view>
		<view class="topLine">

		</view>
		<view v-if="code == 200" class="">
			<view v-if="lists.length>0" class="flex-d al-center">
				<view class="itemBox" @click="goDetails(item,index)" v-for="(item,index) in lists" :key='item.id'>
					<view class="layoutBox flex  ju-between">
						<view class="itemTil">
							标题 : {{item.title}}
						</view>
						<view :class="item.verify_status_text=='已通过'?'dv':'nodv'">
							{{item.verify_status_text}} >
						</view>
					</view>
					<view class="layoutBox">
						发布时间 : {{item.created_at}}
					</view>
				</view>
			</view>
			
			<view v-if="lists.length==0&&isLoading==false&&falg==false" class="noPost flex ju-center">
				暂时还没有发布的帖子
			</view>
			<view v-if="lists.length==0&&isLoading==false&&falg == true" class="noPost flex ju-center">
				没有您要查看的帖子
			</view>
			<view v-if="hasMore==false" class="bomLine flex ju-center al-center">
				{{noText}}
			</view>
			<view v-show="isLoading == true && lists.length>0" class=" flex ju-center al-center lodbox">
				<image class="lodimg" src="https://oss.kuaitongkeji.com/static/img/app/address/loading.gif" mode=""></image>
				加载中...
			</view>
		</view>
		<view v-show="isLoading == true && lists.length == 0" class="showloding flex al-center ju-center">
			<view class="loding flex-d al-center ju-center">
				<view class=" ">
					<image class="loimg" src="https://oss.kuaitongkeji.com/static/img/app/address/loading.gif" mode="">
					</image>
				</view>
				加载中
			</view>
		</view>
		<view v-show="xlshow==true" @click="xlshow = false" class="showBox">

		</view>
	</view>
</template>

<script>
	import subunit from '../../../components/sub-unit/subunit.vue'
	import home from '../../../vendor/home/home.js'
	export default {
		name: "",
		components: {
			subunit
		},
		props: {},
		data() {
			return {
				code: 0,
				xlshow: false,
				falg: false, //判断筛选结果
				idx: 0,
				noText: '',
				page: 1,
				pageSize: 15,
				status: '', //筛选条件
				isLoading: false,
				hasMore: true,
				lists: [],
				condition: [{
						label: '全部',
						status: ''
					},
					{
						label: '待审核',
						status: '1'
					},
					{
						label: '已通过',
						status: '2'
					},
					{
						label: '未通过',
						status: '3'
					},
				],
				index1: 0,
				ISseach: false, //判断是否搜索value
				value: ''
			}
		},
		methods: {
			// 筛选
			select(item, index) {
				this.value = ""
				this.idx = index
				this.xlshow = false
				this.falg = true
				this.status = item.status
				this.page = 1
				this.noText = ''
				this.lists = []
				this.getData()
			},
			// 去帖子详情
			goDetails(item, index) {
				this.index1 = index
				uni.navigateTo({
					url: '/pages/propertyManagement/postManagement/postDetails/postDetails?id=' + item.id
				})

			},
			// 获取数据
			getData() {
				this.isLoading = true
				home.allPost({
					data: {
						page: this.page,
						pageSize: this.pageSize,
						verify_status: this.status,
						kw: this.value
					},
					fail: () => {
						this.isLoading = false
						uni.showToast({
							title: '网络错误',
							icon: "none"
						})
					},
					success: (res) => {
						this.isLoading = false
						if (res.statusCode != 200) {
							uni.showToast({
								title: '网络出错了',
								icon: "none"
							})
							return;
						}
						if (res.data.code == 403) {
							uni.showModal({
								content: res.data.msg + '访问',
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
								icon: "none"
							})
							return;
						}
						this.code = res.data.code
						let data = res.data.data
						this.page = data.current_page + 1;
						this.hasMore = data.next_page_url ? true : false;
						data.data.map(item => {
							item.created_at = item.created_at.slice(0, 16)
							switch(item.verify_status){
								case 1:
								item.verify_status_text = '审核中'
								break;
								case 2:
								item.verify_status_text = '已通过'
								break;
								case 3:
								item.verify_status_text = '未通过'
							}
						})
						this.lists = this.lists.concat(data.data)
					}
				})
			},
			//搜索
			search() {
				this.lists = []
				this.status = ''
				this.page = 1
				this.getData()
				this.ISseach = true
				this.noText = ''
			},
			//取消
			cancel() {
				this.ISseach = false
				this.lists = []
				this.status = ''
				this.value = ''
				this.page = 1
				this.getData()
			}
		},
		mounted() {
			this.getData()
		},
		onShow() {
			if (!this.$store.state.checkIspass) return;
			this.lists.map((item, index) => {
				if (index == this.index1) {
					item.verify_status_text = this.$store.state.checkIspass
				}
			})
		},
		onLoad() {

		},
		onHide() {
			this.$store.commit('checkIspass', '')
		},
		onReachBottom() {
			this.noText = '没有更多了'
			if (this.isLoding == true || this.hasMore == false) return;
			this.getData()

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

	.navBox {
		width: 30%;
		top: 0;
		right: 0;
		position: fixed;
		z-index: 999;
	}

	.searchBox {
		position: absolute;
		right: 50rpx;
		color: #FFFFFF;
		font-size: 16px;
		z-index: 9;
		bottom: 20rpx;
	}

	.search {
		position: fixed;
		width: 100%;
		height: 88rpx;
		background: #FFFFFF;
		border-bottom: 1px solid #eeeeee;
		z-index: 99;
	}

	.topLine {
		height: 88rpx;
	}

	.searchBack {
		width: 494rpx;
		height: 54rpx;
		background: rgba(204, 204, 204, 0.35);
		border-radius: 27rpx;
	}


	.cancel {
		font-size: 14px;
		color: #666666;
		margin-left: 30rpx;
		right: 50rpx;
	}

	.uni-input-placeholder {
		font-size: 12px;
	}

	.ipt {
		margin-left: 20rpx;
		width: 400rpx;
		font-size: 14px;
	}

	.serachImg {
		width: 34rpx;
		height: 34rpx;
		margin-left: 20rpx;
	}

	.xlshow {
		width: 160rpx;
		background: #FFFFFF;
		border-radius: 10rpx;
		z-index: 9;
		padding-bottom: 30rpx;
		box-shadow: 0px 4px 4px 0px rgba(9, 9, 9, 0.1);
	}

	.itemLabel {
		font-size: 14px;
		color: #666666;
		margin-top: 20rpx;
	}

	.back {
		width: 90%;
		background: #F07535;
		color: #FFFFFF;
	}

	.pullDown {
		width: 20rpx;
		height: 12rpx;
		margin-left: 10rpx;
	}


	.itemBox {
		margin-top: 30rpx;
		width: 650rpx;
		background: #FFFFFF;
		border-radius: 10rpx;
		padding: 20rpx;
		font-size: 14px;
		padding-bottom: 50rpx;
		color: #666666;
		box-shadow: 2rpx 2rpx 12rpx #d9d9d9;
	}

	.itemTil {
		width: 520rpx;
	}

	.layoutBox {
		width: 100%;
		padding: 20rpx 0;
		border-bottom: 1px solid #CCCCCC;
	}

	.dv {
		color: #23D400;
	}

	.nodv {
		color: #F07535;
	}

	.noPost {
		font-size: 14px;
		color: #666666;
		margin-top: 100rpx;
	}

	.bomLine {
		font-size: 12px;
		padding: 30rpx 0;
	}

	.showloding {
		position: absolute;
		width: 100%;
		height: 100vh;
		top: 0;
		color: #FFFFFF;
	}

	.lodimg {
		width: 30rpx;
		height: 30rpx;
		margin-right: 20rpx;
	}

	.lodbox {
		padding: 30rpx 0;
		font-size: 12px;
	}

	.loimg {
		width: 50rpx;
		height: 50rpx;
	}

	.loding {
		width: 260rpx;
		height: 200rpx;
		border-radius: 10rpx;
		background: rgba(88, 88, 88, 0.8);
		border-radius: 10rpx;
	}

	.celBox {
		right: -32rpx;
		margin-top: 10rpx;
	}

	.trilateral {
		width: 0;
		height: 0;
		border-width: 0 20rpx 20rpx;
		border-style: solid;
		border-color: transparent transparent #FFFFFF;
	}

	.showBox {
		width: 100%;
		height: 100vh;
		position: fixed;
		top: 0;
		z-index: 99;
	}
</style>
