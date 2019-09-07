<template>
  <div
    class="member-info-wrap"
    :class="{ 'member-info-wrap-hidden': !visible }"
    :style="{top: infoPosition.top + 'px', left: infoPosition.left + 'px'}"
    @click.stop=";"
  >
    <img class="member-info-avatar" :src="memberInfo.avatar" width="220" height="220" />
    <div class="member-info-detail">
      <div class="member-info-first-row">
        <div class="member-info-nickname">
          <span>{{ memberInfo.nickname }}</span>
          <i :class="`icon ${ memberInfo.gender ? memberInfo.gender === 'man' ? 'icon-man' : 'icon-woman' : '' }`"></i>
        </div>
        <i class="icon icon-chat" v-if="canChat" @click.stop="newChat"></i>
      </div>
      <div class="member-info-text">
        <span style="margin-right: 10px;">备注:</span>
        {{ memberInfo.alias }}
      </div>
      <div class="member-info-text">
        <span style="margin-right: 10px;">地区:</span>
        {{ memberInfo.region }}
      </div>
    </div>
  </div>
</template>

<script>
import avatar from "@/assets/default.png";

export default {
  name: 'MemberInfo',
  props: ['visible', 'memberInfo', 'infoPosition', 'canChat'],
  methods: {
    newChat() {
      this.$store.commit('addChat', this.$store.state.linkmans.indexOf(this.memberInfo));
      this.$store.commit('hideAll');
    }
  },
};
</script>

<style scoped>
.icon {
  display: block;
  background: url(../assets/opt-but.png) no-repeat;
  background-size: 487px 462px;
}

.member-info-wrap {
  position: absolute;
  width: 220px;
  height: 334px;
  box-shadow: rgba(0, 0, 0, 0.1) 0 5px 10px;
  background-color: #eee;
  z-index: 8;
  visibility: visible;
  border-radius: 4px;
  overflow: hidden;
}

.member-info-wrap-hidden {
  visibility: hidden;
}

.member-info-avatar {
  display: block;
  width: 220px;
  height: 220px;
}

.member-info-detail {
  width: 180px;
  height: 74px;
  padding: 20px;
  background-color: #fff;
}

.member-info-first-row {
  height: 28px;
  margin-bottom: 8px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.member-info-nickname {
  display: flex;
  align-items: center;
  font-size: 18px;
}

.icon-man {
  width: 16px;
  height: 16px;
  background-position: -384px -304px;
}

.icon-woman {
  width: 16px;
  height: 16px;
  background-position: -368px -304px;
}

.icon-chat {
  width: 22px;
  height: 22px;
  background-position: -223px -432px;
  cursor: pointer;
}

.member-info-text {
  color: #888;
  font-size: 12px;
  height: 19px;
}
</style>