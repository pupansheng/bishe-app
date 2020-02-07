<template>
	<view class="content">
		

		<view v-if="entity.usertype == ''"><text style="color: red;align-content: center;">请先选择注册用户类型！</text></view>

		<view v-if="entity.usertype == 1">
		    <QSInput :name="name" titleColor="#f1505c" variableName="input" required layout="column" title="昵称" v-model="entity.username"></QSInput>
			<QSInput :name="name" titleColor="#f1505c" variableName="input" required layout="column" title="真实姓名" v-model="entity.realname"></QSInput>
			<QSInput :name="name" titleColor="#f1505c" variableName="input" required layout="column" title="户籍" v-model="entity.nativeplace"></QSInput>
			<QSInput :name="name" titleColor="#f1505c" variableName="input" required layout="column" title="现居地址" v-model="entity.nowplace"></QSInput>
			<QSInput :name="name" titleColor="#f1505c" variableName="input" layout="column" title="qq邮箱" v-model="entity.bk1"></QSInput>

	     
			<QSPics :name="name" variableName="pics" :imageUrl="user.idcardimage1" :exists="user.idcardimage1"  title="身份证正面" :typeName="'idcardimage1'" @upload="uploadImage" v-model="idcardimage1"></QSPics>
			<QSPics :name="name" variableName="pics" :imageUrl="user.idcardimage2" :exists="user.idcardimage2" title="身份证反面"  :typeName="'idcardimage2'" @upload="uploadImage" v-model="idcardimage2"></QSPics>
	
			
			<button type="primary" @click="toSave()">{{user.status!=1?'审核资料':'重新审核'}}</button>
			
		</view>

	<!-- 	<view v-if="entity.usertype == 2">
			<QSInput
				:name="name"
				titleColor="#f1505c"
				variableName="input"
				required
				layout="column"
				:typeName="'companyname'"
				@upload="uploadImage"
				title="公司名称"
				v-model="entity.companyname"
			></QSInput>

			<QSInput
				:name="name"
				titleColor="#f1505c"
				variableName="input"
				required
				layout="column"
				:typeName="'companyaddress'"
				@upload="uploadImage"
				title="公司地址"
				v-model="entity.companyaddress"
			></QSInput>

			<QSInput
				:name="name"
				titleColor="#f1505c"
				variableName="input"
				required
				layout="column"
				:typeName="'companylinkname'"
				@upload="uploadImage"
				title="公司联系人姓名"
				v-model="entity.companylinkname"
			></QSInput>

			<QSInput :name="name" titleColor="#f1505c" variableName="input" required layout="column" title="公司联系人电话" v-model="entity.companylinkphone"></QSInput>

         
			<QSPics :name="name" variableName="pics" title="公司经营许可证" :typeName="'companylicence'" :imageUrl="serverUrl+'/'+user.companylicence" :exists="user.companylicence!=''"     @upload="uploadImage" v-model="companylicence"></QSPics>
			<QSPics :name="name" variableName="pics" title="公司开户许可证" :typeName="'accountlicence'" :imageUrl="serverUrl+'/'+user.accountlicence" :exists="user.accountlicence!=''"     @upload="uploadImage" v-model="accountlicence"></QSPics>
			<QSPics :name="name" variableName="pics" title="企业身份1" :typeName="'corporateIdentityCart1'" :imageUrl="serverUrl+'/'+user.corporateIdentityCart1" :exists="user.corporateIdentityCart1!=''"  @upload="uploadImage" v-model="corporateIdentityCart1"></QSPics>
			<QSPics :name="name" variableName="pics" title="企业身份2" :typeName="'corporateIdentityCart2'" :imageUrl="serverUrl+'/'+user.corporateIdentityCart2" :exists="user.corporateIdentityCart2!=''"  @upload="uploadImage" v-model="corporateIdentityCart2"></QSPics>
			<button type="primary" @click="toSave()">{{user.status!=1?'审核资料':'重新审核'}}</button>
		</view> -->
	</view>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import QSApp from '@/components/QS-inputs-split/js/app.js';
