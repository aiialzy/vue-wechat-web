<template>
  <div style="left-search-wrap">
    <div class="left-search-input-wrap" @click.stop="">
      <i class="left-search"></i>
      <input
        class="left-search-input"
        placeholder="搜索"
        v-model="searchText"
      />
    </div>
    <div
      class="search-result-wrap list-wrap"
      v-if="isShowSearch"
      @click.stop=""
    >
      <div class="search-result-title" v-if="friends.length !== 0">好友</div>
      <div
        v-for="(friend, index) in friends"
        :key="'friend' + index"
        class="search-result-friend"
        @click="handleNewChat(index, 0)"
      >
        <img class="search-result-avatar" :src="friend.avatar" />
        <div class="search-result-text">
          {{ friend.alias !== "" ? friend.alias : friend.nickname }}
        </div>
      </div>
      <div
        class="search-result-title"
        style="margin-top: 10px;"
        v-if="groups.length !== 0"
      >
        群组
      </div>
      <div
        v-for="(group, index) in groups"
        :key="'group' + index"
        class="search-result-friend"
        @click="handleNewChat(index, 1)"
      >
        <img class="search-result-avatar" :src="group.avatar" />
        <div class="search-result-text">{{ group.nickname }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import avatar from "@/assets/default.png";

export default {
  name: "LeftSearch",
  data() {
    return {
      searchText: "",
      friends: [],
      groups: []
    };
  },
  watch: {
    searchText(val) {
      const ctn = val.trim();
      if (ctn === "") {
        this.handleHideSearchResult();
        return;
      }
      this.handleShowSearchResult();
    }
  },
  computed: {
    isShowSearch() {
      return this.$store.state.isShowSearch;
    }
  },
  methods: {
    handleHideSearchResult() {
      this.$store.commit("setSearch", false);
    },
    handleShowSearchResult() {
      const linkmans = this.$store.state.linkmans;
      this.friends = [];
      this.groups = [];

      linkmans.map(linkman => {
        const ctn = this.searchText.trim();
        if (linkman.nickname.includes(ctn) || linkman.alias.includes(ctn)) {
          if (linkman.type === "group") {
            this.groups.push(linkman);
          } else {
            this.friends.push(linkman);
          }
        }
      });
      if (this.friends.length !== 0 || this.groups.length !== 0) {
        this.$store.commit("setSearch", true);
      }
    },
    handleNewChat(index, type) {
      let result;
      if (type === 0) {
        result = this.friends;
      } else {
        result = this.groups;
      }
      const linkmans = this.$store.state.linkmans;
      for (let i = 0; i < linkmans.length; i++) {
        if (linkmans[i].id === result[index].id) {
          this.$store.commit("addChat", i);
          break;
        }
      }
      this.searchText = "";
    }
  }
};
</script>

<style scoped>
.left-search-input-wrap {
  margin: 0 18px 6px;
  height: 32px;
  background-color: #26292e;
  display: flex;
}

.left-search {
  width: 30px;
  height: 30px;
  background: url(../../../assets/opt-but.png) no-repeat;
  background-position: -60px -432px;
  background-size: 487px 462px;
}

.left-search-input {
  flex-grow: 1;
  background-color: #26292e;
  outline: none;
  border: none;
  color: #fff;
  font-size: 12px;
}

.search-result-wrap {
  width: 244px;
  max-height: 420px;
  overflow: auto;
  background-color: #33363b;
  position: absolute;
  margin-left: 18px;
  border-radius: 2px;
  box-shadow: 0 0 10px #2a2a2a;
  z-index: 10;
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

.search-result-title {
  padding: 3px 9px;
  height: 25px;
  color: #787b87;
  font-size: 16px;
  background-color: #393c43;
  display: flex;
  align-items: center;
}

.search-result-friend {
  display: flex;
  padding: 10px 9px;
  border-bottom: 1px solid #33363b;
  background-color: #393c43;
  cursor: pointer;
}

.search-result-avatar {
  width: 30px;
  height: 30px;
  margin-right: 10px;
}

.search-result-text {
  height: 30px;
  color: #fff;
  font-size: 14px;
  display: flex;
  align-items: center;
}
</style>
