const setStorage = (key, data) => {
  const value = JSON.stringify(data);
  const keyValue = key;
  localStorage.setItem(keyValue, value);
};

const getStorage = (key) => {
  const data = localStorage.getItem(key);
  return data;
};

const removeStorage = () => {
  localStorage.removeItem("oauth");
};

const parsingLocalStorage = (value) => {
  const allData = getStorage('oauth',);
  if (allData != null) {
    const parsedStorage = JSON.parse(allData);
    const data = parsedStorage[value];
    return data;
  }
};

export { setStorage, getStorage, removeStorage, parsingLocalStorage };
