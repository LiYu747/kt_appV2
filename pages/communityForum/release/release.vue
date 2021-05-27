<template>
	<view class="">
		<subunit titel='发布'  :retur='false'></subunit>
		<view class="flex-d color al-center"> 
			<image src="https://oss.kuaitongkeji.com/static/img/app/home/jx.png" class="img" mode=""></image>
			<view class="nav flex-d al-center">
				<view v-if="image.length===0" class="top flex al-center ju-center">
					<image class="timg" src="https://oss.kuaitongkeji.com/static/img/app/forum/tuceng.png" mode=""></image>
				</view>
				<view v-else class="back flex al-center">
					<view class="" v-for="(item,index) in image" :key='item.id'>
						<image v-if="index<3" class="itemimg" :src="item" mode="aspectFill"></image>
					</view>
				</view>
				<view @click="add" class="btn flex al-center ju-center">
					<image class="btnimg" src="https://oss.kuaitongkeji.com/static/img/app/address/plus.png" mode=""></image>
					选择文件
				</view>
			</view>
			<!-- //标题 -->
			<view class="titel flex ">
				<view class="tex1">
					标题 ：
				</view>
				<!-- <input class="ipt" v-model="title" type="text" value="" /> -->
				<textarea value="" auto-height="true" class="ipt" v-model="title" placeholder="" />
			</view>
			<!-- 标签 -->
			<view @click="show = true" class="tagbox flex pos-rel">
				<view class="tex1">
					选择类别 :
				</view>
				<view class="optbox flex">
					<view class="choiceitem" v-for="item in choiceData" :key='item.id'>
						 {{item.name}}
					</view>
				</view>
				<view class="pushtagpos pos-abs">
					<image src="https://oss.kuaitongkeji.com/static/img/app/forum/pushtag.png" class="pushtagimg" mode=""></image>
				</view>
			</view>
			<u-popup mode='bottom' height="600rpx" v-model="show">
				<view class="operation flex al-center pos-rel">
                         <view @click=" show = false" class="m-t2 m-l2">
                         	取消
                         </view>
						 <view @click="ok" class="affirm pos-abs">
						 	确认
						 </view>
				</view>
				<view class="flex showbox">
					<view class="tagitem" @click="choice(item)" v-for="item in tagdata" :class="{'pitchon':item.type==true}" :key='item.id'>
						{{item.name}}
					</view>
				</view>
			</u-popup>
			<!-- 内容 -->
			<view class="content flex">
				<view class="tex1">
					内容 :
				</view>
				<textarea class="are" v-model="content" maxlength='1000'></textarea>
			</view>
             <!-- //自己可见 -->
         <!--    <view @click="seeShow = true" class="celShow flex al-center pos-rel">
              	<image :src="seeTet.img" class="uplockImg" mode=""></image>
			  <view class=" fz-16 m-l2">
			  	{{seeTet.text}}
			  </view>
			  <image class="reimg" src="https://oss.kuaitongkeji.com/static/img/app/address/retrue.png" mode=""></image>
             </view>
			 <u-popup mode='bottom' height="400rpx" border-radius='20' v-model="seeShow">
			 	
				<view class="seeBox">
					<view class="flex al-center seeItem" @click="addCel(item,index)" v-for="(item,index) in seeList" :key='item.id'>
						<image :src="item.ref" class="uplockImg" mode=""></image>
						<view class="itemLb">
							{{item.label}}
						</view>
						<image v-show="index==idx" src="https://oss.kuaitongkeji.com/static/img/app/forum/sclyse.png" class="sclyseImg" mode=""></image>
					</view>
				</view>
				<view class="flex-d al-center">
					<view @click="seeShow = false" class="cancelBox flex al-center ju-center">
						取消
					</view>
				</view>
			 </u-popup> -->
			 
			<!-- 提交 -->
			<view @click="Submit" class="matop flex al-center ju-center">
				<image class="Submit" src="https://oss.kuaitongkeji.com/static/img/app/login/ccuc.png" mode=""></image>
				<view class="bai pos-abs">
					确认提交
				</view>
			</view>
			<view class="boot">
				
			</view>

			<view v-show="isLoding == true" class="showloding flex al-center ju-center">
				<view class="loding flex-d al-center ju-center">
					<view class=" ">
						<image class="loimg" src="https://oss.kuaitongkeji.com/static/img/app/address/loading.gif" mode=""></image>
					</view>
					上传中
				</view>
			</view>
		</view>
		<subrelease :ids='id'></subrelease>
	</view>
</template>

