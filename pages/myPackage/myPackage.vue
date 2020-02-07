<template>
	
	<view>
		<scroll-view scroll-x class="bg-white nav fixed" >
			<view class='flex text-center'>
				<view class="cu-item flex-sub text-df " @click="navselect(index)" v-for="(nav,index) in navlist" :key="index"
				 :class="[index == currentIndex ? 'text-red cur' : '']">
					{{nav}}<uni-badge :text="classNum[index]" v-if="classNum[index]!=0"></uni-badge>
				</view>
			</view>
		</scroll-view>
		<uni-drawer :visible="drawer" @close="drawer=false">
		    <view style="margin-top: 100rpx;">
		        <view class="title1">
					接单人详细信息
				</view>
				
				<view >
					
					<view>
					  <cmd-cel-item title="头像"  slot-right >
					    <cmd-avatar :src="orderPeople.headimage"></cmd-avatar>
					  </cmd-cel-item>
					  <cmd-cel-item title="成交数" :addon="orderPeople.lervel" ></cmd-cel-item>
					  <cmd-cel-item title="昵称" :addon="orderPeople.username" ></cmd-cel-item>
					  <cmd-cel-item title="联系方式":addon="orderPeople.phone" ></cmd-cel-item>
					  
					  <view v-if="orderPeople.usertype==1">
					  <cmd-cel-item title="姓名" :addon="orderPeople.realname" ></cmd-cel-item>
					  <cmd-cel-item title="户籍地" :addon="orderPeople.nativeplace" ></cmd-cel-item>
					  <cmd-cel-item title="现居地" :addon="orderPeople.nowplace" ></cmd-cel-item>
					 </view>
					 
					   <view v-if="orderPeople.usertype==2">
					 <cmd-cel-item title="公司名"   :addon="orderPeople.companyname" ></cmd-cel-item>
					 <cmd-cel-item title="公司地址" :addon="orderPeople.companyaddress" ></cmd-cel-item>
					 <cmd-cel-item title="公司联系人" :addon="orderPeople.companylinkname" ></cmd-cel-item>
					 <cmd-cel-item title="公司联系电话" :addon="orderPeople.companylinkphone" ></cmd-cel-item>
					    </view>
						<cmd-cel-item title="私聊" @click="talkTo(orderPeople)" v-if="user.id!=orderPeople.id" slot-right arrow>
						 
						</cmd-cel-item>
					
					 
					</view>
					
					
					
				</view>
		    </view>
		</uni-drawer>
		<hFormAlert v-if="cancelShow" title="提示" name="price" placeholder="请输入最终价格,请谨慎(单位 元)" @confirm="fnAgreen" @cancel="cancelShow=false"></hFormAlert>
		<view style="margin-top: 80rpx;width: 100%;" >
			
					
					<view>
						<view class="bg-white margin-xs padding-xs shadow radius text-content" :style="{'width':phoneStatus.windowWidth-10+'px'}"  v-for="(item,index) in order_list"
						 :key="index">
						 
						
							
							<view class="flex padding-top-sm solids-top" style="align-items: stretch;" @click="goDetail(item)">
								<image :src="m" v-for="m in item.cargoImage" style="flex-shrink: 0;" mode="aspectFill" class="shadow cover radius solids"></image>
										
								<view class="flex text-content padding-left justify-between" style="flex-grow: 1;">
									<view style="">{{ item.goods.name }}</view>
									<view style="display: flex;flex-direction: column;">
										
										<!-- <view class="text-grey text-center">{{item.toAddress.substr(0,6)}}</view>	 -->								
										<view class="text-grey" style="align-self:flex-end;">重量：    {{item.goods.weight+'KG'}}</view>
										<view class="text-grey" style="align-self:flex-end;">体积：    {{item.goods.volume+'ML'}}</view>
									</view>
								</view>
							</view>
							<view class="flex justify-end" style="font-size: 24upx;">
								
								<view v-if="searchEntity.status==0">
									
								
								<view >
									
									<button @click.stop="seeOrderPeople(item)" class="round lines-grey cu-btn shadow mid margin-right-sm">查看接单人</button>
									<view class=" round cu-btn lines-orange mid shadow" @click.stop="jujue(item)">拒绝</view>
									<view class=" round cu-btn lines-orange mid shadow" @click.stop="tongyi(item)">立即同意</view>
								</view>
									
								</view>
								
								<view v-if="searchEntity.status==1">
									
									<view >
										<view class="round cu-btn lines-grey mid shadow margin-right-sm" @click="cancel(item)">取消</view>
									
									</view>
									
								</view>
								
								<view v-if="searchEntity.status==2">
									<button @click.stop="seeOrderPeople(item)" class="round lines-grey cu-btn shadow mid margin-right-sm">与接单人交谈</button>
									
								</view>
								
								<view v-if="searchEntity.status==3">
									
									
									<button @click.stop="fnSetStatus1(item)" class="round lines-grey cu-btn shadow mid margin-right-sm">重新找接货人</button>
									
									
								</view>
								
								<view v-if="searchEntity.status==4">
									
									
									<view style="display: flex;justify-content: flex-end;align-items: center;" >
									  <button @click.stop="seeCargoCode(item)" class="round lines-grey cu-btn shadow mid margin-right-sm">查看取货码</button>
									  <button @click.stop="fnQuerenshouhuo(item)" class="round lines-grey cu-btn shadow mid margin-right-sm">确认收货</button>								
									</view>
																	
									
								</view>
								
								<view v-if="searchEntity.status==5">
									
									<view style="display: flex;justify-content: flex-end;align-items: center;" >
								
									  <button @click.stop="pay(item)" class="round lines-grey cu-btn shadow mid margin-right-sm">支付</button>								
									</view>
								</view>
								
								<view v-if="searchEntity.status==6">
									
								
								</view>
								
								
								
							</view>
						</view>
					</view>
		   </view>
				
				
			
			<view style="margin-bottom: 50upx;" v-if="page.pageTotal!=0">
				<uni-pagination :total="page.pageTotal" :pageSize="page.pageSize" :current="page.pageNum" @change="paginat">
				</uni-pagination>
			</view>
			<view :style="{'width':phoneStatus.windowWidth+'px','margin-top':phoneStatus.windowHeight/3+'px'}" style="margin-bottom: 50upx;display: flex;justify-content: center;flex-direction: column;align-items: center;align-content: center;" v-if="page.pageTotal==0">
				<image src="../../static/img/car/noData.png" style="width: 100px; height: 100px; background-color: #eeeeee;" ></image>
				<view>暂无数据 下拉刷新</view>
			</view>
			<uni-popup ref="popup" type="center">{{code}}</uni-popup>
		</view>
	
