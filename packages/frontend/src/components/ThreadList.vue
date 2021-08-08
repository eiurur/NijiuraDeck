<template>
  <div class="container" v-if="show">
    <el-divider content-position="left">{{ title }}</el-divider>
    <div class="threads">
      <Thread
        v-for="thread in threads"
        :key="thread.id"
        :thread="thread"
        :pre="pre"
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
  props: ['threads', 'title'],
  methods: {},
  computed: {
    show() {
      return this.threads.length > 0;
    },
    pre() {
      let pre = JSON.parse(localStorage.getItem('pre'));
      if (!pre) {
        localStorage.setItem('pre', JSON.stringify(this.threads));
        return this.threads;
      }
      const news = this.threads.filter((thread) => {
        return pre.filter((preThread) => thread.id !== preThread.id);
      });
      pre = [...pre, ...news];
      localStorage.setItem('pre', JSON.stringify(pre));
      return pre;
    },
  },
};
</script>
