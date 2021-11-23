<template>
  <div ref="scrollable" class="column-content">
    <div class="column-scroller scrollbar">
      <article
        class="stream-item"
        v-for="{
          id,
          address,
          rawText,
          postedBy,
          soudane,
          img,
          thumb,
          fromNow,
        } in filteredResponse"
        :key="id"
      >
        <div class="item-box">
          <div class="response">
            <div class="response-body">
              <div class="response-header">
                <div class="left">
                  <span>No.{{ id }}</span>
                  <span
                    class="clickable address"
                    v-if="address"
                    @click="copyToClipboard(address)"
                  >
                    <el-tooltip effect="dark" placement="bottom">
                      <div slot="content">{{ address }}</div>
                      <i class="el-icon-message"></i>
                    </el-tooltip>
                  </span>
                </div>
                <div class="right">
                  <span>{{ fromNow }}</span>
                </div>
              </div>
              <ResponseText :text="rawText"></ResponseText>
            </div>
            <ResponseImage
              :thumb="thumb"
              :img="img"
              :orig="img"
            ></ResponseImage>
            <div class="response-footer">
              <div class="left">
                <span class="postedBy" v-if="postedBy">
                  <span
                    class="icon"
                    :style="{ 'background-color': postedByIconColor(postedBy) }"
                  />
                  <span class="name">{{ postedBy }}</span>
                </span>
              </div>
              <div class="right">
                <span class="soudane" v-if="soudane"
                  >そうだねx{{ soudane }}</span
                >
              </div>
            </div>
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
    // background: #eddbd1;
    // color: #666;
    // font-size: 14px;
    // margin: 1rem;
    // line-height: 1.28578em;
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
    justify-content: space-between;
    color: #c9686870;
    padding-top: 8px;
    font-size: 0.8rem;
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
  name: 'ResponseList',
  components: {
    ResponseImage,
    ResponseText,
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
    moveToBottom() {
      this.$refs.scrollable.scrollTop = this.$refs.scrollable.scrollHeight;
    },
  },
};
</script>
