export function setKey (state, key) {
  state.keyword = key
  chrome.storage.local.set(state);
}

export function clearRunnings(state) {
  state.keyword = ''
  chrome.storage.local.set(state);
}