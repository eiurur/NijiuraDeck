<template>
  <el-dialog title="カタログ" width="90vw" height="75vh" top="5vh" :visible.sync="modal">
    <div class="split--vertical">
      <div ref="scrollable" :gutter="10" class="scrollable half">
        <el-input placeholder="検索" v-model="searchWord"></el-input>
        <div class="catalog">
          <div
            v-for="{ id, title, number, img } in filteredList"
            :key="id"
            @click="loadResponses({id, title})"
            class="thread"
          >
            <img class="threadImage" :src="img">
            <div class="threadBody">
              <div class="title">{{ title }}</div>
              <div class="number">
                <span>{{number}} res</span>
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
}
.title {
}
.number {
  text-align: right;
  padding-top: 0.5em;
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
      const payload = { boardType: "MAY", threadId: thread.id };
      this.currentThread = thread;
      this.$store.dispatch("catalog/loadResponse", payload);
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