<template>
	<view>
		<view class="content" @touchstart="hideDrawer">
			<scroll-view class="msg-list" scroll-y="true" :scroll-with-animation="scrollAnimation" :scroll-top="scrollTop" :scroll-into-view="scrollToView" @scrolltoupper="loadHistory" upper-threshold="50">
				<!-- 加载历史数据waitingUI -->
				<!-- <view class="loading">
					<view class="spinner">
						<view class="rect1"></view>
						<view class="rect2"></view>
						<view class="rect3"></view>
						<view class="rect4"></view>
						<view class="rect5"></view>
					</view>
				</view> -->
				<view class="row" v-for="(row,index) in linkList[id].history" :key="index" :id="'msg'+row.msg.id">
					
				
					<!-- 用户消息 -->
					<block v-if="row.type=='user'">
						<!-- 自己发出的消息 -->
						<view class="my" v-if="row.msg.userinfo.uid==user.id">
							<!-- 左-消息 -->
							<view class="left">
								
								<!-- 文字消息 -->
								<view v-if="row.msg.type=='text'" class="bubble">
									<rich-text :nodes="row.msg.content.text"></rich-text>
								</view>
								<!-- 语言消息 -->
								<view v-if="row.msg.type=='voice'" class="bubble voice" @tap="playVoice(row.msg)" :class="playMsgid == row.msg.id?'play':''">
									<view class="length">{{row.msg.content.length}}</view>
									<view class="icon my-voice"></view>
								</view>
								<!-- 图片消息 -->
								<view v-if="row.msg.type=='img'" class="bubble img" @tap="showPic(row.msg)">
									<image :src="row.msg.content.url" :style="{'width': row.msg.content.w+'px','height': row.msg.content.h+'px'}"></image>
								</view>						
							</view>
							<!-- 右-头像 -->
							<view class="right">
								<image :src="row.msg.userinfo.username=='系统通知'?row.msg.userinfo.face:row.msg.userinfo.face"></image>
							</view>
						</view>
						<!-- 别人发出的消息 -->
						<view class="other" v-else>
							<!-- 左-头像 -->
							<view class="left">
								<image :src="row.msg.userinfo.username=='系统通知'?row.msg.userinfo.face:row.msg.userinfo.face"></image>
							</view>
							<!-- 右-用户名称-时间-消息 -->
							<view class="right">
								<view class="username">
									<view class="name">{{row.msg.userinfo.username}}</view> <view class="time">{{row.msg.time}}</view>
								</view>
								<!-- 文字消息 -->
								<view v-if="row.msg.type=='text'" class="bubble">
									<rich-text :nodes="row.msg.content.text"></rich-text>
								</view>
								<!-- 语音消息 -->
								<view v-if="row.msg.type=='voice'" class="bubble voice" @tap="playVoice(row.msg)" :class="playMsgid == row.msg.id?'play':''">
									<view class="icon other-voice"></view>
									<view class="length">{{row.msg.content.length}}</view>
								</view>
								<!-- 图片消息 -->
								<view v-if="row.msg.type=='img'" class="bubble img" @tap="showPic(row.msg)">
									<image :src="row.msg.content.url" :style="{'width': row.msg.content.w+'px','height': row.msg.content.h+'px'}"></image>
								</view>
								
							</view>
						</view>
					</block>
				</view>
			</scroll-view>
		</view>
		<!-- 抽屉栏 -->
		<view class="popup-layer" :class="popupLayerClass" @touchmove.stop.prevent="discard">
			<!-- 表情 --> 
			<!-- <swiper class="emoji-swiper" 
			@animationfinish="moveend($event)" 
			:class="{hidden:hideEmoji}" 
			indicator-dots="true" 
			duration="150" 
			:current="dotsCurrent"
			>
				<swiper-item v-for="(page,pid) in emojiList" :key="pid">
					<view v-for="(em,eid) in page" :key="eid" @tap="addEmoji(em)">
						<image mode="widthFix" :src="'/static/img/emoji/'+em.url"></image>
					</view>
				</swiper-item>
			</swiper> -->
			<emotion @addEmoji="addEmoji" :class="{hidden:hideEmoji}" ></emotion>
			<!-- 更多功能 相册-拍照-红包 -->
			<view class="more-layer" :class="{hidden:hideMore}">
				<view class="list">
					<view class="box" @tap="chooseImage">
						<view class="icon tupian2"></view>
					</view>
					<view class="box" @tap="camera">
						<view class="icon paizhao"></view>
					</view>
					<view class="box" @tap="handRedEnvelopes">
						<view class="icon hongbao"></view>
					</view>
					
					
					<view class="box" @tap="yuyintonghua">
						<image style="font-size:16px;width: 32px; height: 32px;" 
						src="../../static/img/more/yuyintonghua.png"></image>
					</view>
					<view class="box" @tap="weizhi">
						<image style="font-size:16px;width: 32px; height: 32px;" 
						src="../../static/img/more/weizhi.png"></image>
					</view>
					<!-- <view class="box" @tap="handRedEnvelopes">
						<image style="font-size:16px;width: 32px; height: 32px;" 
						src="../../static/img/more/红包.png"></image>
					</view> -->
					
					<view class="box" @tap="yuyinshuru">
						<image style="font-size:16px;width: 32px; height: 32px;" 
						src="../../static/img/more/yuyinshuru.png"></image>
					</view>
					
					<view class="box" @tap="meShouchang">
						<image style="font-size:16px;width: 32px; height: 32px;" 
						src="../../static/img/more/me-shouchang.png"></image>
					</view>
					
					<view class="box" @tap="userinfo">
						<image style="font-size:16px;width: 32px; height: 32px;" 
						src="../../static/img/more/userinfo.png"></image>
					</view>
					
					
					<!-- <view class="box" @tap="handRedEnvelopes">
						<image style="font-size:16px;width: 32px; height: 28px;" src="../../static/img/more/文件.png"></image>
					</view> -->
				</view>
			</view>
		</view>
		<!-- 底部输入栏 -->
		<view class="input-box" :class="popupLayerClass" @touchmove.stop.prevent="discard" v-if="linkList[id].title!='admin'">
			<!-- H5下不能录音，输入栏布局改动一下 -->
			<!-- #ifndef H5 -->
			<view class="voice">
				<view class="icon" :class="isVoice?'jianpan':'yuyin'" @tap="switchVoice"></view>
			</view>
			<!-- #endif -->
			<!-- #ifdef H5 -->
			<view class="more" @tap="showMore">
				<view class="icon add"></view>
			</view>
			<!-- #endif -->
			<view class="textbox">
				<view class="voice-mode" :class="[isVoice?'':'hidden',recording?'recording':'']" @touchstart="voiceBegin" @touchmove.stop.prevent="voiceIng" @touchend="voiceEnd" @touchcancel="voiceCancel">{{voiceTis}}</view>
				<view class="text-mode"  :class="isVoice?'hidden':''">
					<view class="box">
						<textarea auto-height="true" v-model="textMsg" @focus="textareaFocus"/>
					</view>
					<view class="em" @tap="chooseEmoji">
						<view class="icon biaoqing"></view>
					</view>
				</view>
			</view>
			<!-- #ifndef H5 -->
			<view class="more" @tap="showMore">
				<view class="icon add"></view>
			</view>
			<!-- #endif -->
			<view class="send" :class="isVoice?'hidden':''" @tap="sendText">
				<view class="btn">发送</view>
			</view>
		</view>
		<!-- 录音UI效果 -->
		<view class="record" :class="recording?'':'hidden'">
			<view class="ing" :class="willStop?'hidden':''"><view class="icon luyin2" ></view></view>
			<view class="cancel" :class="willStop?'':'hidden'"><view class="icon chehui" ></view></view>
			<view class="tis" :class="willStop?'change':''">{{recordTis}}</view>
		</view>
		<!-- 红包弹窗 -->
		<view class="windows" :class="windowsState">
			<!-- 遮罩层 -->
			<view class="mask" @touchmove.stop.prevent="discard" @tap="closeRedEnvelope"></view>
			<view class="layer" @touchmove.stop.prevent="discard">
				<view class="open-redenvelope">
					<view class="top">
						<view class="close-btn">
							<view class="icon close" @tap="closeRedEnvelope"></view>
						</view>
						<image src="/static/img/im/face/face_1.jpg"></image>
					</view>
					<view class="from">来自{{redenvelopeData.from}}</view>
					<view class="blessing">{{redenvelopeData.blessing}}</view>
					<view class="money">{{redenvelopeData.money}}</view>
					<view class="showDetails" @tap="toDetails(redenvelopeData.rid)">
						查看领取详情 <view class="icon to"></view>
					</view>
				</view>
			</view>
			
		</view>
	</view>
