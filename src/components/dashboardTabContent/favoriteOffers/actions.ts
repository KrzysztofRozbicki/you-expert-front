import axios from 'axios';
import { apiHost } from '../../../api/common';

export const getOffersAction = async (): Promise<any> => {
  try {
    const res = await axios({
      method: 'GET',
      url: `${apiHost}/offers/following/`
    });

    return res?.data;
  } catch (e) {
    throw new Error(e);
  }
};
