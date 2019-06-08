<template>
  <div class="column">
    <div class="column-holder">
      <div class="column-panel">
        <header class="column-header">
          <div class="column-header-title" :class="{'down': this.thread.isDown}">
            <span v-if="this.thread.isDown">
              <el-tooltip class="item" effect="dark" content="スレ落ち" placement="bottom">
                <i class="el-icon-warning left"></i>
              </el-tooltip>
            </span>
            <a :href="thread.url" target="_blank">{{thread.title}}</a>
          </div>
          <div class="column-header-actions">
            <i class="el-icon-bottom" @click="moveToBottom()"></i>
            <i class="el-icon-picture-outline" v-if="!isFilteringImage" @click="toggleDisplayImage"></i>
            <i class="el-icon-picture active" v-if="isFilteringImage" @click="toggleDisplayImage"></i>
            <i class="el-icon-close" @click="remove()"></i>
          </div>
        </header>
        <ResponseList
          ref="responseList"
          :responses="this.thread.responses"
          :isFilteringImage="isFilteringImage"
        ></ResponseList>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.column-holder {
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  width: 100%;
  transition-property: -webkit-transform;
  transition-property: transform;
  transition-property: transform, -webkit-transform;
  transition-duration: 0.2s;
  transition-timing-function: ease-in-out;
}

.column {
  border-radius: 0;
  position: relative;
  display: inline-block;
  overflow: hidden;
  width: 480px;
  height: 100%;
  margin: 0 6px 0 0;
  background-color: #fff;
  font-size: 1.2rem;
  white-space: normal;
  flex: 0 0 auto;
}

.column-panel {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  background: #eddbd1;
  display: flex;
  flex-direction: column;
}

.column-header {
  display: flex;
  justify-content: space-between;
  padding: 8px 10px;
  max-height: 50px;
  border-bottom: 1px solid #e1e8ed;
  box-sizing: border-box;
  position: relative;
  color: #38444d;
  background-color: #f5f8fa;
}
.column-header-title {
  overflow: hidden;
  &.down {
    color: #f56c6c;
  }
}

.column-header-actions {
  & i {
    cursor: pointer;
    transition: color 0.1s ease;
  }
  & i:hover {
    color: #5cb6ff;
  }
  & i.active {
    color: #5cb6ff;
  }
  & i:not(:last-child) {
    padding-right: 16px;
  }
}
</style>

<script>
import ResponseList from "@/components/ResponseList.vue";

export default {
  name: "Column",
  components: {
    ResponseList
  },
  props: ["thread"],
  data() {
    return {
      isFilteringImage: false,
      intervalId: undefined
    };
  },
  methods: {
    moveToBottom() {
      this.$refs.responseList.moveToBottom();
    },
    toggleDisplayImage() {
      this.isFilteringImage = !this.isFilteringImage;
    },
    remove() {
      const payload = {
        id: this.thread.id
      };
      this.$store.dispatch("watchingThread/remove", payload);
    }
  },
  watch: {
    thread() {
      if (this.thread.isDown) {
        clearInterval(this.intervalId);
      }
    }
  },
  mounted() {
    this.intervalId = setInterval(() => {
      if (this.thread.isDown) return;
      const payload = {
        boardType: "MAY",
        id: this.thread.id,
        title: this.thread.title,
        url: this.thread.url
      };
      this.$store.dispatch("watchingThread/update", payload);
      this.$store.dispatch("saveLocalStorage");
    }, 60 * 1000);
  },
  beforeDestroy() {
    clearInterval(this.intervalId);
  }
};
</script>