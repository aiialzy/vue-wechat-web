<template>
  <div class="wrap" @click="handleHide">
    <div class="main">
      <div class="main-left">
        <left-header></left-header>
        <left-search></left-search>
        <left-chat-list></left-chat-list>
      </div>
      <div class="main-right">
        <keep-alive>
          <component :is="currentRight"></component>
        </keep-alive>
      </div>
    </div>
  </div>
</template>

<script>
import LeftHeader from "./Left/LeftHeader";
import LeftSearch from "./Left/LeftSearch";
import LeftChatList from "./Left/LeftChatList/LeftChatList";

import Chat from "./Right/Chat/Chat";
import LinkmanInfo from "./Right/LinkmanInfo/LinkmanInfo";

export default {
  name: "Main",
  components: {
    LeftHeader,
    LeftSearch,
    LeftChatList,
    Chat,
    LinkmanInfo
  },
  data() {
    return {
      tabs: [Chat, LinkmanInfo]
    };
  },
  computed: {
    currentRight() {
      return this.tabs[this.$store.state.currentRight];
    }
  },
  methods: {
    handleHide() {
      this.$store.commit("hideAll");
    }
  }
};
</script>

<style scoped>
.wrap {
  height: 100vh;
  overflow: hidden;
}

.main {
  max-width: 1000px;
  min-width: 800px;
  height: 100%;
  border-radius: 3px;
  margin: 0 auto;
  display: flex;
}

.main-left {
  width: 280px;
  height: 100%;
  background-color: #2e3238;
}

.main-right {
  background-color: #eee;
  flex-grow: 1;
}
</style>
