<template>
  <div class="container" v-if="show">
    <el-divider content-position="left">{{title}}</el-divider>
    <div v-for="thread in threads" :key="thread.id" @click="loadResponses(thread)" class="thread">
      <img class="threadImage" :src="thread.img" />
      <div class="threadBody">
        <div class="title">{{ thread.title }}</div>
        <div class="footer">
          <span>
            <i class="el-icon-circle-plus" @click.stop="addThreadhColumn(thread)"></i>
          </span>
          <div>
            <span
              class="res-number"
              :class="{
              over300: thread.number >= 300,
              over100: 300 > thread.number && thread.number >= 100,
            }"
            >{{thread.number}}</span>
            <span class="suffix">res</span>
          </div>
        </div>
      </div>
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
}
.over300 {
  color: #f56c6c;
}
.over100 {
  color: #e6a23c;
}
.res-number {
  & + .suffix {
    padding-left: 4px;
    font-size: 75%;
  }
}

.thread {
  display: flex;
  flex-direction: column;
  user-select: none;
  cursor: pointer;
  color: #666;
  width: 120px;
  flex-grow: 1;
  font-size: 14px;
  padding: 0.5em 0.5em 0 0;
  transition: box-shadow ease-in 0.1s, opacity ease-in 0.2s;
  &:hover {
    box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  }
}
.threadImage {
  object-fit: cover;
  width: 100%;
  height: 120px;
}
.threadBody {
  padding: 0.5em;
  display: flex;
  flex-direction: column;
  flex: 1;
}

.footer {
  padding-top: 0.5em;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  flex: 1;
  transition: color 0.1s ease;
  & i:hover {
    color: #5cb6ff;
  }
}
</style>

<script>
export default {
  name: "ThreadList",
  props: ["threads", "title"],
  methods: {
    loadResponses(thread) {
      const payload = {
        ...{ boardType: "MAY" },
        ...{ threadId: thread.id }
      };
      this.$store.dispatch("catalog/loadResponse", payload);
      this.$store.dispatch("catalog/setCurrentThread", { thread });
    },
    addThreadhColumn(thread) {
      if (!thread.id) return;
      const payload = { ...{ boardType: "MAY" }, ...thread };
      this.$store.dispatch("watchingThread/add", payload);
    }
  },
  computed: {
    show() {
      return this.threads.length > 0;
    }
  }
};
</script>