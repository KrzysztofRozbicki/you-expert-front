import React, { memo, useCallback } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { Flex, Heading, Button, Image } from '@chakra-ui/react';
import useTranslation from '../../hooks/useTranslation';
import { getFormattedHeading } from '../../common/strings';
import { AppState } from '../../common/interfaceTypes';
import { triggerAuthModal } from '../../redux/actions/app';

const CreateAccountPreview: React.FC = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const dispatch = useDispatch();
  const { currentLocale } = useSelector((state: AppState) => state.app);
  const { isAuthenticated } = useSelector((state: any) => state.user);

  const handleClickCreateAccount = useCallback(() => {
    dispatch(triggerAuthModal(true, 'signUp'));
  }, [dispatch]);

  if (isAuthenticated) {
    return <></>;
  }

  return (
    <Flex
      align="center"
      pl={{ sm: '5%', xl: '15%' }}
      pb={{ sm: '80px', xl: '153px' }}
      pt={{ sm: '80px', xl: '184px' }}
      mb={{ sm: '80px', xl: '127px' }}
      backgroundImage="url(/images/sections/CreateAccountPreview/CreateAccountPreviewBG.png)"
    >
      <Flex
        pr={{ sm: '0', lg: '50px', xl: '80px' }}
        direction="column"
        overflow="hidden"
      >
        <Heading
          as="h5"
          fontSize="0.8rem"
          fontWeight="400"
          mb={{ sm: '20px', xl: '41px' }}
          color="#fff"
        >
          {t('offers', 'createAccountPreview', 'smallTitle')}
        </Heading>
        {getFormattedHeading(
          t('offers', 'createAccountPreview', 'title'),
          8,
          true,
          {
            color: '#fff',
            width: '100%',
            maxWidth: '691px',
            textAlign: 'left',
            fontSize: '2.8rem'
          },
          { fontWeight: '600', borderBottom: '7px solid #EC8581' },
          { sm: '0 0 45px 0', xl: '0 0 78px 0' }
        )}
        <Button
          h="72px"
          w="259px"
          bg="general.sand"
          borderRadius="48px"
          fontSize="0.8rem"
          color="general.dark"
          p="19px 32px"
          onClick={handleClickCreateAccount}
        >
          {t('offers', 'createAccountPreview', 'button')}
        </Button>
      </Flex>

      <Flex direction="column" display={{ sm: 'none', lg: 'flex' }}>
        <Image src="/images/sections/CreateAccountPreview/CreateAccountPreviewEdge.svg" />
        {/* <Image src='/images/sections/CreateAccountPreview/CreateAccountPreviewEdge1.png' /> */}
      </Flex>
    </Flex>
  );
};

export default memo(CreateAccountPreview);
