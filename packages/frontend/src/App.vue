<template>
  <div id="app">
    <el-container style=" border: 1px solid #eee">
      <el-aside width="64px;" style="background-color: rgb(238, 241, 246)">
        <el-menu default-active="2" class="el-menu-vertical-demo" :collapse="true">
          <el-submenu index="1">
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
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-refresh-left"></i>
            <span slot="title">Navigator Two</span>
          </el-menu-item>
          <el-menu-item index="3" @click="updateCatalogModal">
            <i class="el-icon-s-grid"></i>
            <span slot="title">スレッド一覧を開く</span>
          </el-menu-item>
          <el-menu-item index="4" @click="updateSettingModal">
            <i class="el-icon-setting"></i>
            <span slot="title">設定</span>
          </el-menu-item>
        </el-menu>
      </el-aside>

      <el-container>
        <el-main>
          <el-table :data="tableData">
            <el-table-column prop="date" label="Date" width="140"></el-table-column>
            <el-table-column prop="name" label="Name" width="120"></el-table-column>
            <el-table-column prop="address" label="Address"></el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-container>
    <Catalog></Catalog>
    <Setting></Setting>
  </div>
</template>

<style>
:root {
  --main-color: black;
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
</style>


<script>
import Catalog from "@/components/Catalog.vue"; // @ is an alias to /src
import Setting from "@/components/Setting.vue"; // @ is an alias to /src

export default {
  name: "App",
  components: {
    Catalog,
    Setting
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
  },
  data() {
    const item = {
      date: "2016-05-02",
      name: "Tom",
      address: "No. 189, Grove St, Los Angeles"
    };
    return {
      tableData: Array(10).fill(item)
    };
  }
};
</script>