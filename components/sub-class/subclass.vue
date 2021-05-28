
<template>
   <view class="">
   		<view class="topbox pos-rel" :style="{height: customBar + 'rpx' }">
   			<view class="content pos-abs flex al-center">
   				<image @click="remove" src="https://oss.kuaitongkeji.com/static/img/app/login/1729908969cd5d7d911e096d6db3c70.png" class="remove" mode=""></image>
   				<view class="m-l2">
   					{{titel}}
   				</view>
   			</view>
   		</view>
		<view :style="{height: customBar + 'rpx' }">
			
		</view>

   </view>
</template>

<script>
	import cache from "../../vendor/cache/cache.js"
export default {
name: "",
components: {

},
props: {
	titel:{
		type:String,
		default:'标题'
	},
	showmap:{
		type:Boolean,
		default:true
	}
},
data () {
  return {
	  customBar:0
    }
  },
  methods: {
    // 返回
	remove(){
		uni.navigateBack({
			delta:1
		})
	},
  },
  onShow() {
  	
  },
  mounted () {
   this.customBar =  cache.get("customBar")
  },
  onLoad () {

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
.topbox{
	position: fixed;
	width: 100%;
	background: #F07535;
	z-index: 9;
}
.content{
	width: 100%;
	height: 100rpx;
	bottom: 0;  
	color: #FFFFFF;
	font-size: 36rpx;
}
.remove{
	width: 22rpx;
	height: 41rpx;
	margin-left: 50rpx;
}
.line{
	height: 148rpx;
}
.map{
	right: 50rpx;
	bottom: 30rpx;
	font-size: 26rpx;
	color: #FFFFFF;
}
.mapimg{
	width: 36rpx;
	height: 36rpx;
}
</style>
