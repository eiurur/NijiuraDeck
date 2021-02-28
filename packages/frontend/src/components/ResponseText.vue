<template>
  <div class="response-text" :data-managed="managed">
    <div class="res" ref="res" v-html="$sanitize(text)"></div>
  </div>
</template>

<style lang="scss" scoped>
.response-text {
  padding: 8px 0 16px;
}
.res {
  line-height: 1.7;
}
</style>

<script>
export default {
  name: 'ResponseText',
  components: {},
  props: ['text'],
  data() {
    return {
      managed: false,
      timer: null,
    };
  },
  mounted() {
    this.timer = setInterval(() => this.enableOpeningSuperLink(), 1000);
  },
  methods: {
    enableOpeningSuperLink() {
      if (!this.$refs.res || this.managed) {
        this.timer = null;
        return;
      }
      this.managed = true;

      const nextThreadLinks = this.$refs.res.querySelectorAll('span[data-id]');
      if (nextThreadLinks.length === 0) {
        this.timer = null;
        return;
      }
      Array.from(nextThreadLinks).map((l) => {
        l.addEventListener('click', async (event) => {
          this.$message('カラムに追加します');
          const threadID = event.target.getAttribute('data-id');
          const payload = { boardType: 'MAY', id: threadID };
          const thread = await this.$store.dispatch(
            'watchingThread/fetch',
            payload
          );
          if (!thread) {
            this.$message({
              message: `スレッドが見つかりません`,
              type: 'error',
            });
            return;
          }
          await this.$store.dispatch('watchingThread/load', payload);
          this.$message({
            message: `追加しました`,
            type: 'success',
          });
        });
      });
    },
  },
};
</script>
