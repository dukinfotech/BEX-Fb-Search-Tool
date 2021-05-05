<template>
  <q-table
    dense
    :pagination.sync="pagination"
    :bordered="false"
    title="Địa điểm"
    :data="data"
    :columns="columns"
    row-key="code"
    :selected-rows-label="getSelectedString"
    selection="multiple"
    :selected.sync="selected"
  />
</template>

<script>
import constants from 'app/src/constants'
export default {
  computed: {
    data() {
      var constLocations = constants.locations;
      var addedLocations = this.$store.state.setting.locations;
      return addedLocations.concat(constLocations);
    },
    selected: {
      get() {
        return this.$store.state.setting.selectedLocations;
      },
      set(val) {
        this.$store.commit('setting/setSelectedLocations', val)
      }
    }
  },
  data () {
    return {
      pagination: {
        rowsPerPage: 15
      },
      columns: [
        { name: 'city', align: 'left', label: 'Thành phố', field: 'city', sortable: true },
        { name: 'code', align: 'center', label: 'Code', field: 'code' }
      ]
    }
  },
  methods: {
    getSelectedString () {
      return this.selected.length === 0 ? '' : `${this.selected.length} record${this.selected.length > 1 ? 's' : ''} selected of ${this.data.length}`
    }
  }
}
</script>