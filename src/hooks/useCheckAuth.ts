import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { refreshTokenAction } from '../redux/actions/user';
import { getRefreshToken } from '../utils';
import { UserState } from '../common/interfaceTypes';

export const useCheckAuth = (): void => {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: UserState): boolean | null => state.user.isAuthenticated
  );
  const refreshToken = useMemo((): string => {
    try {
      return getRefreshToken();
    } catch {
      return '';
    }
  }, []);

  useEffect(() => {
    if (isAuthenticated === null) {
      dispatch(refreshTokenAction(refreshToken));
    }
  }, []);
};

export const checkUserAuth = (withoutRedirect?: boolean): void => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [authWasChecked, setChecked] = useState(false);
  const isAuthenticated = useSelector(
    (state: UserState): boolean | null => state.user.isAuthenticated
  );

  const refreshToken = useMemo((): string => {
    try {
      return getRefreshToken();
    } catch {
      return '';
    }
  }, []);

  const moveUserToLogin = () => {
    if (!withoutRedirect) {
      router.push('/[locale]/home/', `/${router.query.locale}/home/`);
    }
    localStorage.setItem('authModal', '1');
  };

  const checkAuth = async () => {
    if (refreshToken) {
      const res = await dispatch(refreshTokenAction(refreshToken));
      if (res) {
        setChecked(true);
      } else {
        moveUserToLogin();
      }
    } else {
      moveUserToLogin();
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (authWasChecked && !isAuthenticated) {
      moveUserToLogin();
    }
  }, [authWasChecked]);
};
