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
      <q-btn class="q-ml-sm" color="pink-14" label="Export" :disabled="isExporting || isRunning || pages.length == 0" @click="exportToSheet()"/>
    </template>
  </q-table>
</template>

<script>
import readXlsxFile from 'read-excel-file'
const { GoogleSpreadsheet } = require('google-spreadsheet');
export default {
  computed: {
    ggSheetId() {
      return this.$store.state.setting.ggSheetId;
    },
    ggSheetKey() {
      return this.$store.state.setting.ggSheetKey;
    },
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
      isExporting: false,
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
    },
    async exportToSheet() {
      if (! this.ggSheetId || !this.ggSheetKey) {
        this.$q.notify('Bạn chưa thiết lập Google Sheet');
        return;
      }
      try {
        this.isExporting = true;
        const doc = new GoogleSpreadsheet(this.ggSheetId);
        await doc.useServiceAccountAuth(this.ggSheetKey);
  
        await doc.loadInfo();
        const sheet = doc.sheetsByIndex[0];
        var rows = [];
        this.pages.forEach(page => {
          var row = {};
          row['Tên'] = page.name || '';
          row['Link'] = page.link || '';
          row['Bài đăng gần nhất'] = page.firstPostTime || '';
          row['Địa chỉ'] = page.address || '';
          row['Số điện thoại'] = page.phone || '';
          row['Email'] = page.email || '';
          row['Website'] = page.website || '';
          rows.push(row);
        });
        await sheet.setHeaderRow(['Tên', 'Link', 'Bài đăng gần nhất', 'Địa chỉ', 'Số điện thoại', 'Email', 'Website']);
        await sheet.addRows(rows);
        this.$q.notify({
          type: 'positive',
          message: 'Đã export dữ liệu thành công'
        });
      } catch (error) {
        this.$q.notify('Kiểm tra lại kết nối tới Google Sheet');
      }
      this.isExporting = false;
    }
  }
}
</script>