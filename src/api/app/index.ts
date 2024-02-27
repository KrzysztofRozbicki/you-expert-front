import axios from 'axios';
import { apiHost } from '../common';

export const setLanguage = async (lang_code) => {
  return axios({
    method: 'post',
    url: `${apiHost}/set-lang/`,
    params: {
      lang_code
    }
  });
};
