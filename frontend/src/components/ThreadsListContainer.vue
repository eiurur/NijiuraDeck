<template>
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
</template>

<style lang="scss" scoped>
.catalog {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  flex-direction: column;
  width: 100%;
}
</style>

<script>
import FavoriteThreadList from '@/components/threadList/FavoriteThreadList.vue';
import EntireThreadList from '@/components/threadList/EntireThreadList.vue';

export default {
  name: 'ThreadsListContainer',
  components: {
    FavoriteThreadList,
    EntireThreadList,
  },
  props: ['validThreads', 'preThreads'],
};
</script>
