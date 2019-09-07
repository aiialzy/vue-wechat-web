<template>
  <div class="left-header-wrap">
    <info-block :visible="isShowMyInfo" :memberInfo="myInfo" :infoPosition="infoPosition" :canChat="false"></info-block>
    <div class="avatar">
      <img class="avatar-img" :src="avatar" @click.stop="handleShowMyInfo($event)" />
    </div>
    <div class="nickName">{{ nickname }}</div>
  </div>
</template>

<script>
import img from '@/assets/default.png';
import InfoBlock from '@/components/InfoBlock';

export default {
  name: 'LeftHeader',
  components: {
    InfoBlock,
  },
  data() {
    return {
      infoPosition: {
        left: -1,
        top: -1,
      },
    };
  },
  computed: {
    isShowMyInfo() {
      return this.$store.state.isShowMyInfo;
    },
    avatar() {
      return this.$store.state.myself.avatar;
    },
    nickname() {
      return this.$store.state.myself.nickname;
    },
    myInfo() {
      return this.$store.state.myself;
    }
  },
  methods: {
    handleShowMyInfo(event) {
      const { clientX: x, clientY: y } = event;
      this.infoPosition.top = y;
      this.infoPosition.left = x;
      this.$store.commit("setMyInfo", true);
    },
  },
}
</script>

<style scoped>
.left-header-wrap {
  display: flex;
  width: 244px;
  height: 40px;
  padding: 18px;
}

.avatar {
  width: 40px;
  height: 40px;
  margin-right: 11px;
}

.avatar-img {
  width: 40px;
  height: 40px;
  cursor: pointer;
}

.nickName {
  height: 40px;
  flex-grow: 1;
  color: #fff;
  font-size: 18px;
  display: flex;
  align-items: center;
}
</style>