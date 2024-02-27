import axios from 'axios';
import {
  LOGIN_USER,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  CREATE_ACCOUNT,
  CREATE_ACCOUNT_SUCCESS,
  CREATE_ACCOUNT_FAIL,
  CONFIRM_EMAIL,
  CONFIRM_EMAIL_SUCCESS,
  CONFIRM_EMAIL_FAIL,
  RESET_PASSWORD,
  RESET_PASSWORD_SUCCESS,
  RESET_PASSWORD_FAIL,
  SET_PASSWORD,
  SET_PASSWORD_SUCCESS,
  SET_PASSWORD_FAIL,
  STORE_AUTH_DATA,
  SET_PROFILE_DATA,
  LOG_OUT,
  EDIT_USER,
  SET_FULL_PROFILE_DATA
} from '../types/user';
import { getToken, refreshTokenApi } from '../../api/login';
import { setToken, deleteToken } from '../../utils';
import {
  registerUser,
  userEmailConfirm,
  resetUserPassword,
  setUserPassword,
  editUser
} from '../../api/account';
import { decodeToken, setAuthorizationTokenToHeaders } from '../../utils/auth';
import { apiHost } from '../../api/common';
import { loginUserViaFB } from '../../api/login';
import { getRefreshToken } from '../../utils';

const wrongMessage = 'Something went wrong';

export const logout = () => ({ type: LOG_OUT });

export const setProfileData = (payload: {
  isAuthenticated: boolean;
  profileData: any;
  fullProfileData: any;
  accessToken?: string;
  refreshToken?: string;
}): any => ({
  type: SET_PROFILE_DATA,
  payload
});

export const setFullProfileDataAction = (payload: any) => ({
  type: SET_FULL_PROFILE_DATA,
  payload
});

export const login = () => ({
  type: LOGIN_USER
});

export const loginSuccess = (data) => ({
  type: LOGIN_USER_SUCCESS,
  payload: data
});

export const loginFail = (error) => ({
  type: LOGIN_USER_FAIL,
  payload: error
});

export const loginUserAction = (userData) => {
  return async (dispatch: any) => {
    try {
      dispatch(login());
      const res = await getToken(userData);
      if (res && res.data) {
        setToken(res.data);
        setAuthorizationTokenToHeaders(res.data.access);
        const decodedData = decodeToken(res.data.access);

        const fullProfileDataRes = await axios({
          method: 'GET',
          url: `${apiHost}/accounts/profile/${decodedData?.user_id}/`
        });

        dispatch(
          setProfileData({
            isAuthenticated: true,
            accessToken: res.data.access,
            refreshToken: res.data.refresh,
            profileData: decodedData,
            fullProfileData: fullProfileDataRes?.data
          })
        );
      } else {
        dispatch(loginFail(res.data));
      }
    } catch (error) {
      const errorData =
        error.response && error.response.data
          ? error.response.data.detail
          : null;
      localStorage.setItem('authError', errorData || 'Something went wrong');
      dispatch(loginFail(errorData || 'Something went wrong'));
    }
  };
};

export const createUserAccount = () => ({
  type: CREATE_ACCOUNT
});

export const createUserAccountSuccess = (userData) => ({
  type: CREATE_ACCOUNT_SUCCESS,
  payload: userData
});

export const createUserAccountFail = (error) => ({
  type: CREATE_ACCOUNT_FAIL,
  payload: error
});

export const createUserAccountAction = (userData) => {
  return async (dispatch: any) => {
    try {
      dispatch(createUserAccount());
      const result = await registerUser({
        password: userData.password,
        email: userData.email,
        first_name: userData.firstName,
        last_name: userData.lastName
      });
      if (result.status >= 200 && result.status < 300) {
        dispatch(createUserAccountSuccess(result.data));
        return true;
        // dispatch(userEmailConfirmAction(userData.email));
      } else {
        dispatch(createUserAccountFail(wrongMessage));
      }
    } catch (error) {
      console.log(error.response.data);
      dispatch(createUserAccountFail(error.response.data.email[0]));
    }
  };
};

export const createUserAccountAsyncAction = async (
  userData: any
): Promise<any> => {
  try {
    const res = await registerUser({
      password: userData?.password,
      email: userData?.email,
      first_name: userData?.firstName,
      last_name: userData?.lastName
    });

    return res?.data;
  } catch (e) {
    throw new Error(e);
  }
};

export const confirmEmail = () => ({
  type: CONFIRM_EMAIL
});

export const confirmEmailSuccess = (data) => ({
  type: CONFIRM_EMAIL_SUCCESS,
  payload: data
});

export const confirmEmailFail = (error) => ({
  type: CONFIRM_EMAIL_FAIL,
  payload: error
});

export const userEmailConfirmAction = (email) => {
  return async (dispatch: any) => {
    try {
      dispatch(confirmEmail());
      const result = await userEmailConfirm(email);
      if (result.data) {
        dispatch(confirmEmailSuccess(result.data));
      } else {
        dispatch(confirmEmailFail(wrongMessage));
      }
    } catch (error) {
      dispatch(confirmEmailFail(error.response.data));
    }
  };
};

export const passwordReset = () => ({
  type: RESET_PASSWORD
});

export const passwordResetSuccess = (message) => ({
  type: RESET_PASSWORD_SUCCESS,
  payload: message
});

