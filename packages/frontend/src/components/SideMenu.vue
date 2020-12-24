<template>
  <el-aside width="64px;" style="background-color: rgb(238, 241, 246)">
    <el-menu class="el-menu-vertical" :collapse="true">
      <el-menu-item index="1" @click="updateCatalogModal">
        <i class="el-icon-s-grid"></i>
        <span slot="title">スレッド一覧を開く</span>
      </el-menu-item>
      <el-menu-item index="2" @click="updateAllThreadColumn()">
        <i class="el-icon-refresh-left"></i>
        <span slot="title">全スレッドを更新する</span>
      </el-menu-item>
      <el-menu-item index="3" @click="removeDownThreadColumn()">
        <i class="el-icon-delete"></i>
        <span slot="title">dat落ちのスレッドを削除する</span>
      </el-menu-item>
      <el-menu-item index="4" @click="updateSettingModal" disabled>
        <i class="el-icon-setting"></i>
        <span slot="title">設定</span>
      </el-menu-item>
      <el-menu-item index="5" @click="updateAboutModal">
        <i class="el-icon-info"></i>
        <span slot="title">このサイトについて</span>
      </el-menu-item>
    </el-menu>
    <GlobalEvents
      @keyup.ctrl.space="updateCatalogModal"
      @keyup.ctrl.delete="removeDownThreadColumn"
    />
  </el-aside>
</template>

<style lang="scss">
.el-aside {
  color: #333;
  width: auto;
}
.el-menu-vertical:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>

<script>
export default {
  name: "SideMenu",
  methods: {
    updateCatalogModal() {
      // TODO:選択式
      const payload = { boardType: "MAY" };
      this.$store.dispatch("catalog/updateModal", payload);
    },
    updateAllThreadColumn() {
      this.$message("各スレッドの新着レスを取得しています。");
      this.$store.dispatch("watchingThread/updateAll").then(() => {
        this.$message({
          message: "新着レスの更新が完了しました",
          type: "success"
        });
        this.$store.dispatch("saveLocalStorage");
      });
    },
    removeDownThreadColumn() {
      this.$message("スレッドの状況確認を開始します。");
      this.$store.dispatch("watchingThread/removeDown").then(() => {
        this.$message({
          message: "dat落ちしているスレッドを一覧から削除しました。",
          type: "success"
        });
        this.$store.dispatch("saveLocalStorage");
      });
    },
    updateSettingModal() {
      this.$store.dispatch("setting/updateModal");
    },
    updateAboutModal() {
      this.$store.dispatch("modal/updateAbout");
    }
  }
};
</script>