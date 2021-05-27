<template>
	<view class="">
		<submit titel="物业留言反馈"></submit>
		<view class="flex-d al-center">
			<view class="formBox fz-14">
				<view class="itemStyle flex ju-between al-center pos-rel" @click="celClass(index)" v-for="(item,index) in formData"
				 :key="item.id">
					<view >
						{{item.label}}
					</view>
					<view class="flex al-center">
						<input :type="item.type" class="ipt fz-14" :placeholder="item.ploder" :disabled="item.dised" :value="item.value" />
						<image v-if="index == 0" class="reimg pos-abs" src="https://oss.kuaitongkeji.com/static/img/app/address/retrue.png"
						 mode=""></image>
					</view>
				</view>
				<view class="m-t2">
					<textarea placeholder="请输入详细问题信息" maxlength="200" v-model="remak" class="textAr fz-14"></textarea>
				</view>
			</view>
			<u-select v-model="show" mode="single-column" value-name="id" label-name="name" :default-value='value' :list="orgVillageLists" @confirm="confirm"></u-select>
			<view class="picturesBox flex al-center">
				<view class="" v-for="(item,index) in images" :key="item.id">
					<image :src="item" class="itemImg" :class="(index+1)%4==0?'dv':''" mode="aspectFill"></image>
				</view>
				<view class="itemImg flex al-center ju-center">
					<view @click="upPictures" class="pushBtn flex al-center ju-center">
						<view class="Hline">
					
						</view>
						<view class="Sline pos-abs">
					
						</view>
					</view>
				</view>
			</view>

			<view  @click="submit" class="">
				<view class="submit flex al-center ju-center bai">
					提交
				</view>
			</view>
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
</template>

