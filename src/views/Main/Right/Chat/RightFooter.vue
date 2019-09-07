<template>
  <div class="wrap" :style="{ visibility: isNoChat ? 'hidden' : 'visible' }">
    <div
      class="expression-wrap"
      :class="{ 'expression-wrap-hidden': !isShowExpression}"
      @click.stop=";"
    >
      <div class="expression-header">
        <div
          v-for="(expression, index) in expressions"
          :key="'expression' + index"
          class="expression-item"
          :class="{ 'expression-item-selected': expressionIndex === index}"
          @click.stop="expressionIndex = index"
        >{{ expression.title }}</div>
      </div>
      <div class="expression-content list-wrap">
        <div
          v-for="(row, rIndex) in expressions[expressionIndex].items"
          :key="'eRow' + rIndex"
          class="expression-row"
        >
          <a
            v-for="(col, cIndex) in row"
            :key="'eCol' + cIndex"
            :title="col.title"
            class="expression-icon"
            :style="{'background': `url(${expressions[expressionIndex].img}) ${col.y}px ${col.x}px`}"
            @click="handleAddExpression(rIndex, cIndex)"
          ></a>
        </div>
      </div>
    </div>
    <div class="menu">
      <div class="icon-wrap">
        <i class="icon icon-emoji" @click.stop="handleShowExpression"></i>
      </div>
      <div class="icon-wrap">
        <i class="icon icon-screencut" @click.stop="alert"></i>
      </div>
      <div class="icon-wrap">
        <i class="icon icon-file" @click.stop="alert"></i>
      </div>
    </div>
    <div
      id="content-input"
      class="content-input list-wrap"
      contenteditable="true"
      @keypress.ctrl.enter.exact.stop="handleLineFeed"
      @keypress.enter.exact.stop="handleSend"
    ></div>
    <div class="action">
      <div class="action-txt">按 Ctrl+Enter 进行换行</div>
      <button class="action-btn" @click="handleSend">发送</button>
    </div>
  </div>
</template>

<script>
import qqFaces from "@/assets/qq-faces.png";
import qqFacesSmall from "@/assets/qq-faces-small.png";
import emoji from "@/assets/emoji.png";
import emojiSmall from "@/assets/emoji-small.png";
import avatar from "@/assets/default.png";
import spacer from "@/assets/spacer.gif";

export default {
  name: "RightFooter",
  data() {
    return {
      expressions: [],
      expressionIndex: 0
    };
  },
  created() {
    let items = [];
    for (let i = 0; i < 7; i++) {
      items.push([]);
      for (let o = 0; o < 15; o++) {
        items[i].push({
          title: "Smile",
          x: -(i * 29),
          y: -(o * 29),
          sx: -(i * 24),
          sy: -(o * 24)
        });
      }
    }
    this.expressions.push({
      title: "QQ Faces",
      img: qqFaces,
      smallImg: qqFacesSmall,
      items
    });

    items = [];
    for (let i = 0; i < 12; i++) {
      items.push([]);
      for (let o = 0; o < 15; o++) {
        if (i === 11 && o === 12) {
          break;
        }
        items[i].push({
          title: "Smile",
          x: 2 - i * 32,
          y: 2 - o * 32,
          sx: 2 - i * 32,
          sy: 2 - o * 32
        });
      }
    }

    this.expressions.push({
      title: "Emoji",
      img: emoji,
      smallImg: emoji,
      items
    });
  },
  computed: {
    isShowExpression() {
      return this.$store.state.isShowExpression;
    },
    isNoChat() {
      return this.$store.state.currentChatId === -1;
    }
  },
  methods: {
    handleShowExpression() {
      this.$store.commit("setMembers", false);
      this.$store.commit("setMemberInfo", false);
      this.$store.commit("setExpression", !this.$store.state.isShowExpression);
    },
    handleAddExpression(rIndex, cIndex) {
      let item = this.expressions[this.expressionIndex].items[rIndex][cIndex];
      let sx = item.sx;
      let sy = item.sy;
      const img = document.createElement("img");
      img.setAttribute("width", "20");
      img.setAttribute("height", "20");
      img.setAttribute("src", spacer);
      img.setAttribute("class", "expression-icon-small");
      img.style.setProperty(
        "background",
        `url("${this.expressions[this.expressionIndex].smallImg}") ${sy}px ${sx}px`
      );
      const ctn = document.querySelector("#content-input");
      if (ctn.lastChild && ctn.lastChild.tagName === "DIV") {
        if (
          ctn.lastChild.firstChild &&
          ctn.lastChild.firstChild.tagName === "BR"
        ) {
          ctn.lastChild.removeChild(ctn.lastChild.firstChild);
        }
        ctn.lastChild.append(img);
      } else {
        ctn.append(img);
      }
    },
    handleLineFeed() {
      const div = document.createElement("div");
      const br = document.createElement("br");
      div.append(br);
      const ctn = document.querySelector("#content-input");
      ctn.append(div);
    },
    handleSend() {
      const ctnInput = document.querySelector("#content-input");
      let ctn = ctnInput.textContent.trim();
      if (ctn === '') {
        return;
      }
      const myself = this.$store.state.myself;
      this.$store.commit("sendMessage", {
        type: "chat",
        time: new Date(),
        sender: myself.id,
        nickname: myself.nickname,
        avatar: myself.avatar,
        ctn,
      });

      ctnInput.innerHTML = '';

      this.$nextTick(() => {
        const content = document.querySelector('#content');
        content.scrollTop = content.scrollHeight;
      });
    },
    alert() {
      alert('功能仍未实现');
    }
  }
};
</script>

