<template>
  <div class="catalog-header">
    <div class="input-container">
      <el-input
        placeholder="検索"
        size="small"
        prefix-icon="el-icon-search"
        v-model="searchWord"
        clearable
      ></el-input>
    </div>
    <FavoriteTagInput :words="favoriteSearchWords"></FavoriteTagInput>
    <NgTagInput :words="ngSearchWords"></NgTagInput>
  </div>
</template>

<style lang="scss" scoped>
.catalog-header {
  display: flex;
  align-items: baseline;
  justify-content: flex-start;
  width: 100%;
  flex-direction: column;
  div + div {
    margin-top: 0.5rem;
  }
}
.input-container {
  padding-right: 10px;
  & input {
    min-width: 160px;
  }
}
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
import FavoriteTagInput from "@/components/FavoriteTagInput.vue";
import NgTagInput from "@/components/NgTagInput.vue";

export default {
  name: "CatalogHeader",
  props: ["value"],
  components: {
    FavoriteTagInput,
    NgTagInput
  },
  watch: {
    searchWord() {
      this.commitChange();
    }
  },
  methods: {
    commitChange() {
      this.$emit("input", this.searchWord);
    },
    handleClose(tag) {
      this.$store.dispatch("catalog/removeFavoriteSearchWords", tag);
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
        return this.$store.getters["catalog/getFavoriteSearchWords"] || [];
      },
      set() {}
    },
    ngSearchWords: {
      get() {
        return this.$store.getters["catalog/getNgSearchWords"] || [];
      },
      set() {}
    }
  }
};
</script>
