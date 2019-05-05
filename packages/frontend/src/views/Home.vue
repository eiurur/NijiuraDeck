<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js + TypeScript App"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import MountainPanel from "@/components/MountainPanel.vue";

export default {
  name: "home",
  components: {
    HelloWorld,
    MountainPanel
  }
};
</script>
