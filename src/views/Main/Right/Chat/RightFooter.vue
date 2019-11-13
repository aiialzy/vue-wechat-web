<template>
  <div class="wrap" :style="{ visibility: isNoChat ? 'hidden' : 'visible' }">
    <div
      class="expression-wrap"
      :class="{ 'expression-wrap-hidden': !isShowExpression }"
      @click.stop=""
    >
      <div class="expression-header">
        <div
          v-for="(expression, index) in expressions"
          :key="'expression' + index"
          class="expression-item"
          :class="{ 'expression-item-selected': expressionIndex === index }"
          @click.stop="expressionIndex = index"
        >
          {{ expression.title }}
        </div>
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
            :style="{
              background: `url(${expressions[expressionIndex].img}) ${col.y}px ${col.x}px`
            }"
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
    <pre
      id="content-input"
      class="content-input list-wrap"
      contenteditable="true"
      @paste="handleCopy"
      @keypress.enter.exact.prevent.stop="handleSend"
      @keydown.ctrl.enter.prevent.stop="handleLineFeed"
      @click="handleEditorFocus"
      @keyup="handleEditorFocus"
    ></pre>
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

function handleMessage(ctnInput) {
  let ctn = [];
  for (let i = 0; i < ctnInput.childNodes.length; i++) {
    const node = ctnInput.childNodes[i];
    if (node.nodeType === Node.TEXT_NODE) {
      ctn.push(node.textContent);
    } else if (node.nodeType === Node.ELEMENT_NODE) {
      if (node.nodeName.toUpperCase() === "IMG") {
        const dataset = node.dataset;
        ctn.push(
          `<img src="${spacer}" class="expression-icon-small" style="width: 20px; height: 20px; display: inline-block; vertical-align: middle; background: url(${dataset.url}) ${dataset.y}px ${dataset.x}px" />`
        );
        //let img = `[${dataset.type} ${dataset.x} ${dataset.y}]`;
        //ctn.push(img);
      } else if (node.nodeName.toUpperCase() === "DIV") {
        ctn.push("\n");
        ctn.push(handleMessage(node));
      }
    }
  }
  return ctn.join("");
}

export default {
  name: "RightFooter",
  data() {
    return {
      expressions: [],
      expressionIndex: 0,
      lastEditRange: null
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
    handleEditorFocus() {
      this.lastEditRange = getSelection().getRangeAt(0);
    },
    handleAddExpression(rIndex, cIndex) {
      const ctnInput = document.querySelector("#content-input");
      const scrollTop = ctnInput.scrollTop;

      let item = this.expressions[this.expressionIndex].items[rIndex][cIndex];
      let sx = item.sx;
      let sy = item.sy;
      const editor = document.querySelector("#content-input");
      const selection = window.getSelection();
      if (!selection.isCollapsed) {
        document.execCommand("delete");
      }
      editor.focus();
      if (this.lastEditRange) {
        selection.removeAllRanges();
        selection.addRange(this.lastEditRange);
      }
      let type;
      if (this.expressionIndex === 0) {
        type = "qqfaces";
      } else {
        type = "emoji";
      }
      document.execCommand(
        "insertHTML",
        false,
        `<img src="${spacer}" data-url="${
          this.expressions[this.expressionIndex].smallImg
        }" data-x="${sx}" data-y="${sy}" class="expression-icon-small" style="width: 20px; height: 20px; display: inline-block; vertical-align: middle; background: url(${
          this.expressions[this.expressionIndex].smallImg
        }) ${sy}px ${sx}px" />`
      );

      this.lastEditRange = selection.getRangeAt(0);
      ctnInput.scrollTop = scrollTop;
    },
    handleLineFeed() {
      document.execCommand("insertParagraph");
      const ctnInput = document.querySelector("#content-input");
      ctnInput.scrollTop += 22.4;
    },
    handleCopy(e) {
      e.preventDefault();
      //获取粘贴板内容
      const ctn = e.clipboardData.getData("text");
      const ctnInput = document.querySelector("#content-input");
      document.execCommand("insertText", false, ctn);
    },
    handleSend() {
      const ctnInput = document.querySelector("#content-input");
      let ctn = handleMessage(ctnInput).trim();

      if (ctn === "") {
        return;
      }

      const reg = /\<\/?.*\>/gi;
      const imgReg = /^<img.*>$/i;
      ctn = ctn.replace(reg, (match, offset, string) => {
        if (match.match(imgReg) !== null) {
          return match;
        }
        let aMatch = match;
        aMatch = aMatch.replace(/^</, "&lt;");
        aMatch = aMatch.replace(/>$/, "&gt;");
        return aMatch;
      });

      const myself = this.$store.state.myself;
      this.$store.commit("sendMessage", {
        type: "chat",
        time: new Date(),
        sender: myself.id,
        nickname: myself.nickname,
        avatar: myself.avatar,
        ctn
      });

      this.$nextTick(() => {
        const content = document.querySelector("#content");
        content.scrollTop = content.scrollHeight;
        document.execCommand("selectAll");
        document.execCommand("delete");
      });
    },
    alert() {
      alert("功能仍未实现");
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
  margin: 0;
  outline: none;
  overflow: auto;
  color: #000;
  font-size: 14px;
  line-height: 22.4px;
  word-wrap: break-word;
  white-space: pre-wrap;
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
  margin-bottom: 5px;
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
  user-select: none;
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
</style>
