import tagStore from '@/store/tagStore';
import recordStore from '@/store/recordStor';

const store = {
  ...recordStore,
  ...tagStore,
};


console.log(store);
export default store;