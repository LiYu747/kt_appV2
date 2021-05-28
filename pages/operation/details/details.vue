<template>
	<view class="">
		<subunit titel="详情" ></subunit>
		<view class="cont">
			<view class="nav flex al-center">
				<image src="https://oss.kuaitongkeji.com/static/img/app/visit/gnt.png" class="img" mode=""></image>
				<view class="text">
					{{text}}
				</view>
			</view>
			<view class="flex al-center pos-rel ipt" v-for="(item,index) in locadata" :key='item.id'>
				<view class="">
					{{item.titel}}
				</view>
				<view class="pos-abs rig"> 
					{{item.value}}
				</view>
			</view>
			<view class="line">

			</view>
			<view class="textime flex al-center">
				二维码有效时间 ：
				<view @click="opentime" class="timebox flex al-center">
					<view class="timer">
						{{valuetime}}
					</view>
					<image src="https://oss.kuaitongkeji.com/static/img/app/home/xiala.png" class="xialaimg" mode=""></image>
				</view>
			</view>
			<u-picker :default-time='invalid_at' @confirm="ok" mode="time" v-model="show" :params="params"></u-picker>
			<view v-if="redIMG.length>0" class="">
				<view class="tex1">
					补充图片
				</view>
				<view class="imgBox">
					<view class="" v-for="item in redIMG" :key="item.id">
						<image :src="item" class="redImg m-r1" mode="aspectFill"></image>
					</view>
				</view>
			</view>

			<view class="tex1">
				备注
			</view>
			<view class="frame" style="white-space:pre-wrap">
				{{remarks}}
			</view>
			<view class="tex1">
				申请结果
			</view>
			<textarea v-model="textvalue" placeholder="您可以在这里填写您不同意的原因哦" class="frame ">
             </textarea>

			<!-- 按钮 -->
			<view v-if="text == '待处理'" class="flex al-center ju-around m-t4 ">
				<view @click="pass" class="btnr flex al-center ju-center">
					<image src="https://oss.kuaitongkeji.com/static/img/app/login/ccuc.png" class="btnimg" mode=""></image>
					<view class=" pos-abs">
						通过
					</view>
				</view>
				<view @click="nopass" class="btnl flex al-center ju-center">
					不通过
				</view>
			</view>
		</view>
		<view class="boton">

		</view>
	</view>
</template>

