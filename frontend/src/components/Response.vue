<template>
  <div class="item-box">
    <div class="response">
      <div class="response-header">
        <div class="left">
          <span>No.{{ response.id }}</span>
          <span
            class="clickable address"
            v-if="response.address"
            @click="copyToClipboard(response.address)"
          >
            <el-tooltip effect="dark" placement="bottom">
              <div slot="content">{{ response.address }}</div>
              <i class="el-icon-message"></i>
            </el-tooltip>
          </span>
        </div>
        <div class="right">
          <span>{{ response.fromNow }}</span>
        </div>
      </div>
      <div class="response-body">
        <ResponseText :text="response.rawText"></ResponseText>
      </div>
      <ResponseImage
        :thumb="response.thumb"
        :img="response.img"
        :orig="response.img"
      ></ResponseImage>
      <div class="response-footer">
        <div class="left">
          <span class="postedBy" v-if="response.postedBy">
            <span
              class="icon"
              :style="{
                'background-color': postedByIconColor(response.postedBy),
              }"
            />
            <span class="name">{{ response.postedBy }}</span>
          </span>
        </div>
        <div class="right">
          <span class="soudane" v-if="response.soudane"
            >そうだねx{{ response.soudane }}</span
          >
        </div>
      </div>
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
import ResponseImage from '@/components/ResponseImage.vue'; // @ is an alias to /src
import ResponseText from '@/components/ResponseText.vue'; // @ is an alias to /src
import stc from 'string-to-color';

export default {
  name: 'Response',
  components: {
    ResponseImage,
    ResponseText,
  },
  props: ['response'],
  methods: {
    postedByIconColor(postedBy) {
      return stc(postedBy);
    },
    copyToClipboard(text) {
      navigator.clipboard.writeText(text).then(() => {
        this.$message({
          message: `クリップボードにコピーしました: ${text}`,
          type: 'success',
        });
      });
    },
  },
};
</script>
