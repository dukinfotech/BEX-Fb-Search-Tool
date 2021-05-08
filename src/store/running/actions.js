export function loadRunningDataFromStorage (context) {
  chrome.storage.local.get(['keyword', 'isRunning', 'pages', 'pageIndex', 'isSearching', 'currentLocationIndex', 'currentKeywordIndex'], function(result) {
    context.commit('setKey', result.keyword || '');
    context.commit('setRunning', result.isRunning || false);
    context.commit('setPages', result.pages || []);
    context.commit('setPageIndex', result.pageIndex || 0);
    context.commit('setIsSearching', result.isSearching || false);
    context.commit('setCurrentLocationIndex', result.currentLocationIndex || 0);
    context.commit('setCurrentKeywordIndex', result.currentKeywordIndex || 0);
  });
}

export function loadLoggedInStatus (context) {
  chrome.storage.local.get(['isLoggedIn'], function(result) {
    context.commit('setIsLoggedIn', result.isLoggedIn);
  });
}