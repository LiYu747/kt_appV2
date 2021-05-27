<template>
	<view class="">
		<subunit titel='用户查询'></subunit>
		<view class="navBox" :style="{height: this.$store.state.customBar + 'rpx'}">
			<view class="searchBox">
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
				<input type="text" class="ipt" v-model="username" @confirm="search" placeholder="请输入关键词" />
			</view>
			<view @click="cancel" v-show="ISseach==true" class="cancel pos-abs">
				取消
			</view>
		</view>
		<view class="topLine">

		</view>
		<view v-if="code ==200" class="">
			<view v-if="lists.length>0" class="flex-d al-center m-t1">
				<view class="itemBox" @click="goUserDetails(item)" v-for=" (item,index) in lists" :key='index'>
					<view class="flex al-center ju-between">
						<view class="itemName">
							{{item.own_user.username}}
						</view>
						<view class="itemTel fz-12">
							{{item.type}}
						</view>
					</view>
					<view class="flex m-t3 ju-between cl9 fz-14">
						<view class=" flex al-center">
							<image src="https://oss.kuaitongkeji.com/static/img/app/propertyManagement/time.png"
								class="timeImg" mode=""></image>
							<view v-if="item.valid_type == 1" class="m-l1 ">
								入住日期
							</view>
							<view v-if="item.valid_type == 0" class="m-l1">
								有效期限
							</view>
						</view>
						<view v-if="item.valid_type == 1" class="">
							{{item.valid_begin}}
						</view>
						<view v-if="item.valid_type == 0" class="">
							永久
						</view>
					</view>
				</view>
			</view>
			<view v-if="isLoading==false&&lists.length==0&&falg==true" class="noQuery flex ju-center">
				查询的用户不存在
			</view>
			<view v-if="isLoading==false&&lists.length==0&&falg==false" class="noQuery flex ju-center">
				没有用户可查询
			</view>
			<view v-if="hasMore==false&&lists.length>0" class="bomLine flex ju-center">
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
        <view   v-show="xlshow==true" @click="xlshow = false" class="showBox">
        	
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
				condition: [{
						label: '全部',
						status: ''
					},
					{
						label: '户主',
						status: '1'
					},
					{
						label: '家庭成员',
						status: '2'
					},
					{
						label: '租户',
						status: '3'
					},
				],
				status: '',
				ISseach: false,
				noText: '',
				page: 1,
				pageSize: 15,
				username: '',
				isLoading: false,
				hasMore: true,
				locdata: [],
				lists: []
			}
		},
		methods: {
			// 用户详情
			goUserDetails(item) {
				uni.navigateTo({
					url: '/pages/propertyManagement/userQuery/theUserDetails/theUserDetails?id=' + item.id
				})
			},
			// 筛选
			select(item, index) {
				this.idx = index
				this.xlshow = false
				this.falg = true
				this.username = ''
				this.status = item.status
				this.page = 1
				this.noText = ''
				this.lists = []
				this.getData()
			},
			// 搜索
			search() {
				this.falg = true
				this.status = ''
				this.noText = ''
				this.ISseach = true
				this.lists = []
				this.page = 1
				this.getData()

			},
			// 取消
			cancel() {
				this.ISseach = false
				this.username = ''
				this.page = 1
				this.lists = []
				this.getData()
			},
			//获取数据
			getData() {
				this.isLoading = true
				home.allResident({
					data: {
						username: this.username,
						page: this.page,
						pageSize: this.pageSize,
						type: this.status
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
							switch (item.type) {
								case 1:
									item.type = '户主'
									break;
								case 2:
									item.type = '家庭成员'
									break;
								case 3:
									item.type = '租户'
							}
							if (item.valid_begin) {
								item.valid_begin = item.valid_begin.slice(0, 10)
							}
						})
						this.lists = this.lists.concat(data.data)
					}
				})
			}
		},
		mounted() {
			this.getData()
		},
		onReachBottom() {
			this.noText = '没有更多了'
			if (this.isLoding == true || this.hasMore == false) return;
			this.getData()
		},
		onShow() {

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

	.serachImg {
		width: 34rpx;
		height: 34rpx;
		margin-left: 20rpx;
	}

	.ipt {
		margin-left: 20rpx;
		width: 400rpx;
		font-size: 14px;
	}

	.uni-input-placeholder {
		font-size: 12px;
	}

	.itemBox {
		width: 630rpx;
		margin-top: 40rpx;
		padding: 30rpx 20rpx;
		background: #FFFFFF;
		border-radius: 10rpx;
		box-shadow: 2rpx 2rpx 12rpx #d9d9d9;
	}

	.itemName {
		color: #333333;
	}

	.itemTel {
		color: #FF0000;
	}


	.itemTime {
		color: #999999;
		font-size: 12px;
	}


	.bomLine {
		padding: 30rpx 0;
		font-size: 12px;
	}

	.timeImg {
		width: 30rpx;
		height: 26rpx;
	}

	.noQuery {
		margin-top: 100rpx;
		font-size: 14px;
		color: #666666;
	}

	.lodimg {
		width: 30rpx;
		height: 30rpx;
		margin-right: 20rpx;
	}

	.lodbox {
		font-size: 24rpx;
		padding: 30rpx 0;
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
		border-radius: 10rpx;
		background: rgba(88, 88, 88, 0.8);
		border-radius: 10rpx;
	}
	
	.showBox {
		width: 100%;
		height: 100vh;
		position: fixed;
		top: 0;
		z-index: 99;
	}
</style>
