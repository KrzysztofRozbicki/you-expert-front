import axios from 'axios';
import { apiHost } from '../../api/common';

export const deleteOfferAction = async (offerId: number) => {
  try {
    await axios({
      method: 'DELETE',
      url: `${apiHost}/offers/${offerId}`
    });
  } catch (e) {
    throw new Error(e);
  }
};
