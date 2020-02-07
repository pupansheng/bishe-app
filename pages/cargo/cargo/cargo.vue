<template>
		<view class="content">
			<uni-swiper-dot :info="imageArray" :current="current" :mode="mode" :dots-styles="dotsStyles" field="content">
				<swiper class="swiper-box" @change="change">
					<swiper-item v-for="(item, index) in imageArray" :key="index">
						<view :class="item.colorClass" class="swiper-item">
							<image class="image" :src="item.url" mode="aspectFill" />
						</view>
					</swiper-item>
				</swiper>
			</uni-swiper-dot>
			<view class="title1">物品信息</view>
			<view class="cargo">
				<text>物品：{{entity.goods.name}}\n</text>
				<text>体积：{{entity.goods.volume}}L\n</text>
				<text>重量：{{entity.goods.weight}}kg\n</text>
				<text>简介：\n</text>
				<text style="border: 1px dashed  #007AFF">{{entity.goods.detail}}\n</text>
				
			</view>
			<view class="title1">收货信息</view>
			<view><uni-icons type="location" size="20" />寄件地址：{{entity.address}}</view>
			<view><uni-icons type="location" size="20"/>收货地址：{{entity.toAddress}}</view>
				<view class="title1">收货人</view>
			<view style="" class="linkPeople">
				<view><uni-icons type="contact" size="20" />收货人：{{entity.consignee.name}}</view>
				<view><uni-icons type="phone" size="20"/>收货人电话：{{entity.consignee.phone}}</view>
			</view>
			<view class="title1">货主信息</view>
			<view style="color: #0FAEFF;" class="linkPeople" @click="seeOwner()">
				<view > <uni-icons type="person" size="30"  />物品主：{{entity.tbUser.username}}</view>
			</view>
			<uni-drawer :visible="drawer">
			    <view style="padding:30rpx;">
			        <view class="title1">
						货主详细信息
					</view>
					
					<view >
						
						<view>
						  <cmd-cel-item title="头像" slot-right arrow>
						    <cmd-avatar :src="entity2.headimage"></cmd-avatar>
						  </cmd-cel-item>
						  <cmd-cel-item title="成交数" :addon="entity2.level" ></cmd-cel-item>
						  <cmd-cel-item title="昵称" :addon="entity2.username" ></cmd-cel-item>
						  <cmd-cel-item title="联系方式":addon="entity2.phone" ></cmd-cel-item>
						  
						  <view v-if="user.usertype==1">
						  <cmd-cel-item title="姓名" :addon="entity2.realname" ></cmd-cel-item>
						  <cmd-cel-item title="户籍地" :addon="entity2.nativeplace" ></cmd-cel-item>
						  <cmd-cel-item title="现居地" :addon="entity2.nowplace" ></cmd-cel-item>
						  <cmd-cel-item title="私聊" @click="talkTo(entity2)" slot-right arrow v-if="user.id!=entity.tbUser.id"></cmd-cel-item>
						 </view>
						 
						
						</view>
						
						
						
					</view>
			    </view>
			</uni-drawer>
			<view style="display: flex;justify-content: center;" v-if="entity.id!=null&&isShow2">
				<button type="primary" plain="true"  @click="fnOrder()" v-if="isShow"><uni-icons type="plus" size="30"/>顺路,我要接这单</button>
				
			</view>
		</view>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import uniCard from '@dcloudio/uni-ui/lib/uni-card/uni-card.vue'
