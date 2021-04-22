export function addKey (state, key) {
  state.keywords.push(key.trim())
  storeSettings(state)
}

export function removeKey (state, {index, key}) {
  state.keywords.splice(index, 1);
  storeSettings(state)
}

export function setKeys (state, keys) {
  state.keywords = keys
  storeSettings(state)
}

export function setLocations (state, locations) {
  state.locations = locations
  storeSettings(state)
}

export function setCategory (state, category) {
  state.category = category
  storeSettings(state)
}

function storeSettings(state) {
  chrome.storage.local.set(state);
}

export function clearSettings(state) {
  state.keywords = [];
  state.locations = [];
  state.category = null;
  chrome.storage.local.set(state);
}