<script>
	import subrelease from '../../../components/sub-botn/subrelease.vue'
	import village from '../../../vendor/village/village.js';
	import route from '../../../vendor/request/routes.js';
	import subunit from '../../../components/sub-unit/subunit.vue'
	export default {
		name: "",
		components: {
			subrelease,
			subunit
		},
		props: {},
		data() {
			return {
				id: '',
				image: [],
				show: false, //弹出层的显示与隐藏
				tagdata: [
					{
					 name:'全部',
					 type:true,
					 default: true
					},
				],
				choiceData:[] ,//选中标签的数组
				title: '', // 标题
				content: '', //内容
				isLoding: false,
				choiceID:[] , //标签选中的id
				seeShow:false,
				idx:"",
				visible:'1',
				seeTet:{
					text : '公开 : 所有人可见',
					img:"https://oss.kuaitongkeji.com/static/img/app/forum/uplock.png"
				},
				seeList: [
					{
					 value: '1',
					 label: '公开 : 所有人可见',
					   ref:"https://oss.kuaitongkeji.com/static/img/app/forum/uplock.png"
					}	,
				 {
				  value: '0',
				  label: '私密 : 仅自己可见',
				  ref:"https://oss.kuaitongkeji.com/static/img/app/forum/lock.png"
				 }	,
				]
			}
		},
		methods: {
			// 选择是否可见
			addCel(item,index){
				this.idx = index
				this.seeTet.img = item.ref
				this.seeTet.text = item.label
				this.visible = item.value
				this.seeShow = false
			},

			// 选中
			choice(item) {
				if (item.default) return
				item.type = !item.type
			},
			
            // 确定选择
			ok(){
			   this.choiceData  =  this.tagdata.filter( item => {
					return item.type == true
				})
				this.choiceData.map( item => {
					if (item.default) return
					this.choiceID.push(item.id) 
				})
                this.show = false
			},
			// 上传文件
			add() {
				uni.chooseImage({
					extension: ['jpg', 'jpeg', 'png', 'gif'],
					success: (chooseImageRes) => {
						const files = chooseImageRes.tempFilePaths;
						this.isLoding = true;
						let that = this;
			
						if (files.length == 0) return;
			
						let func = [];
						files.forEach((item) => {
							func.push(that.upload(item));
						});
			
						Promise.all(func).then((res) => {
							that.isLoding = false;
						}).catch((err) => {
							that.isLoding = false;
							uni.showModal({
								title: "上传文件出错:" + err,
							})
						})
					}
				})
			},
			upload(fileItem) {
				let that = this;
				return new Promise((res, rej) => {
					uni.uploadFile({
						url: route.services.file.upload,
						filePath: fileItem,
						name: 'file',
						fail: (err) => {
							// that.isLoding = false;
							rej('网络出错');
						},
						success: (val) => {
							// that.isLoding = false;
							if (val.statusCode != 200) {
								rej(val.statusCode);
								return;
							}
			
							let jres = JSON.parse(val.data);
			
							if (jres.code != 200) {
								rej(jres.msg);
								return;
							}
								that.image.push(jres.data.url ) 
							// console.log(jres.data.url);
							res(jres);
						}
					})
				})
			},

			// 发布
			Submit() {
				if (this.isLoding == true) return;
				if(this.title == ''){
					uni.showToast({
						title:"请填写标题",
						icon:"none"
					})
					return;
				}
				if(this.content == ''){
					uni.showToast({
						title:"请填写内容",
						icon:"none"
					})
					return;
				}
				uni.showLoading({
					title: '提交中...'
				})
				village.releasePost({
					data: {
						village_id: this.id,
						title: this.title,
						content: this.content,
						cate_id:this.choiceID,
						// visible: this.visible,
						album:this.image
					},
					fail: (err) => {
						uni.hideLoading()
						uni.showToast({
							title: '网络错误',
							icon: 'none'
						})
					},
					success: (res) => {
						uni.hideLoading()
						if (res.statusCode != 200) {
							uni.showToast({
								title: '网络请求出错',
								icon: 'none'
							});
							return;
						}
						if (res.data.code != 200) {
							uni.showToast({
								title: res.data.msg,
								icon: 'none'
							});
							return;
						}
						uni.showToast({
							title: res.data.msg,
							duration: 2000,
						})
						// 清空
						this.image = []
						this.title = ''
						this.content = ''
						this.choiceData = []
						// console.log('发布帖子', res);
					}
				})
			},
			
			//获取默认栏目列表
			grtColumn(){
				village.DefaultColumnList({
					data:{},
					fail: () => {
						uni.showToast({
							title:'网络错误',
							icon:'none'
						})
					},
					success: (res) => {
						if(res.statusCode != 200) return;
						if(res.data.code != 200) return;
						res.data.data.map( item => {
							item.type = false
						})
						this.tagdata = this.tagdata.concat(res.data.data) 
						// console.log(this.tagdata );
					}
				})
			}
		},
		onShow() {
			
		},
		mounted() {
           this.grtColumn()
		},
		onLoad(val) {
			this.id = val.id
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
	.fidex{
		position: fixed;
		z-index: 9;
	}
	.line{
		height: 148rpx;
	}
	.color {
		color: #666666;
	}

	.img {
		width: 100%;
		height: 156rpx;
	}

	.nav {
		width: 689rpx;
		padding: 30rpx 0;
		border-radius: 20rpx;
		background: #FFFFFF;
		position: relative;
		top: -125rpx;
		box-shadow: 2rpx 2rpx 12rpx #d9d9d9;
	}

	.top {
		margin-top: 28rpx;
		width: 328rpx;
		height: 182rpx;
		background: rgba(9, 9, 9, 0.1);
	}

	.back {
		margin-top: 28rpx;
		background: #FFFFFF;
		height: 182rpx;
	}

	.itemimg {
		width: 180rpx;
		height: 180rpx;
		margin-right: 10rpx;
		border-radius: 10rpx;
	}

	.timg {
		width: 152rpx;
		height: 131rpx;
	}

	.btn {
		margin-top: 24rpx;
		width: 326rpx;
		height: 56rpx;
		border-radius: 28rpx;
		background: #F07535;
		color: #FFFFFF;
	}

	.btnimg {
		width: 29rpx;
		height: 29rpx;
		margin-right: 20rpx;
	}

	.titel {
		margin-top: -100rpx;
		width: 649rpx;
		background: #FFFFFF;
		border-radius: 10rpx;
		box-shadow: 2rpx 2rpx 12rpx #d9d9d9;
		padding: 20rpx;
		color: #666666;
	}
	
	.tex1 {
		font-size: 16px;
	}

	.ipt {
		font-size: 14px;
		width: 500rpx;
		margin-top: 5rpx;
		// background: red;
	}
	
	.celShow{
		margin-top: 20rpx;
		width: 649rpx;
		height: 80rpx;
		background: #FFFFFF;
		border-radius: 10rpx;
		box-shadow: 2rpx 2rpx 12rpx #d9d9d9;
		padding: 0 20rpx;
		color: #666666;
	}

	.content {
		margin-top: 30rpx;
		width: 649rpx;
		height: 210rpx;
		padding: 20rpx;
		background: #FFFFFF;
		border-radius: 10rpx;
		box-shadow: 2rpx 2rpx 12rpx #d9d9d9;
	}

	.are {
		margin-top: 5rpx;
		margin-left: 10rpx;
		height: 200rpx;
		width: 550rpx;
		font-size: 14px;
		align-content: center;
	}

	.matop {
		margin-top: 40rpx;
		font-size: 30rpx;
	}

	.Submit {
		width: 400rpx;
		height: 70rpx;

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

	.tagbox {
		margin-top: 20rpx;
		padding: 20rpx;
		width: 649rpx;
		background: #FFFFFF;
		border-radius: 10rpx;
		box-shadow: 2rpx 2rpx 12rpx #d9d9d9;
	}

	.pushtagimg {
		width: 40rpx;
		height: 40rpx;
	}

	.pushtagpos {
		right: 20rpx;
	}

	.showbox {
		flex-wrap: wrap;
		color: #666666;
	}

	.tagitem {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 148rpx;
		height: 70rpx;
		font-size: 13px;
		border-radius: 10rpx;
		background: #EEEEEE;
		margin-left: 30rpx;
		margin-top: 30rpx;
	}

	.pitchon {
		background: #F07535;
		color: #fff;
	}
	
	.affirm{
		top: 20rpx;
		right: 20rpx;
		color: rgb(50,150,250);
	}
	
	.optbox{
		width: 480rpx;
		flex-wrap: wrap;
	}
	
	.choiceitem{
		display: flex;
		justify-content: center;
		margin-left: 10rpx;
		margin-bottom: 10rpx;
		align-items: center;
		border: 1px solid #CCCCCC;
		font-size: 24rpx;
		width: 140rpx;
		height: 40rpx;		
	}
	.boot{
		height: 150rpx;
	}
	
	.uplockImg{
		width: 30rpx;
		height: 30rpx;
		}
		
	 .reimg {
		 position: absolute;
		 right: 30rpx;
	 	width: 18rpx;
	 	height: 25rpx;
	 }	
	 
	 .seeBox{
		 padding: 40rpx;
		 padding-right: 0;
	 }
	 
	 .seeItem{
		 height: 90rpx;
		 font-size: 14px;
	 }
	 
	 .itemLb{
		 margin-left: 10rpx;
		 display: flex;
		 align-items: center;
		 width: 100%;
		 height: 90rpx;
		 border-bottom: 1px solid #EEEEEE;
	 }
	 
	 .sclyseImg{
		 width: 44rpx; 
		 height: 44rpx;
		 position: absolute;
		 right: 30rpx;
	 }
	 
	 .cancelBox {
	 	width: 90%;
	 	height: 80rpx;
	 	background: rgb(236, 234, 245);
	 	position: absolute;
	 	bottom: 20rpx;
	 	border-radius: 10rpx;
	 }
</style>
