<template>
	<view class="">
	   <view class="" @click="add">
	   	    {{text}}
	   </view>
	</view>
</template>

<script >
import subunit from '../../../components/sub-unit/subunit.vue'
import village from '../../../vendor/village/village.js'
export default {
name: "",
components: {
	subunit,
},
props: {},
data() {
	return {
		lists:[{name:'撒大'},{name:'撒大大'},{name:'阿是'},{name:'撒是'},{name:'撒是'},{name:'撒s都是是'},{name:'是是'}],
		 arr:{name:"撒大1",age:15,color:"red"},
		text :'啊啊 ',
		tagdata: [],
		current: 0, // tabs组件的current值，表示当前活动的tab选项
		swiperCurrent: 0, // swiper组件的current值，表示当前那个swiper-item是活动的
		page: 1,
		ps: 3,
		isLoding: false,
		hasMore: true,
		flag: false,
		idx: 0,
		Isnext : false,
		msg:[]
	}
},

methods: {
	
	add(){
		const x = (x, y) => { return x * y };
		var z = x(2,5)
		this.msg.push(1)
		console.log(z);
		// for (var x in this.lists ){
		// 	console.log( this.lists[x]);
		// }
		this.text = '改变'
	},
	 //滑动切换
	 Onchange(e){
		let current = e.detail.current;
		this.idx = e.detail.current
		if (this.tagdata[current].list.length>0) return;
			this.loadPageData(this.tagdata[current].id, current)
	 },
	// tabs通知swiper切换
	tabsChange(index) {
		this.swiperCurrent = index;
	},
	// swiper-item左右移动，通知tabs的滑块跟随移动
	transition(e) {

		let dx = e.detail.dx;
		this.$refs.uTabs.setDx(dx);
	},
	// 由于swiper的内部机制问题，快速切换swiper不会触发dx的连续变化，需要在结束时重置状态
	// swiper滑动结束，分别设置tabs和swiper的状态
	animationfinish(e) {
		let current = e.detail.current;
		this.$refs.uTabs.setFinishCurrent(current);
		this.swiperCurrent = current;
		this.current = current;
	},
	
	// 获取数据
	loadPageData(id, idx) {
		this.isLoding = true
		village.communityPost({
					data: {
						villageId: 1,
						tribune_cat: id,
						kw: this.keyword,
						page: this.page,
						pageSize: this.ps
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
						if (res.statusCode != 200) return;

						if (res.data.code != 200) return;
						let data = res.data.data;
						data.data.map(item => {
							item.created_at = item.created_at.slice(0, 16)
							item.album = item.album.slice(0, 3)
						})
						this.tagdata.map((item, index) => {
							if (index == idx) {
								item.list = data.data
								item.page = data.current_page + 1
								item.hasMore = data.next_page_url ? true : false
							}
						})

						}

					})
					
			},
			//获取默认栏目列表
			grtColumn() {
				village.DefaultColumnList({
					data: {},
					fail: () => {
						uni.showToast({
							title: '网络错误',
							icon: 'none'
						})
					},
					success: (res) => {
						if (res.statusCode != 200) return;
						if (res.data.code != 200) return;
						// console.log(this.tagdata );
						res.data.data.map(item => {
							item.list = []
							item.hasMore = false
							item.page = 1
							item.text = null
							item.nono = null
						})
						this.tagdata = res.data.data
						this.loadPageData(res.data.data[this.idx].id, this.idx)
					}
				})
			},
			// scroll-view到底部加载更多
			onreachBottom() {
				      let idx = this.idx
				    if (this.isLoding == true || this.Isnext == true) return;
				    if (this.tagdata[idx].hasMore == false) {
						this.tagdata.map((item,index) => {
							   if(idx == index){
							      item.text = '没有更多了'
							   }
						}) 
				      return;
				    }
				    this.Isnext = true
				    village.communityPost({
				      data: {
				        villageId: 1,
				        tribune_cat: this.tagdata[idx].id,
				        page: this.tagdata[idx].page,
				        pageSize: this.ps
				      },
				      fail: () => {
						   this.Isnext = false
				        uni.showToast({
				          title: '网络错误',
				          icon: 'none'
				        })
				      },
				      success: (res) => {
                            	   this.Isnext = false
				        if (res.statusCode != 200) return;
				
				        if (res.data.code != 200) return;
				
				        let data = res.data.data;
				        data.data.map(item => {
				          item.created_at = item.created_at.slice(0, 16)
				          item.album = item.album.slice(0, 3)
				        })
				         this.tagdata.map((item, index) => {
				          if (index == idx) {
				            item.list = item.list.concat(data.data)
				            item.page = data.current_page + 1
				            item.hasMore = data.next_page_url ? true : false
				          }
				        })
				      },
				
				    })
			},
	},
	mounted() {
		this.grtColumn()
	
	},
	// 下拉加载更多
	onReachBottom() {
          
	},
	onLoad(val) {},
	onShow() {

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
	uni-swiper {
		height: calc(100vh - 348rpx);
		box-sizing: border-box;
		// background: #F07535;
	}
	.back {
		width: 100%;
		background-color: #FFFFFF;
		position: fixed;
		left: 0;
		top: 148rpx;
		z-index: 99;
	}

	.wid {
		width: 675rpx;
	}

	.tagpos {
		width: 100%;
		position: fixed;
		z-index: 9;
	}

	.lines {
		height: 100rpx;
	}

	.itemimg {
		width: 100rpx;
		height: 100rpx;
		border-radius: 50%;
	}

	.item {
		width: 690rpx;
		padding: 30rpx;
		border-bottom: 1rpx solid #BFBFBF;
		color: #666666;
	}

	.name {
		font-size: 26rpx;
		color: #F07535;
	}

	.time {
		color: #B3B3B3;
		font-size: 24rpx;
		margin-top: 10rpx;
		-webkit-transform: scale(0.8);
		-webkit-transform-origin: left top
	}

	.content {
		margin-top: 20rpx;
		width: 650rpx;
		background: rgb(230, 230, 230);
		padding: 20rpx 20rpx;
		font-size: 28rpx;
	}

	.show {
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	.items {
		width: 150rpx;
		height: 170rpx;
		margin-right: 20rpx;
		margin-bottom: 10rpx;
	}

	.comimg {
		width: 25rpx;
		height: 25rpx;
		margin-top: 5rpx;
		margin-right: 10rpx;
	}

	.comment {
		justify-content: flex-end;
		font-size: 24rpx;
		color: #666666;
	}

	.comtext {
		margin-top: 10rpx;
		width: 642rpx;
		background: rgb(230, 230, 230);
		padding: 14rpx 24rpx;
	}

	.release {
		margin-bottom: 100rpx;
	}

	.btom {
		height: 50rpx;
	}

	.nono {
		height: 300rpx;
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

	.line {
		// width: 100%;
		height: 148rpx;
	}

	.fixed {
		position: fixed;
		z-index: 9;
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

	.searchimg {
		width: 34rpx;
		height: 34rpx;
		z-index: 99;
		position: absolute;
		right: 54rpx;
		top: 74rpx;
		position: fixed;
	}

	.ipt {
		top: 100rpx;
		z-index: 99;
	}

	.img {
		width: 38rpx;
		height: 38rpx;
		left: 168rpx;
		position: fixed;
	}

	.input {
		position: fixed;
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

	.clierimg {
		width: 24rpx;
		height: 24rpx;
		position: absolute;
		right: 170rpx;
		position: fixed;
	}

	.tagbox {
		// width: 100%;
		height: 80rpx;
	}

	.itemtag {
		height: 76rpx;
		display: flex;
		align-items: center;
		margin-left: 40rpx;
		font-size: 30rpx;
		color: #666666;
	}


	.scroll-view_H {
		white-space: nowrap;
		width: 100%;
		background: #ffffff;
		border-bottom: 1px solid #eeeeee;

		/deep/.uni-scroll-view::-webkit-scrollbar {
			/* 隐藏滚动条，但依旧具备可以滚动的功能 */
			display: none
		}
	}

	.dv {
		height: 76rpx;
		display: flex;
		align-items: center;
		color: #F07535;
		border-bottom: 1px solid #F07535;
		border-top: 1px solid #FFFFFF;
	}

	.posclassfiy {
		width: 90rpx;
		height: 70rpx;
		position: absolute;
		top: 10rpx;
		right: 0rpx;
		background: #FFFFFF;
		box-shadow: -5px 0 10px 4px#FFFFFF;
	}

	.classfiyimg {
		width: 40rpx;
		height: 40rpx;
	}

	.itemwidth {
		margin-right: 120rpx;
	}

	.searchend {
		top: 148rpx;
		width: 100%;
		// height: 100%;
		// background: red;
	}

	.btoms {
		height: 120rpx;
	}
</style>
