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
    <template v-slot:top>
      <q-btn color="positive" label="Import" :disabled="isRunning" @click="pickFile()"/>
      <input type="file" id="my_file" style="display:none;">
    </template>
  </q-table>
</template>

<script>
import readXlsxFile from 'read-excel-file'
export default {
  computed: {
    isRunning() {
      return this.$store.state.running.isRunning;
    },
    pages() {
      var pages = this.$store.state.running.pages;
      pages.forEach((row, index) => {
        row.index = index+1;
        row.textLink = row.link.substring(20, 60);
      })
      return pages;
    },
    pageIndex() {
      return this.$store.state.running.pageIndex;
    },
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
        { name: 'website', align: 'left', label: 'Website', field: 'website' },
        { name: 'email', align: 'left', label: 'Email', field: 'email' },
        { name: 'address', align: 'left', label: 'Địa chỉ', field: 'address' },
      ]
    }
  },
  mounted() {
    const input = document.querySelector('#my_file');
    input.addEventListener('change', async () => {
      var pages = [];
      var rows = await readXlsxFile(input.files[0]);
      rows.forEach(row => {
        pages.push({ link: row[0] });
      });
      this.$store.commit('running/mergePages', pages);
    })
  },
  methods: {
    pickFile() {
      document.querySelector('#my_file').click();
    }
  }
}
</script>