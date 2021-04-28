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

export function mergePages(state, pages) {
  state.pages = state.pages.concat(pages)
  chrome.storage.local.set(state);
}

export function updatePages(state, data) {
  var index = data.index;
  var page = data.value;
  state.pages[index].name = page.name;
  state.pages[index].firstPostTime = page.firstPostTime;
  state.pages[index].website = page.website;
  state.pages[index].phone = page.phone;
  state.pages[index].email = page.email;
  state.pages[index].address = page.address;
  chrome.storage.local.set(state);
}

export function setPageIndex(state, index) {
  state.pageIndex = index
  chrome.storage.local.set(state);
}

export function setIsSearching(state, status) {
  state.isSearching = status
  chrome.storage.local.set(state);
}

export function clearRunnings(state) {
  state.keyword = ''
  state.isRunning = false;
  state.pages = [];
  state.pageIndex = null;
  state.isSearching = false;
  state.currentLocationIndex = 0;
  chrome.storage.local.set(state);
}

export function setCurrentLocationIndex(state, x) {
  state.currentLocationIndex = state.currentLocationIndex + x;
  chrome.storage.local.set(state);
}