<template>
	<view class="">
		<subclass titel='运动'></subclass>
		<view class="search flex al-center ju-center">
			<view class="searchBack flex al-center">
				<image src="https://oss.kuaitongkeji.com/static/img/app/propertyManagement/serach.png" class="serachImg"
					mode=""></image>
				<input type="text" class="ipt" v-model="value" @confirm="search" placeholder="请输入关键词" />
			</view>
			<view @click="cancel" v-show="ISseach==true" class="cancel pos-abs">
				取消
			</view>
		</view>
		<view class="topLine">

		</view>

		<view v-if="lists.length>0" class="flex-d al-center">
			<view class="itemBox m-t3 flex" v-for="item in lists" :key="item.id">
				<view class="">
					<image :src="item.cover" class="itemCover" mode=""></image>
				</view>
				<view class="m-l3 ">
					<view class="fz-16">
						{{item.name}}
					</view>
					<view class="fz-12 cl9 m-t1 flex al-center">
						<!-- <image src="https://oss.kuaitongkeji.com/static/img/app/lookroom/add.png" class="addicon" mode=""></image> -->
						<view class="">
							{{item.address_name}}
						</view>
					</view>
					<view class="m-t1 flex fz-12">
						<view class="itemBrf">
							{{item.brief}}
						</view>
					</view>
				</view>
			</view>
			<view v-show="isLoding == true" class=" flex ju-center al-center lodbox">
				<image class="lodimg" src="https://oss.kuaitongkeji.com/static/img/app/address/loading.gif" mode="">
				</image>
				加载中...
			</view>
			<view class="flex ju-center notext fz-14" v-if="hasMore == false">
				{{text}}
			</view>
		</view>
		<view v-if='lists.length == 0 && isLoding == false && ISseach == false' class="noCentent fz-14 cl9 flex ju-center">
			暂无内容
		</view>
		<view class="noCentent fz-14 cl9 flex ju-center" v-if="ISseach == true && lists.length == 0">
			没有您搜索的内容
		</view>
		<view v-show="isLoding == true&&lists.length==0" class="showloding flex al-center ju-center">
			<view class="loding flex-d al-center ju-center">
				<view class=" ">
					<image class="loimg" src="https://oss.kuaitongkeji.com/static/img/app/address/loading.gif" mode="">
					</image>
				</view>
				加载中
			</view>
		</view>
	</view>
</template>

<script>
	import subclass from '../../../components/sub-class/subclass.vue'
	import home from "../../../vendor/home/home.js"
	export default {
		name: "",
		components: {
			subclass
		},
		props: {},
		data() {
			return {
				value: "",
				ISseach: false,
				hasMore: true,
				isLoding: false,
				page: 1,
				pageSize:15,
				lists: [],
				text:''
			}
		},
		methods: {
			//取消
			cancel(){
				this.value = ""
				this.ISseach = false
				this.page = 1
				this.lists = []
				this.getData()
			},
			search() {
				this.text = ''
				this.ISseach = true
				this.page = 1
				this.lists = []
				this.getData()
			},
			getData() {
				this.isLoding = true
				home.motionshop({
					data: {
						kw: this.value,
						page:this.page,
						pageSize:this.pageSize
					},
					fail: () => {
						this.isLoding = false
						uni.showToast({
							title: "网络错误",
							icon: "none"
						})
					},
					success: (res) => {
						this.isLoding = false
						if (res.statusCode != 200) {
							uni.showToast({
								title: "网络出错了",
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
						let data = res.data.data
						this.hasMore = data.next_page_url ? true : false
						this.page = data.current_page + 1
						this.lists = this.lists.concat(data.data)
					}
				})
			}
		},
		onShow() {},
		mounted() {
			this.getData()
		},
		// 下拉触底
		onReachBottom() {
			this.text = '没有更多了'
			if (this.isLoding == true || this.hasMore == false) return;
			this.getData();
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
	.wid {
		width: 400rpx;
		// background: red;
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
		width: 650rpx;
		padding: 20rpx;
		box-shadow: 2rpx 2rpx 12rpx #d9d9d9;
		border-radius: 10rpx;
	}

	.itemCover {
		width: 150rpx;
		height: 150rpx;
		border-radius: 10rpx;
	}

	.itemBrf {
		border: 1px solid #F07535;
		border-radius: 30rpx;
		padding: 2rpx 14rpx;
		color: #F07535;
	}

	.noCentent {
		padding: 50rpx 0;
	}
	
	.notext {
		padding: 30rpx 0;
		font-size: 12px;
	}
	
	.lodimg {
		width: 30rpx;
		height: 30rpx;
		margin-right: 20rpx;
	}
	
	.lodbox {
		padding: 20rpx 0;
		font-size: 24rpx;
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
		background: rgba(88, 88, 88, 0.8);
		border-radius: 10rpx;
	}
	
	.addicon {
		width: 20rpx;
		height: 24rpx;
	}
</style>
