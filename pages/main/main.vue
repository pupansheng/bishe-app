<template>
	<view class="content">
		<view class="page-body">
			<view class="page-section page-section-gap">
				<map :style="{ width: '100%', height: wH-8 + 'px' }" @markertap="markClick" :latitude="latitude" :longitude="longitude" :circles="circles" :markers="covers"></map>
		     	
			</view>
			
			
		</view>
		
		<view class="view2">
			
			
			
			<view v-show="step[0]">
				<wuc-tab :tab-list="carList" :tabCur.sync="TabCur" @change="tabChange"></wuc-tab>
				<view>
					<swiper :current="TabCur" duration="300" @change="swiperChange">
						<swiper-item v-for="(item, index) in carList" :key="index">
							<view style="display: flex;align-items: flex-start;margin-right: 3rpx;">
								<view>
							      <image style="width:450rpx;height: 260rpx ;margin-top: 0rpx;padding-top: 0rpx; background-color: #eeeeee;" :src="item.url" mode="aspectFit"></image>
								</view>
								<view>
									<!-- <p>车型：{{ item.name }}</p>
									<p>起步价：${{ item.startPrice }}RMB</p>
									<p>均价价：${{ item.averagePrice }}RMB</p>
									<p>起步距离:{{ item.startDistance }}m</p> -->
									{{item.desc}}
								</view>
								
							</view>
						</swiper-item>
					</swiper>
				</view>
			</view>
			
			<view v-show="step[1]">
				<scroll-view :scroll-top="wH" scroll-y="true" class="scroll-Y" v-if="TabCur==0">
					<view class="uni-form-item uni-column">
						<view class="title" >货物名称:</view>
						<input class="uni-input" placeholder="货物名称" v-model="userPoint.goods.name" />
					</view>
				<!-- 	<view class="uni-form-item uni-column">
					<view class="title" ><span style="color: red;">*</span>货物体积</view>
						<input class="uni-input" placeholder="货物体积" v-model="userPoint.goods.volume" />
					</view>
					<view class="uni-form-item uni-column">
						<view class="title" ><span style="color: red;">*</span>货物重量</view>
						<input class="uni-input" placeholder="货物质量" v-model="userPoint.goods.weight" />
					</view>
					 -->
					<view style="display: flex;align-items: center;justify-content: space-between;margin-top: 15rpx;">
						
						<view  class="title" style="margin-left: 25rpx;">体积:</view>
						<uni-number-box step="0.1" @change="bindChange1"></uni-number-box>升
			
					</view>
					<view style="display: flex;align-items: center;justify-content:  space-between;margin-top: 15rpx;margin-bottom: 10rpx;">
							<view class="title" style="margin-left: 25rpx;" >重量:</view>
						    <uni-number-box step="0.1" @change="bindChange2"></uni-number-box>kg
					</view>
                     
                       <view class="uni-form-item uni-column">
                       <view class="title" >货物图片:</view>
                        <QSPics :name="name" variableName="pics"  :exists="false"   :typeName="'cargoImage'" @upload="uploadImage" v-model="cargoImage"></QSPics>
                   	
                       </view>
					<view class="uni-form-item uni-column">
						<view class="title" >货物描述:</view>
						<textarea class="uni-input" style="height: 100rpx;width: 100%;" placeholder="货物描述" v-model="userPoint.goods.detail" />
					</view>
					<hr/>
					<!-- <view class="uni-form-item uni-column">
						<view class="title" style="color: red;">*收货人</view>
						<input class="uni-input" placeholder="收货人" v-model="userPoint.consignee.name" />
					</view>
					<view class="uni-form-item uni-column">
						<view class="title" style="color: red;">*收货人电话</view>
						<input class="uni-input" placeholder="收货人电话" v-model="userPoint.consignee.phone" />
					</view> -->
					<view  style="display: flex;align-items: center;justify-content: space-between;margin-top: 15rpx;">
						<view>&nbsp;&nbsp;</view><view  class="title"><uni-icons type="person" size="20" style="margin-left: 20rpx;"/>收货人员:&nbsp;</view><input class="uni-input" placeholder="收货人" v-model="userPoint.consignee.name" />
					</view>
					<view style="display: flex;align-items: center;justify-content: space-between;margin-top: 15rpx;">
						
						<view  class="title"><uni-icons type="phone" size="20" style="margin-left: 20rpx;"/>联系电话:</view><input class="uni-input" placeholder="收货人电话" v-model="userPoint.consignee.phone" />
					</view>
					<view class="uni-form-item uni-column" style="margin-top: 1rpx;padding-top: 2rpx;">
						<view class="title"><uni-icons type="location" size="20" />放货地址:</view>
						<input class="uni-input" placeholder="收货地址" v-model="userPoint.address" @click="searAddress(1)"/>
						<!-- <ul>
							<li v-for="(v,k) in addressList1" @click="addressSelect(v,k,1)">{{v.name}}</li>
						</ul> -->						
					</view>
					<view class="uni-form-item uni-column">
						<view class="title"><uni-icons type="location" size="20" />收货地址:</view>
						<input class="uni-input" placeholder="收货地址" v-model="userPoint.toaddress"  @click="searAddress(2)" />
						<!-- <ul>
							<li v-for="(v,k) in addressList2" @click="addressSelect(v,k,2)">{{v.name}}</li>
						</ul> -->
					</view>
					
				</scroll-view>
				
				<scroll-view    :scroll-top="wH" scroll-y="true" class="scroll-Y" v-if="TabCur==1">
				
				<view style="display: flex;justify-content: center;flex-direction: column;align-items: center;align-content: center;">
					 
				<view class="uni-form-item uni-column">
					 <view class="title">输入目的地：</view>
					 <input  class="uni-input"  placeholder="目的地 由此检索出与你相同路线的包裹" v-model="tempEntity.address" @click="chooseToAddress()" />
				</view>
				 <view style="display: flex;justify-content: space-around;">
				<button type="primary" style="align-self: flex-end;" size="mini" v-show="TabCur==1" @click="preStep()">返回</button>
				<button type="primary" style="align-self: flex-end;" size="mini" v-show="TabCur==1" @click="searchCargo()"><icon type="search" size="10" />点击搜索附近📦</button>
				</view>
					
				</view>
				
				
				
					
				</scroll-view>
			</view>


			<view v-show="step[2]" >
				<scroll-view :scroll-top="wH" scroll-y="true" class="scroll-Y" v-if="TabCur==0">
					<view  style="text-align: center; margin-top: 100rpx;" >
						
						<!-- <p>车型：--------------------------------------------{{ carList[TabCur].name }}</p>
						<p>起步价:-------------------------------------------${{ carList[TabCur].startPrice }}元</p>
						<p>均价价:-------------------------------------------${{ carList[TabCur].averagePrice }}元</p>
						<p>起步距离:-----------------------------------------{{ carList[TabCur].startDistance }}米</p>
						<p>预计距离:-----------------------------------------{{ carList[TabCur].startDistance }}米</p>
						<p>预计运时:-----------------------------------------{{Math.round(aroundTime/60) }}分</p>
						<p>预计费用:-----------------------------------------${{ userPoint.money }}元</p>
						 -->
						 <view>预计费用:{{'暂无'}}</view>
						
					</view>
				</scroll-view>
				
				<scroll-view :scroll-top="wH" scroll-y="true" class="scroll-Y" v-if="TabCur==1">
				
				</scroll-view>
			</view>

			<view style="display: flex;flex-direction: row;justify-content: space-between;">
				<button type="primary" style="align-self: flex-end;" size="mini" @click="preStep()" v-show="curStep != 0&&TabCur==0">上一步</button>
				<button type="primary" style="align-self: flex-end;" size="mini" v-show="curStep == 2&&TabCur==0" @click="searchCar()">发布订单</button>
				<button type="primary" style="align-self: flex-end;" size="mini" @click="nextStep()" v-show="curStep != 2&&TabCur==0">下一步</button>
				<button type="primary" style="align-self: flex-end;" size="mini" @click="nextStep()" v-show="curStep != 1&&TabCur==1">下一步</button>
				
			</view>
		</view>
		
	</view>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import uniSegmentedControl from '@dcloudio/uni-ui/lib/uni-segmented-control/uni-segmented-control.vue';
