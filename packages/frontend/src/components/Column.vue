<template>
  <div class="column">
    <div class="column-holder">
      <div class="column-panel">
        <header class="column-header">
          <div class="column-header-title" :class="{dead: this.thread.isDead}">
            <span v-if="this.thread.isDead">
              <el-tooltip class="item" effect="dark" content="スレ落ち" placement="bottom">
                <i class="el-icon-warning"></i>
              </el-tooltip>
            </span>
            <a :href="thread.url" target="_blank">{{thread.title}}</a>
          </div>
          <div class="column-header-actions">
            <i class="el-icon-refresh-left"></i>
            <i class="el-icon-picture-outline" v-if="!isFilteringImage" @click="toggleDisplayImage"></i>
            <i class="el-icon-picture active" v-if="isFilteringImage" @click="toggleDisplayImage"></i>
            <i class="el-icon-close" @click="remove()"></i>
          </div>
        </header>
        <div class="column-content">
          <div class="column-scroiller scrollbar">
            <article
              class="stream-item"
              v-for="{ id, quote, res, img, thumb, fromNow } in filteredResponse"
              :key="id"
            >
              <div class="item-box">
                <div class="res">
                  <div class="response-body">
                    <div class="response-header">
                      <span>No.{{id}}</span>
                      <span>{{fromNow}}</span>
                    </div>
                    <div class="response-text">
                      <div v-if="quote" class="quote">{{quote}}</div>
                      <div class="res">{{res}}</div>
                    </div>
                  </div>
                  <ResponseImage :thumb="thumb" :img="img"></ResponseImage>
                </div>
              </div>
            </article>
          </div>
        </div>
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
  // z-index: 1;
  display: inline-block;
  overflow: hidden;
  width: 400px;
  height: 100%;
  margin: 0 6px 0 0;
  background-color: #fff;
  font-size: 1rem;
  white-space: normal;
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

header.column-header {
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
}
.dead {
  color: #f56c6c;
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

.column-content {
  flex: 1 1 auto;
  flex-direction: column;
  min-width: 1px;
  min-height: 1px;
  overflow: auto;
}

.column-scroiller {
  overflow-x: hidden;
  word-break: break-word;
  word-wrap: break-word;
  will-change: transform;
}

article.stream-item {
  background-color: #fff;
  border-bottom: 1px solid #e1e8ed;
}

.item-box {
  position: relative;
  padding: 8px 10px;
  background: #eddbd1;
  color: #666;

  & .response {
    background: #eddbd1;
    color: #666;
    font-size: 14px;
    margin: 1rem;
    display: flex;

    line-height: 1.28578em;
    word-break: break-word;
    word-wrap: break-word;
    display: block;
    &-header {
      display: flex;
      justify-content: space-between;
      color: #c9686870;
      padding: 8px 0;
    }
  }
  & .response-text {
    padding: 8px 0 16px;
  }
  & .quote {
    color: rgb(120, 153, 34);
  }

  & .image {
    width: 100%;
    & img {
      width: 100%;
      border-radius: 1rem;
    }
  }
}
</style>

<script>
import ResponseImage from "@/components/ResponseImage.vue";
export default {
  name: "Column",
  components: {
    ResponseImage
  },
  props: ["thread"],
  data() {
    return {
      isFilteringImage: false,
      intervalId: undefined
    };
  },
  computed: {
    filteredResponse() {
      if (!this.thread.responses || this.thread.responses.length === 0) {
        return this.thread.responses;
      }
      return this.thread.responses.filter(response => {
        if (this.isFilteringImage) {
          return !!response.img;
        } else {
          return true;
        }
      });
    }
  },
  methods: {
    toggleDisplayImage() {
      this.isFilteringImage = !this.isFilteringImage;
    },
    // updateColumn() {
    //   this.$store.dispatch("watchingThread/update");
    // },
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
        console.log("clearInterval column", this.thread);
        clearInterval(this.intervalId);
      }
    }
  },
  mounted() {
    this.intervalId = setInterval(() => {
      const payload = {
        boardType: "MAY",
        id: this.thread.id,
        title: this.thread.title,
        url: this.thread.url
      };
      this.$store.dispatch("watchingThread/update", payload);
    }, 60 * 1000);
  },
  beforeDestroy() {
    clearInterval(this.intervalId);
  }
};
</script>