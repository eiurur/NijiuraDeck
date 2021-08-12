<template>
  <div class="container" v-if="show">
    <el-divider content-position="left">{{ title }}</el-divider>
    <div class="threads">
      <Thread
        v-for="thread in threads"
        :key="thread.id"
        :thread="thread"
        :preThreads="preThreads"
      ></Thread>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-wrap: wrap;
  -webkit-box-pack: start;
  justify-content: flex-start;
  padding-bottom: 8px;
  width: 100%;
}
.threads {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  width: 100%;
}
</style>

<script>
import Thread from '@/components/Thread.vue';

export default {
  name: 'ThreadList',
  components: {
    Thread,
  },
  props: ['title', 'threads', 'preThreads'],
  methods: {},
  computed: {
    show() {
      return this.threads.length > 0;
    },
  },
};
</script>
