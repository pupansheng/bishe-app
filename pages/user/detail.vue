<template>
  <view style="margin-top: 0rpx;">
    <cmd-page-body type="top" style="margin-top: 0rpx;">
      <cmd-transition name="fade-up" style="margin-top: 0rpx;">
        <view  style="margin-top: 0rpx;">
          <cmd-cel-item title="头像" slot-right arrow>
            <cmd-avatar :src="user.headimage" @click="uploadHeadImage()"></cmd-avatar>
          </cmd-cel-item>
          <cmd-cel-item title="成交数" :addon="user.lerver" ></cmd-cel-item>
		  <cmd-cel-item title="余额" :addon="user.money?user.money:0" ></cmd-cel-item>
          <cmd-cel-item title="昵称" :addon="user.username" ></cmd-cel-item>
		  <cmd-cel-item title="联系方式":addon="user.phone" ></cmd-cel-item>
		  
		  <view v-if="user.usertype==1">
          <cmd-cel-item title="姓名" :addon="user.realname" ></cmd-cel-item>
          <cmd-cel-item title="户籍地" :addon="user.nativeplace" ></cmd-cel-item>
		  <cmd-cel-item title="现居地" :addon="user.nowplace" ></cmd-cel-item>
         </view>
		 
		   <view v-if="user.usertype==2">
		 <cmd-cel-item title="公司名"   :addon="user.companyname" ></cmd-cel-item>
		 <cmd-cel-item title="公司地址" :addon="user.companyaddress" ></cmd-cel-item>
		 <cmd-cel-item title="公司联系人" :addon="user.companylinkname" ></cmd-cel-item>
		 <cmd-cel-item title="公司联系电话" :addon="user.companylinkphone" ></cmd-cel-item>
		    </view>
		 <cmd-cel-item title="修改密码" @click="fnClick('modify')" arrow></cmd-cel-item>
         
        </view>
      </cmd-transition>
    </cmd-page-body>
  </view>
</template>

<script>
  import { mapState, mapMutations } from 'vuex';
  import cmdNavBar from "@/components/cmd-nav-bar/cmd-nav-bar.vue"
  import cmdPageBody from "@/components/cmd-page-body/cmd-page-body.vue"
  import cmdTransition from "@/components/cmd-transition/cmd-transition.vue"
  import cmdCelItem from "@/components/cmd-cell-item/cmd-cell-item.vue"
  import cmdAvatar from "@/components/cmd-avatar/cmd-avatar.vue"
  import http from '../../common/js/request.js';

  export default {
    components: {
      cmdNavBar,
      cmdPageBody,
      cmdTransition,
      cmdCelItem,
      cmdAvatar
    },
     computed: {
		...mapState(['hasLogin', 'forcedLogin', 'serverUrl', 'user','token'])
	},
    data() {
      return {};
    },

    mounted() {
		
			uni.startPullDownRefresh();
		
	},
    
    methods:{
      /**
       * 点击触发
       * @param {Object} type 跳转页面名或者类型方式
       */
	  ...mapMutations(['login', 'updateUser']),
      fnClick(type){
        if(type == 'modify'){
          uni.navigateTo({
            url:'/pages/pwd/modify'
          })
        }
      },
	  uploadHeadImage(){
		  
		  var that=this;
		  uni.chooseImage({
		  	success: res => {
		  		
		  		   const tempFilePaths = res.tempFilePaths;
		  		   const uploadTask = uni.uploadFile({
		  		               url: that.serverUrl+"/upload", //仅为示例，非真实的接口地址
		  		               filePath: tempFilePaths[0],
							   header:{'shundi-token':that.token},
		  		               name: 'file',
		  		               formData: {
		  		                   
		  		               },
		  		               success: (uploadFileRes) => {
		  						   
		  						  
		  							var res=JSON.parse(uploadFileRes.data)
		  						    
									that.user.headimage=res.url;
									//更新
									let submit={};
									     submit.url='/user/update/headimage';
										 submit.data=that.user;
										 submit.title='更新中'
									http.postWithNoStatus(submit).then(res=>{
										
										if (res.data.status) {
											uni.showToast({
												title: '更新成功：',
												image: '../../static/img/alert-2.png',
												duration: 3000
											});
										
										} else {
											
											uni.showToast({
												title: '更新失败:'+res.data.message,
												image: '../../static/img/alert-3.png',
												duration: 3000
											});
										}
										
										
									},err=>{
										
										uni.showToast({
											title: '更新失败:'+err,
											image: '../../static/img/alert-3.png',
											duration: 3000
										});
										
										
									})	 
									
									
							/* 		uni.showLoading({
									    title: '更新中'
									});
									uni.request({
										url: this.serverUrl + '/user/update/headimage' , //仅为示例，并非真实接口地址。
										method: 'POST',
										data: that.user,
										header: {
											'content-type': 'application/json'
											//自定义请求头信息
										},
										success: res => {
											
											 uni.hideLoading();
											if (res.data.status) {
												uni.showToast({
													title: '更新成功：',
													image: '../../static/img/alert-2.png',
													duration: 3000
												});

											} else {
												console.log(res.data.message)
												uni.showToast({
													title: '更新失败！',
													image: '../../static/img/alert-3.png',
													duration: 3000
												});
											}
										},
										fail: err => {
											 uni.hideLoading();
											uni.showToast({
												title: '更新失败！',
												image: '../../static/img/alert-3.png',
												duration: 3000
											});
										}
									});
									 */
									
									
		   
		  		               }
		  		           });
		  		   
		  		   uni.showLoading({
		  		       title: '上传中'
		  		   });
		  		  uploadTask.onProgressUpdate((res) => { 
		  		             /*  console.log('上传进度' + res.progress);
		  		               console.log('已经上传的数据长度' + res.totalBytesSent);
		  		               console.log('预期需要上传的数据总长度' + res.totalBytesExpectedToSend); */
		  		               if (res.progress ==100) {
		  		                    uni.hideLoading();
		  		               } 
		  		   });
		  		
		  	}
		  })
		  
		  
		  
		  
		  
	  }
    },
	onLoad(option) {
		
	
		
	},
	onPullDownRefresh() {
			        const that=this;
			        setTimeout(function () {
						
					http.get({url:'/user/getBasciInfo/'+that.user.id}).then(res=>{
						
						that.updateUser(res);
							
					},err=>{
						
						
						uni.showToast({
							icon:'none',
							title:'获取基本信息失败'
						})
						
					}
					
				
					
					)
			        uni.stopPullDownRefresh();
			        }, 100);
	}
  }
</script>

<style>
  .btn-logout {
    margin-top: 100upx;
    width: 80%;
    border-radius: 50upx;
    font-size: 16px;
    color: #fff;
    background: linear-gradient(to right, #365fff, #36bbff);
  }

  .btn-logout-hover {
    background: linear-gradient(to right, #365fdd, #36bbfa);
  }
</style>
