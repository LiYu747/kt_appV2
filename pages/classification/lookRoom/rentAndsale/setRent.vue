<template>
    <view>
    	<subunit titel='设置'></subunit>
		<view class="flex-d al-center">
			<view class="conBox cl3 fz-14">
				<view class="item  flex al-center ju-between">
					更改可见性
					<u-switch v-model="checked" size='40' @change="change" inactive-color='#eeeeee' active-color='#F07535'></u-switch>
				</view>
			<!-- 	<view  @click="updatamsg" class="item flex al-center ju-between">
					更新数据
					<image class="reimg" src="https://oss.kuaitongkeji.com/static/img/app/address/retrue.png" mode=""></image>
				</view> -->
				<view class="flex-d al-center">
					<view @click="aadDel" class="delBox fz-16 flex al-center ju-center">
						删除
					</view>
				</view>
			</view>
		</view>
    </view>
</template>

<script>
	import subunit from '../../../../components/sub-unit/subunit.vue'
	import home from '../../../../vendor/home/home.js'
	import cache from '../../../../vendor/cache/cache.js'
export default {
name: "",
components: {
subunit
},
props: {},
data () {
  return {
	  checked: false,
	  id:''
    }
  },
  methods: {
    	change(status) {
			let show = ''
			if(status == false){
				show = 0
			}
			if(status == true){
				show = 1
			}
    		this.isLook(show)	
			
    	},
		//更新数据
		updatamsg(){
			return;
			uni.navigateTo({
				url:'/pages/classification/lookRoom/rentalForm?id=' + this.id
			})
		},
		//删除
		aadDel(){
			uni.showModal({
				content:'您确定要删除吗',
				success:(res) => {
					if(res.cancel == true) return;
					home.delrenRoom({
						data:{
							id:this.id
						},
						fail: () => {
							uni.showToast({
								title:'网络问题',
								icon:'none'
							})
						},
						success: (res) => {
							if(res.statusCode != 200){
								uni.showToast({
									title:'网络出错了',
									icon:'none'
								})
								return;
							}
							if(res.data.code != 200){
								uni.showToast({
									title:res.data.msg,
									icon:'none'
								})
								return;
							}
							uni.showToast({
								title:res.data.msg,
								icon:'none',
								duration:2000
							})
							let settime = setTimeout(() => {
								uni.navigateBack({
									delta:2
								})
								clearTimeout(settime)
							},2000)
							this.$store.commit('roomisDel',res.data.code)
						}
					})
					
				}
			})
		},
        //更改可见性
		isLook(show){
			home.rentShow({
				data:{
					id:this.id,
					is_show:show
					},
				fail: () => {
					uni.showToast({
						title: '网络错误',
						icon: 'none'
					})
				},
				success: (res) => {
					if (res.statusCode != 200) {
						uni.showToast({
							title: '网络出错了',
							icon: 'none'
						})
						return;
					}
					if (res.data.code != 200) {
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						})
						return;
					}
					this.$store.commit('userIschenge',show)
					uni.showToast({
						title: res.data.msg,
						icon: 'none'
					})
				}
			})
		}
  },
  mounted () {

  },
  onLoad (val) {
	 let isShow =  this.$store.state.userIschenge
    if(isShow == 0){
		this.checked = false
	}
	if(isShow == 1){
		this.checked = true
	}
	this.id = val.id
  },
  onShow() {
  	this.$store.commit('roomisDel','')
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
.conBox{
	margin-top: 30rpx;
	width: 650rpx;
	padding: 30rpx 20rpx;
	background: #FFFFFF;
		box-shadow: 2rpx 2rpx 12rpx #d9d9d9;
}
.item{
	height: 100rpx;
	border-bottom: 1rpx solid #CCCCCC;
}

.reimg{
	width: 16rpx;
	height: 30rpx;
	margin-right: 20rpx;
}

.delBox{
	width: 360rpx;
	height: 80rpx;
	border-radius: 10rpx;
	background: #DD6161;
	color: #FFFFFF;
	margin: 50rpx;
}
</style>
