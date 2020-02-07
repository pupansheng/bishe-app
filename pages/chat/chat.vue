<template>
  <view class="content">
    <view class="message-list">
     <wkiwi-swipe-action :options="options" :messagesList="linkList"></wkiwi-swipe-action>
	 <!-- <wkiwi-swipe-action :options="options" :messagesList="messages"></wkiwi-swipe-action> -->
    </view>
  </view>
</template>
<script>
import wkiwiSwipeAction from "../../components/chat/wkiwi-swipe-action.vue";
import { mapState, mapMutations } from 'vuex';
export default {
  components: { wkiwiSwipeAction },
  computed:mapState(['linkList']),
  data() {
    return {
      focus: false,
      isShowView: true,
      options: [
        {
          text: "置顶",
          style: {
            backgroundColor: "#C7C6CD"
          }
        },
        {
          text: "删除",
          style: {
            backgroundColor: "#dd524d"
          }
        }
      ],
      messages: [
		  {
		    title: "系统消息",
		    url: [
		      "http://img1.3lian.com/gif/more/11/201212/0d1252b54be4f2d240b6b7fe4ed35054.jpg"
		    ],
		    message: "这是一条系统消息",
		    time: "15:15",
		    count: 5,
		    stick: false, //是否为置顶状态
		    disabled: false, //是否禁止滑动
		    type: 1 //通知类型消息
		  },
		  {
		    title: "消息任务",
		    url: [
		      "http://img1.3lian.com/gif/more/11/201212/0d1252b54be4f2d240b6b7fe4ed35054.jpg"
		    ],
		    message: "这是一条消息任务",
		    time: "15:15",
		    count: 5,
		    stick: false, //是否为置顶状态
		    disabled: false, //是否禁止滑动
		    type: 1 //通知类型消息
		  },
		  {
		    title: "马云",
		    url: [
		      "http://img1.3lian.com/gif/more/11/201212/0d1252b54be4f2d240b6b7fe4ed35054.jpg"
		    ],
		    message: "什么鬼，我有支付宝[禁止滑动]",
		    time: "15:15",
		    count: 5,
		    stick: false, //是否为置顶状态
		    disabled: true, //是否禁止滑动
		    type: 2 //普通用户类型消息
		  },
		  {
		    title: "扫黑除恶工作小组",
		    url: [
		      "http://img1.3lian.com/gif/more/11/201212/cd1d745ed855bef27f47c8aff0786067.jpg",
		      "http://img1.3lian.com/gif/more/11/201212/c011f2b2ab1a10d79fe931a786503d03.jpg",
		      "http://img1.3lian.com/gif/more/11/201212/cf9d56d05c0cbc1edbf21cf64ad9c341.jpg",
		      "http://img1.3lian.com/gif/more/11/201212/e10e8faa201671b5a2e8a6146f80d99e.jpg"
		    ],
		    message: "原地待命",
		    time: "15:15",
		    count: 22,
		    stick: true,
		    disabled: false, //是否禁止滑动
		    type: 3 //群组消息
		  },
		  {
		    title: "李彦宏",
		    url: [
		      "http://img1.3lian.com/gif/more/11/201212/c011f2b2ab1a10d79fe931a786503d03.jpg"
		    ],
		    message: "抄袭我的吧，我早都做过了",
		    time: "12:13",
		    count: 1,
		    stick: false,
		    disabled: false, //是否禁止滑动
		    type: 2 //普通用户类型消息
		  },
		  {
		    title: "四菜一汤",
		    url: [
		      "http://img1.3lian.com/gif/more/11/201212/cd1d745ed855bef27f47c8aff0786067.jpg",
		      "http://img1.3lian.com/gif/more/11/201212/c011f2b2ab1a10d79fe931a786503d03.jpg",
		      "http://img1.3lian.com/gif/more/11/201212/cf9d56d05c0cbc1edbf21cf64ad9c341.jpg",
		      "http://img1.3lian.com/gif/more/11/201212/e10e8faa201671b5a2e8a6146f80d99e.jpg"
		    ],
		    message: "[语音]32秒",
		    time: "15:15",
		    count: 22,
		    stick: true,
		    disabled: false, //是否禁止滑动
		    type: 3 //群组消息
		  },
		  {
		    title: "雷军",
		    url: [
		      "http://img1.3lian.com/gif/more/11/201212/cf9d56d05c0cbc1edbf21cf64ad9c341.jpg"
		    ],
		    message: "微信给你下线，看你还嘚瑟",
		    time: "12:11",
		    count: 0,
		    stick: false,
		    disabled: false, //是否禁止滑动
		    type: 2 //普通用户类型消息
		  },
		  {
		    title: "前端开发者",
		    url: [
		      "http://img1.3lian.com/gif/more/11/201212/04b335ead07530a6188a27549fad1a68.jpg"
		    ],
		    message: "我们的春天来啦，哈哈哈",
		    time: "11:35",
		    count: 0,
		    stick: false,
		    disabled: false, //是否禁止滑动
		    type: 2 //普通用户类型消息
		  },
		  {
		    title: "微信小程序",
		    url: [
		      "http://img1.3lian.com/gif/more/11/201212/e10e8faa201671b5a2e8a6146f80d99e.jpg"
		    ],
		    message: "谁有内测资格啊啊，300万买一个",
		    time: "08:23",
		    count: 0,
		    stick: false,
		    disabled: false, //是否禁止滑动
		    type: 2 //普通用户类型消息
		  },
		  {
		    title: "小程序",
		    url: [
		      "http://img1.3lian.com/gif/more/11/201212/3fab6379b6ef53e7c17a1cc772eed0d6.jpg"
		    ],
		    message: "这个IDE方便都不要配置了",
		    time: "03:21",
		    count: 5,
		    stick: false,
		    disabled: false, //是否禁止滑动
		    type: 2 //普通用户类型消息
		  }
	  ]
      
    };
  },
  onBackPress(e){
	 
	
	 
  },
  onLoad() {
	  
	  let temp = uni.getStorageSync('chatData2');
	  console.log('聊天历史记录：' + temp);
	 
	  
  },
  methods: {
	...mapMutations(['setLinkList']),
    tosearch() {
      uni.navigateTo({
        url: "../common/search/index"
      });
    }
  },
  onNavigationBarButtonTap(e) {
    if (e.index == 0) {
      this.floatingMenuShow = !this.floatingMenuShow;
    }
  }
};
</script>

<style scoped="true" lang="scss" >
.search-box {
  height: 100upx;
  width: 100%;
  background: #4191ea;
  display: flex;
  flex-flow: nowrap;
  .search-bg {
    box-sizing: border-box;
    height: 80upx;
    padding: 0 30upx;
    line-height: 80upx;
    width: 710upx;
    margin: auto;
    background: rgba(255, 255, 255, 1);
    border-radius: 40upx;
    color: #999;
    display: flex;
    flex-flow: nowrap;
    .search {
      flex: 1;
      height: 80upx;
      line-height: 80upx;
    }
    .iconfont {
      margin-left: 15upx;
    }
  }
}
.floating-menus {
  position: fixed;
  top: 0;
  right: 20upx;
  z-index: 10;
  opacity: 0;
  transition: all 0.4s;
  height: 0;
  overflow: hidden;
}
.floating-menus {
  &.show {
    opacity: 1;
    height: auto;
  }
  &.hidden {
    opacity: 0;
    height: 0;
  }
}
</style>
