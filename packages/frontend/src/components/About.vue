<template>
  <el-dialog title="このサイトについて" width="50vw" height="50vh" top="5vh" :visible.sync="isOpen">
    <div class="about scrollable">
      <section>
        <h2>NijiuraDeckとは</h2>
        <p>
          NijiuraDeck は
          <a
            class="link"
            href="https://tweetdeck.twitter.com/"
            target="_blank"
          >TweetDeck</a>ライクに
          <a class="link" href="http://may.2chan.net/b/futaba.htm" target="_blank">二次元裏＠ふたば</a>を閲覧するためのビューアです。
        </p>
        <p>閲覧を目的としているため、現時点で書き込み関係の機能は有しておりません。</p>
        <p>
          本サービスはOSSであり、ソースコードは
          <a
            class="link"
            href="https://github.com/eiurur/NijiuraDeck"
            target="_blank"
          >Github</a>上に置いてありますので自由に確認・編集依頼が可能です。
        </p>
      </section>
      <section>
        <h2>スレッドの取得、レスポンスの取得について</h2>
        <p>NijiuraDeckではスレッドとレスポンスの取得および更新は自動で行われます。</p>
        <p>更新間隔</p>
        <p>スレッド：3分ごと</p>
        <p>レスポンス：1分ごと</p>
      </section>
      <section class="shortcut-keys">
        <h2>ショートカットキー</h2>
        <p><span class="command"><span class="key">Ctrl</span> + <span class="key">Space</span></span><span>カタログを表示</span></p>
        <p><span class="command"><span class="key">Ctrl</span> + <span class="key">Delete</span></span><span>Dat落ちのスレッドを閉じる</span></p>
      </section>
    </div>
  </el-dialog>
</template>

<style lang="scss" scoped>
.about {
  & section {
    padding-bottom: 1rem;
  }
}
.shortcut-keys {
  .command + span {
    margin-left: 1rem;
  }
  .key {
    background: #eee;
    border: 1px solid #ddd;
    padding: .25rem .5rem;
    border-radius: .25rem;
  }
}
</style>

<script>
export default {
  name: "About",
  props: ["isModalOpen"],
  computed: {
    isOpen: {
      get() {
        return this.$store.getters["modal/getAbout"];
      },
      set() {
        this.$store.dispatch("modal/updateAbout");
      }
    }
  }
};
</script>