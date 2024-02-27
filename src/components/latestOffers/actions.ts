import axios from 'axios';
import { apiHost } from '../../api/common';

export const getOffers = async (page: number, perPage = 4): Promise<any[]> => {
  try {
    const res = await axios({
      method: 'GET',
      url: `${apiHost}/offers/latest/`,
      params: { page, page_size: perPage },
    });

    return res?.data?.results;
  } catch (e) {
    throw new Error(e);
  }
};
