function savePlayerToStorage(names) {
  localStorage.setItem("player", JSON.stringify(names));
}

function loadFromStorage(storageName) {
  return JSON.parse(localStorage.getItem(storageName)) || [];
}

export { loadFromStorage, savePlayerToStorage };