export const passwordResetFail = (error) => ({
  type: RESET_PASSWORD_FAIL,
  error: error
});

export const resetUserPasswordAction = async (email: string): Promise<void> => {
  try {
    await resetUserPassword(email);
  } catch (e) {
    throw new Error(e);
  }
};

export const setPassword = () => ({
  type: SET_PASSWORD
});

export const setPasswordSuccess = (message) => ({
  type: SET_PASSWORD_SUCCESS,
  payload: message
});

export const setPasswordFail = (error) => ({
  type: SET_PASSWORD_FAIL,
  error: error
});

export const setUserPasswordAction = (uid, token, password) => {
  return async (dispatch: any) => {
    try {
      dispatch(passwordReset());
      const result = await setUserPassword(uid, token, password);
      if (result && result.data) {
        dispatch(passwordResetSuccess('Password was changed'));
      } else {
        dispatch(passwordResetFail(wrongMessage));
      }
    } catch (error) {
      dispatch(passwordResetFail(error.response.data.token[0]));
    }
  };
};

export const storeUserAuthData = (authData, authType) => ({
  type: STORE_AUTH_DATA,
  payload: { data: authData, type: authType }
});

export const refreshTokenAction = (refreshToken: string): any => {
  return async (dispatch: any): Promise<string> => {
    try {
      if (!refreshToken) {
        dispatch(
          setProfileData({
            isAuthenticated: false,
            profileData: null,
            fullProfileData: null,
            refreshToken: '',
            accessToken: ''
          })
        );
        return;
      }

      const res = await refreshTokenApi({ refresh: refreshToken });
      if (res?.data) {
        setToken({ access: res?.data.access });
        setAuthorizationTokenToHeaders(res?.data.access);
        const decodedData = decodeToken(res.data.access);

        const fullProfileDataRes = await axios({
          method: 'GET',
          url: `${apiHost}/accounts/profile/${decodedData?.user_id}/`
        });

        dispatch(
          setProfileData({
            isAuthenticated: true,
            profileData: decodedData,
            fullProfileData: fullProfileDataRes?.data,
            refreshToken,
            accessToken: res?.data?.access
          })
        );
        return res.data.access;
      }

      return res?.data?.access;
    } catch (e) {
      console.error(e);
      dispatch(
        setProfileData({
          isAuthenticated: false,
          profileData: null,
          fullProfileData: null,
          refreshToken: '',
          accessToken: ''
        })
      );
    }
  };
};

export const updateFullProfileDataAction = (id: number): any => {
  return async (dispatch: any): Promise<void> => {
    try {
      const res = await axios({
        method: 'GET',
        url: `${apiHost}/accounts/profile/${id}/`
      });

      if (res?.data) {
        dispatch(setFullProfileDataAction(res?.data));
      }
    } catch (e) {
      console.error(e);
    }
  };
};

export const logoutAction = (): Function => {
  return async (dispatch: any): Promise<void> => {
    try {
      dispatch(logout());
      setAuthorizationTokenToHeaders();
      deleteToken();
    } catch (e) {
      console.error(e);
    }
  };
};

export const loginByGoogleAction = async (auth_token: string): Promise<any> => {
  try {
    if (!auth_token) {
      return;
    }

    const res = await axios({
      method: 'POST',
      url: `${apiHost}/login/social/google/`,
      data: {
        auth_token
      }
    });

    if (res?.data) {
      setToken(res.data);
      setAuthorizationTokenToHeaders(res.data?.access);
      const decodedData = decodeToken(res.data?.access);
      const fullProfileDataRes = await axios({
        method: 'GET',
        url: `${apiHost}/accounts/profile/${decodedData?.user_id}/`
      });

      return {
        accessToken: res.data?.access,
        refreshToken: res.data?.refresh,
        profileData: decodedData,
        fullProfileData: fullProfileDataRes?.data
      };
    } else {
      throw new Error();
    }
  } catch (e) {
    throw new Error(e);
  }
};

export const loginByFacebookAction = async (token: string): Promise<any> => {
  try {
    if (!token) {
      return;
    }
    const res = await loginUserViaFB(token);
    if (res?.data) {
      setToken(res.data);
      setAuthorizationTokenToHeaders(res.data?.access);
      const decodedData = decodeToken(res.data?.access);
      const fullProfileDataRes = await axios({
        method: 'GET',
        url: `${apiHost}/accounts/profile/${decodedData?.user_id}/`
      });

      return {
        accessToken: res.data?.access,
        refreshToken: res.data?.refresh,
        profileData: decodedData,
        fullProfileData: fullProfileDataRes?.data
      };
    } else {
      throw new Error();
    }
  } catch (e) {
    throw new Error(e);
  }
};

// Edit user actions

export const editUserAction = (uid, newData) => {
  return async (dispatch) => {
    try {
      dispatch(login());
      const result = await editUser(uid, newData);
      if (result && result.status === 200) {
        dispatch(setFullProfileDataAction(result?.data));
      }
    } catch (error) {
      console.log(error);
      throw new Error(error);
    }
  };
};

export const editUserAccountAsyncAction = async (
  userId: string,
  updatedData: any
): Promise<any> => {
  try {
    const res = await editUser(userId, updatedData);
    return res?.data;
  } catch (e) {
    throw new Error(e);
  }
};
