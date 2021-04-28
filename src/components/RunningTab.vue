<template>
  <div>
    <div class="control-btns">
      <q-btn v-if="!isRunning" class="control-btn" color="primary" label="Bắt đầu" @click="start()"/>
      <q-btn v-else class="control-btn" color="negative" label="Dừng" @click="stop()"/>
      <q-btn class="control-btn" color="primary" label="Reset" @click="reset()" :disabled="isRunning"/>
      <q-btn class="control-btn" color="primary" label="<" />
      <q-btn class="control-btn" color="primary" label=">" />
    </div>
    <q-select filled dense v-model="keyword" :options="keywords" label="Từ khóa" />
    <div v-if="category && category.value">
      Lĩnh vực: {{ category.label }}
    </div>
    <div v-if="locations.length > 0">
      Địa điểm: 
      <span v-bind:key="index" v-for="(item, index) in locations">{{ index==0?'':', ' }}{{ item.city }}</span>
    </div>
    <q-linear-progress v-if="isRunning" query color="warning" class="q-mt-sm" />
    <page-table style="margin-top:10px"/>
  </div>
</template>

<script>
import { transformFilter, makeURL } from 'app/src/helpers'
import PageTable from './PageTable.vue'

export default {
  components: { PageTable },
  computed: {
    isRunning() {
      return this.$store.state.running.isRunning;
    },
    locations() {
      return this.$store.state.setting.locations;
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
    setTimeout(() => {
      this.$q.bex.send('isRunning', { isRunning: this.isRunning }).then(res => {
        var pages = res.data;
        this.$store.commit('running/setPages', pages);
        this.$store.commit('running/setRunning', false);
        this.$store.commit('running/setPageIndex', 0);
      });
    }, 0);
  },
  methods: {
    start() {
      if (!this.keyword) {
        this.$q.notify('Bạn chưa chọn từ khóa')
      } else {
        var filters = [];
        if (this.category && this.category.value) {
          var categoryFilter = transformFilter('category', 'pages_category', this.category.value);
          filters.push(categoryFilter);
        }
        if (this.locations.length > 0) {
          var locationFilter = transformFilter('filter_pages_location', 'filter_pages_location', this.locations[0].code);
          filters.push(locationFilter);
        }
        var url = makeURL(filters, this.keyword);
        this.$store.commit('running/setRunning', true);
        this.$q.bex.send('fb.redirect', { url: url });
      }
    },
    stop() {
      this.$store.commit('running/setRunning', false);
      this.$q.bex.send('isRunning', { isRunning: this.isRunning });
    },
    reset() {
      this.$store.commit('running/setPages', []);
      this.$store.commit('running/setPageIndex', null);
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
