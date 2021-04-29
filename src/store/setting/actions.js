export function loadSettingDataFromStorage (context) {
  chrome.storage.local.get(['keywords', 'locations', 'category', 'delay'], function(result) {
    context.commit('setKeys', result.keywords)
    context.commit('setLocations', result.locations)
    context.commit('setCategory', result.category)
    context.commit('setDelay', result.delay)
  });
}