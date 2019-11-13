<template>
  <div style="height: 73px;">
    <div class="wrap">
      <info-block
        :visible="isShowMemberInfo"
        :memberInfo="memberInfo"
        :infoPosition="infoPosition"
        :canChat="canChat"
      ></info-block>
      <div class="info-wrap">
        <div
          class="info-pack"
          :style="{ visibility: isNoChat ? 'hidden' : 'visible' }"
          @click.stop="handleShowMembers"
        >
          <div class="info-nickname">{{ nickname }}</div>
          <div class="info-icon-wrap">
            <i :class="`icon ${isShowMembers ? 'icon-up' : 'icon-down'}`"></i>
          </div>
        </div>
      </div>
      <div
        class="members-wrap list-wrap"
        :class="{ 'members-wrap-hidden': !isShowMembers }"
        @click.stop="handleHideMemberInfo"
      >
        <div class="members-detail-wrap">
          <div class="member-wrap">
            <i class="icon icon-add-friends"></i>
          </div>
          <div
            class="member-wrap"
            v-for="(member, index) in members"
            :key="'member' + index"
          >
            <img
              class="member-avatar"
              :src="member.avatar"
              @click.stop="handleShowMemberInfo($event, index)"
            />
            <div class="member-nickname">
              {{ member.alias ? member.alias : member.nickname }}
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import avatar from "@/assets/default.png";
import InfoBlock from "@/components/InfoBlock";

function getLinkman(ctx) {
  const state = ctx.$store.state;
  let currentChatId = state.currentChatId;
  if (currentChatId === -1) {
    return null;
  }

  const chats = state.chats;

  let linkmanIndex = state.chats[currentChatId];
  for (let chat of chats) {
    if (chat.chatId === currentChatId) {
      linkmanIndex = chat.linkmanIndex;
      break;
    }
  }
  let linkman = state.linkmans[linkmanIndex];
  return linkman;
}

export default {
  name: "RightHeader",
  components: {
    InfoBlock
  },
  data() {
    return {
      isHidden: false,
      memberInfoIndex: -1,
      infoPosition: {
        left: -1,
        top: -1
      },
      memberInfoIndex: -1
    };
  },
  computed: {
    isShowMembers() {
      return this.$store.state.isShowMembers;
    },
    isShowMemberInfo() {
      return this.$store.state.isShowMemberInfo;
    },
    isNoChat() {
      return this.$store.state.currentChatId === -1;
    },
    nickname() {
      const linkman = getLinkman(this);
      if (linkman === null) {
        return "";
      }
      return linkman.alias !== "" ? linkman.alias : linkman.nickname;
    },
    members() {
      const linkman = getLinkman(this);
      if (linkman === null) {
        return [];
      }
      if (linkman.type !== "group") {
        return [linkman];
      }
      const members = [];
      members.push(this.$store.state.linkmans[1]);
      members.push(this.$store.state.linkmans[2]);
      members.push({
        id: "p13321",
        type: "A",
        nickname: "用户差",
        gender: "",
        alias: "",
        region: "这是地区",
        avatar
      });
      return members;
    },
    memberInfo() {
      const linkman = getLinkman(this);
      if (!linkman) {
        return {};
      }
      if (linkman.type !== "group") {
        return linkman;
      }
      return this.members[this.memberInfoIndex];
    },
    canChat() {
      const member = this.members[this.memberInfoIndex];
      if (!member) {
        return false;
      }
      for (let linkman of this.$store.state.linkmans) {
        if (member.id === linkman.id) {
          return true;
        }
      }
      return false;
    }
  },
  methods: {
    handleShowMembers() {
      this.$store.commit("setMembers", !this.$store.state.isShowMembers);
    },
    handleShowMemberInfo(event, index) {
      const { clientX: x, clientY: y } = event;
      this.infoPosition.top = y;
      this.infoPosition.left = x;
      this.memberInfoIndex = index;
      this.$store.commit("setMemberInfo", true);
    },
    handleHideMemberInfo() {
      this.$store.commit("setMemberInfo", false);
    }
  }
};
</script>

<style scoped>
.wrap {
  height: 51px;
  background-color: #eee;
}

.info-wrap {
  height: 30px;
  padding: 10px 0;
  margin: 0 19px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-bottom: 1px solid #d6d6d6;
  position: relative;
  background-color: #eee;
  z-index: 10;
}

.info-pack {
  display: flex;
  cursor: pointer;
  user-select: none;
}

.info-nickname {
  font-size: 14px;
}

.info-icon-wrap {
  margin-left: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.icon {
  display: block;
  background: url(../../../../assets/opt-but.png) no-repeat;
  background-size: 487px 462px;
}

.icon-down {
  width: 10px;
  height: 10px;
  background-position: -477px -65px;
}

.icon-up {
  width: 10px;
  height: 10px;
  background-position: -477px -55px;
}

.members-wrap {
  width: 100%;
  box-shadow: 1px 1px 1px #e0e0e0;
  background-color: #eee;
  border-bottom: 1px solid #dedede;
  opacity: 1;
  transition: 0.2s;
  visibility: visible;
  position: relative;
  z-index: 1;
  top: 0;
}

.members-wrap-hidden {
  position: relative;
  top: -20px;
  transition: 0.2s;
  opacity: 0;
  visibility: hidden;
}

.members-detail-wrap {
  min-height: 95px;
  max-height: 300px;
  padding: 10px 4px 8px 17px;
  display: flex;
  flex-wrap: wrap;
}

.member-wrap {
  width: 55px;
  height: 85px;
  padding-top: 10px;
  margin: 0 15px 0 7px;
}

.icon-add-friends {
  width: 55px;
  height: 55px;
  background-position: -422px -55px;
  cursor: pointer;
}

.member-avatar {
  width: 55px;
  height: 55px;
  display: block;
  cursor: pointer;
}

.member-nickname {
  height: 30px;
  font-size: 12px;
  color: #888;
  display: flex;
  justify-content: center;
  align-items: center;
}

.list-wrap {
  overflow: auto;
}

.list-wrap::-webkit-scrollbar {
  width: 5px;
  height: 8px;
  /*background-color: #2e3238;*/
  background-color: #eee;
  border-radius: 10px;
}

.list-wrap::-webkit-scrollbar-thumb {
  border-radius: 10px;
  background-color: #c3c3c3;
}
</style>
