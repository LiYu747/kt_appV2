<template>
	<view class="">
		<subunit ></subunit>
		<view class="navBox"  :style="{height:  this.$store.state.customBar + 'rpx'}">
				<view class="ipt  ju-center flex al-center pos-abs">
					<image class="img pos-abs" src="https://oss.kuaitongkeji.com/static/img/app/home/ss.png" mode=""></image>
					<input class="input" type="text" v-model="value" @confirm="change" placeholder="请输入小区名称关键词" />
					<view @click="remove" class="rig m-l2">
						取消
					</view>
				</view>
		</view>
		<view v-if="locdata.length>0" class="top flex-d al-center">
			<view @click="gotoo(item)" class="item" v-for="item in locdata" :key="item.id">
				<view class="name flex al-center ju-between">
					{{item.name}}
					<image src="https://oss.kuaitongkeji.com/static/img/app/address/retrue.png" class="nameimg" mode=""></image>
				</view>
				<view class="syntext">
					<view class="">
						小区介绍
					</view>
					<view class="synback flex al-center">
						<view class="aa">
							{{item.brief}}
						</view>
					</view>
				</view>
				<view class="syntext">
					<view class="">
						交通方式
					</view>
					<view class="synback flex al-center">
						<view class="aa">
							暂无
						</view>
					</view>
				</view>
			</view>
	<!-- 		<view v-show="isLoding == true" class=" flex ju-center al-center lodbox">
				<image class="lodimg" src="https://oss.kuaitongkeji.com/static/img/app/address/loading.gif" mode=""></image>
				加载中...
			</view>
			<view class="flex ju-center lodbox fz-12" v-if="hasMore == false">
				{{text}}
			</view> -->

		</view>
		<view v-show="isLoding == true&&locdata.length==0" class="showloding flex al-center ju-center">
			<view class="loding flex-d al-center ju-center">
				<view class=" ">
					<image class="loimg" src="https://oss.kuaitongkeji.com/static/img/app/address/loading.gif" mode=""></image>
				</view>
				搜索中
			</view>
		</view>
		<view class="nono fz-14 flex al-center ju-center" v-if="locdata.length == 0&&isLoding == false">
			没有您搜索的小区哦
		</view>
	</view>
</template>

<script>
	import subunit from '../../../components/sub-unit/subunit.vue'
	import village from '../../../vendor/village/village.js'
	export default {
		name: "",
		components: {
			subunit
		},
		props: {},
		data() {
			return {
				locdata: [], //搜索的数据
				value: '', //搜索框绑定v-model
				text: '', //没有更多的提示
				isLoding: false,
				hasMore: true,
			}
		},
		methods: {
			// 搜索数据
			getData() {
				this.isLoding = true
				village.searchVill({
					data: {
						kw: this.value
					},
					fail: () => {
						this.isLoding = false
						uni.showToast({
							title: '网络错误',
							icon: 'none'
						})
					},
					success: (res) => {
						this.isLoding = false
						//console.log(res.data.data);
						if (res.statusCode != 200) return;

						if (res.data.code != 200) return;
           
						let data = res.data.data
						this.locdata = data
					}
				})
			},
			// 返回
			remove() {
				uni.navigateBack({
					delta: 1
				})
			},
			// 去详情页
			gotoo(item) {
				// console.log(item.id);
				uni.navigateTo({
					url: `/pages/communityForum/introduction/introduction?id=${item.id}`
				})
			},
			change() {
				if(this.value == '') return;
				this.locdata = []
				this.getData()
			}

		},
		onShow() {


		},
		mounted() {
			this.getData()
		},
		onLoad(val) {

			this.value = val.value
		},
		onReachBottom() {
			// this.text = '没有更多了'
			// if (this.isLoding == true || this.hasMore == false) return;
			// this.getData()

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
	.navBox{
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

	.posfidex {
	}

	.bottom {
		height: 148rpx;
	}

	.top {
		margin-top: 40rpx;
	}

	.item {
		width: 629rpx;
		background: #FFFFFF;
		border-radius: 20rpx;
		margin-bottom: 30rpx;
		padding-left: 29rpx;
		padding-right: 32rpx;
		padding-top: 30rpx;
		padding-bottom: 53rpx;
		box-shadow: 2rpx 2rpx 12rpx #d9d9d9;
	}

	.nameimg {
		width: 17rpx;
		height: 32rpx;
	}

	.name {
		font-size: 30rpx;
		color: #666666;
	}

	.syntext {
		font-size: 24rpx;
		color: #666666;
		margin-top: 29rpx;
	}

	.synback {
		padding: 0 20rpx;
		margin-top: 25rpx;
		width: 569rpx;
		height: 98rpx;
		background: #E6E6E6;
		padding-right: 20rpx;
	}

	.aa {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	.nono {
		width: 100%;
		height: 300rpx;
		color: #666666;
	}

	.lodimg {
		width: 30rpx;
		height: 30rpx;
		margin-right: 20rpx;
	}

	.lodbox {
	   padding: 30rpx 0;
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
</style>
