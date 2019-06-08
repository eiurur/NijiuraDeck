<template>
  <div class="catalog-header">
    <div class="input-container">
      <el-input
        placeholder="検索"
        prefix-icon="el-icon-search"
        @change.native="onChangeInput"
        v-model="searchWord"
      ></el-input>
    </div>
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
      <el-button v-else class="button-new-tag" size="small" @click="showInput">+ お気に入り検索ワードを追加</el-button>
      <el-tag
        :key="tag"
        v-for="tag in favoriteSearchWords.slice().reverse()"
        closable
        :disable-transitions="false"
        type="info"
        effect="plain"
        @close="handleClose(tag)"
      >{{tag}}</el-tag>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.catalog-header {
  display: flex;
  align-items: baseline;
  justify-content: flex-start;
  width: 100%;
  padding: 0 0.5em 0.5em 0;
}
.input-container {
  padding-right: 10px;
  & input {
    min-width: 160px;
  }
}
.tag-container {
  flex-wrap: nowrap;
  display: flex;
  overflow-x: auto;
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
  width: 90px;
  margin-right: 10px;
  vertical-align: bottom;
}
</style>

<script>
export default {
  name: "CatalogHeader",
  props: ["value"],
  methods: {
    onChangeInput(event) {
      this.commitChange();
    },
    commitChange() {
      this.$emit("input", this.searchWord);
    },

    handleClose(tag) {
      this.$store.dispatch("catalog/removeFavoriteSearchWords", tag);
      this.$store.dispatch("saveLocalStorage");
    },

    showInput() {
      this.inputVisible = true;
      this.$nextTick(_ => {
        this.$refs.saveTagInput.$refs.input.focus();
      });
    },

    handleInputConfirm() {
      let inputValue = this.inputValue;
      if (inputValue) {
        this.$store.dispatch("catalog/addFavoriteSearchWords", inputValue);
        this.$store.dispatch("saveLocalStorage");
      }
      this.inputVisible = false;
      this.inputValue = "";
    }
  },
  data() {
    return {
      searchWord: this.value,
      inputVisible: false,
      inputValue: ""
    };
  },
  computed: {
    favoriteSearchWords: {
      get() {
        return this.$store.getters["catalog/getFavoriteSearchWords"];
      },
      set() {}
    }
  }
};
</script>