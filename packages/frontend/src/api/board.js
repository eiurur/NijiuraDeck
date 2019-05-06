import axios from 'axios';

const SORT_TYPE = {
  NEW: 1,
  OLD: 2,
  MANY: 3,
  FEW: 4,
  MOMENT: 6,
  SO: 8
};
const VERSION = 'v1';
const API_ROOT = `http://127.0.0.1:12700/api/${VERSION}`;

export default {
  async fetchCatalogList({ boardType }) {
    const list = await axios.get(`${API_ROOT}/${boardType}/threads`, {
      params: { sort: SORT_TYPE.MANY }
    });
    return list;
  }

  // getProducts(cb) {
  //   setTimeout(() => cb(_products), 100);
  // },

  // buyProducts(products, cb, errorCb) {
  //   setTimeout(() => {
  //     // simulate random checkout failure.
  //     Math.random() > 0.5 || navigator.userAgent.indexOf('PhantomJS') > -1 ? cb() : errorCb();
  //   }, 100);
  // }
};
