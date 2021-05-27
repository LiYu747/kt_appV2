
<script>
	import cache from 'vendor/cache/cache.js'
	export default {
		onLaunch: function() {
			console.log('App Launch')
			// if(!cache.get('first')){
			//   cache.set('Gshow',{'key':'开启',value:0})
			// }
			// #ifdef APP-PLUS
			// if(cache.get('first')){
			// 	cache.forget('Gshow')
			// }
			// #endif
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
	
	}
</script>

<style lang="scss">
	/*每个页面公共css */
	page {
	background-color: #FFFFFF;
	}
	@import './style/common.css';
	@import 'uview-ui/theme.scss'
</style>
