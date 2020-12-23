import arr from './arr.js';

class url {
	
	route = {
		//APP首页
		app_home_index : '/page/index/index',
		
		// 填写入住小区申请的页面
		apply_move_in_form : '/pages/residence/checkIn/checkIn',
		
		// 拜访其他人的记录列表页
		visit_friends_log_lists : '/pages/visitapplication/newDetalis/newDetalis',
		
		// 来拜访自己的记录列表页
		friends_visit_self_log_lists : '/pages/operation/visitRecord/visitRecord' ,
		
		// 用户的回家二维码页面
		back_home_qr : '/pages/qrcode/qrCode/qrCode',
		
		// 旅行
		travel : '/pages/classification/scenicArea/scenicArea',
		
		// 购物
		shopping : '/pages/classification/shopping/shopping',
		
		// 便利超市
		market : '/pages/classification/supermarket/supermarket',
		
		// 运动
		sport : '/pages/classification/motion/motion',
		
		// 美食
		food : '/pages/classification/deliciousFood/deliciousFood',
		
		// 交通出行
		transport : '/pages/classification/travel/travel',
		
		// 友邻
		neighbor : '/pages/communityForum/forumlists/forumlists',
		
		// 车辆
		car : '/pages/classification/vehicle/vehicle',
		
		// 茶饮 
		tea : '/pages/classification/teaBasedDrink/teaDrink',
		
		// 上门服务
		door_to_door_service : '/pages/classification/service/service'
		 
	}
	
	tabBar = [
		'app_home_index',
	]
	
	/**
	 * @param {Object} params 
	 */
	to(params){
		if( !params ) return;
		
		let pa = arr.get(params,'pageAlias','');
		
		if( !pa ) return;
		
		let u = this.route[pa];
		if( !u) return;
		
		let type = arr.get(params,'type','navigateTo');
		
		if( this.tabBar.indexOf(pa) > -1 ) type = 'switchTab';
		
		//url ?之后的部分，如 name=Tom&age=16
		let opt = arr.get(params,'options','');
		
		switch( type ){
			case 'navigateTo':
				uni.navigateTo({
					url : u + '?'+opt,
				});
				break;
			case 'redirectTo':
				uni.redirectTo({
					url : u + '?'+opt,
				});
				break;
			case 'switchTab':
				uni.switchTab({
					url : u 
				});
				break;
		}
 	}
	
	//obj = {k:v}
	build_query_str(obj){
		let q = [];
		
		for(let k in obj){
			q.push([''+k+'='+v]);
		}
		
		return q.join('&');
	}
	
	/**
	 * @param {string} path
	 * @param {string} query
	 */
	build_url(path,query){
		
	}
}

module.exports = new url;