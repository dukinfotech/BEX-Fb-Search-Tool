<template>
  <div>
    <div class="control-btns">
      <q-btn v-if="!isRunning" class="control-btn" color="primary" label="Bắt đầu" @click="start()"/>
      <q-btn v-else class="control-btn" color="negative" label="Dừng" @click="stop()"/>
      <q-btn class="control-btn" color="primary" label="Reset" @click="reset()" :disabled="isRunning && isSearching"/>
      <q-btn class="control-btn" color="primary" label="<" 
        :disabled="selectedLocations.length == 0 || currentLocationIndex == 0 || isRunning" @click="prevLocation()"/>
      <q-btn class="control-btn" color="primary" label=">" 
        :disabled="selectedLocations.length == 0 || currentLocationIndex == selectedLocations.length-1 || isRunning" @click="nextLocation()"/>
    </div>
    <q-select filled dense v-model="keyword" :options="keywords" label="Từ khóa" />
    Running: {{ isRunning }}
    Loading: {{ isSearching }}
    <div v-if="pages.length > 0">
      {{ 'Đang lấy dữ liệu #' + (pageIndex + 1) }}
    </div>
    <div v-if="category && category.value">
      Lĩnh vực: {{ category.label }}
    </div>
    <div v-if="selectedLocations.length > 0">
      Địa điểm: 
      <span v-bind:key="index" v-for="(item, index) in selectedLocations">
        <span :class="index==currentLocationIndex?'text-negative':''">{{ item.city }}</span>,&nbsp;
      </span>
    </div>
    <q-linear-progress v-if="isRunning" query color="warning" class="q-mt-sm" />
    <page-table style="margin-top:10px"/>
  </div>
</template>

<script>
import { transformFilter, makeURL } from 'app/src/helpers'
import PageTable from './PageTable.vue'
const { GoogleSpreadsheet } = require('google-spreadsheet');

export default {
  components: { PageTable },
  computed: {
    ggSheetId() {
      return this.$store.state.setting.ggSheetId;
    },
    ggSheetKey() {
      return this.$store.state.setting.ggSheetKey;
    },
    currentLocationIndex() {
      return this.$store.state.running.currentLocationIndex;
    },
    pageIndex() {
      return this.$store.state.running.pageIndex;
    },
    pages() {
      return this.$store.state.running.pages;
    },
    isRunning() {
      return this.$store.state.running.isRunning;
    },
    isSearching() {
      return this.$store.state.running.isSearching;
    },
    selectedLocations() {
      return this.$store.state.setting.selectedLocations;
    },
    delay() {
      return this.$store.state.setting.delay;
    },
    category() {
      return this.$store.state.setting.category;
    },
    keyword: {
      get() {
        return this.$store.state.running.keyword
      },
      set(val) {
        this.$store.commit('running/setKey', val)
      }
    },
    keywords () {
      return this.$store.state.setting.keywords
    }
  },
  mounted() {
    // isSearching is status access to a page and search data
    setTimeout(async () => {
      if (this.isSearching === false) {
        // Lấy danh sách các pages tìm kiếm được
        var { data } = await this.$q.bex.send('isRunning', { isRunning: this.isRunning });
        if (data.length > 0) {  
          this.$store.commit('running/mergePages', data);
          this.$store.commit('running/setIsSearching', true);
          this.$q.bex.send('accessPage', { page: this.pages[this.pageIndex] });
        } else {
          this.stop();
        }
      } else if (this.isRunning) {
        this.autoAccessPage();
      }
    }, 0);
  },
  methods: {
    start() {
      if (this.pages.length > 0) {
        this.$store.commit('running/setRunning', true);
        this.$store.commit('running/setIsSearching', true);
        this.$q.bex.send('accessPage', { page: this.pages[this.pageIndex] });
      } else {
        if (!this.keyword) {
          this.$q.notify('Bạn chưa chọn từ khóa')
        } else {
          this.$store.commit('running/setRunning', true);
          var filters = [];
          if (this.category && this.category.value) {
            var categoryFilter = transformFilter('category', 'pages_category', this.category.value);
            filters.push(categoryFilter);
          }
          if (this.selectedLocations.length > 0) {
            var locationFilter = transformFilter('filter_pages_location', 'filter_pages_location', this.selectedLocations[this.currentLocationIndex].code);
            filters.push(locationFilter);
          }
          var url = makeURL(filters, this.keyword);
          this.$q.bex.send('fb.redirect', { url: url });
        }
      }
    },
    stop() {
      this.$store.commit('running/setRunning', false);
      this.$store.commit('running/setIsSearching', false);
      this.$q.bex.send('isRunning', { isRunning: this.isRunning });
    },
    reset() {
      this.$store.commit('running/clearRunnings');
    },
    prevLocation() {
      this.$store.commit('running/setCurrentLocationIndex', this.currentLocationIndex-1);
    },
    nextLocation() {
      this.$store.commit('running/setCurrentLocationIndex', this.currentLocationIndex+1);
    },
    autoAccessPage() {
      // Truy cập vào từng trang web
      this.$q.bex.send('getPageInfo', { delay: this.delay }).then(async res => {
        var info = res.data;
        this.$store.commit('running/updatePages', {index: this.pageIndex, value: info});
        this.$store.commit('running/setPageIndex', this.pageIndex + 1);
        await this.writeToGGSheet(this.pages[this.pageIndex-1]);
        // Tiếp tục chạy link tiếp theo
        if (this.pages[this.pageIndex] != undefined) {
          this.$q.bex.send('accessPage', { page: this.pages[this.pageIndex] });
        } else {
          this.$store.commit('running/setRunning', false);
          this.$store.commit('running/setIsSearching', false);
        }
      });
    },
    async writeToGGSheet(page) {
      if (this.ggSheetId && this.ggSheetKey) {
        try {
          const doc = new GoogleSpreadsheet(this.ggSheetId);
          await doc.useServiceAccountAuth(this.ggSheetKey);
    
          await doc.loadInfo();
          const sheet = doc.sheetsByIndex[0];
          await sheet.setHeaderRow(['Tên', 'Link', 'Bài đăng gần nhất', 'Địa chỉ', 'Số điện thoại', 'Email', 'Website']);

          var row = {};
          row['Tên'] = page.name || '';
          row['Link'] = page.link || '';
          row['Bài đăng gần nhất'] = page.firstPostTime || '';
          row['Địa chỉ'] = page.address || '';
          row['Số điện thoại'] = '\'' + page.phone || '';
          row['Email'] = page.email || '';
          row['Website'] = page.website || '';

          await sheet.addRow(row);
          this.$q.notify({
            type: 'positive',
            message: 'Đã lưu vào Google Sheet'
          });
        } catch (error) {
          this.$q.notify('Kiểm tra lại kết nối tới Google Sheet');
        }
      }
    }
  }
}

</script>

<style scoped>
  .control-btns {
    margin-bottom: 10px;
  }
  .control-btn {
    margin-right: 10px;
  }
</style>
