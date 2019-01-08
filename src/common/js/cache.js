import storage from 'good-storage'

const SEARCH_KEY = '__search__'
const SEARCH_MAX_LEN = 15

// const PLAY_KEY = '__play__'
// const PLAY_MAX_LEN = 200

// const FAVORITE_KEY = '__favorite__'
// const FAVORITE_MAX_LEN = 200

function insert(name) {
  const searchList = storage.get(SEARCH_KEY, []);
  const index = searchList.findIndex((item) => {
    return item === name;
  })
  if (index > -1) {
    searchList.splice(index, 1);
  }
  if (searchList.length >= SEARCH_MAX_LEN) {
    searchList.pop();
  }
  searchList.unshift(name);
  storage.set(SEARCH_KEY, searchList);
  return searchList;
}

function removeItem(name) {
  const searchList = storage.get(SEARCH_KEY, []);
  const index = searchList.findIndex((item) => {
    return item === name;
  })
  if (index > -1) {
    searchList.splice(index, 1);
  }
  storage.set(SEARCH_KEY, searchList);
  return searchList;
};

export function saveSearch(name) {
  return insert(name);
}
export function loadSearch() {
  return storage.get(SEARCH_KEY, []);
}

export function clearSearch() {
  storage.set(SEARCH_KEY, [])
  return [];
}
export function deleteSearch(name) {
  return removeItem(name)
  // storage.set(SEARCH_KEY, [])
  // return [];
}