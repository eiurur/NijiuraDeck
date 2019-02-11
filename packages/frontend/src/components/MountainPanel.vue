<template>
  <div>
    <MountainForm></MountainForm>
    <button :click="count">increment</button>
    <MountainList></MountainList>
  </div>
</template>

<script>
import MountainForm from '@/components/MountainForm.vue'; // @ is an alias to /src
import MountainList from '@/components/MountainList.vue'; // @ is an alias to /src

export default {
  name: 'MountainPanel',
  components: {
    MountainForm,
    MountainList,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container {
  min-height: 100vh;
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
  text-align: center;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
