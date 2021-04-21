export function loadRunningDataFromStorage (context) {
  chrome.storage.local.get(['keyword'], function(result) {
    context.commit('setKey', result.keyword)
  });
}