<template>
  <q-btn
    color="primary"
    size="sm"
    :label="isToggle?'Thu nhỏ':'Phóng to'"
    class="toggle-btn"
    @click="toggleSize()"
  />
</template>

<script>

export default {
  created() {
    this.$store.dispatch('setting/loadSettingDataFromStorage')
  },
  computed: {
    isToggle: {
      get() {
        return this.$store.state.setting.isToggle
      },
      set(val) {
        this.$store.commit('setting/setIsToggle', val)
      }
    },
  },
  methods: {
    toggleSize() {
      this.$q.bex.send('toggleSize', { isToggle: this.isToggle });
      this.isToggle = !this.isToggle;
    }
  }
}
</script>


<style scoped>
  .toggle-btn {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 999;
  }
</style>