<template>
  <div class="comment-form">
    <div class="textarea-wrapper">
      <textarea
        class="textarea textarea__inner"
        placeholder="コメント"
        rows="4"
        v-model="comment"
        @keyup.ctrl.enter="submit"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.comment-form {
  height: 120px;
  padding: 8px 18px 8px 8px;
  width: 100%;
  .textarea-wrapper {
    position: relative;
    display: inline-block;
    width: 100%;
    vertical-align: bottom;
    font-size: 14px;
  }
  .textarea {
    -webkit-writing-mode: horizontal-tb !important;
    text-rendering: auto;
    color: initial;
    letter-spacing: normal;
    word-spacing: normal;
    text-transform: none;
    text-indent: 0px;
    text-shadow: none;
    display: inline-block;
    text-align: start;
    -webkit-appearance: textarea;
    background-color: white;
    -webkit-rtl-ordering: logical;
    flex-direction: column;
    resize: auto;
    cursor: text;
    white-space: pre-wrap;
    overflow-wrap: break-word;
    margin: 0em;
    font: 400 13.3333px Arial;
    border-width: 1px;
    border-style: solid;
    border-color: rgb(169, 169, 169);
    border-image: initial;
    padding: 2px;
  }
  .textarea__inner {
    display: block;
    resize: vertical;
    padding: 5px 15px;
    line-height: 1.5;
    box-sizing: border-box;
    width: 100%;
    font-size: inherit;
    color: #606266;
    background-color: #fff;
    background-image: none;
    border: 1px solid #dcdfe6;
    border-radius: 4px;
    transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  }
}
</style>

<script>
export default {
  name: 'CommentForm',
  props: ['thread'],
  components: {},
  computed: {},
  data() {
    return {
      comment: '',
      password: '',
    };
  },
  methods: {
    submit() {
      const payload = {
        boardType: this.thread.boardType,
        id: this.thread.id,
        url: this.thread.url,
        comment: this.comment,
      };
      try {
        this.$store.dispatch('watchingThread/postComment', payload);
        this.comment = '';
      } catch (e) {
        this.$message.error(e);
      }
    },
  },
};
</script>
