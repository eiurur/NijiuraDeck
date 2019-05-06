<template>
  <el-dialog title="カタログ" width="90vw" top="5vh" :visible.sync="modal">
    <ul class="catalog">
      <li v-for="{ id, title, number, img } in list" :key="id" class="thread">
        <img class="image" :src="img">
        <div class="body">
          <div class="title">{{ title }}</div>
          <div class="number">
            <span>{{number}} res</span>
          </div>
        </div>
      </li>
    </ul>
  </el-dialog>
</template>

<style lang="scss" scoped>
ul.catalog {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
li.thread {
  cursor: pointer;
  width: 6.66%;
  color: #666;
  font-size: 13px;
  margin: 5px;
  transition: box-shadow ease-in 0.1s, opacity ease-in 0.2s;
  &:hover {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  }
}
img.image {
  object-fit: cover;
  width: 100%;
  height: 120px;
}
.body {
  padding: 0.5em;
}
.title {
}
.number {
  text-align: right;
}
</style>

<script>
export default {
  name: "Catalog",
  computed: {
    list() {
      return this.$store.getters["catalog/getList"];
    },
    modal: {
      get() {
        return this.$store.getters["catalog/getModal"];
      },
      set() {
        // TODO: Tabの値から取得する
        this.$store.dispatch("catalog/updateModal");
      }
    }
  },
  data() {
    return {
      formLabelWidth: "120px"
    };
  }
};
</script>