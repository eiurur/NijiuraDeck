<template>
  <div id="app">
    <el-container style=" border: 1px solid #eee">
      <el-aside width="64px;" style="background-color: rgb(238, 241, 246)">
        <el-menu class="el-menu-vertical-demo" :collapse="true">
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
        </el-menu>
      </el-aside>
      <el-container>
        <Columns></Columns>
      </el-container>
    </el-container>
    <Catalog></Catalog>
    <Setting></Setting>
  </div>
</template>

<style lang="scss">
:root {
  --main-color: black;
}

body,
html,
#app {
  height: 100%;
  margin: 0;
}
#app {
  background: rgb(255, 255, 238);
  color: #000;
  font-family: YuGothic, "Yu Gothic", "游ゴシック体", "游ゴシック",
    "ヒラギノ角ゴ Pro W3", "Hiragino Kaku Gothic Pro", "メイリオ", "Meiryo",
    "MSPゴシック", "Osaka", "MS PGothic", "Arial", "Helvetica", "Verdana",
    "sans-serif";
  font-size: 18px;
  font-weight: 600;
  margin-top: 0;
  line-height: 1.6;
  /* color: #2c3e50; */
}
#nav {
  padding: 0 0 30px;
}
* {
  box-sizing: border-box;
}
ul {
  list-style: none;
  margin: 0;
  padding-left: 0;
  margin-block-start: 0;
  margin-block-end: 0;
  margin-inline-start: 0px;
  margin-inline-end: 0px;
  padding-inline-start: 0;
}

a,
a:visited,
a:hover,
a:active {
  text-decoration: none;
  color: inherit;
  cursor: pointer;
  transition: 0.3s ease all;
}
a.disabled {
  text-decoration: none;
  color: inherit;
  pointer-events: none;
  cursor: default;
}

span > i.left {
  padding-right: 8px;
}
span > i.right {
  padding-left: 8px;
}

/* css framework */
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
  width: auto;
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-container {
  height: 100%;
}
.el-dialog__body {
  padding: 0 20px 30px !important;
}

main {
  background-color: rgb(255, 255, 238);
  padding: 0 !important;
  display: flex;
  flex-wrap: nowrap;
  overflow-x: auto;
}

/* libarary */
.medium-zoom-overlay {
  z-index: 10000;
}
.medium-zoom-image--opened {
  z-index: 10001;
}

/* extend property */
::-webkit-scrollbar {
  background-color: #f4f4f4;
  width: 16px;
}

::-webkit-scrollbar-track {
  background-color: #f4f4f4;
}
::-webkit-scrollbar-track:hover {
  background-color: #f4f4f4;
}

::-webkit-scrollbar-thumb {
  background-color: #babac0;
  border-radius: 8px;
  border: 5px solid #f4f4f4;
}
::-webkit-scrollbar-thumb:hover {
  background-color: #a0a0a5;
  border: 4px solid #f4f4f4;
}

::-webkit-scrollbar-button {
  display: none;
}

/**/
.quote {
  color: rgb(120, 153, 34);
}
</style>


<script>
import Catalog from "@/components/Catalog.vue"; // @ is an alias to /src
import Setting from "@/components/Setting.vue"; // @ is an alias to /src
import Columns from "@/components/Columns.vue"; // @ is an alias to /src

export default {
  name: "App",
  components: {
    Catalog,
    Setting,
    Columns
  },
  methods: {
    updateCatalogModal() {
      // TODO:選択式
      const payload = { boardType: "MAY" };
      this.$store.dispatch("catalog/updateModal", payload);
    },
    updateAllThreadColumn() {
      this.$store.dispatch("watchingThread/updateAll");
    },
    removeDownThreadColumn() {
      this.$store.dispatch("watchingThread/removeDown");
    },
    updateSettingModal() {
      this.$store.dispatch("setting/updateModal");
    }
  }
};
</script>