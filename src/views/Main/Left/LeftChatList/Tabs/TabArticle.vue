<template>
  <div class="left-chat-list-tab-wrap">
    <div class="article" v-for="(article, index) in articles" :key="'article' + index">
      <div class="info-wrap">
        <div class="avatar-wrap">
          <img :src="article.avatar" class="avatar" />
        </div>
        <div class="username">{{ article.username }}</div>
        <div class="time">{{ article.time }}</div>
      </div>
      <div
        class="detail-wrap"
        :class="{ 'detail-wrap-selected': currentArticle === index }"
        @click="currentArticle = index"
      >
        <div class="title">{{ article.title }}</div>
        <div class="img-wrap">
          <img :src="article.img" class="img" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import avatar from "@/assets/default.png";
import img from "@/assets/background.png";

export default {
  name: "TabChat",
  data() {
    return {
      articles: [],
      currentArticle: -1,
    };
  },
  mounted() {
    for (let i = 0; i < 20; i++) {
      this.articles.push({
        avatar,
        username: "昵称",
        time: "20:13",
        title: "这是文章标题",
        img
      });
    }
  }
};
</script>

<style scoped>
.article {
  cursor: pointer;
}

.article:nth-child(1n + 2) {
  border-top: 10px solid #292d32;
}

.info-wrap {
  display: flex;
  padding: 10px 20px;
  color: #888;
  font-size: 12px;
}

.avatar-wrap {
  margin-right: 10px;
}

.avatar {
  width: 20px;
  height: 20px;
  border-radius: 50%;
}

.username {
  flex-grow: 1;
  display: flex;
  align-items: center;
}

.time {
  display: flex;
  align-items: center;
}

.detail-wrap {
  padding: 10px 18px 9px;
  border-bottom: 1px solid rgb(41, 44, 51);
  display: flex;
  justify-content: space-between;
}

.detail-wrap-selected {
  background-color: #3a3f45;
}

.title {
  color: #fff;
  font-size: 13px;
  display: flex;
  align-items: center;
}

.img-wrap {
  margin-left: 10px;
}

.img {
  width: 40px;
  height: 40px;
}
</style>