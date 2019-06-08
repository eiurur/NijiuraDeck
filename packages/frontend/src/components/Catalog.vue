<template>
  <el-dialog title="カタログ" width="90vw" height="75vh" top="5vh" :visible.sync="modal">
    <div class="split--vertical">
      <div ref="scrollable" :gutter="10" class="scrollable w-75">
        <div class="catalog-wrapper" v-loading="threads.loading">
          <div class="catalog-header">
            <el-input placeholder="検索" v-model="searchWord"></el-input>
          </div>
          <div class="catalog">
            <div
              v-for="thread in filteredList"
              :key="thread.id"
              @click="loadResponses(thread)"
              class="thread"
            >
              <img class="threadImage" :src="thread.img">
              <div class="threadBody">
                <div class="title">{{ thread.title }}</div>
                <div class="footer">
                  <span>
                    <i class="el-icon-circle-plus" @click.stop="addThreadhColumn(thread)"></i>
                  </span>
                  <span>{{thread.number}} res</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ThreadPreview :responses="responses" :currentThread="currentThread"></ThreadPreview>
    </div>
  </el-dialog>
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
  align-items: center;
}
.catalog-header {
}
.scrollable {
  position: relative;
  overflow-y: auto;
  height: calc(100vh - 25vh);
}
.catalog {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
}
.w-75 {
  width: 75%;
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
import ThreadPreview from "@/components/ThreadPreview.vue"; // @ is an alias to /src

export default {
  name: "Catalog",
  components: {
    ThreadPreview
  },
  methods: {
    loadResponses(thread) {
      const payload = Object.assign(
        { boardType: "MAY" },
        { threadId: thread.id }
      );
      this.currentThread = thread;
      this.$store.dispatch("catalog/loadResponse", payload);
    },
    addThreadhColumn(thread) {
      if (!thread.id) return;
      const payload = Object.assign({ boardType: "MAY" }, thread);
      this.$store.dispatch("watchingThread/add", payload);
    }
  },
  computed: {
    responses() {
      return this.$store.getters["catalog/getResponses"];
    },
    threads() {
      return this.$store.getters["catalog/getThreads"];
    },
    modal: {
      get() {
        return this.$store.getters["catalog/getModal"];
      },
      set() {
        this.$store.dispatch("catalog/updateModal");
        this.$store.dispatch("saveLocalStorage");
        this.$refs.scrollable.scrollTop = 0;
      }
    },
    filteredList() {
      if (!this.threads.list) return [];
      if (this.searchWord === "") return this.threads.list;
      return this.threads.list.filter(thread => {
        return thread.title
          .toLowerCase()
          .includes(this.searchWord.toLowerCase());
      });
    }
  },
  data() {
    return {
      currentThread: {},
      formLabelWidth: "120px",
      searchWord: "",
      intervalId: undefined
    };
  },
  watch: {
    modal() {
      if (!this.modal) {
        clearInterval(this.intervalId);
      }
    }
  },
  mounted() {
    this.intervalId = setInterval(() => {
      if (!this.modal) return;
      const payload = { boardType: "MAY" };
      this.$store.dispatch("catalog/load", payload);
    }, 3 * 60 * 1000);
  },
  beforeDestroy() {
    clearInterval(this.intervalId);
  }
};
</script>