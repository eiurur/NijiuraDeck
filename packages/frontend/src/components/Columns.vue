<template>
  <el-main>
    <Column :thread="thread" v-for="thread in threads" v-bind:key="thread.id"></Column>
  </el-main>
</template>

<style lang="scss" scoped>
</style>

<script>
import Column from "@/components/Column.vue"; // @ is an alias to /src

export default {
  name: "Columns",
  components: {
    Column
  },
  computed: {
    threads() {
      return this.$store.getters["watchingThread/getList"];
    }
  }
};
</script>