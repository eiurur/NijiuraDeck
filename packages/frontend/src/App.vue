<template>
  <div id="app">
    <el-container style=" border: 1px solid #eee">
      <el-aside width="64px;" style="background-color: rgb(238, 241, 246)">
        <el-menu class="el-menu-vertical-demo" :collapse="true">
          <!-- <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-menu"></i>
              <span slot="title">メニュー</span>
            </template>
            <el-menu-item-group>
              <span slot="title">Group One</span>
              <el-menu-item index="1-1">item one</el-menu-item>
              <el-menu-item index="1-2">item two</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="Group Two">
              <el-menu-item index="1-3">item three</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <span slot="title">item four</span>
              <el-menu-item index="1-4-1">item one</el-menu-item>
            </el-submenu>
          </el-submenu>-->
          <el-menu-item index="1" @click="updateCatalogModal">
            <i class="el-icon-s-grid"></i>
            <span slot="title">スレッド一覧を開く</span>
          </el-menu-item>
          <el-menu-item index="2">
            <i class="el-icon-refresh-left"></i>
            <span slot="title">Navigator Two</span>
          </el-menu-item>
          <el-menu-item index="3" @click="updateSettingModal">
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
  background: white;
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

a {
  text-decoration: none;
  cursor: pointer;
  transition: 0.3s ease all;
}
a.disabled {
  pointer-events: none;
  cursor: default;
}
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
.el-main {
  background-color: rgb(255, 255, 238);
  padding: 0 !important;
  overflow: hidden !important;
}

::-webkit-scrollbar {
  background-color: #fff;
  width: 16px;
}

::-webkit-scrollbar-track {
  background-color: #fff;
}
::-webkit-scrollbar-track:hover {
  background-color: #f4f4f4;
}

::-webkit-scrollbar-thumb {
  background-color: #babac0;
  border-radius: 8px;
  border: 5px solid #fff;
}
::-webkit-scrollbar-thumb:hover {
  background-color: #a0a0a5;
  border: 4px solid #f4f4f4;
}

::-webkit-scrollbar-button {
  display: none;
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
    updateSettingModal() {
      this.$store.dispatch("setting/updateModal");
    }
  }
};
</script>