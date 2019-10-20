<template>
  <el-dialog title="カタログ" width="90vw" height="75vh" top="5vh" :visible.sync="modal">
    <div class="split--vertical">
      <div ref="scrollable" :gutter="10" class="scrollable w-80">
        <div class="catalog-wrapper" v-loading="threads.loading">
          <CatalogHeader v-model="searchWord"></CatalogHeader>
          <div class="catalog">
            <ThreadList title="お気に入り" :threads="favoriteList"></ThreadList>
            <ThreadList title="一覧" :threads="filteredList"></ThreadList>
          </div>
        </div>
      </div>
      <ThreadPreview :responses="responses" :currentThread="currentThread"></ThreadPreview>
    </div>
  </el-dialog>
</template>

<style lang="scss" scoped>
.split--vertical {
  display: flex;
  position: relative;
}
.catalog-wrapper {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding-right: 20px;
}
.catalog-header {
  display: flex;
  justify-content: flex-start;
  width: 100%;
  padding: 0 0.5em 0.5em 0;
}
.scrollable {
  height: calc(100vh - 25vh);
}
.catalog {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  flex-direction: column;
}
.w-80 {
  width: 80%;
}
</style>

<script>
import ThreadPreview from "@/components/ThreadPreview.vue"; // @ is an alias to /src
import CatalogHeader from "@/components/CatalogHeader.vue"; // @ is an alias to /src
import ThreadList from "@/components/ThreadList.vue"; // @ is an alias to /src

export default {
  name: "Catalog",
  components: {
    CatalogHeader,
    ThreadList,
    ThreadPreview
  },
  methods: {
    loadResponses(thread) {
      const payload = Object.assign(
        { boardType: "MAY" },
        { threadId: thread.id }
      );
      this.$store.dispatch("catalog/loadResponse", payload);
    },
    addThreadhColumn(thread) {
      if (!thread.id) return;
      const payload = Object.assign({ boardType: "MAY" }, thread);
      this.$store.dispatch("watchingThread/add", payload);
    }
  },
  computed: {
    responses() {
      return this.$store.getters["catalog/getResponses"];
    },
    threads() {
      return this.$store.getters["catalog/getThreads"];
    },
    favoriteSearchWords() {
      return this.$store.getters["catalog/getFavoriteSearchWords"];
    },
    favoriteList() {
      if (!this.threads.list) return [];
      if (!this.favoriteSearchWords || this.favoriteSearchWords.length === 0) return [];
      const words = this.favoriteSearchWords.map(word => word.toLowerCase());
      return this.threads.list.filter(thread => words.some(word => thread.title.toLowerCase().indexOf(word) !== -1));
    },
    filteredList() {
      if (!this.threads.list) return [];
      if (this.searchWord === "") return this.threads.list;
      const word = this.searchWord.toLowerCase();
      return this.threads.list.filter(thread => thread.title.toLowerCase().includes(word));
    },
    currentThread() {
      return this.$store.getters["catalog/getCurrentThread"];
    },
    modal: {
      get() {
        return this.$store.getters["catalog/getModal"];
      },
      set() {
        this.$store.dispatch("catalog/updateModal");
        this.$store.dispatch("saveLocalStorage");
        this.$refs.scrollable.scrollTop = 0;
      }
    }
  },
  data() {
    return {
      formLabelWidth: "120px",
      searchWord: "",
      intervalId: undefined
    };
  },
  watch: {
    modal() {
      if (!this.modal) {
        clearInterval(this.intervalId);
      }
    }
  },
  mounted() {
    this.intervalId = setInterval(() => {
      if (!this.modal) return;
      const payload = { boardType: "MAY" };
      this.$store.dispatch("catalog/load", payload);
    }, 3 * 60 * 1000);
  },
  beforeDestroy() {
    clearInterval(this.intervalId);
  }
};
</script>