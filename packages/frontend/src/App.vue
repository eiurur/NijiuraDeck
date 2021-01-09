<template>
  <div id="app">
    <el-container style=" border: 1px solid #eee">
      <SideMenu></SideMenu>
      <el-container>
        <Columns></Columns>
      </el-container>
    </el-container>
    <Catalog></Catalog>
    <Setting></Setting>
    <About></About>
  </div>
</template>

<style lang="scss">
@import '@/styles/index.scss';
</style>

<script>
import SideMenu from '@/components/SideMenu.vue'; // @ is an alias to /src
import Catalog from '@/components/Catalog.vue'; // @ is an alias to /src
import Setting from '@/components/Setting.vue'; // @ is an alias to /src
import About from '@/components/About.vue'; // @ is an alias to /src
import Columns from '@/components/Columns.vue'; // @ is an alias to /src

export default {
  name: 'App',
  components: {
    SideMenu,
    Catalog,
    Setting,
    About,
    Columns,
  },
};
</script>
