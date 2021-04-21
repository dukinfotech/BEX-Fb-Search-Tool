<template>
  <div>
    <div class="control-btns">
      <q-btn class="control-btn" color="primary" label="Bắt đầu" @click="start()"/>
      <q-btn class="control-btn" color="primary" label="Reset" />
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
  </div>
</template>

<script>
import { transformFilter, makeURL } from 'app/src/helpers'

export default {
  computed: {
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
        this.$q.bex.send('fb.redirect', { url: url })
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
