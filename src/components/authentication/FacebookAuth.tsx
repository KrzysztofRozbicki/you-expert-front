import { useDispatch } from 'react-redux';
import { Image, useToast, Button } from '@chakra-ui/react';
import { loginByFacebookAction, loginSuccess } from '../../redux/actions/user';
import styles from './Authentication.module.scss';
import { ACCEPTED_TERMS } from '../common/modalController/acceptTerms/constants';
import { setModalDataAction } from '../common/modalController/action';
import { isNeedToAcceptTerms } from '../../utils';

export const FacebookAuth = ({ label, setModal }) => {
  const toast = useToast();
  const dispatch = useDispatch();

  const loginByFacebook = (token: string) => {
    loginByFacebookAction(token)
      .then((data) => {
        dispatch(loginSuccess(data));
        setModal();
      })
      .catch(() => {
        setModal('login');
        toast({
          title: 'Something went wrong',
          description: 'Try again later',
          status: 'error',
          duration: 4000,
          isClosable: true
        });
      });
  };

  const onClick = () => {
    try {
      window.FB.login(
        async function (response) {
          if (
            response &&
            response.status &&
            response.authResponse &&
            response.authResponse.accessToken
          ) {
            if (response?.authResponse?.userID) {
              if (isNeedToAcceptTerms(response?.authResponse?.userID)) {
                setModal();

                dispatch(
                  setModalDataAction({
                    modalName: 'acceptTerms',
                    modalProps: {
                      identificator: response?.authResponse?.userID,
                      onConfirm: () =>
                        loginByFacebook(response.authResponse.accessToken)
                    }
                  })
                );

                return;
              }
            }

            loginByFacebook(response.authResponse.accessToken);
          } else {
            toast({
              title: 'Something went wrong.',
              status: 'error',
              duration: 4000,
              isClosable: true
            });
          }
        },
        { scope: 'email' }
      );
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Button
      onClick={onClick}
      className={styles.facebook_auth_button}
      bg="#4968ad"
      color="#fff"
      p="20px 10px 20px 40px !important"
      minH="72px"
      mb="15px"
      textAlign={{ sm: 'left', md: 'center' }}
    >
      <Image mr={{ sm: '31px', md: '62px' }} src="/images/common/fb.svg" />
      <span>{label}</span>
    </Button>
  );
};
