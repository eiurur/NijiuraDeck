import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

dayjs.extend(relativeTime);

const SORT_TYPE = {
  NEW: 1,
  OLD: 2,
  MANY: 3,
  FEW: 4,
  MOMENT: 6,
  SO: 8
};
const VERSION = 'v1';
const API_ROOT = `/api/${VERSION}`;

export default {
  normalizeResponses(responses) {
    return responses.map((response) => {
      response.createdAt = `20${response.createdAt.replace(/\(.\)/, ' ')}`;
      response.fromNow = dayjs(response.createdAt).fromNow();
      return response;
    });
  },
  async fetchCatalogList({ boardType }) {
    const { data } = await axios.get(`${API_ROOT}/${boardType}/threads`, {
      params: { sort: SORT_TYPE.MANY }
    });
    return data;
  },
  async fetchReponseList({ boardType, threadId }) {
    const { data } = await axios.get(`${API_ROOT}/${boardType}/thread/${threadId}`);
    return this.normalizeResponses(data);
  }
};