<script>
	import submit from '../../../../components/sub-unit/subunit.vue'
	import village from '../../../../vendor/village/village.js'
	import route from '../../../../vendor/request/routes.js'
	import address from '../../../../vendor/address/address.js'
	import user from '../../../../vendor/user/userDetails.js'
	export default {
		name: "",
		components: {
			submit
		},
		props: {},
		data() {
			return {
				formData: [{
						label: '选择小区',
						value: '',
						ploder: '请选择',
						dised: true
					},
					{
						label: '联系电话',
						value: '',
						type: "text"
					}
				],
				//服务端返回的原始数据 
				orgVillageLists: [],
				show: false,
				value: [], //小区列表默认选择的对象
				ids:'',//选择的小区id
				images:[],//上传的图片
				isLoding:false,
				remak:''
			}
		},
		methods: {
			
			//提交
			submit(){
				if(this.isLoding == true)return;
				if(!this.ids){
					uni.showToast({
						title:'请选择小区',
						icon:"none"
					})
					return;
				}
				if(!this.remak){
					uni.showToast({
						title:'请输入问题信息',
						icon:"none"
					})
					return;
				}
				address.feedback({
					data:{
						village_id:this.ids,
						content:this.remak,
						files:this.images,
						tel:this.formData[1].value
					},
					fail: () => {
						uni.showToast({
							title:'网络错误',
							icon:"none"
						})
					},
					success : (res) => {
						if(res.statusCode != 200) {
							uni.showToast({
								title:'网络出错了',
								icon:"none"
							})
							return;
						}
						if(res.data.code != 200) {
							uni.showToast({
								title:res.data.msg,
								icon:"none"
							})
							return;
						}
						uni.showToast({
							title:res.data.msg,
						})
						this.remak = ""
						this.images = []
					}
				})
			},
			
			//去报修记录
			// GoRecord(){
			// 	uni.navigateTo({
			// 		url:"/pages/address/addediting/temtRecord/temtRecord"
			// 	})
			// },
			
			//打开小区选择
			celClass(index){
				if(index != 0) return;
				this.show = true
			},
			//选择地址
			confirm(e){
				this.formData[0].value = e[0].label
				this.ids = e[0].value
				let index  = e[0].extra
				if(e[0].extra == undefined){
					index = 0
				}
				this.value[0] = index
			},
			//上传图片
			upPictures(){
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
								that.images.push(jres.data.url )  
							// console.log(jres.data.url);
							res(jres);
						}
					})
				})
			},
			
			// 用户所有地址
			userAlladd(){
				 address.alladd({
				 	data: {
				 	},
				 	fail: () => {
				 		this.isLoding = false;
				 		this.stopRefreshIcon();
				 		uni.showToast({
				 			title: '网络错误',
				 			icon: 'none'
				 		})
				 	},
				 	success: (res) => {
				             
				 		if (res.statusCode != 200) return;
				 
				 		if (res.data.code != 200) return;
				 
				 		let data = res.data.data;
						var obj = {};
						data = data.reduce((item, next) => {
						   obj[next.own_village.name] ? '' : obj[next.own_village.name] = true && item.push(next);
						   return item;
						}, []);
						 data.map( (item,index) =>{
							 item.own_village.extra = index
							 this.orgVillageLists.push(item.own_village)
						 })
				 	}
				 })
			},
           // 获取用户资料
           Userdata() {
           	user.userDeta({
           		data: {},
           		fail: (err) => {
           			uni.showToast({
           				title: '网络错误',
           				icon: 'none'
           			})
           		},
           		success: (res) => {
           			if (res.statusCode != 200) return;
           			if (res.data.code != 200) return;
           			let Users = res.data.data
           			this.formData[1].value = Users.tel
           		},
           	})
           }
		},
		mounted() {
			this.userAlladd()
			this.Userdata()
		},
		onLoad(val) {
            
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
	.navBox {
		width: 30%;
		position: fixed;
		top: 0;
		right: 0;
		z-index: 99;
	}

	.remak {
		bottom: 20rpx;
		right: 50rpx;
		color: #fff;
		font-size: 15px;
	}

	.formBox {
		margin-top: 30rpx;
		width: 650rpx;
		border-radius: 10rpx;
		padding: 30rpx 20rpx;
		background: #fff;
		color: #666;
		box-shadow: 2rpx 2rpx 12rpx #d9d9d9;
	}

	.itemStyle {
		height: 80rpx;
		border-bottom: 1px solid #BFBFBF;

	}

	.ipt {
		text-align: right;
		margin-right: 40rpx;
	}

	.reimg {
		width: 20rpx;
		height: 28rpx;
		right: 0;
	}

	.xiala {
		width: 28rpx;
		height: 20rpx;
		right: 0;
	}

	.textAr {
		width: 100%;
		height: 200rpx;
		border-bottom: 1px solid #BFBFBF;
	}

	.picturesBox {
		margin-top: 30rpx;
		width: 650rpx;
		border-radius: 10rpx;
		padding: 30rpx 20rpx;
		background: #fff;
		color: #666;
		box-shadow: 2rpx 2rpx 12rpx #d9d9d9;
		flex-wrap: wrap;
	}

	.pushBtn {
		width: 100rpx;
		height: 100rpx;
		border: 8rpx solid rgb(179, 179, 179);
		border-radius: 14rpx;
	}
	
	.itemImg{
		width: 150rpx;
		height: 150rpx;
		border-radius: 10rpx;
		margin-right: 16rpx;
		margin-bottom: 10rpx;
	}
	
	.dv{
		margin-right: 0;
	}

	.Hline {
		width: 70rpx;
		height: 8rpx;
		background: rgb(179, 179, 179);
		border-radius: 20rpx;
	}

	.Sline {
		width: 8rpx;
		height: 70rpx;
		background: rgb(179, 179, 179);
		border-radius: 20rpx;
	}

	.submit {
		margin-top: 100rpx;
		width: 400rpx;
		height: 80rpx;
		border-radius: 40rpx;
		background: linear-gradient(to right, #F5000A, #FF954F);
		margin-bottom: 50rpx;
	}

	/deep/ .u-select__body__picker-view__item[data-v-a577ac80] {
		font-size: 14px !important;
		text-align: center !important;
	}


	.showBxo {
		margin-top: -10rpx;
		width: 610rpx;
		background: #fff;
		z-index: 999;
		box-shadow: 2rpx 2rpx 12rpx #d9d9d9;
		padding: 20rpx;
		border: 1px solid #eee;
		border-radius: 10rpx;
	}

	.layout {
		width: 100%;
		height: 100vh;
		position: fixed;
		top: 0;
		z-index: 99;
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
</style>