import uniSwiperDot from "@dcloudio/uni-ui/lib/uni-swiper-dot/uni-swiper-dot.vue"
import uniIcons from "@dcloudio/uni-ui/lib/uni-icons/uni-icons.vue"
import uniDrawer from '@dcloudio/uni-ui/lib/uni-drawer/uni-drawer.vue'
import cmdCelItem from "@/components/cmd-cell-item/cmd-cell-item.vue"
import cmdAvatar from "@/components/cmd-avatar/cmd-avatar.vue"
import http from '../../../common/js/request.js';
export default {
	computed: mapState(['forcedLogin', 'hasLogin', 'userName', 'serverUrl', 'user','linkList']),
	components:{
		uniCard,
		uniSwiperDot,
		uniIcons,
		uniDrawer,
		cmdCelItem,
		cmdAvatar
	},
	data() {
		return {
			entity:{},
			info: [{
									colorClass: 'uni-bg-red',
									url: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/shuijiao.jpg',
									content: '内容 A'
								},
								{
									colorClass: 'uni-bg-green',
									url: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/muwu.jpg',
									content: '内容 B'
								},
								{
									colorClass: 'uni-bg-blue',
									url: 'https://img-cdn-qiniu.dcloud.net.cn/uniapp/images/cbd.jpg',
									content: '内容 C'
								}
			],
			dotStyle: [{
									backgroundColor: 'rgba(0, 0, 0, .3)',
									border: '1px rgba(0, 0, 0, .3) solid',
									color: '#fff',
									selectedBackgroundColor: 'rgba(0, 0, 0, .9)',
									selectedBorder: '1px rgba(0, 0, 0, .9) solid'
								},
								{
									backgroundColor: 'rgba(255, 90, 95,0.3)',
									border: '1px rgba(255, 90, 95,0.3) solid',
									color: '#fff',
									selectedBackgroundColor: 'rgba(255, 90, 95,0.9)',
									selectedBorder: '1px rgba(255, 90, 95,0.9) solid'
								},
								{
									backgroundColor: 'rgba(83, 200, 249,0.3)',
									border: '1px rgba(83, 200, 249,0.3) solid',
									color: '#fff',
									selectedBackgroundColor: 'rgba(83, 200, 249,0.9)',
									selectedBorder: '1px rgba(83, 200, 249,0.9) solid'
								}
							],
							modeIndex: -1,
							styleIndex: -1,
							current: 0,
							mode: 'default',
							dotsStyles: {},
			                imageArray:[],
							isShow:true,
							isShow2:true,
							drawer:false,
							entity2:{}
	}
	},
	methods: {
		...mapMutations(['setLinkList']),
		dateFormat(fmt, date) {
			let ret;
			const opt = {
				'Y+': date.getFullYear().toString(), // 年
				'm+': (date.getMonth() + 1).toString(), // 月
				'd+': date.getDate().toString(), // 日
				'H+': date.getHours().toString(), // 时
				'M+': date.getMinutes().toString(), // 分
				'S+': date.getSeconds().toString() // 秒
				// 有其他格式化字符需求可以继续添加，必须转化成字符串
			};
			for (let k in opt) {
				ret = new RegExp('(' + k + ')').exec(fmt);
				if (ret) {
					fmt = fmt.replace(ret[1], ret[1].length == 1 ? opt[k] : opt[k].padStart(ret[1].length, '0'));
				}
			}
			return fmt;
		},
		talkTo(to){
	    const me=this;		
		let isExists = false;
		let linkList = me.linkList;
		//此时时间
		let date = new Date();
		let time = me.dateFormat('YYYY-mm-dd HH:MM', date);
		
		
			let mes={
				type: 'chat',
				title: to.phone,
				name:to.username,
				url:[to.headimage],//头像
				history: [],
				message: '',
				time: '',
				count: null,
				stick: false, //是否为置顶状态
				disabled: false, //是否禁止滑动
				type2: 2 //普通用户类型消息,
				}
			//震动
			linkList.forEach((item,index)=>{
								
			if(item.title==to.phone){
									
			uni.navigateTo({
			url:'../../HM-chat/HM-chat?id='+index
			})
			isExists=true;
			}
								
								
								
			})
			  
			if(isExists)
			return;
			linkList.push(mes);
			this.setLinkList(linkList);
			let id=linkList.length-1;
			uni.navigateTo({
				url:'../../HM-chat/HM-chat?id='+id
			})
			
		
		},
		seeOwner(){
			
			let id=this.entity.tbUser.id;
			const that=this;
			http.get({url:'/order/getBasicInfo/'+id}).then(res=>{	
			that.entity2=res;
			},err=>{
											
			})
			this.drawer=!this.drawer	
		},
		 change(e) {
		            this.current = e.detail.current;
		        },
		 fnOrder(){
			 const that=this;
			 
			 let en={};
			 en.userid=that.user.id;
			 en.userpointid=that.entity.id;
			 en.ownerid=that.entity.tbUser.id;
			 if(en.ownerid==en.userid){
				 uni.showToast({
				 	icon:'none',
					title:'自己不能接自己发布的订单'
				 })
				 return;
			 }
			 en.goodsname=that.entity.goods.name;
			 en.goodsimage=that.entity.cargoImage;
			 en.goodsweight=that.entity.goods.weight;
			 en.goodsvolume=that.entity.goods.volume;
			 en.goodsstatus=that.entity.status;
			 let submit={
				 data:en,
				 url:'/order/add'
			 };
			 
			 http.post(submit).then(res=>{
				 
				 uni.showToast({
				 icon: 'none',
				 title: '接单成功 请刷新页面',
				 })
				 setTimeout(function() {
				  
				   uni.navigateBack({
				   delta:1
				    })
				 									 
				 }, 1500);
				 
				 
				 
			 },err=>{
				 
				 setTimeout(function() {
				 									 
				  uni.hideLoading();
				  uni.navigateBack({
				  delta:1
				   })
				 									 
				 }, 1500);
				 
			 })
			
			/* 
			 uni.request({
			 		   	url: that.serverUrl + '/order/add', //仅为示例，并非真实接口地址。
			 		   	method: 'POST',
						data:en,
			 		   	header: {
			 		   		'content-type': 'application/json'
			 		   		//自定义请求头信息
			 		   	},
			 		   	success: res => {
			 //		   		console.log(res.data)
			 
			 		   		if(res.data.status){
											 
								uni.showToast({
								icon: 'none',
								title: '接单成功 请刷新页面',
								
								complete() {
									
								
									
								}
								 });
								 
								 setTimeout(function() {
									 
									 uni.hideLoading();
									 uni.navigateBack({
									 	delta:1
									 })
									 
								 }, 1500);
								 
								
							}else{
								
								uni.showToast({
									icon: 'none',
									title: '请求失败：'+res.data.message,
									complete() {
										
									
										
									}
								});
								setTimeout(function() {
																	 
								 uni.hideLoading();
								 uni.navigateBack({
								 delta:1
								  })
																	 
								}, 1500);
								
								
							}
							
						
			 		   		
			 		   		},
			 		   	    fail: err => {
			 		   		uni.showToast({
			 		   			icon: 'none',
			 		   			title: '请求失败',
								
								
			 		   		});
			 		   		uni.hideLoading();
			 
			 		   	}
			 		   }); */
					   
					   
			 
			 
			 
			 
			 
		 },		
	},
	onLoad: function (option) { //option为object类型，会序列化上个页面传递的参数
	       const that=this
		   that.isShow=true;
		   let carId=option.id;
		   let type=option.type;
		   let submit={};
		   submit.url='/user/userPoint/findOne/'+carId;
		   submit.data={};
		   http.post(submit).then(res=>{
			   
			   that.entity=res
			   if(type){
				   that.isShow2=false;
			   }
			   if(!type)
			   if(res.status==0){
				   
			   	uni.showToast({
			   		icon:'none',
			   		title:'该包裹已被其他用户接单，暂时无法接单'
			   	})
				
			   	that.isShow=false;
			   }
			   let a=JSON.parse(res.cargoImage);
			   a.forEach(p=>{
			   	let h={colorClass: 'uni-bg-red',url:p,content: '物品详情'}
			   	that.imageArray.push(h)
			   })
			  
			   
		   },err=>{
			   
			  
			   setTimeout(function() {
			   									 
			    uni.hideLoading();
			    uni.navigateBack({
			    delta:1
			     })
			   									 
			   }, 1500);
			   
		   })
		   
		   
	     /*  uni.showLoading({
	       	title:'获取该物品详细中...'
	       })
		   let carId=option.id;
		   uni.request({
		   	url: that.serverUrl + '/user/userPoint/findOne/'+carId, //仅为示例，并非真实接口地址。
		   	method: 'POST',
		   	header: {
		   		'content-type': 'application/json'
		   		//自定义请求头信息
		   	},
		   	success: res => {
//		   		console.log(res.data)

		   		that.entity=res.data
				if(res.data.status==0){
					
					uni.showToast({
						icon:'none',
						title:'该包裹已被其他用户接单，暂时无法接单'
					})
					that.isShow=false;
					
				}
				let a=JSON.parse(res.data.cargoImage);
				a.forEach(p=>{
					let h={colorClass: 'uni-bg-red',url:that.serverUrl+'/'+p,content: '物品详情'}
					that.imageArray.push(h)
				})
		   		uni.hideLoading();

		   		},
		   	    fail: err => {
		   		uni.showToast({
		   			icon: 'none',
		   			title: '请求失败'
		   		});
		   		uni.hideLoading();

		   	}
		   });
 */


	 }
}
</script>

