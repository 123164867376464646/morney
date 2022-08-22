let id: number = parseInt(window.localStorage.getItem('_idMax') || '0') || 0;

function idCreate() {
  id++;
  // const idList = window.localStorage.setItem('idList',)
  return id;
}

export default idCreate;