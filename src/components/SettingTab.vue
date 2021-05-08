<template>
  <div>
    <div class="row justify-end">
      <q-btn color="red" label="Đăng xuất" @click="logout()"/>
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
    <div class="row">
      <q-input class="mt-10 col-6" filled dense label="Thời gian delay mỗi trang (3000 = 3s)" v-model="delay"/>
      <q-input class="mt-10 col-6" filled dense label="Google Sheet ID" v-model="ggSheetId"/>
    </div>
    <input type="file" id="my_file2" style="display:none;">
    <q-btn class="q-ml-sm mt-10" :color="this.ggSheetKey ? 'positive' : 'pink-14'" 
      :label="this.ggSheetKey ? 'Đã thiết lập GG Sheet' : 'Thiết lập GG Sheet'"
      @click="setupGGSheet()"/>
    <div class="row">
      <q-input class="mt-10 col-5" filled dense label="Tên địa điểm" v-model="location.city"/>
      <q-input class="mt-10 col-5" filled dense label="Mã địa điểm" v-model="location.code"/>
      <q-btn class="mt-10 col-2" color="primary" label="Thêm" @click="addLocation()"/>
    </div>
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
      location: {
        city: '',
        code: '',
      }
    }
  },
  computed: {
    ggSheetKey: function () {
      return this.$store.state.setting.ggSheetKey;
    },
    delay: {
      get() {
        return this.$store.state.setting.delay;
      },
      set(val) {
        this.$store.commit('setting/setDelay', Number(val))
      }
    },
    ggSheetId: {
      get() {
        return this.$store.state.setting.ggSheetId;
      },
      set(val) {
        this.$store.commit('setting/setGGSheetId', val);
      }
    },
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
        this.$store.commit('running/setKey', '')
      }
    }
  },
  mounted() {
    const input2 = document.querySelector('#my_file2');
    input2.addEventListener('change', async () => {
      var reader = new FileReader();
      await reader.readAsText(input2.files[0]);
      reader.onload = e => {
        var jsonObject = JSON.parse(reader.result);
        this.$store.commit('setting/setGGSheetKey', jsonObject);
      };
    })
  },
  methods: {
    createValue(val, done) {
      done(val, 'add-unique')
      this.$store.commit('setting/addKey', val)
    },
    removeValue({index, val}) {
      this.$store.commit('setting/removeKey', {index, val})
    },
    logout() {
      this.$store.commit('running/clearRunnings')
      this.$store.commit('setting/clearSettings')
      this.$router.replace('/');
    },
    setupGGSheet() {
      document.querySelector('#my_file2').click();
    },
    async addLocation() {
      if (this.location.city.trim() && this.location.code.trim()) {
        this.$store.commit('setting/setSelectedLocations', []);
        await this.$store.dispatch('setting/addLocation', this.location);
        this.location.city = '';
        this.location.code = '';
        this.$q.notify({
          type: 'positive',
          message: 'Đã thêm địa điểm thành công.'
        });
      }
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