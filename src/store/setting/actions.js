export function loadSettingDataFromStorage (context) {
  chrome.storage.local.get(['keywords', 'locations', 'selectedLocations', 'category', 'delay', 'ggSheetId', 'ggSheetKey', 'isToggle'], function(result) {
    context.commit('setKeys', result.keywords || [])
    context.commit('setLocations', result.locations || [])
    context.commit('setSelectedLocations', result.selectedLocations || [])
    context.commit('setCategory', result.category || null)
    context.commit('setDelay', result.delay || 3000)
    context.commit('setGGSheetId', result.ggSheetId || '')
    context.commit('setGGSheetKey', result.ggSheetKey || '')
    context.commit('setIsToggle', result.isToggle)
  });
}

export function addLocation (context, location) {
  context.commit('addLocation', location);
}