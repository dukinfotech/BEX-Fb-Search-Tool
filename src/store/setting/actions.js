export function loadSettingDataFromStorage (context) {
  chrome.storage.local.get(['keywords', 'accessToken', 'locations', 'category'], function(result) {
    console.log(result);
    context.commit('setKeys', result.keywords)
    context.commit('setAccessToken', result.accessToken)
    context.commit('setLocations', result.locations)
    context.commit('setCategory', result.category)
  });
}