import { OFFER_VAT } from '../common/constants';
import { ACCEPTED_TERMS } from '../components/common/modalController/acceptTerms/constants';
import { triggerAuthModal } from '../redux/actions/app';
const format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;

export const setToken = (tokenData) => {
  const { access, refresh } = tokenData;
  if (access) {
    localStorage.setItem('expertToken', access);
  }
  if (refresh) {
    localStorage.setItem('refreshToken', refresh);
  }
};

export const deleteToken = (): void => {
  localStorage.removeItem('expertToken');
  localStorage.removeItem('refreshToken');
};

export const getAccessToken = () => {
  return localStorage.getItem('expertToken') || '';
};

export const getRefreshToken = (): string => {
  return localStorage.getItem('refreshToken') || '';
};

export const toBase64 = (file): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

// Check if string has symbols
export const isHasCharacters = (value) => {
  return format.test(value);
};

export const getDateFromTimestamp = (date: string) => {
  try {
    if (date && date.includes('T')) {
      return date?.split('T')[0];
    }

    return '';
  } catch {
    return '';
  }
};

export const findInString = (
  str: string,
  element: string,
  count?: number
): number | undefined => {
  if (!str || !element) {
    return undefined;
  }

  if (!count) {
    const index = str.indexOf(element);
    return index !== -1 ? index : undefined;
  }

  let index = 0;
  for (let i = 0; i < count; i++) {
    index = str.indexOf(element, index + 1);
    if (index === -1) {
      return undefined;
    }
  }

  return index;
};

export const getNumber = (string: string): number =>
  string && isFinite(+string) ? parseFloat(string) : 0;

export const getNumberFromNumber = (num: number): number =>
  num && isFinite(num) ? +num : 0;

export const getArrayFromObject = (obj: {
  [key: string]: any;
}): { key: string; value: any }[] => {
  if (!obj) {
    return [];
  }

  const keys = Object.keys(obj);
  const values = Object.values(obj);

  return keys.map((item, index) => ({ key: item, value: values[index] }));
};

export const triggerLoginUser = (dispatch: any) => {
  dispatch(triggerAuthModal(true));
  localStorage.setItem('authModal', '1');
};

export const getFileNameFromUrl = (fileUrl: string) => {
  if (!fileUrl) {
    return '';
  }

  const index = fileUrl.lastIndexOf('/');
  if (index === -1) {
    return '';
  }

  return fileUrl.slice(index + 1);
};

export const getFullDate = (date: string): string => {
  try {
    if (!date) {
      return '';
    }

    let result = '';
    const [splitDate, splitTime] = date.split('T');
    if (splitDate) {
      result += splitDate;
    }

    if (splitTime) {
      result += ` ${splitTime.slice(0, 8)}`;
    }

    return result;
  } catch {
    return '';
  }
};

export const isStringContainsOnlyNumbersOrPoint = (string: string): boolean => {
  if (!string) {
    return false;
  }
  return /^\d+$|^\d+\.\d+$/.test(string);
};

export const getOfferPriceWithCommission = (
  price: number,
  commission: number
): string => (price + price * (commission / 100) * OFFER_VAT).toFixed(2);

export const getOfferPriceWithoutCommission = (
  price: number,
  commission: number
): number => Math.round(price / (1 + (commission / 100) * OFFER_VAT));

export const isNeedToAcceptTerms = (identificator: string): boolean => {
  try {
    let isNeedToAcceptTerms = true;
    let acceptedTerms: any = localStorage.getItem(ACCEPTED_TERMS);

    if (acceptedTerms) {
      try {
        acceptedTerms = JSON.parse(acceptedTerms);
      } catch (e) {
        console.error(e);
        acceptedTerms = [];
      }

      if (
        Array.isArray(acceptedTerms) &&
        acceptedTerms.includes(identificator)
      ) {
        isNeedToAcceptTerms = false;
      }
    }

    return isNeedToAcceptTerms;
  } catch (e) {
    console.error(e);
    return true;
  }
};
