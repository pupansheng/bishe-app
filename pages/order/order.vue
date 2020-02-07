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
						<cmd-cel-item title="私聊" @click="talkTo(orderPeople)"  v-if="user.id!=orderPeople.id"  slot-right arrow>
						 
						</cmd-cel-item>
					
					 
					</view>
					
					
					
				</view>
		    </view>
		</uni-drawer>
		<view style="margin-top: 80rpx;width: 100%;" >
			
					
					<view>
						<view class="bg-white margin-xs padding-xs shadow radius text-content" :style="{'width':phoneStatus.windowWidth-10+'px'}" v-for="(item,index) in order_list"
						 :key="index">
						 
						
							
							<view class="flex padding-top-sm solids-top" style="align-items: stretch;"  @click="goDetail(item)">
								<image :src="m" v-for="m in item.goodsimage" style="flex-shrink: 0;" mode="aspectFill" class="shadow cover radius solids"></image>
										
								<view class="flex text-content padding-left justify-between" style="flex-grow: 1;">
									<view style="">{{ item.goodsname }}</view>
									<view style="display: flex;flex-direction: column;">
										
										<!-- <view class="text-grey text-center">{{item.toAddress.substr(0,6)}}</view>	 -->								
										<view class="text-grey" style="align-self:flex-end;">重量：    {{item.goodsweight+'KG'}}</view>
										<view class="text-grey" style="align-self:flex-end;">体积：    {{item.goodsvolume+'ML'}}</view>
									</view>
								</view>
							</view>
							
							<view v-if="searchEntity.status==0">
								
							
							<view style="display: flex;justify-content: flex-end;">
								<button @click.stop="seeOrderPeople(item)" class="round lines-grey cu-btn shadow mid margin-right-sm">与货主商量</button>
							    <button @click.stop="cancel0(item)" class="round lines-grey cu-btn shadow mid margin-right-sm">取消</button>
							</view>
								
							</view>
							<view v-if="searchEntity.status==1">
								
								<view style="display: flex;justify-content: space-around;">
									 <view style="display: flex;align-items: center;">最终价格：${{item.talkprice}}元</view> 
									 <view style="display: flex;justify-content: flex-end;">
										 <view class="round cu-btn lines-grey mid shadow margin-right-sm" @click.stop="butongyi(item)">取消接单</view>
										 <view class="round cu-btn lines-grey mid shadow margin-right-sm" @click.stop="getCargo(item)">确认取货</view>								   
									 </view>
									
								</view>
								
							</view>
							
							<view v-if="searchEntity.status==2">
								<view style="display: flex;justify-content: flex-end;">
								<button  class="round lines-grey cu-btn shadow mid margin-right-sm" @click="cancelRecord(item)">删除记录</button>
								</view>
							</view>
							
							<view v-if="searchEntity.status==3">
								
							 <view style="display: flex;justify-content: space-between;align-items: center;" >
							       <view>取货码：{{item.bk1}}</view>
							 	   <button @click.stop="geikehu(item)" class="round lines-grey cu-btn shadow mid margin-right-sm">已送达</button>
							 </view>
								
							</view>
							
							<view v-if="searchEntity.status==4">
								<view  style="display: flex;justify-content: flex-end;">
									 <view style="display: flex;align-items: center;">价格：${{item.talkprice}}元</view> 
								</view>
								
								
							</view>
							
							<view v-if="searchEntity.status==5">
								<view  style="display: flex;justify-content: flex-end;">
									<button @click.stop="seeOrderPeople(item)" class="round lines-grey cu-btn shadow mid margin-right-sm">与货主交谈</button>
									
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
		</view>
	
</template>

