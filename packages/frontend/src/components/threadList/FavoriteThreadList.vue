<template>
  <ThreadList
    title="お気に入り"
    :threads="threads"
    :preThreads="preThreads"
  ></ThreadList>
</template>

<style lang="scss" scoped></style>

<script>
import ThreadList from '@/components/ThreadList.vue'; // @ is an alias to /src

export default {
  name: 'FavoriteThreads',
  components: {
    ThreadList,
  },
  props: ['validThreads', 'preThreads'],
  computed: {
    keys() {
      return this.$store.getters['catalog/getFavoriteSearchWords'];
    },
    normalizedKeys() {
      return this.keys.map((key) => key.toLowerCase());
    },
    threads() {
      if (!this.validThreads) {
        return [];
      }
      if (!this.normalizedKeys || this.normalizedKeys.length === 0) {
        return [];
      }
      return this.validThreads.filter((thread) => {
        const { title } = thread;
        return this.normalizedKeys.some((word) => {
          return title.toLowerCase().includes(word);
        });
      });
    },
  },
};
</script>
