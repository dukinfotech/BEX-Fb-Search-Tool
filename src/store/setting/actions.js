export function loadSettingDataFromStorage (context) {
  chrome.storage.local.get(['keywords', 'locations', 'category', 'delay', 'ggSheetId'], function(result) {
    context.commit('setKeys', result.keywords || [])
    context.commit('setLocations', result.locations || [])
    context.commit('setCategory', result.category || null)
    context.commit('setDelay', result.delay || 3000)
    context.commit('setGGSheetId', result.ggSheetId || '')
  });
}