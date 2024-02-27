import axios from 'axios';
import { apiHost } from '../../api/common';

export const setNewPasswordAction = async (data: {
  uid: string;
  token: string;
  password: string;
}): Promise<void> => {
  try {
    await axios({
      method: 'POST',
      url: `${apiHost}/accounts/set-password/`,
      data
    });
  } catch (e) {
    throw new Error(e);
  }
};
