import axios from 'axios';
import { apiHost } from '../../api/common';

export const getSearchDataAsyncAction = async (params: any): Promise<any> => {
  try {
    const res = await axios({
      method: 'GET',
      url: `${apiHost}/search-offers/`,
      params
    });

    return res?.data;
  } catch (e) {
    throw new Error(e);
  }
};
