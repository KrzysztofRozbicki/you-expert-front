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
  SET_FULL_PROFILE_DATA
} from '../types/user';

const initialState = {
  isAuthenticated: null,
  loading: false,
  message: '',
  error: '',
  accessToken: '',
  refreshToken: '',
  googleAuth: null,
  facebookAuth: null,
  profileData: null,
  fullProfileData: null
};

const userStore = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_USER: {
      return { ...state, loading: true };
    }

    case LOGIN_USER_SUCCESS: {
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        profileData: action.payload?.profileData,
        accessToken: action.payload?.accessToken,
        refreshToken: action.payload?.refreshToken,
        fullProfileData: action.payload?.fullProfileData,
      };
    }

    case LOGIN_USER_FAIL: {
      return { ...state, loading: false, error: action.payload };
    }

    case CREATE_ACCOUNT: {
      return { ...state, loading: true };
    }

    case CREATE_ACCOUNT_SUCCESS: {
      return { ...state, loading: false };
    }

    case CREATE_ACCOUNT_FAIL: {
      return { ...state, loading: false, message: action.payload };
    }

    case CONFIRM_EMAIL: {
      return { ...state, loading: true };
    }

    case CONFIRM_EMAIL_SUCCESS: {
      return { ...state, loading: false, message: action.payload };
    }

    case CONFIRM_EMAIL_FAIL: {
      return { ...state, loading: false, error: action.payload };
    }

    case RESET_PASSWORD: {
      return { ...state, loading: true, error: null, message: null };
    }

    case RESET_PASSWORD_SUCCESS: {
      return { ...state, loading: false, message: action.payload, error: null };
    }

    case RESET_PASSWORD_FAIL: {
      return { ...state, loading: false, error: action.payload };
    }

    case SET_PASSWORD: {
      return { ...state, loading: true, error: null, message: null };
    }

    case SET_PASSWORD_SUCCESS: {
      return { ...state, loading: false, message: action.payload, error: null };
    }

    case SET_PASSWORD_FAIL: {
      return { ...state, loading: false, error: action.payload };
    }

    case STORE_AUTH_DATA: {
      const { data, type } = action.payload;

      if (type === 'google') {
        return {
          ...state,
          isAuthenticated: true,
          googleAuth: data,
          profileData: data.profileObj
        };
      }
      return {
        ...state,
        isAuthenticated: true,
        facebookAuth: data,
        profileData: data.profileObj
      };
    }

    case SET_PROFILE_DATA: {
      return {
        ...state,
        loading: false,
        isAuthenticated: action.payload?.isAuthenticated,
        profileData: action.payload?.profileData,
        fullProfileData: action.payload?.fullProfileData,
        accessToken: action.payload?.accessToken
          ? action.payload?.accessToken
          : state.accessToken,
        refreshToken: action.payload?.refreshToken
          ? action.payload?.refreshToken
          : state.refreshToken
      };
    }

    case SET_FULL_PROFILE_DATA:
      return {
        ...state,
        fullProfileData: action.payload
      };

    case LOG_OUT:
      return {
        ...initialState,
        isAuthenticated: false
      };

    default:
      return state;
  }
};

export default userStore;