<style scoped>
.wrap {
  width: 701px;
  height: 180px;
  margin-right: 19px;
  border-top: 1px solid rgb(214, 214, 214);
  position: relative;
}

.menu {
  display: flex;
  padding: 5px 17px;
}

.icon-wrap {
  margin-right: 5px;
}

.icon {
  display: block;
  width: 30px;
  height: 30px;
  background: url(../../../../assets/opt-but.png) no-repeat;
  background-size: 487px 462px;
  cursor: pointer;
}

.icon-emoji {
  background-position: -404px -398px;
}

.icon-screencut {
  background-position: -30px -432px;
}

.icon-file {
  background-position: -120px -432px;
}

.content-input {
  height: 84px;
  min-width: 1px;
  padding-left: 20px;
  outline: none;
  overflow: auto;
  color: #000;
  font-size: 14px;
  line-height: 26px;
  vertical-align: text-top;
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

.action {
  margin-top: 5px;
  height: 30px;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}

.action-txt {
  display: flex;
  align-items: center;
  color: #888;
  font-size: 12px;
  margin: 0 7px 0 10px;
}

.action-btn {
  padding: 3px 30px;
  border: 1px solid #c1c1c1;
  outline: none;
  background-color: #fff;
  color: #222;
  border-radius: 4px;
  font-size: 14px;
  cursor: pointer;
}

.action-btn:hover {
  background-color: #f8f8f8;
}

.expression-wrap {
  width: 476px;
  height: 274px;
  position: absolute;
  top: -274px;
  left: 15px;
  background-color: #f2f2f2;
  border: 1px solid #dedede;
  overflow: hidden;
  opacity: 1;
  transition: 0.3s;
  visibility: visible;
  text-decoration: none;
  color: #333;
  cursor: default;
  display: flex;
  flex-direction: column;
}

.expression-wrap-hidden {
  top: -254px;
  opacity: 0;
  transition: 0.3s;
  visibility: hidden;
}

.expression-header {
  margin: 0;
  list-style: none;
  padding: 8px 20px 0;
  display: flex;
}

.expression-item {
  float: left;
  padding: 5px 20px;
  background-color: #f2f2f2;
  font-size: 14px;
  height: 22px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.expression-item-selected {
  background-color: #fff;
  border-top-left-radius: 4px;
  border-top-right-radius: 4px;
}

.expression-content {
  flex-grow: 1;
  background-color: #fff;
  padding: 15px 20px;
}

.expression-row {
  display: flex;
}

.expression-row:not(:last-child) {
  border-bottom: 1px solid #f0f0f0;
}

.expression-row a:not(:last-child) {
  border-right: 1px solid #f0f0f0;
}

.expression-icon {
  display: inline-block;
  width: 28px;
  height: 28px;
  cursor: pointer;
}

.expression-icon-small {
  display: inline-block;
  width: 20px;
  height: 20px;
}
</style>