<script>
	import { mapState, mapMutations } from 'vuex';
	import uniPagination from "@dcloudio/uni-ui/lib/uni-pagination/uni-pagination.vue"
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
					'已申请','已同意','被拒绝','进行中', '待支付','已完成'
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
				drawer:false,
				classNum:{
					'0':'',
					'1':'',
					'2':'',
					'3':'',
					'4':'',
					'5':''
				},
				searchEntity:{
					status:0
				},
				orderPeople:{},
				status: '',	
				phoneStatus:{},
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
			seeOrderPeople(o){
			const that=this;
			that.drawer=true;
			http.get({url:'/order/getBasicInfo/'+o.ownerid}).then(res=>{
//				console.log(res)
			that.orderPeople=res;
			},err=>{
								
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
			geikehu(o){
				
				const that=this;
				
				uni.showModal({
				    title: '提示',
					content:'确认操作?',
				    success: function (res) {
				        if (res.confirm) {
				           
						  let submit={};
						  submit.url='/order/daohuo';
						  submit.data=o;
						  	
						  http.post(submit).then(res=>{
						  	that.getOderNum();
						  	that.getDataList();
						  },error=>{
						  	
						  	
						  })
						   
				        } else if (res.cancel) {
				          
						 
				        }
				    }
				});
				
				
			},
			butongyi(o){
				
				const that=this;
				
				uni.showModal({
				    title: '提示',
					content:'确认取消?',
				    success: function (res) {
				        if (res.confirm) {
				           
						  let submit={};
						  submit.url='/order/reject';
						  submit.data=o;
						  	
						  http.post(submit).then(res=>{
						  	that.getOderNum();
						  	that.getDataList();
						  },error=>{
						  	
						  	
						  })
						   
				        } else if (res.cancel) {
				          
						 
				        }
				    }
				});
				
				
			},
			getCargo(item){
				
				const that=this;
				
				uni.showModal({
				    title: '提示',
					content:'确认取货? 请注意,当确认时无法更改，直到订单完成',
				    success: function (res) {
				        if (res.confirm) {
				           
						  let submit={};
						  submit.url='/order/confirm';
						  submit.data=item;
						  	
						  http.post(submit).then(res=>{
							uni.showToast({
								icon:'success',
								title:'成功!取货码：'+res
							})  
							console.log(res)
						  	that.getOderNum();
						  	that.getDataList();
						  },error=>{
						  	
							
						  	
						  })
						   
				        } else if (res.cancel) {
				          
						 
				        }
				    }
				});
				
				
			},
			cancel0(o){
				const that=this;
				
				uni.showModal({
				    title: '提示',
					content:'确认?',
				    success: function (res) {
				        if (res.confirm) {
				           
						  let submit={};
						  submit.url='/order/delete';
						  submit.data={
						  	id:o.id,
							status:o.status,
							userpointid:o.userpointid
						  };
						  http.post(submit).then(res=>{
						  	that.getOderNum();
						  	that.getDataList();
						  },error=>{
						  	
						  	
						  })
						   
				        } else if (res.cancel) {
				          
						 
				        }
				    }
				});
				
				
				
				
				
			},
			cancelRecord(o){
				const that=this;
				let submit={};
				submit.url='/order/delete';
				submit.data={
					id:o.id,
					status:o.status,
					userpointid:o.userpointid
				};
				http.post(submit).then(res=>{
					
					that.getOderNum();
					that.getDataList();
					
				},error=>{
					
					
				})
				
				
			},
			navselect(index){

				this.searchEntity.status=index;
				this.currentIndex=index;
				this.getDataList();
				
			},
			paginat(v){
				
				this.page.pageNum=v;
				console.log(v)
				
			},
			goDetail(o){
				
				uni.navigateTo({
					url:'../cargo/cargo/cargo?id='+o.userpointid+'&type=1'
				})
			},
			getDataList(){
				
				let url='/order/query/condition';
				let data={
				        pageNum:this.page.pageNum,
						pageSize:this.page.pageSize,
						status:this.searchEntity.status,
						userid:this.user.id
				    }
				 let entity={};
				 entity.url=url;
				 entity.data=data;
				 const that=this;
			     http.post(entity).then(
			               res => {
							  
							 that.order_list=res.list;
							  that.order_list.forEach(p=>{
								  p.goodsimage=JSON.parse(p.goodsimage)
								  if(p.goodsimage.length>2){
								  p.goodsimage.splice(2,1)
								  }
							  })
							 that.page.pageNum=res.pageNum;
							 that.page.pageSize=res.pageSize;
							 that.page.pageTotal=res.total;
							 
			               },
			               error => {
			                   console.log('失败');
			               }
			           );
			  	 
				
			},
			getOderNum(oo){
				
				let url='/order/query/getOrderNum';
				let data={
				      
						userId:this.user.id
				    }
				 let entity={};
				 entity.url=url;
				 entity.data=data;
				 const that=this;
				 http.get(entity).then(
				           res => {  
							  Object.assign(that.classNum,res)
							  if(oo){
								  
								  for(var att in that.classNum){
								  								
								   if(that.classNum[att]!=0){
								  	 that.currentIndex=att;
								  	this.searchEntity.status=att;
									that.flag=false;						  	that.getDataList();
								    break;
									  }
								  								  
								  }
							  }

				           },
				           error => {
				               console.log('失败');
				           }
				       );
			}
		},
		mounted() {
			const that=this;
			uni.getSystemInfo({
			    success: function (res) {
					that.phoneStatus=res
				/* 	that.getOderNum();
					that.getDataList() */
					uni.startPullDownRefresh();
			    }
			});

		},
		onPullDownRefresh() {
				        const that=this;
				        setTimeout(function () {
							if(that.flag)
							that.getOderNum({});
							else{
								that.getOderNum();
								that.getDataList()
							}
						//	that.getDataList();
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
