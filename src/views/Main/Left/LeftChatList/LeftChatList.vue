<template>
  <div class="left-chat-list-wrap">
    <div class="left-chat-list-tab">
      <a
        v-for="(nav, index) in navs"
        :key="'nav' + index"
        class="left-chat-list-tab-icon-wrap"
        :title=" nav.title"
        @click="handleChangeTab(index)"
      >
        <i class="left-chat-list-tab-icon"
          :class="nav.icon + (index === currentNav ? '-selected' : '')"></i>
      </a>
    </div>
    <keep-alive>
      <component :is="navs[currentNav].tab"></component>
    </keep-alive>
  </div>
</template>

<script>
import TabChat from './Tabs/TabChat';
import TabLinkman from './Tabs/TabLinkman';
import TabArticle from './Tabs/TabArticle';

export default {
  name: "LeftChatList",
  components: {
    TabChat,
    TabLinkman,
    TabArticle,
  },
  data() {
    return {
      navs: [
        {
          title: "聊天",
          icon: "left-chat-list-tab-chat",
          tab: TabChat,
        },
        {
          title: "通讯录",
          icon: "left-chat-list-tab-linkman",
          tab: TabLinkman,
        },
        {
          title: "文章",
          icon: "left-chat-list-tab-article",
          tab: TabArticle,
        }
      ],
    };
  },
  computed: {
    currentNav() {
      return this.$store.state.currentTabIndex;
    }
  },
  methods: {
    handleChangeTab(index) {
      this.$store.commit('setCurrentTab', index);
    }
  },
};
</script>

<style scoped>
.left-chat-list-tab {
  height: 35px;
  display: flex;
  border-bottom: 1px solid #24272c;
  padding-bottom: 6px;
}

.left-chat-list-tab-icon-wrap {
  display: flex;
  justify-content: center;
  flex-grow: 1;
  cursor: pointer;
  position: relative;
}

.left-chat-list-tab-icon-wrap::after {
  content: ' ';
  position: absolute;
  top: 7px;
  right: 0;
  width: 0;
  height: 20px;
  border-right: 1px solid #24272c;
}

.left-chat-list-tab-icon {
  background: url(../../../../assets/opt-but.png) no-repeat;
  width: 35px;
  height: 35px;
}

.left-chat-list-tab-chat {
  background-position: -150px -96px;
  background-size: 487px 462px;
}

.left-chat-list-tab-chat-selected {
  background-position: -185px -96px;
  background-size: 487px 462px;
}

.left-chat-list-tab-linkman {
  background-position: -220px -96px;
  background-size: 487px 462px;
}

.left-chat-list-tab-linkman-selected {
  background-position: -304px -246px;
  background-size: 487px 462px;
}

.left-chat-list-tab-article {
  background-position: -376px -322px;
  background-size: 487px 462px;
}

.left-chat-list-tab-article-selected {
  background-position: -304px -281px;
  background-size: 487px 462px;
}

.left-chat-list-tab-wrap {
  min-height: 280px;
  height: calc(100vh - 156px);
  overflow: auto;
}

.left-chat-list-tab-wrap::-webkit-scrollbar {
  width: 5px;
  height: 8px;
  /*background-color: #2e3238;*/
  background-color: #aaa;
  border-radius: 10px;
}

.left-chat-list-tab-wrap::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #000;
}


</style>