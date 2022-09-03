<template>
  <div
    v-loading="responses.loading"
    ref="scrollable"
    :gutter="10"
    class="scrollable w-20"
  >
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
          @click="addThreadhColumn(currentThread)"
        ></el-button>
      </div>
    </div>
    <div v-loading="responses.loading" class="container">
      <ResponseList
        :responses="responses.list"
        :isFilteringImage="isFilteringImage"
      ></ResponseList>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.catalog {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.w-20 {
  width: 20%;
}
.container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  z-index: 0;
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
import ResponseList from '@/components/ResponseList.vue'; // @ is an alias to /src

export default {
  name: 'ThreadPreview',
  components: {
    ResponseList,
  },
  props: ['responses', 'currentThread'],
  updated() {
    this.$refs.scrollable.scrollTop = 0;
  },
  data() {
    return {
      isFilteringImage: false,
    };
  },
  methods: {
    addThreadhColumn(thread) {
      if (!thread.id) return;
      const boardType = this.$store.getters['catalog/getBoardTypeForRequest'];
      const payload = { ...{ boardType }, ...thread };
      this.$store.dispatch('watchingThread/add', payload);
    },
    toggleDisplayImage() {
      this.isFilteringImage = !this.isFilteringImage;
    },
  },
};
</script>
