<template>
  <div ref="scrollable" class="column-content">
    <div class="column-scroller scrollbar">
      <article
        class="stream-item"
        v-for="response in filteredResponse"
        :key="response.id"
      >
        <Response :response="response"></Response>
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
  contain: content;
  background-color: #fff;
  border-bottom: 1px solid #e1e8ed;
}

.item-box {
  position: relative;
  padding: 0.5rem;
  background: #eddbd1;
  color: #666;

  & .response {
    display: block;
    word-break: break-word;
    word-wrap: break-word;
    line-height: 1.7;
    &-header {
      display: flex;
      justify-content: space-between;
      color: #c9686870;
      padding: 8px 0;
      .address {
        color: #5d5dc5;
      }
      & .left > span + span {
        margin-left: 8px;
      }
    }
  }

  & .image {
    width: 100%;
    & img {
      width: 100%;
      border-radius: 1rem;
    }
  }
  .response-footer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: #c9686870;
    background: #ffe4;
    font-size: 0.8rem;
    line-height: 1.8;
    border-radius: 1rem;
    padding: 0 0.5rem;
    margin: 0.5rem 0;
  }
  .postedBy {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    .icon {
      display: flex;
      width: 0.5rem;
      height: 0.5rem;
      border-radius: 100%;
    }
    .name {
      margin-left: 0.25rem;
    }
  }
  .soudane {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
  }
}
</style>

<script>
import Response from '@/components/Response.vue'; // @ is an alias to /src

export default {
  name: 'ResponseList',
  components: {
    Response,
  },
  props: ['responses', 'isFilteringImage'],
  computed: {
    filteredResponse() {
      if (!this.responses || this.responses.length === 0) {
        return [];
      }
      return this.responses.filter((response) => {
        if (this.isFilteringImage) {
          return !!response.img;
        }
        return true;
      });
    },
  },
  methods: {
    moveToBottom() {
      this.$refs.scrollable.scrollTop = this.$refs.scrollable.scrollHeight;
    },
  },
};
</script>
