<template>
  <el-dialog
    title="カタログ"
    width="90vw"
    height="75vh"
    top="5vh"
    :visible.sync="modal"
  >
    <CatalogContainer></CatalogContainer>
  </el-dialog>
</template>

<style lang="scss" scoped></style>

<script>
import CatalogContainer from '@/components/CatalogContainer.vue';

export default {
  name: 'Catalog',
  components: {
    CatalogContainer,
  },
  computed: {
    modal: {
      get() {
        return this.$store.getters['catalog/getModal'];
      },
      set() {
        this.$store.dispatch('catalog/toggleModal');
      },
    },
  },
  data() {
    return {
      formLabelWidth: '120px',
    };
  },
  updated() {
    this.$store.dispatch('catalog/clearThreads');
  },
};
</script>
