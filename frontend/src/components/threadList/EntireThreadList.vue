<template>
  <ThreadList
    title="一覧"
    :threads="validThreads"
    :preThreads="preThreads"
  ></ThreadList>
</template>

<style lang="scss" scoped></style>

<script>
import ThreadList from '@/components/ThreadList.vue'; // @ is an alias to /src

export default {
  name: 'EntireThreadList',
  components: {
    ThreadList,
  },
  props: ['validThreads', 'preThreads'],
};
</script>
