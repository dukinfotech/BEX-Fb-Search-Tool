export function loadRunningDataFromStorage (context) {
  chrome.storage.local.get(['keyword', 'isRunning', 'pages', 'pageIndex', 'isSearching', 'currentLocationIndex'], function(result) {
    context.commit('setKey', result.keyword || '');
    context.commit('setRunning', result.isRunning || false);
    context.commit('setPages', result.pages || []);
    context.commit('setPageIndex', result.pageIndex || 0);
    context.commit('setIsSearching', result.isSearching || false);
    context.commit('setCurrentLocationIndex', result.currentLocationIndex || 0);
  });
}