<template>
    <div>
        <view class="boxss flex flex-w">
        	<view class="flex-d al-center loyout ju-around" v-for="(item,index) in lists" :key='index' @click="goclass(item)">
        		   <image :src="item.image" class="itemimg" mode=""></image>
				   <view class="text">
				   	{{item.title}}
				   </view>
        	</view>
        </view>
    </div>
</template>

<script>
	import home from '../../../vendor/home/home.js'
	import urlUtil from '../../../vendor/common/url.js'; 
export default {
name: "",
components: {

},
props: {},
data () {
  return {
	  lists:[],
	  
    }
  },
  methods: {
	  Calss() {  
	  	home.chart({
	  		data: {
	  			code: 'home_quick_nav_2'
	  		},
	  		fail: () => {
	  			uni.showToast({
	  				title:'网络错误',
					icon:'none'
	  			})
	  		},
	  		success: (res) => {
	  			if (res.statusCode != 200) return
	  			if (res.data.code != 200) return
	  			this.lists = res.data.data
	  		},
	  	})
	  },
      // 去详情
	  goclass(item){
		  
		  if(item.page){
			  urlUtil.to({
				  pageAlias : item.page,
				  options : item.params,
			  })
			  return;
		  }
		  if(item.web_url){
			  uni.navigateTo({
			  	url : '/pages/web/index/index?url='+encodeURIComponent(item.web_url),
			  })
		  }
	  }
  },
  onShow() {
  	
  },
  mounted () {
 this.Calss()
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
.boxss{
	margin-top: 20rpx;
	width: 700rpx;
	height: 253rpx;
	padding:  20rpx;
	padding-left: 25rpx;
	padding-right: 25rpx;
}
.itemimg{
	width: 58rpx;
	height: 58rpx;
}
.loyout{
   width: 20%;
   margin-bottom: 40rpx;
}
.text{
	margin-top: 10rpx;
	font-size: 28rpx;
	color: #666666;
	font-size: 26rpx ;
}
</style>