import wucTab from '@/components/wuc-tab/wuc-tab.vue';
import QSInput from '@/components/QS-inputs-split/elements/QS-input/index.vue';
import QSTextarea from '@/components/QS-inputs-split/elements/QS-textarea/index.vue';
import uniPopup from "@dcloudio/uni-ui/lib/uni-popup/uni-popup.vue"
import uniList from "@dcloudio/uni-ui/lib/uni-list/uni-list.vue"
import uniListItem from "@dcloudio/uni-ui/lib/uni-list-item/uni-list-item.vue"
import uniDrawer from '@dcloudio/uni-ui/lib/uni-drawer/uni-drawer.vue'
import QSPics from '@/components/QS-inputs-split/elements/QS-pics/index.vue';
import uniIcons from "@dcloudio/uni-ui/lib/uni-icons/uni-icons.vue"
import uniNumberBox from "@dcloudio/uni-ui/lib/uni-number-box/uni-number-box.vue"
import http from '../../common/js/request.js';


export default {
	computed: mapState(['forcedLogin', 'hasLogin', 'userName', 'serverUrl', 'user']),
	components: {
		wucTab,
		QSInput,
		QSTextarea,
		uniPopup,
		uniList,
		uniListItem,
		uniDrawer,
		 QSPics,
		 uniIcons,
		 uniNumberBox 
	},
	data() {
		return {
			visible:false,
			curStep: 0,
			step: [true, false, false],
			step2:[false,false],
			title: 'map',
			phoneReg: /^[1](([3][0-9])|([4][5-9])|([5][0-3,5-9])|([6][5,6])|([7][0-8])|([8][0-9])|([9][1,8,9]))[0-9]{8}$/,
			latitude: 39.909,
			longitude: 116.39742,
			cargoImage: [{ name: 'cargoImage' },{ name: 'cargoImage2' },{ name: 'cargoImage3' }],
			covers: [
				{
					id: 1,
					title: '当前位置',
					latitude: 39,
					longitude: 116,
					iconPath: '../../static/img/location_self.png'
					}
			],
			circles: [
				{
					id: 1,
					latitude: 39,
					longitude: 116,
					radius: 1000,
					fillColor: '#FFFFF00'
				}
			],
			wH: '',
			addressList1:[],
			addressList2:[],
			carList: [
				{
					name: '我要寄货',
					url: '../../static/img/car/ji.jpg',
					startPrice: 50,
					startDistance: 500,
					averagePrice: 10,
					desc:'注册要到某地的信息，等顺路人拿走您的包裹，送到你的目的地'
				},
				{
					name: '我要带货',
					url: '../../static/img/car/na.jpg',
					startPrice: 50,
					startDistance: 500,
					averagePrice: 10,
					desc:'前往到某地，顺便帮助途中路径的包裹，收取一定费用'
				}
			],
			TabCur: 0,
			aroundTime:'',
			imageArray:[],
			userPoint:{
				consignee:{
					name:'',
					phone:''
				},
				goods:{
					name:'',
					volume:'',
					weight:'',
					detail:''
				},
				tbuser:{},
				distance:'',
				address:'',
				toaddress:'',
				money:'',
				distance:'',
				cargoImage:'',
				location:{
					type:'',
					coordinates:[]
				},
				location2:{
					type:'',
					coordinates:[]
				}
			},
			entity:{
				
			},
			tempEntity:{
				address:'',
				latitude:'',
				longitude:''
			}
		};
	},
	methods: {
		...mapMutations(['login', 'updateUser','setToken','setLinkList']),
		bindChange1(v){
			
			this.userPoint.goods.volume=v
			
		},
		bindChange2(v){
			
			this.userPoint.goods.weight=v;
		},
		chooseToAddress(){
			let that=this;
			uni.chooseLocation({
				success:function(res) {
					
					
					let lat=res.latitude;
					let lon=res.longitude;
					
					//中文地址
					 var address=res.address;
					 var addressStr='';
					 for(var att in address){
						 if(address[att]!=undefined)
						 addressStr+=address[att];
					 }
					
					that.tempEntity.address=addressStr;
					that.tempEntity.latitude=lat;
					that.tempEntity.longitude=lon;
					
					
				}
			})
			
			
		},
		uploadImage(typeNname, url) {
			
			this.imageArray.push(url)
		},
		markClick(id){
			let carId=id.markerId;
			uni.navigateTo({
				url:'../cargo/cargo/cargo?id='+carId
			})	
		},
		searAddress(type){
			
			var add={};
			if(type==1)
			var keyword=this.userPoint.address;
			else
			var keyword=this.userPoint.toaddress;
			var that=this;
			
			uni.chooseLocation({
				
			    success: function (res) {
			       add.name=res.name;
			       add.address=res.address;
			       add.latitude=res.latitude;
			       add.longitude=res.longitude;
				   
				   //中文地址
				    var address=res.address;
				    var addressStr='';
				    for(var att in address){
				   	 if(address[att]!=undefined)
				   	 addressStr+=address[att];
				    }
				   
				   
				   if(type==1){
				   	
				   	that.userPoint.address=addressStr;
				   	var location={};
				   	location.type="Point";
				   	location.coordinates=[add.longitude,add.latitude];
					//更新地图中间点
					that.latitude=add.latitude;
					that.longitude=add.longitude;
					//当前位置坐标
					that.covers[0].longitude = add.longitude;
					that.covers[0].latitude = add.latitude;
					that.circles[0].longitude = add.longitude;
					that.circles[0].latitude = add.latitude;
				   	that.userPoint.location=location;
				   }
				   if(type==2){
				   	that.userPoint.toaddress=addressStr;
				   	var location={};
				   	location.type="Point";
				   	location.coordinates=[add.longitude,add.latitude];
				   	that.userPoint.location2=location;
					
				   }
				   
				   
			    }
			});
			
			
		},
		nextStep() {
			if(this.user.status!=1){			 
				 uni.showToast({
					icon:'none',
					title:'暂未通过审核，请前往填写个人资料以备工作人员审核'
				   })
				 return;
			}
			
			if (this.curStep == 2) return;

            if(this.curStep==1){
				
				if(this.TabCur==0){//寄货
				
				  
					 
					if(!this.checkInput())
					return;
					
					 uni.hideLoading();
					 var that=this;
					 var param={
							mode:'driving',
							key:'LHYBZ-SYJLJ-VDKFC-F2KAI-WACOK-S6FMJ',
							from:that.userPoint.location.coordinates[1]+","+that.userPoint.location.coordinates[0],
							to:that.userPoint.location2.coordinates[1]+","+that.userPoint.location2.coordinates[0],
							output:'JSON',
						}
						
					//获取距离数据
					uni.request({
						url: 'https://apis.map.qq.com/ws/distance/v1/', //仅为示例，并非真实接口地址。
						//url: 'http:// apis.map.qq.com/ws/distance/v1/matrix/',
						method:'GET',
						data: param,
						header: {
							//自定义请求头信息
						},
						success: res => {
							
//							console.log(res.data)
							
							
							var distance=res.data.result.elements[0].distance;
							var time=res.data.result.elements[0].duration;
							that.aroundTime=time;
							that.userPoint.distance=distance;
							if(distance>that.carList[that.TabCur].startDistance)
							that.userPoint.money=that.carList[that.TabCur].startPrice+(distance-that.carList[that.TabCur].startDistance)*that.carList[that.TabCur].averagePrice;
							else
							that.userPoint.money=that.carList[that.TabCur].startPrice;
							
//							console.log(that.userPoint)
							this.curStep++;
							for (var i = 0; i < 3; i++) {
								if (i == this.curStep) this.step[i] = true;
								else this.step[i] = false;
							}
							
							
						},
						fail: err => {
							
							uni.showToast({
								icon: 'none',
								title: '请求距离失败,仅支持10公里计算距离'
							});
							this.curStep++;
							for (var i = 0; i < 3; i++) {
								if (i == this.curStep) this.step[i] = true;
								else this.step[i] = false;
							}
						}
					});
					
					
				}
				else{//送货
					
					
					
					
					
					
				}
				
				
			}else{
				this.curStep++;
				for (var i = 0; i < 3; i++) {
					if (i == this.curStep) this.step[i] = true;
					else this.step[i] = false;
				}
			}

			
			
		},
		preStep() {
			if (this.curStep == 0) return;
			this.curStep--;
			for (var i = 0; i < 3; i++) {
				if (i == this.curStep) this.step[i] = true;
				else this.step[i] = false;
			}
		},
		tabChange(index) {
			this.TabCur = index;
		},
		swiperChange(e) {
			let { current } = e.target;
			this.TabCur = current;
		},
		toLogin() {
			console.log('是否强制登录？------' + this.forcedLogin);
			if (!this.forcedLogin) {
				uni.showModal({
					title: '未登录',
					content: '您未登录，需要登录后才能继续',
					/**
					 * 如果需要强制登录，不显示取消按钮
					 */
					showCancel: !this.forcedLogin,
					success: res => {
						if (res.confirm) {
							/**
							 * 如果需要强制登录，使用reLaunch方式
							 */
							if (this.forcedLogin) {
								uni.reLaunch({
									url: '../login/login'
								});
							} else {
								uni.navigateTo({
									url: '../login/login'
								});
							}
						}
					}
				});
			} else {
				uni.reLaunch({
					url: '../login/login'
				});
			}
		},
		searchCargo(){
			
			if(!this.tempEntity.latitude||!this.longitude){
				
				uni.showToast({
					icon: 'none',
					title: '请先选择目的地'
				});
				return;
			}
			const that=this;
			that.covers.splice(1,that.covers.length-1)
			let lo = that.tempEntity.longitude;
			let lat =that.tempEntity.latitude;
			/* if(!that.latitude||!that.longitude){
				
				uni.getLocation({
					type: 'gcj02',
					geocode: true,
					success: function(res) {
						lo = res.longitude;
						lat = res.latitude;	
					}
				});
			} */
			let range=10000;//单位m
			
			let submit={};
			    submit.url='/user/userPoint/getNearCargo/'+lat+'/'+lo+'/'+range;
				submit.data=that.userPoint;
				submit.title='检索数据中'
			http.postWithNoStatus(submit).then(res=>{
				
				let data=res.data.content;
				data.forEach(p=>{
					
				   let location=p.content.location;
					
					var mark = {
						id: p.content.id,
						title: p.content.goods.name,
						latitude: location.coordinates[1],
						longitude:location.coordinates[0],
						iconPath:'../../static/img/car/cargo.png'
						
					};
										
					that.covers.push(mark);
					
				})
				
				uni.showToast({
					icon: 'none',
					title: '请求成功！检索到与你目的地一致的包裹：'+data.length+'  请查看地图查看包裹所在地'
				});
				that.curStep=0
				that.step[1]=false;
				that.step[2]=false;
				that.step[0]=true;
				
			},err=>{
				
				uni.showToast({
					icon: 'none',
					title: '请求失败：'+err
				});
				
			});	
			
			
		/* 	uni.request({
				url: that.serverUrl + '/user/userPoint/getNearCargo/'+lat+'/'+lo+'/'+range, //仅为示例，并非真实接口地址。
				method: 'POST',
				data: that.userPoint,
				header: {
					'content-type': 'application/json'
					//自定义请求头信息
				},
				success: res => {
					console.log(res.data)
					
					let data=res.data.content;
					data.forEach(p=>{
						
					   let location=p.content.location;
						
						var mark = {
							id: p.content.id,
							title: p.content.goods.name,
							latitude: location.coordinates[1],
							longitude:location.coordinates[0],
							iconPath:'../../static/img/car/cargo.png'
							
						};
											
						that.covers.push(mark);
						
					})
					
					
					uni.hideLoading();
					uni.showToast({
						icon: 'none',
						title: '请求成功！检索到与你目的地一致的包裹：'+data.length
					});
					that.curStep=0
					that.step[1]=false;
					that.step[2]=false;
					that.step[0]=true;
					},
				    fail: err => {
					uni.showToast({
						icon: 'none',
						title: '请求失败'
					});
				}
			}); */
			
			
			
			
			
		},
		searchCar(){
			
		
		//检查必填项
		if(this.checkInput()){
			var that=this;
			uni.showModal({
			    title: '提示',
			    content: '确认提交订单?提交后将可能被顺路者申请交易,请注意及时回复',
			    success: function (res) {
			        if (res.confirm) {
						
					   that.userPoint.user_id=that.user.id;
					   that.userPoint.tbUser=that.user;
					   that.userPoint.cargoImage=JSON.stringify(that.imageArray)
					   that.userPoint.status=1;
					   
					   let submit={};
					       submit.url='/user/userPoint/save';
						   submit.data=that.userPoint;
						   submit.title='提交中'
						http.postWithNoStatus(submit).then(res=>{
							if(res.data.status){
							uni.showToast({
									icon: 'none',
									title: '提交成功'
								});
								that.curStep=0
								that.step[1]=false;
								that.step[2]=false;
								that.step[0]=true;
								that.userPoint={};
								console.log(res.data.data)
								
								
							}else{
								uni.showToast({
									icon: 'none',
									title: '请求失败'
								});	
							}
							
						},err=>{
							
							uni.showToast({
								icon: 'none',
								title: '网络请求失败:'+err
							});
							
							
						})   
					   
					   
					  /* uni.request({
					   	url: that.serverUrl + '/user/userPoint/save', //仅为示例，并非真实接口地址。
					   	method: 'POST',
					   	data: that.userPoint,
					   	header: {
					   		'content-type': 'application/json'
					   		//自定义请求头信息
					   	},
					   	success: res => {
					   		if(res.data.status){
					   			
								uni.hideLoading();
								uni.showToast({
									icon: 'none',
									title: '保存成功'
								});
								that.curStep=0
								that.step[1]=false;
								that.step[2]=false;
								that.step[0]=true;
								that.userPoint={};
								console.log(res.data.data)
								
								
					   		}else{
					   			uni.showToast({
					   				icon: 'none',
					   				title: '请求失败'
					   			});	
					   	    }
					   		
					   		},
					   	    fail: err => {
					   		uni.showToast({
					   			icon: 'none',
					   			title: '网络请求失败:'+err
					   		});
					   	}
					   }); */
					   
					   
					   
			        } else if (res.cancel) {
			            return;
			        }
			    }
			});
			
		
		}
		else
		return;
			
			
			
		},
		checkInput(){
			
			if(this.userPoint.goods.name==''){
				
				uni.showToast({
					icon: 'none',
					title: '请填写货物名'
				});
				return false;
			}
			if(this.userPoint.goods.weight==''){
				
				uni.showToast({
					icon: 'none',
					title: '请填写货物重量'
				});
				return false;
			}
			if(this.userPoint.goods.volume==''){
				
				uni.showToast({
					icon: 'none',
					title: '请填写货物体积'
				});
				return false;
			}
			if(this.imageArray.length==0){
				uni.showToast({
					icon: 'none',
					title: '至少上传一张物品图片'
				});
				return false;
			}
			if(this.userPoint.consignee.name==''){
				
				uni.showToast({
					icon: 'none',
					title: '请填写收货人姓名'
				});
				return false;
			}
			if(this.userPoint.consignee.phone==''){
				
				uni.showToast({
					icon: 'none',
					title: '请填写收货人联系电话'
				});
				
				
				return false;
			}
			if (!this.phoneReg.test(this.userPoint.consignee.phone)){
				
				uni.showToast({
					icon: 'none',
					title: '联系电话格式错误'
				});
				
				return false;
				
			}
			
			if(this.userPoint.toaddress==''){
				
				uni.showToast({
					icon: 'none',
					title: '请填写目的地址'
				});
				return false;
			}
			if(this.userPoint.address==''){
				
				uni.showToast({
					icon: 'none',
					title: '请填写寄件地址'
				});
				return false;
			}
			
			return true;
			
		}
	},
	onLoad() {

		
		
		const Sys = uni.getSystemInfoSync();

		const wH = Sys.windowHeight;
		this.wH = wH / 2;

		if (!this.hasLogin) {
			//首先查看storge里的token
			try {
				const value = uni.getStorageSync('token');
				var that = this;
				if (value) {
				
				        this.setToken(value);
					let submit={};
					    submit.url='/user/login/getUserInfo';
						submit.title='自动登陆中'
					http.getWithNoStatus(submit).then(res=>{

						if (res.data.status==true) {
							console.log(res.data);
							var seser =res.data.data;
							this.login(seser.username);
							that.updateUser(seser);
							
							//获取历史记录
							let submit2={};
							    submit2.url="/chatHistory/get"
							    submit2.data={
									id:seser.phone
								}
							http.backPost(submit2).then(res=>{
								
								if(res.data.status==true){
									
								if(res.data.data){
								let chat=res.data.data
								that.setLinkList(chat);
								}
								 let username= that.user.username;
								 console.log("tim开始登陆--------------------有token分支：username="+username)
								 that.$conn.open({
								 	apiUrl: that.$im.config.apiURL,
								 	user: seser.phone,
								 	pwd: seser.phone,
								 	grant_type: 'password',
								 	appKey: that.$im.config.appkey
								 });
									
									
								}else{
									
									uni.showToast({
										icon:'none',
										title:'获取聊天记录失败'
									})
									
									let username= that.user.username;
									console.log("tim开始登陆--------------------有token分支：username="+username)
									that.$conn.open({
										apiUrl: that.$im.config.apiURL,
										user: seser.phone,
										pwd: seser.phone,
										grant_type: 'password',
										appKey: that.$im.config.appkey
									});
								}
								
							},err=>{
								
								uni.showToast({
									icon:'none',
									title:'获取聊天记录失败'
								})
								
								let username= that.user.username;
								console.log("tim开始登陆--------------------有token分支：username="+username)
								that.$conn.open({
									apiUrl: that.$im.config.apiURL,
									user: seser.phone,
									pwd: seser.phone,
									grant_type: 'password',
									appKey: that.$im.config.appkey
								});
								
							})	
							
							
							
						} else {
							if(res.statusCode==200){				
							 uni.showToast({
								icon: 'none',
								title: '登陆已过期，请重新登录'
							 });
							}else{
								uni.showToast({
								icon: 'none',
								title: '网络错误：网络连接失败'
								});
							}
							setTimeout(function(){
								that.toLogin();
							},1000)
							
						}
					},err=>{
						
						uni.showToast({
							icon: 'none',
							title: '自动登录失败：网络超时'
						});
						setTimeout(function(){
							that.toLogin();
						},1000)
						
						
						
					})	
					/* 
					uni.request({
						url: this.serverUrl + '/user/login/' + value, //仅为示例，并非真实接口地址。
						data: {},
						header: {
							//自定义请求头信息
						},
						success: res => {
						     console.log(res)  
							if (res.data.status==true) {
								console.log(res.data);
								var seser = JSON.parse(res.data.data);
								this.login(seser.username);
								that.updateUser(seser);
								
								let username= that.user.username;
								console.log("tim开始登陆--------------------有token分支：username="+username)
								
								
								that.$conn.open({
									apiUrl: that.$im.config.apiURL,
									user: seser.phone,
									pwd: seser.phone,
									grant_type: 'password',
									appKey: that.$im.config.appkey
								});
							
							
							
								
								
								
								
								
								
							} else {
								if(res.statusCode==200){				
								 uni.showToast({
									icon: 'none',
									title: '登陆已过期，请重新登录'
								 });
								}else{
									uni.showToast({
									icon: 'none',
									title: '网络错误：网络连接失败'
									});
								}
								setTimeout(function(){
									that.toLogin();
								},1000)
								
							}
						},
						fail: err => {
							uni.showToast({
								icon: 'none',
								title: '自动登录失败：网络超时'
							});
                            setTimeout(function(){
								that.toLogin();
							},1000)
							
						}
					}); */
				} else {
					
					uni.showToast({
						icon: 'none',
						title: '请先登录'
					});
					setTimeout(function(){
						
						that.toLogin();
						
					},1000)
				}
			} catch (e) {
				
				
				uni.showToast({
					icon: 'none',
					title: '请先登录'
				});
				setTimeout(function(){
					
					that.toLogin();
					
				},1000)
			}
			
		}else{
		   const that=this;
		  
		 							
		  //获取历史记录
		  let submit2={};
		      submit2.url="/chatHistory/get"
		      submit2.data={
		  		id:that.user.phone
		  	}
		  http.backPost(submit2).then(res=>{
		  	
		  	if(res.data.status==true){
		  		
			if(res.data.data){
			let chat=res.data.data
			that.setLinkList(chat);
			}
		  	 
		  	 console.log("tim开始登陆 else分支--------------------")
		  	 let seser= that.user
		  	 that.$conn.open({
		  	 		 	apiUrl: that.$im.config.apiURL,
		  	 		 	user: seser.phone,
		  	 		 	pwd: seser.phone,
		  	 		 	grant_type: 'password',
		  	 		 	appKey: that.$im.config.appkey
		  	 });
		  		
		  		
		  	}else{
		  		
		  		uni.showToast({
		  			icon:'none',
		  			title:'获取聊天记录失败'
		  		})
		  		
		  		console.log("tim开始登陆 else分支--------------------")
		  		let seser= that.user
		  		that.$conn.open({
		  				 	apiUrl: that.$im.config.apiURL,
		  				 	user: seser.phone,
		  				 	pwd: seser.phone,
		  				 	grant_type: 'password',
		  				 	appKey: that.$im.config.appkey
		  		});
		  	}
		  	
		  },err=>{
		  	
		  	uni.showToast({
		  		icon:'none',
		  		title:'获取聊天记录失败'
		  	})
		  	
		  	console.log("tim开始登陆 else分支--------------------")
		  	let seser= that.user
		  	that.$conn.open({
		  			 	apiUrl: that.$im.config.apiURL,
		  			 	user: seser.phone,
		  			 	pwd: seser.phone,
		  			 	grant_type: 'password',
		  			 	appKey: that.$im.config.appkey
		  	});
		  	
		  })	
		  
			
			
			
			
		}
	},
	onReady() {
		var that = this;
		var u={};
		u=this.user;
		u.password='';
        this.userPoint.tbuser=u;
		uni.getLocation({
			type: 'gcj02',
			geocode: true,
			success: function(res) {
				console.log('当前位置的经度：' + res.longitude);
				console.log('当前位置的纬度：' + res.latitude);
				that.longitude = res.longitude;
				that.latitude = res.latitude;

				that.covers[0].longitude = res.longitude;
				that.covers[0].latitude = res.latitude;
				that.circles[0].longitude = res.longitude;
				that.circles[0].latitude = res.latitude;




                 var location={};
                 location.type="Point";
                 location.coordinates=[res.longitude,res.latitude];
				 that.userPoint.location=location;
                //中文地址
				 var address=res.address;
				 var addressStr='';
				 for(var att in address){
					 if(address[att]!=undefined)
					 addressStr+=address[att];
				 }
                that.userPoint.address=addressStr;

				
			}
		});
	}
};
</script>

