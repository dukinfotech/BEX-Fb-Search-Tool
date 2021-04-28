export function loadRunningDataFromStorage (context) {
  chrome.storage.local.get(['keyword', 'isRunning', 'pages', 'pageIndex'], function(result) {
    context.commit('setKey', result.keyword);
    context.commit('setRunning', result.isRunning);
    context.commit('setPages', result.pages);
    context.commit('setPageIndex', result.pageIndex);
  });
}