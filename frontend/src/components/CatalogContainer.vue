<template>
  <div class="split--vertical">
    <div ref="scrollable" :gutter="10" class="scrollable w-80">
      <div class="catalog-wrapper" v-loading="threads.loading">
        <CatalogHeader v-model="searchWord"></CatalogHeader>
        <ThreadsListContainer
          v-if="!threads.loading"
          :validThreads="validThreads"
          :preThreads="preThreads"
        ></ThreadsListContainer>
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
.w-80 {
  width: 80%;
}
</style>

<script>
import CatalogHeader from '@/components/CatalogHeader.vue';
import ThreadsListContainer from '@/components/ThreadsListContainer.vue';
import ThreadPreview from '@/components/ThreadPreview.vue';

export default {
  name: 'CatalogContainer',
  components: {
    CatalogHeader,
    ThreadsListContainer,
    ThreadPreview,
  },
  methods: {
    load() {
      if (!this.modal) return;
      this.$refs.scrollable.scrollTop = 0;
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
      if (!this.threads.list.length) return [];

      const threads = this.threads.list;
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
      const boardType = this.$store.getters['catalog/getBoardTypeForRequest'];
      const key = `${boardType}:preThreads`;
      let preThreads = localStorage.getItem(key);
      if (!preThreads) {
        localStorage.setItem(key, JSON.stringify(threads));
        return threads;
      }
      preThreads = JSON.parse(preThreads);

      const olds = preThreads.filter((preThread) => {
        return threads.find((thread) => thread.id === preThread.id);
      });
      preThreads = [...olds, ...threads];

      localStorage.setItem(key, JSON.stringify(preThreads));
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