<style scoped>
@import '../../common/uni/uni.css';
.hello {
	display: flex;
	flex: 1;
	flex-direction: column;
}

.title {
	color: #8f8f94;
	margin-top: 10upx;
}

.ul {
	font-size: 30upx;
	color: #8f8f94;
	margin-top: 50upx;
}

.ul > view {
	line-height: 50upx;
}

.QS-tabs-box {
	width: 100%;
	position: sticky;
	top: 0;
	z-index: 10;
	background-color: white;
}
.swiper-item {
	background-color: #fff;
}
.scroll-items {
	display: flex;
	flex-direction: column;
	width: 100%;
	padding: 40rpx;
}
.scroll-item {
	margin-top: 15rpx;
	padding: 25rpx;
	background-color: white;
	border-radius: 8rpx;
	width: 100%;
	display: flex;
	flex-direction: row;
	border: 1px solid #f8f8f8;
}
.scroll-item-image-box {
	flex-grow: 0;
}
.scroll-item-text-box {
	flex-grow: 1;
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	font-size: 28rpx;
	font-weight: bold;
	margin-left: 15rpx;
}
.scroll-item-image {
	border-radius: 4rpx;
	width: 180rpx;
	height: 150rpx;
}
.view2 {
	display: flex;
	width: 100%;
	flex-direction: column;
	margin-right: 3rpx;
}
.btn {
}
</style>
