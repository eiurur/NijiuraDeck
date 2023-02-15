<template>
  <div @click="loadResponses(thread)" class="thread">
    <img class="threadImage" v-lazy="thread.img" :alt="thread.img" />
    <div class="threadBody">
      <div class="title">{{ thread.title }}</div>
      <div class="footer">
        <div class="threadInfo">
          <span class="diff" v-show="diff != ''">{{ diff }}</span>
          <span></span>
          <span>
            <span
              class="res-number"
              :class="{
                over300: thread.number >= 300,
                over100: 300 > thread.number && thread.number >= 100,
              }"
              >{{ thread.number }}</span
            >
            <span class="suffix">res</span>
          </span>
        </div>
        <div class="control">
          <span class="add-btn" @click.stop="addThreadhColumn(thread)">
            <i class="el-icon-circle-plus"></i>
            <span>追加</span>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.add-btn {
  flex: 1;
}
i + span {
  margin-left: 0.25rem;
}

.container {
  display: flex;
  flex-wrap: wrap;
  -webkit-box-pack: start;
  justify-content: flex-start;
  padding-bottom: 8px;
  width: 100%;
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

.threads {
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  width: 100%;
}
.thread {
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  user-select: none;
  cursor: pointer;
  color: #666;
  contain: content;
  font-size: 12px;
  transition: box-shadow ease-in 0.1s, opacity ease-in 0.2s;
  &:hover {
    // box-shadow: 0 25px 45px -15px rgba(0, 0, 0, 0.15);
    border-radius: 0.5rem;
    box-shadow: 5px 5px 10px #e8e8e8, -5px -5px 10px #ffffff;
  }
  .diff {
    color: #a1bbf8;
    margin-right: 0.5rem;
    font-size: 10px;
    &:before {
      content: '(';
      padding-right: 0.25rem;
    }
    &:after {
      content: ')';
      padding-left: 0.25rem;
    }
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
  justify-content: flex-end;
  align-items: flex-end;
  flex-direction: column;
  flex: 1;
  .threadInfo {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
  div + div {
    margin-top: 0.25rem;
  }
  .control {
    width: 100%;
    border-radius: 0.5rem;
    transition: box-shadow 0.3s;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.15);
  }
  & .add-btn {
    justify-content: center;
    display: flex;
    align-items: center;
    transition: color 0.1s ease;
    &:hover {
      color: #5cb6ff;
    }
  }
}
</style>

<script>
export default {
  name: 'Thread',
  props: ['thread', 'preThreads'],
  methods: {
    loadResponses(thread) {
      const boardType = this.$store.getters['catalog/getBoardTypeForRequest'];
      const payload = {
        ...{ boardType },
        ...{ threadId: thread.id },
      };
      this.$store.dispatch('catalog/loadResponse', payload);
      this.$store.dispatch('catalog/setCurrentThread', { thread });
      this.update();
    },
    addThreadhColumn(thread) {
      if (!thread.id) return;
      const boardType = this.$store.getters['catalog/getBoardTypeForRequest'];
      const payload = {
        ...{ boardType },
        ...thread,
      };
      this.$store.dispatch('watchingThread/add', payload);
      this.update();
    },
    getPreThread() {
      const pre = this.preThreads.find(
        (thread) => thread.id === this.thread.id
      );
      if (!pre) return '';
      return pre;
    },
    update() {
      const pre = this.preThreads.find(
        (thread) => thread.id === this.thread.id
      );
      pre.number = this.thread.number;

      const boardType = this.$store.getters['catalog/getBoardTypeForRequest'];
      const key = `${boardType}:preThreads`;
      localStorage.setItem(key, JSON.stringify(this.preThreads));
    },
  },
  computed: {
    show() {
      return this.threads.length > 0;
    },
    diff() {
      const pre = this.getPreThread();
      if (!pre) return '';
      const diff = this.thread.number - pre.number;
      if (!diff) return '';
      return `+${diff}`;
    },
  },
};
</script>
