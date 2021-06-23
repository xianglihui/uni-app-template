<template>
	<view class="currentBox">
			<view>
				<view class="currentState">
					<view class="currentText">当前进度</view>
					<view class="currentProcess">
						<view>
							<image class="currentLeft" :src="setp==1 ? iconCur : icon"></image>
						</view>
						<view class="currentLineBox"></view>
						<view>
							<image  class="currentRight" :src="setp!=1 ? iconCur : icon"></image>
						</view>
					</view>
					<view class="currentProcess current_text">
						<view class="current_LiftText">微信授权</view>
						<view class="current_rightText">联系方式</view>
					</view>
				</view>
				<view class="currentState marginTop">
					<view>
						<view class="currentText">{{setp==1 ? "微信授权" : "联系方式"}}</view>
						<view class="currentDesc">该程序将获得您的用户信息({{setp == 1 ?"昵称、头像等" : "联系方式"}})</view>
						<button v-show="setp==1" class="currentYxBtn" type="default"  @click="getuserinfo" >允许</button>
						<button v-show="setp!=1" class="currentYxBtn" type="default" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber" >允许</button>
					</view>
					<view class="flex-align-justify">
						<u-checkbox-group>
							<u-checkbox @change="change" v-model="isChecked" shape="circle" active-color="#19be6b"><text class="checkFont1">
								 请阅读并同意 
							 </text>
							 </u-checkbox>
						</u-checkbox-group>
						 <text class="checkFont2" @click="goOpen()">《xxx用户协议》</text>
					</view>
				</view>
			</view>
			
	</view>
</template>

<script>
	import weixCur from "../../../static/img/authorizationLogin/authorizationLogin_icon_l.png";
	import weix from "../../../static/img/authorizationLogin/authorizationLogin_icon_n.png";
	import {GetUserInfoHandler} from "@/common/js/loginHandler.js";
	export default {
		data() {
			return {
				checkedVal:"",
				isChecked:false,
				iconCur:weixCur,
				icon:weix,
				setp:1
			}
		},
		onLoad(){
			let _this =this;
			uni.getSetting({
			   success(res) {
				   if(res.authSetting['scope.userInfo']){
					   _this.setp = 2;
					   console.log('已经授权用户信息',res)
				   }
			   }
			})
			// console.log(this.$Route);
		},
		methods: {
			getuserinfo(){
				if(!uni.getUserProfile){
					uni.showModal({
					   title: '提示',
					   content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
					 })
					 return;
				}
				if(!this.isChecked){
					uni.showToast({
						title:"请勾选协议",
						icon:"none"
					});
					return false;
					
				}
				
				
				uni.getUserProfile({
					desc: "用于完善会员资料", // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
					success:async (res) => {
						// console.log(res);
						this.setp = 2;
					},
					fail:(err)=>{
						console.log(err);
					}
				});
				
				

				
				
				
				
			},
			getPhoneNumber(e){
				// console.log(e);
				if(!this.isChecked){
					uni.showToast({
						title:"请勾选协议",
						icon:"none"
					});
					return false;
				}
				if(e.detail.errMsg != "getPhoneNumber:ok"){
					uni.showToast({
						title:"您选择了拒绝授权",
						icon:"none"
					});
					return false;
				}
				GetUserInfoHandler(this,e);
				// console.log(e);
			},
			
			goOpen(){
        console.log('协议内容')
			},
			change(data){
				// console.log(data)
				this.isChecked =data.value;
			}
		}
	}
</script>

<style lang="scss" scoped>
.currentBox{
	background-color: #F7F7F7;
	height:100vh;
	padding:40rpx 20rpx;
}
.currentState{

	background-color: #fff;
	padding:55rpx 75rpx 50rpx;
	border-radius: 10rpx;
	.currentText{
		font-size: 40rpx;
		width: 100%;
		color:$uni-text-color;
		text-align: center;
		margin-bottom: 43rpx;
		
	}
	.currentProcess{
		display: flex;
		justify-content: space-between;
		height:84rpx;
		.currentLineBox{
			display: flex;
			flex-direction: column;
			justify-content: center;
			width:100%;
		}
		.currentLineBox:before{
			content: " ";
			border:2rpx dashed #ededed;
			width:100%;
		}
			
		image{
			display: inline-block;
			width:84rpx;
			height:84rpx;
			border-radius: 100%;
			background-size: cover;
		}
	}
	.currentTitle{
		width:100%;
		text-align: center;
	}
	.currentDesc{
		text-align: center;
		font-size: 30rpx;
	}
	
}
.currentYxBtn{
	background-color: red;
	color:#fff;
	margin-top:44rpx;
	background-image: linear-gradient(to right, #de2187 , #f33247);
	margin-bottom: 70rpx;
	border-radius: 60rpx;
}
.marginTop{
	margin-top: 20rpx;
	padding:55rpx 40rpx 50rpx;
}
.current_text{
	margin-top: 23rpx;
	view{
		font-size: 30rpx;
		color: $uni-text-color;
	}
	.current_rightText{
		margin-right: -18rpx;
	}
	.current_LiftText{
		margin-left: -18rpx;
	}
}
.checkbox{
	transform:scale(0.7);
}
.checkFont1{
	font-size: 30rpx;
	color:$uni-text-color-grey ;
}
.checkFont2{
	font-size: 30rpx;
	margin-left: -20rpx;
}

</style>