</template>
<script>
	import emotion from '@/components/emotion/index.vue'
	import emojiData from "../../static/emoji/emojiData.js"
	import { mapState, mapMutations } from 'vuex';
	let msgType = require("../../components/chat/msgtype.js");
	let disp = require("../../utils/broadcast");
	export default {
		components: {
			emotion
		},
		computed:mapState(['linkList','userName','user','serverUrl']),
		data() {
			return {
				//文字消息
				// dotsCurrent:1,
				textMsg:'',
				//消息列表
				isHistoryLoading:false,
				scrollAnimation:false,
				scrollTop:0,
				scrollToView:'',
				msgList:[],
				msgImgList:[],
				myuid:0,
				to:'',
				
				//录音相关参数
				// #ifndef H5
				//H5不能录音
				RECORDER:uni.getRecorderManager(),
				// #endif
				isVoice:false,
				voiceTis:'按住 说话',
				recordTis:"手指上滑 取消发送",
				recording:false,
				willStop:false,
				initPoint:{identifier:0,Y:0},
				recordTimer:null,
				recordLength:0,
				id:'',
				//播放语音相关参数
				AUDIO:uni.createInnerAudioContext(),
				playMsgid:null,
				VoiceTimer:null,
				// 抽屉参数
				popupLayerClass:'',
				// more参数
				hideMore:true,
				//表情定义
				hideEmoji:true,
				emojiList:[{}],
				emojiPath:'',
				//红包相关参数
				windowsState:'',
				redenvelopeData:{
					rid:null,	//红包ID
					from:null,
					face:null,
					blessing:null,
					money:null
				}
			};
		},
		onLoad(option) {
			let _this = this;
			let Id=option.id;
			const that=this;
			this.id=Id;
			this.to=this.linkList[this.id].title;
			this.getMsgList();
			//语音自然播放结束
			this.AUDIO.onEnded((res)=>{
				this.playMsgid=null;
			});
			// #ifndef H5
			//录音开始事件
			this.RECORDER.onStart((e)=>{
				this.recordBegin(e);
			})
			//录音结束事件
			this.RECORDER.onStop((e)=>{
				this.recordEnd(e);
			})
			// #endif
			
		    disp.on("em.chat.reSuccess",function(index){
			
			    let data=that.linkList;
				that.$nextTick(function() {
						that.scrollToView = 'msg'+(data[that.id].history.length-1);
				});
			
			});
			this.emojiList =emojiData.imgArr[1].emojiList
			uni.setNavigationBarTitle({
				title:this.linkList[Id].name,
				success() {
					
				}
			})
			
		},
		onBackPress(e){
			  
			  console.log(e)
			  let data=this.linkList;
			  data[this.id].count=null;
			  this.setLinkList(data)
		},
		onShow(){
			this.scrollTop = 9999999;
			
			//模板借由本地缓存实现发红包效果，实际应用中请不要使用此方法。
			//
			
			
		
		},
		methods:{
			 ...mapMutations(['setLinkList']),
			// moveend(e){
			//    console.log(e.detail)
			//    if(e.detail.current===4){
			// 		this.dotsCurrent=Object.assign(this.dotsCurrent,1)
			// 	}
			// },
			// 接受消息(筛选处理)
			screenMsg(msg){
				//从长连接处转发给这个方法，进行筛选处理
				let data=this.linkList;
				  
				if(msg.type=='system'){
					// 系统消息
					switch (msg.msg.type){
						case 'text':
							this.addSystemTextMsg(msg);
							break;
						case 'redEnvelope':
							this.addSystemRedEnvelopeMsg(msg);
							break;
					}
				}else if(msg.type=='user'){
					// 用户消息
					switch (msg.msg.type){
						case 'text':
						    data[this.id].message=msg.msg.content.text.length>8?'信息[文字]':msg.msg.content.text;
							this.addTextMsg(msg);
							break;
						case 'voice':
						   data[this.id].message='信息[语音]';
							this.addVoiceMsg(msg);
							break;
						case 'img':
						    data[this.id].message='信息[图片]';
							this.addImgMsg(msg);
							break;
						case 'redEnvelope':
							this.addRedEnvelopeMsg(msg);
							break;
					}
					// console.log('用户消息');
					//非自己的消息震动
					
				
				}
				
					data[this.id].history=this.msgList;
					this.setLinkList(data);
					this.$nextTick(function() {
					this.scrollToView = 'msg'+(data[this.id].history.length-1);
					});
					disp.fire('em.chat.saveHistory')
				  
			},
			//触发滑动到顶部(加载历史信息记录)
			loadHistory(e){
				console.log("加载历史记录。。")
				this.isHistoryLoading = false;
			
			},
			// 加载初始页面消息
			getMsgList(){
			
				let list=this.linkList[this.id].history;
				// 获取消息中的图片,并处理显示尺寸
				for(let i=0;i<list.length;i++){
					if(list[i].type=='user'&&list[i].msg.type=="img"){
						list[i].msg.content = this.setPicSize(list[i].msg.content);
						this.msgImgList.push(list[i].msg.content.url);
					}
				}
				this.msgList = list;
				// 滚动到底部
				this.$nextTick(function() {
					//进入页面滚动到底部
					this.scrollTop = 9999;
					this.$nextTick(function() {
						this.scrollAnimation = true;
					});
					
				});
			},
			//处理图片尺寸，如果不处理宽高，新进入页面加载图片时候会闪
			setPicSize(content){
				// 让图片最长边等于设置的最大长度，短边等比例缩小，图片控件真实改变，区别于aspectFit方式。
				let maxW = uni.upx2px(350);//350是定义消息图片最大宽度
				let maxH = uni.upx2px(350);//350是定义消息图片最大高度
				if(content.w>maxW||content.h>maxH){
					let scale = content.w/content.h;
					content.w = scale>1?maxW:maxH*scale;
					content.h = scale>1?maxW/scale:maxH;
				}
				return content;
			},
			
			//更多功能(点击+弹出) 
			showMore(){
				this.isVoice = false;
				this.hideEmoji = true;
				if(this.hideMore){
					this.hideMore = false;
					this.openDrawer();
				}else{
					this.hideDrawer();
				}
			},
			// 打开抽屉
			openDrawer(){
				this.popupLayerClass = 'showLayer';
			},
			// 隐藏抽屉
			hideDrawer(){
				this.popupLayerClass = '';
				setTimeout(()=>{
					this.hideMore = true;
					this.hideEmoji = true;
				},150);
			},
			// 选择图片发送
			chooseImage(){
				this.getImage('album');
			},
			//拍照发送
			camera(){
				this.getImage('camera');
			},
			//发红包
			handRedEnvelopes(){
				
				uni.showToast({
					icon:'none',
					title:'该功能暂未实现'
				})
			},
			//选照片 or 拍照
			getImage(type){
				this.hideDrawer();
			    const me=this;
				uni.chooseImage({
					sourceType:[type],
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					success: (resa)=>{
						for(let i=0;i<resa.tempFilePaths.length;i++){
							uni.getImageInfo({
								src: resa.tempFilePaths[i],
								success: (res)=>{
									
									var allowType = {
										jpg: true,
										gif: true,
										png: true,
										bmp: true
									};
									var token = this.$im.conn.context.accessToken;
									var str = me.$im.config.appkey.split("#");
									var width = res.width;
									var height = res.height;
									var index = res.path.lastIndexOf(".");
									var filetype = (~index && res.path.slice(index + 1)) || "";
									if(filetype.toLowerCase() in allowType){
										uni.uploadFile({
											url: "https://a1.easemob.com/" + str[0] + "/" + str[1] + "/chatfiles",
											filePath: resa.tempFilePaths[i],
											name: "file",
											header: {
												"Content-Type": "multipart/form-data",
												Authorization: "Bearer " + token
											},
											success(res){
												var data = res.data;
												var dataObj = JSON.parse(data);
												var id = me.$im.conn.getUniqueId();		// 生成本地消息 id
												var msg = new me.$im.message(msgType.IMAGE, id);
												var file = {
													type: msgType.IMAGE,
													size: {
														width: width,
														height: height
													},
													url: dataObj.uri + "/" + dataObj.entities[0].uuid,
													filetype: filetype,
													filename: resa.tempFilePaths[i]
												};
												msg.set({
													apiUrl: me.$im.config.apiURL,
													body: file,
													from: me.user.phone,
													to: me.to,
													roomType: false,
													chatType: 'singleChat',
													ext:me.user,
													success: function (argument) {
														
														let nowDate=new Date;
														let msg2={ type:'user',
					                                              msg:
							                                          {id:me.linkList[me.id].history.length,
							                                           time:nowDate.getHours()+":"+nowDate.getMinutes(),
							                                           type:'img',
																	   userinfo:
																	   {
                                                                          uid:me.user.id,
								                                          username:me.user.username,
								                                          face:me.user.headimage,					 
								                                        },
								                                       content:{url:resa.tempFilePaths[i],w:width,h:height},
								                                      }
					                                             }	
														
														
														me.screenMsg(msg2);
													}
												});
												
												me.$im.conn.send(msg.body);
												
											}
										});
									}
									
									// console.log(image.width);
									// console.log(image.height);
									
								}
							});
						}
					}
				});
			},
			// 选择表情
			chooseEmoji(){
				this.hideMore = true;
				if(this.hideEmoji){
					this.hideEmoji = false;
					this.openDrawer();
				}else{
					this.hideDrawer();
				}
			},
			//添加表情
			addEmoji(em){
				//判断删除按钮
				if(em.emojiItem.alt==='[删除]'){
				 //  uni.showToast({
				 //  	title:"触发删除操作",
					// icon:"none"
				 //  })
				  var str;
				  var msglen = this.textMsg.length - 1;
				  let start = this.textMsg.lastIndexOf("[");
				  let end = this.textMsg.lastIndexOf("]");
				  let len = end - start;
				  if(end != -1 && end === msglen && len >= 2 && len <= 4){
					    // 表情字符
						str = this.textMsg.slice(0, start);
					}else{
						// 普通键盘输入汉字 或者字符
						str = this.textMsg.slice(0, msglen);
					}
					
					this.textMsg = str
				  
					return;
				}
				// console.log(em)
				this.emojiList =emojiData.imgArr[em.groupIndex].emojiList
				this.emojiPath =emojiData.imgArr[em.groupIndex].emojiPath
				if(em.minEmoji===false){
					this.sendBigEmoji(em.emojiItem.url)
				}else{
				  // this.textMsg+=em.alt;
				  this.textMsg+=em.emojiItem.alt;
				}
			},
			// 发送大表情
			sendBigEmoji(url){
				this.hideDrawer();//隐藏抽屉
				if(!url){
				    return;
				}
				let imgstr = '<img style="width:48px;height:48px;" src="'+ this.emojiPath + url +'">';
				let content = '<div style="display:flex;align-items: center;word-wrap:break-word;">'
				             + imgstr
				             + '</div>';    
				let msg = {text:content}
				this.sendMsg(msg,'text');
				this.textMsg = '';//清空输入框
				
				
			},
			//获取焦点，如果不是选表情ing,则关闭抽屉
			textareaFocus(){
				if(this.popupLayerClass=='showLayer' && this.hideMore == false){
					this.hideDrawer();
				}
			},
			// 发送文字消息
			sendText(){
				
				this.hideDrawer();//隐藏抽屉
				if(!this.textMsg){
					return;
				}
				let content = this.replaceEmoji(this.textMsg);
				let msg = {text:content}
				this.sendMsg(msg,'text');
				this.textMsg = '';//清空输入框
			},
			//替换表情符号为图片
			replaceEmoji(str){
				// 正则表达式匹配内容
				let replacedStr = str.replace(/\[([^(\]|\[)]*)\]/g,(item, index)=>{
					// console.log("item: " + item);
					for(let i=0;i<this.emojiList.length;i++){
						let row = this.emojiList[i];
						for(let j=0;j<row.length;j++){
							let EM = row[j];
							if(EM.alt==item){
								//在线表情路径，图文混排必须使用网络路径，请上传一份表情到你的服务器后再替换此路径 
								//比如你上传服务器后，你的100.gif路径为https://www.xxx.com/emoji/100.gif 则替换onlinePath填写为https://www.xxx.com/emoji/
								// let onlinePath = 'https://s2.ax1x.com/2019/04/12/'
								// let imgstr = '<image src="'+onlinePath+this.onlineEmoji[EM.url]+'">';
								
								let onlinePath=this.emojiPath
								let imgstr = '<img style="width:24px;height:24px;" src="'+onlinePath+EM.url+'">';
								// console.log("imgstr: " + imgstr);
								return imgstr;
							}
						}
					}
				});
				return '<div style="align-items: center;word-wrap:break-word;">'+replacedStr+'</div>';
			},
			
			// 发送消息
			sendMsg(content,type){
				//实际应用中，此处应该提交长连接，模板仅做本地处理。
				if(type=='text'){
				let me = this;			
				let id = this.$im.conn.getUniqueId();
				let msg = new this.$im.message(msgType.TEXT, id);
				msg.set({
					msg: content.text,
					from: this.user.phone,
					to: this.to,
					roomType: false,
					ext:me.user,
					chatType: 'singleChat',
					success(id, serverMsgId){
						//console.log('成功了')
					 var nowDate = new Date();
					 let lastid = this.id;
					     lastid++; 
					 let msg = {type:'user',
					            msg:
							    {id:me.linkList[me.id].history.length,
							    time:nowDate.getHours()+":"+nowDate.getMinutes(),
								type:type,userinfo:
							    {
								 uid:me.user.id,
								 username:me.user.username,
								 face:me.user.headimage,				 
								 },
								 content:content,
								 }
						}	
					// 发送消息
					me.screenMsg(msg); 
				    		
					},
					fail(id, serverMsgId){
						console.log('发送信息失败了')
						
					}
				});
				
				
				try{
					this.$im.conn.send(msg.body);
				}catch(e){
					console.log(e);
				}
				
				
				
				
				
				}
				
			},
			
			// 添加文字消息到列表
			addTextMsg(msg){
				
				this.msgList.push(msg);
				
			},
			// 添加语音消息到列表
			addVoiceMsg(msg){
				
				this.msgList.push(msg);
				
			},
			// 添加图片消息到列表
			addImgMsg(msg){
				
				msg.msg.content = this.setPicSize(msg.msg.content);
				this.msgImgList.push(msg.msg.content.url);
				this.msgList.push(msg);
				
			},
			addRedEnvelopeMsg(msg){
				
				this.msgList.push(msg);
				
			},
			// 添加系统文字消息到列表
			addSystemTextMsg(msg){
				
				this.msgList.push(msg);
				
				
			},
			// 添加系统红包消息到列表
			addSystemRedEnvelopeMsg(msg){
				
			
			},
			// 打开红包
			openRedEnvelope(msg,index){
				
				
				
				
			},
			// 关闭红包弹窗
			closeRedEnvelope(){
			
			
			
			},
			sendSystemMsg(content,type){
				
				
				
			},
			//领取详情
			toDetails(rid){
				
			},
			// 预览图片
			showPic(msg){
				uni.previewImage({
					indicator:"none",
					current:msg.content.url,
					urls: [msg.content.url]
				});
			},
			// 播放语音
			playVoice(msg){
				this.playMsgid=msg.id;
				this.AUDIO.src = msg.content.url;
				this.$nextTick(function() {
					this.AUDIO.play();
				});
			},
			// 录音开始
			voiceBegin(e){
				if(e.touches.length>1){
					return ;
				}
				this.initPoint.Y = e.touches[0].clientY;
				this.initPoint.identifier = e.touches[0].identifier;
				this.RECORDER.start({format:"mp3"});//录音开始,
			},
			//录音开始UI效果
			recordBegin(e){
				this.recording = true;
				this.voiceTis='松开 结束';
				this.recordLength = 0;
				this.recordTimer = setInterval(()=>{
					this.recordLength++;
				},1000)
			},
			// 录音被打断
			voiceCancel(){
				this.recording = false;
				this.voiceTis='按住 说话';
				this.recordTis = '手指上滑 取消发送'
				this.willStop = true;//不发送录音
				this.RECORDER.stop();//录音结束
			},
			// 录音中(判断是否触发上滑取消发送)
			voiceIng(e){
				if(!this.recording){
					return;
				}
				let touche = e.touches[0];
				//上滑一个导航栏的高度触发上滑取消发送
				if(this.initPoint.Y - touche.clientY>=uni.upx2px(100)){
					this.willStop = true;
					this.recordTis = '松开手指 取消发送'
				}else{
					this.willStop = false;
					this.recordTis = '手指上滑 取消发送'
				}
			},
			// 结束录音
			voiceEnd(e){
				if(!this.recording){
					return;
				}
				this.recording = false;
				this.voiceTis='按住 说话';
				this.recordTis = '手指上滑 取消发送'
				this.RECORDER.stop();//录音结束
			},
			//录音结束(回调文件)
			recordEnd(e){
				clearInterval(this.recordTimer);
				if(!this.willStop){
					// console.log("e: " + JSON.stringify(e));
					let msg2 = {
						length:0,
						url:e.tempFilePath
					}
					let min = parseInt(this.recordLength/60);
					let sec = this.recordLength%60;
					min = min<10?'0'+min:min;
					sec = sec<10?'0'+sec:sec;
					msg2.length = min+':'+sec;
					var str = this.$im.config.appkey.split("#");
					var me = this;
					var token = this.$im.conn.context.accessToken;
					uni.uploadFile({
						url: "https://a1.easemob.com/" + str[0] + "/" + str[1] + "/chatfiles",
						filePath: msg2.url,
						name: "file",
						header: {
							"Content-Type": "multipart/form-data",
							Authorization: "Bearer " + token
						},
						success(res){
							// 发送 xmpp 消息
							var id = me.$im.conn.getUniqueId();
							var msg = new me.$im.message(msgType.AUDIO, id);
							var dataObj = JSON.parse(res.data);
							// 接收消息对象
							msg.set({
								apiUrl: me.$im.config.apiURL,
								accessToken: token,
								body: {
									type: msgType.AUDIO,
									url: dataObj.uri + "/" + dataObj.entities[0].uuid,
									filetype: "",
									filename: msg2.url,
									accessToken: token,
									length: Math.ceil(msg2.length)
								},
								from: me.user.phone,
								to: me.to,
								roomType: false,
								chatType: 'singleChat',
								ext:me.user,
								success: function (argument) {
									disp.fire('em.chat.sendSuccess', id);
									let nowDate=new Date;
									let msg3={ type:'user',
									          msg:
									              {id:me.linkList[me.id].history.length,
									               time:nowDate.getHours()+":"+nowDate.getMinutes(),
									               type:'voice',
												   userinfo:
												   {
									                   uid:me.user.id,
									                  username:me.user.username,
									                  face:me.user.headimage,					 
									                },
									               content:msg2,
									              }
									         }	
										 
									me.screenMsg(msg3); 
									
								}
							});
							
							//console.log('发送的语音消息', msg.body)
							me.$im.conn.send(msg.body);
							
						}
					});
					
					
					
				}else{
					// console.log('取消发送录音');
				}
				this.willStop = false;
			},
			// 切换语音/文字输入
			switchVoice(){
				this.hideDrawer();
				this.isVoice = this.isVoice?false:true;
			},
			discard(){
				return;
			}
		}
	}
</script>
<style lang="scss">
	@import "@/static/HM-chat/css/style.scss"; 
</style>