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

export function addLocation (state, location) {
  var newLocation = { city: location.city, code: location.code };
  state.locations.unshift(newLocation);
  storeSettings(state)
}

export function setSelectedLocations (state, locations) {
  state.selectedLocations = locations
  storeSettings(state)
}

export function setCategory (state, category) {
  state.category = category
  storeSettings(state)
}

export function setDelay (state, time) {
  state.delay = time
  storeSettings(state)
}

export function setGGSheetId (state, id) {
  state.ggSheetId = id
  storeSettings(state)
}

export function setGGSheetKey (state, key) {
  state.ggSheetKey = key
  storeSettings(state)
}

export function setIsToggle (state, isToggle) {
  state.isToggle = isToggle
  storeSettings(state)
}

function storeSettings(state) {
  chrome.storage.local.set(state);
}

export function clearSettings(state) {
  state.keywords = [];
  state.locations = [];
  state.selectedLocations = [];
  state.category = null;
  state.delay = 3000;
  state.ggSheetId = '';
  state.ggSheetKey = null;
  chrome.storage.local.set(state);
}