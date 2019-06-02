<template>
  <el-dialog title="カタログ" width="90vw" height="75vh" top="5vh" :visible.sync="modal">
    <div class="split--vertical">
      <div ref="scrollable" :gutter="10" class="scrollable half">
        <el-input placeholder="検索" v-model="searchWord"></el-input>
        <div class="catalog">
          <div
            v-for="thread in filteredList"
            :key="thread.id"
            @click="loadResponses(thread)"
            @contextmenu="onContextMenu"
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
      <ResponseList :responses="responses" :currentThread="currentThread"></ResponseList>
    </div>
  </el-dialog>
</template>

<style lang="scss" scoped>
.split--vertical {
  display: flex;
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
.half {
  width: 50%;
}
.thread {
  display: flex;
  flex-direction: column;
  user-select: none;
  cursor: pointer;
  color: #666;
  width: 120px;
  font-size: 14px;
  padding: 0.5em;
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
import ResponseList from "@/components/ResponseList.vue"; // @ is an alias to /src

export default {
  name: "Catalog",
  components: {
    ResponseList
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
    },
    onContextMenu(e) {
      e.preventDefault();
    }
  },
  computed: {
    responses() {
      return this.$store.getters["catalog/getResponses"];
    },
    list() {
      return this.$store.getters["catalog/getList"];
    },
    modal: {
      get() {
        return this.$store.getters["catalog/getModal"];
      },
      set() {
        // TODO: Tabの値から取得する
        this.$store.dispatch("catalog/updateModal");
        this.$refs.scrollable.scrollTop = 0;
      }
    },
    filteredList() {
      if (!this.list) return [];
      if (this.searchWord === "") return this.list;
      return this.list.filter(thread => {
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
      console.log("this.modal", this.modal);
      if (!this.modal) {
        clearInterval(this.intervalId);
      }
    }
  },
  mounted() {
    this.intervalId = setInterval(() => {
      const payload = { boardType: "MAY" };
      this.$store.dispatch("catalog/load", payload);
    }, 30 * 1000);
  },
  beforeDestroy() {
    clearInterval(this.intervalId);
  }
};
</script>