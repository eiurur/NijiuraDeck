<template>
  <div class="split--vertical">
    <div ref="scrollable" :gutter="10" class="scrollable w-80">
      <div class="catalog-wrapper" v-loading="threads.loading">
        <CatalogHeader v-model="searchWord"></CatalogHeader>
        <div class="catalog">
          <FavoriteThreadList
            :validThreads="validThreads"
            :preThreads="preThreads"
          ></FavoriteThreadList>
          <EntireThreadList
            :validThreads="validThreads"
            :preThreads="preThreads"
          ></EntireThreadList>
        </div>
      </div>
    </div>
    <ThreadPreview
      :responses="responses"
      :currentThread="currentThread"
    ></ThreadPreview>
  </div>
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
  width: 100%;
}
.w-80 {
  width: 80%;
}
</style>

<script>
import CatalogHeader from '@/components/CatalogHeader.vue';
import FavoriteThreadList from '@/components/threadList/FavoriteThreadList.vue';
import EntireThreadList from '@/components/threadList/EntireThreadList.vue';
import ThreadPreview from '@/components/ThreadPreview.vue';

export default {
  name: 'CatalogContainer',
  components: {
    CatalogHeader,
    FavoriteThreadList,
    EntireThreadList,
    ThreadPreview,
  },
  methods: {
    load() {
      if (!this.modal) return;
      this.$refs.scrollable.scrollTop = 0;
      const boardType = this.$store.getters['catalog/getBoardTypeForRequest'];
      const payload = { boardType };
      this.$store.dispatch('catalog/load', payload);
    },
    addThreadhColumn(thread) {
      if (!thread.id) return;
      const boardType = this.$store.getters['catalog/getBoardTypeForRequest'];
      const payload = { ...{ boardType }, ...thread };
      this.$store.dispatch('watchingThread/add', payload);
    },
  },
  computed: {
    responses() {
      return this.$store.getters['catalog/getResponses'];
    },
    threads() {
      return this.$store.getters['catalog/getThreads'];
    },
    ngSearchWords() {
      return this.$store.getters['catalog/getNgSearchWords'];
    },
    normalizedKeys() {
      return this.ngSearchWords.map((word) => word.toLowerCase());
    },
    validThreads() {
      const threads = this.threads.list;
      if (!threads) return [];

      const searchWord = this.searchWord.toLowerCase();
      const keys = this.normalizedKeys;
      return threads.filter((thread) => {
        const isOk = keys.every(
          (word) => !thread.title.toLowerCase().includes(word)
        );
        const isHit = thread.title.toLowerCase().includes(searchWord);
        return isOk && isHit;
      });
    },
    currentThread() {
      return this.$store.getters['catalog/getCurrentThread'];
    },
    preThreads() {
      if (!this.threads.list.length) return [];
      const threads = this.threads.list;
      let preThreads = localStorage.getItem('preThreads');
      if (!preThreads) {
        localStorage.setItem('preThreads', JSON.stringify(threads));
        return this.threads;
      }
      preThreads = JSON.parse(preThreads);
      const olds = preThreads.filter((preThread) => {
        return threads.find((thread) => thread.id === preThread.id);
      });
      const news = threads.filter((thread) => {
        return !preThreads.find((preThread) => thread.id === preThread.id);
      });
      preThreads = [...olds, ...news];
      localStorage.setItem('preThreads', JSON.stringify(preThreads));
      return preThreads;
    },
  },
  data() {
    return {
      searchWord: '',
    };
  },
  mounted() {
    this.load();
  },
};
</script>