import QSInput from '@/components/QS-inputs-split/elements/QS-input/index.vue';
import QSRadio from '@/components/QS-inputs-split/elements/QS-radio/index.vue';
import QSCheckbox from '@/components/QS-inputs-split/elements/QS-checkbox/index.vue';
import QSTextarea from '@/components/QS-inputs-split/elements/QS-textarea/index.vue';
import QSPickerDate from '@/components/QS-inputs-split/elements/QS-picker-date/index.vue';
import QSPickerCity from '@/components/QS-inputs-split/elements/QS-picker-city/index.vue';
import QSPickerCustom from '@/components/QS-inputs-split/elements/QS-picker-custom/index.vue';
import QSPickerCustom2 from '@/components/QS-inputs-split/elements/QS-picker-custom2/index.vue';
import QSPics from '@/components/QS-inputs-split/elements/QS-pics/index.vue';
import QSInfinitePics from '@/components/QS-inputs-split/elements/QS-infinitePics/index.vue';
import QSwitch from '@/components/QS-inputs-split/elements/QS-switch/index.vue';
import http from '../../common/js/request.js';
export default {
	computed: {
		...mapState(['hasLogin', 'forcedLogin', 'serverUrl', 'user'])
	},
	components: {
		QSInput,
		QSRadio,
		QSCheckbox,
		QSPickerCity,
		QSPickerDate,
		QSPickerCustom,
		QSPickerCustom2,
		QSPics,
		QSInfinitePics,
		QSwitch
	},
	data() {
		return {
			usertypeArray: [
				{
					name: '个人用户',
					value: '1'
				},
				{
					name: '企业类型',
					value: '2'
				}
			],
			entity: {
				id:'',
				usertype: '1',
				realname: '',
				nativeplace: '',
				nowplace: '',
				idcardimage1: '',
				idcardimage2: '',
				companylicence: '',
				accountlicence:'',
				corporateIdentityCart1:'',
				corporateIdentityCart2: '',
				companyname: '',
				companyaddress: '',
				companylinkname: '',
				companylinkphone: ''
			},
			idcardimage1: [{ name: 'idcardimage1' }],
			idcardimage2: [{ name: 'idcardimage2' }],
			companylicence: [{ name: 'companylicence' }],
			accountlicence: [{ name: 'accountlicence' }],
			corporateIdentityCart1: [{ name: 'corporateIdentityCart1' }],
			corporateIdentityCart2: [{ name: 'corporateIdentityCart2' }]
		};
	},
	onReady() {
		for( var a in this.user){
			this.entity[a]=this.user[a]
		}
		console.log(this.user)
	
	},
	methods: {
		uploadImage(typeNname, url) {
			console.log(typeNname+":"+url)
			this.entity[typeNname] = url;
		},
		toSave() {
			var that=this;
			if(!this.check()){
				
				uni.showToast({
					icon: 'none',
					title: '请填写完整'
				});
				
				return ;
			}
			
			
			uni.showModal({
				title: '提示',
				content: '确认保存？',
				success: function(res) {
					if (res.confirm) {
						
						
						uni.showToast({
							title: '正在发送验证码',
							icon: 'loading',
							success: () => {
								
								let submit={};
								    submit.url='/message/getYanzhengma/' + that.user.phone + '/update';
									submit.data={};
								http.getWithNoStatus(submit).then(res=>{
									
									uni.showToast({
										icon: 'none',
										title: '发送成功'
									});
									that.entity.id=that.user.id;
									that.entity.phone=that.user.phone;
									//前往短信验证码码页面
									uni.navigateTo({
										url: '../user/audit?item='+ encodeURIComponent(JSON.stringify(that.entity))
									})
									
								},err=>{
									
									uni.showToast({
										icon:'none',
										title:'发送失败'
									})
									
									
								})
								
								/* uni.request({
									url: that.serverUrl + '/message/getYanzhengma/' + that.user.phone + '/update', //仅为示例，并非真实接口地址。
									data: {},
									header: {
										//自定义请求头信息
									},
									success: res => {
										console.log(res.data);
										uni.showToast({
											icon: 'none',
											title: '发送成功'
										});
										that.entity.id=that.user.id;
										that.entity.phone=that.user.phone;
										//前往短信验证码码页面
										uni.navigateTo({
											url: '../user/audit?item='+ encodeURIComponent(JSON.stringify(that.entity))
										})
										
									}
								}); */
							}
						});
					} else if (res.cancel) {
						console.log('用户点击取消');
					}
				}
			});
		},
		check(){
			var entity=this.entity;
			var a1=["usertype",'realname','nativeplace','nowplace','idcardimage1','idcardimage2']
			var a2=["usertype",'companylicence','accountlicence','corporateIdentityCart1','corporateIdentityCart2','companyname','companyaddress','companylinkname','companylinkphone']
			if(entity.usertype==1){
				
				for(var i=0;i<a1.length;i++){
					console.log(a1[i]+":"+entity[a1[i]])
					if(entity[a1[i]]==''||entity[a1[i]]==null)
					    return false;
					
				}
				
				if(entity.bk1){
					
					
					　let reg = new RegExp("^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$");
					  if((!reg.test(entity.bk1))){
						  
						  uni.showToast({
							  icon:'none',
							  title:'邮箱格式不正确',
							  position:'bottom'
						  })
						  
						  return false;
					  }
					 
					
				}
				
				return true;
				
				
			}else{
				
				
				for(var i=0;i<a2.length;i++){
					
					if(entity[a2[i]]==''||entity[a2[i]]==null)
					    return false;
					
				}
				
				return true;
				
				
				
			}
			
			
			
			
		}
	
	}
};
</script>

<style></style>
