import tagStore from '@/store/tagStore';
import recordStore from '@/store/recordStor';

const store = {
  ...recordStore,
  ...tagStore,
};
export default store;