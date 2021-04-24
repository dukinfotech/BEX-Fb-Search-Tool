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
        row.index = index+1;
        row.link = row.link.substring(20, 60);
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
        { name: 'link', align: 'left', label: 'Link', field: 'link' }
      ]
    }
  },
  methods: {
  }
}
</script>