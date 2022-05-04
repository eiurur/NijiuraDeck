<template>
  <el-dialog title="設定" :visible.sync="modal"></el-dialog>
</template>

<script>
export default {
  name: 'Setting',
  computed: {
    modal: {
      get() {
        return this.$store.getters['setting/getModal'];
      },
      set() {
        this.$store.dispatch('setting/toggleModal');
      },
    },
  },
};
</script>
