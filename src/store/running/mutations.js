export function setKey (state, key) {
  state.keyword = key
  chrome.storage.local.set(state);
}

export function setRunning(state, status) {
  state.isRunning = status
  chrome.storage.local.set(state);
}

export function setPages(state, pages) {
  state.pages = pages
  chrome.storage.local.set(state);
}

export function setPageIndex(state, index) {
  state.pageIndex = index
  chrome.storage.local.set(state);
}

export function clearRunnings(state) {
  state.keyword = ''
  state.isRunning = false;
  state.pages = [];
  chrome.storage.local.set(state);
}