<template>
  <div ref="scrollable" class="column-content">
    <div class="column-scroller scrollbar">
      <article
        class="stream-item"
        v-for="{ id, rawText, quote, res, img, thumb, fromNow } in filteredResponse"
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
                <div class="res" v-html="$sanitize(rawText)"></div>
              </div>
            </div>
            <ResponseImage :thumb="thumb" :img="img" :orig="img"></ResponseImage>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.column-content {
  flex: 1 1 auto;
  flex-direction: column;
  min-width: 1px;
  min-height: 1px;
  overflow: auto;
}

.column-scroller {
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
  & .res {
    line-height: 1.7;
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
import ResponseImage from "@/components/ResponseImage.vue"; // @ is an alias to /src

export default {
  name: "ResponseList",
  components: {
    ResponseImage
  },
  props: ["responses", "isFilteringImage"],
  computed: {
    filteredResponse() {
      if (!this.responses || this.responses.length === 0) {
        return [];
      }
      return this.responses.filter(response => {
        if (this.isFilteringImage) {
          return !!response.img;
        }
        return true;
      });
    }
  },
  methods: {
    moveToBottom() {
      this.$refs.scrollable.scrollTop = this.$refs.scrollable.scrollHeight;
    }
  }
};
</script>