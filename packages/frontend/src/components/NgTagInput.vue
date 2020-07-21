<template>
  <div class="tag-container">
    <el-input
      class="input-new-tag"
      v-if="inputVisible"
      v-model="inputValue"
      ref="saveTagInput"
      size="small"
      @keyup.enter.native="handleInputConfirm"
      @blur="handleInputConfirm"
    ></el-input>
    <el-button v-else class="button-new-tag" size="small" @click="showInput">+ NGワードを追加</el-button>
    <el-tag
      :key="tag"
      v-for="tag in words.slice().reverse()"
      closable
      :disable-transitions="false"
      type="info"
      effect="plain"
      @close="handleClose(tag)"
    >{{ tag }}</el-tag>
  </div>
</template>

<style lang="scss" scoped>
.tag-container {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
  width: 100%;
}
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-right: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  min-width: 90px;
  margin-right: 10px;
  vertical-align: bottom;
}
</style>

<script>
export default {
  name: "NgTagInput",
  props: ["label", "words"],
  methods: {
    handleClose(tag) {
      this.$store.dispatch("catalog/removeNgSearchWords", tag);
      this.$store.dispatch("saveLocalStorage");
    },
    showInput() {
      this.inputVisible = true;
      this.$nextTick(() => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },
    handleInputConfirm() {
      const { inputValue } = this;
      if (inputValue) {
        this.$store.dispatch("catalog/addNgSearchWords", inputValue);
        this.$store.dispatch("saveLocalStorage");
      }
      this.inputVisible = false;
      this.inputValue = "";
    }
  },
  data() {
    return {
      inputVisible: false,
      inputValue: ""
    };
  }
};
</script>
