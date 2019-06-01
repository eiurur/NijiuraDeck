<template>
  <div ref="scrollable" :gutter="10" class="scrollable half">
    <div class="stickyContainer">
      <div class="bottons">
        <el-button
          circle
          icon="el-icon-picture-outline"
          type="success"
          v-if="isFilteringImage"
          @click="toggleDisplayImage"
        ></el-button>
        <el-button
          circle
          icon="el-icon-picture-outline"
          v-if="!isFilteringImage"
          @click="toggleDisplayImage"
        ></el-button>
        <el-button
          circle
          type="primary"
          icon="el-icon-plus"
          v-bind:disabled="currentThread === null"
          @click="addTreadhColumn(currentThread)"
        ></el-button>
      </div>
    </div>
    <div class="container">
      <div
        v-for="{ id, name, quote, res, img, thumb, createdAt } in filteredResponse"
        :key="id"
        class="response"
      >
        <ResponseImage :thumb="thumb" :img="img"></ResponseImage>
        <div class="responseBody">
          <div v-if="quote" class="quote">{{ quote }}</div>
          <div class="res">{{ res }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.scrollable {
  position: relative;
  overflow-y: auto;
  height: calc(100vh - 25vh);
  background: #fbfbec;
}
.container {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 0;
}
.catalog {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.half {
  width: 50%;
}
.response {
  background: #eddbd1;
  color: #666;
  font-size: 14px;
  margin: 1rem;
  display: flex;
}
.image {
  cursor: pointer;
  object-fit: contain;
  height: auto;
  width: auto;
  max-height: 200px;
  max-width: 200px;
}
.responseBody {
  margin: 1rem;
  background: #eddbd1;
  // width: 100%;
}
.name {
}
.quote {
  color: rgb(120, 153, 34);
}
.stickyContainer {
  position: sticky;
  left: 0;
  top: 0;
  z-index: 1;

  width: 100%;
  height: 100%;

  /* クリックイベントを透過 */
  pointer-events: none;
  & > * {
    pointer-events: auto;
  }
}
.bottons {
  display: block;
  position: absolute;
  right: 15px;
  bottom: 15px;
}
</style>

<script>
import ResponseImage from "@/components/ResponseImage.vue"; // @ is an alias to /src

export default {
  name: "ResponseList",
  components: {
    ResponseImage
  },
  props: ["responses", "currentThread"],
  data() {
    return {
      isFilteringImage: false
    };
  },
  updated() {
    this.$refs.scrollable.scrollTop = 0;
  },
  computed: {
    filteredResponse() {
      return this.responses.filter(response => {
        if (this.isFilteringImage) {
          return !!response.img;
        } else {
          return true;
        }
      });
    }
  },
  methods: {
    addTreadhColumn(thread) {
      if (!thread.id) return;
      console.log(thread);
      const payload = { boardType: "MAY", id: thread.id, title: thread.title };
      this.$store.dispatch("watchingThread/add", payload);
    },
    toggleDisplayImage() {
      this.isFilteringImage = !this.isFilteringImage;
      console.log(this.isFilteringImage);
    }
  }
};
</script>