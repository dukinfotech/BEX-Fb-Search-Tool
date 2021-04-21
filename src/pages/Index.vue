<template>
  <div>
    <q-tabs
      v-model="tab"
      dense
      class="text-grey"
      active-color="primary"
      indicator-color="primary"
      align="justify"
      narrow-indicator
    >
      <q-tab name="running" label="Khởi chạy" />
      <q-tab name="setting" label="Thiết đặt" />
    </q-tabs>

    <q-separator />

    <q-tab-panels v-model="tab" animated keep-alive>
      <q-tab-panel name="running">
        <running-tab/>
      </q-tab-panel>

      <q-tab-panel name="setting">
        <setting-tab/>
      </q-tab-panel>
    </q-tab-panels>
  </div>
</template>

<script>
import RunningTab from 'src/components/RunningTab.vue'
import SettingTab from 'src/components/SettingTab.vue'

export default {
  components: { RunningTab, SettingTab },
  created() {
    this.$store.dispatch('running/loadRunningDataFromStorage')
    this.$store.dispatch('setting/loadSettingDataFromStorage')
  },
  data () {
    return {
      tab: 'running'
    }
  }
}
</script>