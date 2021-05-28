<template>
  <div class="map-warp">
     <!--#ifdef H5-->
     <web-view 
       :src="url"
       @message="onMessage">
     </web-view>
     <!--#endif-->
 
     <!--#ifdef APP-PLUS-->
     <web-view src="/static/html/map.html" @message="onMessage"></web-view>
     <!--#endif-->
  
 	</div>
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
        
     }
  },
} 
</script>

<style scoped lang="scss">

</style>
