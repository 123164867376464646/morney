const localStorageKeyName = 'recordList';
const recordListModel = {
  clone(record: RecordItem[] | RecordItem) {
    return JSON.parse(JSON.stringify(record));
  },
  fetch() {
    return JSON.parse(window.localStorage.getItem(localStorageKeyName) || '[]') as RecordItem[];
  },
  save(data: RecordItem[]) {
    window.localStorage.setItem(localStorageKeyName, JSON.stringify(data));
  }
};

export default recordListModel;