<template>
	<view class="content" >
		
		<view class="">
			<button v-if="!hasLogin" type="primary" class="primary" @tap="bindLogin">登录</button>
			<view v-if="hasLogin">
				
				<view class="person-head">
				    <cmd-avatar :src="user.headimage" @click="fnInfoWin" size="lg" :make="{'background-color': '#fff'}"></cmd-avatar>
				    <view class="person-head-box">
				      <view class="person-head-nickname">{{user.username}} -- {{user.status==1?'[已审核]':'[未审核]'}}
					 
					  </view>
				      <view class="person-head-username">{{user.phone}}</view>
				    </view>
				  </view>
				  <view class="person-list">
				    <cmd-cell-item :title="user.status==1?'重新审核':'审核资料'" @click="toInfo()" slot-left arrow>
				      <cmd-icon type="bullet-list" size="24" color="#368dff"></cmd-icon>
				    </cmd-cell-item>
					<cmd-cell-item title="余额提现" slot-left arrow @click="tixian()">
					  <uni-icons type="plus" size="25" color="#368dff"></uni-icons>
					</cmd-cell-item>
					<cmd-cell-item title="我的资料" slot-left arrow  @click="fnInfoWin">
					 <uni-icons type="person" size="25" color="#368dff"></uni-icons>
					</cmd-cell-item>
				    <cmd-cell-item title="系统设置" slot-left arrow>
				      <cmd-icon type="settings" size="24" color="#368dff"></cmd-icon>
				    </cmd-cell-item>
				    <cmd-cell-item title="检查版本" addon="v1.0" slot-left arrow>
				      <cmd-icon type="alert-circle" size="24" color="#368dff"></cmd-icon>
				    </cmd-cell-item>
				  </view>
				</view>
	
				<!-- <uni-list>
				https://avatar.bbs.miui.com/images/noavatar_small.gif
				    <uni-list-item title="个人资料" :show-arrow="false"></uni-list-item>
				    <uni-list-item title="我的积分"></uni-list-item>
				    <uni-list-item title="标题文字" :show-badge="true" badge-text="12"></uni-list-item>
				    <uni-list-item title="禁用状态" :disabled="true" :show-badge="true" badge-text="12"></uni-list-item>
				</uni-list> -->
				
				<button v-if="hasLogin" type="primary" @tap="bindLogout" :style="{'position':'absolute','top':systemInfo.windowHeight-97+'px','width':'100%'}" >退出登录</button>
			</view>
			
		</view>
	</view>
</template>

<script>
	
import { mapState, mapMutations } from 'vuex';
import uniList from "@dcloudio/uni-ui/lib/uni-list/uni-list.vue"
import uniListItem from "@dcloudio/uni-ui/lib/uni-list-item/uni-list-item.vue"
import cmdAvatar from "@/components/cmd-avatar/cmd-avatar.vue"
import cmdIcon from "@/components/cmd-icon/cmd-icon.vue"
import uniIcons from "@dcloudio/uni-ui/lib/uni-icons/uni-icons.vue"
import cmdCellItem from "@/components/cmd-cell-item/cmd-cell-item.vue"
import http from '../../common/js/request.js';
export default {
	components:{
		
		uniList,uniListItem,
		cmdAvatar,
		cmdCellItem,
		cmdIcon,
		uniIcons
		
	},
	computed: {
		...mapState(['hasLogin', 'forcedLogin','serverUrl','user'])
	},
	data(){
		
		return{
			
			systemInfo:{}
		}
		
		
		
	},
	onLoad() {
		
		const that=this;
		uni.getSystemInfo({
		    success: function (res) {
				that.systemInfo=res;
		        console.log(res.model);
		        console.log(res.pixelRatio);
		        console.log(res.windowWidth);
		        console.log(res.windowHeight);
		        console.log(res.language);
		        console.log(res.version);
		        console.log(res.platform);
		    }
		});
		
		
		
	},
	methods: {
		
		...mapMutations(['logout']),
		tixian(){
		uni.navigateTo({
			url: '../user/tixian'
		});	
		},
		toInfo(){
			
			uni.navigateTo({
				url: '../user/info'
			});
			
		},
		fnInfoWin(){
			
			uni.navigateTo({
				url: '../user/detail'
			});
			
		},
		bindLogin() {
			uni.navigateTo({
				url: '../login/login'
			});
		},
		bindLogout() {
			/**
			 * 如果需要强制登录跳转回登录页面
			 */
		
			var that=this;
		  //退出im
		    this.$im.conn.close();
			uni.removeStorage({
				key:'token',
				success() {
					that.logout();
					uni.showToast({
						icon: 'success',
						title: '退出登录成功'
					});
					
				},
				fail() {
					
					uni.showToast({
						icon: 'none',
						title: '退出登录失败'
					});
					
					
				}
			})
			
		  /* 
		  uni.request({
			url: that.serverUrl + '/user/loginOut/' + value, //仅为示例，并非真实接口地址。
			method: 'POST',
			header: {
				//自定义请求头信息
			},
			success: res => {
				uni.showToast({
					icon: 'success',
					title: '退出登录成功'
				});
				//删除本地token
				uni.removeStorage({
					key: 'token',
					success: function(res) {
						//后台退出	
				        that.logout();
						console.log('退出登录成功success');
					}
				});
				
			},
			fail: err => {
				
				uni.showToast({
					icon: 'none',
					title: '退出登录失败'
				});
			}
		});
		 */
		
			

			if (this.forcedLogin) {
				uni.reLaunch({
					url: '../login/login'
				});
			}
		}
		
		
	}
};
</script>

<style>
	.person-head {
	  display: flex;
	  flex-direction: row;
	  align-items: center;
	  height: 150px;
	  padding-left: 20px;
	  background: linear-gradient(to right, #365fff, #36bbff);
	}
	
	.person-head-box {
	  display: flex;
	  flex-direction: column;
	  justify-content: center;
	  align-items: flex-start;
	  margin-left: 10px;
	}
	
	.person-head-nickname {
	  font-size: 18px;
	  font-weight: 500;
	  color: #fff;
	}
	
	.person-head-username {
	  font-size: 14px;
	  font-weight: 500;
	  color: #fff;
	}
	
	.person-list {
	  line-height: 0;
	}

  
</style>
