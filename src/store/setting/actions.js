export function loadSettingDataFromStorage (context) {
  chrome.storage.local.get(['keywords', 'locations', 'category'], function(result) {
    console.log(result);
    context.commit('setKeys', result.keywords)
    context.commit('setLocations', result.locations)
    context.commit('setCategory', result.category)
  });
}