<script>
	import subunit from '../../../components/sub-unit/subunit.vue'
	import home from '../../../vendor/home/home.js'
	export default {
		name: "",
		components: {
			subunit
		},
		props: {},
		data() {
			return {
				text: '', //结果
				remarks: '', //备注
				result: '', //结果
				textvalue: '', //结果文本域
				valuetime: '', //二维码有效时间
				show: false,
				invalid_at: '', //传的时间
				redIMG: [], //图片
				params: {
					year: true,
					month: true,
					day: true,
					hour: true,
					minute: true,
					second: true
				},
				locadata: [{
						titel: '姓名',
						value: ''
					},
					{
						titel: '手机号码',
						value: ''
					},
					{
						titel: '申请时间',
						value: ''
					},
					{
						titel: '地址',
						value: ''
					},
				],
				id: '' //传过来的id
			}
		},
		methods: {
			// 打开时间选择
			opentime() {
				this.show = true
			},
			// 确定
			ok(val) {
			
				let time = val.year + '-' + val.month + '-' + val.day + ' ' + val.hour + ':' + val.minute + ':' + val.second
				let tampLogin =  new Date(time.replace(/-/g,'/')).getTime() - new Date().getTime() 
				if(tampLogin < 0){
					uni.showToast({
						title:"选择的时间必须大于当前时间",
						icon:"none"
					})
					return;
				}else{
					this.invalid_at = time
					this.valuetime = val.year + '年' + val.month + '月' + val.day + '日' + ' ' + val.hour + ':' + val.minute + ':' + val.second
				}
			},
			// 数据
			getData() {
				uni.showLoading({
					title: '加载中...'
				})
				home.comvisitdeil({
					data: {
						id: this.id
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
						if (res.statusCode != 200) return;

						if (res.data.code != 200) return;
						// console.log(res.data.data);
						let data = res.data.data
						switch(data.verify_status){
							case 1:
							this.text = "待处理"
							break;
							case 2:
							this.text = "同意"
							break;
							case 3:
							this.text = "未同意"
							break;
						}
						this.locadata[0].value = data.own_visitor.username
						this.locadata[1].value = data.own_visitor.tel.slice(0, 3) + '****' + data.own_visitor.tel.slice(7, 11)
						this.locadata[2].value = data.created_at.slice(0, 16)
						this.locadata[3].value = data.place
						this.remarks = data.visitor_remark
						this.result = data.verify_text
						this.redIMG = data.pics
					}
				})
			},
			// 通过
			pass() {
            this.userDo(2,this.invalid_at)          
   
			},
			// 不通过
			nopass() {
				this.userDo(3,this.invalid_at)   
			},
			// 操作数据
			userDo(status,invalid) {
				if(!this.textvalue){
					switch(status){
						case 2:
						this.textvalue = "通过"
						break;
						case 3:
						this.textvalue = "未通过"
						break;
					}
				}
				uni.showLoading({
					title: '加载中...',
				})
				home.handlevisit({
					data: {
						id: this.id,
						verify_status: status,
						verify_msg: this.textvalue,
						valid_end: invalid
					},
					fail: () => {
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
						this.$store.commit('iSuserDO',status)
						uni.showToast({
							title: res.data.msg,
						});
						const time = setTimeout(() => {
							this.getData()
							clearTimeout(time)
						}, 1500)
						// console.log(res);	
					}
				})
			},
			datetime() {
				let nowDate = new Date()
				let date = {
					year: nowDate.getFullYear(),
					month: nowDate.getMonth() + 1,
					date: nowDate.getDate(),
				}
				if(date.month<10){
					date.month = "0" + date.month
				}
				this.valuetime = date.year + '年' + date.month + '月' + date.date + '日' + '23:59:00'
				this.invalid_at = date.year + '-' + date.month + '-' + date.date + ' ' + '23:59:00'
			}
		},
		mounted() {
			this.getData()
			this.datetime()
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
	.fixed {
		position: fixed;
		z-index: 9;
	}

	.topLine {
		height: 148rpx;
	}

	.cont {
		width: 710rpx;
		padding:20rpx;
	}

	.nav {
		height: 120rpx;
		border-bottom: 1rpx solid #cccccc;
		margin-bottom: 20rpx;
	}

	.img {
		width: 40rpx;
		height: 40rpx;
	}

	.text {
		font-size: 30rpx;
		margin-left: 20rpx;
		color: #F07535;
	}

	.ipt {
		height: 60rpx;
		font-size: 30rpx;
		color: rgb(165, 165, 165);
	}

	.rig {
		right: 20rpx;
	}

	.line {
		margin-top: 30rpx;
		width: 100%;
		height: 1rpx;
		background: #cccccc;
	}

	.tex1 {
		margin: 30rpx 0;
		font-size: 30rpx;
		color: rgb(165, 165, 165);
	}

	.textime {
		margin: 30rpx 0;
		font-size: 28rpx;
		color: rgb(165, 165, 165);
	}

	.frame {
		width: 94%;
		padding: 3%;
		height: 120rpx;
		border-radius: 10rpx;
		background: #FFFFFF;
		font-size: 26rpx;
		color: rgb(165, 165, 165);
		box-shadow: 2rpx 2rpx 12rpx #d9d9d9;
	}

	.btnr {
		width: 320rpx;
		height: 70rpx;
		color: #FFFFFF;
		font-size: 28rpx;
	}

	.btnimg {
		width: 320rpx;
		height: 70rpx;
	}

	.btnl {
		width: 318rpx;
		height: 68rpx;
		border-radius: 50rpx;
		border: 1rpx solid rgb(240, 117, 53);
		font-size: 28rpx;
		color: rgb(240, 117, 53);
	}

	.timebox {
		width: 460rpx;
	}

	.timer {
		width: 460rpx;
		text-align: right;
		color: #444;
		font-size: 12px;
	}

	.xialaimg {
		margin: 0 20rpx;
		width: 34rpx;
		height: 18rpx;
	}

	.textarea-placeholder {
		color: #999999;
	}

	.imgBox {
		width: 94%;
		padding: 3%;
		border-radius: 10rpx;
		background: #FFFFFF;
		font-size: 26rpx;
		color: rgb(165, 165, 165);
		box-shadow: 2rpx 2rpx 12rpx #d9d9d9;
	}

	.redImg {
		width: 130rpx;
		height: 160rpx;
		border-radius: 10rpx;
	}

	.boton {
		height: 80rpx;
	}
</style>
