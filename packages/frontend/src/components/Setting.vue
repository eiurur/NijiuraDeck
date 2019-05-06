<template>
  <el-dialog title="設定" :visible.sync="modal">
    <el-table :data="gridData">
      <el-table-column property="date" label="Date" width="150"></el-table-column>
      <el-table-column property="name" label="Name" width="200"></el-table-column>
      <el-table-column property="address" label="Address"></el-table-column>
    </el-table>
  </el-dialog>
</template>

<script>
export default {
  name: "Setting",
  computed: {
    modal: {
      get() {
        return this.$store.getters["setting/getModal"];
      },
      set() {
        this.$store.dispatch("setting/updateModal");
      }
    }
  },
  data() {
    return {
      gridData: [
        {
          date: "2016-05-02",
          name: "John Smith",
          address: "No.1518,  Jinshajiang Road, Putuo District"
        },
        {
          date: "2016-05-04",
          name: "John Smith",
          address: "No.1518,  Jinshajiang Road, Putuo District"
        },
        {
          date: "2016-05-01",
          name: "John Smith",
          address: "No.1518,  Jinshajiang Road, Putuo District"
        },
        {
          date: "2016-05-03",
          name: "John Smith",
          address: "No.1518,  Jinshajiang Road, Putuo District"
        }
      ],
      formLabelWidth: "120px"
    };
  }
};
</script>