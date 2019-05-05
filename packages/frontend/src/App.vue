<template>
  <div id="app">
    <div id="nav">
      <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" :router="true">
        <!-- <el-menu-item index="1">Processing Center</el-menu-item>\ -->
        <el-menu-item index="/">射精選挙</el-menu-item>
        <el-menu-item index="/about">このサイトについて</el-menu-item>
        <el-menu-item index="/auth/twitter/callback" class="right" target="_blank">ログイン</el-menu-item>
      </el-menu>
    </div>
    <router-view/>
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
  font-weight: 400;
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
  /* color: $accent-color; */
  transition: 0.3s ease all;

  /* &:hover {
    text-decoration: none;
    color: lighten($accent-color, 15%);
  }

  &:focus {
    text-decoration: none;
    color: lighten($accent-color, 15%);
  } */
}
a.disabled {
  pointer-events: none;
  cursor: default;
}
</style>


<script>
export default {
  data() {
    return {
      activeIndex: "1"
    };
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>