</template>

<script>
	import { mapState, mapMutations } from 'vuex';
	import uniPagination from "@/components/uni-pagination/uni-pagination.vue"
	import http from '../../common/js/request.js';
	import uniBadge from "@dcloudio/uni-ui/lib/uni-badge/uni-badge.vue"
	import uniDrawer from '@dcloudio/uni-ui/lib/uni-drawer/uni-drawer.vue'
	import cmdCelItem from "@/components/cmd-cell-item/cmd-cell-item.vue"
	import cmdAvatar from "@/components/cmd-avatar/cmd-avatar.vue"
	import hFormAlert from '@/components/h-form-alert/h-form-alert.vue';
	import uniPopup from "@dcloudio/uni-ui/lib/uni-popup/uni-popup.vue"

	export default {
		computed: mapState(['forcedLogin', 'hasLogin', 'userName', 'serverUrl', 'user','linkList']),
		data() {
			return {
				navlist: [
					'已提交','待同意','待回复','被拒绝', '进行中','待支付','已完成'
				],
				currentIndex: 0,
				pages: 1,
				dataList:[],
				page:{
					pageNum:1,
					pageSize:10,
					total:'',
					pageTotal:'0'
				},
				order_list: [
						
				
				],
				code:'',
				cancelShow:false,
				classNum:{
					'0':'',
					'1':'',
					'2':'',
					'3':'',
					'4':'',
					'5':'',
					'6':''
				},
				searchEntity:{
					status:1
				},
				entity:{},
				status: '',	
				phoneStatus:{},
				orderPeople:{},
				drawer:false,
				flag:true
			}
		},
		components:{uniPagination,uniBadge,uniDrawer,cmdCelItem,
		cmdAvatar,hFormAlert,uniPopup},
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
			pay(o){
				
				
				const that=this;
				let submit={};
				submit.url='/pay/getOrder';
				submit.data=o;
				http.postWithNoStatus(submit).then(res1=>{
				
				
				/* //模拟支付
				uni.showLoading({
					title:'支付中..(模拟支付)',
				})
				let orderId res.data.message;
				let submit2={
					url:'/pay/success',
					data:{orderId:orderId}
				}
				http.post(submit2).then(res=>{
					
				uni.showToast({
					icon:'success',
					title:'支付成功'
				})
				uni.hideLoading();
				that.getPackageNum();
				that.getDataList()		
				
				},err=>{
					
					uni.showToast({
						icon:'none',
						title:'支付失败'
					})
					uni.hideLoading();
					
				}) */
				    uni.showToast({
				    	icon:'none',
						title:'请注意：由于没有商家资质，无法完整支持支付功能！故这是一个模拟过程,无论失败与否，都会当作支付成功',
						duration:3000
				    })
				    
					setTimeout(function(){
						
						
						uni.requestPayment({
						    provider: 'alipay',
						    orderInfo: res1.data.data, //微信、支付宝订单数据
						    success: function (res) {
								
						        console.log('success:' + JSON.stringify(res));
								
								
								
								
						    },
						    fail: function (err) {
								
						         console.log('fail:' + JSON.stringify(err));
								 let orderId =res1.data.message;
								
								let submit2={
									url:'/pay/success',
									data:{orderId:orderId}
								}
								
								http.get(submit2).then(res=>{
									
								uni.showToast({
									icon:'success',
									title:'支付成功'
								})
								
								that.getPackageNum();
								that.getDataList()	;
										
								},err=>{
									
									uni.showToast({
										icon:'none',
										title:'支付失败'
									})
									
								})
								 
								
								
						    }
						});
						
						uni.showToast({
							icon:'success',
							title:'支付成功'
						})
						
						
					},3000)
				
				
					
					
					
					
					
					
				},error=>{
					
											
					
				})
				
				
				
				
				
				
				
				
			},
			fnQuerenshouhuo(o){
				
				const that=this;
				let submit={};
				submit.url='/user/userPoint/querenshouhuo';
				submit.data=o;
				http.post(submit).then(res=>{
				
					that.getPackageNum();
					that.getDataList()		
					
					
					
				},error=>{
					
											
					
				})
				
				
				
			},
			seeCargoCode(o){
				
				
				const that=this;
				let submit={};
				submit.url='/user/userPoint/getCode';
				submit.data=o;
				http.post(submit).then(res=>{
				
					that.code=res.bk1;
					that.$refs.popup.open()
					
					
				},error=>{
					
											
					
				})
				
				
			},
			fnSetStatus1(o){
				const that=this;
				let submit={};
				submit.url='/user/userPoint/updateStatus/reset';
				submit.data=o;
				http.post(submit).then(res=>{
					
					that.getPackageNum();
					that.getDataList()		
					
				},error=>{
					
											
					
				})
				
				
				
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
				url:'../HM-chat/HM-chat?id='+index
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
					url:'../HM-chat/HM-chat?id='+id
				})
				
			
			},
			seeOrderPeople(o){
				const that=this;
				that.drawer=true;
				http.get({url:'/user/userPoint/getBasicInfo/'+o.id}).then(res=>{
//					console.log(res)
					that.orderPeople=res;
					
					
				},err=>{
					
				})
				
				
			},
			fnAgreen(v){
				
				let reg = /^\d+$|^\d*\.\d+$/g;
				if(reg.test(v.price)){
					
					
					    const that=this;
						this.entity.money=v.price;
						let submit={};
						submit.url='/user/userPoint/updateStatus/agree'
							submit.data=that.entity;
							http.post(submit).then(res=>{				
							that.getPackageNum();
							that.getDataList()	
							that.cancelShow=false;			
							},err=>{
												
							that.cancelShow=false;					
						})
						
						/* uni.showModal({
						    title: '提示',
							content:'确认',
						    success: function (res) {
						        if (res.confirm) {
						           
								    let submit={};
								    submit.url='/user/userPoint/updateStatus/agree'
								   	submit.data=that.entity;
								   	http.post(submit).then(res=>{				
								   	that.getPackageNum();
								   	that.getDataList()	
									that.cancelShow=false;			
								   	},err=>{
								   						
								   	that.cancelShow=false;					
								   })
								   
						        } else if (res.cancel) {
						          
								 that.cancelShow=false;		
						        }
						    }
					
					
					
				}) */
				}else{
					uni.showToast({
						title:'只能输入数字和小数点',
						icon:'none'
					})
					v.price=';'
					
				}
				
			},
			tongyi(o){
				this.cancelShow=true;
				this.entity=o;
			/* 	const that=this;
				console.log(o)
				uni.showModal({
				    title: '提示',
					content:'确认同意',
				    success: function (res) {
				        if (res.confirm) {
				           
						    let submit={};
						    submit.url='/user/userPoint/updateStatus/agree'
						   	submit.data=o;
						   	http.post(submit).then(res=>{				
						   	that.getPackageNum();
						   	that.getDataList()						
						   	},err=>{
						   						
						   						
						   })
						   
				        } else if (res.cancel) {
				          
						 
				        }
				    }
				}); */
				
				
			},
			jujue(o){
				
				const that=this;
				console.log(o)
				uni.showModal({
				    title: '提示',
					content:'确认拒绝',
				    success: function (res) {
				        if (res.confirm) {
				           
						    let submit={};
						    submit.url='/user/userPoint/updateStatus/reject'
						   	submit.data=o;
						   	http.post(submit).then(res=>{				
						   	that.getPackageNum();
						   	that.getDataList()						
						   	},err=>{
						   						
						   						
						   })
						   
				        } else if (res.cancel) {
				          
						 
				        }
				    }
				});
				
				
				
			},
			cancel(o){
				const that=this;
				console.log(o)
				uni.showModal({
				    title: '提示',
					content:'确认取消这个订单吗',
				    success: function (res) {
				        if (res.confirm) {
				           
						    let submit={};
						    submit.url='/user/userPoint/updateStatus/cancel'
						    submit.data=o; 
						   	http.post(submit).then(res=>{				
						   	that.getPackageNum();
						  // 	that.getDataList()						
						   	},err=>{
						   						
						   						
						   })
						   
				        } else if (res.cancel) {
				          
						 
				        }
				    }
				});
				
				
			
				  
			},
			navselect(index){
				if(index==0){
					this.searchEntity.status=1;
				}
				else if(index==1){
					this.searchEntity.status=0;
				}else{
					this.searchEntity.status=index;
				}
				this.currentIndex=index;
				this.getDataList();
				
				
				
			},
			goDetail(v){
				console.log(v)
				
			},
			paginat(v){
				
				this.page.pageNum=v;
				console.log(v)
				
			},
			goDetail(o){
				
				uni.navigateTo({
					url:'../cargo/cargo/cargo?id='+o.id+'&type=1'
				})
			},
			getDataList(){
				
				let url='/user/userPoint/findManyWithPage';
				let data={
				        pageNum:this.page.pageNum,
						pageSize:this.page.pageSize,
						status:this.searchEntity.status,
						userId:this.user.id
				    }
				 let entity={};
				 entity.url=url;
				 entity.data=data;
				 const that=this;
			     http.get(entity).then(
			               res => {
							  that.page.pageTotal=res.pageCount;
							  that.order_list=[];
							  res.list.forEach(p=>{
								  
								  p.cargoImage=JSON.parse(p.cargoImage);
								  if(p.cargoImage.length>2){
									  p.cargoImage.splice(2,1)
								  }
								  that.order_list.push(p)
							  });
			               },
			               error => {
			                   console.log('失败');
			               }
			           );
			  	 
				
			},
			getPackageNum(oo){
				 let url='/user/userPoint/query/getPackageNum';
				 let data={
						userId:this.user.id
				    }
				 let entity={};
				 entity.url=url;
				 entity.data=data;
				 const that=this;
				 http.get(entity).then(
				           res => {
							 let t=res['0'];
							 res['0']=res['1'];
							 res['1']=t;
							 Object.assign(that.classNum,res)
							 if(oo){						  
							 	for(var att in that.classNum){					  								
							 	if(that.classNum[att]!=0){
									if(att=='0'){
							 		
									this.searchEntity.status=1;
									}
									else if(att=='1'){
								
									this.searchEntity.status=0;
									}
									else
									this.searchEntity.status=att
									
							 		that.currentIndex=att;
							 		that.getDataList();
									that.flag=false;
							 		break;
							 	   }
							 								  								  
							 	}
							 }
							 
							  
				           },
				           error => {
							   
				               console.log('失败：'+error);
							   
				           }
				       );
				 
				
				
			}
			

		},
		mounted() {
			const that=this;
			uni.getSystemInfo({
			    success: function (res) {
					that.phoneStatus=res
					
					uni.startPullDownRefresh();
			    }
			});
			
			
			
		},
		onPullDownRefresh() {
		        const that=this;
		        setTimeout(function () {
					if(that.flag)
					that.getPackageNum({});
					else{
						that.getPackageNum();
						that.getDataList()
					}
					
					//that.getDataList()
					/* that.getPackageNum();
					that.getDataList() */
					
		            uni.stopPullDownRefresh();
		        }, 1000);
	   }
		
	}
</script>

<style  lang="scss">
	
	@import '../../common/common.scss';
	.title1{
		@include title
	}
	

</style>
<style>
	@import url("../../static/colorui.css");
	.cover {
		width: 150upx;
		height: 150upx;
	}
</style>
