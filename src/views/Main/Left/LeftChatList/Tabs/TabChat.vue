<template>
  <div class="left-chat-list-tab-wrap">
    <div
      v-for="(chat, index) in chats"
      :key="'chat' + index"
      class="chat-wrap"
      :class="{ 'chat-wrap-top': chat.isOnTop, 'chat-wrap-selected': currentChatIndex === index }"
      @click="handleChangeChat(index)"
    >
      <div class="chat-avatar">
        <img style="width: 40px; height: 40px; border-radius: 2px;" :src="chat.avatar" />
      </div>
      <div class="chat-msg">
        <span class="chat-msg-nickname">{{ chat.alias !== '' ? chat.alias : chat.nickname }}</span>
        <span class="chat-msg-message">{{ chat.messages.length === 0 ? '' : chat.messages[chat.messages.length-1].ctn }}</span>
      </div>
      <div class="chat-info">
        <span
          class="chat-info-time"
          :style="{ color: currentChatIndex === index ? '#fff' : ''}"
        >{{ chat.messages.length === 0 ? '' : getTime(chat.messages[chat.messages.length - 1].time) }}</span>
        <div class="chat-info-icon-wrap" v-if="chat.isMute">
          <i :class="`icon ${currentChatIndex === index ? 'icon-mute-light' : 'icon-mute-dark' }`"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import avatar from "@/assets/default.png";

export default {
  name: "TabChat",
  data() {
    return {
    };
  },
  computed: {
    chats() {
      const linkmans = this.$store.state.linkmans;
      return this.$store.state.chats
              .map((chat) => {
                return {
                  ...chat,
                  ...linkmans[chat.linkmanIndex],
                  message: null,
                }
              })
              .sort((a, b) => {
                return a.isOnTop ? -1 : 0;
              });
    },
    currentChatIndex() {
      for (let i=0; i<this.chats.length; i++) {
        if (this.chats[i].chatId === this.$store.state.currentChatId) {
          return i;
        }
      }
    }
  },
  methods: {
    handleChangeChat(index) {
      this.$store.commit('setChatId', this.chats[index].chatId);
    },
    getTime(time) {
      return `${time.getHours()}:${time.getMinutes()}`;
    }
  },
};
</script>

<style scoped>
.list-title {
  color: #787b87;
  padding: 2px 18px;
  font-size: 14px;
  height: 24px;
}

.chat-wrap {
  height: 40px;
  padding: 12px 18px 11px;
  border-bottom: 1px solid rgb(41, 44, 51);
  display: flex;
  font-size: 13px;
  cursor: pointer;
  border-bottom: 1px solid rgb(41, 44, 51);
  color: #989898;
  user-select: none;
}

.chat-wrap-top {
  background-color: #2e3641;
}

.chat-wrap-selected {
  background-color: #3a3f45;
  color: #fff;
}


.chat-avatar {
  margin-right: 10px;
}

.chat-msg {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.chat-msg-nickname {
  color: #fff;
}

.chat-msg-message {
  user-select: none;
  overflow-wrap: normal;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 161px;
}

.chat-info {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.chat-info-time {
  color: #6b6f7c;
  user-select: none;
}

.chat-info-icon-wrap {
  flex-grow: 1;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
}

.icon {
  width: 20px;
  height: 20px;
  background: url(../../../../../assets/opt-but.png) no-repeat;
  background-size: 487px 462px;
}

.icon-mute-light {
  background-position: -311px -432px;
}

.icon-mute-dark {
  background-position: -401px -357px;
}


</style>