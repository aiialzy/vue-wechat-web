<template>
  <div class="right-content-wrap">
    <img class="avatar" :src="linkman.avatar" />
    <h4 class="nickname">{{ linkman.alias ? linkman.alias : linkman.nickname }}</h4>
    <button class="button" @click="sendMessage">发消息</button>
  </div>
</template>

<script>
import avatar from "@/assets/default.png";

export default {
  name: "RightContent",
  computed: {
    linkman() {
      const currentLinkman = this.$store.state.currentLinkman;
      return this.$store.state.linkmans[currentLinkman];
    }
  },
  methods: {
    sendMessage() {
      this.$store.commit('addChat', this.$store.state.currentLinkman);
    }
  }
};
</script>

<style scoped>
.right-content-wrap {
  height: 300px;
  padding: 80px 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.avatar {
  width: 100px;
  height: 100px;
  display: block;
  margin-bottom: 22px;
}

.nickname {
  font-size: 24px;
  line-height: 38.4px;
  height: 38.4px;
  font-weight: 400;
  margin: 0 0 40px;
}

.button {
  width: 200px;
  height: 40px;
  border: none;
  outline: none;
  background-color: #42ac3e;
  border-radius: 4px;
  color: #fff;
  font-size: 14px;
  cursor: pointer;
}
</style>