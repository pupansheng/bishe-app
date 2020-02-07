<script>
require('sdk/libs/strophe');
import { mapState, mapMutations } from 'vuex';
import http from './common/js/request.js';
let msgType = require('components/chat/msgtype');
let disp = require('utils/broadcast');
let logout = false;
let is_reconnect = false;
export default {
	
	onLaunch: function() {
		
		console.log('App Launch');
		var me = this;
		
        disp.on('em.chat.saveHistory',function(e){
			
		   // let t=JSON.stringify(me.linkList)
			 let submit={};
			     submit.url='/chatHistory/save'
				 submit.data={
					 id:me.user.phone,
					 chatList:me.linkList
				 }
				http.backPost(submit).then(res=>{
					
					if(res.data.status==false){
						
						uni.showToast({
							icon:'none',
							title:'保存历史记录失败！',
							position:'bottom'
						})
					}
					
					
				},err=>{
					
					uni.showToast({
						icon:'none',
						title:'保存历史记录失败！',
						position:'bottom'
					})
					
				}) 
			
		})
		
		disp.on('em.main.ready', function() {
			
		});
		//离开chatroom
		disp.on('em.chatroom.leave', function() {
			console.log('em.chatroom.leave');
			
		});
		disp.on('em.chat.session.remove', function() {
			
		});
		disp.on('em.chat.audio.fileLoaded', function() {
		
		});

		disp.on('em.main.deleteFriend', function() {
		
		});
		disp.on('em.chat.audio.fileLoaded', function() {
		
		});
		this.$im.conn.listen({
			onOpened: message => {
				this.$im.conn.setPresence();
				if (is_reconnect) {
					is_reconnect = false;
				}
			},
			onReconnect: () => {
				
			uni.showToast({
				icon:'none',
				title:'重新连接环信IM中',
				position:'bottom'
			})
			
			
			
			},
			onSocketConnected: () => {
				
				uni.showToast({
					icon:'none',
					title:'登录im成功',
					position:'bottom'
				})
				
			},
			onClosed: () => {
				uni.showToast({
					icon:'none',
					title:'环信im已断开',
					position:'bottom'
				})
				
				this.$conn.closed = true;
				this.$im.conn.close();
			},
			onRoster: message => {},

			onVideoMessage: message => {
				console.log('onVideoMessage: ', JSON.stringify(message));
				
				
			},

			onAudioMessage: message => {
				
				 var options = { url: message.url };
				//如果是音频则请求服务器转码
				 wx.downloadFile({
				 	url: message.url,
					header: {
					"X-Requested-With": "XMLHttpRequest",
					Accept: "audio/mp3",
						Authorization: "Bearer " + message.accessToken
				 	},
				 	success(res){
					
				    	let filePath=res.tempFilePath
					    let isExists = false;
					 	let linkList = me.linkList;
					 	let date = new Date();
					 	let time = me.dateFormat('YYYY-mm-dd HH:MM', date);
					    let messageEntity={ type:'user',
					 	          msg: {id:0,
					 	                time:time,
					 	                type:'voice',
					 				    userinfo:
					 				    {
					 	                  uid:!message.ext.id?'admin':message.ext.id,
					 	                  username:!message.ext.id?'系统通知':message.ext.username,
					 	                  face:!message.ext.id?"/static/img/face.jpg":message.ext.headimage,					 
					 	                },
					 	               content:{url:filePath,length:message.length},
					 	              }
					 	         }						 
					    let j=0
					    for (let i = 0; i < linkList.length; i++) {
					 	let temp = linkList[i];
					 	if (temp.title == message.from) {
					 		//说明是同一个人发的信息
					 		isExists = true;
							j=temp.history.length;
							messageEntity.msg.id=j;
					 		temp.history.push(messageEntity);
					 		temp.message = '新消息[语言]';
					 		temp.count = temp.count+1;
					 		temp.time = time;
					 		//头像暂且不管
							temp.url=!message.ext.id?['/static/img/face.jpg']:[message.ext.headimage]
					 		break;
					 	}
					 }
					 if (!isExists) {
					 	let mes={
					 		type: message.type,
					 		title: message.from,
					 		name:!message.ext.id?'系统通知':message.ext.username,
					 		url:!message.ext.id?['/static/img/face.jpg']:[message.ext.headimage],//头像
					 		history: [messageEntity],
					 		message: '新消息[语音]',
					 		time: time,
					 		count: 1,
					 		stick: false, //是否为置顶状态
					 		disabled: false, //是否禁止滑动
					 		type2: 2 //普通用户类型消息,
					 		
					 	}
					 	
					 	linkList.push(mes);
					 }
					 //震动
					 if(!message.ext.id||!isExists){
						 
						 uni.vibrateLong();
						 
					 }
              
					 me.setLinkList(linkList);	
					if(isExists){
					  disp.fire('em.chat.reSuccess',j);      
					}
					  disp.fire('em.chat.saveHistory',1)
					 
					},
				 	fail(e){
						
				 		console.log("downloadFile failed", e);
				 	}
				 });	
				
				
				
			},

			onCmdMessage: message => {
				console.log('onCmdMessage', message);
				
				
			},

			

			onTextMessage: message => {
			
				let isExists = false;
				let linkList = me.linkList;
				//此时时间
				let date = new Date();
				let time = me.dateFormat('YYYY-mm-dd HH:MM', date);
				message.time=time;
				
			
			    let messageEntity={   
					
					type:'user',
					msg:{id:0,
					     type:"text",
						 time:time,
						 userinfo:{uid:!message.ext.id?'admin':message.ext.id,
				                   username:!message.ext.id?'系统通知':message.ext.username,
				                   face:!message.ext.id?"/static/img/face.jpg":message.ext.headimage	
								  },
						content:{text:message.data,source:message}}
				}
                     let j=0;
				for (let i = 0; i < linkList.length; i++) {
					let temp = linkList[i];
					if (temp.title == message.from) {
						//说明是同一个人发的信息
						
						isExists = true;
						j=temp.history.length;
						messageEntity.msg.id=j;
						temp.history.push(messageEntity);
						temp.message = message.data.length>10?'新消息[文字]': message.data;
						temp.count = temp.count+1;
						temp.time = time;
						temp.url=!message.ext.id?['/static/img/face.jpg']:[message.ext.headimage]
						//头像暂且不管
						break;
					}
				}
				if (!isExists) {
					
					let mes={
						type: message.type,
						title: message.from,
						name:!message.ext.id?'系统通知':message.ext.username,
						url:!message.ext.id?['/static/img/face.jpg']:[message.ext.headimage],//头像
						history: [messageEntity],
						message: message.data.length>10?'新消息[文字]': message.data,
						time: time,
						count: 1,
						stick: false, //是否为置顶状态
						disabled: false, //是否禁止滑动
						type2: 2 //普通用户类型消息,
						
					}
					
					linkList.push(mes);
				}
                    //震动
					 if(!message.ext.id||!isExists){
						 
						 uni.vibrateLong();
						 
					 }
              
				me.setLinkList(linkList);
				if(isExists){
				  disp.fire('em.chat.reSuccess',j);      
				}
				disp.fire('em.chat.saveHistory')
			},

			onEmojiMessage: message => {
				console.log('onEmojiMessage', message);
			},

			onPictureMessage: message => {
				
				let isExists = false;
				let linkList = me.linkList;
				let date = new Date();
				let time = me.dateFormat('YYYY-mm-dd HH:MM', date);
			   let messageEntity={ type:'user',
				          msg: {id:0,
				                time:time,
				                type:'img',
							    userinfo:
							    {
				                  uid:!message.ext.id?'admin':message.ext.id,
				                  username:!message.ext.id?'系统通知':message.ext.username,
				                  face:!message.ext.id?"/static/img/face.jpg":message.ext.headimage,					 
				                },
				               content:{url:message.url,w:message.width,h:message.height},
				              }
				         }	
				let j=0;		 
			for (let i = 0; i < linkList.length; i++) {
				let temp = linkList[i];
				if (temp.title == message.from) {
					//说明是同一个人发的信息
					isExists = true;
					j=temp.history.length;
					messageEntity.msg.id=j;
					
					temp.history.push(messageEntity);
					
					temp.message = '新消息[图片]';
					temp.count = temp.count+1;
					temp.time = time;
					temp.url=!message.ext.id?['/static/img/face.jpg']:[message.ext.headimage]
					//头像暂且不管
					break;
				}
			}
			if (!isExists) {
				
				let mes={
					type: message.type,
					title: message.from,
					name:!message.ext.id?'系统通知':message.ext.username,
					url:!message.ext.id?['/static/img/face.jpg']:[message.ext.headimage],//头像
					history: [messageEntity],
					message: '新消息[图片]',
					time: time,
					count: 1,
					stick: false, //是否为置顶状态
					disabled: false, //是否禁止滑动
					type2: 2 //普通用户类型消息,
					
				}
			
				linkList.push(mes);
			}
			
			//震动
			if(!message.ext.id||!isExists){
									 
			  uni.vibrateLong();
									 
			}
			
			me.setLinkList(linkList);	
			if(isExists){
			  disp.fire('em.chat.reSuccess',j);      
			}
			disp.fire('em.chat.saveHistory')
				
				
			},

			onFileMessage: message => {
				console.log('onFileMessage', message);
			},

			// 各种异常
			onError: error => {
				console.log(error);
				// 16: server-side close the websocket connection
				if (error.type == this.$im.statusCode.WEBIM_CONNCTION_DISCONNECTED && !logout) {
					if (this.$im.conn.autoReconnectNumTotal < this.$im.conn.autoReconnectNumMax) {
						
						return;
					}
					uni.showToast({
						title: '服务器端关闭websocket连接 强制下线',
						duration: 1500,
						position:'bottom'
					});
					const that=this;
					setTimeout(function(){
						
						uni.removeStorage({
							key:'token'
						})
						that.logout();
						uni.navigateTo({
							url:'pages/login/login'
						})
						logout = true;
						return;
						
					},1500)
					
				}
				// 8: offline by multi login
				if (error.type == this.$im.statusCode.WEBIM_CONNCTION_SERVER_ERROR) {
					uni.showToast({
						icon:'none',
						title:'多重登录',
						position:'bottom'
					})
					
				}
				if (error.type == this.$im.statusCode.WEBIM_CONNCTION_OPEN_ERROR) {
					disp.fire('em.xmpp.error.passwordErr');
					 uni.showToast({
					 	icon:'none',
					 	title:'登录im错误：密码用户不一致',
					 	position:'bottom'
					 })
				}
				if (error.type == this.$im.statusCode.WEBIM_CONNCTION_AUTH_ERROR) {
					disp.fire('em.xmpp.error.tokenErr');
				}
				if (error.type == 'socket_error') {
					///sendMsgError
					console.log('socket_errorsocket_error', error);
					uni.showToast({
						title: '网络已断开',
						icon: 'none',
						duration: 2000,
						position:'bottom'
					});
					disp.fire('em.xmpp.error.sendMsgErr', error);
				}
			}
		});

		
	},
	onShow: function() {
		console.log('App Show');
	},
	onHide: function() {
		console.log('App Hide');
	},
	onError(e) {
		
		console.log("APP 异常！")
		console.log(e);
		
		
	},
	computed: mapState(['forcedLogin', 'hasLogin', 'userName', 'serverUrl', 'user', 'linkList']),
	methods: {
		...mapMutations(['setLinkList','logout']),
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
		onLoginSuccess() {
			uni.hideToast();
			uni.switchTab({
				url: '../chat/chat'
			});
		},

		ack(receiveMsg) {
			// 处理未读消息回执
			var bodyId = receiveMsg.id; // 需要发送已读回执的消息id
			var ackMsg = new this.$im.message('read', this.$im.conn.getUniqueId());
			ackMsg.set({
				id: bodyId,
				to: receiveMsg.from
			});
			this.$im.conn.send(ackMsg.body);
		},

		onMessageError(err) {
			if (err.type === 'error') {
				uni.showToast({
					title: err.errorText
				});
				return false;
			}
			return true;
		},

		getCurrentRoute() {
			let pages = getCurrentPages();
			let currentPage = pages[pages.length - 1];
			return currentPage.route;
		},

		calcUnReadSpot(message) {
			
		}
	}
};
</script>

