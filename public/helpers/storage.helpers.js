class Storage {
  static createAnEntryInStorage(key, value) {
    if (!key || !value) return;

    localStorage.setItem(key, value);
  }

  static retrieveAnEntryFromStorage(key) {
    if (!key) return;

    return localStorage.getItem(key);
  }

  static removeAllEntriesFromStorage() {
    localStorage.clear();
  }

  static removeAnEntryFromStorage(key) {
    if (!key) return;
    else localStorage.removeItem(key);
  }
}

export default Storage;
