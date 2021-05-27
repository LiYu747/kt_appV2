<template>
	<view>
		<subunit titel='详情'></subunit>
		<view v-if="code == 200" class="flex-d al-center">
			<view class="informationBar">
				<view class="message">
					基本信息
				</view>
				<view class="photoBox flex ju-center">
					<image :src="avatar" class="Avaimg" mode="aspectFill"></image>
				</view>
				<view class="m-t2">
					<view class="flex itemBox al-center ju-between" v-for="item in displayBox" :key='item.id'>
						<view class="">
							{{item.title}}
						</view>
						<view class="">
							{{item.content}}
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import subunit from '../../../../components/sub-unit/subunit.vue'
	import home from '../../../../vendor/home/home.js'
	export default {
		name: "",
		components: {
			subunit
		},
		props: {},
		data() {
			return {
				code:0,
				avatar:'',//头像
				displayBox: [{
						title: '姓名',
						content: ''
					},
					{
						title: '地址',
						content: ''
					},
					{
						title: '身份类型',
						content: ''
					},
					{
						title: '有效期限',
						content: ''
					},
					{
						title: '入住日期',
						content: ''
					},
					{
						title: '截止日期',
						content: ''
					}
				]
			}
		},
		methods: {
           getData(id){
			   uni.showLoading({
			   	title:'加载中'
			   })
			   home.ResidentD({
				   data:{
					   id:id
				   },
				   fail : () => {
					   uni.hideLoading()
					   uni.showToast({
					   	title: '网络错误',
					   	icon: "none"
					   })
				   },
				   success : (res) => {
					   uni.hideLoading()
					   if (res.statusCode != 200) {
					   	uni.showToast({
					   		title: '网络出错了',
					   		icon: "none"
					   	})
					   	return;
					   }
					   if(res.data.code != 200) {
						 uni.showToast({
						 	title: res.data.msg,
						 	icon: "none"
						 })
						 return;  
					   }
					   this.code = res.data.code
					   let data = res.data.data
					   	switch(data.type){
					   		case 1:
					   		data.type = '户主'
					   		break;
					   		case 2:
					   		data.type = '家庭成员'
					   		break;
					   		case 3:
					   		data.type = '租户'
					   	}
					     if(data.valid_begin){
					   	   data.valid_begin = data.valid_begin.slice(0,16)
					     }else{
					   	  data.valid_begin = '暂无'
						 }
						 if(data.valid_end){
						   data.valid_end = data.valid_end.slice(0,16)
						 }else{
						  data.valid_end = '暂无'
						 }
					   this.displayBox[0].content = data.own_user.username
					   this.displayBox[1].content = data.own_village.name
					   this.displayBox[2].content = data.type
					   switch(data.valid_type){
						   case 0:
						   this.displayBox[3].content = "永久"
						   break;
						   case 1:
						   this.displayBox[3].content = "临时"
						   break;
					   }
					   this.displayBox[4].content = data.valid_begin
					   this.displayBox[5].content = data.valid_end
					   this.avatar = data.own_user.avatar
				   }
			   })
		   }
		},
		mounted() {
          
		},
		onLoad(value) {
          this.getData(value.id)
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
	.informationBar {
		margin-top: 30rpx;
		width: 650rpx;
		background: #FFFFFF;
		border-radius: 10rpx;
		color: #666666;
		font-size: 14px;
		padding: 20rpx;
		padding-bottom: 50rpx;
		box-shadow: 2rpx 2rpx 12rpx #d9d9d9;
	}

	.message {
		color: #666666;
		font-size: 18px;
	}

	.touxImg {
		width: 140rpx;
		height: 140rpx;
	}

	.photoBox {
		margin-top: 26rpx;
		width: 100%;
	}

	.itemBox {
		width: 100%;
		height: 70rpx;
		border-bottom: 1px solid #cccccc;
	}
	
	.Avaimg{
		width: 160rpx;
		height: 160rpx;
		border-radius: 10rpx;
	}
	
</style>
