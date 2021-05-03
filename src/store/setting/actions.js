export function loadSettingDataFromStorage (context) {
  chrome.storage.local.get(['keywords', 'locations', 'category', 'delay', 'ggSheetId', 'ggSheetKey'], function(result) {
    context.commit('setKeys', result.keywords || [])
    context.commit('setLocations', result.locations || [])
    context.commit('setCategory', result.category || null)
    context.commit('setDelay', result.delay || 3000)
    context.commit('setGGSheetId', result.ggSheetId || '')
    context.commit('setGGSheetKey', result.ggSheetKey || '')
  });
}