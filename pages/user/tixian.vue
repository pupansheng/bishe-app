<template>
	
	<view :style="{'width': '100%'}">
		
	
    <button type="default" plain="true" @click="tixian()" style="width: 100%;margin-top: 200upx;">$：{{user.money?user.money:0}}元</button>
	<button type="primary" @click="tixian()" style="width: 100%;">提现</button>
		
	</view>
	
	
	
</template>
<script>
	import { mapState, mapMutations } from 'vuex';
    import http from '../../common/js/request.js';
	export default {
		computed: {
			...mapState(['hasLogin', 'forcedLogin','serverUrl','user'])
		},
		data(){
			return {
				
				entity:{money:0.00},
				systemInfo:{}			
			}
		},
		onLoad() {
			
			const that=this;
			uni.getSystemInfo({
			    success: function (res) {
					that.systemInfo=res;
			       
			    }
			});
			
		},
		methods:{
			tixian(){
				
				uni.showToast({
					icon:'none',
					title:'该功能暂未实现'
				})
			}
			
		},
		onLoad() {
			const that=this;
			http.get({url:'/user/getBasciInfo/'+that.user.id}).then(res=>{
				
				that.updateUser(res);
				that.entity=res;	
			},err=>{
				
				
				uni.showToast({
					icon:'none',
					title:'获取余额失败'
				})
				
			}
			
							
			
			)
			
			
			
		}
		
		
	}
</script>

<style>
</style>
