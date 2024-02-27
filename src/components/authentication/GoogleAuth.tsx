import GoogleLogin from 'react-google-login';
import { useDispatch } from 'react-redux';
import { Box, Image, useToast } from '@chakra-ui/react';
import { loginByGoogleAction, loginSuccess } from '../../redux/actions/user';
import styles from './Authentication.module.scss';
import { ACCEPTED_TERMS } from '../common/modalController/acceptTerms/constants';
import { setModalDataAction } from '../common/modalController/action';
import { isNeedToAcceptTerms } from '../../utils';

const clientID =
  // process.env.GOOGLE_CLIENT_ID ||
  // process.env.GOOGLE_OAUTH2_KEY ||
  '126368222953-ntfquck34s8g9juai4lr3pu9mj5f3kao.apps.googleusercontent.com';
// const clientSecret = process.env.GOOGLE_CLIENT_SECRET || '1iNFePmWoi_dHwfMsjpg9SAl'

export const GoogleAuth = ({ label, setModal }) => {
  const dispatch = useDispatch();
  const toast = useToast();

  const loginByGoogle = (token: string) => {
    loginByGoogleAction(token)
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

  const onSuccess = (response) => {
    if (response?.profileObj?.email) {
      if (isNeedToAcceptTerms(response?.profileObj?.email)) {
        setModal();

        dispatch(
          setModalDataAction({
            modalName: 'acceptTerms',
            modalProps: {
              identificator: response?.profileObj?.email,
              onConfirm: () => loginByGoogle(response?.tokenId)
            }
          })
        );

        return;
      }
    }

    loginByGoogle(response?.tokenId);
  };

  const onFailure = (res) => {
    console.log(res);
  };

  return (
    <Box
      textAlign={{ sm: 'left', md: 'center' }}
      className={styles.google_btn_wrapper}
    >
      <GoogleLogin
        className={styles.google_auth_button}
        clientId={clientID}
        // clientSecret={clientSecret}
        icon={false}
        buttonText={label}
        onSuccess={onSuccess}
        onFailure={onFailure}
        style={{ color: '#fff', background: '#4968AD', marginBottom: '20px' }}
        cookiePolicy={'single_host_origin'}
      />
      <Image mr={{ sm: '31px', md: '62px' }} src="/images/common/google.svg" />
    </Box>
  );
};
