<template>
  <div>
    <div>
      <q-btn color="red" label="Xóa cache" @click="deleteData()"/>
    </div>
    <div class="mt-10">
      <q-select
        dense
        label="Nhập từ khóa tìm kiếm"
        filled
        v-model="keywords"
        use-input
        use-chips
        multiple
        hide-dropdown-icon
        input-debounce="0"
        @remove="removeValue"
        @new-value="createValue"
      />
    </div>
    <q-select class="mt-10" filled dense v-model="category" :options="categories" label="Lĩnh vực" />
    <location-table class="mt-10"/>
  </div>
</template>

<script>
import constants from 'app/src/constants'
import LocationTable from './LocationTable.vue'

export default {
  components: { LocationTable },
  data() {
    return {
    }
  },
  computed: {
    category: {
      get() {
        return this.$store.state.setting.category ? this.$store.state.setting.category.label : null
      },
      set(val) {
        this.$store.commit('setting/setCategory', val)
      }
    },
    categories: function () {
      return constants.categories
    },
    keywords: {
      get() {
        return this.$store.state.setting.keywords
      },
      set() {
        this.$store.commit('running/resetKey')
      }
    }
  },
  methods: {
    createValue(val, done) {
      done(val, 'add-unique')
      this.$store.commit('setting/addKey', val)
    },
    removeValue({index, val}) {
      this.$store.commit('setting/removeKey', {index, val})
    },
    deleteData() {
      this.$store.commit('running/clearRunnings')
      this.$store.commit('setting/clearSettings')
    }
  },
}
</script>

<style scoped>
  .mt-10 {
    margin-top: 10px;
  }
  .filter-item:not(:last-child) {
    margin-right: 10px;
  }
</style>