<style>
/*每个页面公共css */
/* 全局样式 */

@import url('./common/uni/uni.css');
page {
	min-height: 100%;
	display: flex;
}

/* #ifdef MP-BAIDU */
page {
	width: 100%;
	height: 100%;
	display: block;
}

swan-template {
	width: 100%;
	min-height: 100%;
	display: flex;
}

/* 原生组件模式下需要注意组件外部样式 */
custom-component {
	width: 100%;
	min-height: 100%;
	display: flex;
}

/* #endif */

/* #ifdef MP-ALIPAY */
page {
	min-height: 100vh;
}

/* #endif */

/* 原生组件模式下需要注意组件外部样式 */
m-input {
	width: 100%;
	min-height: 100%;
	display: flex;
}

.content {
	display: flex;
	flex: 1;
	flex-direction: column;
	background-color: #efeff4;
	padding: 3upx;
}

.input-group {
	background-color: #ffffff;
	margin-top: 40upx;
	position: relative;
}

.input-group::before {
	position: absolute;
	right: 0;
	top: 0;
	left: 0;
	height: 1upx;
	content: '';
	-webkit-transform: scaleY(0.5);
	transform: scaleY(0.5);
	background-color: #c8c7cc;
}

.input-group::after {
	position: absolute;
	right: 0;
	bottom: 0;
	left: 0;
	height: 1upx;
	content: '';
	-webkit-transform: scaleY(0.5);
	transform: scaleY(0.5);
	background-color: #c8c7cc;
}

.input-row {
	display: flex;
	flex-direction: row;
	position: relative;
}

.input-row .title {
	width: 20%;
	height: 50upx;
	min-height: 50upx;
	padding: 15upx 0;
	padding-left: 30upx;
	line-height: 50upx;
}

.input-row.border::after {
	position: absolute;
	right: 0;
	bottom: 0;
	left: 15upx;
	height: 1upx;
	content: '';
	-webkit-transform: scaleY(0.5);
	transform: scaleY(0.5);
	background-color: #c8c7cc;
}

.btn-row {
	margin-top: 50upx;
	padding: 20upx;
}

button.primary {
	background-color: #0faeff;
}
</style>
