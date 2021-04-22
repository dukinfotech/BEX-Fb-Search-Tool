export function loadRunningDataFromStorage (context) {
  chrome.storage.local.get(['keyword', 'isRunning'], function(result) {
    context.commit('setKey', result.keyword)
    context.commit('setRunning', result.isRunning)
  });
}