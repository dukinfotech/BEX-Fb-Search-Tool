<template>
  <q-table
    dense
    :bordered="false"
    :title="'Fanpage('+pages.length+')'"
    :data="pages"
    :columns="columns"
    :pagination.sync="pagination"
    row-key="index"
  >
  </q-table>
</template>

<script>
export default {
  computed: {
    pages() {
      var pages = this.$store.state.running.pages;
      pages.forEach((row, index) => {
        console.log(row.link);
        row.index = index+1;
        row.textLink = row.link.substring(20, 60);
      })
      return pages;
    }
  },
  data () {
    return {
      pagination: {
        rowsPerPage: 15
      },
      columns: [
        { name: 'index', label: '#', field: 'index' },
        { name: 'name', align: 'left', label: 'Tên', field: 'name', sortable: true },
        { name: 'textLink', align: 'left', label: 'Link', field: 'textLink' },
        { name: 'firstPostTime', align: 'left', label: 'Bài đăng gần nhất', field: 'firstPostTime' },
        { name: 'phone', align: 'left', label: 'SĐT', field: 'phone' },
        { name: 'email', align: 'left', label: 'Email', field: 'email' },
        { name: 'address', align: 'left', label: 'Địa chỉ', field: 'address' },
      ]
    }
  },
  methods: {
  }
}
</script>