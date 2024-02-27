import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { UI } from './UI';
import { validateEmail, validatePassword } from '../../common/strings';
import { loginUserAction, storeUserAuthData } from '../../redux/actions/user';
import { setAuthDataToApp } from '../../redux/actions/app';
import { getAccessToken } from '../../utils';
import { UserState, DataObject } from '../../common/interfaceTypes';
import { validateUserData } from './common';
import { followOffer } from '../../api/offers';

export const Authentication = ({ setModal, setTriggeredButton }) => {
  const dispatch = useDispatch();

  const userError = useSelector((state: UserState) => state.user.error);
  const [formValues, setValues] = useState({
    fields: { email: '', password: '' },
    errors: { email: '', password: '' }
  });
  const [responseError, setResponseError] = useState(userError);

  useEffect(() => {
    setResponseError('');
  }, []);

  const onLoginClick = async () => {
    const { isValid, updatedData } = validateUserData(formValues);
    if (isValid) {
      await dispatch(loginUserAction(updatedData.fields));
      const token = getAccessToken();
      if (!token) {
        dispatch(setAuthDataToApp({ email: updatedData.fields.email }));
        setResponseError(localStorage.getItem('authError'));
      }
      if (token) {
        setModal();
      }
    } else {
      setValues((prevState: any) => ({ ...prevState, ...updatedData }));
    }

    return null;
  };

  const onCheckboxCheck = (isChecked: boolean) => {
    if (isChecked) {
      localStorage.setItem('rememberUser', formValues.fields.email);
    } else {
      localStorage.removeItem('rememberUser');
    }
  };

  const onFieldChange = (event: React.FormEvent<HTMLInputElement>) => {
    const { value, id } = event.currentTarget;
    if (id === 'email') {
      dispatch(setAuthDataToApp({ email: value }));
    }

    setValues((prevState) => ({
      ...prevState,
      fields: { ...prevState.fields, [id]: value },
      errors: { ...prevState.errors, [id]: '' }
    }));

    if (responseError) {
      setResponseError('');
    }
  };

  const onAuthSuccess = (authData: any, authType: string) => {
    if (!authData) return setModal();
    if (authType === 'facebook') {
      const { tokenDetail, profile } = authData;
      const { accessToken, userID, data_access_expiration_time } = tokenDetail;
      const { first_name, last_name, email, picture } = profile;
      dispatch(
        storeUserAuthData(
          {
            ...authData,
            profileObj: {
              name: first_name,
              email,
              accessToken,
              expiresIn: data_access_expiration_time,
              picture,
              userID
            }
          },
          authType
        )
      );
    } else {
      dispatch(storeUserAuthData(authData, authType));
    }
    setModal();
  };

  return (
    <UI
      setModal={setModal}
      formValues={formValues}
      onChange={onFieldChange}
      setTriggeredButton={setTriggeredButton}
      onLogin={onLoginClick}
      responseError={responseError}
      onCheck={onCheckboxCheck}
      onAuthSuccess={onAuthSuccess}
    />
  );
};