<style lang="scss">
	@import '../../../common/uni/uni.css';
    @import '../../../common/common.scss';
	.title1{
		@include title
	}
    .cargo{
		
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		
		
		
	}
	.linkPeople{
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
	.swiper-box {
		height: 200px;
	}

	.swiper-item {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: column;
		justify-content: center;
		align-items: center;
		background-color: $uni-text-color-grey;
		color: #fff;
	}

	.image {
		width: 750rpx;
	}

	.uni-bg-red {
		background-color: #ff5a5f;
	}

	.uni-bg-green {
		background-color: #09bb07;
	}

	.uni-bg-blue {
		background-color: #007aff;
	}

	.example-body {
		/* #ifndef APP-NVUE */
		display: flex;
		/* #endif */
		flex-direction: row;
		padding: 20rpx;
	}

	.example-body-item {

		flex-direction: row;
		justify-content: center;
		align-items: center;
		margin: 15rpx;
		padding: 15rpx;
		height: 60rpx;
		/* #ifndef APP-NVUE */
		display: flex;
		padding: 0 15rpx;
		/* #endif */
		flex: 1;
		border-color: #e5e5e5;
		border-style: solid;
		border-width: 1px;
		border-radius: 5px;
	}

	.example-body-item-text {
		font-size: 28rpx;
		color: #333;
	}

	.example-body-dots {
		width: 16rpx;
		height: 16rpx;
		border-radius: 50px;
		background-color: #333333;
		margin-left: 10rpx;
	}

	.active {
		border-style: solid;
		border-color: #007aff;
		border-width: 1px;
	}
</style>
