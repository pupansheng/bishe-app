import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        /**
         * 是否需要强制登录
         */
        forcedLogin: true,
        hasLogin: false,
        userName: "",
		//serverUrl:"http://m4gijm.natappfree.cc",
		serverUrl:"http://120.79.204.37:8081/",
		token:'',
		user: {},
		data:{},
		linkList:[]
    },
	updated:function(){
			console.log('message update:'+ this.scrollTop);
	},
    mutations: {
        login(state, userName) {
            state.userName = userName || '新用户';
            state.hasLogin = true;
        },
		setToken(state,token) {
		   state.token=token;
		},
        logout(state) {
            state.userName = "";
            state.hasLogin = false;
        },
		updateUser(state,u){
			state.user=u;
		},
		updateData(state,k,v){
			state.data[k]=v;
		},
		setLinkList(state,data){
			state.linkList=data;
			
		}
    }
})

export default store
