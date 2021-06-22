<template>
  <view class="map-warp">
     <web-view :src="url"  @message="Message">
     </web-view>
 
     <!--#ifdef APP-PLUS-->
     <web-view src="/static/html/map.html" @message="onMessage"></web-view>
     <!--#endif-->
  
 	</view>
</template>
 
<script>
	 
 export default {
  data() {
    return {
      height: uni.getSystemInfoSync().screenHeight,
	  url:""
    }
  },
  onLoad(val) {
  	this.url = val.url 
  },
  onReady() {
    const self = this
    //#ifdef H5
    if (window.isListen) {
      // 防止多次注册addEventListener事件
        return
    }
    window.addEventListener('message', function (event) {
    var loc = event.data;
    if (loc && loc.module == 'locationPicker') {
      self.getPositon(loc, self)
    };
      window.isListen = true
      window.removeEventListener('message', function() {}, true)
    }, false)
    //#endif
  },
  methods: {
	  Message(res){
		this.getPositon(res.detail.data[0], this)
	  },
    onMessage(res) {
      this.getPositon(res.detail.data[0], this)
    },
    getPositon(res, self) {
	   this.$store.commit("userAdd",res) 
	   if(this.$store.state.userAdd){
		   uni.navigateBack({
		   	delta: 1 
		   });
	   }
        
     },
	 //获取位置信息
	 userloca() {
	 	uni.getLocation({
	 		type: 'gcj02',
	 		altitude: true,
	 		geocode: true, //设置该参数为true可直接获取经纬度及城市信息
	 		success: (res) => {
	 		}, 
	 		fail: (err) => {
	 		}
	 	});
	 },
	
  },
  mounted() {
  //#ifdef APP-PLUS
  this.userloca()
   //#endif
  }
} 
</script>

<style scoped lang="scss">

</style>
