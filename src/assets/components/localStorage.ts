const setDataToLocalStorage = (key: string, value: string) => {
  localStorage.setItem(key, value);
};

const getDataFromLocalStorage = (key: string) => {
  return localStorage.getItem(key);
};

const clearDataFromLocalStorage = (key: string) => {
  localStorage.removeItem(key);
};

const clearAllDataFromLocalStorage = () => {
  localStorage.clear();
};

const checkDataInLocalStorage = (key: string) => {
  return localStorage.getItem(key) !== null;
};

const getAllKeysFromLocalStorage = () => {
  return Object.keys(localStorage);
};

const getKeysWithPrefix = (prefix: string) => {
  return Object.keys(localStorage).filter((key) => key.startsWith(prefix));
};

const replaceDataInLocalStorage = (
  old_key: string,
  new_key: string,
  value: string
) => {
  localStorage.setItem(new_key, value);
  localStorage.removeItem(old_key);
};

const clearOldestDataFromLocalStorage = (prefix: string, limit: number) => {
  const keys = getKeysWithPrefix(prefix);

  if (keys.length > limit) {
    keys.sort((a: string, b: string) => {
      const dateA = new Date(JSON.parse(localStorage.getItem(a)!).timeAdded);
      const dateB = new Date(JSON.parse(localStorage.getItem(b)!).timeAdded);
      return dateA.getTime() - dateB.getTime();
    });

    const keysToRemove = keys.slice(0, keys.length - limit);
    for (let key of keysToRemove) {
      localStorage.removeItem(key);
    }
  }
};

export {
  setDataToLocalStorage,
  getDataFromLocalStorage,
  clearDataFromLocalStorage,
  clearAllDataFromLocalStorage,
  checkDataInLocalStorage,
  getAllKeysFromLocalStorage,
  getKeysWithPrefix,
  replaceDataInLocalStorage,
  clearOldestDataFromLocalStorage,
};
